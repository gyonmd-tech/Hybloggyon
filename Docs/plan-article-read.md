# plan-article-read.md
## Spesifikasi Halaman: `/:category/:slug` (ArticleReadPage)

**Tanggal:** Mei 2026 (Revisi 2 — Diselaraskan dengan kondisi aktual)
**Status:** Siap untuk dibangun
**Route:** `/:category/:slug` — contoh: `/esai/tentang-minimalisme-digital`

---

## 1. Tujuan & Narasi Halaman

Halaman ini adalah **ruang baca** — satu-satunya tujuannya adalah membuat pembaca dapat membaca teks panjang dengan nyaman dan fokus, namun tetap dengan estetika Neo-Brutalist Editorial yang konsisten dengan seluruh blog.

**Referensi mental:** Spread artikel utama di majalah cetak berkualitas (Monocle, The Atlantic versi cetak) — tipografi yang dominan, white space yang disengaja, minimal dekorasi tapi setiap elemen bermakna.

**Konsistensi dengan ArchivePage:**
- Warna kategori dari `categoryColors.js` (sudah ada di `src/lib/`) digunakan sebagai aksen identitas artikel.
- Badge `[KATEGORI]` menggunakan pola yang sama: background warna aksen + teks kontras.
- Tidak ada `border-radius`, tidak ada `box-shadow` blur — hanya garis tegas dan hard block shadow jika perlu.

---

## 2. Routing & Integrasi App.jsx

Route baru yang perlu ditambahkan ke `App.jsx`:

```jsx
// Tambahkan import
import ArticleReadPage from './pages/ArticleReadPage';

// Tambahkan route (sebelum route catch-all jika ada)
<Route path="/:category/:slug" element={<ArticleReadPage />} />
```

**Catatan penting:** Route `/:category/:slug` bersifat catch-all, pastikan ia ditempatkan **setelah** semua route spesifik (`/notes`, `/archive`, `/about`, `/hobby`) agar tidak konflik.

---

## 3. Data Loading

Gunakan pola yang sama dengan `ArchivePage.jsx` — `import.meta.glob` eager loading:

```js
// Di ArticleReadPage.jsx
const mdxModules = import.meta.glob('/src/content/posts/*.mdx', { eager: true });

// Cari artikel berdasarkan slug dari URL params
const { slug } = useParams();
const match = Object.values(mdxModules).find(m => m.frontmatter?.slug === slug);
const { frontmatter, default: MDXContent } = match ?? {};
```

**Frontmatter yang wajib ada di setiap MDX:**

```yaml
---
title: "Judul Artikel"
subtitle: "Subjudul opsional — ditampilkan lebih kecil di bawah judul"
category: "esai"           # esai | notes | musik | film-anime
tags: ["teknologi", "desain"]
date: "2026-05-15"
slug: "judul-artikel"
excerpt: "Deskripsi singkat untuk preview di ArchivePage."
featured: false
---
```

---

## 4. Struktur Halaman (Section by Section)

---

### Section 1: `ReadingProgressBar`
**Posisi:** `position: fixed; top: 0; left: 0; z-index: 999`

- Tinggi: `2px` (tipis, tidak mengganggu).
- Warna: menggunakan warna aksen kategori dari `getCategoryColor(category).bg`.
- Lebar berubah secara real-time dari `0%` hingga `100%` sesuai scroll position.
- Kalkulasi: `(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100`.
- Tidak ada label persentase, tidak ada animasi easing — berubah linier sesuai scroll.
- ❌ DILARANG `border-radius`.

---

### Section 2: `ArticleHero`
**Tujuan:** Pembukaan artikel yang tegas sebelum teks dimulai — identitas visual yang kuat.

**Layout:**
- Padding atas: `clamp(80px, 12vh, 120px)`.
- Padding bawah: `clamp(40px, 6vh, 64px)`.
- Padding horizontal: `clamp(24px, 6vw, 80px)` (sama dengan ArchivePage).
- Border bawah: `1px solid var(--color-ink)`.
- Semua konten rata kiri.

**Elemen dari atas ke bawah:**

**1. Badge Kategori:**
- Menggunakan `getCategoryColor(category)` dari `src/lib/categoryColors.js`.
- Style: `backgroundColor: cat.bg; color: cat.text; padding: '4px 10px'; fontFamily: var(--font-mono); fontSize: 11px; letterSpacing: 0.12em; textTransform: uppercase; fontWeight: 600`.
- Pola identik dengan badge `[ARSIP]` di `ArchiveHero`.

