# plan-hobby.md
## Spesifikasi Halaman: `/hobby` (HobbyPage)

**Tanggal:** Mei 2026 (Revisi 2)
**Status:** Dibangun ulang dari nol — revisi total dari versi sebelumnya
**Tujuan Dokumen:** Panduan lengkap untuk AI agent dalam membangun HobbyPage sebagai ruang identitas melalui selera — bukan daftar hobi, melainkan sebuah *portrait* dari apa yang membentuk cara pandang penulis.

---

## 1. Tujuan & Narasi Halaman

HobbyPage adalah jawaban atas pertanyaan: **"Apa yang kamu konsumsi, dan kenapa itu penting?"**

Ini bukan halaman "tentang saya" versi kedua. Ini adalah lapisan yang lebih dalam — identitas yang terbentuk dari selera, bukan dari biografi. Pembaca yang mencapai halaman ini sudah cukup penasaran untuk ingin tahu lebih. Berikan mereka sesuatu yang *layak untuk dijelajahi*, bukan sekadar daftar.

**Pendekatan naratif halaman secara keseluruhan:**
Halaman ini dibaca seperti sebuah **zine personal** — ada ritme, ada jeda, ada momen yang mengejutkan. Setiap section memiliki energi visual yang berbeda, tapi semua terikat oleh design system yang sama. Pembaca tidak merasa sedang membaca database, mereka merasa sedang *mengintip* ruang pribadi seseorang.

**Batasan scope (tetap ketat):**
- ✅ Musik yang didengarkan (single, bukan album/playlist panjang)
- ✅ Film & anime yang ditonton — dengan banner visual
- ✅ Buku yang dibaca — dengan cover visual
- ✅ Observasi & catatan lepas
- ❌ Bukan galeri foto pribadi
- ❌ Bukan koleksi benda fisik
- ❌ Bukan timeline perjalanan hidup

---

## 2. Struktur Halaman (Section by Section)

### Section 1: `HobbyHero`
**Tujuan:** Pintu masuk yang immersive — memancing rasa ingin tahu, bukan langsung menjelaskan isi halaman.

**Konsep Visual: "Typographic Fog"**
Hero ini tidak memberitahu pembaca apa yang akan mereka temukan. Ia *mengundang* mereka masuk. Seperti sampul majalah yang judulnya ambigu tapi visualnya kuat — kamu tahu ada sesuatu di dalam, tapi kamu harus scroll untuk tahu.

**Layout:**
- Tinggi: `100vh` penuh.
- Background: `var(--color-background)` — bersih, tidak ada gambar.
- Tidak ada border bawah yang langsung terlihat; transisi ke section berikutnya dilakukan oleh teks yang mengecil secara alami saat scroll (Lenis smooth scroll memberikan efek ini secara gratis).

**Komposisi teks (dari atas ke bawah, semua rata kiri):**

1. **Label tersembunyi di pojok kiri atas** — `Space Mono`, 11px, warna `var(--color-espresso)`, opacity 60%:
   ```
   /hobby — [TAHUN]
   ```

2. **Baris pertama — kalimat besar ambigu** di ~30% tinggi layar:
   - Font: `Satoshi`, font-weight **300**
   - Ukuran: `clamp(4rem, 9vw, 11rem)`
   - Letter-spacing: `-0.04em`
   - Warna: `var(--color-ink)`
   - Contoh teks: `"Ada hal-hal yang"` atau `"Bukan apa yang kamu"`
   - Teks ini **tidak selesai** — sengaja terpotong atau menggantung.

3. **Baris kedua — penyelesaian kalimat** di ~55% tinggi layar:
   - Font, ukuran, dan weight sama dengan baris pertama.
   - Tapi warna: `var(--color-espresso)` — lebih redup, seolah berbisik.
   - Contoh: `"tidak bisa kamu jelaskan"` atau `"kamu tulis — yang membentukmu."`

4. **Satu kalimat kecil** di ~80% tinggi layar:
   - Font: `Switzer`, ukuran `1rem`, warna `var(--color-espresso)`, opacity 70%.
   - Contoh: `"Musik. Film. Kata-kata. Dan hal-hal di antaranya."` atau `"Selera adalah biografi yang lebih jujur."`

