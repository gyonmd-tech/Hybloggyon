import './load-env.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { count, eq } from 'drizzle-orm';
import { closeDatabase, getDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import {
  categories,
  mediaAssets,
  posts,
  postRevisions,
  postTags,
  series,
  tags,
} from '../src/lib/db/schema.js';
import { getAllPosts } from '../src/lib/content/markdown-posts.js';
import { slugify } from '../src/lib/slugify.js';

function mimeFromPath(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return ({ '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif' })[extension] || 'application/octet-stream';
}

if (!isDatabaseConfigured()) {
  console.error('DATABASE_URL belum diatur. Impor dibatalkan.');
  process.exitCode = 1;
} else {
  const markdownPosts = getAllPosts({ includeContent: true });
  const database = getDatabase();
  let imported = 0;

  try {
    for (const source of markdownPosts) {
      await database.transaction(async (transaction) => {
        const [category] = await transaction.insert(categories).values({
          name: source.category === 'film-anime'
            ? 'Film & Anime'
            : source.category.charAt(0).toUpperCase() + source.category.slice(1),
          slug: source.category,
          description: '',
        }).onConflictDoUpdate({
          target: categories.slug,
          set: { updatedAt: new Date() },
        }).returning({ id: categories.id });

        let seriesId = null;
        let seriesSlug = null;
        if (source.series) {
          seriesSlug = slugify(source.series);
          const [seriesRow] = await transaction.insert(series).values({
            name: source.series,
            slug: seriesSlug,
            description: '',
          }).onConflictDoUpdate({ target: series.slug, set: { name: source.series } })
            .returning({ id: series.id });
          seriesId = seriesRow.id;
        }

        let coverAssetId = null;
        if (source.coverExists && source.coverImage.startsWith('/')) {
          const absoluteCoverPath = path.join(process.cwd(), 'public', source.coverImage.slice(1));
          const stats = fs.statSync(absoluteCoverPath);
          const storageKey = `existing${source.coverImage}`;
          const [asset] = await transaction.insert(mediaAssets).values({
            storageKey,
            publicUrl: source.coverImage,
            fileName: path.basename(absoluteCoverPath),
            mimeType: mimeFromPath(absoluteCoverPath),
            sizeBytes: stats.size,
            altText: `Sampul ${source.title}`,
          }).onConflictDoUpdate({
            target: mediaAssets.storageKey,
            set: { publicUrl: source.coverImage, sizeBytes: stats.size, updatedAt: new Date() },
          }).returning({ id: mediaAssets.id });
          coverAssetId = asset.id;
        }

        const publishedAt = new Date(`${source.date}T00:00:00.000Z`);
        const [post] = await transaction.insert(posts).values({
          categoryId: category.id,
          seriesId,
          coverAssetId,
          title: source.title,
          subtitle: source.subtitle,
          slug: source.slug,
          excerpt: source.excerpt,
          contentMarkdown: source.content,
          pullQuote: source.pullQuote,
          status: 'published',
          featured: source.featured,
          readingTime: source.readingTime,
          seriesOrder: source.seriesOrder,
          publishedAt,
          seoTitle: source.seoTitle,
          seoDescription: source.seoDescription,
          canonicalUrl: source.canonicalUrl,
          ogImageUrl: source.ogImageUrl,
          noIndex: source.noIndex,
          updatedAt: new Date(`${source.updatedAt}T00:00:00.000Z`),
        }).onConflictDoUpdate({
          target: [posts.categoryId, posts.slug],
          set: {
            seriesId,
            coverAssetId,
            title: source.title,
            subtitle: source.subtitle,
            excerpt: source.excerpt,
            contentMarkdown: source.content,
            pullQuote: source.pullQuote,
            status: 'published',
            featured: source.featured,
            readingTime: source.readingTime,
            seriesOrder: source.seriesOrder,
            publishedAt,
            seoTitle: source.seoTitle,
            seoDescription: source.seoDescription,
            canonicalUrl: source.canonicalUrl,
            ogImageUrl: source.ogImageUrl,
            noIndex: source.noIndex,
            updatedAt: new Date(`${source.updatedAt}T00:00:00.000Z`),
          },
        }).returning({ id: posts.id });

        await transaction.delete(postTags).where(eq(postTags.postId, post.id));
        for (const [position, tagName] of source.tags.entries()) {
          const tagSlug = slugify(tagName);
          if (!tagSlug) continue;
          const [tag] = await transaction.insert(tags).values({ name: tagName, slug: tagSlug })
            .onConflictDoUpdate({ target: tags.slug, set: { name: tagName } })
            .returning({ id: tags.id });
          await transaction.insert(postTags).values({ postId: post.id, tagId: tag.id, position });
        }

        const [revisionCount] = await transaction.select({ value: count() })
          .from(postRevisions).where(eq(postRevisions.postId, post.id));
        if (Number(revisionCount.value) === 0) {
          await transaction.insert(postRevisions).values({
            postId: post.id,
            revisionNumber: 1,
            title: source.title,
            excerpt: source.excerpt,
            contentMarkdown: source.content,
            metadata: {
              importedFrom: source.fileName,
              subtitle: source.subtitle,
              categoryId: category.id,
              categorySlug: source.category,
              slug: source.slug,
              pullQuote: source.pullQuote,
              status: 'published',
              featured: source.featured,
              tags: source.tags,
              seriesId,
              seriesSlug,
              seriesOrder: source.seriesOrder,
              scheduledAt: null,
              publishedAt: publishedAt.toISOString(),
              coverAssetId,
              seoTitle: source.seoTitle,
              seoDescription: source.seoDescription,
              canonicalUrl: source.canonicalUrl,
              ogImageUrl: source.ogImageUrl,
              noIndex: source.noIndex,
            },
          });
        }
      });
      imported += 1;
      console.log(`Diimpor: ${source.url}`);
    }
    console.log(`Impor selesai: ${imported}/${markdownPosts.length} artikel.`);
    console.log('CONTENT_SOURCE belum diubah. Bandingkan hasil sebelum cutover ke database.');
  } finally {
    await closeDatabase();
  }
}
