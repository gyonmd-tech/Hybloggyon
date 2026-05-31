# claude.md
## HyBloggyon — AI Assistant Context

> File ini adalah instruksi untuk AI coding assistant (Claude, Cursor, Copilot, dll).
> Baca seluruh file ini sebelum membantu task apapun di project ini.

---

## Project Summary

Blog personal statis untuk satu penulis. Dibangun dengan **React + Vite**, konten dikelola via **MDX files lokal** (tanpa CMS). Estetika: **Neo-Brutalist Editorial** — tajam, bersih, berkarakter.

**Selalu baca file-file berikut jika tersedia sebelum mengerjakan task:**
- `context.md` — gambaran besar project dan tone
- `architecture.md` — struktur folder dan tech decisions
- `design-system.md` — semua rules visual dan CSS variables
- `PRD.md` — daftar fitur dan requirements
- `tailwind-integration.md` — panduan Tailwind v4 di project ini
- `stitch-workflow.md` — cara kerja konversi Stitch HTML → React

---

## Tech Stack

```
React 19 + Vite 8
React Router v7
MDX via @mdx-js/rollup
Tailwind CSS v4 (utility-first layer)
CSS Modules (komponen dengan state/animasi)
CSS Variables (semua design tokens)
Animation: GSAP 3 + Framer Motion 12 + Lenis + SplitType
No external UI library (MUI, shadcn, dll)
```

---

## Critical Rules — WAJIB Diikuti

### 1. Styling — Hybrid Tailwind + CSS Modules

```
Tailwind CSS v4  → Layout, spacing, flex/grid, responsive utilities
CSS Modules      → Komponen dengan animasi state, scoped styles
CSS Variables    → Semua design tokens (warna, font, spacing)
```

**Prioritas penggunaan:**
- Gunakan **Tailwind** untuk layout dan spacing (lebih cepat, konsisten)
- Gunakan **CSS Modules** untuk komponen yang butuh animasi state atau scoping ketat
- Gunakan **CSS Variables** untuk semua nilai desain (warna, font, spacing) — tidak pernah hardcode

```jsx
// ✅ Pattern yang benar — Hybrid
<section className="flex gap-8 py-16 border-t border-[#121214]">
  <article className={`${styles.card} hover:-translate-x-0.5 hover:-translate-y-0.5`}>
    ...
  </article>
</section>
```

- **TIDAK BOLEH** menggunakan `border-radius` > 0 kecuali ada alasan kuat dan diminta
- Semua warna dari variabel atau Tailwind custom color config
- Semua spacing dari Tailwind atau variabel: `var(--space-4)`, `var(--space-6)`, dll

### 2. Typography
- Heading: `font-heading-display` atau `font-h1` (Tailwind class), weight 300
- Body: `font-body-md` (Tailwind class), 14px, line-height 1.65
- Metadata/tag: `font-meta-mono` (Tailwind class), 11px, uppercase, letter-spacing 0.08em
- **JANGAN** menggunakan font lain selain yang sudah didefinisikan

### 3. Shadows & Borders
- Border: selalu `1px solid #121214` atau `border-ink` — tidak lebih tebal, tidak blur
- Shadow: selalu **hard block shadow** — `box-shadow: 4px 4px 0px #121214`
- CSS class utility: `.block-shadow` dan `.block-shadow-hover` dari global.css
- **TIDAK BOLEH** menggunakan `box-shadow` dengan nilai blur > 0

### 4. Komponen
- Satu file per komponen
- Komponen di `/src/components/` dengan subfolder sesuai `architecture.md`
- Export default untuk komponen utama
- Prop types menggunakan JSDoc comment (tidak perlu TypeScript)
- Komponen harus mobile-first

### 5. Konten MDX
- Semua artikel di `/content/[kategori]/[slug].mdx`
- Frontmatter wajib: `title`, `date`, `category`, `excerpt`, `coverImage`, `readingTime`, `featured`
- Kategori valid: `esai`, `notes`, `musik`, `film-anime`
- Format date: `YYYY-MM-DD`
- Slug: lowercase, hyphen-separated, deskriptif (bukan `artikel-1`)

### 6. Routing
- Path sesuai `architecture.md`: `/esai/:slug`, `/notes/:slug`, dll
- Gunakan `<Link>` dari React Router — tidak pernah `<a href>` untuk navigasi internal
- Selalu handle 404 dengan graceful fallback

---

## Jangan Lakukan Ini

- ❌ Jangan install shadcn/ui, MUI, Chakra, atau UI library apapun
- ❌ Jangan gunakan `border-radius` > 0 tanpa diminta
- ❌ Jangan gunakan gradient sebagai background
- ❌ Jangan hardcode warna langsung tanpa alasan (selalu prefer CSS variable atau Tailwind token)
- ❌ Jangan gunakan `font-weight: 700` (bold) untuk heading — selalu `300` atau `400`
- ❌ Jangan buat backend, API, atau database
- ❌ Jangan buat sistem autentikasi atau user management
- ❌ Jangan gunakan class-based components — selalu functional components + hooks
- ❌ Jangan gunakan `ease: "bounce"` atau `ease: "elastic"` di animasi
- ❌ Jangan lakukan GSAP di dalam render function — harus di `useEffect`

