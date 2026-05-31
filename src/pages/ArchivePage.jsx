// src/pages/ArchivePage.jsx
// State management utama — search + folder
// Data diduplikasi untuk mensimulasikan banyak tulisan (minimal 32 item = 8 baris)

import { useState, useMemo } from 'react';
import ArchiveHero   from '../components/archive/ArchiveHero';
import ArchiveSearch from '../components/archive/ArchiveSearch';
import ArchiveGrid   from '../components/archive/ArchiveGrid';
import ArchiveFooter from '../components/archive/ArchiveFooter';

// ── Load seluruh frontmatter MDX ─────────────────────────────────────────────
const mdxModules = import.meta.glob('/src/content/posts/*.mdx', { eager: true });

const REAL_POSTS = Object.values(mdxModules)
  .map(mod => mod.frontmatter)
  .filter(Boolean);

// Duplikasi data agar mencapai minimal 32 items (8 baris x 4 kolom)
let DUMMY_POSTS = [...REAL_POSTS];
while (DUMMY_POSTS.length < 32 && DUMMY_POSTS.length > 0) {
  DUMMY_POSTS = [...DUMMY_POSTS, ...REAL_POSTS.map(p => ({
    ...p,
    slug: p.slug + '-' + Math.random().toString(36).substring(7)
  }))];
}
const ALL_POSTS = DUMMY_POSTS;

export default function ArchivePage() {
  const [activeFolder, setActiveFolder] = useState('semua');
  const [searchQuery,  setSearchQuery]  = useState('');

  // ── Filter + search + sort ──────────────────────────────────────────────────
  const filteredPosts = useMemo(() => {
    let result = [...ALL_POSTS];

    if (activeFolder !== 'semua') {
      result = result.filter(p => p.category === activeFolder);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeFolder, searchQuery]);

  // Key untuk AnimatePresence di ArchiveGrid
  const filterKey = `${activeFolder}__${searchQuery}`;

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>

      {/* Section 1 — Hero */}
      <ArchiveHero totalPosts={ALL_POSTS.length} />

      {/* Section 2 — Search + Folder tabs */}
      <ArchiveSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCount={filteredPosts.length}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
      />

      {/* Section 3 — Grid dengan fitur Show More (Gradient) */}
      <ArchiveGrid
        posts={filteredPosts}
        totalFiltered={filteredPosts.length}
        filterKey={filterKey}
        activeFolder={activeFolder}
      />

      {/* Section 4 — Footer minimal */}
      <ArchiveFooter totalPosts={ALL_POSTS.length} />

    </div>
  );
}
