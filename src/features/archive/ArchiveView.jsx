'use client';

import { useState, useMemo } from 'react';
import ArchiveHero from '../../components/archive/ArchiveHero';
import ArchiveSearch from '../../components/archive/ArchiveSearch';
import ArchiveGrid from '../../components/archive/ArchiveGrid';
import ArchiveFooter from '../../components/archive/ArchiveFooter';

export default function ArchiveView({ posts }) {
  const [activeFolder, setActiveFolder] = useState('semua');
  const [searchQuery,  setSearchQuery]  = useState('');

  // ── Filter + search + sort ──────────────────────────────────────────────────
  const filteredPosts = useMemo(() => {
    let result = [...posts];

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
  }, [activeFolder, posts, searchQuery]);

  // Key untuk AnimatePresence di ArchiveGrid
  const filterKey = `${activeFolder}__${searchQuery}`;

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>

      {/* Section 1 — Hero */}
      <ArchiveHero totalPosts={posts.length} />

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
        key={filterKey}
        posts={filteredPosts}
        totalFiltered={filteredPosts.length}
        filterKey={filterKey}
        activeFolder={activeFolder}
      />

      {/* Section 4 — Footer minimal */}
      <ArchiveFooter totalPosts={posts.length} />

    </div>
  );
}
