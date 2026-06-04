# 📚 Docs — HyBloggyon Content Kit

Selamat datang di folder dokumentasi HyBloggyon. Di sini kamu akan menemukan semua panduan dan template yang kamu butuhkan untuk mengelola konten blog.

---

## 📁 Isi Folder Ini

| File | Deskripsi |
|---|---|
| `TEMPLATE-ESAI.md` | Template + panduan menulis esai |
| `TEMPLATE-NOTES.md` | Template + panduan menulis catatan (3 tipe) |
| `TEMPLATE-FILM-ANIME.md` | Template + panduan menulis ulasan film & anime |
| `TEMPLATE-MUSIK.md` | Template + panduan menulis analisis musik |
| `PANDUAN-GAMBAR.md` | Panduan lengkap menyiapkan & mengupload gambar cover |

---

## ⚡ Quick Start

**Mau langsung nulis?** Ikuti 5 langkah ini:

### 1. Pilih kategori
| Mau nulis tentang | Buka template |
|---|---|
| Pemikiran panjang / opini / filosofi | `TEMPLATE-ESAI.md` |
| Jurnal / catatan belajar / fragmen pikiran | `TEMPLATE-NOTES.md` |
| Film atau anime | `TEMPLATE-FILM-ANIME.md` |
| Album, lagu, atau esai tentang musik | `TEMPLATE-MUSIK.md` |

### 2. Buat file baru di `src/content/posts/`
```
src/content/posts/slug-judul-tulisanmu.mdx
```

### 3. Copy frontmatter dari template, isi semua field
```yaml
---
title: "Judul Tulisanmu"
subtitle: "Subjudul opsional"
category: "esai"          # esai / notes / film-anime / musik
tags: ["tag1", "tag2"]
date: "2026-07-01"
slug: "slug-judul-tulisanmu"   # SAMA PERSIS dengan nama file
featured: false
excerpt: "Ringkasan satu kalimat."
coverImage: "/images/covers/esai/slug-judul-tulisanmu.webp"
readingTime: 5
pullQuote: "Kutipan pendek dari tulisan."
---
```

### 4. Upload gambar cover
Simpan di: `public/images/covers/[kategori]/[slug].webp`

### 5. Publish
```bash
git add .
git commit -m "Tambah: judul artikel"
git push
```

---

## 🗂️ Lokasi File Penting

```
HyBloggyon/
├── src/content/posts/          ← ✅ SEMUA tulisan aktif di sini
│   ├── tentang-keheningan-sebagai-bahasa.mdx
│   ├── catatan-belajar-mengapa-kita-membaca.mdx
│   ├── fragmen-pikiran-di-bulan-mei.mdx
│   ├── perfect-blue-dan-paranoia-identitas-digital.mdx
│   ├── analisis-album-to-pimp-a-butterfly.mdx
│   ├── mock-1.mdx   (tentang-minimalisme-digital)
│   ├── mock-2.mdx   (membaca-ulang-karya-sastra-lama)
│   ├── mock-3.mdx   (album-terbaik-tahun-ini-sejauh-ini)
│   ├── mock-4.mdx   (review-film-a24-aesthetics)
│   └── mock-5.mdx   (mengapa-kita-masih-menulis-blog)
│
├── public/images/covers/       ← Gambar cover artikel
│   ├── esai/
│   ├── notes/
│   ├── film-anime/
│   └── musik/
│
├── Docs/                       ← 📍 Kamu sedang di sini
│   ├── INDEX.md
│   ├── TEMPLATE-ESAI.md
│   ├── TEMPLATE-NOTES.md
│   ├── TEMPLATE-FILM-ANIME.md
│   ├── TEMPLATE-MUSIK.md
│   └── PANDUAN-GAMBAR.md
│
└── PANDUAN-KONTEN.md           ← Panduan utama workflow sehari-hari
```

---

## 🔗 URL Format

Setelah publish, URL artikel mengikuti:
```
https://[domain]/[category]/[slug]
```

Contoh:
- `/esai/tentang-keheningan-sebagai-bahasa`
- `/notes/fragmen-pikiran-di-bulan-mei`
- `/film-anime/perfect-blue-dan-paranoia-identitas-digital`
- `/musik/analisis-album-to-pimp-a-butterfly`

---

## ✅ Checklist Sebelum Publish

- [ ] File `.mdx` ada di `src/content/posts/`
- [ ] Field `slug` diisi dan sama dengan nama file
- [ ] Field `category` benar (esai / notes / film-anime / musik)
- [ ] Field `date` dalam format `YYYY-MM-DD`
- [ ] `excerpt` sudah diisi (1–2 kalimat)
- [ ] `coverImage` path benar dan filenya sudah ada
- [ ] `pullQuote` diisi (kutipan singkat dari tulisan)
- [ ] `tags` diisi (array, minimal 1 tag)
- [ ] `featured` di-set (`true` / `false`)

---

*Selamat menulis!*
