import { and, asc, desc, eq, inArray, lte, or } from 'drizzle-orm';
import { getDatabase } from '../client.js';
import {
  categories,
  mediaAssets,
  posts,
  postTags,
  series,
  tags,
} from '../schema.js';

function postSelection(includeContent) {
  return {
    id: posts.id,
    title: posts.title,
    subtitle: posts.subtitle,
    category: categories.slug,
    slug: posts.slug,
    excerpt: posts.excerpt,
    featured: posts.featured,
    readingTime: posts.readingTime,
    pullQuote: posts.pullQuote,
    series: series.name,
    seriesOrder: posts.seriesOrder,
    publishedAt: posts.publishedAt,
    scheduledAt: posts.scheduledAt,
    updatedAt: posts.updatedAt,
    coverImage: mediaAssets.publicUrl,
    seoTitle: posts.seoTitle,
    seoDescription: posts.seoDescription,
    canonicalUrl: posts.canonicalUrl,
    ogImageUrl: posts.ogImageUrl,
    noIndex: posts.noIndex,
    ...(includeContent ? { content: posts.contentMarkdown } : {}),
  };
}

function publishedWhere(now = new Date()) {
  return or(
    and(eq(posts.status, 'published'), lte(posts.publishedAt, now)),
    and(eq(posts.status, 'scheduled'), lte(posts.scheduledAt, now)),
  );
}

async function attachTags(rows) {
  if (rows.length === 0) return rows;

  const tagRows = await getDatabase()
    .select({ postId: postTags.postId, name: tags.name })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(inArray(postTags.postId, rows.map((row) => row.id)))
    .orderBy(asc(postTags.postId), asc(postTags.position));

  const tagsByPost = new Map();
  for (const tag of tagRows) {
    const values = tagsByPost.get(tag.postId) || [];
    values.push(tag.name);
    tagsByPost.set(tag.postId, values);
  }

  return rows.map((row) => ({ ...row, tags: tagsByPost.get(row.id) || [] }));
}

function toPublicPost(row) {
  const publishedAt = row.publishedAt || row.scheduledAt || row.updatedAt;

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    tags: row.tags,
    date: publishedAt.toISOString().slice(0, 10),
    updatedAt: row.updatedAt.toISOString().slice(0, 10),
    slug: row.slug,
    featured: row.featured,
    excerpt: row.excerpt,
    coverImage: row.coverImage || '',
    coverExists: Boolean(row.coverImage),
    readingTime: row.readingTime,
    pullQuote: row.pullQuote,
    series: row.series || '',
    seriesOrder: row.seriesOrder,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    canonicalUrl: row.canonicalUrl,
    ogImageUrl: row.ogImageUrl,
    noIndex: row.noIndex,
    url: `/${row.category}/${row.slug}`,
    ...(row.content === undefined ? {} : { content: row.content }),
  };
}

export async function listPublishedPosts({ includeContent = false } = {}) {
  const database = getDatabase();
  const rows = await database
    .select(postSelection(includeContent))
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(series, eq(posts.seriesId, series.id))
    .leftJoin(mediaAssets, eq(posts.coverAssetId, mediaAssets.id))
    .where(publishedWhere())
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));

  return (await attachTags(rows)).map(toPublicPost);
}

export async function findPublishedPostByRoute(category, slug) {
  const database = getDatabase();
  const rows = await database
    .select(postSelection(true))
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(series, eq(posts.seriesId, series.id))
    .leftJoin(mediaAssets, eq(posts.coverAssetId, mediaAssets.id))
    .where(
      and(
        publishedWhere(),
        eq(categories.slug, category),
        eq(posts.slug, slug),
      ),
    )
    .limit(1);

  const [post] = await attachTags(rows);
  return post ? toPublicPost(post) : null;
}

export async function listPublishedRouteParams() {
  return getDatabase()
    .select({ category: categories.slug, slug: posts.slug })
    .from(posts)
    .innerJoin(categories, eq(posts.categoryId, categories.id))
    .where(publishedWhere())
    .orderBy(asc(categories.slug), asc(posts.slug));
}
