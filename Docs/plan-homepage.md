# plan-homepage.md
## HyBloggyon — Homepage Design Plan

> **Dokumen ini khusus membahas struktur, desain, dan semua detail teknis homepage (landing page).**
> Update plan ini seiring diskusi dan refinement desain.

---

## Visi Homepage

Homepage HyBloggyon bukan halaman daftar artikel biasa. Ia adalah sebuah **editorial experience** — seperti membuka majalah premium independen yang halaman-halamannya terbuka satu per satu saat kamu scroll.

**Primary visual reference:** [Tight Media](https://en.tight.media)
**Animation feel:** Webflow showcase sites, Awwwards SOTD winners
**Scrollytelling ref:** NYT Interactive, The Pudding

---

## Struktur Narasi (Top → Bottom)

```
┌─────────────────────────────────────────────┐
│  [1] HEADER + INTRO SEQUENCE                │  ← above the fold
├─────────────────────────────────────────────┤
│  [2] EDITORIAL HERO BANNER                  │  ← full viewport
├─────────────────────────────────────────────┤
│  [3] TWO-COLUMN GRID (Musik & Film/Anime)   │
├─────────────────────────────────────────────┤
│  [4] NOTES STREAM                           │
├─────────────────────────────────────────────┤
│  [5] MANIFESTO CLOSING                      │
├─────────────────────────────────────────────┤
│  [6] FOOTER                                 │
└─────────────────────────────────────────────┘
```

---

## Section 1: Header + Intro Sequence

### Layout
```
┌──────────────────────────────────────────────────────────────┐  ← nav-border-top (hairline 1px ink)
│  HyBloggyon                    ESAI  NOTES  MUSIK  ARCHIVE   │
└──────────────────────────────────────────────────────────────┘  ← nav-border-bottom (hairline 1px ink)
```

### Komponen: `Header.jsx`
- Logo/nama blog: font-heading weight 300, tracking tight
- Navigasi: font-mono, 11px, uppercase, letter-spacing 0.08em
- Dua hairline border: atas dan bawah header
- Sticky saat scroll (dengan subtle background blur transition)

### Animasi Intro Sequence (GSAP Timeline — satu kali saat mount)
```
1. nav-border-top  → scaleX: 0 → 1 (dari kiri ke kanan), 0.8s
2. .site-title chars → y: 100% → 0, stagger 0.04s, SplitType per karakter
3. .nav-item → opacity 0 → 1, y: -8 → 0, stagger 0.08s
4. [lanjut ke hero →]
```

### Keputusan Desain yang Perlu Didiskusikan
> ❓ Apakah header mau sticky/fixed saat scroll? Dan apakah mau ada perubahan visual saat sticky (mis. background gelap semi-transparan)?

---

## Section 2: Editorial Hero Banner

### Layout
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                   [ FOTO COVER FEATURED ]                    │  100vh
│                   (foto mengisi full screen)                  │
│                                                              │
│  KATEGORI · TANGGAL                                          │
│                                                              │
│  Judul Artikel Featured                                      │
│  Yang Cukup Besar Untuk                                      │
│  Mendominasi Layar                                           │
│                                                              │
│  [ BACA ARTIKEL → ]                                          │
└──────────────────────────────────────────────────────────────┘
```

### Komponen: `HeroBanner.jsx`
- Full viewport height (`100vh`)
- Foto cover dari `featured.webp` atau artikel yang di-mark `featured: true`
- Overlay gelap: `rgba(18,18,20, 0.45)` di atas foto
- Typography overlay: posisi bottom-left, max-width 60%

### Animasi (GSAP)
```
Load sequence (lanjutan dari header):
- Hero image: scale 1.08 → 1.0, durasi 1.4s, ease: power3.out
- Overlay text per baris: y: 60px → 0, opacity 0 → 1, stagger 0.1s

Parallax saat scroll (ScrollTrigger):
- .hero-image: yPercent: 0 → -15, scrub: 1.5
- Text overlay: bergerak lebih cepat sedikit dari foto (efek depth)
```

### Foto yang Bisa Di-upload
- Ukuran: `1920 × 840px` WebP, quality 82%
- Path: `public/images/hero/featured.webp`
- Ganti file ini untuk update foto hero tanpa ubah kode

---

## Section 3: Two-Column Grid

### Layout
```
┌─────────────────────────┬─────────────────────────┐
│       MUSIK             │      FILM & ANIME        │
├─────────────────────────┼─────────────────────────┤
│  ┌─────────────────┐    │  ┌─────────────────┐    │
│  │   [COVER 16:9]  │    │  │   [COVER 16:9]  │    │
│  ├─────────────────┤    │  ├─────────────────┤    │
│  │ MUSIK · 12 MEI  │    │  │ FILM · 10 MEI   │    │
│  │ Judul Artikel   │    │  │ Judul Artikel   │    │
│  │ Excerpt...      │    │  │ Excerpt...      │    │
│  └─────────────────┘    │  └─────────────────┘    │
│                          │                          │
│  ┌─────────────────┐    │  ┌─────────────────┐    │
│  │   [COVER 16:9]  │    │  │   [COVER 16:9]  │    │
│  └─────────────────┘    │  └─────────────────┘    │
└──────────────────────────┴─────────────────────────┘
                        1px vertical divider
```

### Komponen: `TwoColumnGrid.jsx`
- 2 artikel Musik (terbaru) di kiri
- 2 artikel Film/Anime (terbaru) di kanan
- Garis vertikal pemisah 1px ink
- Column header: font-mono, uppercase, dengan jumlah artikel

### Article Card Spec
```
border: 1px solid var(--color-ink)
Cover: aspect-ratio 16/9, object-fit cover
Padding dalam card: 16px
Kategori + Tanggal: font-mono 11px
Judul: font-heading weight 300, 20px
Excerpt: font-body 13px, color espresso
Tag: [ MUSIK · 7 MIN READ ] — mono, bg accent-green, warna putih
```

### Animasi
```
GSAP ScrollTrigger (saat section masuk viewport):
- Tiap card: y: 40px → 0, opacity 0 → 1
- Stagger: 0.12s
- Ease: power2.out

Framer Motion hover:
- card: translate(-2px, -2px), box-shadow: 4px 4px 0px ink
- Durasi: 0.1s
```

### Foto Cover Artikel (Cara Upload)
- Path: `public/images/covers/musik/[slug-artikel].webp`
- Path: `public/images/covers/film-anime/[slug-artikel].webp`
- Ukuran: `1600 × 900px` WebP, quality 82%
- Nama file = slug artikel (mis. `analisis-ok-computer.webp`)

---

## Section 4: Notes Stream

### Layout
```
──────────────────────────────────────────────────────  ← border atas
  NOTES TERBARU                         [ 12 tulisan ]
──────────────────────────────────────────────────────
  NOTES  ·  01 MEI 2026      Judul Catatan Belajar   →
──────────────────────────────────────────────────────
  NOTES  ·  28 APR 2026      Judul Catatan Lainnya   →
──────────────────────────────────────────────────────
  NOTES  ·  20 APR 2026      Refleksi Setelah Kuliah  →
──────────────────────────────────────────────────────
  ... dan seterusnya (5 terbaru)
──────────────────────────────────────────────────────  ← border bawah + link "→ LIHAT SEMUA"
```

### Komponen: `NotesStream.jsx`
- 5 artikel Notes terbaru
- Layout: flex row — metadata kiri · judul + arrow kanan
- Counter di pojok kanan header: total semua artikel, increment animation

### Animasi
```
GSAP ScrollTrigger (saat section masuk):
- Tiap baris: x: -24px → 0, opacity 0 → 1
- Stagger: 0.07s
- Ease: power2.out

CSS hover (ultra-cepat):
- background: → var(--color-espresso)
- color: → #FFFFFF
- padding-left/right: 0 → 16px (indent effect)
- Durasi: 0.08s (terasa nyaris instan — disengaja)

Counter increment animation (GSAP):
- textContent: 0 → totalArticles
- duration: 1.5s
- snap: { textContent: 1 } (hanya tampilkan angka bulat)
```

---

## Section 5: Manifesto Closing

### Layout
```
──────────────────────────────────────────────
  (hairline border atas)

  Saya menulis untuk berpikir,
  bukan untuk dilihat.

                          → READ THE MANIFESTO
──────────────────────────────────────────────
```

### Komponen: `ManifestoClosing.jsx`
- Quote/manifesto singkat penulis dalam teks besar tipis
- font-heading, weight 300, font-size clamp(36px, 5vw, 72px)
- CTA link ke `/about`: `→ READ THE MANIFESTO`
- Hairline border atas sebagai pemisah

### Animasi (GSAP + SplitType)
```
SplitType: split per 'lines'
GSAP ScrollTrigger:
- Tiap baris: y: 100% → 0%, opacity 0 → 1
- Clip-path reveal (opsional): inset(100% 0 0 0) → inset(0% 0 0 0)
- Stagger: 0.1s per baris
- Ease: power3.out
```

### Teks Manifesto (Placeholder — ganti dengan milikmu)
> Teks ini bisa diubah langsung di `ManifestoClosing.jsx` atau dari file konfigurasi terpisah.

---

## Section 6: Footer

### Layout
```
┌──────────────────────────────────────────────────────────┐
│  Newsletter:  [ your email address           ] [KIRIM]    │
├──────────────────────────────────────────────────────────┤
│  HyBloggyon · 2026                Twitter  ·  Instagram  │
└──────────────────────────────────────────────────────────┘
```

### Komponen: `Footer.jsx`
- Newsletter form UI (belum fungsional di v1 — hanya UI)
- Copyright: `HyBloggyon · 2026`
- Social links dengan karakter tipografi: `TW ↗  IG ↗  LB ↗`
- Border atas 1px ink

---

## Stack Update: Tailwind + CSS Modules Hybrid

### Strategi Integrasi
Tailwind digunakan **berdampingan** dengan CSS Modules, bukan menggantikannya:

```
CSS Modules           → Komponen yang butuh scoping ketat + animasi state
Tailwind utilities    → Layout spacing, flex/grid, responsive breakpoints
CSS Variables         → Semua design tokens (warna, font, spacing — tetap)
```

### Contoh Pattern (Hybrid)
```jsx
// ✅ Pakai Tailwind untuk layout + spacing
<section className="flex gap-8 py-16 border-t border-[var(--color-ink)]">

  {/* ✅ Pakai CSS Module untuk komponen dengan state/animasi */}
  <article className={`${styles.card} hover:translate-x-[-2px]`}>
    ...
  </article>
</section>
```

### Install Command
```bash
npm install tailwindcss @tailwindcss/vite
```

### Config vite.config.js (setelah install)
```js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    mdx({ ... }),
    react(),
  ],
})
```

### Import di global.css
```css
@import "tailwindcss";

