// src/components/article/ReadingProgressBar.jsx
// Progress bar tipis 2px fixed di atas viewport, warna dari kategori artikel.

export default function ReadingProgressBar({ progress, color }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        zIndex:          999,
        height:          '2px',
        width:           `${progress}%`,
        backgroundColor: color ?? 'var(--color-accent-warm)',
        transition:      'width 0.1s linear',
        pointerEvents:   'none',
      }}
    />
  );
}
