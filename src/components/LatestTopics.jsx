// src/components/LatestTopics.jsx

export default function LatestTopics({ posts }) {
  const topics = posts.slice(0, 5).map((post, index) => ({
    num: String(index + 1).padStart(2, '0'),
    category: post.category.toUpperCase().replace('-', ' & '),
    title: post.title,
    date: new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase(),
    readTime: `${post.readingTime} MIN READ`,
    href: post.url,
  }));
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
              padding: 'clamp(40px, 6vw, 60px) clamp(20px, 3vw, 40px)',
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
            <div className="journal-count-meta">
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-espresso)',
                  textAlign: 'right',
                }}
              >
                Journal Indices —{' '}
                <span className="article-counter" data-target={topics.length}>
                  {topics.length}
                </span>{' '}
                Entries
              </p>
            </div>
          </div>

          {/* Topics List */}
          <div style={{ padding: '0' }}>
            {topics.map((topic) => (
              <a
                key={topic.num}
                href={topic.href}
                className="notes-row topic-row-hover topic-grid-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 4fr 1fr',
                  alignItems: 'center',
                  padding: 'clamp(20px, 3vw, 32px) clamp(20px, 3vw, 40px)',
                  borderBottom: '1px solid var(--color-ink)',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    className="topic-category-tag"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
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
                  className="topic-meta-right"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '24px',
                  }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <p
                      className="topic-meta-text"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: 'var(--color-espresso)',
                        textTransform: 'uppercase',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {topic.date}
                    </p>
                    <p
                      className="topic-meta-text"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'rgba(45,34,30,0.5)',
                        marginTop: '4px',
                        transition: 'color 0.3s ease',
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
        .topic-row-hover {
          color: var(--color-ink) !important;
          background-color: transparent;
        }
        .topic-row-hover:hover {
          background-color: var(--color-ink) !important;
          color: #ffffff !important;
        }
        .topic-row-hover:hover .topic-title {
          transform: translateX(16px);
        }
        .topic-row-hover:hover .topic-arrow {
          transform: translateX(8px) scale(1.2);
        }
        .topic-category-tag {
          border-color: var(--color-ink) !important;
          color: var(--color-ink) !important;
          transition: all 0.3s ease;
        }
        .topic-row-hover:hover .topic-category-tag {
          background-color: var(--color-accent-green) !important;
          border-color: var(--color-accent-green) !important;
          color: var(--color-ink) !important;
        }
        .topic-row-hover:hover .topic-meta-text {
          color: rgba(255,255,255,0.7) !important;
        }
        @media (max-width: 768px) {
          .journal-count-meta { display: none !important; }
          .topic-grid-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            padding: 16px clamp(20px, 3vw, 40px) !important;
          }
          .topic-meta-right { display: none !important; }
          .topic-title { font-size: 18px !important; }
        }
      `}</style>
    </>
  );
}
