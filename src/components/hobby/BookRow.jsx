// src/components/hobby/BookRow.jsx
// Satu baris buku: cover dari Google Books/Open Library API + fallback tipografis

import { useState, useEffect } from 'react';

const STATUS_CONFIG = {
  reading: {
    label: 'SEDANG DIBACA',
    bg: 'var(--color-accent-green)',
    color: 'var(--color-ink)',
    border: 'none',
  },
  done: {
    label: 'SELESAI',
    bg: 'var(--color-ink)',
    color: 'var(--color-background-ash)',
    border: 'none',
  },
  queue: {
    label: 'ANTRIAN',
    bg: 'transparent',
    color: 'var(--color-espresso)',
    border: '1px solid var(--color-ink)',
  },
};

// Fallback tipografis: inisial huruf pertama tiap kata
function getInitials(title) {
  return title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
}

export default function BookRow({ book }) {
  const [coverUrl, setCoverUrl]     = useState(null);
  const [coverError, setCoverError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchCover = async () => {
      try {
        // Coba Google Books
        const res  = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
        );
        const data = await res.json();
        const url  = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
        if (url && !cancelled) {
          setCoverUrl(url.replace('http:', 'https:').replace('zoom=1', 'zoom=3'));
          return;
        }
        // Fallback Open Library
        if (!cancelled) {
          setCoverUrl(`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`);
        }
      } catch {
        if (!cancelled) setCoverUrl(null);
      }
    };

    fetchCover();
    return () => { cancelled = true; };
  }, [book.isbn]);

  const status = STATUS_CONFIG[book.status] ?? STATUS_CONFIG.queue;

  return (
    <>
      <style>{`
        .book-row { display: grid; grid-template-columns: 80px 1fr auto; gap: 24px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--color-ink); transition: background 0.15s ease; }
        .book-cover { width: 80px; height: 120px; border: 1px solid var(--color-ink); box-shadow: 3px 3px 0px var(--color-ink); overflow: hidden; flex-shrink: 0; transition: transform 0.2s ease; }
        .book-title { font-family: var(--font-heading); font-weight: 300; font-size: 1.25rem; letter-spacing: -0.01em; color: var(--color-ink); margin: 0 0 4px 0; line-height: 1.2; }
        .book-status-tag { flex-shrink: 0; }
        @media (max-width: 768px) {
          .book-row { grid-template-columns: 52px 1fr; gap: 14px; padding: 14px 0; }
          .book-cover { width: 52px; height: 78px; box-shadow: 2px 2px 0px var(--color-ink); }
          .book-title { font-size: 0.95rem; }
          .book-status-tag { display: none; }
        }
      `}</style>
    <div
      className="book-row"
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-white)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {/* Cover 80×120px */}
      <div
        className="book-cover"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '4px 5px 0px var(--color-ink)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '3px 3px 0px var(--color-ink)';
        }}
      >
        {coverUrl && !coverError ? (
          <img
            src={coverUrl}
            alt={`Cover ${book.title}`}
            onError={() => setCoverError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          /* Fallback tipografis */
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--color-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
              }}
            >
              {getInitials(book.title)}
            </span>
          </div>
        )}
      </div>

      {/* Metadata + kesan */}
      <div style={{ minWidth: 0 }}>
        <p className="book-title">
          {book.title}
        </p>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-espresso)',
            marginBottom: '10px',
          }}
        >
          {book.author}
        </span>
        <p
          style={{
            fontFamily: 'Switzer, var(--font-sans)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '0.93rem',
            lineHeight: 1.6,
            color: 'var(--color-espresso)',
            margin: 0,
          }}
        >
          {book.impression}
        </p>
      </div>

      {/* Status tag */}
      <div className="book-status-tag">
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            backgroundColor: status.bg,
            color: status.color,
            border: status.border || 'none',
            padding: '6px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {status.label}
        </span>
      </div>
    </div>
    </>
  );
}
