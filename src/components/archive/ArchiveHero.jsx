// src/components/archive/ArchiveHero.jsx
// Hero yang lebih aesthetic dengan deskripsi dan proporsi yang lebih baik

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ArchiveHero({ totalPosts }) {
  const titleRef = useRef(null);
  const metaRef  = useRef(null);
  const descRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        paddingTop:      'min(12vh, 100px)',
        paddingBottom:   'min(8vh, 60px)',
        paddingLeft:     'clamp(24px, 6vw, 80px)',
        paddingRight:    'clamp(24px, 6vw, 80px)',
        backgroundColor: 'var(--color-background)',
        display:         'flex',
        flexDirection:   'column',
        gap:             '24px',
        position:        'relative',
        transition:      'background-color 0.4s ease',
      }}
    >
      {/* Label dan metadata */}
      <div
        ref={metaRef}
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '16px',
          opacity:       0,
        }}
      >
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '11px',
          color:         'var(--color-espresso)',
          opacity:       0.6,
          letterSpacing: '0.04em',
        }}>
          {totalPosts} tulisan tersimpan
        </span>
      </div>

      {/* Judul utama */}
      <h1
        ref={titleRef}
        style={{
          fontFamily:    'Satoshi, var(--font-heading)',
          fontWeight:    300,
          fontSize:      'clamp(3.5rem, 8vw, 9rem)',
          lineHeight:    0.9,
          letterSpacing: '-0.04em',
          color:         'var(--color-ink)',
          margin:        0,
          padding:       0,
          opacity:       0,
        }}
      >
        Membongkar<br />Isi Kepala
      </h1>

      {/* Deskripsi */}
      <p
        ref={descRef}
        style={{
          fontFamily:  'Switzer, var(--font-sans)',
          fontSize:    '1.1rem',
          color:       'var(--color-espresso)',
          lineHeight:  1.6,
          maxWidth:    '540px',
          margin:      0,
          opacity:     0,
        }}
      >
        Sebuah ruang penyimpanan untuk pemikiran panjang, catatan singkat, dan segala hal yang tidak muat di tempat lain. Semuanya dibiarkan terbuka.
      </p>
    </section>
  );
}