5. **Scroll indicator** di pojok kanan bawah — bukan panah bouncing:
   - Teks vertikal (rotasi 90°): `SCROLL` dalam `Space Mono`, 10px, kapital, `var(--color-espresso)`.
   - Di bawahnya: garis vertikal `1px solid var(--color-espresso)`, panjang 40px, yang bergerak turun-naik dengan CSS animation `translateY` sederhana (tidak bouncing, lebih seperti bernapas).

**Animasi:**
- Gunakan SplitType pada kedua baris besar — pecah per **karakter** (bukan per kata), masuk dengan stagger sangat cepat (0.02s per karakter) dari `opacity: 0, y: 20` → `opacity: 1, y: 0`.
- Kalimat kecil: fade in setelah kedua baris besar selesai, delay 0.8s.
- Scroll indicator: muncul terakhir, fade in saja.
- ❌ DILARANG: animasi typing/typewriter effect.
- ❌ DILARANG: parallax pada teks di hero ini.

---

### Section 2: `RecordCrate` *(sebelumnya NowPlaying)*
**Tujuan:** Menampilkan lagu-lagu single dari berbagai genre sebagai objek yang punya *karakter visual sendiri* — bukan list, tapi rak.

**Konsep Visual: "The Record Crate"**
Bayangkan melihat ke dalam rak kaset atau sleeve vinyl di sebuah toko rekaman indie — deretan kotak-kotak tipis vertikal yang bisa dijelajahi satu per satu. Setiap kartu mewakili satu lagu, dan setiap kartu punya "temperamen" warna yang mencerminkan genre/mood-nya. Karena tidak ada artwork album, **tipografi IS the artwork**.

**Layout:**
- Label section kiri atas: `SEDANG DIDENGARKAN —` dalam `Space Mono` kecil, kapital.
- Di sebelah kanan label: kalimat kecil kursif dalam `Switzer` italic (satu-satunya penggunaan italic yang diperbolehkan di section ini): *"single yang menemani hari-hari ini"*
- Di bawah label: area horizontal scroll — deretan **kartu vertikal** (seperti sleeve kaset).

**Spesifikasi kartu musik:**
- Ukuran: lebar `180px`, tinggi `260px` — fixed, tidak responsif per kartu.
- Layout: `display: flex; flex-direction: column; justify-content: space-between`
- Border: `1px solid var(--color-ink)`
- Hard shadow: `box-shadow: 4px 4px 0px var(--color-ink)`
- ❌ DILARANG `border-radius`
- **Background kartu:** Ini yang membuat section ini berkarakter. Setiap genre/mood mendapat background berbeda:
  | Genre/Mood | Background | Warna Teks |
  |---|---|---|
  | Melankolis / Indie | `var(--color-background-ash)` | `var(--color-ink)` |
  | Energik / Hip-hop | `var(--color-ink)` | `var(--color-background)` |
  | Tenang / Ambient | `var(--color-espresso)` | `var(--color-background)` |
  | Upbeat / Pop | `var(--color-accent-warm)` | `var(--color-ink)` |
  | Fokus / Electronic | `var(--color-accent-green)` | `var(--color-ink)` |
  - Nilai `mood` di data source menentukan warna kartu (mapping di komponen).

- **Konten dalam kartu (dari atas ke bawah):**
  1. **Atas kartu:** Tag genre dalam kotak flat (border `1px`, tanpa border-radius), font `Space Mono`, 10px, kapital — contoh `[INDIE]`, `[AMBIENT]`.
  2. **Tengah kartu:** Judul lagu — font `Satoshi`, font-weight 300, ukuran `1.4rem`, letter-spacing negatif. Diizinkan wrap 2–3 baris.
  3. **Bawah kartu:**
     - Nama artis — `Space Mono`, kecil.
     - Tahun rilis — `Space Mono`, kecil, opacity 60%.
  4. **Satu kartu khusus** (lagu "sedang didengarkan sekarang") memiliki marker: **garis horizontal** `2px solid` di bagian paling atas kartu menggunakan warna kontras dari background kartu tersebut. Tidak ada dot pulsing — lebih elegan dengan garis.

**Horizontal scroll behavior:**
- Container: `overflow-x: auto`, scroll snap dengan `scroll-snap-type: x mandatory`.
- Setiap kartu: `scroll-snap-align: start`.
- Scrollbar disembunyikan (CSS `scrollbar-width: none`).
- Di ujung kanan: kartu ghost/fade — gradient mask `linear-gradient(to right, transparent 0%, var(--color-background) 100%)` sebagai tanda masih ada konten.
- Di desktop, bisa juga di-scroll dengan drag (implementasi dengan `mousedown` + `mousemove` event).

