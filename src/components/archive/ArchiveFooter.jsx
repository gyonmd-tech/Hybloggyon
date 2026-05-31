// src/components/archive/ArchiveFooter.jsx
// Penutup yang lebih elegant, clear, dengan spacing yang lebih lega

import { Link } from 'react-router-dom';

export default function ArchiveFooter({ totalPosts }) {
  return (
    <footer
      style={{
        paddingTop:    '80px',
        paddingBottom: '80px',
        paddingLeft:   'clamp(24px, 6vw, 80px)',
        paddingRight:  'clamp(24px, 6vw, 80px)',
        borderTop:     '1px solid var(--color-ink)',
        backgroundColor: 'var(--color-background-ash)', // Menggunakan warna abu lembut untuk closing
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        justifyContent:'center',
        gap:           '32px',
        transition:    'background-color 0.4s ease',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         'var(--color-ink)',
        }}>
          END OF ARCHIVE
        </span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '11px',
          color:         'var(--color-espresso)',
          opacity:       0.6,
          letterSpacing: '0.04em',
        }}>
          {totalPosts} tulisan telah tersimpan
        </span>
      </div>

      <Link
        to="/"
        style={{
          fontFamily:      'var(--font-mono)',
          fontSize:        '12px',
          letterSpacing:   '0.1em',
          textTransform:   'uppercase',
          color:           'var(--color-background)',
          backgroundColor: 'var(--color-ink)',
          padding:         '12px 32px',
          textDecoration:  'none',
          transition:      'background-color 0.2s ease, transform 0.2s ease',
          display:         'inline-block',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--color-espresso)';
          e.currentTarget.style.transform       = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'var(--color-ink)';
          e.currentTarget.style.transform       = 'translateY(0)';
        }}
      >
        KEMBALI KE BERANDA
      </Link>
    </footer>
  );
}
