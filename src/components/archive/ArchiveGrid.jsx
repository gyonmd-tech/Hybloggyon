// src/components/archive/ArchiveGrid.jsx
// Grid 4 kolom, gap 16px.
// Fitur Tampilkan Semua dengan gradient untuk list panjang.

import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchiveCard from './ArchiveCard';

gsap.registerPlugin(ScrollTrigger);

function EmptyState() {
  return (
    <div style={{
      gridColumn:     '1 / -1',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '80px 0',
      border:         '1px dashed var(--color-ink)',
      opacity:        0.5,
    }}>
      <p style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '12px',
        color:         'var(--color-espresso)',
        margin:        0,
        letterSpacing: '0.06em',
      }}>
        TIDAK ADA TULISAN YANG COCOK
      </p>
    </div>
  );
}

export default function ArchiveGrid({
  posts,
  totalFiltered,
  filterKey,
  activeFolder,
}) {
  const sectionRef = useRef(null);
  const didInit    = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_LIMIT = 16; // 4 kolom × 4 baris

  // Reset expand state ketika filter berubah
  useEffect(() => {
    setIsExpanded(false);
  }, [filterKey]);

  // GSAP load awal — hanya sekali
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.archive-card');
        if (!cards?.length) return;

        gsap.fromTo(cards,
          { y: 24, opacity: 0 },
          {
            y:       0,
            opacity: 1,
            duration: 0.45,
            ease:    'power3.out',
            stagger: 0.045,
            scrollTrigger: {
              trigger: sectionRef.current,
              start:   'top 88%',
              once:    true,
            },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const sectionLabels = {
    semua:       'SEMUA TULISAN',
    esai:        'ESAI',
    notes:       'NOTES',
    musik:       'MUSIK',
    'film-anime':'FILM & ANIME',
  };

  const visiblePosts = isExpanded ? posts : posts.slice(0, INITIAL_LIMIT);
  const hasMore = posts.length > INITIAL_LIMIT;

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop:      '48px',
        paddingLeft:     'clamp(24px, 6vw, 80px)',
        paddingRight:    'clamp(24px, 6vw, 80px)',
        paddingBottom:   '80px',
        backgroundColor: 'var(--color-background)',
        transition:      'background-color 0.4s ease',
      }}
    >
      {/* Section header */}
      <div style={{
        display:        'flex',
        alignItems:     'baseline',
        justifyContent: 'space-between',
        borderBottom:   '1px solid var(--color-ink)',
        paddingBottom:  '12px',
        marginBottom:   '32px',
      }}>
        <h2 style={{
          fontFamily:    'Satoshi, var(--font-heading)',
          fontWeight:    300,
          fontSize:      'clamp(1.5rem, 3vw, 2.5rem)',
          letterSpacing: '-0.03em',
          color:         'var(--color-ink)',
          margin:        0,
        }}>
          {sectionLabels[activeFolder] ?? 'ARSIP'}
        </h2>

        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '11px',
          color:         'var(--color-espresso)',
          opacity:       0.7,
          letterSpacing: '0.06em',
        }}>
          {totalFiltered} ITEM [{String(totalFiltered).padStart(2, '0')}]
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Grid — AnimatePresence per filter/search */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{   opacity: 0, y: -8  }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap:                 '16px', // Gap rapi tanpa bg hitam
            }}
          >
            {visiblePosts.length === 0 ? (
              <EmptyState />
            ) : (
              visiblePosts.map((post, i) => (
                <ArchiveCard
                  key={post.slug ?? i}
                  post={post}
                  index={i}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay & Show More Button */}
        {!isExpanded && hasMore && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '250px',
            background: 'linear-gradient(to bottom, transparent, var(--color-background))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '20px',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <button
              onClick={() => setIsExpanded(true)}
              style={{
                pointerEvents:   'auto',
                fontFamily:      'var(--font-mono)',
                fontSize:        '12px',
                letterSpacing:   '0.1em',
                textTransform:   'uppercase',
                color:           'var(--color-background)',
                backgroundColor: 'var(--color-ink)',
                border:          '1px solid var(--color-ink)',
                padding:         '12px 32px',
                cursor:          'pointer',
                transition:      'background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color           = 'var(--color-ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-ink)';
                e.currentTarget.style.color           = 'var(--color-background)';
              }}
            >
              TAMPILKAN SEMUA ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
