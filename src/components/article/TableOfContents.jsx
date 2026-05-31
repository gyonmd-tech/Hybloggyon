// src/components/article/TableOfContents.jsx
// TOC sticky dengan highlight aktif via IntersectionObserver.

import { useState, useEffect } from 'react';

export default function TableOfContents({ headings, accentColor }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!headings?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold:  0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings?.length) return null;

  return (
    <div>
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         'var(--color-espresso)',
        opacity:       0.7,
        borderBottom:  '1px solid var(--color-ink)',
        paddingBottom: '8px',
        marginBottom:  '12px',
      }}>
        ISI TULISAN
      </div>

      <nav aria-label="Table of contents">
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {headings.map(({ id, text }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  style={{
                    display:       'block',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '11px',
                    letterSpacing: '0.04em',
                    lineHeight:    1.5,
                    color:         isActive ? 'var(--color-ink)' : 'var(--color-espresso)',
                    opacity:       isActive ? 1 : 0.6,
                    textDecoration:'none',
                    padding:       '5px 0 5px 12px',
                    borderLeft:    isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                    transition:    'color 0.2s ease, opacity 0.2s ease, border-color 0.2s ease',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
