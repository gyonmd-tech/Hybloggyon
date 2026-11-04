// src/lib/categoryColors.js
const ACCENTS = [
  { bg: 'var(--color-accent-warm)',         text: 'var(--color-background)' },
  { bg: 'var(--color-secondary-container)', text: 'var(--color-ink)' },
  { bg: 'var(--color-accent-green)',        text: 'var(--color-background)' },
  { bg: 'var(--color-espresso)',            text: 'var(--color-background)' },
];

export const categoryColors = {
  esai:         { ...ACCENTS[0], label: 'ESAI' },
  notes:        { ...ACCENTS[1], label: 'NOTES' },
  musik:        { ...ACCENTS[2], label: 'MUSIK' },
  'film-anime': { ...ACCENTS[3], label: 'FILM' },
};

// Kategori baru dari admin mendapat warna tetap dari palet berdasarkan slug-nya,
// jadi tidak perlu menambah kode setiap kali kategori dibuat.
function accentForSlug(slug) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return ACCENTS[hash % ACCENTS.length];
}

export function getCategoryColor(category, name) {
  if (!category) return { bg: 'var(--color-background-ash)', text: 'var(--color-ink)', label: '—' };
  const known = categoryColors[category];
  if (known) return name ? { ...known, label: name.toUpperCase() } : known;
  return { ...accentForSlug(category), label: (name || category.replace(/-/g, ' ')).toUpperCase() };
}

// URL halaman kategori. Notes memakai halaman /notes yang sudah ada.
export function getCategoryHref(category) {
  return category === 'notes' ? '/notes' : `/${category}`;
}
