// src/components/article/ArticleSidebar.jsx
// Sidebar sticky: metadata, TOC, dan artikel terkait.

import { useState } from 'react';
import Link from 'next/link';
import { getCategoryColor } from '../../lib/categoryColors';
import TableOfContents from './TableOfContents';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function SidebarLabel({ children }) {
  return (
    <div style={{
      fontFamily:    'var(--font-mono)',
      fontSize:      '10px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color:         'var(--color-espresso)',
      opacity:       0.7,
      borderBottom:  '1px solid var(--color-ink)',
      paddingBottom: '8px',
      marginBottom:  '14px',
    }}>
      {children}
    </div>
  );
}

function RelatedArticle({ post }) {
  const [isHovered, setIsHovered] = useState(false);
  const cat = getCategoryColor(post.category);

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      style={{
        display:       'block',
        textDecoration:'none',
        padding:       '10px 0',
        borderBottom:  '1px solid var(--color-background-ash)',
        transform:     isHovered ? 'translateX(4px)' : 'translateX(0)',
        transition:    'transform 0.2s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        fontFamily:    'Satoshi, var(--font-heading)',
        fontWeight:    300,
        fontSize:      '0.9rem',
        lineHeight:    1.3,
        color:         isHovered ? cat.bg : 'var(--color-ink)',
        marginBottom:  '4px',
        transition:    'color 0.2s ease',
      }}>
        {post.title}
      </div>
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '10px',
        letterSpacing: '0.06em',
        color:         'var(--color-espresso)',
        opacity:       0.6,
      }}>
        {formatDate(post.date)}
      </div>
    </Link>
  );
}

export default function ArticleSidebar({
  frontmatter,
  headings,
  relatedPosts,
  accentColor,
  readTime,
}) {
  const cat  = getCategoryColor(frontmatter?.category);
  const tags = frontmatter?.tags ?? [];

  return (
    <aside
      style={{
        position:  'sticky',
        top:       '80px',
        width:     '280px',
        flexShrink: 0,
        display:   'flex',
        flexDirection: 'column',
        gap:       '32px',
        alignSelf: 'flex-start', // Penting agar sticky bekerja dalam flex container
      }}
    >
      {/* Blok 1 — Metadata */}
      <div>
        <SidebarLabel>Tentang Tulisan Ini</SidebarLabel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {frontmatter?.date && (
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '11px',
              letterSpacing: '0.06em',
              color:         'var(--color-espresso)',
            }}>
              <span style={{ opacity: 0.6, marginRight: '8px' }}>Tanggal</span>
              <span>{formatDate(frontmatter.date)}</span>
            </div>
          )}

          {readTime && (
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '11px',
              letterSpacing: '0.06em',
              color:         'var(--color-espresso)',
            }}>
              <span style={{ opacity: 0.6, marginRight: '8px' }}>Baca</span>
              <span>{readTime} menit</span>
            </div>
          )}

          {/* Badge Kategori */}
          <div style={{ marginTop: '4px' }}>
            <span style={{
              fontFamily:      'var(--font-mono)',
              fontSize:        '10px',
              letterSpacing:   '0.1em',
              textTransform:   'uppercase',
              fontWeight:      600,
              color:           cat.text,
              backgroundColor: cat.bg,
              padding:         '3px 8px',
              display:         'inline-block',
            }}>
              {cat.label}
            </span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
              {tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '10px',
                    letterSpacing: '0.06em',
                    color:         'var(--color-espresso)',
                    opacity:       0.7,
                    border:        '1px solid var(--color-background-ash)',
                    padding:       '2px 7px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blok 2 — TOC */}
      {headings?.length > 0 && (
        <TableOfContents headings={headings} accentColor={accentColor} />
      )}

      {/* Blok 3 — Artikel Terkait */}
      {relatedPosts?.length > 0 && (
        <div>
          <SidebarLabel>Baca Juga</SidebarLabel>
          <div>
            {relatedPosts.slice(0, 3).map((post, i) => (
              <RelatedArticle key={post.slug ?? i} post={post} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
