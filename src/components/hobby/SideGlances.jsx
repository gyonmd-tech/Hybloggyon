// src/components/hobby/SideGlances.jsx
// Section 5 — Grid 3 kolom "Torn Pages": observasi dengan ukuran teks variasi per panjang

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper: ukuran teks berdasarkan panjang observasi
function getObservationStyle(text) {
  if (text.length < 80) {
    return {
      fontFamily: 'var(--font-heading)',
      fontWeight: 300,
      fontSize: '1.55rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    };
  }
  if (text.length < 200) {
    return {
      fontFamily: 'Switzer, var(--font-sans)',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.7,
    };
  }
  return {
    fontFamily: 'Switzer, var(--font-sans)',
    fontWeight: 400,
    fontSize: '0.9rem',
    lineHeight: 1.8,
  };
}

function ObservationCard({ obs }) {
  const textStyle = getObservationStyle(obs.text);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-ink)',
        boxShadow: '3px 3px 0px var(--color-ink)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '160px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = '5px 5px 0px var(--color-ink)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '3px 3px 0px var(--color-ink)';
      }}
    >
      <p
        style={{
          ...textStyle,
          color: 'var(--color-ink)',
          margin: '0 0 16px 0',
          flex: 1,
        }}
      >
        {obs.text}
      </p>
      <time
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(18,18,20,0.4)',
          display: 'block',
        }}
      >
        {obs.date}
      </time>
    </div>
  );
}

export default function SideGlances({ observations }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        '.sg-label',
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      );

      // Cards stagger
      const cards = sectionRef.current.querySelectorAll('.obs-card-anim');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        padding: 'clamp(60px, 10vh, 100px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <div className="sg-label" style={{ marginBottom: '32px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-warm)',
            }}
          >
            CATATAN PINGGIR —
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '1px solid var(--color-ink)',
            marginBottom: '28px',
          }}
        />

        {/* Grid 3 kolom */}
        <div
          className="sg-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          <style>{`
            @media (max-width: 900px) { .sg-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .sg-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {observations.map((obs, i) => (
            <div key={i} className="obs-card-anim">
              <ObservationCard obs={obs} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
