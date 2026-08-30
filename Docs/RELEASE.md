# Runbook Staging, Cutover, dan Release

Dokumen ini memisahkan tiga kegiatan yang berbeda: menyiapkan staging, memindahkan sumber konten pertama kali, dan merilis perubahan aplikasi setelah database menjadi sumber utama.

## 1. Prasyarat Infrastruktur

Siapkan dua environment terpisah: staging dan production. Masing-masing memerlukan:

- PostgreSQL dengan koneksi TLS dan backup terjadwal;
- object storage S3-compatible beserta URL publik/CDN;
- domain HTTPS;
- environment variables dari `.env.example`;
- akun database aplikasi dengan hak minimum terhadap schema HyBloggyon.

Jangan memakai database production untuk pengujian browser otomatis. Workflow CI memakai PostgreSQL sementara yang dibuang setelah job selesai.

## 2. Bootstrap Staging

Pastikan `CONTENT_SOURCE=markdown` terlebih dahulu, lalu jalankan:

```bash
npm ci
npm run env:check -- --require-database
npm run db:migrate
npm run db:seed
npm run admin:create
npm run content:import
npm run content:audit
```

Hapus `ADMIN_PASSWORD` dari environment setelah `admin:create` berhasil. Simpan password pemilik di password manager, bukan di repository atau dashboard build log.

## 3. Uji Staging

Aktifkan sementara konfigurasi berikut pada staging:

```env
CONTENT_SOURCE=database
MEDIA_STORAGE=s3
```

Kemudian jalankan:

```bash
npm run build
npm run test:e2e
```

Periksa manual sedikitnya:

- login dan logout;
- satu draft, satu artikel terbit, dan satu artikel terjadwal;
- upload dan penghapusan media;
- perubahan slug menghasilkan redirect permanen;
- sitemap hanya memuat artikel yang boleh diindeks;
- canonical, Open Graph, dan structured data artikel;
- RSS `/feed.xml`, manifest, dan respons `/api/health`;
- tampilan desktop dan mobile;
- backup dapat dipulihkan ke database kosong.

## 4. Cutover Pertama

Sebelum jendela cutover:

1. Hentikan sementara perubahan Markdown.
2. Buat backup database dan object storage.
3. Jalankan ulang import Markdown.
4. Jalankan pemeriksaan ketat:

   ```bash
   npm run cutover:check
   ```

5. Jika lolos, ubah production menjadi `CONTENT_SOURCE=database` dan `MEDIA_STORAGE=s3`.
6. Deploy build yang sama dengan build yang sudah diperiksa.
7. Uji halaman utama, dua artikel, login admin, sitemap, dan satu operasi draft.

Jangan menghapus Markdown pada hari cutover. Simpan sampai backup, redirect, dan konten production selesai diaudit.

## 5. Release Setelah Cutover

Setelah artikel baru mulai dibuat dari admin, database boleh memiliki konten yang tidak ada di Markdown. Karena itu gunakan:

```bash
npm run release:check
```

`release:check` memeriksa environment production, koneksi database, migration history, lint, dan build. Audit paritas Markdown hanya berada di `cutover:check`.

## 6. Rollback

Jika masalah hanya terjadi pada versi aplikasi, deploy ulang commit stabil sebelumnya.

Jika masalah terjadi saat cutover konten:

1. Kembalikan `CONTENT_SOURCE=markdown`.
2. Deploy ulang tanpa mengubah atau menghapus database.
3. Simpan log kegagalan dan bandingkan dengan `npm run content:audit`.
4. Perbaiki melalui migration atau import korektif baru.

Jika database rusak, hentikan operasi tulis, pulihkan backup ke instance baru, validasi jumlah record, lalu alihkan koneksi. Jangan melakukan rollback schema dengan menghapus file migration yang sudah pernah dijalankan.

## 7. CI

Workflow `.github/workflows/quality.yml` berjalan pada push ke `main` dan pull request. Ia membuat PostgreSQL sementara, menjalankan migration, seed, bootstrap admin, import, audit paritas, build production, dan Playwright.

Laporan Playwright diunggah sebagai artifact bila pengujian gagal. Kredensial yang tertulis pada workflow hanya berlaku di container CI sementara dan bukan kredensial staging atau production.

Gunakan `GET /api/health` sebagai probe HTTP. Respons `200` berarti sumber konten aktif dapat digunakan; respons `503` berarti konfigurasi atau koneksi database aktif bermasalah. Endpoint tidak menampilkan kredensial dan selalu memakai `no-store` serta `noindex`.
