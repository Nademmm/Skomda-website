# Frontend — SMK Telkom Sidoarjo (Next.js)

## Setup lokal

```bash
npm install
npm run dev       # buka http://localhost:3000
```

## Yang sudah ada

- Halaman Beranda (`src/app/page.tsx`) dengan section: Navbar, Hero (dengan signature animasi "signal grid" — SVG node jaringan yang merepresentasikan identitas telekomunikasi sekolah), Stats, Preview Jurusan, Preview Berita, CTA, Footer.
- Design token di `tailwind.config.ts`: warna graphite/signal-amber, font Space Grotesk (display) + Inter (body) + IBM Plex Mono (label/eyebrow).
- Semua konten (nama jurusan, statistik, berita preview) dipusatkan di `src/lib/data.ts` — edit di sana, bukan di komponen.
- Build sudah divalidasi lolos (`npm run build`) di lingkungan dengan akses ke Google Fonts.

## Catatan penting

- `next/font/google` butuh akses internet ke `fonts.googleapis.com` saat build. Kalau build di lingkungan dengan firewall/proxy ketat, itu akan gagal — solusinya self-host font via `next/font/local`, atau pastikan domain itu di-allowlist.
- Halaman yang direferensikan di navbar (`/jurusan`, `/dtp`, `/alumni`, `/berita`, `/kontak`) **belum dibuat** — itu langkah berikutnya. Klik link tersebut sekarang akan 404.
- Belum ada koneksi ke backend Go — `src/services/**` (API client) belum dibuat, masih perlu ditambahkan begitu endpoint backend siap.
- Gambar masih placeholder/belum ada — integrasi Cloudinary (`src/lib/cloudinary.ts`) belum diimplementasi.
