# condition-project.md
## Status & Kondisi Proyek HyBloggyon Saat Ini

**Tanggal:** Mei 2026
**Tujuan Dokumen:** Memberikan konteks lengkap kepada AI assistant mengenai keadaan proyek saat ini (desain, struktur, halaman) dan panduan untuk brainstorming ide pengembangan selanjutnya agar tetap konsisten dengan visi awal.

---

## 1. Visi & Identitas Visual (Design System)

HyBloggyon adalah blog personal statis dengan estetika **Neo-Brutalist Editorial (Tamed Brutalism)**. Desainnya menggabungkan kejujuran fungsional brutalisme dengan keanggunan tipografi majalah cetak independen.

**Aturan Visual Kritis (Harga Mati):**
- **Border Radius:** WAJIB `0px` untuk SEMUA elemen (gambar, tombol, card, input). Tidak boleh ada sudut melengkung.
- **Shadows:** WAJIB **hard block shadows** (contoh: `box-shadow: 4px 4px 0px var(--color-ink)`). Tidak boleh ada blur atau soft shadow.
- **Warna:** HANYA gunakan palet warna yang sudah didefinisikan di CSS Variables (`global.css`). 
  - ❌ DILARANG keras menggunakan warna bawaan Tailwind seperti `orange-600` atau `blue-500`.
  - ✅ Gunakan `var(--color-ink)`, `var(--color-background-ash)`, `var(--color-espresso)`, `var(--color-accent-green)`, `var(--color-accent-warm)`.
- **Tipografi:**
  - Heading: Sangat besar, rapat (letter-spacing negatif), dan **TIPIS** (font-weight 300 atau 400). ❌ DILARANG menggunakan `font-bold` atau `font-black` (700/900) pada heading.
  - Gunakan font `Satoshi` (Heading), `Switzer` (Body), dan `Space Mono` (Metadata/Kecil).
- **Garis (Borders):** Menggunakan "hairline borders" (`1px solid var(--color-ink)`) sebagai elemen komposisi pemisah yang tegas.
- **Animasi:** Terasa seperti "halaman majalah yang hidup". Gunakan GSAP untuk scroll-reveal dan Framer Motion untuk micro-interactions. ❌ DILARANG menggunakan efek bounce/elastic.

---

## 2. Tech Stack & Arsitektur

- **Core:** React 19 + Vite 8
- **Routing:** React Router v7 (didefinisikan di `App.jsx`)
- **Konten:** Berbasis file lokal `.mdx` di dalam folder `/content/` (tanpa CMS/Backend).
- **Styling (Pendekatan Hybrid):**
  - **Tailwind CSS v4:** Digunakan untuk utility layout, spacing, flex/grid.
  - **CSS Modules:** Digunakan untuk komponen dengan state/animasi khusus.
  - **CSS Variables:** Penyimpan kebenaran tunggal untuk semua *design tokens*.
- **Animasi:** GSAP 3 (ScrollTrigger, SplitType) + Framer Motion 12 + Lenis (Smooth Scroll).

---

## 3. Status Halaman Saat Ini

Berdasarkan pembersihan terakhir untuk menjaga kualitas kode, berikut adalah status routing di `App.jsx`:

✅ **Tersedia & Selesai (Fase 1):**
- **`/` (HomePage):** Selesai. Pengalaman naratif scrollytelling yang sangat kompleks.
  - *Section yang ada:* HeroBanner (gambar full + judul besar), MarqueeTicker (teks berjalan), IntroDescription (pengantar), LatestTopics (kategori/tag), FeaturedEssays (esai sorotan), AccentQuote (kutipan penegas), HobbiesScroll (horizontal scroll), CuratedConsumption (konsumsi media: musik/film), LoggedObservations (observasi), ClassificationGrid (grid kategori), Timeline (garis waktu), ManifestoAbout (teks manifesto besar).
- **`/notes` (NotesPage):** Halaman daftar catatan pembelajaran.
  - *Section yang ada:* NotesHero (header simpel), NotesSearch (kolom pencarian dan filter tag), FeaturedNotes (catatan yang disorot), NotesStream (feed utama catatan bergaya editorial list), ConnectedThoughts (pemikiran terkait), CurrentThinking (fokus saat ini), RandomThought (kutipan acak).
- **`/notes/:id` (NoteSinglePage):** Halaman baca tunggal untuk catatan.
  - *Komponen Utama:* NoteReadingLayout (menyajikan teks artikel, sidebar untuk metadata bergaya monospace, daftar Connected Notes, quote refleksi di bawah artikel, dan navigasi prev/next note). Fokus pada typography long-form reading.

