import 'server-only';
import { cache } from 'react';
import { getAllPosts, getContentSource } from './posts.js';
import { listPublicCategories } from '../db/repositories/posts.js';
import { getCategoryHref } from '../categoryColors.js';

// Dipakai saat CONTENT_SOURCE=markdown; sama dengan seed database.
const MARKDOWN_CATEGORIES = [
  { slug: 'esai', name: 'Esai', description: 'Tulisan reflektif panjang.' },
  { slug: 'notes', name: 'Notes', description: 'Catatan belajar dan log.' },
  { slug: 'musik', name: 'Musik', description: 'Analisis dan ulasan album.' },
  { slug: 'film-anime', name: 'Film & Anime', description: 'Sinema dan pergerakan.' },
];

// Slug kategori menjadi segmen URL pertama, jadi tidak boleh bentrok dengan route statis.
export const RESERVED_CATEGORY_SLUGS = [
  'about', 'admin', 'api', 'archive', 'hobby', 'uploads', 'images',
  'feed.xml', 'sitemap.xml', 'robots.txt', 'manifest.webmanifest',
];

export const getCategories = cache(async () => {
  const [posts, baseCategories] = await Promise.all([
    getAllPosts(),
    getContentSource() === 'database' ? listPublicCategories() : MARKDOWN_CATEGORIES,
  ]);

  const counts = new Map();
  for (const post of posts) counts.set(post.category, (counts.get(post.category) || 0) + 1);

  const known = new Set(baseCategories.map((category) => category.slug));
  const extra = [...counts.keys()]
    .filter((slug) => !known.has(slug))
    .map((slug) => ({ slug, name: slug.replace(/-/g, ' '), description: '' }));

  return [...baseCategories, ...extra].map((category) => ({
    ...category,
    count: counts.get(category.slug) || 0,
    href: getCategoryHref(category.slug),
  }));
});

export async function getCategoryBySlug(slug) {
  return (await getCategories()).find((category) => category.slug === slug) || null;
}
