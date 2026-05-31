// src/components/MarqueeTicker.jsx
const TICKER_TEXT =
  '// CURRENTLY INVESTIGATING: THE FRAGILITY OF DIGITAL ARCHIVES // REVISION 4.0.2 // GRID ENFORCED // SINCE 2021 // ESAI · NOTES · MUSIK · FILM & ANIME // WORKSHOP DIGITAL UNTUK PRESERVASI PEMIKIRAN //';

export default function MarqueeTicker() {
  const repeated = `${TICKER_TEXT}   ${TICKER_TEXT}   `;

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