❌ **Dihapus Sementara / Belum Dibangun (Menunggu Desain/Plan):**
- **`/archive` (ArchivePage):** Sebelumnya dihapus karena AI mengalami *hallucination* dan membuat halaman "museum pribadi" dengan border-radius dan shadow yang melanggar design system. **Status: Butuh desain/plan ulang yang sesuai PRD (hanya berisi filter artikel MDX).**
- **`/hobby` (HobbyPage):** Dihapus karena berada di luar scope PRD asli dan melanggar banyak aturan desain.
- **`/about` (AboutPage):** Terdapat di PRD (sebagai manifesto naratif penulis) tetapi belum diimplementasikan dengan benar.

---

## 4. Alur Kerja (Workflow) Pembangunan Halaman Baru

Masalah degradasi kualitas sebelumnya terjadi karena AI diminta membangun halaman kompleks **tanpa referensi visual yang jelas**. Untuk pengembangan selanjutnya, **WAJIB** mengikuti salah satu dari alur berikut sebelum menulis kode React:

**Opsi A: Stitch Workflow (Paling Direkomendasikan)**
1. User membuat desain di alat eksternal (Stitch).
2. Export berupa `code.html` dan `screen.png`.
3. Letakkan di folder `stitch/[nama-halaman]/`.
4. AI mengonversi HTML tersebut ke dalam React Component sesuai panduan di `stitch-workflow.md`.

**Opsi B: Detailed Plan Document (Alternatif)**
1. Buat dokumen spesifikasi super detail di `Docs/plan-[nama-halaman].md` (contoh terbaik: `plan-homepage.md`).
2. Dokumen harus berisi: Struktur narasi (section by section), ASCII wireframe, spesifikasi komponen, sumber data (MDX/Statis), daftar animasi, dan **anti-patterns** (apa yang tidak boleh ada di halaman tersebut).
3. Setelah dokumen plan disetujui, baru AI boleh menulis kode.

---

## 5. Poin Brainstorming untuk Pengembangan Selanjutnya

Gunakan poin-poin ini saat berdiskusi dengan AI lain untuk merancang halaman atau fitur baru:

### A. Merancang Ulang `ArchivePage` (`/archive`)
- **Tujuan PRD:** Menampilkan daftar *seluruh* tulisan dari semua kategori dengan sistem filter (Semua / Esai / Notes / Musik / Film & Anime).
- **Ide Brainstorming:** Bagaimana membuat halaman filter list yang sangat fungsional tapi tetap terasa "Editorial"? Apakah menggunakan layout tabel brutalis, atau grid asimetris? Bagaimana GSAP bisa membuat transisi antar kategori terasa mulus tanpa menghilangkan identitas Neo-Brutalist?

### B. Membangun Ulang `HobbyPage` (`/hobby`)
- **Konteks:** Halaman ini tidak ada di PRD awal, namun akan dibangun ulang sebagai ruang pamer kurasi media, hobi, dan observasi personal yang terstruktur.
- **Ide Brainstorming:** Karena sebelumnya halaman ini melenceng menjadi "museum personal" dengan elemen visual yang salah, bagaimana kita membatasinya kali ini? Haruskah kita mengadaptasi section seperti *CuratedConsumption* atau *HobbiesScroll* dari `HomePage` ke skala penuh? Bagaimana cara menyajikan konten kurasi tanpa menggunakan *soft shadows* atau elemen dekoratif (lingkaran/border radius)?

### C. Membangun `AboutPage` (`/about`)
- **Tujuan PRD:** Bukan halaman "About Me" standar, melainkan sebuah manifesto naratif.
- **Ide Brainstorming:** Bagaimana menyusun tipografi super besar (SplitType) yang mendominasi layar untuk menyampaikan pesan manifesto? Apakah akan menggunakan foto *author* dengan overlay warna (misal: `--color-accent-warm`)? Bagaimana mengatur ruang kosong (white space) agar halaman terasa intim dan kontemplatif?

### D. Halaman Baca Artikel Utama (`/:category/:slug`)
- **Tujuan PRD:** Layout baca yang sangat nyaman untuk *long-form reading* (Esai panjang).
- **Ide Brainstorming:** Berapa lebar kolom baca yang ideal? Bagaimana mendesain komponen MDX custom (seperti blockquote atau image caption) agar sesuai dengan estetika koran/majalah cetak? Haruskah ada *reading progress bar* bergaya garis tipis di atas halaman?

### E. Konsistensi AI
- **Pesan untuk AI selanjutnya:** "Selalu asumsikan kamu bisa salah memilih warna atau margin jika tidak merujuk ke CSS variables. Selalu ingat bahwa 'bulat' adalah musuh utama desain ini. Jika kamu tidak yakin tentang struktur sebuah halaman, JANGAN buat kodenya, melainkan tanyakan wireframe atau dokumen plan-nya terlebih dahulu."
