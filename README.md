# SMK Telkom Sidoarjo: Official Website Redesign

Redesign website resmi **SMK Telkom Sidoarjo** berbasis **Next.js 16 (App Router) + TypeScript + Tailwind CSS** di sisi frontend dan **Go (Fiber v2 / Gin) + Supabase PostgreSQL (GORM)** di sisi backend.

---

## 📚 Program Keahlian Utama (Jurusan)

SMK Telkom Sidoarjo memiliki 2 program keahlian vokasi unggulan:

### 1. SIJA: Sistem Informasi Jaringan dan Aplikasi (Program 4 Tahun)
Program keahlian 4 tahun yang mempelajari secara mendalam pemrograman modern, pengelolaan basis data, infrastruktur jaringan, dan sistem informasi enterprise.
- **Software Development**: Membangun aplikasi web, mobile, dan desktop yang fungsional dan modern.
- **Database & Cloud Computing**: Pengelolaan basis data enterprise dan pengoperasian infrastruktur cloud computing.
- **Networking & Cybersecurity**: Pengamanan sistem jaringan dan pencegahan ancaman kejahatan siber.
- **Prospek Kerja**: Software Engineer, Web Developer, Mobile App Developer, Database Administrator, IT Security Specialist, System Analyst.

### 2. TJAT: Teknik Jaringan Akses Telekomunikasi (Program 3 Tahun)
Program keahlian 3 tahun yang berfokus pada teknologi jaringan telekomunikasi, infrastruktur fiber optik, dan sistem komunikasi modern.
- **Telecommunication Networks**: Mempelajari teknologi jaringan telekomunikasi dan sistem komunikasi modern.
- **Fiber Optic Technology**: Instalasi, pemeliharaan (maintenance), dan troubleshooting infrastruktur jaringan fiber optik.
- **Wireless Communication**: Teknologi komunikasi nirkabel (wireless) dan optimalisasi jaringan seluler (4G/5G).
- **Prospek Kerja**: Network Engineer, Telecommunication Technician, Fiber Optic Specialist, Wireless Network Administrator, ISP Technician.

---

## 🛠️ Stack Teknologi

- **Frontend (Next.js)**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion.
- **Backend API (Go High Performance)**: Go (Golang), Fiber Framework v2 & Gin Framework (switchable via `SERVER_ENGINE=fiber|gin`), GORM ORM.
- **Database**: Supabase PostgreSQL (Cloud) dengan fallback otomatis ke SQLite (`smktelkom_dev.db`) untuk pengembangan lokal.
- **Media & Assets**: Cloudinary (`f_auto,q_auto`) dengan Strategi Hibrida (Aset foto dialihkan ke Cloudinary CDN, format SVG/vektor tetap disajikan lokal).
- **Architecture**: Monorepo terpisah bersih (`frontend/` & `backend/`).

---

## 📁 Struktur Proyek

```
skomda-website/
├── backend/            # Service API Backend Go (Fiber & Gin)
│   ├── src/
│   │   ├── api/        # Endpoint handlers (health, jurusan, news, chatbot, cloudinary)
│   │   ├── client/     # Cloudinary helper & signed upload service
│   │   ├── config/     # Database GORM & environment loader (engine switcher)
│   │   ├── models/     # GORM DB Structs (Jurusan, News, dll)
│   │   ├── cmd/server/ # Entrypoint Gin (atau Fiber via SERVER_ENGINE=fiber)
│   │   └── cmd/fiber/  # Entrypoint khusus Fiber
│   ├── .env
│   └── go.mod
├── frontend/           # Aplikasi Client Next.js 16 (App Router)
│   ├── src/
│   │   ├── app/        # App Router Pages
│   │   ├── components/ # UI Primitives, Sections, Layout
│   │   ├── lib/        # Cloudinary helper URL builder (cloudinary.ts)
│   │   └── services/   # Fetch API wrapper ke Backend Go
│   └── package.json
├── scripts/            # Script utilitas (sync-cloudinary.mjs)
├── docs/               # Dokumen PRD, Arsitektur, Workflow
└── README.md
```

---

## 🚀 Cara Menjalankan Proyek Lokal

### 1. Jalankan Backend (Go)
**Pilihan A: Jalankan dengan Fiber Engine (High Performance, Rekomendasi)**
```bash
cd backend
go run ./src/cmd/fiber
# atau:
# $env:SERVER_ENGINE="fiber"; go run ./src/cmd/server
```

**Pilihan B: Jalankan dengan Gin Engine**
```bash
cd backend
go run ./src/cmd/server
```
*Backend akan berjalan di `http://localhost:8080`*.

### 2. Jalankan Frontend (Next.js 16)
```bash
cd frontend
npm run dev
```
*Aplikasi berjalan di `http://localhost:3001` (atau port 3000)*.

### 3. Jalankan Mode Produksi (Untuk Pengujian Lighthouse & Performa Nyata)
```bash
cd frontend
npm run build
npm run start
```

### 4. Audit & Sinkronisasi Gambar ke Cloudinary
```bash
node scripts/sync-cloudinary.mjs
```

---

## 🧪 Pengujian & Quality Assurance (QA)

**Backend Audit:**
```bash
cd backend
go vet ./...
go test ./...
```

**Frontend Audit:**
```bash
cd frontend
npm run typecheck   # Type check TypeScript (0 error)
npm run lint        # ESLint check (0 warning/error)
npm run build       # Production build
```