**2. Judul Artikel:**
- Font: `Satoshi`, font-weight **300**.
- Ukuran: `clamp(2.5rem, 6vw, 7rem)`.
- Letter-spacing: `-0.04em`.
- Line-height: `1.0`.
- Warna: `var(--color-ink)`.
- Maksimal 3 baris — jika lebih, ukuran menyesuaikan secara otomatis via `clamp`.

**3. Subjudul (opsional, dari `frontmatter.subtitle`):**
- Font: `Switzer`, font-weight 400, `1.15rem`.
- Warna: `var(--color-espresso)`.
- Maksimal 2 baris.
- Margin atas: `1.5rem` dari judul.

**4. Metadata Bar:**
- Satu baris horizontal, semua elemen dalam `Space Mono` 11px uppercase, dipisahkan `·`.
- Konten: `[Tanggal] · [Estimasi Baca] · [Tag 1] · [Tag 2]`.
- Estimasi baca: hitung dari panjang konten string MDX, format `X MENIT BACA`.
- Warna: `var(--color-espresso)`, opacity 0.7.
- Margin atas: `2rem` dari judul/subjudul.

**Animasi:**
- Judul: GSAP on-mount `y: 40 → 0`, `opacity: 0 → 1`, durasi 0.7s, ease `power3.out`.
- Badge + metadata bar: fade in dengan delay 0.3s.

---

### Section 3: `ArticleBody` (Layout Utama)
**Tujuan:** Area baca teks utama — layout dua kolom di desktop, satu kolom di mobile.

**Layout Desktop (`>= 1024px`):**
```
grid-template-columns: 1fr 280px
gap: clamp(40px, 6vw, 80px)
padding: clamp(40px, 6vh, 64px) clamp(24px, 6vw, 80px)
```

**Layout Mobile (`< 1024px`):**
- Satu kolom, sidebar pindah ke bawah konten artikel.

---

### Section 4: `ArticleContent` (Kolom Kiri)
**Tujuan:** Render konten MDX dengan tipografi yang dioptimalkan untuk long-form reading.

**Spesifikasi Typography Utama:**

| Properti | Nilai |
|---|---|
| Font | `Switzer` |
| Ukuran | `1.125rem` (18px) |
| Line-height | `1.85` |
| Max-width | `68ch` (karakter, bukan px — lebih responsif) |
| Warna | `var(--color-ink)` |
| Gap antar paragraf | `1.5em` |

**MDX Custom Components (Override Default):**

**`<h2>`:**
- Font: `Satoshi`, font-weight 300, `2rem`.
- Margin atas: `3em` (besar — memberi napas sebelum section baru).
- Padding atas: `1em`.
- Border atas: `1px solid var(--color-ink)`.
- Letter-spacing: `-0.02em`.

**`<h3>`:**
- Font: `Satoshi`, font-weight 400, `1.4rem`.
- Sebelum teks h3, tambahkan label `Space Mono` kecil (`§ `, `var(--color-espresso)`, opacity 0.7).

**`<blockquote>`:**
- Border kiri: `3px solid` menggunakan warna aksen kategori dari `getCategoryColor`.
- Padding kiri: `1.5em`.
- Font: `Satoshi`, font-weight 300, `1.2rem`.
- ❌ DILARANG italic.
- ❌ DILARANG tanda kutip dekoratif `"` atau `"`.

**`<code>` inline:**
- Background: `var(--color-background-ash)`.
- Font: `Space Mono`, ukuran sedikit lebih kecil (`0.9em`).
- Padding: `2px 5px`.
- ❌ DILARANG `border-radius`.

**`<pre>` code block:**
- Background: `var(--color-ink)`.
- Warna teks: `var(--color-background)`.
- Font: `Space Mono`, `0.9rem`.
- Padding: `1.5em`.
- Overflow: `auto` (scroll horizontal jika perlu).
- ❌ DILARANG `border-radius`.

**`<img>` dalam artikel:**
- Lebar: `100%` dari kolom konten.
- Border: `1px solid var(--color-ink)`.
- Hard shadow: `box-shadow: 4px 4px 0px var(--color-ink)`.
- ❌ DILARANG `border-radius`.
- Caption: teks `alt` ditampilkan di bawah gambar, `Space Mono` 11px, muted.
- Dibungkus dalam `<figure>` + `<figcaption>`.

**`<hr>`:**
- Tidak ada garis — ganti dengan `· · ·` teks.
- Font: `Space Mono`, centered dalam kolom, `var(--color-espresso)`, opacity 0.5.
- Margin: `3em 0`.

