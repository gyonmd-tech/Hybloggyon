import 'server-only';
import readingTime from 'reading-time';
import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  max,
  or,
  sql,
} from 'drizzle-orm';
import { getDatabase } from '../client.js';
import {
  adminSessions,
  adminUsers,
  categories,
  mediaAssets,
  posts,
  postRevisions,
  postTags,
  series,
  siteSettings,
  slugRedirects,
  tags,
} from '../schema.js';
import { slugify } from '../../slugify.js';

const POST_PAGE_SIZE = 20;

function postRoute(categorySlug, postSlug) {
  return `/${categorySlug}/${postSlug}`;
}

function cleanDate(value) {
  return value instanceof Date && !Number.isNaN(value.valueOf()) ? value : null;
}

function snapshotMetadata(input, categoryId, seriesId) {
  return {
    subtitle: input.subtitle,
    categoryId,
    categorySlug: input.categorySlug,
    slug: input.slug,
    pullQuote: input.pullQuote,
    status: input.status,
    featured: input.featured,
    tags: input.tags,
    seriesId,
    seriesSlug: input.seriesSlug,
    seriesOrder: input.seriesOrder,
    scheduledAt: input.scheduledAt?.toISOString() || null,
    publishedAt: input.publishedAt?.toISOString() || null,
    coverAssetId: input.coverAssetId,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    canonicalUrl: input.canonicalUrl,
    ogImageUrl: input.ogImageUrl,
    noIndex: input.noIndex,
  };
}

async function replacePostTags(transaction, postId, tagNames) {
  await transaction.delete(postTags).where(eq(postTags.postId, postId));
  if (tagNames.length === 0) return;

  const uniqueTags = [...new Map(
    tagNames.map((name) => [slugify(name), name.trim()]),
  ).entries()].filter(([tagSlug]) => tagSlug);

  const tagIds = [];
  for (const [tagSlug, name] of uniqueTags) {
    const [tag] = await transaction
      .insert(tags)
      .values({ name, slug: tagSlug })
      .onConflictDoUpdate({ target: tags.slug, set: { name } })
      .returning({ id: tags.id });
    tagIds.push(tag.id);
  }

  await transaction.insert(postTags).values(
    tagIds.map((tagId, position) => ({ postId, tagId, position })),
  );
}

async function createRevision(transaction, postId, editorId, input, categoryId, seriesId) {
  const [latest] = await transaction
    .select({ value: max(postRevisions.revisionNumber) })
    .from(postRevisions)
    .where(eq(postRevisions.postId, postId));

  await transaction.insert(postRevisions).values({
    postId,
    editorId,
    revisionNumber: Number(latest?.value || 0) + 1,
    title: input.title,
    excerpt: input.excerpt,
    contentMarkdown: input.contentMarkdown,
    metadata: snapshotMetadata(input, categoryId, seriesId),
  });
}

export async function getAdminDashboard() {
  const database = getDatabase();
  const [statusRows, [categoryTotal], [tagTotal], recentPosts] = await Promise.all([
    database
      .select({ status: posts.status, value: count() })
      .from(posts)
      .groupBy(posts.status),
    database.select({ value: count() }).from(categories),
    database.select({ value: count() }).from(tags),
    database
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        category: categories.slug,
        status: posts.status,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .innerJoin(categories, eq(posts.categoryId, categories.id))
      .orderBy(desc(posts.updatedAt))
      .limit(7),
  ]);

  const counts = { all: 0, draft: 0, scheduled: 0, published: 0, archived: 0 };
  for (const row of statusRows) {
    counts[row.status] = Number(row.value);
    counts.all += Number(row.value);
  }

  return {
    counts,
    categoryCount: Number(categoryTotal.value),
    tagCount: Number(tagTotal.value),
    recentPosts,
  };
}

