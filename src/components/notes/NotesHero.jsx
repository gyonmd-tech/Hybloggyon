// src/components/notes/NotesHero.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function NotesHero() {
  const titleRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'lines,words' });
        gsap.set(split.lines, { overflow: 'hidden' });
        gsap.fromTo(split.words,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, stagger: 0.06, ease: 'power4.out', delay: 0.3 }
        );
      }
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        backgroundColor: 'var(--color-ink)',
        color: '#fff',
        padding: '160px 60px 100px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid lines decoration */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Giant decorative text */}
      <div style={{
        position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-heading)', fontWeight: 900,
        fontSize: '35vw', lineHeight: 1, letterSpacing: '-0.05em',
        color: 'rgba(255,255,255,0.025)', pointerEvents: 'none', userSelect: 'none',
      }}>N</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={metaRef} style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
            147 entries // ongoing
          </span>
        </div>

        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(64px, 12vw, 160px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            marginBottom: '48px',
          }}
        >
          Notes.
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '15px',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '500px',
        }}>
          Kumpulan pemikiran yang belum selesai — fragmen observasi, kutipan yang mengganggu, dan ide yang masih mencari bentuknya.
        </p>
      </div>
    </section>
  );
}
