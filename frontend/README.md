# Frontend: SMK Telkom Sidoarjo (Next.js 16)

Aplikasi client modern resmi untuk **SMK Telkom Sidoarjo**, dibangun menggunakan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS**.

## Setup & Menjalankan Lokal

```bash
cd frontend
npm install
npm run dev         # Mode development di http://localhost:3001
```

## Mode Produksi & Evaluasi Performa

Untuk hasil performa dan Core Web Vitals (Lighthouse) yang optimal:

```bash
npm run build       # Optimal Turbopack production build
npm run start       # Menjalankan server produksi
```

## Perintah Verifikasi Kualitas

- `npm run typecheck`: Menjalankan verifikasi tipe TypeScript (0 error).
- `npm run lint`: Menjalankan linter ESLint (0 warning/error).
- `npm run build`: Memvalidasi SSG dan kompilasi Next.js untuk semua rute.

## Fitur & Arsitektur

- **App Router Pages**: Beranda, Profil Jurusan (SIJA & TJAT), Berita & Artikel, Ekstrakurikuler, Prestasi, Profil Guru & Tendik, Hub Industri, Pengumuman Kelulusan, Penerapan K3, dan Unduh Informasi.
- **Optimasi Gambar**: Mendukung auto format (AVIF/WebP), responsive sizing, dan integrasi Cloudinary CDN via `src/lib/cloudinary.ts`.
- **Integrasi API**: Terhubung ke backend Go (`backend/src/api`) melalui `src/services/`.