export async function listAdminPosts({
  search = '',
  status = 'all',
  category = 'all',
  page = 1,
} = {}) {
  const database = getDatabase();
  const safePage = Math.max(1, Number(page) || 1);
  const conditions = [];

  if (search.trim()) {
    const pattern = `%${search.trim()}%`;
    conditions.push(or(ilike(posts.title, pattern), ilike(posts.slug, pattern)));
  }
  if (['draft', 'scheduled', 'published', 'archived'].includes(status)) {
    conditions.push(eq(posts.status, status));
  }
  if (category !== 'all') conditions.push(eq(categories.slug, category));

  const where = conditions.length ? and(...conditions) : undefined;
  const baseSelection = {
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    category: categories.slug,
    categoryName: categories.name,
    status: posts.status,
    featured: posts.featured,
    readingTime: posts.readingTime,
    publishedAt: posts.publishedAt,
    updatedAt: posts.updatedAt,
  };

  const [rows, [totalRow], categoryRows] = await Promise.all([
    database
      .select(baseSelection)
      .from(posts)
      .innerJoin(categories, eq(posts.categoryId, categories.id))
      .where(where)
      .orderBy(desc(posts.updatedAt))
      .limit(POST_PAGE_SIZE)
      .offset((safePage - 1) * POST_PAGE_SIZE),
    database
      .select({ value: count() })
      .from(posts)
      .innerJoin(categories, eq(posts.categoryId, categories.id))
      .where(where),
    database.select({ id: categories.id, name: categories.name, slug: categories.slug })
      .from(categories)
      .orderBy(asc(categories.name)),
  ]);

  const total = Number(totalRow.value);
  return {
    posts: rows,
    categories: categoryRows,
    page: safePage,
    pageCount: Math.max(1, Math.ceil(total / POST_PAGE_SIZE)),
    total,
  };
}

export async function getPostEditorOptions() {
  const database = getDatabase();
  const [categoryRows, seriesRows, mediaRows] = await Promise.all([
    database.select().from(categories).orderBy(asc(categories.name)),
    database.select().from(series).orderBy(asc(series.name)),
    database
      .select({
        id: mediaAssets.id,
        publicUrl: mediaAssets.publicUrl,
        fileName: mediaAssets.fileName,
        altText: mediaAssets.altText,
      })
      .from(mediaAssets)
      .orderBy(desc(mediaAssets.createdAt))
      .limit(100),
  ]);
  return { categories: categoryRows, series: seriesRows, media: mediaRows };
}

export async function getAdminPost(id) {
  const database = getDatabase();
  const [post] = await database
    .select({
      id: posts.id,
      title: posts.title,
      subtitle: posts.subtitle,
      categoryId: posts.categoryId,
      categorySlug: categories.slug,
      categoryName: categories.name,
      slug: posts.slug,
      excerpt: posts.excerpt,
      contentMarkdown: posts.contentMarkdown,
      pullQuote: posts.pullQuote,
      status: posts.status,
      featured: posts.featured,
      readingTime: posts.readingTime,
      seriesId: posts.seriesId,
      seriesSlug: series.slug,
      seriesOrder: posts.seriesOrder,
      scheduledAt: posts.scheduledAt,
      publishedAt: posts.publishedAt,
      coverAssetId: posts.coverAssetId,
      coverUrl: mediaAssets.publicUrl,
      seoTitle: posts.seoTitle,
      seoDescription: posts.seoDescription,
      canonicalUrl: posts.canonicalUrl,
      ogImageUrl: posts.ogImageUrl,
      noIndex: posts.noIndex,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(series, eq(posts.seriesId, series.id))
    .leftJoin(mediaAssets, eq(posts.coverAssetId, mediaAssets.id))
    .where(eq(posts.id, id))
    .limit(1);

  if (!post) return null;
  const tagRows = await database
    .select({ name: tags.name })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, id))
    .orderBy(asc(postTags.position));
  return { ...post, tags: tagRows.map((tag) => tag.name) };
}

