'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArchiveCard from '../../components/archive/ArchiveCard';
import { getCategoryColor } from '../../lib/categoryColors';

const CATEGORY_CSS = `
  .category-page { background-color: var(--color-background); min-height: 100vh; }
  .category-hero {
    padding: clamp(120px, 18vh, 180px) clamp(24px, 6vw, 80px) clamp(40px, 6vh, 64px);
    border-bottom: 1px solid var(--color-ink);
    display: flex; flex-direction: column; gap: 20px;
  }
  .category-eyebrow {
    align-self: flex-start;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 6px 12px; border: 1px solid var(--color-ink);
  }
  .category-title {
    font-family: Satoshi, var(--font-heading); font-weight: 300;
    font-size: clamp(2.75rem, 9vw, 7rem); letter-spacing: -0.04em; line-height: 0.95;
    color: var(--color-ink); margin: 0;
  }
  .category-desc {
    font-family: var(--font-body, var(--font-heading)); font-size: clamp(1rem, 1.6vw, 1.2rem);
    color: var(--color-espresso); max-width: 56ch; margin: 0; line-height: 1.6;
  }
  .category-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--color-espresso); opacity: 0.7; }
  .category-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;
    padding: 48px clamp(24px, 6vw, 80px);
  }
  .category-empty {
    margin: 48px clamp(24px, 6vw, 80px); padding: 80px 24px; border: 1px dashed var(--color-ink);
    text-align: center; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--color-espresso);
  }
  .category-pagination {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    padding: 0 clamp(24px, 6vw, 80px) 80px;
    font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  }
  .category-page-link {
    color: var(--color-ink); border: 1px solid var(--color-ink); padding: 12px 24px; text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .category-page-link:hover { background-color: var(--color-ink); color: var(--color-background); }
  .category-page-link[aria-disabled='true'] { visibility: hidden; }
`;

function pageHref(basePath, page) {
  return page <= 1 ? basePath : `${basePath}?halaman=${page}`;
}

export default function CategoryView({ category, posts, page, totalPages, offset, footerContent }) {
  const color = getCategoryColor(category.slug, category.name);

  return (
    <>
      <style>{CATEGORY_CSS}</style>
      <Header />

      <main className="category-page">
        <section className="category-hero">
          <span className="category-eyebrow" style={{ backgroundColor: color.bg, color: color.text, borderColor: color.bg }}>
            Kategori
          </span>
          <h1 className="category-title">{category.name}</h1>
          {category.description ? <p className="category-desc">{category.description}</p> : null}
          <span className="category-meta">
            {category.count} TULISAN{totalPages > 1 ? ` · HALAMAN ${page} DARI ${totalPages}` : ''}
          </span>
        </section>

        {posts.length ? (
          <div className="category-grid">
            {posts.map((post, index) => (
              <ArchiveCard key={post.url} post={post} index={offset + index} />
            ))}
          </div>
        ) : (
          <p className="category-empty">BELUM ADA TULISAN DI KATEGORI INI</p>
        )}

        {totalPages > 1 ? (
          <nav className="category-pagination" aria-label="Navigasi halaman">
            <Link
              className="category-page-link"
              href={pageHref(category.href, page - 1)}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
            >
              ← Sebelumnya
            </Link>
            <span>{page} / {totalPages}</span>
            <Link
              className="category-page-link"
              href={pageHref(category.href, page + 1)}
              aria-disabled={page >= totalPages}
              tabIndex={page >= totalPages ? -1 : undefined}
            >
              Berikutnya →
            </Link>
          </nav>
        ) : null}
      </main>

      <Footer contact={footerContent} />
    </>
  );
}
