// src/components/ClassificationGrid.jsx
const CLASSES = [
  { id: '01', name: 'ESAI', count: 12, desc: 'Tulisan reflektif panjang.' },
  { id: '02', name: 'NOTES', count: 45, desc: 'Catatan belajar & log.' },
  { id: '03', name: 'MUSIK', count: 8, desc: 'Analisis dan ulasan album.' },
  { id: '04', name: 'FILM', count: 14, desc: 'Sinema dan pergerakan.' },
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
        .class-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1px;
          background-color: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.15);
        }
        @media (max-width: 768px) {
          .class-grid { grid-template-columns: repeat(2, 1fr); }
          .class-grid .class-item { padding: 32px 20px; }
          .class-header-row { flex-direction: column; gap: 8px; align-items: flex-start; }
          .class-entry-count { display: none; }
          .class-grid { grid-template-columns: repeat(2, 1fr); }
          .class-grid .class-item { padding: 24px 16px; }
          .class-grid .class-item .class-desc { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} className="class-header-row">
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
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: '#ffffff',
                marginTop: '16px',
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

        <div className="class-grid">
          {CLASSES.map((cls) => (
            <div
              key={cls.id}
              className="class-item"
              style={{
                backgroundColor: 'var(--color-ink)',
                padding: '60px 40px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header inside card */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '40px',
                }}
              >
                <span
                  className="class-id"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--color-accent-green)', // Pop color
                    fontWeight: 600,
                  }}
                >
                  ✦
                </span>
                <span
                  className="class-tag class-entry-count"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '4px 10px',
                    borderRadius: '100px',
                  }}
                >
                  {cls.count} ENTRIES
                </span>
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <h3
                  className="class-title"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    fontSize: 'clamp(28px, 3vw, 40px)', // Bolder, larger text
                    color: '#ffffff',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {cls.name}
                </h3>
                
                <p
                  className="class-desc"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                    maxWidth: '80%',
                  }}
                >
                  {cls.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