**Hover state per kartu:**
- `transform: translateY(-6px)` — kartu terangkat sedikit.
- Shadow berubah menjadi lebih dalam: `box-shadow: 6px 10px 0px var(--color-ink)`.
- Transisi: `transition: transform 0.2s ease, box-shadow 0.2s ease`.

**Animasi masuk:**
- Kartu-kartu masuk dari kanan dengan stagger saat section terscroll ke viewport (GSAP ScrollTrigger).
- `x: 40 → 0`, `opacity: 0 → 1`, stagger 0.08s per kartu.

---

### Section 3: `ScreeningRoom` *(sebelumnya WatchList)*
**Tujuan:** Film dan anime yang ditonton — sekarang dengan banner visual sebagai elemen komposisi utama.

**Konsep Visual: "The Screening Room"**
Seperti display kecil bioskop indie atau festival film — setiap entri punya visual yang kuat (banner), tapi presentasinya tetap editorial, bukan seperti website review film mainstream.

**Layout: Asymmetric Feature + Grid**
Dua bagian berbeda dalam satu section:

**Bagian A — Featured Film (satu film paling berkesan):**
- Full-width, tinggi `min(70vh, 600px)`.
- Layout dua kolom: Banner di kiri (**55% width**), teks editorial di kanan (**45% width**).
- **Banner:**
  - Gambar banner/backdrop film dari **TMDb API** (bukan poster portrait, tapi backdrop landscape).
  - Endpoint: `https://api.themoviedb.org/3/search/movie` lalu ambil `backdrop_path`.
  - Fallback jika API gagal: rectangle flat dengan background `var(--color-background-ash)` + judul film dalam tipografi besar sebagai pengganti visual.
  - Gambar memenuhi area kolom kiri secara penuh (`object-fit: cover`, `height: 100%`).
  - **Overlay** di atas gambar: `linear-gradient(to right, transparent 60%, var(--color-background) 100%)` — agar transisi ke kolom teks di kanan terasa menyatu.
  - Border: `1px solid var(--color-ink)` mengelilingi seluruh area banner.
  - ❌ DILARANG `border-radius` pada gambar maupun container-nya.
- **Teks editorial (kolom kanan):**
  - Label kategori kecil `Space Mono` kapital + tahun + genre, semua dalam satu baris: `FILM · 2024 · DRAMA`
  - Judul film: `Satoshi`, font-weight 300, ukuran `clamp(2rem, 4vw, 3.5rem)`, letter-spacing negatif.
  - Kesan personal penulis (2–4 kalimat): `Switzer`, `1.1rem`, line-height 1.7. **Ini bukan sinopsis** — ini adalah reaksi jujur penulis.
  - Di bawah kesan: satu kata atau frasa pendek yang merangkum keseluruhan perasaan, dalam format:
    ```
    SATU KATA: "Mengendap"
    ```
    Font `Space Mono`, kecil, dengan border atas `1px solid var(--color-ink)`, padding atas kecil.

**Bagian B — Film & Anime Lainnya (grid):**
- Grid 3 kolom (desktop) / 2 kolom (tablet) / 1 kolom (mobile).
- Setiap item:
  - Gambar backdrop dari TMDb dalam rasio **16:9**, memenuhi penuh lebar kolom.
  - Fallback: rectangle `var(--color-background-ash)`.
  - `border: 1px solid var(--color-ink)`, `box-shadow: 3px 3px 0px var(--color-ink)`.
  - Di bawah gambar: Judul (`Satoshi`, 300, `1rem`) + label genre kecil (`Space Mono`, muted).
  - ❌ DILARANG `border-radius` pada gambar maupun container.
- Hover state: gambar sedikit `scale(1.02)` *di dalam container* (container overflow hidden, tidak ada border-radius), shadow bertambah.

**Animasi:**
- Featured film: Banner slide dari kiri (`x: -30 → 0`), teks fade dari kanan (`x: 30 → 0`). GSAP ScrollTrigger.
- Grid item: Stagger masuk dari bawah, 0.1s per item.

---

