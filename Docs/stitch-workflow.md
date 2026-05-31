# stitch-workflow.md
## HyBloggyon — Stitch HTML → React Conversion Workflow

**Versi:** 1.0  
**Last Updated:** Mei 2026

---

## Apa itu Stitch?

Stitch adalah tool desain UI yang menghasilkan **HTML statis** (dengan Tailwind CSS) dari design mockup. Di project HyBloggyon, setiap halaman didesain di Stitch terlebih dahulu, kemudian dikonversi ke React component oleh AI assistant.

---

## Struktur File Stitch

```
stitch/
├── [nama-halaman]/
│   ├── code.html     ← Output HTML dari Stitch (wajib ada)
│   ├── screen.png    ← Screenshot tampilan (referensi visual)
│   └── DESIGN.md     ← Ringkasan design spec (opsional tapi disarankan)
```

**Konvensi penamaan folder:**
- `homepage/` — halaman utama (`/`)
- `about/` — halaman about (`/about`)
- `archive/` — halaman archive (`/archive`)
- `notes/` — halaman notes (`/notes`)
- `article/` — halaman artikel (`/:category/:slug`)

---

## Workflow Step-by-Step

### Step 1: User Memberikan Stitch Files

User menempatkan atau memberikan:
- `stitch/[halaman]/code.html` — HTML output Stitch
- `stitch/[halaman]/screen.png` — Screenshot untuk visual reference

### Step 2: Analisis HTML Structure

Baca `code.html` dan identifikasi:
1. **Section boundaries** — tiap `<section>` atau blok utama = satu komponen React
2. **Tailwind classes** — catat semua custom classes dan config
3. **Inline scripts** — JavaScript behavior yang perlu dipindah ke React hooks/GSAP
4. **External images** — URL gambar Google/placeholder yang perlu diganti
5. **Interactive elements** — hover states, scroll effects, dll

### Step 3: Buat Komponen React

Pecah HTML menjadi komponen sesuai struktur `/src/components/`:

```
Halaman Homepage  → src/components/home/
Halaman About     → src/components/about/
Halaman Archive   → src/components/archive/
Halaman Notes     → src/components/notes/
Halaman Article   → src/components/article/
Shared elements   → src/components/ui/
Header & Footer   → src/components/layout/
```

### Step 4: Konversi HTML → JSX

**Perbedaan HTML vs JSX yang harus diperhatikan:**

| HTML | JSX | Catatan |
|------|-----|---------|
| `class="..."` | `className="..."` | Selalu |
| `for="..."` | `htmlFor="..."` | Pada label |
| `<img ...>` | `<img ... />` | Self-closing |
| `style="color:red"` | `style={{ color: 'red' }}` | Object syntax |
| `onclick="fn()"` | `onClick={fn}` | camelCase |
| `<!-- comment -->` | `{/* comment */}` | JSX comments |

**Template dasar komponen:**
```jsx
// src/components/home/SectionName.jsx

export default function SectionName() {
  return (
    <section className="[tailwind classes dari Stitch]">
      {/* konten dari Stitch HTML */}
    </section>
  );
}
```

### Step 5: Pindahkan JavaScript ke React

JavaScript inline di Stitch HTML harus dipindah ke React hooks:

```js
// Stitch HTML — inline script
window.addEventListener('scroll', () => {
  const progress = -containerTop / (containerHeight - windowHeight);
  scrollWrapper.style.transform = `translateX(${-progress * maxScroll}px)`;
});
```

```jsx
// React — useEffect + GSAP
import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapSetup';

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    // GSAP ScrollTrigger sebagai pengganti manual scroll listener
    const trigger = gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true,
      },
    });

    return () => trigger.kill(); // cleanup!
  }, []);

  return (
    <section ref={containerRef} className="horizontal-scroll-container">
      <div ref={wrapperRef} id="scroll-wrapper" className="horizontal-scroll-wrapper">
        {/* content */}
      </div>
    </section>
  );
}
```

