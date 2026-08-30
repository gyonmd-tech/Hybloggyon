import './load-env.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { closeDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import { getAllPosts as getMarkdownPosts } from '../src/lib/content/markdown-posts.js';
import { listPublishedPosts } from '../src/lib/db/repositories/posts.js';
import { absoluteUrl, siteConfig } from '../src/config/site.js';

const failures = [];
const warnings = [];
const source = process.env.CONTENT_SOURCE || 'markdown';

function validHttpUrl(value) {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

if (!validHttpUrl(siteConfig.url)) {
  failures.push(`NEXT_PUBLIC_SITE_URL tidak valid: ${siteConfig.url}`);
}

const defaultOgPath = path.join(process.cwd(), 'public', 'images', 'og', 'default.webp');
if (!fs.existsSync(defaultOgPath)) {
  failures.push('Gambar sosial bawaan public/images/og/default.webp tidak ditemukan.');
}

let posts = [];
if (source === 'database') {
  if (!isDatabaseConfigured()) {
    failures.push('CONTENT_SOURCE=database membutuhkan DATABASE_URL untuk audit SEO.');
  } else {
    posts = await listPublishedPosts();
  }
} else if (source === 'markdown') {
  posts = getMarkdownPosts();
} else {
  failures.push(`CONTENT_SOURCE tidak dikenal: ${source}`);
}

const routes = new Set();
const canonicalOwners = new Map();

for (const post of posts) {
  const label = post.url || post.slug;
  const title = String(post.seoTitle || post.title || '').trim();
  const description = String(post.seoDescription || post.excerpt || '').trim();

  if (!title) failures.push(`${label}: judul SEO kosong.`);
  if (!description) failures.push(`${label}: deskripsi SEO kosong.`);
  if (routes.has(post.url)) failures.push(`${label}: route artikel duplikat.`);
  routes.add(post.url);

  if (title.length > 60) warnings.push(`${label}: judul SEO ${title.length} karakter (disarankan maksimal 60).`);
  if (description.length > 160) warnings.push(`${label}: deskripsi SEO ${description.length} karakter (disarankan maksimal 160).`);
  if (!post.noIndex && !post.ogImageUrl && !post.coverExists) {
    warnings.push(`${label}: belum memiliki gambar sosial khusus artikel.`);
  }

  const canonicalUrl = post.canonicalUrl || absoluteUrl(post.url);
  if (!validHttpUrl(canonicalUrl)) {
    failures.push(`${label}: canonical URL tidak valid.`);
  } else {
    const owner = canonicalOwners.get(canonicalUrl);
    if (owner && owner !== label) {
      failures.push(`${label}: canonical URL juga dipakai oleh ${owner}.`);
    }
    canonicalOwners.set(canonicalUrl, label);
  }

  for (const [field, value] of [['date', post.date], ['updatedAt', post.updatedAt]]) {
    if (Number.isNaN(Date.parse(value))) failures.push(`${label}: ${field} tidak valid.`);
  }
}

console.log('HyBloggyon SEO audit');
console.log(`- source: ${source}`);
console.log(`- articles: ${posts.length}`);
console.log(`- canonical origin: ${siteConfig.url}`);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const failure of failures) console.error(`FAIL  ${failure}`);

if (isDatabaseConfigured()) await closeDatabase();

if (failures.length) {
  console.error(`Audit SEO gagal: ${failures.length} masalah.`);
  process.exitCode = 1;
} else {
  console.log(`Audit SEO lolos dengan ${warnings.length} peringatan editorial.`);
}