### Section 4: `ReadingShelf` *(direvisi total)*
**Tujuan:** Buku yang dibaca — sekarang dengan cover visual, disajikan seperti rak buku yang bisa dijelajahi.

**Konsep Visual: "The Shelf"**
Bukan grid kartu biasa. Ini terasa seperti melihat punggung buku di rak — rapi, padat, personal. Cover buku hadir sebagai **aksen visual**, bukan sebagai elemen dekoratif yang memenuhi ruang.

**Background section:** `var(--color-background-ash)` — memberikan jeda visual dari section-section sebelumnya.
**Border atas dan bawah:** `1px solid var(--color-ink)`.
**Padding vertikal:** `min(12vh, 100px)`.

**Layout: Vertical Stack with Cover Accent**
- Bukan grid kotak, melainkan **daftar vertikal** — setiap buku adalah satu baris horizontal yang lebar penuh.
- Setiap baris buku menggunakan CSS Grid:
  ```
  [Cover] | [Metadata + Kesan] | [Status Tag]
  ```
  - `grid-template-columns: 80px 1fr auto`

**Spesifikasi setiap baris buku:**
- **Cover (80px × 120px):**
  - Sumber: **Google Books API** atau **Open Library Covers API**.
  - Google Books: `https://www.googleapis.com/books/v1/volumes?q=isbn:[ISBN]` atau `?q=[judul]+[penulis]`, ambil `volumeInfo.imageLinks.thumbnail`.
  - Open Library fallback: `https://covers.openlibrary.org/b/isbn/[ISBN]-M.jpg`.
  - Fallback terakhir jika keduanya gagal: rectangle flat `var(--color-ink)` 80×120px dengan inisial judul buku dalam `Space Mono` putih besar di tengahnya.
  - Gambar: `object-fit: cover`, `width: 80px`, `height: 120px`.
  - Border: `1px solid var(--color-ink)`.
  - Hard shadow: `box-shadow: 3px 3px 0px var(--color-ink)`.
  - ❌ DILARANG `border-radius`.
- **Metadata + Kesan (area tengah):**
  - Judul buku: `Satoshi`, font-weight 300, `1.3rem`.
  - Penulis: `Space Mono`, kecil, `var(--color-espresso)`.
  - Kesan satu kalimat: `Switzer`, `0.95rem`, `var(--color-espresso)`, italic tipis (font-weight 300, bukan bold italic).
- **Status tag (kanan):**
  - Kotak flat tanpa border-radius: border `1px solid var(--color-ink)`.
  - Teks `Space Mono`, kecil, kapital.
  - `[SEDANG DIBACA]` → background `var(--color-accent-green)`, teks `var(--color-ink)`.
  - `[SELESAI]` → background `var(--color-ink)`, teks `var(--color-background)`.
  - `[ANTRIAN]` → background transparan, teks `var(--color-espresso)`.

**Pemisah antar buku:** `1px solid var(--color-ink)` horizontal penuh.

**Hover state per baris:**
- Background baris: `var(--color-background)` (kembali ke warna normal dari ash).
- Cover: `translateY(-3px)` + shadow sedikit lebih dalam.
- Transisi: 0.2s ease.

**Animasi masuk:**
- Setiap baris: `opacity: 0, x: -20 → opacity: 1, x: 0`, stagger 0.1s. GSAP ScrollTrigger.

---

### Section 5: `SideGlances` *(sebelumnya LooseObservations — direvisi konsep)*
**Tujuan:** Observasi, catatan acak, dan pikiran lepas yang tidak cukup besar untuk jadi tulisan formal — tapi terlalu baik untuk dibuang.

**Konsep Visual: "Torn Pages"**
Berbeda dari section-section lainnya yang rapi dan grid-based, `SideGlances` sengaja terasa sedikit lebih *ragged* — seperti catatan yang ditempel di papan atau halaman yang disobek dari notebook. Tapi tetap dalam batas design system: tidak ada tekstur, tidak ada dekoratif. "Ragged" dicapai murni dari komposisi tipografi dan ukuran teks yang tidak seragam.

**Layout:**
- Full-width.
- Label section: `CATATAN PINGGIR —` dalam `Space Mono`, kapital.
- Di bawah label: baris tipis `1px solid var(--color-ink)`.
- Masonry-like layout menggunakan CSS Grid dengan `grid-template-columns: repeat(3, 1fr)` di desktop, tapi setiap item memiliki padding dan ukuran teks yang berbeda-beda — sehingga meskipun grid-nya regular, *isinya* terasa tidak uniform.

