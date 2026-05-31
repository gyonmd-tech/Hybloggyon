import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function HeroBanner() {
  const titleRef = useRef(null);
  const bgRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Background Reveal
      gsap.fromTo(bgRef.current,
        { scale: 1.15, filter: 'grayscale(100%) contrast(1) brightness(0)' },
        { scale: 1, filter: 'grayscale(100%) contrast(1.2) brightness(0.9)', duration: 2.5, ease: 'power3.out', delay: 1.5 }
      );

      // 2. Title Character Stagger
      if (titleRef.current) {
        const text = new SplitType(titleRef.current, { types: 'chars' });
        // Hide original text overflow during animation
        gsap.set(titleRef.current, { overflow: 'hidden' });
        
        gsap.fromTo(text.chars, 
          { y: 120, opacity: 0, rotateX: -40 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0, 
            duration: 1.2, 
            stagger: 0.05, 
            ease: 'expo.out', 
            delay: 2.2,
            onComplete: () => { text.revert(); } // Clean up DOM after animation
          }
        );
      }

      // 3. Corner Frame Reveal
      if (frameRef.current) {
        // Animate the two rows (top row, bottom row)
        gsap.fromTo(frameRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out', delay: 2.6 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000', // Pure OLED Black
      }}
    >
      <style>{`
        .hero-frame {
          position: absolute;
          inset: 48px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
        }
        .hero-row-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .hero-row-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .hero-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
          z-index: 2;
        }
        .hero-interactive {
          pointer-events: auto;
        }
        @media (max-width: 900px) {
           .hero-frame { inset: 32px; }
           .hero-row-bottom { flex-direction: column; align-items: flex-start; gap: 32px; }
           .hero-align-right { text-align: left !important; }
        }
      `}</style>

      {/* Background image - HD Contrast */}
      <div
        ref={bgRef}
        className="hero-image"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '120%',
          top: '-10%',
          backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=100')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
          willChange: 'transform, filter',
        }}
      />

      {/* Pure OLED Black Fade Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Dead Center Title */}
      <div className="hero-center">
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: 'clamp(80px, 16vw, 240px)', // Ultra massive
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0 120%)', // For elegant reveal
          }}
        >
          Field Study.
        </h1>
      </div>

      {/* The 4-Corner Frame Layout */}
      <div className="hero-frame" ref={frameRef}>
        
        {/* Top Row */}
        <div className="hero-row-top">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Edisi Terkini // 2026
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              -6.2088° S, 106.8456° E
            </span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="hero-row-bottom">
          <div style={{ maxWidth: '300px' }}>
             <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-accent-green)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              [ Ongoing Monograph ]
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Workshop digital untuk preservasi pemikiran — esai panjang, catatan belajar, dan analisis pop-culture.
            </p>
          </div>

          <div className="hero-align-right hero-interactive" style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              INVESTIGATING // ACTIVE
            </span>
            <a
              href="/esai"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#000000',
                backgroundColor: '#ffffff',
                padding: '16px 32px',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-green)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Mulai Membaca →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