**Drop Cap (paragraf pertama):**
- Huruf pertama paragraf pertama artikel mendapatkan drop cap.
- Implementasi: CSS `::first-letter` pseudo-element pada `.article-first-paragraph p:first-child::first-letter`.
- Font: `Satoshi`, ukuran besar (`4em`), font-weight 300, float left, line-height 0.8, margin kanan `0.1em`.

---

### Section 5: `ArticleSidebar` (Kolom Kanan)
**Tujuan:** Metadata dan navigasi in-page yang mengikuti scroll — diskret namun berguna.

**Layout:**
- `position: sticky; top: 80px` — mengikuti pembaca saat scroll.
- Lebar: `280px` (fixed).
- Background: transparan (sama dengan halaman).
- Tidak ada kotak pembungkus atau border — hanya blok-blok konten yang dipisahkan secara visual.

**Blok Sidebar (dari atas ke bawah):**

**Blok 1 — Metadata Artikel:**
- Label: `TENTANG TULISAN INI` — `Space Mono` 10px, `var(--color-espresso)`, opacity 0.7, border bawah `1px solid var(--color-ink)`, padding bawah `8px`, margin bawah `16px`.
- Konten dalam format daftar:
  - Tanggal: format `DD MMM YYYY`
  - Estimasi baca
  - Kategori: badge berwarna menggunakan `getCategoryColor`
  - Tag-tag

**Blok 2 — Table of Contents:**
- Label: `ISI TULISAN` — format sama dengan label blok 1.
- Tampil hanya jika artikel memiliki heading `<h2>`.
- Item: setiap `<h2>` dalam artikel menjadi anchor link.
- State per item:
  - **Default:** `Space Mono` kecil, `var(--color-espresso)`, opacity 0.6.
  - **Aktif (heading di viewport):** warna `var(--color-ink)`, opacity 1, ditambah bar kiri `3px solid [warna aksen kategori]`.
- Transisi state: `color 0.2s ease, opacity 0.2s ease, border-left 0.2s ease`.
- Implementasi active state: `IntersectionObserver` pada semua `<h2>` dalam konten artikel.
- ❌ DILARANG accordion/toggle — TOC harus selalu terlihat penuh.

**Blok 3 — Artikel Terkait:**
- Label: `BACA JUGA` — format sama.
- 2–3 artikel yang berbagi kategori atau tag yang sama.
- Format per item: Judul (`Satoshi`, 300, ukuran kecil) + Tanggal di bawahnya (mono muted).
- Dipisahkan border bawah tipis.
- Hover: judul berubah warna ke aksen kategori, micro-animation `translateX(4px)`.

---

### Section 6: `ArticleFooter`
**Tujuan:** Penutup artikel + navigasi antar artikel.

**Layout:**
- Border atas: `2px solid var(--color-ink)` — lebih tebal dari divider biasa untuk memberi tanda "selesai".
- Padding: `clamp(40px, 6vh, 64px) clamp(24px, 6vw, 80px)`.
- Dua kolom: artikel sebelumnya (kiri) dan artikel berikutnya (kanan).

**Per sisi:**
- Label arah: `← SEBELUMNYA` / `BERIKUTNYA →` — `Space Mono` 10px, `var(--color-espresso)`, opacity 0.6.
- Judul artikel terkait: `Satoshi`, 300, ukuran sedang.
- Metadata singkat (kategori, tanggal) dalam mono kecil.
- Hover state: background seluruh sisi berubah ke `var(--color-background-ash)`, border warna aksen kategori artikel tersebut.

**Tengah (di bawah dua kolom):**
- Tombol kembali ke arsip: `← KEMBALI KE ARSIP`.
- Style: border `1px solid var(--color-ink)`, padding `10px 24px`, `Space Mono`, hover invert warna.

---

## 5. Komponen React yang Perlu Dibuat

| Komponen | File | Deskripsi |
|---|---|---|
| `ArticleReadPage` | `src/pages/ArticleReadPage.jsx` | Page wrapper, data loader, state scroll |
| `ReadingProgressBar` | `src/components/article/ReadingProgressBar.jsx` | Fixed 2px progress bar |
| `ArticleHero` | `src/components/article/ArticleHero.jsx` | Hero dengan judul besar + metadata |
| `ArticleBody` | `src/components/article/ArticleBody.jsx` | Wrapper layout dua kolom |
| `ArticleContent` | `src/components/article/ArticleContent.jsx` | Render MDX + styling tipografi |
| `ArticleSidebar` | `src/components/article/ArticleSidebar.jsx` | Sticky sidebar + TOC + related |
| `TableOfContents` | `src/components/article/TableOfContents.jsx` | TOC dengan active highlight |
| `ArticleFooter` | `src/components/article/ArticleFooter.jsx` | Navigasi prev/next artikel |
| `MDXComponents` | `src/components/article/MDXComponents.jsx` | Override default MDX elements |