### Step 6: Ganti Gambar Placeholder

Gambar dari Stitch biasanya menggunakan URL Google/placeholder. Ganti dengan:
- Path lokal: `/images/covers/[kategori]/[slug].webp`
- Atau sementara pakai placeholder SVG lokal dari `/images/placeholders/`

```jsx
// ❌ Stitch placeholder
<img src="https://lh3.googleusercontent.com/aida/..." />

// ✅ Path lokal
<img
  src="/images/hero/featured.webp"
  alt="Deskripsi gambar"
  width={1920}
  height={840}
  loading="eager"
/>
```

### Step 7: Tambahkan Animasi GSAP

Setelah struktur dasar selesai, tambahkan animasi:

```jsx
// Animasi scroll reveal standar HyBloggyon
useEffect(() => {
  const elements = gsap.utils.toArray('.animate-in');
  
  elements.forEach((el) => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);
```

### Step 8: Tambahkan ke Page & App.jsx

```jsx
// src/pages/HomePage.jsx
import HeroBanner from '../components/home/HeroBanner';
import MarqueeTicker from '../components/home/MarqueeTicker';
// ... semua komponen

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>HyBloggyon // Architectural Precision</title>
      </Helmet>
      <HeroBanner />
      <MarqueeTicker />
      {/* ... */}
    </>
  );
}
```

```jsx
// src/App.jsx — tambahkan import page
import HomePage from './pages/HomePage';

<Route path="/" element={<HomePage />} />
```

### Step 9: Visual Check

1. Buka browser di `http://localhost:5173`
2. Bandingkan dengan `stitch/[halaman]/screen.png`
3. Check di breakpoint mobile (375px) dan desktop (1280px)
4. Pastikan semua animasi berjalan smooth

---

## Checklist Konversi

- [ ] Semua `class` → `className`
- [ ] Semua self-closing tags tutup dengan `/>` (`<img />`, `<br />`, `<hr />`)
- [ ] JavaScript inline dipindah ke `useEffect` atau GSAP
- [ ] Gambar placeholder diganti atau ada fallback
- [ ] Animasi Stitch (CSS) dikonversi ke GSAP + Framer Motion
- [ ] Section dibagi jadi komponen terpisah
- [ ] Komponen di-import di page yang sesuai
- [ ] Page di-import di `App.jsx`
- [ ] Visual check vs `screen.png`
- [ ] Responsive check (mobile + desktop)

---

## Aturan Khusus Konversi

### Hard Block Shadow

Stitch menggunakan CSS class `.block-shadow` — **sudah ada di `global.css`**, tidak perlu dibuat ulang.

```jsx
// ✅ Langsung pakai
<div className="border border-[#121214] p-8 block-shadow">
```



---

## Troubleshooting Umum

| Masalah | Solusi |
|---------|--------|
| Tailwind class tidak bekerja | Cek apakah `@import "tailwindcss"` ada di `global.css` |
| Custom color `bg-ink` tidak dikenali | Pastikan `@theme` sudah dikonfigurasi di `global.css` |
| Animasi scroll tidak berjalan | Pastikan GSAP import dari `utils/gsapSetup.js`, bukan langsung dari `gsap` |
| Gambar tidak muncul | Cek path — harus dimulai dari `/images/...` (relatif ke `public/`) |
| ScrollTrigger memory leak | Pastikan `return () => ScrollTrigger.getAll().forEach(t => t.kill())` di cleanup |
| Font tidak muncul | Cek apakah Google Fonts link ada di `index.html` |

---

## Referensi

- `Docs/architecture.md` — struktur folder lengkap
- `Docs/design-system.md` — design tokens dan visual rules
- `Docs/tailwind-integration.md` — panduan Tailwind v4
- `Docs/claude.md` — rules untuk AI assistant
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Framer Motion Docs](https://www.framer.com/motion/)