/* design tokens tetap ada di sini */
:root { ... }
```

---

## Design Refinements yang Akan Didalami

> Bagian ini diisi seiring diskusi — ini adalah *living document*.

### Yang Sudah Jelas ✅
- Palet warna: Soft Ash bg + Off-Black ink + Espresso + Wasabi Green accent
- Typography: Satoshi (heading) + Switzer (body) + Space Mono (meta)
- No border-radius, no blur shadows, no gradients (kecuali foto overlay)
- Hard block shadows untuk interactive elements
- Hairline borders sebagai elemen komposisi

### Yang Masih Terbuka untuk Diskusi 🔄
- [ ] **Header behavior saat scroll** — sticky transparan vs tetap di atas?
- [ ] **Hero: portrait vs landscape foto** — sejauh mana foto bisa 9:16 di mobile?
- [ ] **Section header labels** — apakah mau ada label besar "MUSIK" dan "FILM & ANIME" di atas grid, atau cukup di dalam card?
- [ ] **Manifesto text** — apakah mau ada foto penulis kecil di section ini?
- [ ] **Footer newsletter** — langsung integrasi atau placeholder dulu?
- [ ] **Esai section** — apakah Esai panjang juga butuh kolom tersendiri di homepage, atau cukup lewat Hero featured?
- [ ] **Mobile layout** — bagaimana Two-Column Grid di mobile (stack atau swipe/carousel)?
- [ ] **Color scheme** — apakah ada variasi warna musiman/tema atau tetap satu palet?
- [ ] **Cursor custom** — apakah mau cursor dot kecil mengikuti mouse (Premium feel)?

---

## Progress Tracker Homepage

| Section | Komponen | Desain | Animasi | Status |
|---------|----------|--------|---------|--------|
| Header | `Header.jsx` | ✅ | ⬜ Intro seq | 🔄 |
| Hero Banner | `HeroBanner.jsx` | ✅ | ⬜ Parallax | 🔄 |
| Two-Column Grid | `TwoColumnGrid.jsx` | ✅ | ⬜ Stagger | 🔄 |
| Notes Stream | `NotesStream.jsx` | ✅ | ⬜ Stagger + counter | 🔄 |
| Manifesto Closing | `ManifestoClosing.jsx` | ✅ | ⬜ SplitType | 🔄 |
| Footer | `Footer.jsx` | ✅ | — | 🔄 |
| Tailwind Integration | — | ⬜ | — | ⬜ |

---

## Referensi Visual

| Referensi | Apa yang diambil |
|-----------|-----------------|
| [Tight Media](https://en.tight.media) | Grid layout, hairline borders, typography overlay on photo |
| Awwwards SOTD winners | Page transition feel, scroll-driven storytelling |
| NYT Interactive / The Pudding | Scrollytelling narrative structure |
| Le Monde, Monocle Magazine | Typography weight & spacing |
| Letterboxd (UI app) | Hover states, minimal UI dengan karakter kuat |

