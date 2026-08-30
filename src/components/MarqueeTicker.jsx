// src/components/MarqueeTicker.jsx
export default function MarqueeTicker({ text }) {
  const repeated = `${text}   ${text}   `;

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--color-ink)',
        borderBottom: '1px solid var(--color-ink)',
        backgroundColor: 'var(--color-ink)',
        padding: '10px 0',
        userSelect: 'none',
      }}
    >
      <div className="animate-marquee" aria-label="Status ticker">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--color-background-ash)',
            whiteSpace: 'nowrap',
            paddingRight: '48px',
          }}
        >
          {repeated}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--color-background-ash)',
            whiteSpace: 'nowrap',
            paddingRight: '48px',
          }}
          aria-hidden="true"
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