**Spesifikasi setiap item observasi:**
- Background: `var(--color-background)`.
- Border: `1px solid var(--color-ink)`.
- Hard shadow: `box-shadow: 3px 3px 0px var(--color-ink)`.
- ❌ DILARANG `border-radius`.
- Padding dalam: `1.5rem`.
- **Ukuran teks bervariasi** berdasarkan panjang teks — ini yang membuat layout terasa hidup:
  - Observasi pendek (< 80 karakter): font `Satoshi` 300, `1.6rem`, letter-spacing negatif — **teks besar seperti headline**.
  - Observasi sedang (80–200 karakter): font `Switzer`, `1rem`, line-height 1.7.
  - Observasi panjang (> 200 karakter): font `Switzer`, `0.9rem`, line-height 1.8.
- Di pojok kiri bawah setiap item: tanggal dalam `Space Mono`, 10px, opacity 50%.
- Tidak ada gambar, tidak ada link, tidak ada tag.

**Aturan variasi ukuran teks:**
AI agent harus membuat fungsi helper `getObservationSize(text)` yang mengembalikan class CSS berdasarkan panjang `text.length`:
```javascript
const getObservationSize = (text) => {
  if (text.length < 80) return styles.sizeHero;    // Satoshi 1.6rem
  if (text.length < 200) return styles.sizeMid;    // Switzer 1rem
  return styles.sizeSmall;                          // Switzer 0.9rem
};
```

**Animasi masuk:**
- Setiap item: `opacity: 0, y: 20 → opacity: 1, y: 0`, stagger 0.07s. GSAP ScrollTrigger.

---

### Section 6: `HobbyFooter` *(section baru)*
**Tujuan:** Penutup halaman yang tidak terasa dipaksakan — memberi sinyal kepada pembaca bahwa perjalanan eksplorasi selesai.

**Layout:**
- Tinggi: `120px`.
- Border atas: `2px solid var(--color-ink)`.
- Dua kolom:
  - Kiri: Teks kecil `Space Mono` — `"— Terakhir diperbarui: [Bulan] [Tahun]"`.
  - Kanan: Link kecil kembali ke homepage atau ke `/notes` — teks saja, bukan tombol.

---

## 3. Komponen React yang Perlu Dibuat

| Komponen | File | Deskripsi |
|---|---|---|
| `HobbyHero` | `HobbyHero.jsx` | Hero immersive dengan SplitType per karakter |
| `RecordCrate` | `RecordCrate.jsx` | Horizontal scroll kartu musik |
| `MusicCard` | `MusicCard.jsx` | Satu kartu lagu dalam RecordCrate |
| `ScreeningRoom` | `ScreeningRoom.jsx` | Featured film + grid film lainnya |
| `ReadingShelf` | `ReadingShelf.jsx` | Daftar vertikal buku dengan cover API |
| `BookRow` | `BookRow.jsx` | Satu baris buku dalam ReadingShelf |
| `SideGlances` | `SideGlances.jsx` | Grid observasi dengan variasi ukuran teks |
| `HobbyFooter` | `HobbyFooter.jsx` | Footer penutup halaman |

---

## 4. Spesifikasi Animasi Lengkap

| Elemen | Animasi | Library | Trigger |
|---|---|---|---|
| Teks baris 1 & 2 di `HobbyHero` | SplitType per karakter, stagger 0.02s, y: 20→0 | GSAP | On mount |
| Kalimat kecil di `HobbyHero` | Fade in, delay 0.8s | GSAP | On mount |
| Scroll indicator | Bernapas: translateY 0→8px→0, loop | CSS animation | Continuous |
| Kartu di `RecordCrate` | Stagger dari kanan, x: 40→0 | GSAP ScrollTrigger | Scroll |
| Hover kartu musik | translateY(-6px), shadow lebih dalam | CSS transition | Hover |
| Banner featured film | x: -30→0 | GSAP ScrollTrigger | Scroll |
| Teks film featured | x: 30→0 | GSAP ScrollTrigger | Scroll |
| Grid film lainnya | Stagger y: 20→0, 0.1s | GSAP ScrollTrigger | Scroll |
| Baris buku | Stagger x: -20→0, 0.1s | GSAP ScrollTrigger | Scroll |
| Hover baris buku | Cover translateY(-3px) | CSS transition | Hover |
| Item observasi | Stagger y: 20→0, 0.07s | GSAP ScrollTrigger | Scroll |

