// src/components/note-single/NoteContextLine.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function NoteContextLine({ context, relatedTopics = [] }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.context-line-inner',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
      );
      // Animate the decorative line growing
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '32px 60px',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '32px',
        }}
      >
        {/* Decorative vertical accent */}
        <div
          ref={lineRef}
          style={{
            width: '3px',
            minHeight: '100%',
            alignSelf: 'stretch',
            backgroundColor: 'var(--color-accent-green)',
            flexShrink: 0,
          }}
        />

        <div style={{ flex: 1 }}>
          <p
            className="context-line-inner"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.8,
              color: 'rgba(0,0,0,0.6)',
              marginBottom: '16px',
            }}
          >
            {context}
          </p>
          {relatedTopics.length > 0 && (
            <div className="context-line-inner" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.35)', marginRight: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Topik:
              </span>
              {relatedTopics.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: 'rgba(0,0,0,0.5)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
