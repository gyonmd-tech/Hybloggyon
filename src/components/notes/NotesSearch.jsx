import { useState, useRef, useEffect } from 'react';

const TAGS = ['Semua', 'Filosofi', 'Teknologi', 'Sastra', 'Musik', 'Film', 'Personal', 'Observasi'];

export default function NotesSearch({ onSearch, onTagSelect, activeTag }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus input when '/' is pressed, unless user is already typing in an input
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        padding: '0 clamp(20px, 5vw, 60px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <style>{`
        .notes-search-row {
          display: flex;
          align-items: center;
          padding: 20px 0 12px 0;
          gap: 12px;
        }
        .notes-search-count { flex-shrink: 0; min-width: 80px; text-align: center; }
        .notes-top-btn { flex-shrink: 0; }
        @media (max-width: 768px) {
          .notes-search-count { display: none; }
          .notes-top-btn { display: none; }
        }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Search Row */}
        <div className="notes-search-row">
          {/* Prominent Search Input Container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#fff',
              border: '1px solid var(--color-ink)',
              padding: '0 24px',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.2s',
            }}
            onFocus={(e) => e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-accent-green)'}
            onBlur={(e) => e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.05)'}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'rgba(0,0,0,0.3)', flexShrink: 0, marginRight: '16px' }}>
              /
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Cari catatan... (tekan / untuk fokus)"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--color-ink)',
                padding: '20px 0',
                letterSpacing: '0.02em',
              }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); onSearch?.(''); }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', marginLeft: '16px' }}
              >
                CLEAR ✕
              </button>
            )}
          </div>

          <span className="notes-search-count" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em' }}>
            {query ? `...mencari` : '147 notes'}
          </span>

          {/* Escape / Back to Top Button */}
          <button
            className="notes-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: 'var(--color-ink)',
              padding: '21px 32px',
              border: '1px solid var(--color-ink)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-green)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ink)'}
          >
            ↑ TOP
          </button>
        </div>

        {/* Tags Row */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect?.(tag)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '16px 20px',
                color: activeTag === tag ? '#fff' : 'rgba(0,0,0,0.5)',
                backgroundColor: activeTag === tag ? 'var(--color-ink)' : 'transparent',
                borderRight: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (activeTag !== tag) {
                  e.currentTarget.style.color = 'var(--color-ink)';
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTag !== tag) {
                  e.currentTarget.style.color = 'rgba(0,0,0,0.5)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
