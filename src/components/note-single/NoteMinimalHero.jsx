// src/components/note-single/NoteMinimalHero.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function NoteMinimalHero({ date, readTime, title }) {
  const titleRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'lines,words' });
        gsap.set(split.lines, { overflow: 'hidden' });
        gsap.fromTo(split.words,
          { y: '115%' },
          { y: '0%', duration: 1.1, stagger: 0.05, ease: 'power4.out', delay: 0.4 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        padding: '140px 60px 80px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Meta bar */}
        <div
          ref={metaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
            {date}
          </span>
          <span style={{ width: '1px', height: '14px', backgroundColor: 'rgba(0,0,0,0.15)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
            {readTime} baca
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
