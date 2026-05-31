# plan-about.md
## Spesifikasi Halaman: `/about` (AboutPage)

**Tanggal:** Mei 2026
**Status:** Belum diimplementasikan
**Tujuan Dokumen:** Panduan lengkap untuk AI agent dalam membangun AboutPage sebagai manifesto naratif — bukan halaman "About Me" konvensional.

---

## 1. Tujuan & Narasi Halaman

AboutPage bukan halaman bio standar. Ini adalah **manifesto tipografis** — sebuah pernyataan identitas yang disampaikan lewat teks besar, ruang kosong, dan ritme visual yang terasa seperti membaca buku seni editorial.

**Pendekatan visual:** Bayangkan halaman ini seperti **spread editorial majalah independen** yang memperkenalkan editor-in-chief mereka. Bukan CV. Bukan profil LinkedIn. Melainkan sebuah teks yang terasa personal, jujur, dan sedikit menantang.

**Pesan inti yang harus dirasakan pembaca:**
> "Ini siapa saya, kenapa saya menulis, dan apa yang saya percayai."

**Tone:** Intim, kontemplatif, sedikit provocative — tidak self-congratulatory.

---

## 2. Struktur Halaman (Section by Section)

### Section 1: `AboutOpener`
**Tujuan:** Pintu masuk halaman — pernyataan pertama yang menghentak.

**Layout:**
- Full viewport height (100vh).
- Konten: Satu kalimat pendek yang sangat besar, mendominasi layar.
- Contoh teks: `"Saya menulis karena berpikir saja tidak cukup."` atau `"Ini bukan resume. Ini adalah cara saya memahami dunia."`
- Font: `Satoshi`, font-weight **300** (tipis), ukuran `clamp(3.5rem, 8vw, 9rem)`.
- Letter-spacing: negatif (`-0.03em` hingga `-0.05em`).
- Teks dipecah per kata menggunakan **SplitType** untuk animasi masuk.
- Layout: Teks rata kiri, dimulai dari ~10% dari kiri layar, posisi vertikal di tengah atau sedikit di atas tengah.
- Di pojok kanan bawah viewport: label kecil `Space Mono` → `[TENTANG PENULIS]` atau `ABOUT —`.

**Animasi:**
- Setiap kata `stagger` masuk dari bawah ke atas (GSAP, `y: 60 → 0`, `opacity: 0 → 1`) saat halaman pertama dimuat.
- Durasi per kata: ~0.6s, stagger: 0.08s.
- ❌ DILARANG: bounce, elastic, atau overshoot pada animasi ini.

---

### Section 2: `AboutPortrait`
**Tujuan:** Memperkenalkan wajah penulis — tapi dalam cara yang editorial, bukan selfie.

**Layout:**
- Dua kolom: Gambar di kiri (60% width), teks di kanan (40% width).
- **Gambar:**
  - Foto penulis, di-crop ke portrait atau square.
  - ❌ DILARANG: `border-radius`. Foto harus kotak sempurna.
  - Overlay warna menggunakan CSS `mix-blend-mode` atau `filter`: Gunakan tint warna `var(--color-accent-warm)` dengan opacity ~20–30% untuk memberikan kesan editorial/duotone.
  - Border: `1px solid var(--color-ink)` di sekeliling foto.
  - Hard shadow: `box-shadow: 6px 6px 0px var(--color-ink)`.
- **Teks di kanan:**
  - Nama penulis dalam ukuran besar, font-weight 300.
  - Di bawahnya: 2–3 baris deskripsi singkat dalam font `Switzer`, ukuran normal, warna `var(--color-ink)`.
  - Di bawah deskripsi: deretan "label-nilai" bergaya metadata, contoh:
    ```
    Berbasis di     →   Jakarta, Indonesia
    Menulis tentang →   Teknologi, Budaya, Kehidupan
    Sejak           →   2021
    ```
  - Label menggunakan `Space Mono`, ukuran kecil.

