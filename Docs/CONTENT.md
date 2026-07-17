# Content Guide

How to write, illustrate, and publish posts on HyBloggyon.

All live articles live in **`src/content/posts/`**.  
(The root `content/` folder is legacy/sample only — the app does not load it.)

---

## Workflow

```
Create .mdx in src/content/posts/
        ↓
Fill frontmatter + write body
        ↓
Add cover to public/images/covers/{category}/
        ↓
git add → commit → push
        ↓
Vercel redeploys (~30–60s)
```

---

## Frontmatter

Every post needs YAML frontmatter at the top:

```mdx
---
title: "Judul Artikel"
subtitle: "Subjudul opsional"
category: "esai"
tags: ["tag1", "tag2"]
date: "2026-07-01"
slug: "judul-artikel"
featured: false
excerpt: "Ringkasan satu kalimat untuk kartu dan SEO."
coverImage: "/images/covers/esai/judul-artikel.webp"
readingTime: 5
pullQuote: "Kutipan pendek opsional."
---

Isi tulisan dimulai di sini…
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Display title |
| `subtitle` | No | Shown on article hero when present |
| `category` | Yes | One of: `esai`, `notes`, `musik`, `film-anime` |
| `tags` | Recommended | Used by Notes search/filter |
| `date` | Yes | `YYYY-MM-DD` |
| `slug` | Yes | **Must match filename** (no `.mdx`) |
| `featured` | Yes | `true` for homepage spotlight (keep 1–2 max) |
| `excerpt` | Yes | Card + meta description |
| `coverImage` | Yes | Path under `/images/covers/...` |
| `readingTime` | Yes | Minutes (≈ 200 words / min) |
| `pullQuote` | No | Accent quote on article page |

**URL:** `/{category}/{slug}`  
Example: `/notes/fragmen-pikiran-di-bulan-mei`

---

## Categories

| `category` | Use for |
|---|---|
| `esai` | Long-form essays, philosophy, reflective argument |
| `notes` | Learning logs, fragments, short reflections |
| `musik` | Album analysis, song reviews, music essays |
| `film-anime` | Film/anime analysis and reviews |

---

## Templates

Copy one of these into a new file under `src/content/posts/`.  
Filename = slug, lowercase, hyphenated (e.g. `esai-tentang-kesendirian.mdx`).

### Esai

```mdx
---
title: "Judul Esai"
subtitle: ""
category: "esai"
tags: ["filosofi"]
date: "YYYY-MM-DD"
slug: "slug-judul-esai"
featured: false
excerpt: "Ringkasan 1–2 kalimat yang memancing rasa ingin tahu."
coverImage: "/images/covers/esai/slug-judul-esai.webp"
readingTime: 7
pullQuote: ""
---

Paragraf pembuka — langsung ke inti, bukan "Dalam esai ini…".

## Bagian Pertama

Satu ide per paragraf. Gunakan *miring* dan **tebal** dengan hemat.

> "Kutipan relevan." — Sumber

## Penutup

Boleh berakhir dengan pertanyaan, bukan jawaban rapi.
```

Ideal length: **600–2000 words**.

### Notes — belajar

```mdx
---
title: "Catatan Belajar: Topik"
category: "notes"
tags: ["belajar"]
date: "YYYY-MM-DD"
slug: "catatan-belajar-topik"
featured: false
excerpt: "Satu kalimat tentang apa yang dipelajari."
coverImage: "/images/covers/notes/catatan-belajar-topik.webp"
readingTime: 3
---

Hari ini saya belajar tentang …

## Inti Pelajaran

Tuliskan dengan kata sendiri.

## Yang Masih Perlu Dijelajahi

- Pertanyaan 1
- Pertanyaan 2

## Referensi

- [Judul](https://example.com)
```

### Notes — fragmen

```mdx
---
title: "Fragmen Pikiran: Tema"
category: "notes"
tags: ["fragmen"]
date: "YYYY-MM-DD"
slug: "fragmen-pikiran-tema"
featured: false
excerpt: "Kumpulan fragmen yang terlalu pendek untuk esai."
coverImage: "/images/covers/notes/fragmen-pikiran-tema.webp"
readingTime: 2
---

## 01.

Fragmen pertama.

## 02.

Fragmen kedua — tidak harus berhubungan.
```

### Musik — analisis album

```mdx
---
title: "Analisis Album: Judul — Artis"
category: "musik"
tags: ["album"]
date: "YYYY-MM-DD"
slug: "analisis-album-judul"
featured: false
excerpt: "Satu kalimat tentang mengapa album ini menarik dianalisis."
coverImage: "/images/covers/musik/analisis-album-judul.webp"
readingTime: 8
---

*Judul Album* (Tahun) oleh Artis adalah …

## Konteks Penciptaan

## Tema Utama

## Struktur dan Narasi

## Produksi & Sound

## Lagu yang Paling Berkesan
```

### Film & Anime — analisis

```mdx
---
title: "Judul Film dan Tema yang Dianalisis"
category: "film-anime"
tags: ["film"]
date: "YYYY-MM-DD"
slug: "judul-film-dan-tema"
featured: false
excerpt: "Sudut pandang unik dalam satu kalimat."
coverImage: "/images/covers/film-anime/judul-film-dan-tema.webp"
readingTime: 8
---

*Judul* (Tahun) karya Sutradara/Studio adalah …

## Konteks

Asumsikan pembaca sudah tahu garis besar plot.

## Tema / Elemen Utama

Hindari synopsis panjang — bahas makna, simbol, atau teknik.

## Relevansi Hari Ini

## Kesimpulan
```

---

## Images

### Folder layout

```
public/images/
├── covers/
│   ├── esai/
│   ├── notes/
│   ├── musik/
│   └── film-anime/
├── hero/           # Homepage hero
├── about/          # About portrait
├── og/             # Open Graph (optional)
└── placeholders/
```

### Cover specs

| Property | Recommendation |
|---|---|
| Format | `.webp` (preferred) or `.jpg` |
| Size | 1200 × 630 (16:9) |
| File weight | ≤ ~300 KB |
| Filename | **Exact slug** + extension |

Example:

- Post: `src/content/posts/tentang-keheningan-sebagai-bahasa.mdx`
- Cover: `public/images/covers/esai/tentang-keheningan-sebagai-bahasa.webp`
- Frontmatter: `coverImage: "/images/covers/esai/tentang-keheningan-sebagai-bahasa.webp"`

Compress with [Squoosh](https://squoosh.app) (WebP, quality ~75–85) or [TinyPNG](https://tinypng.com).

### Inline images in MDX

Save to `public/images/posts/` and reference with alt text:

```mdx
![Poster Perfect Blue, Satoshi Kon, 1997](/images/posts/perfect-blue-poster.webp)
```

---

## Publish checklist

- [ ] File in `src/content/posts/{slug}.mdx`
- [ ] `slug` matches filename
- [ ] `category` is valid
- [ ] Cover exists and path matches `coverImage`
- [ ] Image compressed
- [ ] `npm run build` succeeds (optional but recommended)
- [ ] `git push` → wait for Vercel

---

## Tips

- **Esai:** one strong thesis; start mid-thought; concrete examples beat abstraction.
- **Notes:** speed and honesty over polish; dating matters — notes are time capsules.
- **Musik / film:** avoid plot dumps and “bagus karena beat-nya”; argue *why* and *how*.
- Keep at most **1–2** posts with `featured: true` at a time.
