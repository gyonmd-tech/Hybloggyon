// src/components/note-single/NoteThoughtMetadata.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NoteThoughtMetadata({ metadata }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.meta-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.08, ease: 'power2.out',
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
        backgroundColor: 'var(--color-ink)',
        color: '#fff',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '64px 60px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent-green)', display: 'block', marginBottom: '40px' }}>
          Thought Metadata
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        >
          {metadata.map((item, i) => (
            <div
              key={i}
              className="meta-item"
              style={{
                backgroundColor: 'var(--color-ink)',
                padding: '28px 32px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                {item.label}
              </span>
              <p
                style={{
                  fontFamily: item.mono ? 'var(--font-mono)' : 'var(--font-heading)',
                  fontSize: item.mono ? '13px' : '16px',
                  fontWeight: item.mono ? 400 : 600,
                  color: item.highlight ? 'var(--color-accent-green)' : '#fff',
                  lineHeight: 1.4,
                  letterSpacing: item.mono ? '0.02em' : '-0.01em',
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
