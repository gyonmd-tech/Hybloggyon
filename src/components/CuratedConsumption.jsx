// src/components/CuratedConsumption.jsx
import { useState } from 'react';

const EXHIBITION_ITEMS = [
  { 
    title: 'OK COMPUTER', 
    tag: 'RADIOHEAD · MUSIK', 
    // Abstract aesthetic
    img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1000&q=75&auto=format&fit=crop' 
  },
  { 
    title: 'STALKER', 
    tag: 'ANDREI TARKOVSKY · FILM', 
    // Cinematic, mysterious
    img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&q=75&auto=format&fit=crop' 
  },
  { 
    title: '1984', 
    tag: 'GEORGE ORWELL · BUKU', 
    // Dark architecture / dystopia
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&q=75&auto=format&fit=crop' 
  },
  { 
    title: 'NEW JEANS', 
    tag: 'NEWJEANS · K-POP', 
    // Soft/emotional mood
    img: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f36611?w=1000&q=75&auto=format&fit=crop' 
  },
  { 
    title: 'AKIRA', 
    tag: 'KATSUHIRO OTOMO · ANIME', 
    // Cyberpunk city
    img: 'https://images.unsplash.com/photo-1554188248-986ada9caac0?w=1000&q=75&auto=format&fit=crop' 
  },
];

export default function CuratedConsumption() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
      {/* Background Images Layer */}
      {EXHIBITION_ITEMS.map((item, idx) => {
        const isActive = hoveredIdx === idx;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isActive ? 0.6 : 0, // 0.6 so the text remains readable
              transform: isActive ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 0,
              pointerEvents: 'none',
              willChange: 'opacity, transform',
            }}
          />
        );
      })}

      {/* Dark overlay to ensure text is always readable over bright images */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(18,18,20,1) 0%, rgba(18,18,20,0.4) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: hoveredIdx !== null ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Grain overlay for cinematic texture */}
      <div 
        className="grain-overlay" 
        style={{ zIndex: 2, opacity: 0.5, pointerEvents: 'none' }} 
        aria-hidden="true" 
      />

      {/* Header */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: '60px 40px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            letterSpacing: '0.2em', 
            color: 'rgba(255,255,255,0.5)', 
            textTransform: 'uppercase' 
          }}
        >
          Koleksi & Arsip
        </span>
        <span 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            letterSpacing: '0.2em', 
            color: 'var(--color-accent-green)',
            border: '1px solid var(--color-accent-green)',
            padding: '4px 12px',
            borderRadius: '100px'
          }}
        >
          [ HOVER TO REVEAL ]
        </span>
      </div>

      {/* Massive Typography List */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '0 40px 100px 40px' 
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {EXHIBITION_ITEMS.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isDimmed = hoveredIdx !== null && !isHovered;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  cursor: 'crosshair',
                  padding: '1.5vh 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                  opacity: 1, // We handle opacity inside the text elements
                  transform: isHovered ? 'translateX(24px)' : 'translateX(0)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 'clamp(50px, 10vw, 160px)', // MASSIVE
                    lineHeight: 0.85,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    margin: 0,
                    // If dimmed, make it outline only
                    color: isDimmed ? 'transparent' : '#ffffff',
                    WebkitTextStroke: isDimmed ? '1px rgba(255,255,255,0.2)' : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {item.title}
                </h2>
                
                {/* Meta Tag: Only visible when hovered */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: 'var(--color-accent-green)',
                    textTransform: 'uppercase',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'all 0.4s ease 0.1s', // slight delay for elegance
                    whiteSpace: 'nowrap',
                    display: 'none', // Will use media query below for mobile
                  }}
                  className="reveal-tag"
                >
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @media (min-width: 768px) {
          .reveal-tag {
            display: inline-block !important;
          }
        }
      `}</style>
    </section>
  );
}