**Animasi:**
- Foto dan teks masuk dengan GSAP ScrollTrigger saat section ini memasuki viewport.
- Foto: `opacity: 0 → 1` + `x: -20px → 0`.
- Teks: `opacity: 0 → 1` + stagger antar baris.

---

### Section 3: `AboutManifesto`
**Tujuan:** Isi utama halaman — teks panjang yang menyatakan filosofi dan cara pandang penulis.

**Layout:**
- Single column, teks rata kiri.
- Lebar kolom teks: maksimal `680px`, di-center secara horizontal (margin auto).
- Background section ini berbeda: `var(--color-background-ash)` untuk menciptakan jeda visual.
- Padding vertikal besar: `min(15vh, 120px)`.
- Border atas dan bawah: `1px solid var(--color-ink)`.

**Konten:**
- Teks manifesto dibagi dalam 3–4 paragraf, masing-masing diawali dengan **drop cap** (huruf pertama yang sangat besar, font Satoshi, float left).
- Di antara paragraf: tidak ada heading, tapi bisa ada `<hr>` bergaya tipis (`1px solid var(--color-ink)`, lebar 80px, bukan full-width).
- Font body: `Switzer`, ukuran `1.15rem`, line-height `1.8`.
- Kutipan penting di dalam teks bisa di-pull-quote dengan cara: teks lebih besar, font-weight 300, warna `var(--color-espresso)`, dan border kiri `3px solid var(--color-accent-warm)`, padding kiri.

**Animasi:**
- GSAP ScrollTrigger: setiap paragraf masuk dengan `opacity: 0 → 1` + `y: 30 → 0` saat scroll mendekatinya.

---

### Section 4: `AboutBeliefs`
**Tujuan:** Daftar keyakinan atau prinsip penulis — dalam format yang terasa seperti deklarasi.

**Layout:**
- Dua kolom asimetris: label di kiri (30%), teks di kanan (70%).
- Label kiri: `PRINSIP —` atau `I BELIEVE —`, font `Space Mono`, kecil, kapital semua, warna muted.
- Teks kanan: Daftar numbered, font `Satoshi` font-weight 300, ukuran besar (~1.5rem).
  - Contoh: `01. Membaca lebih penting daripada menonton.`
  - `02. Kebingungan adalah tanda bahwa kamu sedang belajar.`
- Setiap item dipisahkan oleh `1px solid var(--color-ink)`.
- Nomor urut dalam `Space Mono`, kecil.

**Animasi:**
- Setiap item masuk secara stagger saat di-scroll (GSAP, `y: 20 → 0`, delay antar item 0.1s).

---

### Section 5: `AboutConnect`
**Tujuan:** Penutup — ajakan untuk terhubung, tapi tidak memohon-mohon.

**Layout:**
- Tinggi ~40vh.
- Satu kalimat besar di tengah: `"Hubungi saya jika kamu ingin berdiskusi."` atau `"Surat elektronik masih cara terbaik."`
- Di bawah kalimat: alamat email atau link kontak, dalam font `Space Mono`, dengan efek underline saat hover (bukan button).
- Di bawahnya lagi: icon atau link ke platform lain (GitHub, Twitter, dll) — disajikan sebagai teks link minimalis, bukan icon grid.
- Border atas: `1px solid var(--color-ink)`.

---

## 3. Komponen React yang Perlu Dibuat

| Komponen | File | Deskripsi |
|---|---|---|
| `AboutOpener` | `AboutOpener.jsx` | Kalimat pembuka besar + SplitType |
| `AboutPortrait` | `AboutPortrait.jsx` | Foto + metadata penulis |
| `AboutManifesto` | `AboutManifesto.jsx` | Teks panjang dengan drop cap |
| `AboutBeliefs` | `AboutBeliefs.jsx` | Daftar prinsip numbered |
| `AboutConnect` | `AboutConnect.jsx` | Penutup + info kontak |

