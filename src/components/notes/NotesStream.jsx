// src/components/notes/NotesStream.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TAG_COLORS = {
  'filosofi':   'var(--color-wasabi)',
  'teknologi':  'var(--color-accent-green)',
  'personal':   'var(--color-muted-apricot)',
  'musik':      'var(--color-accent-warm)',
  'observasi':  'var(--color-surface-dim)',
  'sastra':     'var(--color-wasabi)',
  'film':       'var(--color-muted-apricot)',
  'jurnal':     'var(--color-accent-green)',
  'refleksi':   'var(--color-wasabi)',
  'membaca':    'var(--color-muted-apricot)',
  'buku':       'var(--color-muted-apricot)',
  'the-narrative': 'var(--color-wasabi)',
  'sosial':     'var(--color-muted-apricot)',
  'identitas':  'var(--color-accent-warm)',
  'eksistensial': 'var(--color-accent-green)',
  'pengantar':  'var(--color-wasabi)',
  'kesepian':   'var(--color-surface-dim)',
  'cinta':      'var(--color-accent-warm)',
};

export default function NotesStream({ posts, activeTag, searchQuery }) {
  const sectionRef = useRef(null);
  const notes = posts.map((post) => ({
    id: post.slug,
    tag: post.tags?.[0] ?? post.category,
    date: new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    title: post.title,
    readTime: `${post.readingTime} min`,
    href: post.url,
    category: post.category,
  }));

  const filtered = notes.filter((n) => {
    const tagMatch = !activeTag || activeTag === 'Semua' ||
      (n.tag ?? '').toLowerCase() === activeTag.toLowerCase();
    const queryMatch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return tagMatch && queryMatch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.note-stream-row',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.7, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="all-notes" ref={sectionRef} style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-ink)', padding: 'clamp(48px, 8vh, 80px) clamp(20px, 5vw, 60px)' }}>
      <style>{`
        .notes-stream-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 40px; }
        .note-row-grid {
          display: grid;
          grid-template-columns: 40px 1fr;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          text-decoration: none;
          color: var(--color-ink);
          transition: all 0.2s ease;
        }
        .note-row-details { display: flex; align-items: center; gap: 16px; width: 100%; }
        .note-row-meta { margin-left: auto; text-align: right; }
        
        @media (max-width: 768px) {
          .notes-stream-header { flex-direction: column; gap: 8px; margin-bottom: 24px; }
          .note-row-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 24px 0;
          }
          .note-row-details { flex-wrap: wrap; gap: 12px; margin-bottom: 4px; }
          .note-row-meta { text-align: left; display: flex; gap: 12px; align-items: center; }
          .note-row-index { display: none; }
        }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div className="notes-stream-header">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-espresso)' }}>
            Notes Stream // {filtered.length} entries
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
            Terbaru di atas
          </span>
        </div>

        <div style={{ borderTop: '1px solid var(--color-ink)' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(0,0,0,0.4)' }}>
              Tidak ada catatan yang cocok.
            </div>
          ) : (
            filtered.map((note, i) => (
              <a
                key={note.id}
                href={note.href}
                className="note-stream-row note-row-grid"
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '12px';
                  e.currentTarget.style.backgroundColor = 'var(--color-background-ash)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Index (Desktop only) */}
                <span className="note-row-index" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.05em' }}>
                  {String(i + 1).padStart(2, '0')}.
                </span>

                <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="note-row-details">
                    {/* Tag */}
                    <span className="note-row-tag" style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                      backgroundColor: TAG_COLORS[(note.tag ?? '').toLowerCase()] || 'var(--color-wasabi)',
                      padding: '4px 8px', display: 'inline-block',
                    }}>
                      {note.tag}
                    </span>

                    {/* Read time + date (Moved to be adjacent to tag on mobile) */}
                    <div className="note-row-meta">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {note.date} • {note.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '19px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                    {note.title}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
