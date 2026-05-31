// src/components/note-single/NoteConnectedNotes.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NoteConnectedNotes({ notes = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.connected-note-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!notes.length) return null;

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-espresso)', display: 'block', marginBottom: '6px' }}>
              Benang Merah
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '28px', letterSpacing: '-0.02em', color: 'var(--color-ink)', lineHeight: 1 }}>
              Catatan Terhubung
            </h2>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
            {notes.length} koneksi
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--color-ink)' }}>
          {notes.map((note, i) => (
            <a
              key={i}
              href={note.href || '#'}
              className="connected-note-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '24px',
                alignItems: 'center',
                backgroundColor: 'var(--color-background-ash)',
                padding: '28px 32px',
                textDecoration: 'none',
                color: 'var(--color-ink)',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-ash)'}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.35)',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {note.relation}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '8px' }}>
                  {note.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                  {note.excerpt}
                </p>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--color-accent-green)',
                    padding: '4px 10px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  {note.tag}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
                  {note.readTime}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
