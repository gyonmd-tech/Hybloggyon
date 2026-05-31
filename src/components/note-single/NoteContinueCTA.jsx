// src/components/note-single/NoteContinueCTA.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NoteContinueCTA({ prevNote, nextNote }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-panel',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' }
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
        padding: '72px 60px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.4)',
            display: 'block',
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          Continue Exploring
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: prevNote && nextNote ? '1fr 1fr' : '1fr', gap: '1px', backgroundColor: 'var(--color-ink)' }}>

          {/* Prev Note */}
          {prevNote && (
            <a
              href={prevNote.href}
              className="cta-panel"
              style={{
                backgroundColor: 'var(--color-background-ash)',
                padding: '40px 36px',
                textDecoration: 'none',
                color: 'var(--color-ink)',
                display: 'block',
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-ash)'}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', display: 'block', marginBottom: '16px' }}>
                ← Sebelumnya
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: 'var(--color-wasabi)', padding: '3px 8px', display: 'inline-block', marginBottom: '12px' }}>
                {prevNote.tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '8px' }}>
                {prevNote.title}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
                {prevNote.readTime}
              </span>
            </a>
          )}

          {/* Next Note */}
          {nextNote && (
            <a
              href={nextNote.href}
              className="cta-panel"
              style={{
                backgroundColor: 'var(--color-ink)',
                padding: '40px 36px',
                textDecoration: 'none',
                color: '#fff',
                display: 'block',
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e1e20'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ink)'}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '16px' }}>
                Selanjutnya →
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: 'var(--color-accent-green)', color: 'var(--color-ink)', padding: '3px 8px', display: 'inline-block', marginBottom: '12px' }}>
                {nextNote.tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '8px', color: '#fff' }}>
                {nextNote.title}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                {nextNote.readTime}
              </span>
            </a>
          )}
        </div>

        {/* Back to all notes */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href="/notes"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.4)',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
              paddingBottom: '2px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-ink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
          >
            ← Kembali ke semua catatan
          </a>
        </div>
      </div>
    </section>
  );
}
