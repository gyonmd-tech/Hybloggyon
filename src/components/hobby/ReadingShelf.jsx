// src/components/hobby/ReadingShelf.jsx
// Section 4 — Daftar vertikal buku: [Cover | Metadata | Status], via BookRow per item

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookRow from './BookRow';

gsap.registerPlugin(ScrollTrigger);

export default function ReadingShelf({ books }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        '.shelf-label',
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      );

      // Baris buku: stagger x: -20 → 0
      const rows = sectionRef.current.querySelectorAll('.book-row-anim');
      gsap.fromTo(
        rows,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
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
        borderTop: '1px solid var(--color-ink)',
        borderBottom: '1px solid var(--color-ink)',
        padding: 'min(12vh, 100px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <div
          className="shelf-label"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-warm)',
            }}
          >
            BACAAN —
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(18,18,20,0.35)',
            }}
          >
            {books.length} buku
          </span>
        </div>

        {/* Divider atas list */}
        <div
          style={{
            borderTop: '2px solid var(--color-ink)',
            marginBottom: '0',
          }}
        />

        {/* List buku */}
        {books.map((book, i) => (
          <div key={i} className="book-row-anim">
            <BookRow book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}
