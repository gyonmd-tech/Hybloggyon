// src/components/notes/FeaturedNotes.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = [
  'var(--color-accent-green)',
  'var(--color-accent-warm)',
  'var(--color-wasabi)',
];

export default function FeaturedNotes({ posts }) {
  const sectionRef = useRef(null);
  const featured = posts
    .filter((post) => post.category === 'notes')
    .slice(0, 3)
    .map((post, index) => ({
      id: post.slug,
      tag: post.tags?.[0] ?? 'notes',
      date: new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: post.title,
      excerpt: post.excerpt,
      readTime: `${post.readingTime} menit`,
      href: post.url,
      accent: ACCENT_COLORS[index % ACCENT_COLORS.length],
    }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.featured-note-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--color-background-ash)', borderBottom: '1px solid var(--color-ink)', padding: 'clamp(48px, 8vh, 80px) clamp(20px, 5vw, 60px)' }}>
      <style>{`
        .featured-notes-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 48px; }
        .featured-notes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; border: 1px solid var(--color-ink); background-color: var(--color-ink); }
        @media (max-width: 768px) {
          .featured-notes-header { flex-direction: column; gap: 16px; margin-bottom: 32px; }
          .featured-notes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div className="featured-notes-header">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-espresso)', display: 'block', marginBottom: '8px' }}>
              Featured Notes
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', color: 'var(--color-ink)', lineHeight: 1 }}>
              Yang Paling Banyak<br/>
              <em style={{ fontWeight: 300 }}>Direnungkan</em>
            </h2>
          </div>
          <a href="#all-notes" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '2px', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-ink)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}
          >
            Lihat semua →
          </a>
        </div>

        <div className="featured-notes-grid">
          {featured.map((note) => (
            <a
              key={note.id}
              href={note.href}
              className="featured-note-card"
              style={{ backgroundColor: 'var(--color-background-ash)', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '20px', cursor: 'pointer', transition: 'background-color 0.25s ease', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-ash)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', backgroundColor: note.accent, color: 'var(--color-ink)', padding: '4px 10px' }}>
                  {note.tag}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>{note.date}</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>
                {note.title}
              </h3>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, color: 'rgba(0,0,0,0.6)', flexGrow: 1 }}>
                {note.excerpt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '20px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.05em' }}>
                  {note.readTime} baca
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-ink)', letterSpacing: '0.05em' }}>
                  Baca →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
