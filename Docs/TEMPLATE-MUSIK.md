# 🎵 Template: MUSIK

> Gunakan template ini untuk menulis analisis album, review lagu, atau esai tentang musik.
> Salin template yang sesuai ke file `.mdx` baru di dalam folder `content/musik/`.

---

## Cara Pakai

1. Buat file baru: `content/musik/[slug-judul-tulisan].mdx`
2. Nama file menggunakan **huruf kecil semua**, kata dipisah **tanda hubung** (`-`), tanpa spasi.
   - Contoh: `analisis-album-dummy-boy-playboi-carti.mdx`
3. Salin template yang sesuai di bawah ini.
4. Simpan gambar cover di: `public/images/covers/musik/[slug-judul-tulisan].webp`

---

## Tipe Tulisan Musik

| Tipe | Cocok untuk | Panjang |
|---|---|---|
| **Analisis Album** | Membedah album secara menyeluruh — tema, struktur, lirik, produksi | 700–2000 kata |
| **Review Lagu** | Fokus pada satu lagu, bisa lebih mendalam secara lirik/produksi | 300–700 kata |
| **Esai Musikal** | Menghubungkan musik dengan budaya, sejarah, atau pengalaman pribadi | 600–1500 kata |
| **Rekomendasi** | Daftar dengan penjelasan singkat — cocok untuk tema tertentu | 400–800 kata |

---

## Template A: Analisis Album

```mdx
---
title: "Analisis Album: [Judul Album] — [Nama Artis]"
date: "YYYY-MM-DD"
category: "musik"
excerpt: "Satu kalimat yang menangkap esensi albumnya dan mengapa menarik untuk dianalisis."
coverImage: "/images/covers/musik/slug-judul-tulisan.webp"
readingTime: 8
featured: false
---

*[Judul Album]* ([Tahun]) oleh [Nama Artis] bukan sekadar [deskripsi genre] biasa. Ia adalah [satu kalimat yang menangkap keunikan atau klaim utama analisismu].

## Konteks Penciptaan

Sedikit latar belakang yang relevan: dalam situasi apa album ini dibuat? Apa yang sedang terjadi dalam kehidupan artisnya? Apa lanskap musik saat album ini rilis?

Konteks bukan wajib — tapi sering kali membuat analisis jauh lebih bermakna.

## Tema Utama

Apa yang ingin disampaikan album ini? Analisis tema bukan berarti merangkum setiap lagu — tapi menemukan *benang merah* yang menyatukan semuanya.

> "Kutipan lirik yang paling merepresentasikan tema ini."

## Struktur dan Narasi

Album yang baik punya *arc* — awal, tengah, akhir. Apakah album ini memiliki narasi yang mengalir? Lagu mana yang menjadi titik pivot?

1. **[Lagu/Phase Pertama]** — Apa yang dibangun di sini?
2. **[Lagu/Phase Tengah]** — Bagaimana tensionnya naik atau berubah?
3. **[Lagu/Phase Akhir]** — Bagaimana albumnya diselesaikan?

## Produksi & Sound

Apa yang membuat album ini terdengar berbeda? Bisa berupa pilihan instrumen, mixing, sampling, kolaborasi produser, atau eksperimen sonic yang unik.

## Lagu-lagu yang Paling Berkesan

Pilih 2–3 lagu yang paling mewakili analisismu — dan jelaskan *mengapa* secara spesifik.

**[Nama Lagu 1]:** [Penjelasan mengapa lagu ini penting dalam konteks album]

**[Nama Lagu 2]:** [Penjelasan]

## Posisi dalam Diskografi

Bagaimana album ini dibandingkan dengan karya artis sebelumnya? Apakah ini puncak kreativitas mereka? Titik balik? Sebuah eksperimen?

---

*Kalimat penutup yang menyimpulkan signifikansi album ini.*
```

---

## Template B: Review Lagu

```mdx
---
title: "Review Lagu: \"[Judul Lagu]\" — [Nama Artis]"
date: "YYYY-MM-DD"
category: "musik"
excerpt: "Satu kalimat yang menangkap mengapa lagu ini layak dibahas."
coverImage: "/images/covers/musik/slug-judul-tulisan.webp"
readingTime: 4
featured: false
---

[Paragraf pembuka — bagaimana kamu pertama menemukan lagu ini, dan apa yang langsung membuatmu tertarik.]

## Lirik

Apa yang liriknya coba sampaikan? Ambil satu atau dua baris yang paling kuat:

> "[Baris lirik yang paling berkesan]"

Analisis bukan berarti menerjemahkan secara harfiah — tapi menemukan *lapisan makna* di baliknya.

## Produksi

Apa yang membuat musik di balik lagu ini menarik? Beat, melodi, textur, atau elemen tak terduga yang muncul?

## Mengapa Lagu Ini Penting (Atau Tidak)

Posisikan lagu ini dalam konteks yang lebih luas — karier artisnya, genre musiknya, atau moment budayanya.

---

*Satu kalimat penutup.*
```

---

## Template C: Esai Musikal / Rekomendasi Tematik

```mdx
---
title: "[Tema Esai] — [Judul atau Deskripsi Singkat]"
date: "YYYY-MM-DD"
category: "musik"
excerpt: "Satu kalimat tentang tema esai atau apa yang dieksplorasi."
coverImage: "/images/covers/musik/slug-judul-tulisan.webp"
readingTime: 6
featured: false
---

[Paragraf pembuka yang memperkenalkan tema atau premis esai/rekomendasi.]

## [Subjudul 1]

[Isi]

## [Subjudul 2]

[Isi]

---

*Penutup.*
```

---

## Panduan Field Frontmatter

| Field | Wajib? | Keterangan |
|---|---|---|
| `title` | ✅ Ya | Judul tulisan. Bisa dimulai dengan "Analisis Album:", "Review:", dll. |
| `date` | ✅ Ya | Tanggal penulisan, format `YYYY-MM-DD`. |
| `category` | ✅ Ya | Harus selalu `"musik"` untuk folder ini. |
| `excerpt` | ✅ Ya | Ringkasan 1–2 kalimat yang memancing rasa ingin tahu. |
| `coverImage` | ✅ Ya | Path: `/images/covers/musik/[slug].webp` |
| `readingTime` | ✅ Ya | Estimasi waktu baca dalam menit. |
| `featured` | ✅ Ya | `true` jika ingin ditampilkan di posisi unggulan. |

---

## Tips Menulis tentang Musik

- **Hindari jadi review biasa.** "Album ini keren karena beat-nya bagus" tidak cukup. Jelaskan *kenapa* dan *bagaimana*.
- **Kutip lirik dengan konteks.** Lirik tanpa analisis hanyalah copy-paste.
- **Dengarkan berkali-kali sebelum menulis.** Kedalaman analisis musik berbanding lurus dengan kedalaman pendengaranmu.
- **Gunakan terminologi musik jika paham** — tapi jangan paksakan jika tidak.
- **Posisikan diri sebagai pendengar yang berpikir**, bukan kritikus profesional. Keaslian lebih berharga dari otoritas.
