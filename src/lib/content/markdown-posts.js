import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export const POST_CATEGORIES = ['esai', 'notes', 'musik', 'film-anime'];

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

function normalizeDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function normalizePost(fileName, source, includeContent) {
  const { data, content } = matter(source);
  const fileSlug = fileName.replace(/\.mdx?$/, '');
  const slug = String(data.slug || fileSlug);
  const coverImage = String(data.coverImage || '');
  const coverExists = coverImage.startsWith('/')
    ? fs.existsSync(path.join(process.cwd(), 'public', coverImage.slice(1)))
    : Boolean(coverImage);

  return {
    title: String(data.title || ''),
    subtitle: String(data.subtitle || ''),
    category: String(data.category || ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    date: normalizeDate(data.date),
    updatedAt: normalizeDate(data.updatedAt || data.date),
    slug,
    featured: data.featured === true,
    excerpt: String(data.excerpt || ''),
    coverImage,
    coverExists,
    readingTime: Number(data.readingTime) || Math.max(1, Math.ceil(readingTime(content).minutes)),
    pullQuote: String(data.pullQuote || ''),
    series: String(data.series || ''),
    seriesOrder: Number(data.seriesOrder) || null,
    seoTitle: String(data.seoTitle || ''),
    seoDescription: String(data.seoDescription || ''),
    canonicalUrl: String(data.canonicalUrl || ''),
    ogImageUrl: String(data.ogImageUrl || ''),
    noIndex: data.noIndex === true,
    url: `/${data.category}/${slug}`,
    fileName,
    ...(includeContent ? { content } : {}),
  };
}

export function getAllPosts({ includeContent = false } = {}) {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
      return normalizePost(fileName, source, includeContent);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostByRoute(category, slug) {
  return (
    getAllPosts({ includeContent: true }).find(
      (post) => post.category === category && post.slug === slug,
    ) || null
  );
}

export function getPostNavigation(post, allPosts = getAllPosts()) {
  const index = allPosts.findIndex((candidate) => candidate.url === post.url);

  return {
    previous: index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null,
    next: index > 0 ? allPosts[index - 1] : null,
    related: allPosts
      .filter(
        (candidate) =>
          candidate.url !== post.url && candidate.category === post.category,
      )
      .slice(0, 3),
  };
}

export function getPostRouteParams() {
  return getAllPosts().map(({ category, slug }) => ({ category, slug }));
}

export function validatePosts() {
  const posts = getAllPosts({ includeContent: true });
  const errors = [];
  const warnings = [];
  const seenRoutes = new Set();

  for (const post of posts) {
    const fileSlug = post.fileName.replace(/\.mdx?$/, '');

    if (!post.title) errors.push(`${post.fileName}: title wajib diisi.`);
    if (!POST_CATEGORIES.includes(post.category)) {
      errors.push(`${post.fileName}: category "${post.category}" tidak dikenali.`);
    }
    if (post.slug !== fileSlug) {
      errors.push(`${post.fileName}: slug harus sama dengan nama file (${fileSlug}).`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
      errors.push(`${post.fileName}: date harus memakai format YYYY-MM-DD.`);
    }
    if (!post.excerpt) warnings.push(`${post.fileName}: excerpt belum diisi.`);
    if (!post.content.trim()) errors.push(`${post.fileName}: isi artikel kosong.`);
    if (seenRoutes.has(post.url)) errors.push(`${post.fileName}: route ${post.url} duplikat.`);
    seenRoutes.add(post.url);

    if (post.coverImage.startsWith('/')) {
      const coverPath = path.join(process.cwd(), 'public', post.coverImage.slice(1));
      if (!fs.existsSync(coverPath)) {
        warnings.push(`${post.fileName}: cover tidak ditemukan (${post.coverImage}).`);
      }
    }
  }

  return { posts, errors, warnings };
}
