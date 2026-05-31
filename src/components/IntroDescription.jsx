// src/components/IntroDescription.jsx
export default function IntroDescription() {
  return (
    <section
      className="intro-section"
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        padding: '120px 40px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Centered Layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <p
            className="intro-description-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 56px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
            }}
          >
            HyBloggyon adalah{' '}
            <span
              style={{
                backgroundColor: 'var(--color-wasabi)',
                padding: '0 8px',
                display: 'inline-block',
                transform: 'translateY(-2px)',
              }}
            >
              workshop digital
            </span>{' '}
            yang didedikasikan untuk preservasi pemikiran — esai panjang, catatan belajar, dan analisis pop-culture dari sudut pandang{' '}
            <span
              style={{
                backgroundColor: 'var(--color-wasabi)',
                padding: '0 8px',
                display: 'inline-block',
                transform: 'translateY(-2px)',
              }}
            >
              filosofis dan puitis.
            </span>
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'var(--color-espresso)',
              marginTop: '40px',
              maxWidth: '540px',
              lineHeight: 1.8,
              textTransform: 'uppercase',
            }}
          >
            Sebuah ruang kontemplatif yang tidak dikejar metrik engagement — hanya tulisan jujur yang dibiarkan bernapas panjang.
          </p>
        </div>
      </div>
    </section>
  );
}