export async function saveAdminPost(input, editorId, postId = null) {
  return getDatabase().transaction(async (transaction) => {
    const [category] = await transaction
      .select({ id: categories.id, slug: categories.slug })
      .from(categories)
      .where(eq(categories.slug, input.categorySlug))
      .limit(1);
    if (!category) throw new Error('Kategori yang dipilih tidak ditemukan.');

    let seriesId = null;
    if (input.seriesSlug) {
      const [selectedSeries] = await transaction
        .select({ id: series.id })
        .from(series)
        .where(eq(series.slug, input.seriesSlug))
        .limit(1);
      if (!selectedSeries) throw new Error('Seri yang dipilih tidak ditemukan.');
      seriesId = selectedSeries.id;
    }

    const measuredReadingTime = Math.max(1, Math.ceil(readingTime(input.contentMarkdown).minutes));
    const values = {
      categoryId: category.id,
      authorId: editorId,
      seriesId,
      coverAssetId: input.coverAssetId,
      title: input.title,
      subtitle: input.subtitle,
      slug: input.slug,
      excerpt: input.excerpt,
      contentMarkdown: input.contentMarkdown,
      pullQuote: input.pullQuote,
      status: input.status,
      featured: input.featured,
      readingTime: measuredReadingTime,
      seriesOrder: input.seriesOrder,
      scheduledAt: cleanDate(input.scheduledAt),
      publishedAt: cleanDate(input.publishedAt),
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription,
      canonicalUrl: input.canonicalUrl,
      ogImageUrl: input.ogImageUrl,
      noIndex: input.noIndex,
      updatedAt: new Date(),
    };

    let id = postId;
    let oldRoute = null;
    if (postId) {
      const [existing] = await transaction
        .select({ slug: posts.slug, category: categories.slug })
        .from(posts)
        .innerJoin(categories, eq(posts.categoryId, categories.id))
        .where(eq(posts.id, postId))
        .limit(1);
      if (!existing) throw new Error('Artikel tidak ditemukan.');
      oldRoute = postRoute(existing.category, existing.slug);
      await transaction.update(posts).set(values).where(eq(posts.id, postId));
    } else {
      const [created] = await transaction
        .insert(posts)
        .values({ ...values, createdAt: new Date() })
        .returning({ id: posts.id });
      id = created.id;
    }

    await replacePostTags(transaction, id, input.tags);
    await createRevision(transaction, id, editorId, input, category.id, seriesId);

    const newRoute = postRoute(category.slug, input.slug);
    if (oldRoute && oldRoute !== newRoute) {
      await transaction
        .insert(slugRedirects)
        .values({ postId: id, fromPath: oldRoute, toPath: newRoute, statusCode: 301 })
        .onConflictDoUpdate({
          target: slugRedirects.fromPath,
          set: { postId: id, toPath: newRoute, statusCode: 301 },
        });
      await transaction
        .update(slugRedirects)
        .set({ toPath: newRoute })
        .where(eq(slugRedirects.postId, id));
    }

    return {
      id,
      route: newRoute,
      previousRoute: oldRoute && oldRoute !== newRoute ? oldRoute : null,
    };
  });
}

export async function archiveAdminPost(id) {
  await getDatabase().update(posts).set({ status: 'archived', updatedAt: new Date() })
    .where(eq(posts.id, id));
}

export async function deleteAdminPost(id) {
  await getDatabase().delete(posts).where(eq(posts.id, id));
}

export async function listPostRevisions(postId) {
  return getDatabase()
    .select({
      id: postRevisions.id,
      revisionNumber: postRevisions.revisionNumber,
      title: postRevisions.title,
      editorName: adminUsers.displayName,
      createdAt: postRevisions.createdAt,
    })
    .from(postRevisions)
    .leftJoin(adminUsers, eq(postRevisions.editorId, adminUsers.id))
    .where(eq(postRevisions.postId, postId))
    .orderBy(desc(postRevisions.revisionNumber));
}

