// src/components/archive/ArchiveSearch.jsx
// Referensi gambar 2, dengan perbaikan estetika: hapus garis kaku
// Transisi background untuk membedakan section
// Ditambahkan warna kategori untuk tab aktif/hover agar tidak monoton

import { useRef } from 'react';
import { getCategoryColor } from '../../lib/categoryColors';

const TABS = [
  { id: 'semua',      label: 'SEMUA' },
  { id: 'esai',       label: 'ESAI' },
  { id: 'notes',      label: 'NOTES' },
  { id: 'musik',      label: 'MUSIK' },
  { id: 'film-anime', label: 'FILM & ANIME' },
];

export default function ArchiveSearch({
  searchQuery,
  setSearchQuery,
  filteredCount,
  activeFolder,
  setActiveFolder,
}) {
  const inputRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setSearchQuery('');
      inputRef.current?.blur();
    }
  }

  return (
    <section
      style={{
        paddingTop:      '32px',
        paddingBottom:   '24px',
        paddingLeft:     'clamp(20px, 6vw, 80px)',
        paddingRight:    'clamp(20px, 6vw, 80px)',
        backgroundColor: 'var(--color-background-ash)',
        transition:      'background-color 0.4s ease',
      }}
    >
      <style>{`
        .archive-filter-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          row-gap: 8px;
        }
        .archive-filter-count {
          margin-left: auto;
        }
        @media (max-width: 768px) {
          .archive-filter-count { display: none; }
        }
      `}</style>
      {/* ── Search bar ── */}
      <div
        style={{
          display:     'flex',
          alignItems:  'stretch',
          borderBottom: '1px solid var(--color-ink)', // Hanya garis bawah agar tidak kaku
          marginBottom: '24px',
          height:      '56px',
        }}
      >
        {/* Icon */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '0 16px 0 0',
          flexShrink:     0,
        }}>
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="var(--color-espresso)" strokeWidth="1.3" />
            <line x1="12" y1="12" x2="16.5" y2="16.5" stroke="var(--color-espresso)" strokeWidth="1.3" strokeLinecap="square" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="QUERY THE ARCHIVE..."
          style={{
            flex:        1,
            fontFamily:  'var(--font-mono)',
            fontSize:    '14px',
            letterSpacing:'0.08em',
            color:       'var(--color-ink)',
            background:  'transparent',
            border:      'none',
            outline:     'none',
            padding:     '0 16px',
            caretColor:  'var(--color-ink)',
          }}
        />

        {/* Clear jika ada query */}
        {searchQuery.length > 0 && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              fontFamily:  'var(--font-mono)',
              fontSize:    '16px',
              color:       'var(--color-espresso)',
              background:  'none',
              border:      'none',
              cursor:      'pointer',
              padding:     '0 16px',
              flexShrink:  0,
              lineHeight:  1,
            }}
            aria-label="Hapus"
          >
            ×
          </button>
        )}

        {/* Tombol TEMUKAN (soft) */}
        <button
          style={{
            fontFamily:      'var(--font-mono)',
            fontSize:        '12px',
            letterSpacing:   '0.1em',
            textTransform:   'uppercase',
            color:           'var(--color-ink)',
            backgroundColor: 'transparent',
            border:          'none',
            padding:         '0 16px',
            cursor:          'pointer',
            flexShrink:      0,
            transition:      'opacity 0.15s ease',
            opacity:         0.7,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
        >
          TEMUKAN
        </button>
      </div>

      {/* ── Chips kategori ── */}
      <div className="archive-filter-row">
        {TABS.map(tab => {
          const isActive = activeFolder === tab.id;
          const catColor = tab.id === 'semua' 
            ? { bg: 'var(--color-ink)', text: 'var(--color-background)' } 
            : getCategoryColor(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => setActiveFolder(tab.id)}
              style={{
                fontFamily:      'var(--font-mono)',
                fontSize:        '11px',
                letterSpacing:   '0.08em',
                textTransform:   'uppercase',
                padding:         '8px 16px',
                border:          '1px solid var(--color-ink)',
                backgroundColor: isActive ? catColor.bg : 'transparent',
                color:           isActive ? catColor.text : 'var(--color-ink)',
                cursor:          'pointer',
                transition:      'background-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = catColor.bg;
                  e.currentTarget.style.color           = catColor.text;
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color           = 'var(--color-ink)';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Counter kanan */}
        <span className="archive-filter-count" style={{
          marginLeft:    'auto',
          fontFamily:    'var(--font-mono)',
          fontSize:      '11px',
          color:         'var(--color-espresso)',
          opacity:       0.7,
          letterSpacing: '0.04em',
        }}>
          {filteredCount} TULISAN
        </span>
      </div>
    </section>
  );
}
