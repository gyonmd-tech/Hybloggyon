# tailwind-integration.md
## HyBloggyon — Tailwind CSS v4 Integration Guide

**Version:** Tailwind CSS v4 (via `@tailwindcss/vite`)  
**Strategy:** Hybrid — Tailwind utilities + CSS Modules + CSS Variables  
**Last Updated:** Mei 2026

---

## Mengapa Tailwind?

Tailwind **tidak menggantikan** pendekatan CSS Modules atau design tokens yang sudah ada. Ia digunakan sebagai **lapisan utilitas tambahan** untuk:
- Mempercepat penulisan layout (flex, grid, padding, margin)
- Menangani responsive breakpoints dengan konsisten
- Mengurangi boilerplate CSS untuk styling sederhana

---

## Setup

### Instalasi (Sudah Terpasang)

```bash
npm install tailwindcss @tailwindcss/vite
```

### Vite Config

```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),  // ← Harus sebelum react()
    mdx({ ... }),
    react(),
  ],
});
```

### Global CSS

```css
/* src/styles/global.css */
@import "tailwindcss";

/* Design tokens — tetap sebagai CSS Variables */
:root {
  --color-ink:          #121214;
  --color-bg:           #F4F4F5;
  /* ... semua tokens ... */
}
```

---

## Custom Design Tokens di Tailwind v4

Di Tailwind v4, konfigurasi custom theme dilakukan langsung di CSS via `@theme`:

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* ── Colors ─────────────────────────────── */
  --color-ink:              #121214;
  --color-espresso:         #2D221E;
  --color-espresso-mid:     #3D312A;
  --color-background-ash:   #F4F4F5;
  --color-background-alt:   #ECECEC;
  --color-paper-white:      #FFFFFF;
  --color-surface:          #fdf8f8;
  --color-surface-dim:      #ddd9d9;
  --color-accent-green:     #7A8A63;
  --color-accent-warm:      #C87A53;
  --color-wasabi:           #D9E3C0;
  --color-muted-apricot:    #EBD4C1;

  /* ── Font Families ───────────────────────── */
  --font-heading-display:   'Satoshi', 'Plus Jakarta Sans', sans-serif;
  --font-h1:                'Satoshi', 'Plus Jakarta Sans', sans-serif;
  --font-body-md:           'Switzer', 'General Sans', sans-serif;
  --font-meta-mono:         'Space Mono', monospace;

  /* ── Border Radius — Semua 0! ────────────── */
  --radius:     0px;
  --radius-sm:  0px;
  --radius-md:  0px;
  --radius-lg:  0px;
  --radius-xl:  0px;
  --radius-full: 0px;

  /* ── Container ───────────────────────────── */
  --container-max: 1200px;
}
```

---

## Cara Penggunaan (Pattern)

### 1. Layout & Spacing — Gunakan Tailwind

```jsx
// ✅ Tailwind untuk layout dan spacing
<section className="py-24 px-4 md:px-10 border-t border-[#121214]">
  <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
    ...
  </div>
</section>
```

### 2. Warna Custom — Gunakan Tailwind Token atau CSS Var

```jsx
// ✅ Pakai Tailwind token (setelah @theme setup)
<div className="bg-ink text-paper-white">

// ✅ Atau arbitrary value dengan CSS variable
<div className="bg-[var(--color-espresso)] text-white">

// ❌ Jangan hardcode warna langsung
<div style={{ backgroundColor: '#2D221E' }}>
```

### 3. Typography — Gunakan Tailwind Font Classes

```jsx
// ✅ Font heading
<h1 className="font-heading-display text-[clamp(36px,5vw,64px)] font-light tracking-tighter">

// ✅ Font mono (metadata)
<span className="font-meta-mono text-[11px] uppercase tracking-[0.08em]">

// ✅ Font body
<p className="font-body-md text-sm leading-[1.65]">
```

### 4. Komponen Stateful — Gunakan CSS Modules

```jsx
// ✅ CSS Module untuk komponen dengan animasi state
import styles from './ArticleCard.module.css';

<article className={`${styles.card} border border-[#121214] overflow-hidden`}>
  ...
</article>
```

```css
/* ArticleCard.module.css — hanya untuk state/animasi */
.card {
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px #121214;
}
```

---

## Block Shadow Utility

Hard block shadow adalah signature visual HyBloggyon. Gunakan class global:

```css
/* Sudah ada di global.css */
.block-shadow {
  box-shadow: 4px 4px 0px #121214;
}
.block-shadow-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px #121214;
}
```

```jsx
// Penggunaan di JSX
<div className="border border-[#121214] p-8 bg-paper-white block-shadow">
```

---

## Notes Row Interaction

Pattern khas HyBloggyon untuk list rows:

```css
/* Sudah ada di global.css */
.notes-row {
  transition: all 75ms linear;
}
.notes-row:hover {
  background-color: #121214;
  color: #FFFFFF;
  padding-left: 12px;
}
```

```jsx
// Penggunaan
<a className="notes-row py-8 border-b border-[#121214] flex items-center justify-between" href="#">
  ...
</a>
```

---

## Responsive Breakpoints

Gunakan Tailwind breakpoints — konsisten dengan design-system.md:

| Tailwind | Breakpoint | Deskripsi |
|----------|-----------|-----------|
| (default) | 0px | Mobile |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide Desktop |

```jsx
// ✅ Mobile-first responsive
<div className="px-4 md:px-10 lg:px-16">
  <h1 className="text-4xl md:text-6xl lg:text-8xl">
```

---

## Apa yang TIDAK Dilakukan dengan Tailwind

| ❌ Jangan | ✅ Lakukan sebagai gantinya |
|-----------|---------------------------|
| `rounded-lg` | Hilangkan — semua radius = 0 |
| `shadow-md`, `shadow-lg` | Gunakan `.block-shadow` |
| `ease-bounce`, `ease-spring` | Gunakan GSAP dengan `power2.out` |
| `bg-gradient-to-r` | Tidak ada gradient di desain |
| `text-blue-500` (warna Tailwind default) | Gunakan custom color tokens |
| Inline `style={{ }}` untuk warna | Gunakan Tailwind class atau CSS var |

---

## Stitch HTML → Tailwind Classes

Saat mengkonversi Stitch HTML ke React, Tailwind classes **dipertahankan 1:1**. Stitch sudah mengkonfigurasi Tailwind dengan design tokens HyBloggyon, jadi classnya langsung compatible.

```html
<!-- Stitch HTML -->
<section class="py-24 px-4 md:px-margin-desktop bg-background-ash border-b border-ink">

<!-- React JSX — sama persis -->
<section className="py-24 px-4 md:px-margin-desktop bg-background-ash border-b border-ink">
```

Perbedaan utama: `class` → `className`

---

## Referensi

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Tailwind Vite Plugin](https://tailwindcss.com/docs/installation/vite)
- `Docs/design-system.md` — design tokens lengkap
- `Docs/stitch-workflow.md` — konversi Stitch HTML ke React
