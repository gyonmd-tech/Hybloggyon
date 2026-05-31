// src/components/about/AboutOpener.jsx
// Section 1 — Full-viewport kalimat pembuka besar dengan SplitType stagger animasi

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function AboutOpener({ text }) {
  const textRef  = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate label top-right corner
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      );

      // SplitType — stagger per kata
      if (textRef.current) {
        const split = new SplitType(textRef.current, { types: 'words' });

        gsap.fromTo(
          split.words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        overflow: 'hidden',
        padding: '0 clamp(24px, 6vw, 80px)',
      }}
    >
      {/* Grid lines background decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(18,18,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,20,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main opener text */}
      <p
        ref={textRef}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: 'clamp(3.5rem, 8vw, 9rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: 'var(--color-ink)',
          maxWidth: '14em',
          margin: 0,
          textAlign: 'left',
          paddingTop: '4vh',
        }}
      >
        {text}
      </p>

      {/* Bottom-right corner label */}
      <div
        ref={labelRef}
        style={{
          position: 'absolute',
          bottom: '48px',
          right: 'clamp(24px, 6vw, 80px)',
          textAlign: 'right',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(18,18,20,0.4)',
          }}
        >
          ABOUT —
        </span>
      </div>

      {/* Decorative large letter */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2%',
          bottom: '-10%',
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: '40vw',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          color: 'rgba(18,18,20,0.03)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        A
      </div>
    </section>
  );
}