---

## 6. State Management di ArticleReadPage.jsx

```jsx
// State yang dibutuhkan di level page
const { category, slug } = useParams();
const [scrollProgress, setScrollProgress] = useState(0);
const [activeHeading, setActiveHeading] = useState(null);
const articleRef = useRef(null);

// Kalkulasi scroll progress
useEffect(() => {
  function handleScroll() {
    const el = articleRef.current;
    if (!el) return;
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 7. Animasi & Interaktivitas

| Elemen | Animasi | Library | Trigger |
|---|---|---|---|
| Judul `ArticleHero` | `y: 40→0`, `opacity: 0→1` | GSAP | On mount |
| Badge + metadata | Fade in delay 0.3s | GSAP | On mount |
| Progress bar | Lebar berubah real-time | Native JS | Scroll event |
| Item TOC highlight | Transisi warna & border kiri | CSS transition | IntersectionObserver |
| Hover artikel terkait | `translateX(4px)` + warna | CSS transition | Hover |
| Hover prev/next | Background fade + border warna | CSS transition | Hover |

---

## 8. Pola CSS yang Digunakan

Karena konten MDX di-render sebagai HTML, styling tipografi body artikel menggunakan **CSS class selector** (bukan inline style) melalui satu class wrapper:

```jsx
// Di ArticleContent.jsx
<div className="article-prose" ref={articleRef}>
  <MDXContent components={mdxComponents} />
</div>
```

```css
/* Di global.css atau ArticleContent.module.css */
.article-prose p { font-family: var(--font-body); font-size: 1.125rem; line-height: 1.85; }
.article-prose p + p { margin-top: 1.5em; }
.article-prose p:first-child::first-letter { ... /* drop cap */ }
```

---

## 9. Anti-Patterns (WAJIB DIHINDARI)

- ❌ **DILARANG** `border-radius` pada SEMUA elemen (img, code, pre, progress bar, blockquote).
- ❌ **DILARANG** `font-weight: 700` atau `900` pada heading artikel.
- ❌ **DILARANG** `font-style: italic` pada blockquote atau elemen apapun.
- ❌ **DILARANG** tanda kutip dekoratif `❝` atau `"` pada blockquote.
- ❌ **DILARANG** animasi pada teks body saat scroll (mengganggu kenyamanan baca).
- ❌ **DILARANG** soft shadow (`box-shadow` dengan blur > 0). Gunakan hard shadow `4px 4px 0px`.
- ❌ **DILARANG** `text-align: center` pada konten artikel.
- ❌ **DILARANG** sidebar yang lebih lebar dari `280px`.
- ❌ **DILARANG** TOC yang menggunakan accordion/toggle — harus selalu terlihat.
- ❌ **DILARANG** progress bar yang memiliki label persentase atau ketebalan > 3px.
- ❌ **DILARANG** warna Tailwind langsung (gunakan `var(--color-*)` selalu).

---

## 10. Checklist Sebelum Menulis Kode

**Setup:**
- [ ] Route `/:category/:slug` sudah ditambahkan ke `App.jsx`?
- [ ] `getCategoryColor` dari `src/lib/categoryColors.js` sudah diimport?
- [ ] `ReadingProgressBar` menggunakan warna dari `getCategoryColor(category).bg`?

**ArticleHero:**
- [ ] Badge kategori menggunakan pola yang sama dengan badge `[ARSIP]` di `ArchiveHero.jsx`?
- [ ] Judul menggunakan `clamp(2.5rem, 6vw, 7rem)` dan font-weight 300?

**ArticleContent:**
- [ ] Class `.article-prose` sudah dibuat dan semua tipografi di-style dari sana?
- [ ] Drop cap menggunakan CSS `::first-letter`, bukan JS?
- [ ] `<blockquote>` menggunakan border kiri berwarna aksen kategori?
- [ ] `<pre>` menggunakan background `var(--color-ink)` dan teks `var(--color-background)`?
- [ ] `<hr>` di-override menjadi `· · ·`?

**ArticleSidebar:**
- [ ] `position: sticky; top: 80px` sudah diset?
- [ ] TOC menggunakan `IntersectionObserver` untuk highlight aktif?
- [ ] Item TOC aktif memiliki bar kiri `3px solid [warna aksen kategori]`?
- [ ] TOC tidak menggunakan accordion?

**ArticleFooter:**
- [ ] Navigasi prev/next tersedia dan mengarah ke artikel yang benar?
- [ ] Tombol kembali ke `/archive` ada di bagian tengah bawah?
