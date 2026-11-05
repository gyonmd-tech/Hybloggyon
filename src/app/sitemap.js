import { getAllPosts } from '../lib/content/posts';
import { getCategories } from '../lib/content/categories';
import { getArchiveFolders } from '../lib/content/archive';
import { absoluteUrl } from '../config/site';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const staticPages = ['/', '/notes', '/archive', '/hobby', '/about'].map((url) => ({
    url: absoluteUrl(url),
    lastModified: new Date(),
    changeFrequency: url === '/' ? 'weekly' : 'monthly',
    priority: url === '/' ? 1 : 0.7,
  }));

  const categoryPages = (await getCategories())
    .filter((category) => category.count > 0 && category.href !== '/notes')
    .map((category) => ({
      url: absoluteUrl(category.href),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  const folderPages = (await getArchiveFolders()).map((folder) => ({
    url: absoluteUrl(`/archive/${folder.slug}`),
    lastModified: new Date(folder.lastDate),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const articles = (await getAllPosts())
    .filter((post) => !post.noIndex)
    .map((post) => ({
      url: absoluteUrl(post.url),
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticPages, ...categoryPages, ...folderPages, ...articles];
}
