# 📝 Panduan Mengelola & Memperbarui Konten HyBloggyon

Selamat! *Website* Anda sudah berhasil *live* di Vercel. Karena sistem *website* Anda sekarang terhubung langsung ke GitHub (CI/CD), Anda **tidak perlu lagi membuka Vercel** setiap kali ingin menambah artikel baru. Semua perubahan akan otomatis diperbarui.

---

## ⚠️ Catatan Penting: Lokasi File Konten

> Semua tulisan yang **aktif dibaca oleh website** disimpan di:
>
> **`src/content/posts/`** ← INI yang digunakan website
>
> Folder `content/` di root project adalah folder referensi/backup, **bukan** yang dibaca website.

---

## 1. Menambahkan Artikel / Esai / Catatan Baru

Semua tulisan disimpan dalam format `.mdx` di folder **`src/content/posts/`**.

### Langkah-langkah:

1. Buka folder `src/content/posts/` di VS Code.
2. Buat file baru, misalnya `esai-tentang-kreativitas.mdx`.
3. Di baris paling atas file, **wajib** tambahkan Frontmatter (metadata) seperti ini:

```mdx
---
title: "Judul Artikel Kamu"
subtitle: "Subjudul opsional"
category: "esai"
tags: ["tag1", "tag2"]
date: "2026-07-01"
slug: "judul-artikel-kamu"
featured: false
excerpt: "Ringkasan satu kalimat yang tampil di kartu artikel."
coverImage: "/images/covers/esai/judul-artikel-kamu.webp"
readingTime: 5
pullQuote: "Kutipan pendek yang mewakili isi tulisan."
---

Isi tulisanmu di sini...
```

> [!IMPORTANT]
> Field `slug` **wajib diisi** dan harus sama persis dengan nama file (tanpa `.mdx`).
> Contoh: file `esai-tentang-kreativitas.mdx` → slug: `"esai-tentang-kreativitas"`

### Kategori yang tersedia:
- `"esai"` — Esai panjang dan reflektif
- `"notes"` — Catatan belajar, fragmen pikiran, jurnal
- `"film-anime"` — Analisis dan ulasan film & anime
- `"musik"` — Analisis album, review lagu

### Template siap pakai:
Lihat folder `Docs/` untuk template lengkap setiap kategori:
- `Docs/TEMPLATE-ESAI.md`
- `Docs/TEMPLATE-NOTES.md`
- `Docs/TEMPLATE-FILM-ANIME.md`
- `Docs/TEMPLATE-MUSIK.md`

---

## 2. Mengunggah Gambar Cover

1. Siapkan gambar (sangat disarankan format `.webp`, ukuran 1200×630px).
2. Simpan ke folder yang sesuai:

| Kategori | Folder tujuan |
|---|---|
| Esai | `public/images/covers/esai/` |
| Notes | `public/images/covers/notes/` |
| Film & Anime | `public/images/covers/film-anime/` |
| Musik | `public/images/covers/musik/` |

3. Nama file gambar **harus sama persis** dengan slug artikel + `.webp`
   - Contoh slug: `esai-tentang-kreativitas`
   - Nama file gambar: `esai-tentang-kreativitas.webp`

> [!TIP]
> Lihat `Docs/PANDUAN-GAMBAR.md` untuk panduan lengkap membuat, mengompresi, dan mengupload gambar.

---

## 3. Publikasi (Auto-Deploy ke Vercel)

Setelah selesai menulis, jalankan 3 perintah ini di Terminal VS Code:

```bash
# 1. Masukkan semua perubahan ke daftar tunggu
git add .

# 2. Beri catatan perubahan
git commit -m "Tambah artikel: judul artikel kamu"

# 3. Push ke GitHub — Vercel otomatis deploy!
git push
```

> [!IMPORTANT]
> Setelah `git push`, tunggu **30–60 detik** lalu refresh website live kamu. Artikel baru pasti sudah muncul!

---

## 4. URL Artikel di Website

Setelah dipublish, URL artikel mengikuti format:

```
https://[domain-kamu]/[category]/[slug]
```

**Contoh:**
- `https://hybloggyon.vercel.app/esai/tentang-keheningan-sebagai-bahasa`
- `https://hybloggyon.vercel.app/notes/fragmen-pikiran-di-bulan-mei`
- `https://hybloggyon.vercel.app/musik/analisis-album-to-pimp-a-butterfly`

---

## 5. Ringkasan Workflow Harian

```
Buat file .mdx baru di src/content/posts/
        ↓
Isi frontmatter + konten tulisan
        ↓
Simpan gambar cover di public/images/covers/[kategori]/
        ↓
git add . → git commit -m "..." → git push
        ↓
Tunggu 30-60 detik → Artikel live! 🎉
```

---

## 6. Konfigurasi Vercel (Jika Diperlukan)

### Memperbarui API Key TMDb
Jika poster film di halaman "Hobby" tidak muncul:
1. Buka [Dashboard Vercel](https://vercel.com) → pilih proyek HyBloggyon.
2. Pergi ke **Settings** → **Environment Variables**.
3. Tambahkan `VITE_TMDB_API_KEY` dengan nilai API Key kamu.
4. Klik **Save** → **Redeploy**.

---

*Selamat menulis! Untuk panduan lebih lengkap, lihat folder `Docs/` di root project.*
