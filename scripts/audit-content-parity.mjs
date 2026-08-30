import './load-env.mjs';
import { closeDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import { getAllPosts as getMarkdownPosts } from '../src/lib/content/markdown-posts.js';
import { listPublishedPosts } from '../src/lib/db/repositories/posts.js';

const checkedFields = [
  'title',
  'subtitle',
  'category',
  'slug',
  'date',
  'updatedAt',
  'excerpt',
  'featured',
  'readingTime',
  'pullQuote',
  'series',
  'seriesOrder',
  'seoTitle',
  'seoDescription',
  'canonicalUrl',
  'ogImageUrl',
  'noIndex',
];

function normalize(value) {
  if (typeof value === 'string') return value.replace(/\r\n/g, '\n').trim();
  return value ?? null;
}

if (!isDatabaseConfigured()) {
  console.error('DATABASE_URL belum diatur. Audit paritas dibatalkan.');
  process.exitCode = 1;
} else {
  try {
    const markdownPosts = getMarkdownPosts({ includeContent: true });
    const databasePosts = await listPublishedPosts({ includeContent: true });
    const markdownByRoute = new Map(markdownPosts.map((post) => [post.url, post]));
    const databaseByRoute = new Map(databasePosts.map((post) => [post.url, post]));
    const mismatches = [];

    for (const [route, source] of markdownByRoute) {
      const target = databaseByRoute.get(route);
      if (!target) {
        mismatches.push(`${route}: tidak ditemukan di database.`);
        continue;
      }

      for (const field of checkedFields) {
        if (normalize(source[field]) !== normalize(target[field])) {
          mismatches.push(`${route}: field ${field} berbeda.`);
        }
      }
      if (normalize(source.content) !== normalize(target.content)) {
        mismatches.push(`${route}: isi Markdown berbeda.`);
      }
      if (JSON.stringify(source.tags) !== JSON.stringify(target.tags)) {
        mismatches.push(`${route}: urutan tag berbeda.`);
      }
      if (source.coverExists && source.coverImage !== target.coverImage) {
        mismatches.push(`${route}: cover yang tersedia tidak sama.`);
      }
    }

    for (const route of databaseByRoute.keys()) {
      if (!markdownByRoute.has(route)) {
        mismatches.push(`${route}: hanya ada di database.`);
      }
    }

    console.log(`Markdown: ${markdownPosts.length} artikel.`);
    console.log(`Database: ${databasePosts.length} artikel publik.`);
    for (const mismatch of mismatches) console.error(`DIFF  ${mismatch}`);

    if (mismatches.length) {
      console.error(`Audit paritas gagal: ${mismatches.length} perbedaan.`);
      process.exitCode = 1;
    } else {
      console.log('Audit paritas lolos: konten Markdown dan database identik.');
    }
  } finally {
    await closeDatabase();
  }
}
