// src/components/archive/PostRow.jsx
// Baris tulisan ala Substack: teks di kiri, thumbnail cover di kanan.

import Link from 'next/link';
import PostCover from '../PostCover';
import { getCategoryPalette } from '../../lib/covers';
import { formatDate } from '../../utils/formatDate';

export const POST_ROW_CSS = `
  .post-row {
    display: grid; grid-template-columns: minmax(0, 1fr) 200px; gap: 32px; align-items: center;
    padding: 24px 0; border-bottom: 1px solid rgba(18,18,20,0.15);
    color: var(--color-ink); text-decoration: none;
  }
  .post-row--numbered { grid-template-columns: 64px minmax(0, 1fr) 200px; }
  .post-row:hover .post-row-title { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; }
  .post-row-num { font-family: var(--font-heading); font-weight: 300; font-size: 40px; letter-spacing: -0.04em; }
  .post-row-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-espresso); }
  .post-row-title { font-family: var(--font-heading); font-weight: 400; font-size: clamp(20px, 2.2vw, 28px); letter-spacing: -0.03em; line-height: 1.15; margin: 0; }
  .post-row-excerpt { font-family: var(--font-sans); font-size: 15px; line-height: 1.6; color: var(--color-espresso); margin: 0; max-width: 62ch; }
  .post-row-state { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; border: 1px solid currentColor; padding: 3px 8px; }
  .post-row-thumb { border: 1px solid var(--color-ink); }
  @media (max-width: 768px) {
    .post-row { grid-template-columns: minmax(0, 1fr) 96px; gap: 16px; padding: 18px 0; }
    .post-row--numbered { grid-template-columns: 36px minmax(0, 1fr) 96px; }
    .post-row-num { font-size: 24px; }
    .post-row-excerpt { font-size: 13px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  }
`;

export default function PostRow({ post, number, state }) {
  const palette = getCategoryPalette(post.category);
  const chapter = post.seriesOrder ? ` · Bab ${String(post.seriesOrder).padStart(2, '0')}` : '';

  return (
    <Link href={post.url} className={number ? 'post-row post-row--numbered' : 'post-row'}>
      {number ? (
        <span className="post-row-num" style={{ opacity: state === 'read' ? 0.45 : 1 }}>
          {String(number).padStart(2, '0')}
        </span>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
        <span className="post-row-meta">{palette.name}{chapter}</span>
        <h3 className="post-row-title">{post.title}</h3>
        {post.excerpt ? <p className="post-row-excerpt">{post.excerpt}</p> : null}
        <span className="post-row-meta" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span>{formatDate(post.date)} · {post.readingTime} menit</span>
          {state === 'read' ? <span className="post-row-state">Dibaca</span> : null}
          {state === 'next' ? <span className="post-row-state" style={{ color: 'var(--color-ink)' }}>Berikutnya</span> : null}
        </span>
      </div>
      <div className="post-row-thumb">
        <PostCover post={post} />
      </div>
    </Link>
  );
}