export async function restorePostRevision(postId, revisionId, editorId) {
  const database = getDatabase();
  const [revision] = await database
    .select()
    .from(postRevisions)
    .where(and(eq(postRevisions.id, revisionId), eq(postRevisions.postId, postId)))
    .limit(1);
  if (!revision) throw new Error('Revisi tidak ditemukan.');

  const metadata = revision.metadata || {};
  const input = {
    title: revision.title,
    subtitle: metadata.subtitle || '',
    categorySlug: metadata.categorySlug,
    slug: metadata.slug,
    excerpt: revision.excerpt,
    contentMarkdown: revision.contentMarkdown,
    pullQuote: metadata.pullQuote || '',
    status: metadata.status || 'draft',
    featured: Boolean(metadata.featured),
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    seriesSlug: metadata.seriesSlug || null,
    seriesOrder: metadata.seriesOrder || null,
    scheduledAt: metadata.scheduledAt ? new Date(metadata.scheduledAt) : null,
    publishedAt: metadata.publishedAt ? new Date(metadata.publishedAt) : null,
    coverAssetId: metadata.coverAssetId || null,
    seoTitle: metadata.seoTitle || '',
    seoDescription: metadata.seoDescription || '',
    canonicalUrl: metadata.canonicalUrl || '',
    ogImageUrl: metadata.ogImageUrl || '',
    noIndex: Boolean(metadata.noIndex),
  };
  if (!input.categorySlug || !input.slug) {
    throw new Error('Snapshot revisi lama tidak memiliki metadata route yang lengkap.');
  }
  return saveAdminPost(input, editorId, postId);
}

export async function listCategoriesWithCounts() {
  return getDatabase()
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      postCount: count(posts.id),
      updatedAt: categories.updatedAt,
    })
    .from(categories)
    .leftJoin(posts, eq(posts.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(asc(categories.name));
}

export async function saveCategory({ id, name, slug, description }) {
  const database = getDatabase();
  return database.transaction(async (transaction) => {
    if (!id) {
      return transaction.insert(categories).values({ name, slug, description }).returning();
    }

    const [existing] = await transaction.select({ slug: categories.slug })
      .from(categories).where(eq(categories.id, id)).limit(1);
    if (!existing) throw new Error('Kategori tidak ditemukan.');

    if (existing.slug !== slug) {
      const affectedPosts = await transaction.select({ id: posts.id, slug: posts.slug })
        .from(posts).where(eq(posts.categoryId, id));
      for (const post of affectedPosts) {
        await transaction.insert(slugRedirects).values({
          postId: post.id,
          fromPath: postRoute(existing.slug, post.slug),
          toPath: postRoute(slug, post.slug),
          statusCode: 301,
        }).onConflictDoUpdate({
          target: slugRedirects.fromPath,
          set: { toPath: postRoute(slug, post.slug), postId: post.id },
        });
        await transaction.update(slugRedirects)
          .set({ toPath: postRoute(slug, post.slug) })
          .where(eq(slugRedirects.postId, post.id));
      }
    }

    return transaction.update(categories)
      .set({ name, slug, description, updatedAt: new Date() })
      .where(eq(categories.id, id)).returning();
  });
}

export async function deleteCategory(id) {
  const [usage] = await getDatabase().select({ value: count() })
    .from(posts).where(eq(posts.categoryId, id));
  if (Number(usage.value) > 0) throw new Error('Kategori masih dipakai oleh artikel.');
  await getDatabase().delete(categories).where(eq(categories.id, id));
}

export async function listTagsWithCounts() {
  return getDatabase()
    .select({
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      postCount: count(postTags.postId),
      createdAt: tags.createdAt,
    })
    .from(tags)
    .leftJoin(postTags, eq(postTags.tagId, tags.id))
    .groupBy(tags.id)
    .orderBy(asc(tags.name));
}

export async function saveTag({ id, name, slug }) {
  if (id) {
    return getDatabase().update(tags).set({ name, slug }).where(eq(tags.id, id)).returning();
  }
  return getDatabase().insert(tags).values({ name, slug }).returning();
}

export async function deleteTag(id) {
  await getDatabase().delete(tags).where(eq(tags.id, id));
}

export async function listSeriesWithCounts() {
  return getDatabase()
    .select({
      id: series.id,
      name: series.name,
      slug: series.slug,
      description: series.description,
      postCount: count(posts.id),
      updatedAt: series.updatedAt,
    })
    .from(series)
    .leftJoin(posts, eq(posts.seriesId, series.id))
    .groupBy(series.id)
    .orderBy(asc(series.name));
}

export async function saveSeries({ id, name, slug, description }) {
  if (id) {
    return getDatabase().update(series)
      .set({ name, slug, description, updatedAt: new Date() })
      .where(eq(series.id, id)).returning();
  }
  return getDatabase().insert(series).values({ name, slug, description }).returning();
}

export async function deleteSeries(id) {
  await getDatabase().update(posts).set({ seriesId: null, seriesOrder: null })
    .where(eq(posts.seriesId, id));
  await getDatabase().delete(series).where(eq(series.id, id));
}

export async function listMediaAssets() {
  return getDatabase()
    .select({
      id: mediaAssets.id,
      storageKey: mediaAssets.storageKey,
      publicUrl: mediaAssets.publicUrl,
      fileName: mediaAssets.fileName,
      mimeType: mediaAssets.mimeType,
      sizeBytes: mediaAssets.sizeBytes,
      width: mediaAssets.width,
      height: mediaAssets.height,
      altText: mediaAssets.altText,
      caption: mediaAssets.caption,
      createdAt: mediaAssets.createdAt,
      usageCount: count(posts.id),
    })
    .from(mediaAssets)
    .leftJoin(posts, eq(posts.coverAssetId, mediaAssets.id))
    .groupBy(mediaAssets.id)
    .orderBy(desc(mediaAssets.createdAt));
}

export async function createMediaAsset(values) {
  const [asset] = await getDatabase().insert(mediaAssets).values(values).returning();
  return asset;
}

export async function updateMediaAsset(id, values) {
  const [asset] = await getDatabase().update(mediaAssets)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(mediaAssets.id, id)).returning();
  return asset;
}

