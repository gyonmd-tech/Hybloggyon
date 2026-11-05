// src/components/PostCover.jsx
// Cover kartu tulisan: foto upload diberi duotone warna kategori; tanpa upload,
// cover generatif (pola + judul) dibuat dari data tulisan.

import { getCoverDesign } from '../lib/covers';

function range(count) {
  return Array.from({ length: count }, (_, index) => index);
}

function Pattern({ design }) {
  const { pattern, fg, originX, originY, spacing } = design;

  if (pattern === 'rings') {
    return (
      <g fill="none" stroke={fg} strokeOpacity="0.28">
        {range(9).map((i) => (
          <circle key={i} cx={originX} cy={originY} r={spacing * (i + 1)} />
        ))}
      </g>
    );
  }
  if (pattern === 'stripes') {
    return (
      <g stroke={fg} strokeOpacity="0.22">
        {range(16).map((i) => {
          const x = originX - 220 + i * spacing;
          return <line key={i} x1={x} y1="0" x2={x + 200} y2="200" />;
        })}
      </g>
    );
  }
  if (pattern === 'arcs') {
    return (
      <g fill="none" stroke={fg} strokeOpacity="0.3">
        {range(10).map((i) => (
          <circle key={i} cx="300" cy="200" r={spacing * (i + 2)} />
        ))}
      </g>
    );
  }
  return (
    <g fill={fg} fillOpacity="0.3">
      {range(8).flatMap((row) =>
        range(9).map((col) => (
          <circle key={`${row}-${col}`} cx={originX - 130 + col * spacing} cy={14 + row * spacing} r="1.6" />
        )),
      )}
    </g>
  );
}

export default function PostCover({
  post,
  title,
  label,
  showText = true,
  fill = false,
  priority = false,
  style,
}) {
  const design = getCoverDesign(post);
  const frame = {
    position: fill ? 'absolute' : 'relative',
    inset: fill ? 0 : undefined,
    width: '100%',
    height: fill ? '100%' : undefined,
    aspectRatio: fill ? undefined : '3 / 2',
    overflow: 'hidden',
    backgroundColor: design.bg,
    color: design.fg,
    containerType: 'inline-size',
    ...style,
  };

  if (post.coverExists && post.coverImage) {
    return (
      <div style={frame}>
        <img
          src={post.coverImage}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(100%) contrast(1.1)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>
    );
  }

  return (
    <div style={frame} aria-hidden="true">
      <svg
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <Pattern design={design} />
      </svg>
      {showText ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '6cqw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '4cqw',
              fontFamily: 'var(--font-mono)',
              fontSize: 'max(9px, 3.2cqw)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span>{label ?? design.label}</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.02em' }}>Hy</span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: (title ?? design.title).length > 22 ? '8cqw' : '12cqw',
              fontWeight: 300,
              letterSpacing: '-0.045em',
              lineHeight: 0.95,
              maxWidth: '88%',
            }}
          >
            {title ?? design.title}
          </span>
        </div>
      ) : null}
    </div>
  );
}
