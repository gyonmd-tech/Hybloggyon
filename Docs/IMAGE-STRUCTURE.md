# IMAGE-STRUCTURE.md
## HyBloggyon — Panduan Struktur Folder Gambar

> Baca file ini sebelum menambahkan gambar apapun ke project.
> AI agent wajib membuat semua folder ini saat setup awal (Fase 0).

---

## Struktur Lengkap

```
public/
└── images/
    ├── covers/              # Cover image artikel (1 file per artikel)
    │   ├── esai/
    │   │   └── [slug-artikel].webp
    │   ├── notes/
    │   │   └── [slug-artikel].webp
    │   ├── musik/
    │   │   └── [slug-artikel].webp
    │   └── film-anime/
    │       └── [slug-artikel].webp
    │
    ├── hero/                # Gambar khusus landing page hero section
    │   └── featured.webp    # Gambar artikel featured (dipakai di HeroBanner)
    │
    ├── about/               # Foto/ilustrasi untuk halaman About
    │   └── author.webp
    │
    ├── og/                  # Open Graph images (untuk social media preview)
    │   ├── default.webp     # OG default jika artikel tidak punya cover
    │   └── [slug-artikel].webp
    │
    └── placeholders/        # Placeholder sementara saat konten belum ada
        ├── cover-default.webp
        ├── cover-musik.webp
        ├── cover-film.webp
        └── cover-notes.webp
```

---

## Konvensi Penamaan File

### Cover Image Artikel
```
Format:  [slug-artikel].webp
Contoh:  tentang-keheningan-sebagai-bahasa.webp
         analisis-album-good-kid-maad-city.webp
         catatan-belajar-typescript-generics.webp
```

**Aturan slug untuk nama file:**
- Semua huruf kecil
- Spasi diganti dengan tanda hubung `-`
- Tidak ada karakter spesial kecuali `-`
- Sama persis dengan slug artikel di URL

### Open Graph Images
```
Format:  [slug-artikel].webp
Ukuran:  1200 × 630px (wajib — standar OG)
```

---

## Spesifikasi Teknis Gambar

| Jenis | Ukuran | Aspect Ratio | Format |
|-------|--------|--------------|--------|
| Cover artikel | 1600 × 900px | 16:9 | WebP |
| Hero landing page | 1920 × 840px | ~16:7 | WebP |
| Open Graph | 1200 × 630px | ~1.91:1 | WebP |
| Author/About | 800 × 800px | 1:1 | WebP |
| Placeholder | 800 × 450px | 16:9 | WebP |

**Kenapa WebP?**
- Ukuran file ~30% lebih kecil dari JPEG dengan kualitas setara
- Support browser modern semua
- Lighthouse score lebih baik

**Kualitas kompresi yang direkomendasikan:** 80–85%

---

## Cara Referensi Gambar di Kode

### Di frontmatter MDX:
```yaml
---
coverImage: "/images/covers/esai/judul-artikelmu.webp"
---
```

### Di komponen React:
```jsx
<img
  src="/images/covers/musik/analisis-album.webp"
  alt="Deskripsi gambar yang deskriptif"
  width={1600}
  height={900}
  loading="lazy"
/>
```

**Wajib:**
- Selalu sertakan `width` dan `height` (mencegah layout shift / CLS)
- Selalu sertakan `alt` yang deskriptif (aksesibilitas + SEO)
- Gunakan `loading="lazy"` untuk semua gambar di bawah fold
- Gambar hero gunakan `loading="eager"` (above the fold)

### Fallback jika cover tidak ada:
```jsx
const coverSrc = article.coverImage || '/images/placeholders/cover-default.webp';
```

---

## Perintah Bash untuk Membuat Semua Folder (Fase 0)

AI agent harus menjalankan perintah ini saat setup awal:

```bash
mkdir -p public/images/covers/esai
mkdir -p public/images/covers/notes
mkdir -p public/images/covers/musik
mkdir -p public/images/covers/film-anime
mkdir -p public/images/hero
mkdir -p public/images/about
mkdir -p public/images/og
mkdir -p public/images/placeholders
```

Atau dalam satu perintah:
```bash
mkdir -p public/images/{covers/{esai,notes,musik,film-anime},hero,about,og,placeholders}
```

---

## Checklist Sebelum Menambahkan Gambar

- [ ] Format sudah WebP (bukan JPG/PNG)
- [ ] Ukuran sesuai spesifikasi di tabel atas
- [ ] Nama file sesuai slug artikel (lowercase, hyphen)
- [ ] Disimpan di folder kategori yang tepat
- [ ] Frontmatter artikel sudah di-update dengan path gambar
- [ ] `alt` text sudah ditulis di komponen yang menggunakan gambar

---

## Tools Rekomendasi untuk Konversi Gambar

```bash
# Install cwebp (command line WebP converter)
# macOS:
brew install webp

# Konversi satu file:
cwebp -q 82 input.jpg -o output.webp

# Konversi batch (semua JPG di folder):
for f in *.jpg; do cwebp -q 82 "$f" -o "${f%.jpg}.webp"; done
```

Atau gunakan squoosh.app (browser-based, gratis, tanpa install).
