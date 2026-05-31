# plan-archive.md
## Spesifikasi Halaman: `/archive` (ArchivePage)

**Tanggal:** Mei 2026 (Revisi 4 — Final Polished)
**Referensi Visual:** Neo-Brutalist Premium Editorial
**Status:** Selesai Dibangun

---

## 1. Visi & Pendekatan

ArchivePage mengadaptasi gaya neo-brutalist dengan pendekatan premium editorial:

- **Simple tapi premium** — Setiap piksel dirancang rapi dengan paduan warna pastel/pekat dari palet kategori.
- **Typografi sebagai navigasi** — hirarki teks jelas tanpa box-shadow.
- **Warna sebagai identitas** — setiap kategori (Esai, Musik, Notes, Film) memiliki warna solid yang menyala saat aktif, mengubah grid menjadi seperti galeri kanvas.

**Struktur besar (atas ke bawah):**
1. `ArchiveHero` — judul halaman + deskripsi (compact)
2. `ArchiveSearch` — pencarian inline + tab folder kategori 
3. `ArchiveGrid` — Grid 4 kolom artikel (inti halaman) dengan fitur "Tampilkan Semua"
4. `ArchiveFooter` — penutup minimal & elegan

---

## 2. Struktur Halaman (Section by Section)

---

### Section 1: `ArchiveHero`
**Tujuan:** Menetapkan konteks halaman secara langsung.

- **Label:** `[ARSIP]` dengan background `var(--color-wasabi)` tebal.
- **Judul:** `Semua Tulisan` (Satoshi, 300, clamp 4-11rem).
- **Deskripsi:** Singkat (Switzer, 1rem).
- **Metadata:** Jumlah tulisan total.
- **Animasi:** GSAP fade in & slide up on mount.

---

### Section 2: `ArchiveSearch` (Gabungan Search + Folder Tabs)
**Tujuan:** Satu pusat kendali untuk pencarian dan filter, dengan background lembut `var(--color-background-ash)` untuk memisahkan section.

- **Search Bar:** Input full-width dengan border-bottom saja. Ikon kaca pembesar SVG, tombol clear (x), tombol TEMUKAN di kanan.
- **Folder Tabs:** Chip kategori di bawah input.
  - State aktif/hover memanggil warna asli kategori (`var(--color-accent-warm)`, `var(--color-espresso)`, dll).
  - Teks kategori menyesuaikan (putih pada bg pekat, hitam pada bg terang).

---

### Section 3: `ArchiveGrid` *(Komponen Inti)*
**Tujuan:** Menampilkan artikel dalam grid 4 kolom bergaya poster editorial.

- **Layout Grid:** `repeat(auto-fill, minmax(280px, 1fr))` dengan gap `16px`.
- **Header Section:** Menampilkan nama kategori yang sedang aktif ("SEMUA TULISAN", "ESAI") dan counter jumlah tulisan.
- **Animasi Transisi:** Menggunakan `framer-motion` AnimatePresence saat filter/folder berpindah.
- **Tampilkan Semua:** 
  - Hanya menampilkan 16 tulisan awal.
  - Jika lebih, muncul lapisan gradient overlay di bawah grid dengan tombol CTA "TAMPILKAN SEMUA ↓" (z-index 10).

---

### Section 4: `ArchiveCard` (Desain Premium per Artikel)
**Tujuan:** Visualisasi individual setiap artikel layaknya kartu warna-warni yang dapat disentuh.

- **Warna Background:** Secara default menggunakan warna `bg` dari kategori masing-masing (membuat layout 4 kolom yang sangat berwarna).
- **Warna Teks:** Secara otomatis menggunakan warna kontras tinggi (putih atau hitam pekat) yang diambil dari `categoryColors.js`.
- **Informasi:** 
  - Kiri Atas: Nomor Urut
  - Kanan Atas: Tanggal Publikasi
  - Tengah: Judul & Deskripsi singkat (3 baris ellipsis)
  - Kiri Bawah: Nama Kategori (// ESAI)
  - Kanan Bawah: CTA `READ` dengan SVG panah khusus anti-bug.
- **Animasi Hover Premium (Tactile Press):**
  - Card menyusut/ditekan ke dalam (`scale(0.98)`) dan agak meredup (`brightness(0.95)`).
  - Garis bawah judul (animated underline) merayap dari kiri ke kanan 0% -> 100%.
  - Ikon SVG panah pada tombol READ maju ke depan.

---

### Section 5: `ArchiveFooter`
**Tujuan:** Menutup halaman secara elegan.

- **Desain:** Layout vertikal (tengah/center).
- **Warna:** Background abu lembut (`var(--color-background-ash)`).
- **Teks:** END OF ARCHIVE (mono uppercase letter-spaced) + Total tulisan.
- **CTA:** Tombol hitam solid "KEMBALI KE BERANDA" yang mengangkat secara fisik (`translateY(-2px)`) saat di-hover.

---

## 3. Komponen React yang Ada

| Komponen | File | Deskripsi |
|---|---|---|
| `ArchiveHero` | `ArchiveHero.jsx` | Hero halaman |
| `ArchiveSearch` | `ArchiveSearch.jsx` | Input pencarian + chip kategori |
| `ArchiveGrid` | `ArchiveGrid.jsx` | Container grid + state expand gradient |
| `ArchiveCard` | `ArchiveCard.jsx` | Card dengan background solid + animasi tactile |
| `ArchiveFooter` | `ArchiveFooter.jsx` | Penutup elegan |

*(ArchiveSplitText dan ArchiveFolderNav lawas telah dihapus karena disimplifikasi/digabungkan ke komponen lain).*

---

## 4. Anti-Patterns (WAJIB DIHINDARI)

- ❌ **DILARANG** `border-radius` (seluruh komponen di halaman ini menggunakan sudut tajam).
- ❌ **DILARANG** menggunakan `box-shadow` untuk card. Pemisahan visual mengandalkan kontras warna background murni.
- ❌ **DILARANG** Infinite scroll tradisional (diganti dengan tombol *Show All* eksplisit).
- ❌ **DILARANG** Animasi bounce/elastic (hover menggunakan ease standar yang natural dan firm).

---

## 5. File Shared Constants

**`src/lib/categoryColors.js`**
Mendefinisikan warna background dan teks khusus untuk memastikan rasio kontras AA/AAA yang baik saat card menggunakan background penuh:
```javascript
export const categoryColors = {
  esai:         { bg: 'var(--color-accent-warm)',         text: 'var(--color-background)', label: 'ESAI' },
  notes:        { bg: 'var(--color-secondary-container)', text: 'var(--color-ink)',        label: 'NOTES' },
  musik:        { bg: 'var(--color-accent-green)',        text: 'var(--color-background)', label: 'MUSIK' },
  'film-anime': { bg: 'var(--color-espresso)',            text: 'var(--color-background)', label: 'FILM' },
};
```
