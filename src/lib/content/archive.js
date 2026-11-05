import 'server-only';
import { cache } from 'react';
import { getAllPosts, getContentSource } from './posts.js';
import { listPublicSeries } from '../db/repositories/posts.js';

// Folder arsip = satu seri. Tulisan tanpa seri dikumpulkan di folder "Catatan Lepas".
export const LOOSE_FOLDER_SLUG = 'catatan-lepas';

function byChapter(a, b) {
  return (a.seriesOrder ?? Infinity) - (b.seriesOrder ?? Infinity) || a.date.localeCompare(b.date);
}

export const getArchiveFolders = cache(async () => {
  const [posts, seriesRows] = await Promise.all([
    getAllPosts(),
    getContentSource() === 'database' ? listPublicSeries() : [],
  ]);
  const seriesBySlug = new Map(seriesRows.map((row) => [row.slug, row]));
  const groups = new Map();

  for (const post of posts) {
    const slug = post.seriesSlug || LOOSE_FOLDER_SLUG;
    const group = groups.get(slug) || [];
    group.push(post);
    groups.set(slug, group);
  }

  return [...groups.entries()]
    .map(([slug, items]) => {
      const isSeries = slug !== LOOSE_FOLDER_SLUG;
      const ordered = isSeries ? [...items].sort(byChapter) : items;
      const dates = items.map((post) => post.date).sort();
      const categories = {};
      for (const post of items) categories[post.category] = (categories[post.category] || 0) + 1;

      return {
        slug,
        isSeries,
        name: isSeries ? seriesBySlug.get(slug)?.name || items[0].series : 'Catatan Lepas',
        description: isSeries
          ? seriesBySlug.get(slug)?.description || ordered[0].excerpt
          : 'Tulisan yang tidak masuk seri mana pun, urut dari yang terbaru.',
        posts: ordered,
        count: items.length,
        minutes: items.reduce((total, post) => total + post.readingTime, 0),
        firstDate: dates[0],
        lastDate: dates[dates.length - 1],
        categories,
      };
    })
    .sort((a, b) => b.lastDate.localeCompare(a.lastDate));
});

export async function getArchiveFolder(slug) {
  return (await getArchiveFolders()).find((folder) => folder.slug === slug) || null;
}
