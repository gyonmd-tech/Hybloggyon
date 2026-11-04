// Animasi masuk hero memakai CSS, jadi langsung berjalan dari HTML server
// tanpa menunggu JavaScript dimuat. Durasi dan easing meniru versi GSAP lama.
const HERO_ANIMATION_CSS = `
  @keyframes hero-bg-in {
    from { transform: scale(1.15); filter: grayscale(100%) contrast(1) brightness(0.35); }
    to   { transform: scale(1);    filter: grayscale(100%) contrast(1.2) brightness(0.9); }
  }
  @keyframes hero-char-in {
    from { opacity: 0; transform: translateY(120px) rotateX(-40deg); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes hero-char-in-mobile {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes hero-frame-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }
  .hero-image { animation: hero-bg-in 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
  .hero-word { display: inline-block; white-space: nowrap; }
  .hero-char {
    display: inline-block;
    animation: hero-char-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: calc(0.1s + var(--i) * 0.04s);
  }
  .hero-char--mobile { animation-name: hero-char-in-mobile; animation-duration: 0.9s; }
  .hero-frame > * { animation: hero-frame-in 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
  .hero-frame > .hero-row-top { animation-delay: 0.35s; }
  .hero-frame > .hero-row-bottom { animation-delay: 0.2s; }
`;

// Judul dipecah per huruf di server agar animasi stagger tidak butuh SplitType.
function AnimatedTitle({ text, mobile = false }) {
  let index = 0;
  return text.split(' ').map((word, wordIndex, words) => (
    <span key={wordIndex}>
      <span className="hero-word" aria-hidden="true">
        {Array.from(word).map((char) => (
          <span
            key={index}
            className={mobile ? 'hero-char hero-char--mobile' : 'hero-char'}
            style={{ '--i': index++ }}
          >
            {char}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? ' ' : null}
    </span>
  ));
}

// Gambar Unsplash diminta dalam ukuran sesuai layar dan format WebP;
// URL lain (misalnya file lokal) dipakai apa adanya.
function heroImageSources(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { src: url };
  }
  if (parsed.hostname !== 'images.unsplash.com') return { src: url };

  const variant = (width) => {
    const next = new URL(parsed);
    next.searchParams.set('w', String(width));
    next.searchParams.set('q', '70');
    next.searchParams.set('fm', 'webp');
    return next.toString();
  };
  return {
    src: variant(1280),
    srcSet: [768, 1280, 1920].map((width) => `${variant(width)} ${width}w`).join(', '),
  };
}

export default function HeroBanner({ content }) {
  const image = heroImageSources(content.imageUrl);

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
      <style>{HERO_ANIMATION_CSS}</style>
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
        
        /* Mobile Layout Optimizations */
        @media (max-width: 768px) {
          .hero-frame { 
            inset: 24px; 
            justify-content: flex-end; /* Push everything to bottom */
            padding-bottom: 80px; /* Raised up for visibility */
          }
          .hero-row-top { display: none; }
          .hero-row-bottom { 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 32px; 
            width: 100%;
          }
          .hero-align-right { 
            text-align: left !important; 
            width: 100%; 
          }
          .hero-cta-btn { 
            display: flex !important; 
            justify-content: space-between;
            align-items: center;
            width: 100% !important; 
            padding: 18px 24px !important; 
            font-size: 12px; 
          }
          .hero-investigating { display: none !important; }
          .hero-desc-block { 
            display: block !important; 
            max-width: 100% !important; 
          }
        }
      `}</style>

      {/* Background image - HD Contrast */}
      <div
        className="hero-image"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '120%',
          top: '-10%',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
          willChange: 'transform, filter',
        }}
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      </div>

      {/* Pure OLED Black Fade Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Dead Center Title (Desktop Only) */}
      <div className="hero-center hide-mobile">
        <h1
          aria-label={content.title}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: 'clamp(80px, 16vw, 240px)', // Ultra massive
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0 120%)',
          }}
        >
          <AnimatedTitle text={content.title} />
        </h1>
      </div>

      {/* The 4-Corner Frame Layout */}
      <div className="hero-frame">
        
        {/* Top Row (Desktop Only) */}
        <div className="hero-row-top">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {content.edition}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="hero-gps" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {content.coordinates}
            </span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="hero-row-bottom">
          <div className="hero-desc-block" style={{ maxWidth: '340px' }}>
            {/* Mobile Title */}
            <h1 
              className="hide-desktop"
              aria-label={content.title}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                fontSize: '56px',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                marginBottom: '24px',
              }}
            >
              <AnimatedTitle text={content.title} mobile />
            </h1>

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
              {content.eyebrow}
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {content.description}
            </p>
          </div>

          <div className="hero-align-right hero-interactive" style={{ textAlign: 'right' }}>
            <span
              className="hero-investigating"
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
              href={content.ctaUrl}
              className="hero-cta-btn"
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
              <span>{content.ctaLabel}</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
