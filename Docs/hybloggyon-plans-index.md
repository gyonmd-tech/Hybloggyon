# hybloggyon-plans-index.md
## Indeks Dokumen Plan HyBloggyon

**Terakhir Diperbarui:** Mei 2026 (v2 — semua plan sudah direvisi)
**Tujuan:** Peta navigasi semua dokumen plan halaman yang tersedia untuk proyek HyBloggyon.

---

## Daftar Dokumen Plan

| File | Halaman | Route | Versi | Status Build |
|---|---|---|---|---|
| `plan-archive.md` | ArchivePage | `/archive` | v2 — Total Redesign | ❌ Belum Dibangun |
| `plan-about.md` | AboutPage | `/about` | v1 | ❌ Belum Dibangun |
| `plan-hobby.md` | HobbyPage | `/hobby` | v2 — Total Redesign | ❌ Belum Dibangun |
| `plan-article-read.md` | ArticleReadPage | `/:category/:slug` | v1 | ❌ Belum Dibangun |

---

## Ringkasan Singkat Per Halaman

### `/archive` — ArchivePage (v2)
Halaman arsip paling kompleks di seluruh blog. Konsep: **File Explorer Editorial**.

Section yang ada:
- `ArchiveHero` — pembuka editorial dengan metadata di kanan
- `ArchiveStats` — 4 angka besar dengan count-up animation per kategori
- `ArchiveExplorer` — **inti halaman**: dua panel (lemari folder kiri 30% + file panel kanan 70%), view toggle list/grid, sort per tanggal
- `CommandPalette` — overlay global `Ctrl+K`/`Cmd+K` dengan keyboard navigation, filter chip, pintasan, React Portal
- `ArchiveTimeline` — arsip dikelompokkan per tahun dengan angka tahun besar sebagai watermark tipografis
- `ArchiveGallery` — moodboard tipografis di atas background `var(--color-ink)` gelap, tile kutipan artikel
- `ArchiveFooter` — penutup minimal

Konstanta bersama yang wajib dibuat: `categoryColors.js`

---

### `/about` — AboutPage (v1)
Manifesto naratif penulis — bukan halaman bio konvensional. Estetika: **tipografi dominan, intim, kontemplatif**.

Section yang ada:
- `AboutOpener` — kalimat pembuka besar, SplitType per kata, 100vh
- `AboutPortrait` — foto penulis editorial (hard shadow, no border-radius) + metadata kiri-kanan
- `AboutManifesto` — teks panjang dengan drop cap, max-width 680px, background ash
- `AboutBeliefs` — daftar prinsip numbered, dua kolom asimetris
- `AboutConnect` — penutup + info kontak minimalis

Sumber data: file statis `content/about-data.js`

---

### `/hobby` — HobbyPage (v2)
Ruang identitas melalui selera — musik, film, buku, observasi. Konsep: **zine personal**.

Section yang ada:
- `HobbyHero` — "Typographic Fog": full 100vh, dua baris teks besar yang menggantung/ambigu, SplitType per karakter
- `RecordCrate` — horizontal scroll kartu sleeve kaset, background per kartu berdasarkan mood/genre (mapping `moodColorMap`)
- `ScreeningRoom` — featured film (banner TMDb landscape + teks editorial) + grid film lainnya
- `ReadingShelf` — daftar vertikal buku dengan cover dari Google Books API / Open Library, fallback tipografis
- `SideGlances` — "Torn Pages": grid observasi dengan ukuran teks dinamis berdasarkan panjang teks (`getObservationSize()`)
- `HobbyFooter` — penutup minimal dengan tanggal update

Sumber data: `content/hobby-data.js` (musik, film, buku, observasi)
API yang digunakan: TMDb (film backdrop), Google Books + Open Library (cover buku)

---

### `/:category/:slug` — ArticleReadPage (v1)
Halaman baca esai long-form. Estetika: **majalah cetak berkualitas**.

Section yang ada:
- `ArticleHero` — judul besar SplitType + metadata bar (tanggal, estimasi baca, tag)
- `ArticleBody` — layout dua kolom: konten utama (max 680px) + sidebar sticky 280px
- `ArticleSidebar` — metadata + Table of Contents dengan IntersectionObserver active highlight + artikel terkait
- `ReadingProgressBar` — fixed 2px di atas, warna `--color-accent-warm`
- `ArticleFooter` — navigasi prev/next artikel
- `MDXComponents` — override semua elemen MDX: h2, h3, blockquote (border kiri, no italic), code, pre, img (hard shadow), hr (· · ·), drop cap paragraf pertama

---

## Konstanta Bersama (Shared Constants)

File-file ini perlu dibuat dan di-import dari semua halaman yang relevan:

| File | Digunakan oleh | Isi |
|---|---|---|
| `content/categoryColors.js` | ArchivePage, semua halaman | Mapping kategori → warna background + teks |
| `content/about-data.js` | AboutPage | Semua konten statis halaman About |
| `content/hobby-data.js` | HobbyPage | Data musik, film, buku, observasi |
| `lib/moodColorMap.js` | HobbyPage → RecordCrate | Mapping mood → warna kartu musik |

---

## Aturan Desain Universal

Setiap AI agent yang membangun halaman manapun **wajib** mematuhi aturan ini:

### ✅ Yang HARUS Ada
- `border-radius: 0px` pada **semua** elemen tanpa kecuali
- Hard block shadow: `box-shadow: Xpx Xpx 0px var(--color-ink)` (atau warna sesuai konteks)
- Warna dari CSS variables: `var(--color-ink)`, `var(--color-background)`, `var(--color-background-ash)`, `var(--color-espresso)`, `var(--color-accent-green)`, `var(--color-accent-warm)`
- Font heading: `Satoshi`, font-weight **300 atau 400**
- Font body: `Switzer`
- Font metadata/kecil/label: `Space Mono`
- Hairline borders: `1px solid var(--color-ink)` sebagai elemen komposisi

### ❌ Yang DILARANG KERAS
- `border-radius` dengan nilai apapun selain `0`
- Soft shadow (`box-shadow` dengan blur > 0)
- Warna Tailwind langsung (`orange-600`, `blue-500`, dll)
- `font-weight: 700` atau `900` pada heading
- Animasi bounce, elastic, atau overshoot
- Elemen dekoratif (lingkaran, shape organik, background texture)

---

## Urutan Build yang Direkomendasikan

Berdasarkan kompleksitas dan dependensi antar halaman:

1. **`/:category/:slug`** (ArticleReadPage) — dibangun pertama karena semua halaman lain akan link ke sini
2. **`/archive`** (ArchivePage) — paling kompleks, tapi tidak bergantung pada halaman lain
3. **`/about`** (AboutPage) — paling sederhana dari sisi data, murni statis
4. **`/hobby`** (HobbyPage) — kompleks karena API integration (TMDb + Google Books)

---

## Workflow Sebelum Memulai Build

1. Baca dokumen plan yang relevan secara penuh
2. Baca `global.css` — catat semua `var(--color-*)`
3. Baca `App.jsx` — pahami routing yang sudah ada
4. Baca salah satu komponen selesai sebagai referensi pola kode
5. Buat shared constants terlebih dahulu (`categoryColors.js`, dll)
6. Bangun section per section, bukan seluruh halaman sekaligus
7. Cek checklist anti-pattern di masing-masing plan sebelum selesai
