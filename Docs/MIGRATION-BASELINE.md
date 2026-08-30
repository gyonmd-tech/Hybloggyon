# Migration Baseline

Baseline ini dibuat sebelum migrasi Vite SPA ke Next.js App Router. Tujuannya menjaga URL dan konten tetap dapat diverifikasi selama Fase 0–1.

## Keadaan Awal

- 10 artikel Markdown/MDX aktif.
- Route publik artikel: `/{category}/{slug}`.
- Kategori: `esai`, `notes`, `musik`, `film-anime`.
- Semua artikel aktif menggunakan Markdown standar tanpa import atau JSX MDX.
- Working tree sudah berisi perubahan konten dan komponen sebelum migrasi dimulai; perubahan tersebut harus dipertahankan.

## URL yang Harus Dipertahankan

- `/notes/anak-dari-diam`
- `/esai/anak-itu-aku`
- `/notes/anak-miskin`
- `/esai/etherea`
- `/notes/kata-pengantar-the-narrative-ideas`
- `/esai/kesepian-yang-dididik`
- `/notes/menjadi-tolol-untuk-melawak`
- `/esai/nadir`
- `/notes/penyakitan`
- `/esai/vespera`

## Guardrail

Jalankan `npm run content:check` sebelum build. Pemeriksaan meliputi frontmatter wajib, format tanggal, kecocokan slug dan nama file, route duplikat, isi kosong, serta cover yang hilang.

File MDX tetap menjadi sumber konten publik selama Fase 2. PostgreSQL, schema, dan repository sudah tersedia, tetapi cutover dikendalikan oleh `CONTENT_SOURCE` dan baru dilakukan setelah migrasi konten dinyatakan setara.
