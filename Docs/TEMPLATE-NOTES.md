# 📝 Template: NOTES

> Gunakan template ini untuk membuat catatan — bisa berupa jurnal belajar, fragmen pikiran, refleksi harian, atau catatan observasi singkat.
> Salin seluruh blok di bawah ini ke file `.mdx` baru di dalam folder `content/notes/`.

---

## Cara Pakai

1. Buat file baru: `content/notes/[slug-judul-catatanmu].mdx`
2. Nama file menggunakan **huruf kecil semua**, kata dipisah **tanda hubung** (`-`), tanpa spasi.
   - Contoh: `catatan-tentang-kebiasaan-membaca.mdx`
3. Salin template yang sesuai di bawah ini, lalu isi setiap field.
4. Simpan gambar cover di: `public/images/covers/notes/[slug-judul-catatanmu].webp`

---

## Tipe Notes

Notes di HyBloggyon punya beberapa "rasa" — pilih satu yang paling sesuai:

| Tipe | Cocok untuk | Panjang |
|---|---|---|
| **Catatan Belajar** | Ringkasan buku, artikel, atau konsep baru yang baru dipelajari | 300–600 kata |
| **Fragmen Pikiran** | Kumpulan observasi pendek, tidak harus saling berhubungan | 100–400 kata |
| **Jurnal Refleksi** | Refleksi tentang hari, minggu, atau periode tertentu | 200–800 kata |
| **Catatan Cepat** | Satu ide, satu observasi, ditulis cepat & mentah | 50–200 kata |

---

## Template A: Catatan Belajar

```mdx
---
title: "Catatan Belajar: [Topik yang Dipelajari]"
date: "YYYY-MM-DD"
category: "notes"
excerpt: "Ringkasan singkat tentang apa yang dipelajari — satu kalimat yang membuat orang lain ingin membacanya."
coverImage: "/images/covers/notes/slug-judul-catatanmu.webp"
readingTime: 3
featured: false
---

Hari ini saya belajar tentang [topik]. Ini yang paling menarik/mengejutkan/berguna dari apa yang saya temukan.

## Inti Pelajaran

Tuliskan satu atau dua poin utama yang ingin kamu ingat. Tulis dengan kata-katamu sendiri — bukan copy-paste.

## Yang Masih Perlu Dijelajahi

- Pertanyaan lanjutan 1
- Pertanyaan lanjutan 2

## Referensi

- [Nama Buku / Artikel](https://link-jika-ada.com)

---

*Satu kalimat penutup — biasanya sebuah refleksi kecil.*
```

---

## Template B: Fragmen Pikiran

```mdx
---
title: "Fragmen Pikiran: [Tema atau Periode]"
date: "YYYY-MM-DD"
category: "notes"
excerpt: "Kumpulan fragmen pemikiran yang terlalu pendek untuk jadi esai, tapi terlalu penting untuk dilupakan."
coverImage: "/images/covers/notes/slug-judul-catatanmu.webp"
readingTime: 2
featured: false
---

Kadang pikiran datang dalam bentuk fragmen — tidak utuh, tidak terstruktur, tapi terasa penting.

## 01.

Fragmen pertama di sini. Bisa berupa satu kalimat atau satu paragraf pendek.

## 02.

Fragmen kedua. Tidak harus berhubungan dengan yang pertama.

## 03.

Fragmen ketiga. Dan seterusnya sesuai kebutuhan.

---

*Kalimat penutup opsional.*
```

---

## Template C: Jurnal Refleksi

```mdx
---
title: "Refleksi [Periode]: [Tema Utama]"
date: "YYYY-MM-DD"
category: "notes"
excerpt: "Satu kalimat yang menangkap inti dari refleksi periode ini."
coverImage: "/images/covers/notes/slug-judul-catatanmu.webp"
readingTime: 4
featured: false
---

[Kalimat pembuka yang menggambarkan konteks — apa yang terjadi, apa yang dirasakan.]

## Apa yang Berjalan Baik

Tuliskan hal-hal positif, pencapaian kecil, atau momen yang patut disyukuri.

## Apa yang Ingin Diubah

Jujur pada diri sendiri — apa yang bisa dilakukan lebih baik? Tanpa menghakimi, hanya mengamati.

## Satu Hal yang Ingin Dibawa ke Depan

Satu takeaway konkret, satu niat, atau satu pertanyaan untuk direnungkan.

---

*Kalimat penutup.*
```

---

## Panduan Field Frontmatter

| Field | Wajib? | Keterangan |
|---|---|---|
| `title` | ✅ Ya | Judul catatan. Bisa kasual dan personal. |
| `date` | ✅ Ya | Tanggal penulisan, format `YYYY-MM-DD`. |
| `category` | ✅ Ya | Harus selalu `"notes"` untuk folder ini. |
| `excerpt` | ✅ Ya | Ringkasan 1 kalimat. Boleh sesantai nadamu. |
| `coverImage` | ✅ Ya | Path gambar cover: `/images/covers/notes/[slug].webp` |
| `readingTime` | ✅ Ya | Perkiraan waktu baca dalam menit. |
| `featured` | ✅ Ya | Biasanya `false` untuk notes. Set `true` jika catatan ini sangat spesial. |

---

## Tips Menulis Notes

- **Tulis cepat, edit sedikit.** Notes adalah ruang yang lebih bebas dari esai. Tidak perlu sempurna.
- **Jujur lebih penting dari elegan.** Catatan yang mentah dan jujur lebih berharga dari catatan yang dipoles tapi kosong.
- **Tanggal itu penting.** Notes adalah catatan waktu — ia merekam *kamu* di titik tertentu dalam hidupmu.
- **Tidak perlu resolusi.** Notes boleh berakhir dengan pertanyaan yang belum terjawab.
