# 🖼️ Panduan Gambar Konten HyBloggyon

Panduan lengkap tentang **cara menyiapkan, menamai, dan menempatkan gambar** untuk setiap jenis konten di HyBloggyon.

---

## Struktur Folder Gambar

```
public/
└── images/
    ├── covers/          ← Gambar cover untuk setiap artikel/catatan
    │   ├── esai/
    │   ├── notes/
    │   ├── film-anime/
    │   └── musik/
    ├── hero/            ← Gambar besar untuk halaman utama
    ├── about/           ← Gambar untuk halaman About
    ├── og/              ← Open Graph images (untuk share di sosmed)
    └── placeholders/    ← Gambar placeholder (jangan dihapus)
```

---

## 1. Gambar Cover Artikel

Setiap artikel **wajib** memiliki gambar cover. Cover ditampilkan di:
- Kartu artikel di halaman utama & arsip
- Header di halaman baca artikel

### Spesifikasi Cover

| Properti | Nilai yang Disarankan |
|---|---|
| **Format** | `.webp` (disarankan) atau `.jpg` |
| **Ukuran** | 1200 × 630 px (rasio 16:9) |
| **Ukuran file** | Maksimal 300KB (gunakan kompresi) |
| **Nama file** | Sama persis dengan slug artikel |

### Cara Penamaan Cover

> ⚠️ Nama file gambar **harus sama persis** dengan nama file `.mdx`-nya (tanpa ekstensi).

**Contoh:**
- Artikel: `content/esai/tentang-keheningan-sebagai-bahasa.mdx`
- Cover: `public/images/covers/esai/tentang-keheningan-sebagai-bahasa.webp`

---

## 2. Cara Membuat Cover (Beberapa Opsi)

### Opsi A: Canva (Paling Mudah)
1. Buka [canva.com](https://canva.com)
2. Buat desain baru dengan ukuran **1200 × 630 px**
3. Desain sesuka hati — gunakan warna gelap agar sesuai estetika HyBloggyon
4. Download sebagai **JPG** (lalu konversi ke webp jika mau)
5. Letakkan di folder yang sesuai

### Opsi B: Gambar Foto
1. Gunakan foto dari [Unsplash](https://unsplash.com) (gratis, no copyright)
2. Download ukuran **Large** (min. 1200px lebar)
3. Crop ke rasio **16:9** jika perlu
4. Kompres di [squoosh.app](https://squoosh.app) → pilih format WebP

### Opsi C: Generate dengan AI
1. Gunakan tools seperti Midjourney, DALL-E, atau Gemini Image
2. Prompt contoh: *"minimalist dark aesthetic book cover, soft moody lighting, cinematic, 16:9 ratio"*
3. Download dan kompres sebelum diupload

---

## 3. Cara Kompresi Gambar (Wajib!)

Gambar yang tidak dikompresi akan memperlambat website. Selalu kompres sebelum upload.

**Tool yang Disarankan:**
- **[Squoosh](https://squoosh.app)** (online, gratis, terbaik)
  1. Upload gambar
  2. Pilih format `WebP`
  3. Atur kualitas ke **75–85%**
  4. Download

- **[TinyPNG](https://tinypng.com)** (alternatif, juga bagus untuk PNG/JPG)

**Target ukuran file:**
| Jenis | Ukuran Maks |
|---|---|
| Cover artikel | 250–350 KB |
| Hero image | 400–500 KB |
| Gambar dalam artikel | 150–250 KB |

---

## 4. Gambar di Dalam Artikel (Inline)

Untuk gambar yang ada **di dalam isi artikel** (bukan cover):

1. Simpan file di: `public/images/posts/[nama-file.webp]`
2. Panggil di dalam file `.mdx` dengan:

```mdx
![Deskripsi gambar yang informatif](/images/posts/nama-file.webp)
```

> ⚠️ Selalu isi alt text (deskripsi dalam kurung kotak `[]`) — penting untuk aksesibilitas dan SEO.

**Contoh nyata:**
```mdx
![Poster film Perfect Blue karya Satoshi Kon, 1997](/images/posts/perfect-blue-poster.webp)
```

---

## 5. Cek Cepat Sebelum Publish

Gunakan checklist ini setiap kali menambah konten baru:

- [ ] File gambar sudah ada di folder yang benar
- [ ] Nama file gambar sama persis dengan slug artikel (termasuk ekstensi `.webp`)
- [ ] Ukuran file sudah di bawah 350KB
- [ ] Path `coverImage` di frontmatter sudah benar
- [ ] Alt text untuk gambar inline sudah diisi

---

## 6. Referensi Cepat: Semua Path Cover

| Kategori | Path Folder |
|---|---|
| Esai | `public/images/covers/esai/[slug].webp` |
| Notes | `public/images/covers/notes/[slug].webp` |
| Film & Anime | `public/images/covers/film-anime/[slug].webp` |
| Musik | `public/images/covers/musik/[slug].webp` |
