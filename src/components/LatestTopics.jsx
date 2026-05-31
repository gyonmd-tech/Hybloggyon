// src/components/LatestTopics.jsx
const TOPICS = [
  { num: '01', category: 'SYSTEMS', title: 'The Brutalist Web: Kejujuran Arsitektur Digital', date: '20 MEI 2026', readTime: '8 MIN READ' },
  { num: '02', category: 'ESAI', title: 'Mengapa Kita Koleksi Hal-Hal yang Tak Berguna', date: '14 MEI 2026', readTime: '6 MIN READ' },
  { num: '03', category: 'MUSIK', title: 'OK Computer dan Kecemasan Teknologi yang Menahun', date: '05 MEI 2026', readTime: '10 MIN READ' },
  { num: '04', category: 'FILM', title: 'Wong Kar-wai dan Waktu yang Diingat Tubuh', date: '28 APR 2026', readTime: '7 MIN READ' },
  { num: '05', category: 'NOTES', title: 'Belajar Mengetik Tanpa Melihat Keyboard', date: '20 APR 2026', readTime: '4 MIN READ' },
];

export default function LatestTopics() {
  return (
    <>
      <section
        className="notes-section"
        style={{
          backgroundColor: 'var(--color-background-ash)',
          borderBottom: '1px solid var(--color-ink)',
          paddingBottom: '80px', // Add spacing before the next section
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              padding: '60px 40px 40px 40px', // Increased top padding for breathing room
              borderBottom: '1px solid var(--color-ink)',
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-espresso)', display: 'block', marginBottom: '8px' }}>
                Jurnal Utama
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  fontSize: '24px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  marginBottom: '12px',
                }}
              >
                Catatan Terbaru
              </p>
              <div style={{ width: '48px', height: '2px', backgroundColor: 'var(--color-ink)' }} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px', // Slightly larger meta text
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-espresso)',
                  textAlign: 'right',
                }}
              >
                Journal Indices —{' '}
                <span className="article-counter" data-target={TOPICS.length}>
                  {TOPICS.length}
                </span>{' '}
                Entries
              </p>
            </div>
          </div>

          {/* Topics List */}
          <div style={{ padding: '0' }}>
            {TOPICS.map((topic) => (
              <a
                key={topic.num}
                href="#"
                className="notes-row topic-row-hover"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 4fr 1fr',
                  alignItems: 'center',
                  padding: '32px 40px',
                  borderBottom: '1px solid var(--color-ink)',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: 'var(--color-ink)',
                      border: '1px solid var(--color-ink)',
                      padding: '2px 8px',
                      borderRadius: '50px',
                    }}
                  >
                    {topic.category}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3
                    className="topic-title"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 300,
                      fontSize: 'clamp(20px, 2vw, 28px)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {topic.title}
                  </h3>
                </div>

                {/* Meta Right & Arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '24px',
                  }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: 'var(--color-espresso)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {topic.date}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'rgba(45,34,30,0.5)',
                        marginTop: '4px',
                      }}
                    >
                      {topic.readTime}
                    </p>
                  </div>
                  <span
                    className="topic-arrow"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Internal CSS for Hover States */}
      <style>{`
        .topic-row-hover:hover {
          background-color: rgba(18, 18, 20, 0.03) !important;
        }
        .topic-row-hover:hover .topic-title {
          transform: translateX(8px);
        }
        .topic-row-hover:hover .topic-arrow {
          transform: translateX(4px) scale(1.1);
        }
      `}</style>
    </>
  );
}
