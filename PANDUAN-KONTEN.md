# 📝 Panduan Mengelola & Memperbarui Konten HyBloggyon

Selamat! *Website* Anda sudah berhasil *live* di Vercel. Karena sistem *website* Anda sekarang terhubung langsung ke GitHub (CI/CD), Anda **tidak perlu lagi membuka Vercel** setiap kali ingin menambah artikel baru. Semua perubahan akan otomatis diperbarui.

Berikut adalah siklus kerja (*workflow*) harian Anda sebagai penulis/pengelola blog ini:

---

## 1. Menambahkan Artikel / Esai Baru

Semua tulisan Anda disimpan dalam format `.mdx` (Markdown dengan dukungan React komponen).

1. Buka folder `src/content/posts/` di VS Code.
2. Buat file baru, misalnya `esai-filosofi-waktu.mdx`.
3. Di baris paling atas *file* tersebut, **wajib** tambahkan "Frontmatter" (metadata) dengan format seperti ini:

```mdx
---
title: "Membongkar Filosofi Waktu dalam Sinema Tarkovsky"
date: "2026-06-15"
category: "esai"
author: "HyBloggyon"
tags: ["sinema", "filosofi", "waktu"]
coverImage: "/images/covers/esai/tarkovsky-waktu.webp"
excerpt: "Sebuah observasi tentang bagaimana Tarkovsky memahat waktu menjadi bentuk fisik melalui kameranya."
---

Lalu di bawah garis putus-putus ini, Anda bisa mulai menulis isi esainya di sini secara normal. Anda bisa menggunakan **teks tebal**, *miring*, daftar, atau memanggil komponen khusus jika diperlukan.
```

> [!TIP]
> Kategori yang tersedia secara bawaan adalah: `esai`, `notes`, `film-anime`, dan `musik`.

---

## 2. Mengunggah Gambar Baru

1. Siapkan gambar Anda (sangat disarankan menggunakan format `.webp` atau `.jpg` yang sudah dikompresi agar *website* tetap ringan).
2. Simpan gambar tersebut ke dalam folder `public/images/`.
   - Untuk *cover* artikel, simpan ke `public/images/covers/nama-kategori/`.
   - Untuk gambar di dalam isi artikel, simpan ke `public/images/posts/`.
3. Panggil gambar tersebut di dalam MDX menggunakan sintaks biasa: `![Deskripsi](/images/posts/nama-gambar.webp)`.

---

## 3. Publikasi (Auto-Deploy ke Vercel)

Setelah Anda selesai menulis dan menyimpan (*Save*) tulisan Anda di VS Code, ikuti 3 langkah sakti ini untuk mempublikasikannya ke internet:

Buka **Terminal** di VS Code, lalu jalankan secara berurutan:

```bash
# 1. Masukkan semua perubahan baru ke daftar tunggu
git add .

# 2. Beri catatan tentang apa yang Anda ubah/tambah
git commit -m "Menambahkan esai tentang filosofi waktu"

# 3. Dorong kode ke GitHub (Vercel akan otomatis menangkapnya!)
git push
```

> [!IMPORTANT]  
> Setelah Anda menekan `Enter` pada perintah `git push`, Vercel akan otomatis bekerja di balik layar. Tunggu sekitar **30 - 60 detik**, lalu *refresh* (muat ulang) alamat *website live* Anda. Artikel baru Anda pasti sudah muncul!

---

## 4. Konfigurasi Vercel Tambahan (Jika Diperlukan Nanti)

### Memasukkan / Memperbarui API Key TMDb
Jika poster film di halaman "Hobby" Anda masih kosong atau tidak muncul:
1. Buka [Dashboard Vercel](https://vercel.com) dan pilih proyek HyBloggyon Anda.
2. Pergi ke tab **Settings** (Pengaturan) → menu **Environment Variables**.
3. Ketik `VITE_TMDB_API_KEY` pada kolom **Key**, dan masukkan API Key rahasia Anda pada kolom **Value**.
4. Klik **Save**.
5. Buka tab **Deployments**, klik ikon titik tiga (⋮) pada *deployment* paling atas, lalu pilih **Redeploy**.

---

## Ringkasan Singkat
Setiap hari, yang perlu Anda lakukan hanyalah:
`Tulis Artikel MDX` ➡️ `git add .` ➡️ `git commit -m "Judul"` ➡️ `git push`. 

Selamat menulis!
