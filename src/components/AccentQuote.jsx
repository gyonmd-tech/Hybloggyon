// src/components/AccentQuote.jsx
export default function AccentQuote() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-ink)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '180px 40px', // Increased padding for dramatic breathing room
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 4fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left: ornament */}
        <div>
          <div
            style={{
              width: '1px',
              height: '64px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Right: quote */}
        <div>
          <blockquote
            className="reveal-up"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            "Menulis bukan tentang menyimpan kata — ini tentang{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--color-wasabi)' }}>
              belajar berpikir
            </em>{' '}
            dengan keras kepala."
          </blockquote>

          <cite
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontStyle: 'normal',
            }}
          >
            — HyBloggyon Manifesto, 2021
          </cite>
        </div>
      </div>
    </section>
  );
}
