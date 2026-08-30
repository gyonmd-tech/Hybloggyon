// src/components/article/ArticleFooter.jsx
// Penutup artikel: navigasi prev/next + tombol kembali ke arsip.

import { useState } from 'react';
import Link from 'next/link';
import { getCategoryColor } from '../../lib/categoryColors';

function NavCard({ post, direction }) {
  const [isHovered, setIsHovered] = useState(false);
  const cat = getCategoryColor(post?.category);

  if (!post) {
    return <div style={{ flex: 1 }} />;
  }

  const isLeft = direction === 'prev';

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      style={{
        flex:            1,
        display:         'block',
        textDecoration:  'none',
        padding:         'clamp(24px, 4vh, 40px)',
        border:          '1px solid var(--color-ink)',
        backgroundColor: isHovered ? 'var(--color-background-ash)' : 'transparent',
        borderColor:     isHovered ? cat.bg : 'var(--color-ink)',
        transition:      'background-color 0.25s ease, border-color 0.25s ease',
        textAlign:       isLeft ? 'left' : 'right',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label arah */}
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         'var(--color-espresso)',
        opacity:       0.6,
        marginBottom:  '10px',
      }}>
        {isLeft ? '← SEBELUMNYA' : 'BERIKUTNYA →'}
      </div>

      {/* Judul */}
      <div style={{
        fontFamily:    'Satoshi, var(--font-heading)',
        fontWeight:    300,
        fontSize:      'clamp(1rem, 2vw, 1.35rem)',
        lineHeight:    1.2,
        letterSpacing: '-0.01em',
        color:         'var(--color-ink)',
        marginBottom:  '8px',
      }}>
        {post.title}
      </div>

      {/* Metadata */}
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '10px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color:         cat.bg,
        opacity:       isHovered ? 1 : 0.8,
        transition:    'opacity 0.2s ease',
      }}>
        {cat.label}
      </div>
    </Link>
  );
}

export default function ArticleFooter({ prevPost, nextPost }) {
  const [backHovered, setBackHovered] = useState(false);

  return (
    <footer
      style={{
        paddingTop:    'clamp(40px, 6vh, 64px)',
        paddingBottom: 'clamp(48px, 8vh, 80px)',
        paddingLeft:   'clamp(24px, 6vw, 80px)',
        paddingRight:  'clamp(24px, 6vw, 80px)',
        borderTop:     '2px solid var(--color-ink)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      {/* Navigasi Prev / Next */}
      {(prevPost || nextPost) && (
        <div style={{
          display: 'flex',
          gap:     '1px',
          marginBottom: '40px',
        }}>
          <NavCard post={prevPost} direction="prev" />
          {prevPost && nextPost && (
            <div style={{ width: '1px', backgroundColor: 'var(--color-ink)', flexShrink: 0 }} />
          )}
          <NavCard post={nextPost} direction="next" />
        </div>
      )}

      {/* Tombol Kembali ke Arsip */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: prevPost || nextPost ? '0' : '0' }}>
        <Link
          href="/archive"
          style={{
            fontFamily:      'var(--font-mono)',
            fontSize:        '12px',
            letterSpacing:   '0.1em',
            textTransform:   'uppercase',
            color:           backHovered ? 'var(--color-background)' : 'var(--color-ink)',
            backgroundColor: backHovered ? 'var(--color-ink)' : 'transparent',
            border:          '1px solid var(--color-ink)',
            padding:         '10px 28px',
            textDecoration:  'none',
            display:         'inline-block',
            transition:      'background-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
        >
          ← KEMBALI KE ARSIP
        </Link>
      </div>
    </footer>
  );
}
