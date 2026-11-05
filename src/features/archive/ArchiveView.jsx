'use client';

import { useMemo, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FolderCard, { FOLDER_CSS } from '../../components/archive/FolderCard';
import PostRow, { POST_ROW_CSS } from '../../components/archive/PostRow';

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const ARCHIVE_CSS = `
  .archive-page { background: var(--color-background); min-height: 100vh; color: var(--color-ink); }
  .archive-wrap { max-width: 1280px; margin: 0 auto; padding-left: clamp(20px, 6vw, 80px); padding-right: clamp(20px, 6vw, 80px); box-sizing: border-box; }
  .archive-eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-espresso); }
  .archive-title { font-family: var(--font-heading); font-weight: 300; font-size: clamp(64px, 10vw, 112px); letter-spacing: -0.05em; line-height: 0.92; margin: 0; }
  .archive-search { font: inherit; font-size: 16px; padding: 14px 16px; border: 1px solid var(--color-ink); background: var(--color-paper-white); color: var(--color-ink); width: 100%; box-sizing: border-box; }
  .archive-toggle { display: flex; border: 1px solid var(--color-ink); }
  .archive-toggle button { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 20px; border: 0; cursor: pointer; background: var(--color-paper-white); color: var(--color-ink); }
  .archive-toggle button[aria-pressed='true'] { background: var(--color-ink); color: var(--color-background); }
  .archive-shelf { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 48px 36px; }
  .archive-month { font-family: var(--font-heading); font-weight: 300; font-size: 28px; letter-spacing: -0.03em; margin: 0; padding-bottom: 12px; border-bottom: 1px solid var(--color-ink); }
  .archive-empty { padding: 64px 24px; border: 1px dashed var(--color-ink); text-align: center; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; }
`;

function matches(post, query) {
  const haystack = [post.title, post.excerpt, post.series, ...(post.tags || [])].join(' ').toLowerCase();
  return haystack.includes(query);
}

function groupByMonth(posts) {
  const groups = new Map();
  for (const post of [...posts].sort((a, b) => b.date.localeCompare(a.date))) {
    const [year, month] = post.date.split('-');
    const key = `${year}-${month}`;
    if (!groups.has(key)) groups.set(key, { key, label: `${MONTHS[Number(month) - 1]} ${year}`, posts: [] });
    groups.get(key).posts.push(post);
  }
  return [...groups.values()];
}

export default function ArchiveView({ posts, folders, footerContent }) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState('folder');
  const trimmed = query.trim().toLowerCase();

  const results = useMemo(
    () => (trimmed ? posts.filter((post) => matches(post, trimmed)) : []),
    [posts, trimmed],
  );
  const months = useMemo(() => groupByMonth(posts), [posts]);
  const seriesCount = folders.filter((folder) => folder.isSeries).length;

  return (
    <>
      <style>{ARCHIVE_CSS + FOLDER_CSS + POST_ROW_CSS}</style>
      <Header />

      <main className="archive-page">
        <section className="archive-wrap" style={{ paddingTop: 'clamp(120px, 18vh, 180px)', paddingBottom: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span className="archive-eyebrow">
            Lemari arsip · {posts.length} tulisan · {seriesCount} seri
          </span>
          <h1 className="archive-title">Arsip</h1>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: 'var(--color-espresso)', maxWidth: '56ch' }}>
            Tempat catatan disimpan dan dikelompokkan. Setiap folder adalah satu seri — dibaca berurutan seperti buku.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap', marginTop: '16px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 320px' }}>
              <span className="archive-eyebrow">Cari di semua folder</span>
              <input
                type="search"
                className="archive-search"
                placeholder="Judul, tag, atau kata kunci…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="archive-toggle" role="group" aria-label="Tampilan arsip">
              <button type="button" aria-pressed={view === 'folder'} onClick={() => setView('folder')}>Folder</button>
              <button type="button" aria-pressed={view === 'kronologis'} onClick={() => setView('kronologis')}>Kronologis</button>
            </div>
          </div>
        </section>

        <section className="archive-wrap" style={{ paddingTop: '32px', paddingBottom: '112px' }}>
          {trimmed ? (
            <div>
              <p className="archive-eyebrow" style={{ margin: '0 0 8px' }} aria-live="polite">
                {results.length} hasil untuk “{query.trim()}”
              </p>
              {results.length
                ? results.map((post) => <PostRow key={post.url} post={post} />)
                : <p className="archive-empty">TIDAK ADA TULISAN YANG COCOK</p>}
            </div>
          ) : view === 'folder' ? (
            <div className="archive-shelf">
              {folders.map((folder) => <FolderCard key={folder.slug} folder={folder} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
              {months.map((month) => (
                <div key={month.key}>
                  <h2 className="archive-month">{month.label}</h2>
                  {month.posts.map((post) => <PostRow key={post.url} post={post} />)}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer contact={footerContent} />
    </>
  );
}
