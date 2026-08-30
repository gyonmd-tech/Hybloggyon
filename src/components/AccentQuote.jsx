// src/components/AccentQuote.jsx
export default function AccentQuote({ content }) {
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
              fontSize: 'clamp(32px, 5vw, 64px)', // Increased size
              lineHeight: 1.1, // Tighter line height for large text
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '32px', // More breathing room below
            }}
          >
            “{content.text}”
          </blockquote>

          <cite
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px', // Slightly larger
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', // Slightly brighter
              fontStyle: 'normal',
            }}
          >
            — {content.citation}
          </cite>
        </div>
      </div>
    </section>
  );
}
