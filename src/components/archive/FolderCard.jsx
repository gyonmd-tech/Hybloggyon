// src/components/archive/FolderCard.jsx
// Satu folder arsip berbentuk map: tab label, tumpukan kertas, dan intip isi.

import Link from 'next/link';
import { getCategoryPalette } from '../../lib/covers';
import { formatDate } from '../../utils/formatDate';

export const FOLDER_CSS = `
  .folder-card { display: flex; flex-direction: column; color: var(--color-ink); text-decoration: none; }
  .folder-tab {
    align-self: flex-start; border: 1px solid var(--color-ink); border-bottom: 0; padding: 8px 18px;
    font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  }
  .folder-stack { position: relative; }
  .folder-sheet { position: absolute; border: 1px solid var(--color-ink); transition: transform 0.3s ease; }
  .folder-body {
    position: relative; border: 1px solid var(--color-ink); padding: 28px; min-height: 340px; box-sizing: border-box;
    display: flex; flex-direction: column; gap: 18px; transition: transform 0.3s ease;
  }
  .folder-card:hover .folder-body { transform: translate(-4px, -4px); }
  .folder-card:hover .folder-sheet--back { transform: translate(4px, 4px); }
  .folder-peek { background: var(--color-background); border: 1px solid var(--color-ink); padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
  .folder-mono { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; }
`;

function dominantCategory(folder) {
  const latest = folder.posts.reduce((a, b) => (a.date > b.date ? a : b)).category;
  return Object.entries(folder.categories)
    .sort(([slugA, a], [slugB, b]) => b - a || (slugB === latest) - (slugA === latest))[0][0];
}

function monthRange(folder) {
  const first = formatDate(folder.firstDate).slice(3);
  const last = formatDate(folder.lastDate).slice(3);
  return first === last ? first : `${first} – ${last}`;
}

export default function FolderCard({ folder }) {
  const palette = folder.isSeries
    ? getCategoryPalette(dominantCategory(folder))
    : { bg: '#E4E4E7', fg: '#121214' };
  const peek = folder.posts.slice(0, 3);
  const composition = Object.entries(folder.categories)
    .map(([slug, count]) => `${count} ${getCategoryPalette(slug).name}`)
    .join(' · ');

  return (
    <Link href={`/archive/${folder.slug}`} className="folder-card">
      <span className="folder-tab" style={{ backgroundColor: palette.bg, color: palette.fg }}>
        {folder.isSeries ? `Seri · ${folder.count} bab` : `Lepas · ${folder.count}`}
      </span>
      <div className="folder-stack">
        <div className="folder-sheet folder-sheet--back" aria-hidden="true" style={{ inset: '10px -10px -10px 10px', backgroundColor: '#EBD4C1' }} />
        <div className="folder-sheet" aria-hidden="true" style={{ inset: '5px -5px -5px 5px', backgroundColor: '#F4F4F5' }} />
        <div className="folder-body" style={{ backgroundColor: palette.bg, color: palette.fg }}>
          <div className="folder-mono" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', textTransform: 'uppercase' }}>
            <span>{monthRange(folder)}</span>
            <span>{folder.minutes} menit</span>
          </div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 3vw, 40px)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {folder.name}
          </h2>
          <div className="folder-peek" style={{ color: 'var(--color-ink)' }}>
            {peek.map((post, index) => (
              <span key={post.url} style={{ display: 'flex', gap: '12px' }}>
                <span className="folder-mono" style={{ color: 'var(--color-espresso)' }}>
                  {String(folder.isSeries ? post.seriesOrder ?? index + 1 : index + 1).padStart(2, '0')}
                </span>
                {post.title}
              </span>
            ))}
            {folder.count > peek.length ? (
              <span className="folder-mono" style={{ color: 'var(--color-espresso)' }}>
                + {folder.count - peek.length} tulisan lagi
              </span>
            ) : null}
          </div>
          <div className="folder-mono" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', textTransform: 'uppercase' }}>
            <span>{composition}</span>
            <span>Buka folder →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
