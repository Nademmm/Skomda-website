# Agents: Subagent Guidelines & Operational Rules

Dokumen ini mendefinisikan pembagian peran, batasan wilayah kerja, dan protokol jaminan kualitas untuk AI coding agents yang berkontribusi pada pengembangan website resmi **SMK Telkom Sidoarjo**.

> **Design System Reference**: Sebelum menyusun atau menyunting komponen antarmuka apa pun, agen **WAJIB membaca** [`docs/design.md`](file:///c:/Users/nadem/Skomda-website/docs/design.md) sebagai sumber kebenaran resmi token desain, palet warna, dan aturan aksesibilitas.

---

## 1. Peran Subagent (Subagent Roles)

### 1.1. Frontend Builder (`frontend-builder`)
- **Fokus Kerja**: Membangun dan menyunting komponen antarmuka pengguna Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, dan Framer Motion.
- **Prinsip & Batasan**:
  - Wajib mematuhi design system di `docs/design.md`: gunakan token warna resmi (`brand-red: #bc0c11`, `brand-dark: #101828`, `brand-bg: #f3f4f6`), jangan menggunakan nilai hex arbitrer.
  - Wajib mendukung dwibahasa: gunakan `useLanguage()` dan daftarkan teks antarmuka di `src/locales/id.json` serta `src/locales/en.json`.
  - Gunakan helper media `src/lib/cloudinary.ts` untuk menampilkan foto dengan kompresi dinamis. Ikon dan SVG disajikan lokal.
  - Seluruh gambar wajib memiliki atribut `alt` deskriptif.
  - Dilarang menyentuh file konfigurasi sensitif backend (`backend/.env`).
  - Sebelum menyelesaikan tugas, jalankan `npm run typecheck` dan `npm run lint` di folder `frontend/`.

### 1.2. Backend Integrator (`backend-integrator`)
- **Fokus Kerja**: Mengembangkan endpoint REST API Go (Fiber v2 & Gin), pemodelan skema GORM, integrasi cloud (Supabase PostgreSQL & Cloudinary), serta asisten cerdas AI.
- **Prinsip & Batasan**:
  - Pertahankan kompatibilitas arsitektur Dual-Engine: sinkronkan route di `src/api/fiber_routes.go` dan handler Gin di `src/api/{domain}/`.
  - Pastikan skema database GORM kompatibel ganda untuk Supabase PostgreSQL dan Pure-Go SQLite (`smktelkom_dev.db`). Gunakan `serializer:json` untuk data array.
  - Untuk integrasi chatbot: pastikan terdapat fallback respons yang aman jika gateway AI tidak dapat dihubungi. Jangan membiarkan endpoint menghasilkan status 500 saat offline.
  - Seluruh rahasia API (kunci Cloudinary, connection string database) wajib dibaca melalui environment variable di `backend/src/config/config.go`, dilarang menuliskannya langsung di kode.
  - Sebelum menyelesaikan tugas, jalankan `go vet ./...` dan `go test -v ./...` di folder `backend/`.

### 1.3. Content & SEO Specialist (`content-seo`)
- **Fokus Kerja**: Menulis dan memvalidasi konten informatif sekolah, meta tag SEO, deskripsi terjemahan, dan data profil jurusan.
- **Prinsip & Batasan**:
  - Program keahlian resmi sekolah adalah **SIJA (4 Tahun)** dan **TJAT (3 Tahun)**. Jangan pernah menggunakan nama jurusan non-aktif (TKJ, RPL, atau TAV) dalam materi resmi sekolah.
  - Gaya penulisan lugas, profesional, dan mudah dipindai (scannable) dengan hierarki heading yang runut (`h1` tunggal, diikuti `h2` dan `h3`).
  - Pastikan metadata halaman unik dan deskriptif untuk mendukung visibilitas mesin pencari.

### 1.4. QA Reviewer (`qa-reviewer`)
- **Fokus Kerja**: Mengaudit kualitas, aksesibilitas, konsistensi desain, dan integritas sistem sebelum merge atau rilis.
- **Checklist Verifikasi**:
  1. `npm run typecheck` di folder frontend: wajib 0 error.
  2. `npm run lint` di folder frontend: wajib 0 warning dan 0 error.
  3. `go vet ./...` dan `go test ./...` di folder backend: wajib lulus 100%.
  4. Audit tautan navigasi: semua tautan di Navbar, Footer, dan tombol aksi wajib mengarah ke rute aktif yang valid.
  5. Audit responsivitas mobile: tidak boleh ada konten yang terpotong atau overflow horizontal pada perangkat bergerak.

---

## 2. Alur Koordinasi Antar-Agen

```
[Permintaan Fitur Baru / Pembaruan]
               │
               ├── Copywriting & Data ──────▶ content-seo
               │
               ├── Antarmuka UI (Next.js) ──▶ frontend-builder
               │
               ├── REST API & DB (Go) ──────▶ backend-integrator
               │
               ▼
         [QA Reviewer] ──▶ Verifikasi Otomatis & Manual
               │
          (Lulus 100%)
               ▼
       [Siap Rilis / Commit]
```