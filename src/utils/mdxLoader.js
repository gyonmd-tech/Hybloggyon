// src/utils/mdxLoader.js
// Load semua artikel MDX via Vite's import.meta.glob
// Termasuk frontmatter dan component

const modules = import.meta.glob('/content/**/*.mdx', { eager: true });

/**
 * Ambil semua artikel dari /content, sorted by date (terbaru duluan)
 * @returns {Array<{slug: string, category: string, title: string, date: string, excerpt: string, coverImage: string, readingTime: number, featured: boolean, Component: Function}>}
 */
export function getAllArticles() {
  return Object.entries(modules)
    .map(([filepath, module]) => {
      const { frontmatter } = module;
      const slug = filepath
        .replace('/content/', '')
        .replace('.mdx', '');
      return {
        slug,
        ...frontmatter,
        Component: module.default,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Ambil artikel berdasarkan kategori
 * @param {string} category - esai | notes | musik | film-anime
 */
export function getArticlesByCategory(category) {
  return getAllArticles().filter((a) => a.category === category);
}

/**
 * Ambil satu artikel berdasarkan slug penuh (contoh: "esai/judul-artikel")
 * @param {string} fullSlug - format: "kategori/slug"
 */
export function getArticleBySlug(fullSlug) {
  return getAllArticles().find((a) => a.slug === fullSlug);
}

/**
 * Ambil artikel yang di-featured (untuk hero section)
 */
export function getFeaturedArticle() {
  return getAllArticles().find((a) => a.featured === true);
}
