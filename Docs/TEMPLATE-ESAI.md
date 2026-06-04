# 📄 Template: ESAI

> Gunakan template ini setiap kali membuat tulisan esai baru.
> Salin seluruh blok di bawah ini ke file `.mdx` baru di dalam folder `content/esai/`.

---

## Cara Pakai

1. Buat file baru: `content/esai/[slug-judul-esaimu].mdx`
2. Nama file menggunakan **huruf kecil semua**, kata dipisah **tanda hubung** (`-`), tanpa spasi.
   - Contoh: `esai-tentang-kesendirian.mdx`
3. Salin template di bawah ini, lalu isi setiap field.
4. Simpan gambar cover di: `public/images/covers/esai/[slug-judul-esaimu].webp`

---

## Template Frontmatter + Isi

```mdx
---
title: "Judul Esai Kamu di Sini"
date: "YYYY-MM-DD"
category: "esai"
excerpt: "Satu atau dua kalimat ringkasan isi esai. Ini yang tampil di kartu artikel di halaman utama. Buat menarik dan memancing rasa ingin tahu."
coverImage: "/images/covers/esai/slug-judul-esaimu.webp"
readingTime: 7
featured: false
---

Paragraf pembuka esaimu di sini. Mulailah dengan kalimat yang langsung menghantam — sebuah pertanyaan, paradoks, atau observasi yang membuat pembaca tidak bisa berhenti membaca.

## Subjudul Bagian Pertama

Isi bagian pertama. Gunakan paragraf yang tidak terlalu panjang. Satu ide per paragraf adalah aturan emas dalam penulisan esai.

> "Kutipan yang relevan bisa diletakkan seperti ini." — Sumber

Kamu juga bisa menggunakan *teks miring* untuk penekanan halus, atau **teks tebal** untuk penekanan kuat.

## Subjudul Bagian Kedua

Lanjutkan argumen atau observasimu. Esai yang baik memiliki alur — pembaca harus merasa sedang dalam sebuah perjalanan pikiran, bukan sekadar membaca daftar fakta.

### Sub-bagian (Opsional)

Gunakan heading level 3 (`###`) jika sebuah bagian perlu dipecah lagi. Tapi jangan terlalu sering — terlalu banyak heading membuat esai terasa seperti laporan.

## Penutup

Bagian penutup tidak harus berupa kesimpulan yang rapi. Esai yang terbaik sering berakhir dengan pertanyaan baru, bukan jawaban. Biarkan pembaca pergi dengan sesuatu untuk dipikirkan.

---

*Kalimat penutup opsional dalam format miring. Biasanya berupa satu kalimat yang mempertegas keseluruhan tema esai.*
```

---

## Panduan Field Frontmatter

| Field | Wajib? | Keterangan |
|---|---|---|
| `title` | ✅ Ya | Judul lengkap esai. Bisa menggunakan huruf kapital normal. |
| `date` | ✅ Ya | Tanggal publikasi, format `YYYY-MM-DD`. Misal: `2026-07-01`. |
| `category` | ✅ Ya | Harus selalu `"esai"` untuk folder ini. |
| `excerpt` | ✅ Ya | Ringkasan 1–2 kalimat. Tampil di kartu & meta SEO. |
| `coverImage` | ✅ Ya | Path gambar cover. Ikuti format: `/images/covers/esai/[slug].webp` |
| `readingTime` | ✅ Ya | Perkiraan waktu baca dalam menit. (Estimasi: 200 kata ≈ 1 menit) |
| `featured` | ✅ Ya | `true` jika ingin esai ini tampil di posisi unggulan di homepage. Maksimal 1–2 konten `featured: true` sekaligus. |

---

## Tips Menulis Esai yang Kuat

- **Mulai dari tengah.** Jangan mulai dengan "Dalam esai ini saya akan membahas..." — langsung saja ke inti.
- **Satu argumen utama.** Esai terbaik memiliki satu *thesis* yang kuat, bukan sepuluh poin yang lemah.
- **Gunakan contoh konkret.** Abstraksi tanpa contoh membuat pembaca tersesat.
- **Baca ulang dengan suara keras.** Jika kamu tersandung saat membacanya, kalimat itu perlu direvisi.
- **Panjang ideal:** 600–2000 kata untuk esai HyBloggyon.
