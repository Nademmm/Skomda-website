# Architecture Overview: SMK Telkom Sidoarjo Website

Dokumen arsitektur ini menyajikan gambaran komprehensif mengenai struktur teknis, alur data, integrasi eksternal, dan standar rekayasa sistem website resmi **SMK Telkom Sidoarjo**.

---

## 1. Struktur Proyek (Project Structure)

```
Skomda-website/
├── backend/                      # Service API Backend Go (High-Performance Dual Engine)
│   ├── src/
│   │   ├── api/                  # Route handlers & controller layer
│   │   │   ├── chatbot/          # AI Chatbot proxy ke NexusRouter (Gin)
│   │   │   ├── health/           # Health check endpoint (Gin)
│   │   │   ├── jurusan/          # REST API program keahlian SIJA & TJAT (Gin)
│   │   │   ├── news/             # REST API CRUD berita & artikel sekolah (Gin)
│   │   │   └── fiber_routes.go   # Router & handler komprehensif untuk engine Fiber v2
│   │   ├── client/               # Service layer integrasi eksternal
│   │   │   └── cloudinary/       # Client Cloudinary: signature generator & direct upload
│   │   ├── cmd/                  # Application entrypoints
│   │   │   ├── fiber/            # Dedicated runner untuk Go Fiber v2
│   │   │   └── server/           # Unified runner (mendukung switch Fiber & Gin via SERVER_ENGINE)
│   │   ├── config/               # Konfigurasi sistem & database
│   │   │   ├── config.go         # Environment loader (godotenv) & parameter runtime
│   │   │   └── db.go             # Inisialisasi GORM, koneksi Postgres/SQLite, & auto-seeder
│   │   └── models/               # Definisi skema database GORM
│   │       ├── jurusan.go        # Model program keahlian (SIJA & TJAT)
│   │       └── news.go           # Model berita, kategori, & metadata tanggal
│   ├── smktelkom_dev.db          # Database SQLite lokal otomatis untuk local development
│   ├── Dockerfile                # Konfigurasi container backend
│   ├── go.mod                    # Dependensi Go
│   └── go.sum
├── frontend/                     # Aplikasi Client Web Next.js 16 (App Router)
│   ├── public/                   # Aset statis, ikon, dan gambar lokal
│   │   ├── figma/                # Aset ilustrasi & elemen desain
│   │   └── images/               # Direktori gambar terstruktur
│   ├── src/
│   │   ├── app/                  # Rute halaman Next.js App Router
│   │   │   ├── admin/            # CMS internal (/admin/berita)
│   │   │   ├── berita/[slug]/    # Halaman detail artikel dinamis
│   │   │   ├── informasi/        # Sub-rute: berita, pengumuman-kelulusan, penerapan-k3
│   │   │   ├── program/          # Sub-rute: profil-jurusan, ekstrakurikuler, digital-talent, ts21
│   │   │   ├── tefa/             # Halaman Teaching Factory
│   │   │   ├── tentang-kami/     # Sub-rute: profil-sekolah, hub-industri, prestasi, fasilitas, guru, akomodasi
│   │   │   ├── unduh-informasi/  # Halaman unduh dokumen resmi & brosur PPDB
│   │   │   ├── globals.css       # Tailwind directives & style global
│   │   │   ├── layout.tsx        # Root layout (Google Fonts, LanguageProvider, SkomdaChatWidget)
│   │   │   └── page.tsx          # Halaman Beranda utama
│   │   ├── components/           # Komponen UI modular
│   │   │   ├── chatbot/          # SkomdaChatWidget.tsx (Widget obrolan AI)
│   │   │   ├── layout/           # Navbar.tsx, Footer.tsx, NavbarSearch.tsx
│   │   │   ├── news/             # ShareArticleWidget.tsx & komponen pendukung berita
│   │   │   └── sections/         # Seksi tampilan modular per halaman
│   │   ├── context/              # State management global (LanguageContext.tsx)
│   │   ├── data/                 # Data statis terstruktur (teachers.ts)
│   │   ├── lib/                  # Helper utilitas (cloudinary.ts, cloudinary-manifest.json)
│   │   ├── locales/              # Kamus multi-bahasa (id.json, en.json)
│   │   └── services/             # Client fetch API ke backend Go (news.ts)
│   ├── package.json
│   ├── tailwind.config.ts        # Design tokens: warna, font, bayangan, container
│   └── tsconfig.json
├── docs/                         # Dokumentasi teknis & arsitektur proyek
│   ├── AGENTS.md
│   ├── ARCHITECTURE.md           # Dokumen ini
│   ├── PRD.md
│   ├── WORKFLOW.md
│   └── design.md
├── scripts/
│   └── sync-cloudinary.mjs       # Script utilitas audit dan sinkronisasi media Cloudinary
└── README.md
```

