// src/components/about/AboutPortrait.jsx
// Section 2 — Minimalist Neo-Brutalist Portrait Section

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPortrait({ name, shortBio, meta }) {
  const sectionRef = useRef(null);
  const photoRef   = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        // Gradient fade transition replacing the harsh border line
        background: 'linear-gradient(180deg, var(--color-background-ash) 0%, rgba(245,245,245,0) 100%)',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 35%) 1fr',
          gap: 'clamp(40px, 8vw, 100px)',
          alignItems: 'center',
        }}
      >
        {/* ── Left: Foto Minimalis ── */}
        <div ref={photoRef} style={{ width: '100%', position: 'relative' }}>
          {/* Subtle Gen Z Asterisk */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            fontSize: '48px',
            color: 'var(--color-ink)', 
            lineHeight: 1,
            zIndex: 2,
            animation: 'spin 12s linear infinite',
            pointerEvents: 'none',
          }}>
            ✻
          </div>

          <div style={{
            position: 'relative',
            border: '1px solid var(--color-ink)', // sharp crisp border
            padding: '8px',
            backgroundColor: '#ffffff',
          }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90"
              alt={`Portrait of ${name}`}
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                filter: 'grayscale(100%) contrast(1.1)', // Sleek B&W
              }}
            />
          </div>

          <style>{`
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        {/* ── Right: Teks Clean Brutalist ── */}
        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          
          <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400, // sleek, classic weight
                fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: 'var(--color-ink)',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </h1>
          </div>

          <div style={{ borderLeft: '2px solid var(--color-ink)', paddingLeft: '24px' }}>
            <p
              style={{
                fontFamily: 'Switzer, var(--font-sans)',
                fontWeight: 400,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: 'var(--color-espresso)',
                margin: 0,
                maxWidth: '600px',
              }}
            >
              {shortBio}
            </p>
          </div>

          {/* Metadata Clean Boxes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            {meta.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  border: '1px solid rgba(18,18,20,0.15)', // subtle borders
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'rgba(18,18,20,0.4)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'Switzer, var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