---

## Contoh Komponen yang Benar (Hybrid Tailwind + CSS Modules)

```jsx
// src/components/ui/CategoryTag.jsx

/**
 * @param {{ category: string, color?: 'green' | 'warm' }} props
 */
import styles from './CategoryTag.module.css';

export default function CategoryTag({ category, color = 'green' }) {
  return (
    <span className={`${styles.tag} ${styles[color]} font-meta-mono text-meta-mono uppercase`}>
      {category}
    </span>
  );
}
```

```css
/* src/components/ui/CategoryTag.module.css */
.tag {
  padding: 4px 8px;
  border-radius: 0;
  display: inline-block;
}
.green { background-color: #7A8A63; color: #FFFFFF; }
.warm  { background-color: #C87A53; color: #FFFFFF; }
```

---

## Cara Load Artikel MDX

```js
// src/utils/mdxLoader.js
const modules = import.meta.glob('/content/**/*.mdx', { eager: true });

export function getAllArticles() {
  return Object.entries(modules).map(([filepath, module]) => {
    const slug = filepath.replace('/content/', '').replace('.mdx', '');
    return {
      slug,
      ...module.frontmatter,
      Component: module.default,
    };
  });
}

export function getArticlesByCategory(category) {
  return getAllArticles()
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

---

## Stitch Design Workflow

Setiap halaman dibangun dari **Stitch HTML** yang diberikan user:

1. User memberikan `code.html` (Stitch output) + `screen.png` (screenshot)
2. Letakkan di `stitch/[nama-halaman]/`
3. Konversi HTML → React menggunakan panduan di `stitch-workflow.md`
4. Buat komponen per-section di folder yang sesuai
5. Integrasikan animasi GSAP + Framer Motion
6. Visual check vs `screen.png`

---

## Tone & Language

- Komentar kode boleh dalam bahasa Indonesia
- Variable dan function names dalam bahasa Inggris
- Jangan over-engineer — ini blog personal, bukan enterprise app
- Kalau ada dua cara, pilih yang lebih sederhana

---

## UPDATE v1.1 — Animasi & Nama Project

### Nama Project
Nama resmi project ini adalah **HyBloggyon** — bukan "Digital Gallery of Thought". Gunakan nama ini di semua kode (title, meta tags, komentar, dll).

### Animation Stack Rules

**GSAP untuk scroll & sequences:**
- Import dari `src/utils/gsapSetup.js` — jangan import GSAP langsung
- Semua `ScrollTrigger` harus di-`kill()` di cleanup function React (`useEffect` return)
- Gunakan `once: true` pada ScrollTrigger yang hanya perlu trigger sekali
- Jangan lupa `ScrollTrigger.refresh()` setelah layout berubah

**Lenis untuk smooth scroll:**
- Init di `App.jsx` level atas, bukan di komponen individual
- Nonaktifkan di mobile: `smoothTouch: false`

**SplitType untuk text animation:**
- Selalu simpan instance SplitType dan revert di cleanup: `splitInstance.revert()`
- Jangan split teks yang di dalam elemen interaktif (button, link) tanpa handling aksesibilitas

**Framer Motion:**
- Hanya untuk micro-interactions dan page transitions
- Gunakan `variants` pattern — jangan inline `animate` untuk animasi kompleks
- `AnimatePresence` wajib ada di route level untuk page transitions

### Easing yang Diizinkan
```
power2.out       — entrance elements
power2.inOut     — transitions
power3.out       — text reveals (lebih dramatic)
none             — scrub/parallax (scroll-linked)
```

---

## UPDATE v1.2 — Struktur Folder Gambar

Lihat `IMAGE-STRUCTURE.md` untuk spesifikasi lengkap.

### Rules Gambar

- **Format:** Selalu WebP — tolak JPG/PNG kecuali ada alasan kuat
- **Naming:** Sama persis dengan slug artikel, lowercase, hyphen-separated
- **Path di frontmatter:** `/images/covers/[kategori]/[slug].webp`
- **HTML attribute:** Wajib `width`, `height`, `alt`, dan `loading="lazy"` (kecuali hero = `eager`)
- **Fallback:** Jika `coverImage` tidak ada di frontmatter, gunakan `/images/placeholders/cover-default.webp`

### Jangan Lakukan

- ❌ Jangan simpan gambar di `/src/` — semua gambar di `/public/images/`
- ❌ Jangan import gambar sebagai ES module — pakai path string
- ❌ Jangan lupa `width` dan `height` pada `<img>` — menyebabkan CLS tinggi di Lighthouse

---

## UPDATE v2.0 — Stitch Design Integration

Semua halaman kini dibangun dari **Stitch HTML export** yang diberikan user. Lihat `stitch-workflow.md` untuk detail proses konversi HTML → React.
