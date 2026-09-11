# SMK Telkom Sidoarjo: Official Website Redesign

Repositori resmi website **SMK Telkom Sidoarjo**, dibangun menggunakan teknologi modern berbasis **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS** pada sisi frontend dan **Go (Fiber v2 / Gin) + GORM (Supabase PostgreSQL / SQLite fallback)** pada sisi backend.

---

## 📚 Program Keahlian Resmi

SMK Telkom Sidoarjo menyelenggarakan 2 program keahlian vokasi unggulan:

### 1. SIJA: Sistem Informasi Jaringan dan Aplikasi (Program 4 Tahun)
Program keahlian 4 tahun yang mendalami rekayasa perangkat lunak modern, arsitektur basis data skala besar, infrastruktur jaringan komputer, dan sistem cloud enterprise.
- **Software Engineering**: Membangun aplikasi web, mobile, dan sistem informasi modern.
- **Database & Cloud Computing**: Manajemen basis data relasional/NoSQL dan implementasi cloud computing.
- **Networking & Cybersecurity**: Konfigurasi jaringan tingkat lanjut dan keamanan sistem informasi.
- **Prospek Karier**: Software Engineer, Full Stack Developer, Mobile Developer, Database Administrator, IT Security Analyst, Cloud Engineer.

### 2. TJAT: Teknik Jaringan Akses Telekomunikasi (Program 3 Tahun)
Program keahlian 3 tahun yang berfokus pada teknologi akses telekomunikasi modern, instalasi transmisi fiber optik, dan optimalisasi jaringan nirkabel.
- **Telecommunication Systems**: Prinsip sistem telekomunikasi seluler dan transmisi data.
- **Fiber Optic Technology**: Instalasi, pengukuran (OTDR), splicing, dan perawatan jaringan fiber optik.
- **Wireless & Radio Communication**: Perencanaan dan optimalisasi jaringan nirkabel (4G/5G, IoT, Microwave).
- **Prospek Karier**: Network Engineer, Fiber Optic Specialist, Telecommunication Field Engineer, Wireless Network Administrator, ISP Specialist.

---

## 🛠️ Stack Teknologi

| Lapisan | Teknologi | Keterangan |
|---|---|---|
| **Frontend** | Next.js 16.3.0 (App Router), React 19.2.8 | Server-Side Rendering (SSR), Static Generation (SSG), Turbopack |
| **Styling & UI** | Tailwind CSS 3.4.17, Framer Motion 11.15.0 | Design system editorial-modern, micro-interactions, responsive |
| **Tipografi** | Plus Jakarta Sans & Poppins | Dimuat via Google Fonts di `layout.tsx` |
| **Backend API** | Go (Golang) 1.25.0 | Arsitektur Dual-Engine: Fiber v2 (default) & Gin switchable |
| **ORM & Database**| GORM v1.31 | Supabase PostgreSQL (Cloud) dengan fallback SQLite (`smktelkom_dev.db`) |
| **Media CDN** | Cloudinary API | Kompresi dinamis (`f_auto,q_auto`), smart face crop (`g_face`), strategi hibrida |
| **AI Chatbot** | NexusRouter AI Gateway | Asisten cerdas dengan fallback otomatis ke kontak resmi Humas |
| **Internasionalisasi**| Custom React Context i18n | Multi-bahasa Bahasa Indonesia (`id.json`) dan English (`en.json`) |

---

## 🌟 Fitur Utama yang Telah Diimplementasikan

1. **Struktur Halaman Lengkap**:
   - **Beranda (`/`)**: Hero dengan statistik melayang, Sambutan Kepala Sekolah, Keunggulan Sekolah, Marquee mitra industri, Tab interaktif Jurusan SIJA & TJAT, Berita Terbaru, dan Footer dengan peta Google Maps.
   - **Tentang Kami**: Profil Sekolah (`/tentang-kami/profil-sekolah`), Hubungan Industri (`/tentang-kami/hub-industri`), Prestasi (`/tentang-kami/prestasi`), Sarana & Fasilitas (`/tentang-kami/fasilitas`), Profil Guru & Tenaga Kependidikan (`/tentang-kami/profil-guru`), dan Akomodasi/Asrama (`/tentang-kami/akomodasi`).
   - **Program**: Profil Jurusan (`/program/profil-jurusan`), Ekstrakurikuler (`/program/ekstrakurikuler`), Digital Talent Program (`/program/digital-talent`), dan Program Karakter TS21 (`/program/ts21`).
   - **Pusat Informasi**: Katalog Berita (`/informasi/berita`), Baca Berita Dinamis (`/berita/[slug]`), Pengumuman Kelulusan (`/informasi/pengumuman-kelulusan`), dan Penerapan K3 (`/informasi/penerapan-k3`).
   - **Unit Khusus**: Teaching Factory (`/tefa`) dan Unduh Dokumen/Brosur PPDB (`/unduh-informasi`).
