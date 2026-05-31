# design-system.md
## HyBloggyon — Design System

**Aesthetic Direction:** Neo-Brutalist Editorial (Tamed Brutalism)  
**Visual Reference:** Tight Media — Independent Print Magazine Layout  
**Animation Stack:** GSAP (ScrollTrigger, ScrollSmoother, SplitText) + Framer Motion

---

## 1. Design Philosophy

Menggabungkan dua hal yang tampak bertentangan:
- **Brutalisme:** Jujur, fungsional, garis tegas, tidak bersembunyi di balik dekorasi
- **Editorial:** Elegan, tipografi presisi, ruang kosong yang diperhitungkan

**Dimensi ketiga yang membedakan HyBloggyon:**
- **Storytelling kinetic** — desain statis Tight Media dihidupkan dengan animasi yang dramatis namun terkontrol. Setiap elemen punya "waktu masuk" sendiri ke dalam frame, seperti halaman majalah yang dicetak satu per satu di depan mata pembaca.

**Anti-pattern yang dihindari:**
- Rounded corners (`border-radius > 0`)
- Gradient background
- Drop shadows yang blur/soft
- Animasi bounce/elastic/spring yang "playful"
- Warna-warna pastel generik
- Loading spinner — gunakan skeleton screen atau instant reveal

---

## 2. Color Palette

```css
:root {
  /* Background */
  --color-bg:           #F4F4F5;   /* Soft Ash — kertas koran berkualitas */
  --color-bg-secondary: #ECECEC;   /* Slightly darker ash */

  /* Text & Borders */
  --color-ink:          #121214;   /* Off-Black — tinta cetak */
  --color-ink-light:    #1A1A1E;   /* Slightly lighter off-black */

  /* Secondary Text */
  --color-espresso:     #2D221E;   /* Deep Espresso — hangat, puitis */
  --color-espresso-mid: #3D312A;   /* Medium espresso */

  /* Accent Colors */
  --color-accent-green:  #7A8A63;  /* Wasabi Green — label Musik & Film */
  --color-accent-warm:   #C87A53;  /* Muted Apricot / Terracotta — hover aktif */

  /* Utility */
  --color-white:        #FFFFFF;
  --color-border:       var(--color-ink);

  /* Overlay (untuk hero & foto) */
  --color-overlay-dark: rgba(18, 18, 20, 0.55);
  --color-overlay-mid:  rgba(18, 18, 20, 0.35);
}
```

### Penggunaan Warna

| Token | Digunakan untuk |
|-------|-----------------|
| `--color-bg` | Background halaman utama |
| `--color-ink` | Teks utama, semua border/garis |
| `--color-espresso` | Sub-judul, background tag gelap, hover rows |
| `--color-accent-green` | Label/tag kategori Musik & Film |
| `--color-accent-warm` | Hover state link aktif, CTA |
| `--color-overlay-dark` | Overlay di atas foto hero |

---

## 3. Typography

### Font Families

```css
:root {
  --font-heading: 'Satoshi', 'Plus Jakarta Sans', sans-serif;
  --font-body:    'Switzer', 'General Sans', sans-serif;
  --font-mono:    'Space Mono', monospace;
}
```

> **Load via Fontshare (gratis):**
> ```html
> <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400&f[]=switzer@400,500&display=swap" rel="stylesheet">
> <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet">
> ```

### Type Scale

```css
/* HEADINGS — Tipis, rapat, dominan */
h1 {
  font-family: var(--font-heading);
  font-weight: 300;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.0;
  letter-spacing: -0.025em;
  color: var(--color-ink);
}

h2 {
  font-family: var(--font-heading);
  font-weight: 300;
  font-size: clamp(24px, 3vw, 40px);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

h3 {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: clamp(18px, 2.5vw, 26px);
  line-height: 1.15;
}

/* BODY — Tipis, kecil, nyaman untuk long-form */
body, p {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-ink);
}

/* METADATA / MICRO-COPY */
.meta, .tag, .category, time {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 11px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-espresso);
}

/* DISPLAY TEXT (untuk SplitText sections) */
.display-text {
  font-family: var(--font-heading);
  font-weight: 300;
  font-size: clamp(48px, 8vw, 112px);
  line-height: 0.95;
  letter-spacing: -0.03em;
}
```

---

## 4. Spacing System

