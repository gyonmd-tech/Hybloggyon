// src/components/article/ArticleHero.jsx
// Hero halaman baca artikel: badge kategori berwarna, judul besar, subjudul, metadata bar.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getCategoryColor } from '../../lib/categoryColors';

function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ArticleHero({ frontmatter, rawContent }) {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef   = useRef(null);
  const metaRef  = useRef(null);

  const cat      = getCategoryColor(frontmatter?.category);
  const readTime = estimateReadTime(rawContent);
  const date     = formatDate(frontmatter?.date);
  const tags     = frontmatter?.tags ?? [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current,  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.2')
        .fromTo(subRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo(metaRef.current,   { opacity: 0 },        { opacity: 1, duration: 0.5 },       '-=0.2');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        paddingTop:      'clamp(80px, 12vh, 120px)',
        paddingBottom:   'clamp(40px, 6vh, 64px)',
        paddingLeft:     'clamp(24px, 6vw, 80px)',
        paddingRight:    'clamp(24px, 6vw, 80px)',
        backgroundColor: 'var(--color-background)',
        borderBottom:    '1px solid var(--color-ink)',
        display:         'flex',
        flexDirection:   'column',
        gap:             '20px',
      }}
    >
      {/* Judul */}
      <h1
        ref={titleRef}
        style={{
          fontFamily:    'Satoshi, var(--font-heading)',
          fontWeight:    300,
          fontSize:      'clamp(2.5rem, 6vw, 7rem)',
          lineHeight:    1.0,
          letterSpacing: '-0.04em',
          color:         'var(--color-ink)',
          margin:        0,
          opacity:       0,
          maxWidth:      '16ch',
        }}
      >
        {frontmatter?.title}
      </h1>

      {/* Subjudul (opsional) */}
      {frontmatter?.subtitle && (
        <p
          ref={subRef}
          style={{
            fontFamily: 'Switzer, var(--font-sans)',
            fontSize:   '1.15rem',
            fontWeight: 400,
            color:      'var(--color-espresso)',
            lineHeight: 1.5,
            maxWidth:   '60ch',
            margin:     0,
            opacity:    0,
          }}
        >
          {frontmatter.subtitle}
        </p>
      )}
      {/* Jika tidak ada subtitle, ref tetap harus ada agar animasi tidak crash */}
      {!frontmatter?.subtitle && <span ref={subRef} style={{ display: 'none' }} />}

      {/* Metadata Bar */}
      <div
        ref={metaRef}
        style={{
          display:       'flex',
          alignItems:    'center',
          flexWrap:      'wrap',
          gap:           '8px',
          marginTop:     '8px',
          fontFamily:    'var(--font-mono)',
          fontSize:      '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         'var(--color-espresso)',
          opacity:       0,
        }}
      >
        {date && <span>{date}</span>}
        {date && <span style={{ opacity: 0.4 }}>·</span>}
        <span>{readTime} MENIT BACA</span>
        {tags.length > 0 && <span style={{ opacity: 0.4 }}>·</span>}
        {tags.map((tag, i) => (
          <span key={i} style={{ opacity: 0.7 }}>
            {tag}{i < tags.length - 1 && <span style={{ marginLeft: '8px', opacity: 0.4 }}>·</span>}
          </span>
        ))}
      </div>
    </section>
  );
}
