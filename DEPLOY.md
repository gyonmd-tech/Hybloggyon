# 🚀 Panduan Deploy HyBloggyon ke Vercel

## Hasil Analisis Kesiapan Proyek

| Aspek | Status | Keterangan |
|---|---|---|
| **Build Produksi** | ✅ Sukses | `npm run build` → 0 error, 0 warning kritis |
| **SPA Routing** | ✅ Siap | `vercel.json` rewrites sudah dikonfigurasi |
| **Environment Variables** | ⚠️ Perlu diatur | `VITE_TMDB_API_KEY` harus dimasukkan di Vercel |
| **`.gitignore`** | ✅ Diperbaiki | `.env` sudah aman, tidak akan ter-push ke Git |
| **Dependensi** | ✅ Bersih | Tidak ada dependensi mati/rusak |
| **Bundle Size** | ⚠️ 683 KB (gzip: 209 KB) | Besar tapi masih normal untuk SPA kompleks |

---

## Prasyarat

1. **Akun GitHub** — Pastikan repository sudah di-push ke GitHub
2. **Akun Vercel** — Daftar gratis di [vercel.com](https://vercel.com) (bisa login dengan GitHub)
3. **API Key TMDb** — Untuk fitur Screening Room di halaman Hobby (opsional)

---

## Langkah 1: Push ke GitHub

Jika belum ada repository:

```bash
# Inisialisasi git (jika belum)
git init
git add .
git commit -m "Initial commit: HyBloggyon ready for deploy"

# Buat repository baru di GitHub, lalu hubungkan
git remote add origin https://github.com/USERNAME/HyBloggyon.git
git branch -M main
git push -u origin main
```

Jika sudah ada repository:

```bash
git add .
git commit -m "Ready for Vercel deploy"
git push
```

> [!IMPORTANT]
> File `.env` sudah ada di `.gitignore`, jadi API key TMDb Anda **tidak akan** ikut ter-push ke GitHub. Ini aman!

---

## Langkah 2: Hubungkan ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Klik **"Import Git Repository"**
3. Pilih repository **HyBloggyon** dari daftar GitHub Anda
4. Vercel akan otomatis mendeteksi bahwa ini adalah proyek **Vite**

---

## Langkah 3: Konfigurasi Build di Vercel

Vercel biasanya mendeteksi otomatis, tapi pastikan pengaturannya seperti ini:

| Pengaturan | Nilai |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | 20.x (atau yang terbaru) |

---

## Langkah 4: Atur Environment Variables

> [!WARNING]
> **Langkah ini WAJIB** jika Anda menggunakan fitur Screening Room (halaman Hobby yang menampilkan film dari TMDb API).

1. Di halaman deploy Vercel, klik tab **"Environment Variables"**
2. Tambahkan variable berikut:

| Key | Value |
|---|---|
| `VITE_TMDB_API_KEY` | *(masukkan API Key TMDb Anda)* |

### Cara Mendapatkan API Key TMDb:
1. Daftar di [themoviedb.org](https://www.themoviedb.org/signup)
2. Pergi ke **Settings → API** di akun Anda
3. Buat API Key (pilih tipe "Developer")
4. Salin API Key (v3 auth) dan tempelkan di Vercel

> [!NOTE]
> Jika Anda belum punya API Key TMDb atau tidak membutuhkan fitur film, Anda bisa melewati langkah ini. Halaman Hobby akan menampilkan fallback tipografi sebagai pengganti poster film.

---

## Langkah 5: Deploy!

1. Klik tombol **"Deploy"**
2. Tunggu proses build selesai (biasanya sekitar 30-60 detik)
3. Setelah berhasil, Vercel akan memberikan URL seperti:
   - `https://hybloggyon.vercel.app`
   - atau `https://hybloggyon-xxxxx.vercel.app`

---

## Langkah 6: Custom Domain (Opsional)

Jika Anda punya domain sendiri:

1. Buka **Project Settings → Domains** di dashboard Vercel
2. Tambahkan domain Anda (misal: `hybloggyon.com`)
3. Vercel akan memberikan DNS records yang perlu Anda arahkan di registrar domain Anda:
   - **Tipe A:** `76.76.21.21`
   - **Tipe CNAME:** `cname.vercel-dns.com`
4. Tunggu propagasi DNS (biasanya 5 menit - 48 jam)
5. SSL/HTTPS otomatis aktif setelah domain terverifikasi

---

## Setelah Deploy: Auto-Deploy

Setiap kali Anda `git push` ke branch `main`, Vercel akan **otomatis** membangun dan mendeploy ulang versi terbaru situs Anda. Tidak perlu deploy manual lagi!

```bash
# Workflow harian Anda cukup:
git add .
git commit -m "Tambah artikel baru"
git push
# → Vercel otomatis deploy dalam 30 detik!
```

---

## Troubleshooting

### Build gagal di Vercel?
- Pastikan `npm run build` berhasil di lokal terlebih dahulu
- Periksa log error di dashboard Vercel → Deployments → klik deployment yang gagal

### Halaman putih kosong / 404 saat akses langsung URL?
- Pastikan file `vercel.json` sudah ter-push ke repository
- File ini berisi rewrites untuk SPA routing:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

### Film tidak muncul di halaman Hobby?
- Pastikan `VITE_TMDB_API_KEY` sudah diatur di Vercel Environment Variables
- Setelah menambahkan env var, lakukan **Redeploy** (Deployments → titik tiga → Redeploy)

### Performa lambat?
- Gambar-gambar eksternal (Unsplash) dimuat langsung dari CDN mereka, jadi tergantung koneksi pengunjung
- Untuk performa optimal, pertimbangkan mengunduh gambar ke folder `public/images/` dan menggunakan path lokal

---

## Struktur File Penting untuk Deploy

```
HyBloggyon/
├── vercel.json          ← Konfigurasi Vercel (SPA rewrites)
├── package.json         ← Dependensi & build scripts
├── vite.config.js       ← Konfigurasi Vite + MDX + Tailwind
├── index.html           ← Entry point HTML
├── .env                 ← API Keys (JANGAN push ke Git!)
├── .gitignore           ← Daftar file yang diabaikan Git
├── public/              ← Aset statis (favicon, icons)
├── content/             ← Artikel MDX
└── src/                 ← Source code React
```

---

> **Selamat! 🎉** Setelah mengikuti panduan ini, HyBloggyon Anda akan live di internet dan bisa diakses oleh siapa saja dari mana saja.
