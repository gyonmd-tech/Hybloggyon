# 🎬 Template: FILM & ANIME

> Gunakan template ini untuk menulis ulasan, analisis, atau esai tentang film dan anime.
> Salin template yang sesuai ke file `.mdx` baru di dalam folder `content/film-anime/`.

---

## Cara Pakai

1. Buat file baru: `content/film-anime/[slug-judul-film].mdx`
2. Nama file menggunakan **huruf kecil semua**, kata dipisah **tanda hubung** (`-`), tanpa spasi.
   - Contoh: `spirited-away-dan-dunia-yang-hilang.mdx`
3. Salin template yang sesuai di bawah ini.
4. Simpan gambar cover di: `public/images/covers/film-anime/[slug-judul-film].webp`

---

## Tipe Tulisan Film & Anime

| Tipe | Cocok untuk | Panjang |
|---|---|---|
| **Analisis** | Membedah tema, simbolisme, atau teknik sinematik secara mendalam | 600–1500 kata |
| **Ulasan** | Kesan menyeluruh tentang sebuah film/serial — lebih personal, less academic | 400–800 kata |
| **Esai Tematik** | Menghubungkan film/anime dengan isu sosial, filosofi, atau fenomena budaya | 700–2000 kata |

---

## Template A: Analisis Film / Anime

```mdx
---
title: "[Judul Film/Anime] dan [Tema Utama yang Dianalisis]"
date: "YYYY-MM-DD"
category: "film-anime"
excerpt: "Satu kalimat yang menangkap sudut pandang unikmu tentang film/anime ini. Buat penasaran."
coverImage: "/images/covers/film-anime/slug-judul-film.webp"
readingTime: 8
featured: false
---

*[Judul Film/Anime]* ([Tahun]) karya [Sutradara/Studio] adalah [satu kalimat pembuka yang langsung menangkap esensi atau keunikan karya ini].

## Konteks

Sedikit latar belakang: [kapan dibuat, siapa sutradaranya, kenapa karya ini penting/relevan untuk dibahas sekarang].

Kamu tidak perlu merangkum plot secara panjang-panjang. Asumsikan pembaca sudah menonton atau setidaknya tahu garis besarnya.

## [Tema/Elemen Utama yang Dianalisis]

Masuk langsung ke inti analisis. Apa yang paling menarik perhatianmu? Bisa berupa:
- Tema utama film
- Teknik visual yang berulang
- Karakter arc yang menarik
- Penggunaan simbolisme
- Dialog atau adegan kunci

> Sertakan kutipan dialog atau deskripsi adegan spesifik untuk mendukung argumenmu.

## [Tema/Elemen Kedua]

Lanjutkan analisis dengan dimensi kedua. Hubungkan dengan elemen pertama jika memungkinkan.

**[Bold untuk nama konsep penting]** yang digunakan di sini adalah [penjelasan].

## Relevansi dengan Konteks Hari Ini

Mengapa film/anime ini masih (atau justru semakin) relevan? Hubungkan dengan sesuatu yang nyata — fenomena sosial, pengalaman pribadi, atau pertanyaan universal.

## Kesimpulan

Bukan ringkasan, tapi sebuah posisi: apa yang kamu yakini setelah menganalisis karya ini?

---

*Kalimat penutup — biasanya sebuah twist pemikiran atau pertanyaan yang tersisa.*
```

---

## Template B: Ulasan Personal

```mdx
---
title: "Ulasan: [Judul Film/Anime]"
date: "YYYY-MM-DD"
category: "film-anime"
excerpt: "Kesan personalmu tentang karya ini dalam satu kalimat — jujur dan tanpa basa-basi."
coverImage: "/images/covers/film-anime/slug-judul-film.webp"
readingTime: 5
featured: false
---

[Paragraf pembuka yang jujur — bagaimana kamu pertama kali menemukan karya ini, dan apa ekspektasimu sebelum menonton.]

## Yang Membuatku Tidak Bisa Berhenti Menonton

Bagian terkuat dari karya ini, dari sudut pandangmu. Spesifik — hindari "bagus" atau "keren" tanpa penjelasan.

## Yang Mengganjal

Tidak ada karya yang sempurna. Apa yang kurang? Bisa berupa plot hole, pacing yang lambat, atau karakter yang tidak berkembang. Kritik yang jujur membuat ulasanmu lebih dipercaya.

## Momen Paling Berkesan

Satu atau dua adegan yang paling membekas — dan mengapa.

> [Kutipan dialog favorit jika ada]

## Verdict

Rekomendasimu: untuk siapa karya ini cocok? Tidak cocok untuk siapa?

---

*Satu kalimat terakhir yang menyimpulkan perasaanmu tentang karya ini.*
```

---

## Panduan Field Frontmatter

| Field | Wajib? | Keterangan |
|---|---|---|
| `title` | ✅ Ya | Judul tulisan. Bisa nama film langsung atau frasa analitik. |
| `date` | ✅ Ya | Tanggal penulisan, format `YYYY-MM-DD`. |
| `category` | ✅ Ya | Harus selalu `"film-anime"` untuk folder ini. |
| `excerpt` | ✅ Ya | Ringkasan 1–2 kalimat. Ini yang tampil di kartu. |
| `coverImage` | ✅ Ya | Path: `/images/covers/film-anime/[slug].webp` |
| `readingTime` | ✅ Ya | Estimasi waktu baca dalam menit. |
| `featured` | ✅ Ya | `true` jika ingin ditampilkan di posisi unggulan. |

---

## Tips Menulis Film & Anime

- **Hindari merangkum plot.** Pembaca bisa baca Wikipedia untuk synopsis. Tulis tentang *makna*, bukan *cerita*.
- **Bawa perspektif yang tidak mainstream.** Yang membuat tulisanmu berharga adalah sudut pandang unikmu.
- **Gunakan adegan spesifik** sebagai bukti, bukan generalisasi.
- **Boleh subjektif.** Ini bukan review akademis — suaramu adalah asetmu.
- **Spoiler?** Boleh — tapi beri peringatan di awal jika analisisnya sangat bergantung pada plot twist.
