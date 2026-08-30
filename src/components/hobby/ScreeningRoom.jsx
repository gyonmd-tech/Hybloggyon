// src/components/hobby/ScreeningRoom.jsx
// Section 3 — Featured film + grid film lainnya. Backdrop dari TMDb API per-item.

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMG_BASE_W1280 = 'https://image.tmdb.org/t/p/w1280';
const IMG_BASE_W780  = 'https://image.tmdb.org/t/p/w780';

// ── Fallback tipografis jika gambar gagal ──────────────────────────────────
function FilmFallback({ title, style = {} }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-background-ash)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 3vw, 2rem)',
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
    </div>
  );
}

// ── Fetch backdrop dari TMDb (movie atau tv) ─────────────────────────────
async function fetchBackdrop(tmdbId, size = 'w1280', mediaType = 'movie') {
  const width = size === 'w780' ? 780 : 1280;
  const height = size === 'w780' ? 438 : 720;
  const dummyImg = `https://picsum.photos/seed/${tmdbId}/${width}/${height}`;

  if (!TMDB_KEY || TMDB_KEY === 'your_tmdb_api_key_here') return dummyImg;
  try {
    const kind = ['tv', 'anime', 'series'].includes(mediaType) ? 'tv' : 'movie';
    const res  = await fetch(
      `https://api.themoviedb.org/3/${kind}/${tmdbId}/images?api_key=${TMDB_KEY}`
    );
    const data = await res.json();
    const path = data.backdrops?.[0]?.file_path;
    if (!path) return dummyImg;
    const base = size === 'w780' ? IMG_BASE_W780 : IMG_BASE_W1280;
    return `${base}${path}`;
  } catch {
    return dummyImg;
  }
}

// ── Featured film component ─────────────────────────────────────────────
function FeaturedFilm({ film, bannerRef, textRef }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetchBackdrop(film.tmdbId, 'w1280', film.mediaType ?? film.type).then(setImgUrl);
  }, [film.tmdbId, film.mediaType, film.type]);

  return (
    <div style={{ marginBottom: '40px' }}>
      <style>{`
        .featured-film-grid {
          display: grid;
          grid-template-columns: 55% 1fr;
          min-height: min(70vh, 600px);
          border: 1px solid var(--color-ink);
        }
        @media (max-width: 768px) {
          .featured-film-grid { grid-template-columns: 1fr; min-height: unset; }
          .featured-film-banner { min-height: 240px; border-right: none !important; border-bottom: 1px solid var(--color-ink); }
        }
      `}</style>
      <div className="featured-film-grid">
      {/* Banner kiri */}
      <div
        ref={bannerRef}
        className="featured-film-banner"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRight: '1px solid var(--color-ink)',
        }}
      >
        {imgUrl ? (
          <>
            <img
              src={imgUrl}
              alt={film.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.05) brightness(0.95)',
              }}
            />
            {/* Subtle inner shadow instead of an ugly fade */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)',
                pointerEvents: 'none',
              }}
            />
          </>
        ) : (
          <FilmFallback title={film.title} />
        )}
      </div>

      {/* Teks editorial kanan */}
      <div
        ref={textRef}
        style={{
          padding: 'clamp(32px, 5vw, 56px)',
          backgroundColor: 'var(--color-background-ash)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0',
        }}
      >
        {/* Meta: kategori · tahun · genre */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(18,18,20,0.45)',
            marginBottom: '20px',
          }}
        >
          FILM · {film.year} · {film.genre}
        </span>

        {/* Judul */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            marginBottom: '24px',
          }}
        >
          {film.title}
        </h2>

        {/* Kesan personal */}
        <p
          style={{
            fontFamily: 'Switzer, var(--font-sans)',
            fontWeight: 400,
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'var(--color-espresso)',
            marginBottom: '32px',
          }}
        >
          {film.impression}
        </p>

        {/* Satu kata ringkasan */}
        <div
          style={{
            borderTop: '1px solid var(--color-ink)',
            paddingTop: '20px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              color: 'rgba(18,18,20,0.45)',
              textTransform: 'uppercase',
            }}
          >
            SATU KATA:{' '}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'var(--color-ink)',
            }}
          >
            "{film.oneWord}"
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}

// ── Grid item film lainnya ──────────────────────────────────────────────
function GridFilmItem({ film }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetchBackdrop(film.tmdbId, 'w780', film.mediaType ?? film.type).then(setImgUrl);
  }, [film.tmdbId, film.mediaType, film.type]);

  return (
    <div
      style={{
        border: '1px solid var(--color-ink)',
        boxShadow: '3px 3px 0px var(--color-ink)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-background-ash)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = '5px 5px 0px var(--color-ink)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '3px 3px 0px var(--color-ink)';
      }}
    >
      {/* Gambar backdrop 16:9 */}
      <div
        style={{
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: 'var(--color-background-ash)',
        }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={film.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        ) : (
          <FilmFallback title={film.title} style={{ aspectRatio: '16/9' }} />
        )}
      </div>

      {/* Info di bawah */}
      <div style={{ padding: '14px 16px' }}>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: '1rem',
            letterSpacing: '-0.01em',
            color: 'var(--color-ink)',
            margin: '0 0 4px 0',
            lineHeight: 1.2,
          }}
        >
          {film.title}
        </p>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(18,18,20,0.45)',
          }}
        >
          {film.year} · {film.genre}
          {film.oneWord ? ` · "${film.oneWord}"` : ''}
        </span>
      </div>
    </div>
  );
}

// ── Section utama ──────────────────────────────────────────────────────
export default function ScreeningRoom({ watchlist }) {
  const sectionRef  = useRef(null);
  const bannerRef   = useRef(null);
  const textRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        '.sr-label',
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      );

      // Banner slide dari kiri
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
          }
        );
      }

      // Teks fade dari kanan
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
          }
        );
      }

      // Grid items stagger
      const gridItems = sectionRef.current.querySelectorAll('.grid-film-anim');
      gsap.fromTo(
        gridItems,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.sr-grid', start: 'top 82%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        padding: 'clamp(60px, 10vh, 100px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <div className="sr-label" style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-warm)',
            }}
          >
            TONTONAN —
          </span>
        </div>

        {/* Featured film */}
        <FeaturedFilm
          film={watchlist.featured}
          bannerRef={bannerRef}
          textRef={textRef}
        />

        {/* Grid film lainnya */}
        <div
          className="sr-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          <style>{`
            @media (max-width: 900px) { .sr-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .sr-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {watchlist.others.map((film, i) => (
            <div key={i} className="grid-film-anim">
              <GridFilmItem film={film} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