2. **Pusat Manajemen Berita (Admin CMS)**:
   - Halaman `/admin/berita` untuk staff humas: menambah, menyunting, mencari, memfilter per kategori, dan menghapus artikel dengan preview kartu berita langsung.
3. **Pencarian Cepat Global (Global Search Modal)**:
   - Komponen `NavbarSearch` dengan shortcut `Cmd+K` atau `Ctrl+K` untuk mencari rute halaman, jurusan, dan berita secara cepat.
4. **Asisten Virtual Cerdas (Skomda Intelligence Chatbot)**:
   - Widget obrolan mengapung (`SkomdaChatWidget`) terintegrasi dengan backend Go, mendukung format Markdown, tombol rekomendasi pertanyaan, dan pesan fallback informatif.
5. **Dukungan Dua Bahasa (Bilingual)**:
   - Pengalih bahasa instan (ID / EN) pada navigasi atas tanpa refresh halaman.
6. **Pipeline Optimalisasi Media Cloudinary**:
   - Skrip audit & upload otomatis (`scripts/sync-cloudinary.mjs`) untuk menjaga ukuran repositori tetap ringan dan mempercepat waktu muat halaman.

---

## 📁 Struktur Direktori Repositori

```
Skomda-website/
├── backend/                  # Service API Backend Go
│   ├── src/
│   │   ├── api/              # Route handlers (health, jurusan, news, chatbot, fiber_routes)
│   │   ├── client/           # Integrasi eksternal (cloudinary)
│   │   ├── cmd/
│   │   │   ├── fiber/        # Entrypoint khusus Fiber
│   │   │   └── server/       # Unified entrypoint (Fiber & Gin switchable)
│   │   ├── config/           # Konfigurasi env & inisialisasi GORM DB
│   │   └── models/           # Definisi model GORM (Jurusan, News)
│   ├── smktelkom_dev.db      # SQLite local development database
│   ├── Dockerfile
│   └── go.mod
├── frontend/                 # Aplikasi Web Client Next.js 16
│   ├── public/               # File statis, logo, & vektor SVG
│   ├── src/
│   │   ├── app/              # Next.js App Router (15+ rute halaman)
│   │   ├── components/       # Komponen UI, layout, navbar, chatbot, sections
│   │   ├── context/          # Provider status bahasa (LanguageContext)
│   │   ├── data/             # Data terstruktur (guru, dsb)
│   │   ├── lib/              # Helper Cloudinary & manifest gambar
│   │   ├── locales/          # Terjemahan id.json dan en.json
│   │   └── services/         # Klien API fetch ke backend Go
│   ├── package.json
│   └── tailwind.config.ts
├── docs/                     # Dokumentasi arsitektur, PRD, alur kerja, desain
│   ├── AGENTS.md
│   ├── ARCHITECTURE.md
│   ├── PRD.md
│   ├── WORKFLOW.md
│   └── design.md
├── scripts/
│   └── sync-cloudinary.mjs   # Skrip audit & sinkronisasi Cloudinary
└── README.md
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### 1. Menjalankan Backend (Go)
Pastikan Go sudah terpasang di komputer Anda.

```bash
cd backend
# Menjalankan dengan engine Fiber (default & performa tinggi):
go run ./src/cmd/server

# Atau jalankan dengan dedicated Fiber runner:
# go run ./src/cmd/fiber

# Jika ingin menggunakan engine Gin:
# $env:SERVER_ENGINE="gin"; go run ./src/cmd/server
```
Backend akan aktif di `http://localhost:8080`.

### 2. Menjalankan Frontend (Next.js)
Pastikan Node.js (v18+) sudah terpasang.

```bash
cd frontend
npm install
npm run dev
```
Buka browser di `http://localhost:3001` (atau `http://localhost:3000`).

### 3. Menjalankan Skrip Audit Media (Cloudinary)
```bash
# Audit ukuran aset dan pembuatan manifest lokal:
node scripts/sync-cloudinary.mjs

# Upload langsung ke Cloudinary (memerlukan CLOUDINARY_URL di backend/.env):
node scripts/sync-cloudinary.mjs --upload
```

---

## 🧪 Panduan Quality Assurance (QA)

Sebelum melakukan deployment atau commit besar, jalankan pengujian berikut:

### Backend
```bash
cd backend
go vet ./...
go test -v ./...
```

### Frontend
```bash
cd frontend
npm run typecheck   # Verifikasi type safety TypeScript (harus 0 error)
npm run lint        # Verifikasi aturan ESLint (harus 0 warning/error)
npm run build       # Validasi kompilasi bundle produksi Next.js
```
