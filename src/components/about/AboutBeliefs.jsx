// src/components/about/AboutBeliefs.jsx
// Section 4 — Daftar keyakinan/prinsip, dua kolom asimetris, numbered list

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutBeliefs({ beliefs }) {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const listRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label kiri
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Setiap item belief stagger
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.belief-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-ink)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: 'clamp(60px, 12vh, 140px) clamp(24px, 6vw, 80px)',
      }}
    >
      <style>{`
        .beliefs-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 30% 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .beliefs-label-col { padding-top: 8px; position: sticky; top: 120px; }
        @media (max-width: 768px) {
          .beliefs-grid { grid-template-columns: 1fr; }
          .beliefs-label-col { position: static; padding-top: 0; margin-bottom: 24px; }
        }
      `}</style>
      <div className="beliefs-grid">
        {/* ── Left: label ── */}
        <div
          ref={labelRef}
          className="beliefs-label-col"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-warm)',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            PRINSIP —
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.06em',
            }}
          >
            I BELIEVE
          </span>
        </div>

        {/* ── Right: daftar numbered ── */}
        <div
          ref={listRef}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {beliefs.map((belief, i) => (
            <div
              key={i}
              className="belief-item"
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr',
                gap: '24px',
                alignItems: 'baseline',
                padding: '28px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Nomor urut */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                {String(i + 1).padStart(2, '0')}.
              </span>

              {/* Teks belief */}
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                }}
              >
                {belief}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