Berbasis kelipatan **8px**:

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;
  --space-11: 192px;

  --container-max:     1200px;
  --container-padding: var(--space-5);
}

@media (min-width: 768px) {
  :root { --container-padding: var(--space-7); }
}
@media (min-width: 1280px) {
  :root { --container-padding: var(--space-8); }
}
```

---

## 5. Component Specs

### 5.1 Borders & Dividers

```css
.divider {
  border: none;
  border-top: 1px solid var(--color-ink);
  margin: 0;
}
.card { border: 1px solid var(--color-ink); }
```

### 5.2 Corners — WAJIB 0

```css
img, button, .card, .banner, .tag, input { border-radius: 0; }
```

### 5.3 Hard Block Shadows

```css
/* Bukan blur shadow — solid offset block */
.interactive-card:hover {
  box-shadow: 4px 4px 0px var(--color-ink);
  transform: translate(-2px, -2px);
  transition: box-shadow 0.1s ease, transform 0.1s ease;
}

.button-primary {
  box-shadow: 3px 3px 0px var(--color-ink);
}
.button-primary:hover {
  box-shadow: 5px 5px 0px var(--color-ink);
  transform: translate(-1px, -1px);
}
```

### 5.4 Article Card

```
┌────────────────────────────────┐  ← border: 1px solid ink
│  [COVER IMAGE — aspect 16:9]   │
├────────────────────────────────┤  ← hairline divider
│  MUSIK  ·  12 MAY 2026         │  ← font-mono, 11px, uppercase
│                                │
│  Judul Artikel Yang Cukup      │  ← font-heading, weight 300
│  Panjang Untuk Ditampilkan     │    font-size: 20px, line-height 1.05
│                                │
│  Excerpt singkat satu baris... │  ← font-body, 13px, color espresso
│                                │
│  [ ESSAY · 7 MIN READ ]        │  ← font-mono, accent-green bg
└────────────────────────────────┘

GSAP entrance: card masuk dari bawah (y: 40px → 0) dengan stagger 0.12s
```

### 5.5 Reading Time Indicator

```css
.reading-time-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-white);
  background-color: var(--color-accent-green);
  padding: 4px 8px;
  border-radius: 0;
  display: inline-block;
}
```



### 5.7 Hero Banner

```css
.hero-banner {
  position: relative;
  width: 100%;
  height: 100vh;          /* full viewport di landing page */
  overflow: hidden;
}
.hero-banner img {
  width: 100%;
  height: 120%;           /* 120% untuk parallax headroom */
  object-fit: cover;
  will-change: transform; /* GSAP parallax target */
}
.hero-overlay-text {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-7);
  max-width: 60%;
  z-index: 2;
}
.hero-overlay-text h1 {
  color: var(--color-white);
  font-size: clamp(32px, 5vw, 60px);
  font-weight: 300;
  line-height: 1.0;
}
```

---

## 6. Animation System

### 6.1 Prinsip Animasi HyBloggyon

> Animasi di HyBloggyon harus terasa seperti **halaman majalah yang hidup** — bukan website yang "lucu-lucuan". Setiap gerakan harus punya tujuan naratif: mengungkapkan, menegaskan, atau mengarahkan perhatian.

**Tiga lapisan animasi:**
1. **Page load sequence** — GSAP Timeline (satu kali, saat pertama buka)
2. **Scroll-driven reveals** — GSAP ScrollTrigger (saat elemen masuk viewport)
3. **Micro-interactions** — Framer Motion (hover, tap, focus states)

**Aturan umum:**
- Tidak ada `ease: "bounce"` atau `ease: "elastic"` di manapun
- Gunakan `ease: "power2.out"` untuk entrance, `ease: "power2.inOut"` untuk transitions
- Durasi entrance: `0.6s – 1.0s`
- Stagger antar elemen: `0.08s – 0.15s`
- ScrollSmoother aktif di desktop, nonaktif di mobile (aksesibilitas)

### 6.2 Dependencies

```bash
npm install gsap @studio-freight/lenis
# GSAP SplitText & ScrollSmoother butuh GSAP Club (atau gunakan versi CDN trial)
# Alternatif SplitText gratis: split-type

