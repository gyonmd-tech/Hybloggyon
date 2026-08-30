// src/components/hobby/HobbyFooter.jsx
// Section 6 — Penutup halaman: 120px, border atas 2px, last updated + link kembali

export default function HobbyFooter({ lastUpdated }) {
  return (
    <div
      style={{
        height: '120px',
        borderTop: '2px solid var(--color-ink)',
        backgroundColor: 'var(--color-background-ash)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(24px, 6vw, 80px)',
        gap: '20px',
      }}
    >
      {/* Kiri: last updated */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: 'rgba(18,18,20,0.45)',
        }}
      >
        — Terakhir diperbarui: {lastUpdated}
      </span>

      {/* Kanan: link navigasi */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {[
          { label: '← Kembali ke Beranda', href: '/' },
          { label: 'Catatan →', href: '/notes' },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--color-ink)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              opacity: 0.6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = 'var(--color-accent-warm)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.color = 'var(--color-ink)';
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