---

## 4. Spesifikasi Animasi

| Elemen | Animasi | Library | Trigger |
|---|---|---|---|
| Kata-kata di `AboutOpener` | Stagger per kata, y: 60→0 | GSAP | On mount |
| Foto di `AboutPortrait` | Fade + slide dari kiri | GSAP ScrollTrigger | Scroll |
| Paragraf di `AboutManifesto` | Fade + y: 30→0 per paragraf | GSAP ScrollTrigger | Scroll |
| Item di `AboutBeliefs` | Stagger y: 20→0 | GSAP ScrollTrigger | Scroll |
| Link hover di `AboutConnect` | Underline animasi CSS | CSS transition | Hover |

---

## 5. Konten (Sumber Data)

Seluruh konten AboutPage adalah **statis** — tidak ada MDX, tidak ada CMS. Tulis langsung di dalam komponen masing-masing atau di file `content/about-data.js` yang di-import.

Struktur `about-data.js`:
```javascript
export const aboutData = {
  openerText: "Saya menulis karena berpikir saja tidak cukup.",
  name: "Nama Penulis",
  shortBio: "Penulis lepas yang tertarik pada persimpangan teknologi, budaya, dan keseharian.",
  meta: [
    { label: "Berbasis di", value: "Jakarta, Indonesia" },
    { label: "Menulis tentang", value: "Teknologi, Budaya, Kehidupan" },
    { label: "Aktif sejak", value: "2021" },
  ],
  manifestoParagraphs: [
    "Paragraf pertama manifesto...",
    "Paragraf kedua manifesto...",
    "Paragraf ketiga manifesto...",
  ],
  beliefs: [
    "Membaca lebih penting daripada menonton.",
    "Kebingungan adalah tanda bahwa kamu sedang belajar.",
    "Tulisan yang jujur lebih berharga dari tulisan yang sempurna.",
  ],
  contactEmail: "hello@example.com",
  socialLinks: [
    { label: "GitHub", url: "https://github.com/username" },
    { label: "Twitter/X", url: "https://x.com/username" },
  ],
};
```

---

## 6. Anti-Patterns (WAJIB DIHINDARI)

- ❌ **DILARANG** `border-radius` pada foto, tombol, atau elemen apapun.
- ❌ **DILARANG** layout centered untuk teks panjang di `AboutManifesto` (gunakan `max-width` + `margin auto`, tapi teks tetap `text-align: left`).
- ❌ **DILARANG** menggunakan kartu (card) untuk menampilkan prinsip/beliefs.
- ❌ **DILARANG** soft shadow pada foto — hanya hard block shadow.
- ❌ **DILARANG** foto dengan filter hitam-putih total (hilangkan karakter editorial).
- ❌ **DILARANG** timeline horizontal untuk bio — ini bukan halaman resume.
- ❌ **DILARANG** font-weight bold/black pada teks manifesto atau prinsip.
- ❌ **DILARANG** icon grid untuk social media (gunakan teks link).
- ❌ **DILARANG** animasi bounce/elastic di manapun.

---

## 7. Checklist Sebelum Menulis Kode

- [ ] Apakah `AboutOpener` menggunakan SplitType untuk memecah teks per kata?
- [ ] Apakah foto di `AboutPortrait` tidak memiliki `border-radius`?
- [ ] Apakah teks manifesto memiliki `max-width: 680px` agar nyaman dibaca?
- [ ] Apakah semua warna menggunakan `var(--color-*)` dari `global.css`?
- [ ] Apakah tidak ada `font-weight: 700` atau `900` di manapun?
- [ ] Apakah semua animasi GSAP sudah memiliki trigger ScrollTrigger yang benar?
- [ ] Apakah konten About sudah dipisahkan ke file `about-data.js` dan tidak di-hardcode dalam JSX?
