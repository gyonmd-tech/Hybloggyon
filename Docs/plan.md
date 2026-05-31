# plan.md
## HyBloggyon — Development Plan (Updated: Mei 2026)

---

## Overview

Pengembangan dibagi menjadi **4 fase** dengan total estimasi ~3–4 minggu kerja santai (part-time, ~2–3 jam/hari).

**Stack (Updated):**
```
Frontend:    React 19 + Vite 8
Styling:     Tailwind CSS v4 + CSS Modules (hybrid — Tailwind untuk utility, CSS Modules untuk komponen spesifik)
Konten:      MDX files (lokal, /content directory)
Routing:     React Router v7
Animation:   GSAP 3 (ScrollTrigger, SplitType) + Framer Motion 12 + Lenis (smooth scroll)
SEO:         react-helmet-async
Deployment:  ⏸ DITUNDA — fokus konten & fitur dulu
```

> **Catatan Tailwind:** Kami menggunakan Tailwind sebagai lapisan utilitas *tambahan* di atas design system yang sudah ada. CSS custom variables (design tokens) tetap dipertahankan — Tailwind tidak menggantikan tapi mempercepat penulisan layout & spacing. Mode: `class` strategy, arbitrary values digunakan untuk token kustom (mis. `bg-[var(--color-ink)]`).

---

## Status Saat Ini (Fase 0 → Fase 1 sedang berjalan)

### ✅ Selesai (Fase 0)
- [x] Project Vite + React tersetup, berjalan di localhost
- [x] Semua dependencies core terinstall (React Router, MDX, GSAP, Framer Motion, Lenis, SplitType)
- [x] `vite.config.js` — MDX plugin + remark plugins terkonfigurasi
- [x] Struktur folder sesuai `architecture.md`
- [x] Folder gambar `public/images/` lengkap (covers, hero, about, og, placeholders)
- [x] `src/styles/global.css` — CSS variables + reset + typography system
- [x] React Router — semua routes di `App.jsx`
- [x] GSAP + ScrollTrigger setup di `src/utils/gsapSetup.js`
- [x] Lenis smooth scroll di `src/utils/smoothScroll.js`
- [x] Animasi intro sequence di `src/animations/introSequence.js`
- [x] Komponen layout: `Header.jsx`, `Footer.jsx`, `Layout.jsx`
- [x] Komponen homepage: `HeroBanner.jsx`, `TwoColumnGrid.jsx`, `NotesStream.jsx`, `ManifestoClosing.jsx`
- [x] Semua pages: `HomePage`, `NotesPage`, `ArchivePage`, `AboutPage`, `ArticlePage`
- [x] `public/_redirects` untuk SPA routing

### 🔄 Dalam Progress (Fase 1)
- [ ] Integrasi Tailwind CSS v4 ke stack
- [ ] Homepage storytelling — refinement & animasi GSAP yang kompleks
- [ ] Pengisian gambar nyata (upload foto cover dari penulis)

---

## Cara Upload Gambar Sendiri ke Website

> Kamu tidak butuh CMS atau backend. Cukup ikuti langkah ini untuk menambahkan foto/gambar ke website.

### Langkah 1: Siapkan Gambar

Konversi gambar kamu ke **format WebP** dengan spesifikasi berikut:

| Jenis | Ukuran | Dipakai di |
|-------|--------|-----------|
| Cover artikel | `1600 × 900px` | Card artikel, hero |
| Hero landing page | `1920 × 840px` | HeroBanner section |
| Open Graph | `1200 × 630px` | Preview social media |
| Foto author | `800 × 800px` | Halaman About |

