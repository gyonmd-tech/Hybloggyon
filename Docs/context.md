# context.md
## HyBloggyon — Project Context

---

## Apa Ini?

**HyBloggyon** adalah blog personal statis untuk satu penulis — sebuah "rumah digital" mandiri yang bebas dari algoritma media sosial. Tempat menulis esai panjang, catatan belajar, dan analisis pop-culture (musik, film, anime) dari sudut pandang filosofis dan puitis.

Nama **HyBloggyon** mencerminkan dualitas proyek ini: _hybrid_ antara blog konvensional dan galeri digital — antara jurnal intim dan manifesto publik.

---

## Mengapa Dibuat?

Media sosial memotong pikiran panjang menjadi konten pendek. HyBloggyon adalah perlawanan terhadap itu. Sebuah ruang kontemplatif yang tidak dikejar metrik engagement — hanya tulisan jujur yang dibiarkan bernapas panjang.

---

## Siapa yang Membacanya?

Gen Z (18–26 tahun) yang:
- Suka membaca panjang dan tidak terburu-buru
- Tertarik pada filsafat, sastra, dan seni
- Menghargai estetika visual yang intentional dan tidak generik
- Aktif di komunitas: Letterboxd, Last.fm, Goodreads, Twitter/X

---

## Vibe & Estetika

**Kata kunci:** intelektual, puitis, jujur, tenang, kontemplatif, modis, storytelling  
**Aesthetic direction:** Neo-Brutalist Editorial (Tamed Brutalism)  
**Primary visual reference:** [Tight Media](https://en.tight.media) — layout majalah independen cetak

### Apa yang diambil dari Tight Media:
- Layout grid bergaya koran/majalah independen cetak
- **Hairline borders** (garis 1px hitam tegas) sebagai pemisah elemen
- **Typography overlay** — judul besar langsung menumpuk di atas foto
- **Tipografi tipis dan rapat** — font-weight 300, line-height ≤ 1.1 untuk heading
- Visual banner estetis yang mendominasi layar
- Penggunaan huruf kapital untuk label/navigasi kecil (monospace)

### Yang membedakan HyBloggyon dari referensi:
- **Landing page storytelling yang kompleks** — bukan sekadar feed artikel, tapi sebuah pengalaman naratif yang terungkap saat di-scroll
- **Animasi GSAP + Framer Motion** yang diorkestrasikan — bukan sekadar fade-in biasa
- Setiap section punya "momen" tersendiri yang diungkap melalui scroll

---

## Landing Page sebagai Pengalaman Naratif

Homepage HyBloggyon bukan halaman daftar artikel biasa. Ia adalah sebuah **editorial experience** — seperti membuka majalah premium yang halaman-halamannya terbuka satu per satu saat kamu scroll.

### Struktur Narasi Landing Page (Top → Bottom):

```
[1] INTRO SEQUENCE (above the fold)
    → Nama blog muncul dengan SplitText per karakter
    → Tagline reveal per kata
    → Hairline border "tumbuh" dari kiri ke kanan

[2] THE EDITORIAL HERO (full-viewport)
    → Foto cover artikel utama dengan parallax (GSAP ScrollTrigger)
    → Typography overlay masuk dari bawah saat scroll masuk viewport
    → Latar foto bergerak lebih lambat dari teks (parallax effect)

[3] THE GRID MANIFESTO (two-column)
    → Dua kolom Musik & Film/Anime
    → Tiap card masuk dengan stagger animation (tidak bersamaan)
    → Kategori tag slide in dari luar canvas

[4] THE NOTES STREAM (text-dominant)
    → Baris-baris teks muncul satu per satu seperti "diketik" saat scroll
    → Counter angka artikel yang increment saat section masuk viewport

[5] THE CLOSING STATEMENT (about teaser)
    → Quote/manifesto singkat dari penulis
    → Teks besar, tipis, dengan SplitText per baris
    → CTA ke halaman About

[6] FOOTER
```

---

## Kategori Konten

| Kategori | Deskripsi |
|----------|-----------|
| **Esai** | Tulisan panjang, argumen kritis, narasi filosofis |
| **Notes** | Catatan belajar harian, refleksi singkat, dokumentasi ilmu |
| **Musik** | Analisis album, lirik, scene musik dari perspektif filosofis/puitis |
| **Film & Anime** | Review mendalam, analisis naratif, interpretasi tematik |

---

## Tone of Writing

- Tidak formal-akademik, tapi tidak juga santai-medsos
- Menggunakan "saya" — terasa reflektif dan personal
- Kalimat panjang yang sengaja dibangun, bukan diperpendek demi skim-reading
- Sesekali puitis, selalu jujur

---

## Tech Stack Summary

```
Frontend:    React 19 + Vite 8
Styling:     Tailwind CSS v4 + CSS Modules (hybrid approach)
             → Tailwind: layout utilities, spacing, responsive
             → CSS Modules: komponen dengan state/animasi
             → CSS Variables: semua design tokens tetap dipertahankan
Konten:      MDX files (lokal, /content directory)
Routing:     React Router v7
Animation:   GSAP 3 (ScrollTrigger) + Framer Motion 12 + Lenis + SplitType
Deployment:  Vercel / Cloudflare Pages (⏸ DITUNDA — fokus konten dulu)
```

---

## Struktur Konten MDX (Frontmatter)

```yaml
---
title: "Judul Artikel"
date: "2026-05-01"
category: "esai" # esai | notes | musik | film-anime
excerpt: "Satu paragraf ringkasan untuk preview card"
coverImage: "/images/covers/nama-file.jpg"
readingTime: 7 # dalam menit
featured: false # true untuk tampil di Hero section
---
```

---

## Constraints

- Single author, no CMS, no backend
- Semua gambar dikelola manual di `/public/images/`
- Tidak ada sistem komentar di v1.0
- Pure static output — bisa di-host di Vercel gratis

---

## Referensi & Inspirasi

- **Visual layout:** [Tight Media](https://en.tight.media)
- **Animation feel:** Webflow showcase sites, Awwwards SOTD winners
- **Typography feel:** Le Monde, Monocle Magazine (print)
- **Konten spirit:** Filosofi.co, The Atlantic, Criterion Collection essays
- **Scrollytelling:** NYT Interactive, The Pudding
