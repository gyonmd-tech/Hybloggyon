# HyBloggyon // Field Study

Sebuah *workshop* digital dan repositori pemikiran pribadi. Dibangun dengan estetika desain *editorial neo-brutalist* yang terinspirasi dari Awwwards, menonjolkan tipografi brutal, arsitektur grid yang kaku, dan warna-warna monokromatik dengan sentuhan aksen natural.

**[🌐 Kunjungi Website Live](https://hybloggyon.vercel.app/)** *(Ganti dengan link Vercel Anda yang sebenarnya nanti)*

## 🏛 Arsitektur Proyek

Blog ini tidak dibangun menggunakan CMS konvensional (seperti WordPress), melainkan direkayasa sebagai **Static Site / Single Page Application (SPA)** yang sangat cepat menggunakan teknologi modern:

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (menggunakan custom Design Tokens)
- **Konten:** MDX (Markdown dengan dukungan React Component)
- **Animasi:** GSAP (ScrollTrigger)
- **Deployment:** Vercel (CI/CD Auto-Deploy)

## 📂 Struktur Direktori Utama

- `/content/` - Tempat semua artikel MDX dan metadata konten disimpan.
- `/public/images/` - Penyimpanan aset gambar statis (cover artikel, hero image).
- `/src/components/` - Blok-blok antarmuka (*UI components*) modular.
- `/src/pages/` - Halaman-halaman utama penyusun struktur *routing*.
- `/src/styles/` - Berisi `global.css` sebagai fondasi visual sistem desain.

## 📝 Manajemen Konten

Proyek ini menggunakan arsitektur *Git-based CMS*. Untuk menulis artikel baru, Anda hanya perlu membuat *file* `.mdx` baru di dalam folder `src/content/posts/`, menulis menggunakan Markdown, dan melakukan `git push`. Vercel akan otomatis merakit ulang *website* dan menampilkannya ke publik dalam hitungan detik.

*(Panduan lengkap manajemen konten dapat dilihat pada file `PANDUAN-KONTEN.md` di proyek ini).*

---
*Didesain dan dikembangkan sebagai ruang jeda dan kontemplasi digital.*