---

## 2. Diagram Alur Sistem (High-Level System Diagram)

```
[ Pengunjung Web / Siswa / Orang Tua / Staff ]
                     │
                     ▼
       [ Frontend: Next.js 16 (App Router) ]
         │ (Port 3000 / 3001)
         │
         ├── REST API (Fetch / CORS)
         │   ▼
         │ [ Backend: Go API (Fiber v2 / Gin) ] (Port 8080)
         │   │
         │   ├── GORM ORM ──▶ [ PostgreSQL (Supabase / Neon) ]
         │   │                └─▶ (Fallback: Pure-Go SQLite: smktelkom_dev.db)
         │   │
         │   ├── Signature / Upload ──▶ [ Cloudinary Media CDN ]
         │   │
         │   └── AI Proxy ──▶ [ NexusRouter AI Gateway (fahlyce.vercel.app) ]
         │                     └─▶ (Fallback Otomatis: Kontak Humas & Info PPDB)
         │
         └── Media Delivery ──▶ [ Cloudinary CDN (f_auto, q_auto, g_face) ]
                                [ Vektor / Ikon Lokal (public/) ]
```

### Prinsip Alur Data:
1. **Pemisahan Peran**: Frontend Next.js menangani antarmuka pengguna, rendering server (SSR/SSG), multi-bahasa, dan interaktivitas klien. Seluruh manipulasi data persisten dan komunikasi pihak ketiga dilakukan melalui Backend Go.
2. **Keamanan Kredensial**: Kunci API Cloudinary Secret, JWT Secret, dan URL database hanya berada di backend `.env` dan tidak pernah diekspos ke bundel browser.
3. **Ketahanan Layanan (Resilience)**: Apabila database cloud PostgreSQL tidak tersedia, backend secara transparan beralih ke SQLite lokal. Begitu pula jika gateway AI eksternal mengalami kendala, chatbot memberikan jawaban ramah pengguna berisi kontak resmi sekolah tanpa menimbulkan error sistem.

---

## 3. Komponen Inti (Core Components)

### 3.1. Frontend Web Client
- **Framework**: Next.js 16.3.0 dengan App Router dan React 19.2.8.
- **Styling**: Tailwind CSS 3.4.17 dengan palet warna resmi Telkom Schools (`brand-red: #bc0c11`, `brand-dark: #101828`, `brand-bg: #f3f4f6`).
- **Tipografi**: Dimuat langsung dari Google Fonts melalui `next/font/google`:
  - `font-jakarta` (**Plus Jakarta Sans**): Heading, navigasi, dan elemen UI primer.
  - `font-poppins` (**Poppins**): Body text, deskripsi, tanggal, dan metadata.
- **Fitur Interaktif Khusus**:
  - **Pencarian Cepat Global (`NavbarSearch.tsx`)**: Modal pencarian langsung dengan pintasan `Cmd+K` atau `Ctrl+K`.
  - **Widget AI Chatbot (`SkomdaChatWidget.tsx`)**: Obrolan melayang dengan parser Markdown, tombol pertanyaan cepat, dan riwayat pesan.
  - **Internationalization (`LanguageContext.tsx`)**: Pengalih bahasa instan (Bahasa Indonesia & English) yang tersinkronisasi di seluruh komponen.
  - **Pusat Manajemen Berita (`/admin/berita`)**: Antarmuka bagi pengelola sekolah untuk mengelola publikasi artikel berita.

### 3.2. Backend API Service
- **Bahasa**: Go (Golang) 1.25.0.
- **Arsitektur Dual-Engine**:
  - **Fiber v2 (Default)**: Diimplementasikan di `src/api/fiber_routes.go` untuk throughput tinggi dan latensi rendah.
  - **Gin**: Diimplementasikan di `src/api/{health,jurusan,news,chatbot}` sebagai opsi engine alternatif.
  - Pemilihan engine dikendalikan secara dinamis melalui environment variable `SERVER_ENGINE` (`fiber` atau `gin`).
