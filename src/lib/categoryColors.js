// src/lib/categoryColors.js
export const categoryColors = {
  esai:         { bg: 'var(--color-accent-warm)',    text: 'var(--color-background)', label: 'ESAI' },
  notes:        { bg: 'var(--color-secondary-container)', text: 'var(--color-ink)',   label: 'NOTES' },
  musik:        { bg: 'var(--color-accent-green)',   text: 'var(--color-background)', label: 'MUSIK' },
  'film-anime': { bg: 'var(--color-espresso)',       text: 'var(--color-background)', label: 'FILM' },
};

export function getCategoryColor(category) {
  return categoryColors[category] ?? { bg: 'var(--color-background-ash)', text: 'var(--color-ink)', label: category?.toUpperCase() ?? '—' };
}
