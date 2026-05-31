// src/components/note-single/NoteMainContent.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Typography-level prose styles injected via <style>
const PROSE_CSS = `
  .note-prose {
    font-family: var(--font-sans);
    font-size: 18px;
    line-height: 1.85;
    color: rgba(0,0,0,0.82);
    max-width: 680px;
  }
  .note-prose p { margin-bottom: 1.6em; }
  .note-prose h2 {
    font-family: var(--font-heading);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-ink);
    margin: 2.4em 0 0.8em;
    line-height: 1.15;
  }
  .note-prose h3 {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--color-ink);
    margin: 2em 0 0.6em;
  }
  .note-prose blockquote {
    border-left: 3px solid var(--color-accent-green);
    padding: 16px 28px;
    margin: 2em 0;
    font-family: var(--font-heading);
    font-style: italic;
    font-size: 22px;
    font-weight: 300;
    color: var(--color-ink);
    line-height: 1.4;
    background: rgba(0,0,0,0.02);
  }
  .note-prose em { font-style: italic; }
  .note-prose strong {
    font-weight: 700;
    color: var(--color-ink);
    border-bottom: 2px solid var(--color-accent-green);
    padding-bottom: 1px;
  }
  .note-prose hr {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.1);
    margin: 2.4em 0;
  }
  .note-prose .note-annotation {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.35);
    margin-bottom: 8px;
  }
  .note-drop-cap::first-letter {
    float: left;
    font-family: var(--font-heading);
    font-size: 5em;
    font-weight: 900;
    line-height: 0.8;
    margin: 0.08em 16px 0 0;
    color: var(--color-ink);
    letter-spacing: -0.04em;
  }
`;

export default function NoteMainContent({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '72px 60px 80px',
      }}
    >
      <style>{PROSE_CSS}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '60px', alignItems: 'start' }}>

        {/* Main prose */}
        <div ref={sectionRef}>
          <div
            className="note-prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Sticky sidebar notes */}
        <aside style={{ position: 'sticky', top: '120px' }}>
          <div style={{ borderTop: '2px solid var(--color-ink)', paddingTop: '20px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', display: 'block', marginBottom: '12px' }}>
              Catatan Samping
            </span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.7, color: 'rgba(0,0,0,0.55)' }}>
              Catatan ini masih berkembang — pemikiran baru akan ditambahkan seiring waktu.
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', display: 'block', marginBottom: '12px' }}>
              Terakhir diperbarui
            </span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(0,0,0,0.55)' }}>
              Mei 2026
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