---

## 5. Sumber Data: `content/hobby-data.js`

```javascript
export const hobbyData = {
  music: [
    {
      id: 1,
      artist: "Nama Artis",
      title: "Judul Lagu",
      year: "2024",
      genre: "INDIE",          // Teks untuk tag genre (kapital)
      mood: "melankolis",      // Key untuk mapping warna kartu
      isCurrentlyPlaying: true,
    },
    {
      id: 2,
      artist: "Nama Artis 2",
      title: "Judul Lagu 2",
      year: "2023",
      genre: "AMBIENT",
      mood: "tenang",
      isCurrentlyPlaying: false,
    },
    // minimal 5–8 lagu direkomendasikan agar horizontal scroll terasa bermakna
  ],

  watchlist: {
    featured: {
      title: "Judul Film",
      year: "2024",
      genre: "Drama",
      tmdbId: 12345,            // ID dari TMDb untuk fetch backdrop
      impression: "Kesan personal penulis dalam 2–4 kalimat. Bukan sinopsis.",
      oneWord: "Mengendap",     // Satu kata/frasa ringkasan perasaan
    },
    others: [
      {
        title: "Film / Anime Lain",
        year: "2023",
        genre: "Thriller",
        tmdbId: 67890,
        type: "film",           // "film" | "anime"
      },
      // minimal 4–6 item untuk grid
    ],
  },

  books: [
    {
      title: "Judul Buku",
      author: "Nama Penulis",
      isbn: "9780000000000",    // ISBN-13 untuk Google Books / Open Library API
      status: "reading",        // "reading" | "done" | "queue"
      impression: "Satu kalimat kesan singkat.",
    },
    // minimal 4–6 buku
  ],

  observations: [
    {
      text: "Teks observasi. Bisa satu kalimat pendek yang kuat — ini yang akan jadi teks besar.",
      date: "Mei 2026",
    },
    {
      text: "Observasi yang lebih panjang, bisa dua sampai tiga kalimat. Tetap ringkas dan personal, bukan analisis mendalam.",
      date: "April 2026",
    },
    // minimal 6 item untuk grid 3 kolom yang terisi
  ],
};
```

---

## 6. Spesifikasi API Integration

### TMDb API (Film & Anime)
- **Base URL:** `https://api.themoviedb.org/3`
- **Endpoint backdrop:** `/movie/{tmdb_id}/images` → ambil `backdrops[0].file_path`
- **Render URL:** `https://image.tmdb.org/t/p/w1280{file_path}` (untuk featured), `w780` (untuk grid)
- **API Key:** Disimpan di `.env` sebagai `VITE_TMDB_API_KEY`
- **Fallback:** Jika fetch gagal atau `tmdbId` tidak tersedia → tampilkan rectangle `var(--color-background-ash)` dengan judul film sebagai teks besar di tengah.

### Google Books API (Cover Buku)
- **Endpoint:** `https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}`
- **Ambil:** `items[0].volumeInfo.imageLinks.thumbnail`
- **Tingkatkan resolusi:** Ganti `&zoom=1` dengan `&zoom=3` di URL thumbnail untuk kualitas lebih baik, atau ganti `http` → `https`.
- **Fallback 1:** Open Library → `https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg`
- **Fallback 2:** Rectangle `var(--color-ink)` 80×120px dengan inisial judul (huruf pertama tiap kata) dalam `Space Mono`, putih, ukuran besar.
- **Catatan:** Google Books API tidak memerlukan API key untuk penggunaan dasar (quota publik).

### Implementasi Fetch di Komponen
Gunakan `useEffect` + `useState` di masing-masing komponen (`ScreeningRoom`, `BookRow`) — **jangan fetch semua di satu tempat**. Setiap item fetch gambarnya sendiri secara independen. Ini mencegah satu item yang gagal memblokir seluruh halaman.

