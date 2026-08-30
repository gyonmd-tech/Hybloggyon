# HyBloggyon

HyBloggyon adalah blog dan ruang editorial pribadi berbasis Next.js. Situs publik membaca konten dari PostgreSQL, sedangkan panel admin menyediakan workflow untuk artikel, media, taksonomi, profil SEO, serta konten non-artikel seperti Beranda, Notes, Kurasi/Hobi, dan Tentang.

Produksi: [hybloggyon.vercel.app](https://hybloggyon.vercel.app)<br>
Panel admin: [hybloggyon.vercel.app/admin](https://hybloggyon.vercel.app/admin)

## Fitur utama

- Artikel dengan status draft, terjadwal, terbit, dan arsip.
- Editor Markdown dengan preview, revisi, featured post, cover, canonical, dan kontrol `noindex` per artikel.
- Pustaka media dengan Vercel Blob di produksi serta adapter local/S3-compatible.
- Kategori, tag, seri, redirect URL lama, dan audit trail editorial.
- Konten Situs untuk mengelola blok non-artikel:
  - Beranda: hero, ticker, pengantar, minat, showcase, log, timeline, dan manifesto ringkas.
  - Notes: current thinking, pemikiran acak, dan hubungan antarcatatan.
  - Kurasi/Hobi: musik, tontonan, buku, observasi, dan hero halaman.
  - Tentang: profil, foto, metadata, manifesto, prinsip, kontak, dan tautan sosial.
- SEO server-rendered: canonical, Open Graph, Twitter Card, JSON-LD, sitemap, RSS, manifest, serta redirect permanen.
- Panel admin privat dengan session server, password hash, rate limit login, `noindex`, `X-Robots-Tag`, dan proteksi anti-frame.
- CI dengan PostgreSQL sementara, migration, import, audit konten, build, dan Playwright.

## Stack

| Bagian | Teknologi |
|---|---|
| Framework | Next.js 16 App Router, React 19 |
| Styling | Tailwind CSS 4, CSS design tokens |
| Motion | GSAP, Framer Motion |
| Database | PostgreSQL, Drizzle ORM |
| Konten artikel | Markdown/MDX sebagai sumber migrasi; PostgreSQL sebagai sumber produksi |
| Media | Vercel Blob, local filesystem, atau S3-compatible |
| Validasi | Zod |
| Pengujian | ESLint, Playwright |
| Hosting | Vercel |

## Persyaratan dan setup lokal

- Node.js 20 atau lebih baru.
- npm 10 atau lebih baru.
- PostgreSQL untuk menggunakan admin dan mode `CONTENT_SOURCE=database`.

```bash
git clone https://github.com/gyonmd-tech/Hybloggyon.git
cd Hybloggyon
npm install
```

Salin `.env.example` menjadi `.env.local`, lalu jalankan:

```bash
npm run db:migrate
npm run db:seed
npm run content:import
npm run admin:create
npm run dev
```

Buka situs pada `http://localhost:3000` dan admin pada `http://localhost:3000/admin`. `admin:create` membaca `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `ADMIN_DISPLAY_NAME`. Hapus `ADMIN_PASSWORD` dari environment setelah akun berhasil dibuat.

## Environment

Gunakan `.env.example` sebagai referensi utama. Jangan commit `.env`, `.env.local`, token Blob, atau kredensial database.

| Variabel | Wajib | Keterangan |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | Ya | Origin canonical tanpa trailing slash. |
| `DATABASE_URL` | Admin/database | Connection string PostgreSQL server-only. |
| `DATABASE_SSL` | Produksi | Gunakan `require` bila provider mewajibkan TLS. |
| `DATABASE_POOL_MAX` | Disarankan | Batas koneksi per instance serverless. |
| `CONTENT_SOURCE` | Ya | `database` untuk produksi; `markdown` hanya untuk fallback/migrasi. |
| `MEDIA_STORAGE` | Ya | `blob`, `local`, atau `s3`. |
| `BLOB_READ_WRITE_TOKEN` | Mode Blob | Biasanya diinjeksi otomatis oleh integrasi Vercel Blob. |
| `MEDIA_MAX_SIZE_MB` | Tidak | Batas unggahan; default 8 MB. |
| `ADMIN_SESSION_DAYS` | Tidak | Umur sesi admin; default 30 hari. |
| `ADMIN_EMAIL` | Bootstrap | Email untuk `npm run admin:create`. |
| `ADMIN_PASSWORD` | Bootstrap | Password awal, minimal 12 karakter. |
| `ADMIN_DISPLAY_NAME` | Tidak | Nama pemilik pada panel. |
| `GOOGLE_SITE_VERIFICATION` | Tidak | Token verifikasi Google Search Console. |
| `NEXT_PUBLIC_TMDB_API_KEY` | Tidak | Poster dan backdrop halaman Kurasi. |

Contoh lokal:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/hybloggyon
DATABASE_SSL=disable
DATABASE_POOL_MAX=5
CONTENT_SOURCE=database
MEDIA_STORAGE=local
MEDIA_MAX_SIZE_MB=8
ADMIN_SESSION_DAYS=30
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=ganti-dengan-password-kuat
ADMIN_DISPLAY_NAME=Pemilik HyBloggyon
```

## Struktur proyek

```text
.
├── drizzle/                   # Migration SQL dan snapshot Drizzle
├── Docs/                      # Runbook admin, database, konten, SEO, dan release
├── public/                    # Aset statis dan media local development
├── scripts/                   # Bootstrap, audit, dan readiness
├── src/
│   ├── app/                   # Route, metadata, robots, sitemap, feed, API
│   │   └── admin/             # Login dan workspace admin
│   ├── components/            # Komponen presentasi publik
│   ├── config/                # Identitas dan URL dasar situs
│   ├── content/               # Default konten serta MDX sumber migrasi
│   ├── features/              # UI dan server action per domain
│   ├── lib/
│   │   ├── auth/              # Password, session, dan rate limit
│   │   ├── content/           # Adapter artikel dan konten situs
│   │   ├── db/                # Client, schema, dan repository
│   │   ├── media/             # Adapter Blob/local/S3
│   │   └── seo/               # Structured data
│   └── styles/                # Design system publik dan admin
└── tests/e2e/                 # Pengujian browser dan SEO
```

Aturan arsitektur:

1. Route server mengambil data melalui `src/lib`, lalu memasukkannya ke komponen tampilan.
2. Komponen publik tidak mengakses database atau filesystem secara langsung.
3. Artikel produksi berasal dari PostgreSQL.
4. Konten non-artikel disimpan sebagai JSON tervalidasi di `site_settings`, dengan fallback aman dari `src/content/site-content.js`.
5. Seluruh mutasi admin wajib melewati autentikasi server action.

## Panel admin

| Route | Fungsi |
|---|---|
| `/admin` | Ikhtisar editorial dan statistik. |
| `/admin/system` | Kesehatan database/storage, sesi aktif, dan audit activity log. |
| `/admin/posts` | Daftar, filter, edit, arsip, dan hapus artikel. |
| `/admin/posts/new` | Membuat artikel baru. |
| `/admin/media` | Unggah media, URL eksternal, alt text, caption, dan hapus aset. |
| `/admin/content` | Pusat konten non-artikel. |
| `/admin/content/:section` | Page flow suatu halaman, dibagi menjadi kartu bagian yang fokus. |
| `/admin/content/:section/:group` | Editor satu kelompok konten; misalnya hero, showcase, musik, atau sosial. |
| `/admin/categories` | Kategori artikel. |
| `/admin/tags` | Tag artikel. |
| `/admin/series` | Seri dan urutan artikel. |
| `/admin/settings` | Identitas situs, SEO global, status sistem, dan password. |

Perubahan pada Konten Situs langsung dipublikasikan setelah tersimpan. Untuk gambar, unggah dahulu melalui Pustaka Media lalu gunakan URL aset pada field gambar.

## Artikel dan migrasi Markdown

Artikel lama berada di `src/content/posts/*.mdx` sebagai sumber migrasi dan cadangan historis. Kontrak frontmatter dijelaskan di `Docs/CONTENT.md`.

```bash
npm run content:check
npm run content:import
npm run content:audit
```

`content:import` bersifat idempotent. Setelah `CONTENT_SOURCE=database`, artikel baru cukup dibuat melalui admin dan tidak perlu disalin kembali ke MDX.

## SEO dan privasi admin

Halaman publik memiliki canonical absolut, Open Graph, Twitter Card, JSON-LD `WebSite`/`Person`/`BlogPosting`/breadcrumb, sitemap, robots, RSS, manifest, kontrol `noindex` per artikel, dan redirect permanen ketika route berubah.

Route admin tidak boleh masuk indeks dan dilindungi berlapis:

1. layout `/admin` menghasilkan meta robots `noindex, nofollow`;
2. respons `/admin` mengirim `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`;
3. `robots.txt` menolak `/admin` dan `/admin/`;
4. sitemap tidak pernah memuat route admin;
5. route workspace membutuhkan session admin di server.

`robots.txt` bukan mekanisme keamanan; autentikasi server tetap menjadi perlindungan utama. Audit dengan:

```bash
npm run seo:check
npm run test:e2e:public
```

## Perintah npm

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Development server. |
| `npm run build` | Production build. |
| `npm start` | Menjalankan hasil build. |
| `npm run lint` | Audit ESLint. |
| `npm run content:check` | Validasi MDX dan frontmatter. |
| `npm run content:import` | Impor MDX ke PostgreSQL. |
| `npm run content:audit` | Audit paritas Markdown/database. |
| `npm run seo:check` | Audit metadata dan canonical artikel. |
| `npm run env:check` | Pemeriksaan environment umum. |
| `npm run env:check:production` | Readiness produksi lengkap. |
| `npm run db:generate` | Membuat migration dari schema. |
| `npm run db:migrations:check` | Memvalidasi riwayat migration. |
| `npm run db:migrate` | Menjalankan migration. |
| `npm run db:seed` | Seed kategori dan pengaturan dasar. |
| `npm run db:check` | Memeriksa koneksi dan jumlah record. |
| `npm run db:studio` | Membuka Drizzle Studio. |
| `npm run admin:create` | Membuat atau mereset akun pemilik. |
| `npm run test:e2e` | Seluruh tes Playwright. |
| `npm run test:e2e:public` | Tes publik, proteksi admin, dan SEO dasar. |
| `npm run cutover:check` | Pemeriksaan ketat sebelum cutover. |
| `npm run release:check` | Pemeriksaan release setelah database aktif. |

## CI dan deployment

Workflow `.github/workflows/quality.yml` berjalan pada push dan pull request. CI menyiapkan PostgreSQL sementara, menjalankan migration, seed, bootstrap admin, import konten, audit, lint, build, dan Playwright.

Deployment Vercel:

1. Hubungkan repository ke project Vercel.
2. Tambahkan PostgreSQL dan Vercel Blob.
3. Isi environment produksi sesuai `.env.example`.
4. Jalankan migration, seed, import, dan bootstrap admin satu kali.
5. Gunakan `CONTENT_SOURCE=database` dan `MEDIA_STORAGE=blob`.
6. Jalankan `npm run release:check` sebelum promosi manual.

`GET /api/health` mengembalikan `200` ketika sumber konten aktif sehat dan `503` bila database gagal. Endpoint memakai `no-store` serta `noindex`. Runbook deploy dan rollback tersedia di `Docs/RELEASE.md`.

## Troubleshooting

### “Database belum dikonfigurasi”

- Pastikan `DATABASE_URL` tersedia pada environment yang berjalan.
- Jalankan `npm run db:migrate` dan `npm run db:check`.
- Buat akun menggunakan `npm run admin:create`.

### Artikel admin tidak muncul

- Pastikan `CONTENT_SOURCE=database`.
- Pastikan status artikel `published` dan tanggal terbit tidak berada di masa depan.
- Jalankan `npm run env:check:production`.

### Unggah media gagal

- Vercel: pastikan `MEDIA_STORAGE=blob` dan `BLOB_READ_WRITE_TOKEN` tersedia.
- Lokal: gunakan `MEDIA_STORAGE=local`.
- Periksa `MEDIA_MAX_SIZE_MB` dan tipe file.

### Konten Situs tidak berubah

- Pastikan admin menampilkan notifikasi berhasil.
- Periksa `/api/health` dan muat ulang tanpa cache.

## Dokumentasi

- `Docs/ADMIN.md` — workflow admin dan keamanan akun.
- `Docs/CONTENT.md` — kontrak artikel dan frontmatter.
- `Docs/DATABASE.md` — schema, migration, backup, dan koneksi.
- `Docs/SEO.md` — metadata, sitemap, RSS, indeksasi, dan Search Console.
- `Docs/RELEASE.md` — staging, cutover, deploy, smoke test, rollback.
- `Docs/CUSTOMIZE.md` — identitas visual dan konten default.
- `Docs/DESIGN.md` — prinsip desain dan komponen.

## Keamanan dan lisensi

- Jangan commit file environment atau token.
- Gunakan password admin unik minimal 12 karakter dan simpan di password manager.
- Hapus `ADMIN_PASSWORD` setelah bootstrap.
- Backup database sebelum migration besar atau penghapusan massal.

Project ini merupakan situs pribadi. Konten tulisan, foto, dan identitas visual tidak otomatis berlisensi untuk penggunaan ulang. Tambahkan lisensi eksplisit bila kode akan didistribusikan.
