// src/components/note-single/NoteReflectionEnding.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function NoteReflectionEnding({ reflection, closingNote }) {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        const split = new SplitType(quoteRef.current, { types: 'lines,words' });
        gsap.set(split.lines, { overflow: 'hidden' });
        gsap.fromTo(split.words,
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1,
            duration: 1.1, stagger: 0.04, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
          }
        );
      }
      gsap.fromTo('.reflection-closing',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '.reflection-closing', start: 'top 88%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--color-ink)',
        padding: '80px 60px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Horizontal rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
          <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
            Reflection
          </span>
          <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* The reflection quote / takeaway */}
        <blockquote
          ref={quoteRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: 'clamp(24px, 3.5vw, 42px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            borderLeft: '4px solid var(--color-accent-green)',
            paddingLeft: '36px',
            marginBottom: '48px',
          }}
        >
          {reflection}
        </blockquote>

        {/* Closing note */}
        <div className="reflection-closing">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.8,
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '560px',
              marginBottom: '28px',
            }}
          >
            {closingNote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-accent-green)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Catatan masih berkembang
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
