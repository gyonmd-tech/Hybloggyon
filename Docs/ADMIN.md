# Panel Admin HyBloggyon

Panel admin berada di `/admin` dan seluruh route-nya memakai `noindex`. Akses tidak tersedia sampai PostgreSQL, migration, dan akun pemilik siap.

## Aktivasi Pertama

1. Salin `.env.example` menjadi `.env.local` dan isi `DATABASE_URL`.
2. Jalankan migration dan seed:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. Isi sementara `ADMIN_EMAIL`, `ADMIN_DISPLAY_NAME`, dan `ADMIN_PASSWORD` di environment.
4. Buat akun pemilik:

   ```bash
   npm run admin:create
   ```

5. Hapus `ADMIN_PASSWORD` dari environment setelah akun berhasil dibuat.
6. Buka `/admin/login`.

Password minimal 12 karakter dan disimpan sebagai hash scrypt. Token sesi acak hanya tersimpan sebagai hash di database; browser menerima cookie `HttpOnly`, `SameSite=Lax`, dan `Secure` di production.

## Migrasi Konten Markdown

Jalankan perintah idempotent berikut setelah database siap:

```bash
npm run content:import
```

Perintah ini mengimpor artikel, kategori, tag, seri, metadata SEO, sampul lokal yang tersedia, dan satu revisi awal. Sumber publik tetap Markdown sampai `CONTENT_SOURCE=database` diubah secara eksplisit.

Sebelum cutover:

1. Bandingkan jumlah dan isi artikel di `/admin/posts`.
2. Periksa URL, sampul, tanggal, tag, dan metadata SEO.
3. Buat backup database.
4. Ubah `CONTENT_SOURCE=database` pada staging.
5. Jalankan build dan cek beberapa artikel serta sitemap.

Rollback konten cukup mengembalikan `CONTENT_SOURCE=markdown`. Jangan menghapus Markdown sebelum audit selesai.

## Kemampuan Editorial

- dashboard status publikasi dan aktivitas terakhir;
- pencarian, filter, paginasi, arsip, dan hapus artikel;
- editor Markdown dengan toolbar dan pratinjau tersanitasi;
- draft, terjadwal, terbit, dan arsip;
- artikel terjadwal otomatis menjadi publik setelah `scheduled_at` terlewati;
- excerpt, pull quote, tag otomatis, kategori, seri, dan artikel unggulan;
- sampul dari pustaka media;
- judul/deskripsi SEO, canonical URL, OG image, dan `noindex`;
- snapshot revisi pada setiap penyimpanan dan pemulihan revisi;
- redirect 301 otomatis ketika slug artikel atau kategori berubah;
- identitas situs dan metadata utama;
- pusat Konten Situs untuk Beranda, Notes, Kurasi/Hobi, dan Tentang;
- editor repeatable untuk menambah, menghapus, dan mengurutkan showcase, musik, buku, tontonan, observasi, timeline, manifesto, dan tautan sosial;
- perubahan password yang mencabut seluruh sesi aktif.

## Konten Non-Artikel

Route `/admin/content` adalah pusat pengelolaan semua blok yang sebelumnya tertanam di komponen. Data disimpan sebagai dokumen JSON tervalidasi di tabel `site_settings` dan langsung direvalidasi setelah penyimpanan.

- `/admin/content/home`: hero, ticker, pengantar, kutipan, minat, showcase, log, timeline, dan manifesto ringkas.
- `/admin/content/notes`: current thinking, generator pemikiran, dan hubungan antarcatatan.
- `/admin/content/hobby`: identitas halaman, musik, tontonan, buku, dan observasi.
- `/admin/content/about`: profil, foto, metadata, manifesto, prinsip, email, dan sosial.

Untuk aset visual, unggah gambar melalui `/admin/media`, salin URL-nya, lalu gunakan pada field gambar. Default di `src/content/site-content.js` tetap tersedia sebagai fallback bila setting belum pernah disimpan atau database tidak tersedia.

## Penyimpanan Media

### Development atau server dengan disk persisten

```env
MEDIA_STORAGE=local
MEDIA_MAX_SIZE_MB=8
```

File ditulis ke `public/uploads`. Folder ini tidak masuk Git. Mode ini tidak cocok untuk deployment dengan filesystem sementara.

### Production Vercel Blob

```env
MEDIA_STORAGE=blob
MEDIA_MAX_SIZE_MB=8
BLOB_READ_WRITE_TOKEN=...
```

Token biasanya diinjeksi otomatis saat Blob store dihubungkan ke project Vercel.

### Hosting lain dengan S3-compatible

```env
MEDIA_STORAGE=s3
MEDIA_MAX_SIZE_MB=8
S3_ENDPOINT=https://object-storage.example.com
S3_REGION=auto
S3_BUCKET=hybloggyon
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_PUBLIC_URL=https://cdn.example.com
```

Bucket harus menerima operasi `PutObject` dan `DeleteObject` untuk prefix upload. `S3_PUBLIC_URL` adalah origin/CDN publik tanpa nama file. Kredensial hanya dibaca server-side.

## Operasional dan Keamanan

- Jalankan aplikasi hanya melalui HTTPS di production.
- Jangan memasukkan kredensial ke Git atau variabel `NEXT_PUBLIC_*`.
- Backup database dan object storage secara rutin.
- Gunakan akun database aplikasi dengan hak minimum terhadap schema aplikasi.
- Terapkan pembatasan akses jaringan atau proteksi tambahan pada `/admin` bila hosting mendukungnya.
- Untuk mengganti password darurat, isi env bootstrap sementara dan jalankan kembali `npm run admin:create` dengan email yang sama.

## Pengujian End-to-End

Setelah production build tersedia, isi `E2E_ADMIN_EMAIL` dan `E2E_ADMIN_PASSWORD` dengan akun khusus staging/CI, lalu jalankan:

```bash
npm run test:e2e
```

Jangan menggunakan akun production untuk pengujian otomatis. Alur cutover dan rollback lengkap berada di `Docs/RELEASE.md`.
