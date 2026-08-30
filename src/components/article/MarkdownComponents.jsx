// Override elemen HTML default yang dirender dari Markdown.
// Menggunakan CSS inline style agar tidak memerlukan CSS Module tambahan.

// ─── Paragraph Normal ────────────────────────────────────────────────────────
function Paragraph({ children }) {
  return (
    <p style={{
      fontFamily:   'Switzer, var(--font-sans)',
      fontSize:     '1.125rem',
      lineHeight:   1.85,
      color:        'var(--color-ink)',
      marginBottom: '1.5em',
      marginTop:    0,
    }}>
      {children}
    </p>
  );
}

// ─── Heading H2 ──────────────────────────────────────────────────────────────
function H2({ children, id }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily:    'Satoshi, var(--font-heading)',
        fontWeight:    300,
        fontSize:      '2rem',
        letterSpacing: '-0.02em',
        lineHeight:    1.1,
        color:         'var(--color-ink)',
        marginTop:     '3em',
        marginBottom:  '0.75em',
        paddingTop:    '1em',
        borderTop:     '1px solid var(--color-ink)',
      }}
    >
      {children}
    </h2>
  );
}

// ─── Heading H3 ──────────────────────────────────────────────────────────────
function H3({ children }) {
  return (
    <h3 style={{
      fontFamily:    'Satoshi, var(--font-heading)',
      fontWeight:    400,
      fontSize:      '1.35rem',
      letterSpacing: '-0.01em',
      color:         'var(--color-ink)',
      marginTop:     '2em',
      marginBottom:  '0.5em',
    }}>
      <span style={{
        display:       'block',
        fontFamily:    'var(--font-mono)',
        fontSize:      '10px',
        letterSpacing: '0.1em',
        color:         'var(--color-espresso)',
        opacity:       0.6,
        marginBottom:  '4px',
        textTransform: 'uppercase',
      }}>
        §
      </span>
      {children}
    </h3>
  );
}

// ─── Blockquote ──────────────────────────────────────────────────────────────
function Blockquote({ children, accentColor }) {
  return (
    <blockquote style={{
      borderLeft:   `3px solid ${accentColor}`,
      paddingLeft:  '1.5em',
      marginLeft:   0,
      marginRight:  0,
      marginTop:    '2em',
      marginBottom: '2em',
      fontFamily:   'Satoshi, var(--font-heading)',
      fontWeight:   300,
      fontSize:     '1.25rem',
      fontStyle:    'normal',
      lineHeight:   1.6,
      color:        'var(--color-ink)',
    }}>
      {children}
    </blockquote>
  );
}

// ─── Inline Code ─────────────────────────────────────────────────────────────
function InlineCode({ children }) {
  return (
    <code style={{
      fontFamily:      'var(--font-mono)',
      fontSize:        '0.875em',
      backgroundColor: 'var(--color-background-ash)',
      padding:         '2px 5px',
      color:           'var(--color-ink)',
      // ❌ Tidak ada border-radius
    }}>
      {children}
    </code>
  );
}

// ─── Code Block ──────────────────────────────────────────────────────────────
function Pre({ children }) {
  return (
    <pre style={{
      backgroundColor: 'var(--color-ink)',
      color:           'var(--color-background)',
      fontFamily:      'var(--font-mono)',
      fontSize:        '0.9rem',
      lineHeight:      1.7,
      padding:         '1.5em',
      overflowX:       'auto',
      marginTop:       '1.5em',
      marginBottom:    '1.5em',
      // ❌ Tidak ada border-radius
    }}>
      {children}
    </pre>
  );
}

// ─── Image ───────────────────────────────────────────────────────────────────
function Img({ src, alt }) {
  return (
    <figure style={{ margin: '2em 0' }}>
      <img
        src={src}
        alt={alt ?? ''}
        style={{
          width:     '100%',
          display:   'block',
          border:    '1px solid var(--color-ink)',
          boxShadow: '4px 4px 0px var(--color-ink)',
          // ❌ Tidak ada border-radius
        }}
      />
      {alt && (
        <figcaption style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '11px',
          letterSpacing: '0.06em',
          color:         'var(--color-espresso)',
          opacity:       0.7,
          marginTop:     '10px',
        }}>
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

// ─── HR (Divider) ────────────────────────────────────────────────────────────
function Hr() {
  return (
    <div style={{
      textAlign:     'center',
      fontFamily:    'var(--font-mono)',
      fontSize:      '16px',
      letterSpacing: '0.3em',
      color:         'var(--color-espresso)',
      opacity:       0.4,
      margin:        '3em 0',
      userSelect:    'none',
    }}>
      · · ·
    </div>
  );
}

// ─── Strong & Em ────────────────────────────────────────────────────────────
function Strong({ children }) {
  return <strong style={{ fontWeight: 500, color: 'var(--color-ink)' }}>{children}</strong>;
}

function Em({ children }) {
  return <em style={{ fontStyle: 'italic', opacity: 0.9 }}>{children}</em>;
}

// ─── Export ──────────────────────────────────────────────────────────────────
export function makeMarkdownComponents(accentColor) {
  const resolvedAccent = accentColor ?? 'var(--color-accent-warm)';

  function AccentBlockquote({ children }) {
    return <Blockquote accentColor={resolvedAccent}>{children}</Blockquote>;
  }

  return {
    h2:         H2,
    h3:         H3,
    blockquote: AccentBlockquote,
    code:       InlineCode,
    pre:        Pre,
    img:        Img,
    hr:         Hr,
    strong:     Strong,
    em:         Em,
    p:          Paragraph,
  };
}
