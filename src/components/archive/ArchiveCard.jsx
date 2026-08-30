// src/components/archive/ArchiveCard.jsx
// Card grid dengan background berwarna dari kategori.
// Hover menggunakan efek tactile press (scale down) dan animasi garis bawah pada judul.
// CTA menggunakan Link untuk navigasi ke halaman artikel.

import { useState } from 'react';
import Link from 'next/link';
import { getCategoryColor } from '../../lib/categoryColors';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ArchiveCard({ post, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cat = getCategoryColor(post.category);
  const num = String(index + 1).padStart(2, '0');
  const dateFormatted = formatDate(post.date);

  const bgColor    = cat.bg;
  const textColor  = cat.text;
  const articleUrl = `/${post.category}/${post.slug}`;

  return (
    <article
      className="archive-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border:          `1px solid ${textColor}`,
        padding:         '1.5rem',
        display:         'flex',
        flexDirection:   'column',
        gap:             '16px',
        cursor:          'pointer',
        backgroundColor: bgColor,
        color:           textColor,
        transition:      'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
        minHeight:       '240px',
        position:        'relative',
        zIndex:          1,
        transform:       isHovered ? 'scale(0.98)' : 'scale(1)',
        filter:          isHovered ? 'brightness(0.95)' : 'brightness(1)',
      }}
    >
      {/* Top Header: Nomor & Tanggal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '14px',
          letterSpacing: '0.04em',
          color:         textColor,
          lineHeight:    1,
          fontWeight:    500,
        }}>
          {num}.
        </span>

        {dateFormatted && (
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '10px',
            letterSpacing: '0.06em',
            color:         textColor,
            opacity:       0.7,
          }}>
            {dateFormatted}
          </span>
        )}
      </div>

      {/* Judul & Deskripsi Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Judul dengan animasi garis bawah */}
        <div style={{ display: 'inline-block', position: 'relative', alignSelf: 'flex-start' }}>
          <h2 style={{
            fontFamily:    'Satoshi, var(--font-heading)',
            fontWeight:    400,
            fontSize:      'clamp(1.1rem, 1.5vw, 1.35rem)',
            lineHeight:    1.25,
            letterSpacing: '-0.02em',
            color:         textColor,
            margin:        0,
          }}>
            {post.title}
          </h2>
          {/* Animated underline */}
          <div style={{
            position:        'absolute',
            bottom:          '-2px',
            left:            0,
            height:          '1px',
            backgroundColor: textColor,
            width:           isHovered ? '100%' : '0%',
            transition:      'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />
        </div>

        {/* Deskripsi */}
        {post.excerpt && (
          <p style={{
            fontFamily:      'Switzer, var(--font-sans)',
            fontSize:        '0.85rem',
            color:           textColor,
            lineHeight:      1.6,
            margin:          0,
            overflow:        'hidden',
            display:         '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            opacity:         0.8,
          }}>
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{
        height:          '1px',
        backgroundColor: textColor,
        opacity:         0.2,
        marginTop:       '8px',
      }} />

      {/* Footer: kategori + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        {/* Kategori label */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '10px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         textColor,
          fontWeight:    500,
          opacity:       0.9,
        }}>
          // {cat.label}
        </span>

        {/* CTA — Link ke halaman artikel */}
        <Link
          href={articleUrl}
          style={{
            fontFamily:      'var(--font-mono)',
            fontSize:        '10px',
            letterSpacing:   '0.08em',
            textTransform:   'uppercase',
            color:           isHovered ? bgColor : textColor,
            backgroundColor: isHovered ? textColor : 'transparent',
            border:          `1px solid ${textColor}`,
            padding:         '6px 12px',
            textDecoration:  'none',
            transition:      'background-color 0.2s ease, color 0.2s ease',
            flexShrink:      0,
            display:         'flex',
            alignItems:      'center',
            gap:             '6px',
            whiteSpace:      'nowrap',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>READ</span>
          <svg
            width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"
            style={{
              transform:  isHovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