- **Data Access Layer**: GORM v1.31 dengan driver PostgreSQL dan Pure-Go SQLite.

---

## 4. Penyimpanan Data (Data Stores)

### 4.1. Primary Database
- **Produksi & Staging**: PostgreSQL di Supabase atau Neon via connection string `DATABASE_URL`.
- **Pengembangan Lokal**: Pure-Go SQLite (`file:smktelkom_dev.db?cache=shared`) via driver `github.com/glebarez/sqlite`. Driver ini tidak membutuhkan CGO/GCC sehingga dapat berjalan di sistem operasi mana pun tanpa instalasi toolchain tambahan.
- **Model & Skema**:
  - `models.Jurusan`: Menyimpan kode, nama, slug, deskripsi, array `skills` (disimpan via `serializer:json`), array `prospek_karier`, dan path gambar cover.
  - `models.News`: Menyimpan title, slug, category, day, month, dateFormatted, time, image, summary, content, dan author.
- **Auto-Seeder**: Inisialisasi awal menyisipkan data resmi 2 program keahlian (**SIJA 4 Tahun** dan **TJAT 3 Tahun**) serta artikel berita unggulan jika tabel masih kosong.

### 4.2. Penyimpanan Media (Media Store)
- **Penyedia**: Cloudinary.
- **Strategi Hibrida**:
  - **Foto Konten** (foto guru, fasilitas, berita, kegiatan): Dioptimalkan melalui Cloudinary CDN dengan transformasi dinamis (`f_auto,q_auto`, responsive width, dan smart face detection `g_face`).
  - **Vektor & Aset Statis** (format SVG, ikon kecil, dan logo resmi Telkom Schools): Disajikan langsung dari folder lokal `public/` agar menghemat kuota CDN.
- **Peralatan**: Skrip CLI `scripts/sync-cloudinary.mjs` untuk audit ukuran, dry-run, dan upload massal yang menghasilkan `frontend/src/lib/cloudinary-manifest.json`.

---

## 5. Integrasi Eksternal (External Integrations)

| Layanan | Peran | Metode Integrasi |
|---|---|---|
| **NexusRouter AI Gateway** | Menjawab pertanyaan seputar profil sekolah, jurusan, dan informasi PPDB | HTTP POST proxy dari backend Go (`/api/chatbot/message`) ke `https://fahlyce.vercel.app/api/v1/skomda/chat` |
| **Cloudinary API** | Penyimpanan gambar terkompresi dan pengiriman CDN | REST API + Signed Upload Parameter (`/api/cloudinary/sign`) |
| **Google Maps** | Menampilkan lokasi kampus SMK Telkom Sidoarjo di footer | Iframe embed resmi terenkapsulasi aman |

---

## 6. Lingkungan Pengembangan & Standar QA

### 6.1. Menjalankan Backend
```bash
cd backend
go run ./src/cmd/server
```

### 6.2. Menjalankan Frontend
```bash
cd frontend
npm run dev
```

### 6.3. Standar Kualitas (Quality Assurance Gate)
Sebelum rilis atau merge kode, verifikasi berikut wajib berstatus lulus:
1. `npm run typecheck` di `frontend/`: Wajib 0 error TypeScript.
2. `npm run lint` di `frontend/`: Wajib 0 warning dan 0 error ESLint.
3. `npm run build` di `frontend/`: Memastikan kompilasi SSG dan bundle Next.js bersih.
4. `go vet ./...` di `backend/`: Validasi kebenaran kode Go.
5. `go test -v ./...` di `backend/`: Memastikan semua unit test model dan handler lulus.

---

## 7. Rencana Pengembangan Lanjutan (Future Roadmap)

- **Portal Direktori Alumni & BKK**: Formulir pendaftaran alumni terverifikasi dan papan lowongan kerja mitra industri.
- **VR Virtual Campus Tour**: Integrasi penampil 360 derajat fasilitas sekolah.
- **Autentikasi Staf Pengelola**: Penerbitan JWT untuk pengamanan akses penuh ke endpoint rute manajemen berita.

---

## 8. Identifikasi Dokumen

- **Nama Proyek**: SMK Telkom Sidoarjo Website Redesign
- **Status Arsitektur**: Aktif & Tersinkronisasi Penuh
- **Terakhir Diperbarui**: September 2026