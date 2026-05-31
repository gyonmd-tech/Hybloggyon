# Struktur Homepage HyBloggyon Saat Ini

Dokumen ini berisi penjelasan mengenai struktur, tata letak, dan komponen yang ada di halaman utama (Homepage) sebelum dilakukan penghapusan. Tujuannya adalah sebagai referensi untuk Anda jika ingin membangun ulang antarmuka (UI) secara manual dan menjelaskan spesifikasi desain ke depan.

## Urutan Komponen (Sections)

Halaman utama (`HomePage.jsx`) dirangkai dari 12 komponen/section yang disusun secara berurutan dari atas ke bawah:

### 1. `HeroBanner`
- **Visual**: Gambar *full-screen* (satu layar penuh) dengan efek *grayscale* (hitam-putih) dan lapisan bayangan gelap (gradient overlay). Memiliki efek animasi *parallax* saat di-*scroll*.
- **Konten**: Judul utama raksasa di tengah ("Field Study").
- **Metadata**: Dibingkai dengan gaya arsitektural (Brutalist/Editorial). Di sudut atas terdapat teks kecil monospace seperti "Vol. 02 // Issue 2025" dan koordinat garis lintang/bujur. Di sudut bawah terdapat deskripsi singkat ("Ongoing Monograph") dan status ("INVESTIGATING // ACTIVE").

### 2. `MarqueeTicker`
- **Visual**: Pita teks berjalan (animasi *marquee*) terus-menerus dari kanan ke kiri tanpa henti.
- **Konten**: Teks status atau pengumuman konstan, misalnya: `// CURRENTLY INVESTIGATING: THE FRAGILITY OF DIGITAL ARCHIVES // REVISION 4.0.2 // GRID ENFORCED // SINCE 2021`.

### 3. `IntroDescription`
- **Visual**: Bagian dengan latar belakang putih/abu-abu terang (`bg-background-ash`). Menggunakan font yang sangat besar dengan animasi teks muncul baris demi baris dari bawah.
- **Konten**: Teks pengantar yang lebar dan rata kiri (left-aligned) tapi diposisikan sejajar dalam grid 12 kolom (dimulai dari kolom ke-4). Contoh teks: "HyBloggyon is a digital workshop dedicated to the preservation of thought..."
- **Highlight**: Kata tertentu ditandai dengan latar belakang warna hijau khas (contoh: `bg-wasabi`).

### 4. `LatestTopics`
- **Visual**: Tata letak *Grid 12 Kolom* dengan garis pemisah (border) bergaya editorial.
- **Konten Kiri (3 Kolom)**: Label indeks seperti "01. LATEST TOPICS" dan "| JOURNAL INDICES".
- **Konten Kanan (9 Kolom)**: Daftar artikel/topik terbaru. Setiap baris memiliki nomor urut ("01."), kategori ("SYSTEMS"), dan judul artikel tebal ("The Brutalist Web..."). Setiap topik dipisahkan dengan garis horizontal.

### 5. `FeaturedEssays`
- **Visual**: Terdiri dari 4 panel gambar penuh (full-bleed) yang memanjang ke bawah. Masing-masing memiliki efek *parallax* pada gambarnya dan filter *grayscale*.
- **Konten**: Setiap panel menampilkan satu esai unggulan dengan teks judul yang *sangat besar* menimpa gambar. Posisi teks bervariasi secara dinamis (rata kiri, kanan, atau tengah). Di atas setiap panel ada tag kecil bergaya *badge* seperti `[ ESSAY // ARCHITECTURE ]`.
- **Header**: Terdapat label "02. FEATURED ESSAYS" di sudut kiri atas panel pertama.

### 6. `AccentQuote`
- Menampilkan kutipan (quote) atau pernyataan filosofis yang ditekankan untuk memberikan jeda visual.

### 7. `HobbiesScroll`
- Bagian yang bisa digulir secara horizontal (horizontal scroll) berisi kartu-kartu (cards) visual untuk hobi atau ketertarikan.

### 8. `CuratedConsumption`
- Menampilkan daftar kurasi konsumsi media (buku, musik, dsb.) dengan gaya tipografi yang rapi.

### 9. `LoggedObservations`
- Catatan observasi atau log yang ditampilkan seperti jurnal teknis.

### 10. `ClassificationGrid`
- Menampilkan kategori atau klasifikasi tulisan dalam bentuk *grid* kotak-kotak.

### 11. `Timeline`
- Representasi kronologis atau lini masa dari sejarah/peristiwa tertentu.

### 12. `ManifestoAbout`
- Bagian penutup di bawah halaman yang berisi tentang manifesto blog, penjelasan penulis, dan informasi tentang proyek (About).

---
**Sistem Desain Tambahan:**
- Desain berpegang pada estetika **Neo-Brutalist / Editorial**.
- Warna didominasi hitam (`ink`), putih (`paper-white`), abu-abu (`background-ash`), dengan warna aksen pucat (`wasabi` hijau, `muted-apricot`).
- Penggunaan **Grid 12-kolom** untuk keselarasan vertikal, font monospaced (seperti mesin ketik) untuk metadata, dan font *sans-serif* raksasa untuk tajuk. Garis batas tipis (1px solid ink) mendominasi tata letaknya.