npm install framer-motion
npm install split-type  # gratis, alternatif GSAP SplitText
```

> **Catatan GSAP Club:** ScrollSmoother dan SplitText adalah plugin GSAP premium (butuh lisensi). Untuk development/personal use, bisa gunakan CDN trial. Alternatif gratis:
> - **ScrollSmoother** → `@studio-freight/lenis` (smooth scrolling library, open source)
> - **SplitText** → `split-type` (npm, gratis, compatible)

### 6.3 GSAP Setup

```js
// src/utils/gsapSetup.js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, SplitType };
```

```js
// src/utils/smoothScroll.js — Lenis sebagai ScrollSmoother alternatif
import Lenis from '@studio-freight/lenis';

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false, // nonaktif di touch device
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis dengan GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });

  return lenis;
}
```

### 6.4 Page Load Sequence

```js
// src/animations/introSequence.js
// Dipanggil sekali saat App mount

export function runIntroSequence() {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // 1. Navbar hairline border "tumbuh" dari kiri ke kanan
  tl.fromTo('.nav-border-top',
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 0.8 }
  )

  // 2. Logo/nama blog muncul per karakter (SplitType)
  .fromTo('.site-title .char',
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, stagger: 0.04, duration: 0.6 },
    '-=0.4'
  )

  // 3. Nav items fade in dengan stagger
  .fromTo('.nav-item',
    { opacity: 0, y: -8 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 },
    '-=0.3'
  )

  // 4. Hero image scale dari 1.1 ke 1.0
  .fromTo('.hero-image',
    { scale: 1.08 },
    { scale: 1.0, duration: 1.4, ease: 'power3.out' },
    '-=0.6'
  )

  // 5. Hero overlay teks masuk dari bawah
  .fromTo('.hero-overlay-text .line',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
    '-=0.8'
  );

  return tl;
}
```

### 6.5 ScrollTrigger Reveals

```js
// src/animations/scrollReveals.js
// Dipanggil setelah page load sequence selesai

export function initScrollReveals() {

  // --- Article cards: stagger masuk dari bawah ---
  gsap.fromTo('.article-card',
    { y: 48, opacity: 0 },
    {
      y: 0, opacity: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.grid-section',
        start: 'top 80%',
        once: true,
      }
    }
  );

  // --- Notes rows: masuk satu per satu seperti diprint ---
  gsap.fromTo('.notes-row',
    { x: -24, opacity: 0 },
    {
      x: 0, opacity: 1,
      stagger: 0.07,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.notes-section',
        start: 'top 75%',
        once: true,
      }
    }
  );

  // --- Manifesto text: SplitType per baris ---
  const manifestoText = new SplitType('.manifesto-text', { types: 'lines' });
  gsap.fromTo(manifestoText.lines,
    { y: '100%', opacity: 0 },
    {
      y: '0%', opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.manifesto-section',
        start: 'top 70%',
        once: true,
      }
    }
  );

  // --- Hero parallax ---
  gsap.to('.hero-image', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  // --- Section counter (di Notes section) ---
  gsap.from('.article-counter', {
    textContent: 0,
    duration: 1.5,
    ease: 'power2.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: '.notes-section',
      start: 'top 70%',
      once: true,
    }
  });
}
```

### 6.6 Framer Motion (Micro-interactions)

Digunakan untuk komponen React yang butuh interaksi stateful (hover, focus, conditional render):

```jsx
// Contoh: ArticleCard hover dengan Framer Motion
import { motion } from 'framer-motion';

const cardVariants = {
  rest: { boxShadow: '0px 0px 0px var(--color-ink)' },
  hover: {
    boxShadow: '4px 4px 0px var(--color-ink)',
    x: -2, y: -2,
    transition: { duration: 0.1, ease: 'easeOut' }
  }
};

<motion.article
  className={styles.card}
  variants={cardVariants}
  initial="rest"
  whileHover="hover"
>
  {/* card content */}
</motion.article>
```

```jsx
// Contoh: Page transition wrapper
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } }
};

// Di router outlet:
<AnimatePresence mode="wait">
  <motion.div key={location.pathname} variants={pageVariants}
    initial="initial" animate="animate" exit="exit">
    <Outlet />
  </motion.div>
