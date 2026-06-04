// src/components/ClassificationGrid.jsx

// ── Load MDX untuk hitung entries per kategori ────────────────────────────────
const mdxModules = import.meta.glob('/src/content/posts/*.mdx', { eager: true });
const ALL_POSTS   = Object.values(mdxModules).map(m => m.frontmatter).filter(Boolean);

const countByCategory = cat => ALL_POSTS.filter(p => p.category === cat).length;

const CLASSES = [
  { id: '01', name: 'ESAI',       slug: 'esai',       count: countByCategory('esai'),       desc: 'Tulisan reflektif panjang.',   href: '/archive' },
  { id: '02', name: 'NOTES',      slug: 'notes',      count: countByCategory('notes'),      desc: 'Catatan belajar & log.',        href: '/notes'   },
  { id: '03', name: 'MUSIK',      slug: 'musik',      count: countByCategory('musik'),      desc: 'Analisis dan ulasan album.',    href: '/archive' },
  { id: '04', name: 'FILM',       slug: 'film-anime', count: countByCategory('film-anime'), desc: 'Sinema dan pergerakan.',        href: '/archive' },
];

export default function ClassificationGrid() {
  return (
    <section
      className="classification-section"
      style={{
        backgroundColor: 'var(--color-ink)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 3vw, 40px)',
      }}
    >
      <style>{`
        /* Desktop Grid Styles */
        .class-item {
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .class-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: #ffffff;
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .class-item:hover::before { transform: translateY(0); }
        .class-item > * { position: relative; z-index: 1; transition: color 0.4s ease, border-color 0.4s ease; }
        .class-item:hover .class-title { color: var(--color-ink) !important; }
        .class-item:hover .class-id { color: var(--color-ink) !important; }
        .class-item:hover .class-desc { color: rgba(0,0,0,0.6) !important; }
        .class-item:hover .class-tag { color: var(--color-ink) !important; border-color: rgba(0,0,0,0.2) !important; }
        
        .desktop-class-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background-color: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* Mobile List Styles */
        .mobile-class-list {
          display: none;
        }
        .mobile-class-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: #ffffff;
          text-decoration: none;
        }
        .mobile-class-item:first-child {
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-class-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mobile-class-number {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-accent-green);
        }
        .mobile-class-title {
          font-family: var(--font-heading);
          font-size: 24px;
          margin: 0;
          line-height: 1;
        }
        .mobile-class-arrow {
          font-size: 20px;
          color: rgba(255,255,255,0.3);
        }

        @media (max-width: 768px) {
          .class-header-row { flex-direction: column; gap: 8px; align-items: flex-start !important; }
          .desktop-class-grid { display: none !important; }
          .mobile-class-list { display: block !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} className="class-header-row">
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Indeks Topik
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#ffffff',
                marginTop: '12px',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              Kategori
              <br />
              Tulisan
            </h2>
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="desktop-class-grid">
          {CLASSES.map((cls) => (
            <a
              key={cls.id}
              href={cls.href}
              className="class-item"
              style={{
                backgroundColor: 'var(--color-ink)',
                padding: '40px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '320px',
                textDecoration: 'none',
              }}
            >
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="class-id" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--color-accent-green)', fontWeight: 600 }}>
                  ✦
                </span>
                <span className="class-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '100px' }}>
                  {cls.count} ENTRIES
                </span>
              </div>
              
              {/* Middle Row (Title) */}
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <h3 className="class-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: '32px', color: '#ffffff', margin: 0 }}>
                  {cls.name}
                </h3>
              </div>

              {/* Bottom Row (Desc) */}
              <div>
                <p className="class-desc" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                  {cls.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* MOBILE COMPACT LIST */}
        <div className="mobile-class-list">
          {CLASSES.map((cls) => (
            <a key={cls.id} href={cls.href} className="mobile-class-item">
              <div className="mobile-class-left">
                <span className="mobile-class-number">{cls.id}</span>
                <h3 className="mobile-class-title">{cls.name}</h3>
              </div>
              <div className="mobile-class-arrow">→</div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