**Tools konversi gratis:**
- **[squoosh.app](https://squoosh.app)** — browser-based, drag & drop, pilih WebP, quality 82%
- **[convertio.co](https://convertio.co)** — alternatif online

### Langkah 2: Beri Nama File yang Benar

Gunakan format: `nama-artikel-kamu.webp` (semua huruf kecil, spasi jadi `-`)

```
✅ Benar: tentang-keheningan.webp
✅ Benar: analisis-radiohead-ok-computer.webp
❌ Salah: Foto Keheningan.jpg
❌ Salah: IMG_20260501.png
```

### Langkah 3: Letakkan di Folder yang Tepat

```
public/
└── images/
    ├── covers/
    │   ├── esai/          ← cover untuk artikel Esai
    │   ├── notes/         ← cover untuk Notes
    │   ├── musik/         ← cover untuk artikel Musik
    │   └── film-anime/    ← cover untuk artikel Film & Anime
    ├── hero/
    │   └── featured.webp  ← gambar UTAMA di Hero landing page (ganti ini!)
    ├── about/
    │   └── author.webp    ← foto kamu di halaman About
    └── og/
        └── default.webp   ← preview saat link di-share ke sosmed
```

### Langkah 4: Hubungkan ke Artikel

Di file `.mdx` artikel kamu, update frontmatter:
```yaml
---
title: "Judul Artikelmu"
coverImage: "/images/covers/esai/judul-artikelmu.webp"
---
```

Untuk gambar **hero landing page**, cukup ganti file:
```
public/images/hero/featured.webp
```
Tidak perlu ubah kode — komponen `HeroBanner` sudah otomatis menggunakan file ini.

### Langkah 5: Simpan dan Refresh

Dev server (`npm run dev`) sudah berjalan — gambar langsung muncul setelah kamu taruh file dan refresh browser. **Tidak perlu restart apapun.**

---

## Fase 1: Tailwind Integration + Homepage Storytelling

**Goal:** Tailwind terinstall dan homepage selesai sebagai pengalaman naratif yang kompleks.

> Lihat **`plan-homepage.md`** untuk detail lengkap rencana homepage.

### Task Tailwind Setup

- [ ] Install Tailwind CSS v4 + plugin Vite:
  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```
- [ ] Tambahkan Tailwind plugin ke `vite.config.js`
- [ ] Import Tailwind di `src/styles/global.css`:
  ```css
  @import "tailwindcss";
  ```
- [ ] Konfigurasi `tailwind.config` — extend dengan semua design tokens sebagai Tailwind vars
- [ ] Test: gunakan class `tw-` prefix atau langsung di komponen
- [ ] Update `design-system.md` — tambahkan seksi "Tailwind Integration"

### Task Homepage (Lihat plan-homepage.md untuk detail)

- [ ] Header + Intro Sequence (SplitType + GSAP)
- [ ] Hero Banner — full viewport + parallax + typography overlay
- [ ] Two-Column Grid — Musik & Film/Anime cards
- [ ] Notes Stream — horizontal rows + counter
- [ ] Manifesto Closing — SplitType reveal + CTA
- [ ] Footer — newsletter UI + social links

**Deliverable:** Landing page tampak editorial. Tailwind + CSS Modules hybrid terkonfigurasi. Gambar kamu bisa diupload manual.

---

## Fase 2: Article Pages & Content Pages

**Goal:** Semua halaman konten berfungsi, artikel MDX terbaca dengan layout yang proper.

### Article Page (`/[category]/[slug]`)

- [ ] Header artikel: judul (SplitType reveal), kategori tag, tanggal, reading time indicator
- [ ] Cover image full-width dengan subtle parallax
- [ ] **Framer Motion**: page transition masuk/keluar (`AnimatePresence`)
- [ ] Body MDX dengan komponen kustom (heading, blockquote, code, img+caption)
- [ ] Auto reading time dari word count
- [ ] Related articles section (3 artikel kategori sama)
- [ ] Back navigation dengan `←`

### Custom MDX Components (`src/components/mdx/MDXComponents.jsx`)

- [ ] `h2`, `h3` — font heading weight 300, spacing correct
- [ ] `blockquote` — left border 3px espresso, italic, padded
- [ ] `code` inline — font mono, background espresso, padding minimal
- [ ] `pre` — dark background, font mono, no border-radius
- [ ] `img` — full-width, sharp corners, dengan caption di bawah

### Notes Page (`/notes`)

- [ ] List semua artikel kategori Notes, sorted by date
- [ ] Layout: ArticleCard grid atau list sesuai desain
- [ ] **GSAP**: stagger reveal saat halaman load

### Archive Page (`/archive`)

- [ ] List semua artikel semua kategori
- [ ] Filter tabs: SEMUA / ESAI / NOTES / MUSIK / FILM & ANIME
- [ ] Active filter state dengan background ink + teks putih
- [ ] **Framer Motion**: list item AnimatePresence saat filter berubah

### About Page (`/about`)

- [ ] Render `content/about.mdx`
- [ ] Layout manifesto: teks besar, satu kolom, banyak ruang kosong
- [ ] **GSAP SplitType**: heading besar reveal per kata saat load

**Deliverable:** Semua halaman bisa diakses, konten MDX terbaca dengan layout dan animasi yang benar.

---

## Fase 3: Polish & SEO (Pra-Deploy)

**Goal:** HyBloggyon siap publish — performa bagus, SEO proper.

### Visual & Animation Polish

- [ ] Cek konsistensi spacing semua breakpoint (375px, 768px, 1280px)
- [ ] Cek semua hairline border konsisten `1px solid var(--color-ink)`
- [ ] Cek semua hard shadows konsisten
- [ ] **Cleanup ScrollTrigger**: pastikan semua instance di-kill di `useEffect` return
- [ ] Test animasi di Firefox dan Safari
- [ ] Nonaktifkan Lenis di mobile (`window.matchMedia('(hover: none)')`)
- [ ] Reduce motion: hormati `prefers-reduced-motion`

### SEO

- [ ] `react-helmet-async` di setiap halaman
- [ ] Meta title dinamis: `{article.title} — HyBloggyon`
- [ ] Meta description dari `excerpt`
- [ ] Open Graph: `og:title`, `og:description`, `og:image`
- [ ] `<link rel="canonical">` per halaman

### Performance

- [ ] Lighthouse audit — target score > 90
- [ ] Semua gambar WebP, dengan `width` dan `height` attribute
- [ ] `loading="lazy"` untuk gambar di bawah fold
- [ ] Bundle size check

### Content (Minimum untuk Launch)

- [ ] 1 esai panjang (>1000 kata) sebagai artikel featured hero
- [ ] 2 artikel Notes
- [ ] 1 analisis Musik
- [ ] 1 review Film/Anime
- [ ] Halaman About/Manifesto selesai ditulis

---

## ⏸ Fase 4: Deployment — DITUNDA

> Deployment ke Vercel/Cloudflare Pages **ditunda** sampai homepage dan konten halaman selesai dan memuaskan secara visual.

Langkah deploy (untuk referensi nanti):
- Tambah `public/_redirects` (sudah ada ✅)
- Push ke GitHub repository
- Connect ke Vercel atau Cloudflare Pages
- Set custom domain (opsional)
- Test live — cek semua animasi di production build

---

## Milestone Summary

| Milestone | Target | Status |
|-----------|--------|--------|
| Project setup + library terinstall | Selesai | ✅ |
| Tailwind CSS v4 terintegrasi | Fase 1 | ⬜ |
| Landing page storytelling selesai | Fase 1 | 🔄 |
| Semua halaman berfungsi | Fase 2 | ⬜ |
| Polish + SEO siap | Fase 3 | ⬜ |
| HyBloggyon live di internet | Fase 4 ⏸ | ⏸ |

---

## Nice-to-Have (Post-v1.0)

- [ ] Dark mode toggle (dengan GSAP color transition)
- [ ] Full-text search (Fuse.js)
- [ ] Newsletter integration (Resend / ConvertKit)
- [ ] RSS feed
- [ ] Reading progress bar di article page (GSAP ScrollTrigger scaleX)
- [ ] Sitemap.xml generator
- [ ] Cursor custom (dot kecil mengikuti mouse)
- [ ] Halaman kategori dedicated (`/musik`, `/film-anime`, `/esai`)
