// src/components/CuratedConsumption.jsx
import { useState, useEffect } from 'react';

const EXHIBITION_ITEMS = [
  { title: 'OK COMPUTER', tag: 'RADIOHEAD · MUSIK', img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1000&q=75&auto=format&fit=crop' },
  { title: 'STALKER', tag: 'ANDREI TARKOVSKY · FILM', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&q=75&auto=format&fit=crop' },
  { title: '1984', tag: 'GEORGE ORWELL · BUKU', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&q=75&auto=format&fit=crop' },
  { title: 'NEW JEANS', tag: 'NEWJEANS · K-POP', img: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f36611?w=1000&q=75&auto=format&fit=crop' },
  { title: 'AKIRA', tag: 'KATSUHIRO OTOMO · ANIME', img: 'https://images.unsplash.com/photo-1554188248-986ada9caac0?w=1000&q=75&auto=format&fit=crop' },
];

export default function CuratedConsumption() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section
      className="curated-consumption-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-ink)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Desktop Background Images Layer (Hidden on Mobile) */}
      <div className="hide-mobile">
        {EXHIBITION_ITEMS.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isActive ? 0.6 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.05)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 0,
                pointerEvents: 'none',
                willChange: 'opacity, transform',
              }}
            />
          );
        })}
      </div>

      {/* Dark overlay for desktop */}
      <div
        className="hide-mobile"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18,18,20,1) 0%, rgba(18,18,20,0.4) 100%)',
          zIndex: 1, pointerEvents: 'none',
          opacity: activeIdx !== null ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" style={{ zIndex: 2, opacity: 0.5, pointerEvents: 'none' }} aria-hidden="true" />

      {/* Header */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          padding: 'clamp(40px, 6vw, 80px) clamp(20px, 3vw, 40px) clamp(20px, 4vw, 40px) clamp(20px, 3vw, 40px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: '24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--color-accent-green)', textTransform: 'uppercase' }}>
            [ Exhibition ]
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(28px, 4vw, 40px)', 
            letterSpacing: '0.02em', textTransform: 'uppercase', color: '#ffffff', margin: 0 
          }}>
            Koleksi &amp; Arsip
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.6)', 
            lineHeight: 1.6, margin: 0 
          }}>
            Kumpulan referensi kultural pilihan—dari album esensial, sinema lambat, hingga literatur distopia yang membentuk fondasi dan arah pemikiran.
          </p>
        </div>
        
        <span
          className="hide-mobile"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em',
            color: 'var(--color-accent-green)', border: '1px solid var(--color-accent-green)',
            padding: '6px 16px', borderRadius: '100px', alignSelf: 'flex-start',
            marginTop: '8px'
          }}
        >
          [ HOVER TO REVEAL ]
        </span>
      </div>

      {/* DESKTOP VIEW: Massive Typography List */}
      <div
        className="hide-mobile"
        style={{
          position: 'relative', zIndex: 10, flex: 1, display: 'flex',
          flexDirection: 'column', justifyContent: 'center',
          padding: `0 clamp(20px, 3vw, 40px) clamp(40px, 8vw, 100px) clamp(20px, 3vw, 40px)`
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {EXHIBITION_ITEMS.map((item, idx) => {
            const isHovered = activeIdx === idx;
            const isDimmed = activeIdx !== null && !isHovered;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                style={{
                  cursor: 'crosshair',
                  padding: 'clamp(8px, 1.5vh, 16px) 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)',
                  transform: isHovered ? 'translateX(24px)' : 'translateX(0)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: 'clamp(32px, 8vw, 160px)',
                    lineHeight: 0.85, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0,
                    color: isDimmed ? 'transparent' : '#ffffff',
                    WebkitTextStroke: isDimmed ? '1px rgba(255,255,255,0.2)' : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {item.title}
                </h2>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em',
                    color: 'var(--color-accent-green)', textTransform: 'uppercase',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'all 0.4s ease 0.1s', whiteSpace: 'nowrap',
                    display: 'inline-block',
                  }}
                >
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE VIEW: Cinematic Cards */}
      <div
        className="hide-desktop"
        style={{
          position: 'relative', zIndex: 10, display: 'flex',
          flexDirection: 'column', gap: '12px',
          padding: '0 20px 40px 20px'
        }}
      >
        {EXHIBITION_ITEMS.map((item, idx) => (
          <div key={idx} style={{
            position: 'relative',
            height: '160px',
            width: '100%',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px',
            backgroundColor: 'var(--color-ink)'
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'grayscale(60%) contrast(1.1)',
              opacity: 0.45
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,20,0.95) 0%, rgba(18,18,20,0.1) 100%)' }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{ 
                fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', 
                color: 'var(--color-accent-green)', textTransform: 'uppercase', display: 'block', marginBottom: '4px'
              }}>
                {item.tag}
              </span>
              <h2 style={{ 
                fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '24px', 
                letterSpacing: '-0.02em', color: '#ffffff', margin: 0, textTransform: 'uppercase', lineHeight: 1.1
              }}>
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .curated-consumption-section {
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
