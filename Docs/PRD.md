# Product Requirements Document (PRD)
## The Digital Gallery of Thought — Personal Blog

**Version:** 1.0  
**Author:** [Your Name]  
**Status:** Draft  
**Last Updated:** 2026

---

## 1. Product Overview

### 1.1 Product Summary
The Digital Gallery of Thought adalah blog personal mandiri berbasis web yang dirancang sebagai *own media* untuk mempublikasikan esai panjang, narasi filosofis, catatan belajar, dan analisis pop-culture (musik, film, anime) dengan estetika Neo-Brutalist Editorial.

### 1.2 Problem Statement
Platform media sosial membatasi ekspresi intelektual melalui algoritma yang memprioritaskan konten pendek dan viral. Tidak ada ruang digital yang benar-benar "milik sendiri" untuk Gen Z yang ingin menulis panjang, mendalam, dan jujur — tanpa tekanan engagement metrics.

### 1.3 Solution
Blog personal statis yang dibangun dengan React + Vite, konten dikelola via MDX files lokal, dengan desain Neo-Brutalist Editorial yang membedakannya secara visual dari blog generik.

### 1.4 Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Wadah kontemplasi mandiri | Minimal 2 esai panjang (>1000 kata) dipublikasikan per bulan |
| Dokumentasi belajar | Minimal 4 catatan Notes per bulan |
| Portofolio digital | Blog bisa di-share sebagai URL profil profesional |
| Performa | Lighthouse Score > 90 (Performance, Accessibility) |

---

## 2. Target Audience

**Primary User:** Pembaca Gen Z (18–26 tahun) yang menyukai literatur, estetika internet modern, diskusi mendalam, dan pop-culture.

**Persona:**
- Mahasiswa atau fresh graduate yang tertarik filsafat, sastra, dan seni
- Aktif di komunitas online (Twitter/X, Letterboxd, Last.fm, Goodreads)
- Menghargai desain yang "berbeda" dan tidak generik
- Lebih memilih membaca artikel panjang daripada thread pendek

---

## 3. Features & Requirements

### 3.1 Core Features (MVP)

#### F-01: Homepage Editorial
- **Deskripsi:** Halaman utama dengan layout bergaya majalah independen cetak
- **Komponen:**
  - Header dengan logo/judul dan navigasi utama
  - Hero Banner: foto estetis berukuran besar dengan typography overlay
  - Two-Column Visual Grid: Kategori Musik & Film/Anime
  - Notes Stream: daftar tulisan terbaru dengan hover effect
  - Footer: newsletter form + copyright + social links
- **Prioritas:** Must Have

#### F-02: Konten via MDX
- **Deskripsi:** Semua artikel ditulis dalam format `.mdx` di direktori lokal
- **Requirement:**
  - Support frontmatter: `title`, `date`, `category`, `readingTime`, `coverImage`, `excerpt`
  - Support komponen React di dalam MDX
  - Auto-generate reading time dari word count
- **Prioritas:** Must Have

#### F-03: Halaman Artikel
- **Deskripsi:** Layout baca yang nyaman dan fokus
- **Komponen:**
  - Header artikel: judul, kategori tag, tanggal, reading time indicator `[ ESSAY • 7 MIN READ ]`
  - Cover image estetis
  - Body teks dengan tipografi yang dioptimalkan untuk long-form reading
  - Related articles di bagian bawah
- **Prioritas:** Must Have

#### F-04: Halaman Notes
- **Deskripsi:** Feed catatan harian & pembelajaran
- **Requirement:**
  - Daftar semua tulisan berkategori "Notes"
  - Filter/sort berdasarkan tanggal
- **Prioritas:** Must Have

#### F-05: Halaman Archive
- **Deskripsi:** Arsip seluruh tulisan dengan filter kategori
- **Requirement:**
  - Tampilkan semua artikel dari semua kategori
  - Filter: Semua / Esai / Notes / Musik / Film & Anime
- **Prioritas:** Must Have

#### F-06: Halaman About
- **Deskripsi:** Manifesto dan perkenalan naratif penulis
- **Requirement:**
  - Konten bisa ditulis dalam MDX
  - Bukan halaman "about me" biasa — tapi manifesto naratif
- **Prioritas:** Must Have

### 3.2 Secondary Features (Post-MVP)

#### F-07: Newsletter Subscription
- **Deskripsi:** Form berlangganan newsletter sederhana
- **Prioritas:** Should Have

#### F-08: Dark Mode
- **Deskripsi:** Toggle tema gelap/terang
- **Prioritas:** Could Have

#### F-09: Search
- **Deskripsi:** Full-text search artikel via Fuse.js
- **Prioritas:** Could Have

---

## 4. Non-Functional Requirements

| Kategori | Requirement |
|----------|-------------|
| **Performance** | First Contentful Paint < 1.5s; build output statis |
| **Accessibility** | WCAG 2.1 AA; alt text semua gambar; semantic HTML |
| **SEO** | Meta tags dinamis per artikel; Open Graph support |
| **Responsiveness** | Mobile-first; breakpoints: 375px, 768px, 1280px |
| **Browser Support** | Chromium-based, Firefox, Safari (2 versi terakhir) |

---

## 5. Out of Scope (v1.0)

- Sistem komentar
- User authentication / login
- Backend/database
- Multi-author support
- Monetisasi/paywall

---

## 6. Assumptions & Constraints

- Penulis adalah satu orang (single author)
- Deployment target: Vercel atau Cloudflare Pages (gratis)
- Tidak ada backend — murni static site
- Gambar cover artikel disediakan secara manual oleh penulis
