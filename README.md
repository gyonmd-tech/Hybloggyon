# HyBloggyon

Blog editorial pribadi berbasis Next.js. Halaman publik dirender dari server dan data access sudah mendukung PostgreSQL, sementara Markdown tetap menjadi sumber aktif sampai migrasi konten selesai diverifikasi.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4 + design tokens
- GSAP dan Framer Motion
- Markdown dengan `gray-matter` dan `react-markdown`
- PostgreSQL + Drizzle ORM
- Deployment: Vercel

## Menjalankan Proyek

Persyaratan: Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat production build Next.js |
| `npm start` | Menjalankan production build |
| `npm run lint` | Memeriksa kualitas kode |
| `npm run content:check` | Memvalidasi frontmatter, URL, isi, dan cover artikel |
| `npm run content:import` | Mengimpor konten Markdown ke PostgreSQL secara idempotent |
| `npm run content:audit` | Membandingkan konten Markdown dan database sebelum cutover |
| `npm run seo:check` | Mengaudit canonical, metadata, tanggal, dan gambar sosial artikel |
| `npm run env:check` | Memeriksa kelengkapan environment dan koneksi |
| `npm run env:check:production` | Memeriksa seluruh syarat konfigurasi production |
| `npm run db:generate` | Menghasilkan migration SQL dari schema Drizzle |
| `npm run db:migrations:check` | Memvalidasi konsistensi riwayat migration |
| `npm run db:migrate` | Menjalankan migration PostgreSQL |
| `npm run db:seed` | Mengisi kategori dan setting dasar |
| `npm run db:check` | Memeriksa koneksi serta jumlah record |
| `npm run admin:create` | Membuat atau mereset akun pemilik dari environment |
| `npm run test:e2e` | Menjalankan workflow browser Playwright |
| `npm run cutover:check` | Pemeriksaan ketat sebelum cutover pertama |
| `npm run release:check` | Pemeriksaan release setelah database menjadi sumber utama |

## Struktur

```text
src/
├── app/                 # Route, metadata, sitemap, robots, dan server entry
├── features/            # Tampilan per domain halaman
│   ├── about/
│   ├── archive/
│   ├── article/
│   ├── hobby/
│   ├── home/
│   ├── notes/
│   └── admin/            # Aksi dan komponen ruang editorial
├── components/          # Komponen UI reusable
├── config/              # Konfigurasi situs
├── content/
│   └── posts/           # Sumber Markdown sementara
├── lib/
│   ├── content/         # Kontrak dan adapter sumber konten
│   ├── auth/            # Password, session, dan proteksi admin
│   ├── db/              # Schema, client, dan repository PostgreSQL
│   └── media/           # Penyimpanan lokal/S3-compatible
└── styles/              # Design system publik dan admin
```

`src/app` menangani pekerjaan server dan routing. `src/features` menangani tampilan interaktif. Komponen tidak boleh membaca file konten sendiri; seluruh data artikel masuk dari `src/lib/content/posts.js` melalui route server.

## Menambah Artikel Selama Masa Transisi

1. Tambahkan file `src/content/posts/{slug}.mdx`.
2. Gunakan Markdown standar dan frontmatter yang didokumentasikan di `Docs/CONTENT.md`.
3. Pastikan `slug` sama dengan nama file.
4. Jalankan:

```bash
npm run content:check
npm run build
```

URL artikel tetap memakai `/{category}/{slug}`. Kategori yang tersedia: `esai`, `notes`, `musik`, dan `film-anime`.

## Environment

Salin `.env.example` menjadi `.env.local` bila diperlukan.

```env
NEXT_PUBLIC_SITE_URL=https://domain-utama.example
NEXT_PUBLIC_TMDB_API_KEY=
DATABASE_URL=postgresql://user:password@host:5432/hybloggyon
DATABASE_SSL=require
DATABASE_POOL_MAX=1
CONTENT_SOURCE=markdown
MEDIA_STORAGE=local
```

`NEXT_PUBLIC_SITE_URL` digunakan untuk canonical URL, sitemap, robots, dan structured data. Konfigurasi lama `VITE_TMDB_API_KEY` masih dibaca sementara agar halaman Kurasi tidak langsung rusak saat migrasi.

`DATABASE_URL` adalah secret server dan tidak boleh memakai prefix `NEXT_PUBLIC_`. Biarkan `CONTENT_SOURCE=markdown` saat menyiapkan database. Panduan database terdapat di `Docs/DATABASE.md`; aktivasi panel dijelaskan di `Docs/ADMIN.md`; staging, cutover, release, dan rollback berada di `Docs/RELEASE.md`; panduan discovery berada di `Docs/SEO.md`.

## SEO Dasar

- HTML halaman dan artikel diprerender.
- Metadata, canonical, Open Graph, dan Twitter Card dibuat di server.
- Situs memiliki structured data `WebSite` dan `Person`; artikel memakai `BlogPosting` dan breadcrumb.
- `sitemap.xml` dan `robots.txt` dibuat otomatis.
- RSS tersedia di `/feed.xml` dan terhubung dari metadata halaman.
- Manifest tersedia di `/manifest.webmanifest`.
- Health check untuk monitoring tersedia di `/api/health` dan tidak dapat diindeks.
- Route artikel memvalidasi kategori dan slug; route yang salah menghasilkan HTTP 404.
- Bahasa dokumen adalah Bahasa Indonesia (`lang="id"`).

## Status Migrasi

Fase 0–1 tercatat di `Docs/MIGRATION-BASELINE.md`. Fase 2 menambahkan fondasi PostgreSQL. Fase 3 menyediakan panel admin lengkap dan workflow editorial. Fase 4 menambahkan readiness guard, audit paritas, CI database, pengujian browser, serta runbook cutover. Fase 5 melengkapi SEO teknis, RSS, manifest, structured data, health monitoring, dan audit SEO otomatis. Konten publik tetap membaca Markdown sampai proses cutover dilakukan.