export async function deleteMediaAsset(id) {
  const [asset] = await getDatabase().delete(mediaAssets)
    .where(eq(mediaAssets.id, id)).returning();
  return asset || null;
}

export async function getMediaAssetById(id) {
  const [asset] = await getDatabase().select().from(mediaAssets)
    .where(eq(mediaAssets.id, id)).limit(1);
  return asset || null;
}

export async function getAdminSiteProfile() {
  const [setting] = await getDatabase().select({ value: siteSettings.value })
    .from(siteSettings).where(eq(siteSettings.key, 'site_profile')).limit(1);
  return setting?.value || null;
}

export async function saveAdminSiteProfile(value, adminId) {
  await getDatabase().insert(siteSettings).values({
    key: 'site_profile',
    value,
    updatedById: adminId,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: siteSettings.key,
    set: { value, updatedById: adminId, updatedAt: new Date() },
  });
}

export async function updateAdminPassword(userId, passwordHash) {
  await getDatabase().transaction(async (transaction) => {
    await transaction.update(adminUsers)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(adminUsers.id, userId));
    await transaction.delete(adminSessions).where(eq(adminSessions.userId, userId));
  });
}

export async function getAdminUserWithPassword(userId) {
  const [user] = await getDatabase().select({
    id: adminUsers.id,
    passwordHash: adminUsers.passwordHash,
  }).from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
  return user || null;
}

export async function findAdminByEmail(email) {
  const [user] = await getDatabase().select({
    id: adminUsers.id,
    email: adminUsers.email,
    displayName: adminUsers.displayName,
    role: adminUsers.role,
    passwordHash: adminUsers.passwordHash,
    isActive: adminUsers.isActive,
  }).from(adminUsers)
    .where(eq(sql`lower(${adminUsers.email})`, email.toLowerCase()))
    .limit(1);
  return user || null;
}

export async function markAdminLogin(userId) {
  await getDatabase().update(adminUsers)
    .set({ lastLoginAt: new Date(), updatedAt: new Date() })
    .where(eq(adminUsers.id, userId));
}

export async function deleteExpiredSessions() {
  await getDatabase().delete(adminSessions)
    .where(sql`${adminSessions.expiresAt} <= now()`);
}
