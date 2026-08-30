# Database

Fase 2 menggunakan PostgreSQL dan Drizzle ORM. Implementasinya tidak terikat pada satu penyedia database tertentu.

## Prinsip Cutover

Koneksi database dan sumber konten adalah dua pengaturan berbeda:

- `DATABASE_URL` mengaktifkan perintah migration, seed, dan pemeriksaan koneksi.
- `CONTENT_SOURCE=markdown` mempertahankan konten publik dari file lokal.
- `CONTENT_SOURCE=database` memindahkan repository publik ke PostgreSQL.

Jangan mengubah `CONTENT_SOURCE` sebelum artikel berhasil dimigrasikan dan dibandingkan dengan sumber Markdown. Jika `CONTENT_SOURCE=database` tetapi `DATABASE_URL` tidak tersedia, aplikasi sengaja gagal build daripada menampilkan fallback yang tidak disadari.

## Schema

Schema berada di `src/lib/db/schema.js` dan migration tersimpan di folder `drizzle/`.

| Tabel | Fungsi |
|---|---|
| `posts` | Konten Markdown, status editorial, publikasi, dan SEO |
| `categories` | Kategori URL artikel |
| `tags`, `post_tags` | Taxonomy dengan urutan tag |
| `series` | Kelompok dan urutan tulisan |
| `media_assets` | Metadata file pada object storage |
| `post_revisions` | Snapshot perubahan konten |
| `slug_redirects` | Riwayat perubahan URL |
| `site_settings` | Konfigurasi situs berbentuk JSON |
| `admin_users` | Identitas admin; password hanya disimpan sebagai hash |
| `admin_sessions` | Session dengan token yang sudah di-hash |

Repository publik membaca artikel `published` yang tanggal publikasinya sudah berlaku. Artikel `scheduled` ikut dibaca hanya setelah `scheduled_at` terlewati, sehingga publikasi terjadwal tidak membutuhkan proses cron terpisah. Draft, artikel terjadwal yang belum jatuh tempo, arsip, user, session, dan revision tidak pernah dikirim melalui kontrak konten publik.

## Menyiapkan Database

Tambahkan konfigurasi berikut pada `.env.local` atau environment deployment:

```env
DATABASE_URL=postgresql://user:password@host:5432/hybloggyon
DATABASE_SSL=require
DATABASE_POOL_MAX=1
CONTENT_SOURCE=markdown
```

Kemudian jalankan:

```bash
npm run db:migrate
npm run db:seed
npm run db:check
```

`DATABASE_POOL_MAX=1` adalah default aman untuk fungsi serverless. Sesuaikan hanya jika penyedia database dan pola deployment mengizinkan lebih banyak koneksi.

## Perubahan Schema

1. Edit `src/lib/db/schema.js`.
2. Jalankan `npm run db:generate`.
3. Jalankan `npm run db:migrations:check`.
4. Review SQL yang baru di folder `drizzle/`.
5. Jalankan migration pada database staging.
6. Jalankan `npm run db:check` dan production build.
7. Setelah staging lolos, jalankan migration production.

Migration harus disimpan di Git. Hindari mengedit database production secara manual agar riwayat schema tetap dapat direproduksi.

## Repository dan Kontrak

- `src/lib/db/client.js`: koneksi lazy dan pooling.
- `src/lib/db/repositories/posts.js`: query artikel publik.
- `src/lib/db/repositories/settings.js`: baca/tulis setting.
- `src/lib/db/repositories/redirects.js`: lookup redirect slug.
- `src/lib/db/repositories/admin.js`: transaksi dan query seluruh workflow admin.
- `src/lib/content/contracts.js`: validasi bentuk data publik dengan Zod.
- `src/lib/content/posts.js`: adapter Markdown/database yang digunakan route Next.js.

Tidak ada nilai koneksi yang dibundel ke browser. Seluruh akses database hanya terjadi melalui module server dan route Next.js.

## Backup dan Rollback

Sebelum migration production:

- buat snapshot/backup database;
- simpan migration SQL yang akan dijalankan;
- uji restore pada database non-production;
- jangan menghapus file Markdown sampai cutover dan audit konten selesai.

Rollback aplikasi dapat dilakukan dengan mengembalikan `CONTENT_SOURCE=markdown`. Rollback schema tetap harus memakai migration korektif baru; jangan menghapus migration yang sudah pernah dijalankan.

Aktivasi panel, pembuatan akun, impor Markdown, dan penyimpanan media didokumentasikan di `Docs/ADMIN.md`.