```javascript
// Contoh pola di BookRow.jsx
const [coverUrl, setCoverUrl] = useState(null);
const [coverLoading, setCoverLoading] = useState(true);

useEffect(() => {
  const fetchCover = async () => {
    try {
      // Coba Google Books
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const data = await res.json();
      const url = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      if (url) { setCoverUrl(url.replace('http:', 'https:').replace('zoom=1', 'zoom=3')); return; }
      // Fallback Open Library
      setCoverUrl(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
    } catch {
      setCoverUrl(null); // Akan render fallback tipografis
    } finally {
      setCoverLoading(false);
    }
  };
  fetchCover();
}, [isbn]);
```

---

## 7. Mapping Mood → Warna Kartu Musik

```javascript
// Di MusicCard.jsx atau konstanta terpisah
export const moodColorMap = {
  melankolis: {
    bg: 'var(--color-background-ash)',
    text: 'var(--color-ink)',
    accentLine: 'var(--color-ink)',
  },
  energik: {
    bg: 'var(--color-ink)',
    text: 'var(--color-background)',
    accentLine: 'var(--color-accent-warm)',
  },
  tenang: {
    bg: 'var(--color-espresso)',
    text: 'var(--color-background)',
    accentLine: 'var(--color-accent-green)',
  },
  upbeat: {
    bg: 'var(--color-accent-warm)',
    text: 'var(--color-ink)',
    accentLine: 'var(--color-espresso)',
  },
  fokus: {
    bg: 'var(--color-accent-green)',
    text: 'var(--color-ink)',
    accentLine: 'var(--color-espresso)',
  },
};

// Fallback jika mood tidak dikenali:
const defaultMood = {
  bg: 'var(--color-background-ash)',
  text: 'var(--color-ink)',
  accentLine: 'var(--color-ink)',
};
```

---

## 8. Anti-Patterns (WAJIB DIHINDARI)

- ❌ **DILARANG** `border-radius` pada elemen apapun — kartu musik, gambar film, cover buku, tag, semua `0px`.
- ❌ **DILARANG** soft shadow — hanya hard block shadow `box-shadow: Xpx Xpx 0px var(--color-ink)`.
- ❌ **DILARANG** warna Tailwind langsung (`orange-600`, `green-500`, dll).
- ❌ **DILARANG** `font-weight: 700` atau `900` pada heading manapun.
- ❌ **DILARANG** teks judul di `HobbyHero` yang langsung menjelaskan isi halaman ("Ini halaman hobi saya", "Kurasi Saat Ini").
- ❌ **DILARANG** animasi bounce/elastic/overshoot di manapun.
- ❌ **DILARANG** animasi typing/typewriter effect di hero.
- ❌ **DILARANG** parallax pada teks hero.
- ❌ **DILARANG** sistem rating (bintang, angka, progress bar) untuk film atau buku.
- ❌ **DILARANG** menampilkan poster portrait film (gunakan backdrop landscape dari TMDb).
- ❌ **DILARANG** carousel dengan tombol prev/next untuk film grid atau musik — gunakan natural horizontal scroll untuk musik, grid biasa untuk film.
- ❌ **DILARANG** fetch semua gambar di satu parent component — setiap item fetch independen.
- ❌ **DILARANG** section tambahan di luar yang sudah didefinisikan tanpa persetujuan user.

---

## 9. Checklist Sebelum Menulis Kode

- [ ] Sudah membaca `global.css` dan tahu semua nilai `var(--color-*)` yang tersedia?
- [ ] `hobby-data.js` sudah memiliki field `mood` untuk setiap lagu dan `tmdbId` untuk setiap film?
- [ ] `MusicCard.jsx` menggunakan `moodColorMap` dan bukan warna Tailwind atau hardcoded hex?
- [ ] Horizontal scroll di `RecordCrate` menggunakan `scroll-snap-type: x mandatory`?
- [ ] Gradient fade di ujung kanan `RecordCrate` diimplementasikan dengan CSS mask/gradient?
- [ ] Fetch gambar film dilakukan per-item, bukan sekaligus di parent?
- [ ] Fallback tipografis untuk gambar sudah diimplementasikan (bukan gambar placeholder dari internet)?
- [ ] `getObservationSize()` sudah diimplementasikan dan digunakan di setiap item `SideGlances`?
- [ ] Tidak ada `border-radius` di satupun elemen (termasuk gambar film dan cover buku)?
- [ ] Semua animasi GSAP memiliki ScrollTrigger yang benar (bukan on-mount semua)?
