# SEO dan Discovery

SEO HyBloggyon dibangun dari data artikel yang sama dengan halaman publik. Metadata tidak disalin ke file terpisah, sehingga perubahan dari panel admin langsung menjadi sumber canonical, Open Graph, Twitter Card, sitemap, RSS, dan structured data.

## Konfigurasi Domain

Isi domain canonical tanpa slash penutup:

```env
NEXT_PUBLIC_SITE_URL=https://domain-utama.example
```

Nilai ini harus sama dengan domain yang dipilih sebagai origin utama. Redirect seluruh domain alternatif ke origin tersebut pada lapisan hosting.

Untuk verifikasi Google Search Console, isi token meta tag saja:

```env
GOOGLE_SITE_VERIFICATION=token-verifikasi
```

Token ini memang tampil pada HTML publik. Jangan memasukkan kredensial akun atau secret API ke variabel tersebut.

## Permukaan yang Dapat Ditemukan

- `/sitemap.xml` memuat halaman utama dan artikel yang tidak memiliki `noindex`.
- `/robots.txt` mengizinkan halaman publik dan menolak crawl `/admin`, `/api`, serta `/preview`.
- `/feed.xml` menyediakan 50 artikel publik terbaru dalam RSS 2.0.
- `/manifest.webmanifest` mendeskripsikan identitas aplikasi dan bahasa situs.
- Metadata halaman utama menunjuk feed RSS agar pembaca feed dapat menemukannya otomatis.

`robots.txt` hanya memberi arahan kepada crawler dan bukan mekanisme keamanan. Proteksi panel admin tetap dilakukan oleh autentikasi server.

## Metadata Artikel

Urutan fallback yang digunakan:

1. Judul SEO, kemudian judul artikel.
2. Deskripsi SEO, kemudian excerpt.
3. OG image khusus, kemudian cover artikel.

Jika artikel tidak memiliki gambar khusus atau cover yang benar-benar tersedia, metadata gambar sosial dikosongkan agar tidak menampilkan gambar yang keliru. Gambar bawaan tetap digunakan untuk halaman tingkat situs.

Setiap artikel menghasilkan:

- canonical URL;
- aturan `index` atau `noindex`;
- Open Graph bertipe `article`;
- Twitter Card;
- schema `BlogPosting`, `BreadcrumbList`, dan identitas penulis;
- tanggal terbit dan tanggal pembaruan.

## Pemeriksaan Sebelum Release

Jalankan:

```bash
npm run seo:check
npm run build
npm run test:e2e
```

`seo:check` menggagalkan release untuk metadata wajib yang kosong, route duplikat, canonical tidak valid atau duplikat, tanggal tidak valid, serta aset sosial situs yang hilang. Panjang metadata dan gambar sosial artikel yang belum tersedia dilaporkan sebagai peringatan editorial.

Setelah deployment pertama:

1. Buka domain HTTPS utama dan pastikan redirect domain alternatif bekerja.
2. Daftarkan `/sitemap.xml` pada search console yang digunakan.
3. Periksa satu artikel melalui validator structured data.
4. Uji preview tautan menggunakan satu artikel yang memiliki OG image khusus.
5. Pantau `/api/health`; respons selain HTTP 200 harus memicu alert.

## Saat Mengubah Slug

Panel admin membuat redirect permanen untuk route lama. Jangan menghapus redirect hanya karena artikel baru sudah terindeks. Pastikan canonical artikel menunjuk route terbaru, kemudian cek route lama menghasilkan HTTP 301 atau 308.

## Utang Editorial Saat Ini

Audit awal menemukan sepuluh artikel lama tanpa gambar sosial khusus yang tersedia. Kondisi ini tidak menghambat indeks atau release, tetapi sebaiknya diselesaikan bertahap melalui pustaka media admin agar preview tautan tiap artikel lebih kuat.