</AnimatePresence>
```

### 6.7 GSAP vs Framer Motion — Kapan Menggunakan Mana?

| Use Case | Library |
|----------|---------|
| Scroll-driven animations (parallax, reveals) | **GSAP ScrollTrigger** |
| Page load sequences, complex timelines | **GSAP** |
| Text animation per karakter/baris | **GSAP + SplitType** |
| Smooth scrolling | **Lenis** |
| Hover states, tap, focus | **Framer Motion** |
| Page transitions (route change) | **Framer Motion AnimatePresence** |
| Conditional mount/unmount animations | **Framer Motion** |

---

## 7. Responsive Breakpoints

```css
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide */ }
```

**Catatan animasi di mobile:**
- ScrollSmoother/Lenis: **dinonaktifkan di touch device** (`smoothTouch: false`)
- SplitType text reveal: tetap aktif tapi stagger dikurangi (`stagger: 0.04`)
- Parallax: dikurangi intensitasnya (`yPercent: -8` bukan `-15`)

---

## 8. Icon & Visual Language

- Tidak menggunakan icon library (Font Awesome, Lucide, dll)
- Gunakan tanda tipografi sebagai elemen visual: `→`, `·`, `—`, `[ ]`, `//`
- Arrow navigasi: karakter `→` bukan SVG icon
- Pembatas kategori: `·` (interpunct)
- Nomor urut: diformat `01.`, `02.`, `03.` (bukan `1`, `2`, `3`)

---

## 9. Tailwind CSS v4 Integration

> **UPDATE v2.0 (Mei 2026):** Project kini menggunakan Tailwind CSS v4 sebagai lapisan utilitas tambahan di atas CSS Modules dan CSS Variables yang sudah ada.

### Strategi Hybrid

```
Tailwind CSS v4  → Layout, spacing, flex/grid, responsive utilities
CSS Modules      → Komponen dengan animasi state, scoped styles
CSS Variables    → Semua design tokens (warna, font, spacing) — TETAP ADA
```

### Mapping Design Tokens → Tailwind Classes

| CSS Variable | Tailwind Class | Contoh Penggunaan |
|-------------|----------------|-------------------|
| `var(--color-ink)` | `text-ink`, `bg-ink`, `border-ink` | `<div className="border border-ink">` |
| `var(--color-bg)` | `bg-background-ash` | `<section className="bg-background-ash">` |
| `var(--color-espresso)` | `bg-espresso`, `text-espresso` | `<div className="bg-espresso text-white">` |
| `var(--color-accent-green)` | `bg-accent-green` | `<span className="bg-accent-green">` |
| `var(--color-accent-warm)` | `bg-accent-warm` | `<span className="bg-accent-warm">` |
| `var(--font-heading)` | `font-heading-display`, `font-h1` | `<h1 className="font-h1">` |
| `var(--font-body)` | `font-body-md` | `<p className="font-body-md">` |
| `var(--font-mono)` | `font-meta-mono` | `<span className="font-meta-mono">` |

### Global Utility Classes (tetap di global.css)

Beberapa class HyBloggyon tidak bisa digantikan Tailwind dan **tetap di `global.css`**:

```css
/* Hard block shadow — signature HyBloggyon */
.block-shadow { box-shadow: 4px 4px 0px #121214; }
.block-shadow-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px #121214;
}

/* Notes row interaction */
.notes-row { transition: all 75ms linear; }
.notes-row:hover {
  background-color: #121214;
  color: #FFFFFF;
  padding-left: 12px;
}

/* Marquee animation */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }


```

### Pattern Hybrid di JSX

```jsx
// ✅ Tailwind untuk layout + spacing
<section className="py-24 px-4 md:px-10 bg-background-ash border-b border-ink">
  <div className="max-w-[1200px] mx-auto">

    {/* ✅ Tailwind + CSS Module untuk komponen dengan state */}
    <article className={`${styles.card} border border-ink overflow-hidden`}>
      ...
    </article>

    {/* ✅ Global utility class untuk interaction */}
    <a className="notes-row py-8 border-b border-ink flex items-center justify-between">
      ...
    </a>

    {/* ✅ Global shadow utility */}
    <div className="p-8 bg-paper-white block-shadow">
      ...
    </div>
  </div>
</section>
```

### Yang TIDAK Boleh Dilakukan dengan Tailwind

- ❌ `rounded-*` — semua radius harus 0
- ❌ `shadow-md`, `shadow-lg` — gunakan `.block-shadow`
- ❌ `bg-gradient-*` — tidak ada gradient di desain
- ❌ `ease-bounce`, `ease-spring` — gunakan GSAP
- ❌ Warna bawaan Tailwind (`blue-500`, `red-400`, dll) — gunakan custom tokens

> Lihat `Docs/tailwind-integration.md` untuk panduan lengkap.
