// Desain cover generatif per tulisan. Murni data (tanpa React) agar bisa
// dipakai komponen kartu sekaligus route gambar OG.

const PALETTE = {
  esai:         { bg: '#C87A53', fg: '#121214', name: 'Esai' },
  notes:        { bg: '#F0DBD5', fg: '#121214', name: 'Notes' },
  musik:        { bg: '#7A8A63', fg: '#121214', name: 'Musik' },
  'film-anime': { bg: '#2D221E', fg: '#FAFAFA', name: 'Film' },
};
const FALLBACK_PALETTE = Object.values(PALETTE);
const PATTERNS = ['rings', 'stripes', 'arcs', 'grid'];

function hashString(value) {
  let hash = 2166136261;
  for (const char of String(value)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
}

export function getCategoryPalette(category) {
  return PALETTE[category] || {
    ...FALLBACK_PALETTE[hashString(category) % FALLBACK_PALETTE.length],
    name: String(category || '').replace(/-/g, ' '),
  };
}

// Pola dan posisinya diturunkan dari slug, jadi satu tulisan selalu
// mendapat cover yang sama tanpa perlu disimpan.
export function getCoverDesign({ slug, title, category, seriesOrder }) {
  const seed = hashString(slug || title);
  const palette = getCategoryPalette(category);
  const chapter = Number(seriesOrder) || null;

  return {
    ...palette,
    title,
    pattern: PATTERNS[seed % PATTERNS.length],
    label: chapter ? `Bab ${String(chapter).padStart(2, '0')} · ${palette.name}` : palette.name,
    originX: 190 + (seed >> 4) % 90,
    originY: 20 + (seed >> 9) % 110,
    spacing: 16 + (seed >> 13) % 10,
  };
}
