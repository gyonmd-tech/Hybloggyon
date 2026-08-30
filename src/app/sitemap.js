import { getAllPosts } from '../lib/content/posts';
import { absoluteUrl } from '../config/site';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const staticPages = ['/', '/notes', '/archive', '/hobby', '/about'].map((url) => ({
    url: absoluteUrl(url),
    lastModified: new Date(),
    changeFrequency: url === '/' ? 'weekly' : 'monthly',
    priority: url === '/' ? 1 : 0.7,
  }));

  const articles = (await getAllPosts())
    .filter((post) => !post.noIndex)
    .map((post) => ({
      url: absoluteUrl(post.url),
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticPages, ...articles];
}
