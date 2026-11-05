'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostCover from '../../components/PostCover';
import PostRow, { POST_ROW_CSS } from '../../components/archive/PostRow';
import { useReadUrls } from '../../lib/readingProgress';
import { getCategoryPalette } from '../../lib/covers';
import { formatDate } from '../../utils/formatDate';

const FOLDER_PAGE_CSS = `
  .folder-page { background: var(--color-background); min-height: 100vh; color: var(--color-ink); }
  .folder-wrap { max-width: 1280px; margin: 0 auto; padding-left: clamp(20px, 6vw, 80px); padding-right: clamp(20px, 6vw, 80px); box-sizing: border-box; }
  .folder-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 56px; align-items: center; }
  .folder-mono { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; }
  .folder-button { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; padding: 16px 24px; text-decoration: none; border: 1px solid var(--color-ink); }
  @media (max-width: 900px) { .folder-head { grid-template-columns: minmax(0, 1fr); gap: 28px; } }
`;

export default function FolderView({ folder, footerContent }) {
  const readUrls = useReadUrls();

  const readCount = folder.posts.filter((post) => readUrls.has(post.url)).length;
  const nextPost = folder.posts.find((post) => !readUrls.has(post.url));
  const coverPost = { slug: folder.slug, title: folder.name, category: folder.posts[0].category };
  const composition = Object.entries(folder.categories).map(([slug, count]) => `${count} ${getCategoryPalette(slug).name}`).join(' · ');

  return (
    <>
      <style>{FOLDER_PAGE_CSS + POST_ROW_CSS}</style>
      <Header />

      <main className="folder-page">
        <section className="folder-wrap" style={{ paddingTop: 'clamp(110px, 16vh, 160px)', paddingBottom: '72px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <nav aria-label="Breadcrumb" className="folder-mono" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', textTransform: 'uppercase' }}>
            <Link href="/archive" style={{ color: 'var(--color-ink)', padding: '12px 0' }}>Arsip</Link>
            <span aria-hidden="true" style={{ padding: '12px 0' }}>/</span>
            <span style={{ padding: '12px 0', color: 'var(--color-espresso)' }}>{folder.name}</span>
          </nav>

          <div className="folder-head">
            <div style={{ border: '1px solid var(--color-ink)', boxShadow: '8px 8px 0 var(--color-ink)' }}>
              <PostCover
                post={coverPost}
                title={folder.name}
                label={folder.isSeries ? `Seri · ${folder.count} bab` : `Lepas · ${folder.count} tulisan`}
                priority
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span className="folder-mono" style={{ textTransform: 'uppercase', color: 'var(--color-espresso)' }}>
                {folder.isSeries ? 'Folder seri' : 'Folder'} · {folder.count} tulisan · {folder.minutes} menit
              </span>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 0.95 }}>
                {folder.name}
              </h1>
              {folder.description ? (
                <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: 'var(--color-espresso)' }}>{folder.description}</p>
              ) : null}
              <span className="folder-mono" style={{ color: 'var(--color-espresso)', textTransform: 'uppercase' }}>
                {formatDate(folder.firstDate)} – {formatDate(folder.lastDate)} · {composition}
              </span>

              {folder.isSeries ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <div className="folder-mono" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Progres membacamu</span>
                    <span>{readCount} / {folder.count} bab</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label="Progres membaca seri"
                    aria-valuemin={0}
                    aria-valuemax={folder.count}
                    aria-valuenow={readCount}
                    style={{ height: '8px', background: 'var(--color-background-alt)', border: '1px solid var(--color-ink)' }}
                  >
                    <div style={{ width: `${(readCount / folder.count) * 100}%`, height: '100%', background: 'var(--color-ink)', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ) : null}

              {folder.isSeries ? (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {readCount > 0 && nextPost ? (
                    <Link href={nextPost.url} className="folder-button" style={{ background: 'var(--color-ink)', color: 'var(--color-background)' }}>
                      Lanjutkan: Bab {String(nextPost.seriesOrder ?? folder.posts.indexOf(nextPost) + 1).padStart(2, '0')} →
                    </Link>
                  ) : null}
                  <Link
                    href={folder.posts[0].url}
                    className="folder-button"
                    style={readCount > 0 && nextPost ? { color: 'var(--color-ink)' } : { background: 'var(--color-ink)', color: 'var(--color-background)' }}
                  >
                    Mulai dari Bab 1
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="folder-wrap" style={{ paddingBottom: '112px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', borderBottom: '1px solid var(--color-ink)', paddingBottom: '16px' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 300, letterSpacing: '-0.03em' }}>
              {folder.isSeries ? 'Daftar isi' : 'Semua tulisan'}
            </h2>
            <span className="folder-mono" style={{ color: 'var(--color-espresso)' }}>
              {folder.isSeries ? 'Urut sesuai bab' : 'Urut terbaru'}
            </span>
          </div>
          {folder.posts.map((post, index) => (
            <PostRow
              key={post.url}
              post={post}
              number={folder.isSeries ? post.seriesOrder ?? index + 1 : undefined}
              state={readUrls.has(post.url) ? 'read' : post === nextPost && readCount > 0 ? 'next' : undefined}
            />
          ))}
        </section>
      </main>

      <Footer contact={footerContent} />
    </>
  );
}
