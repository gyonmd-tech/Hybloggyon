// src/components/notes/NotesStream.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ALL_NOTES = [
  { id: 1, tag: 'Filosofi', date: '24 Mei', title: 'Tentang Kebosanan yang Produktif', readTime: '7 min' },
  { id: 2, tag: 'Teknologi', date: '17 Mei', title: 'Internet Sedang Menyusut', readTime: '11 min' },
  { id: 3, tag: 'Personal', date: '9 Mei', title: 'Mencatat sebagai Ritual', readTime: '5 min' },
  { id: 4, tag: 'Musik', date: '2 Mei', title: 'Kenapa Album Konsep Masih Relevan', readTime: '9 min' },
  { id: 5, tag: 'Observasi', date: '28 Apr', title: 'Pola di Balik Desain Antarmuka Modern', readTime: '6 min' },
  { id: 6, tag: 'Sastra', date: '21 Apr', title: 'Membaca Ulang Borges', readTime: '13 min' },
  { id: 7, tag: 'Film', date: '15 Apr', title: 'Kecepatan Naratif Wong Kar-wai', readTime: '8 min' },
  { id: 8, tag: 'Filosofi', date: '8 Apr', title: 'Tentang Waktu yang Tidak Linier', readTime: '12 min' },
  { id: 9, tag: 'Personal', date: '1 Apr', title: 'Produktivitas Bukan Tujuan', readTime: '4 min' },
  { id: 10, tag: 'Teknologi', date: '25 Mar', title: 'Ketika AI Menulis dan Manusia Mengkurasi', readTime: '10 min' },
  { id: 11, tag: 'Musik', date: '18 Mar', title: 'Noise sebagai Bahasa', readTime: '7 min' },
  { id: 12, tag: 'Observasi', date: '11 Mar', title: 'Arsitektur dan Kesunyian Kota', readTime: '6 min' },
];

const TAG_COLORS = {
  'Filosofi': 'var(--color-wasabi)',
  'Teknologi': 'var(--color-accent-green)',
  'Personal': 'var(--color-muted-apricot)',
  'Musik': 'var(--color-accent-warm)',
  'Observasi': 'var(--color-surface-dim)',
  'Sastra': 'var(--color-wasabi)',
  'Film': 'var(--color-muted-apricot)',
};

export default function NotesStream({ activeTag, searchQuery }) {
  const sectionRef = useRef(null);

  const filtered = ALL_NOTES.filter((n) => {
    const tagMatch = !activeTag || activeTag === 'Semua' || n.tag === activeTag;
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
          grid-template-columns: 40px 90px 1fr 70px;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          text-decoration: none;
          color: var(--color-ink);
          transition: all 0.2s ease;
        }
        @media (max-width: 768px) {
          .notes-stream-header { flex-direction: column; gap: 4px; margin-bottom: 24px; }
          .note-row-grid { grid-template-columns: 32px 1fr; }
          .note-row-tag { display: none; }
          .note-row-meta { display: none; }
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
                href={`/notes/${note.id}`}
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
                {/* Index */}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.05em' }}>
                  {String(i + 1).padStart(2, '0')}.
                </span>

                {/* Tag */}
                <span className="note-row-tag" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  backgroundColor: TAG_COLORS[note.tag] || 'var(--color-wasabi)',
                  padding: '4px 8px', display: 'inline-block',
                }}>
                  {note.tag}
                </span>

                {/* Title */}
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {note.title}
                </span>

                {/* Read time + date */}
                <div className="note-row-meta" style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.35)', display: 'block' }}>
                    {note.readTime}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.25)' }}>
                    {note.date}
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
