# SMK Telkom Sidoarjo — Official Website Redesign

Redesign website resmi **SMK Telkom Sidoarjo** berbasis **Next.js 15 (App Router) + TypeScript + Tailwind CSS** di sisi frontend dan **Go (Gin) + Supabase PostgreSQL (GORM)** di sisi backend.

---

## 📚 Program Keahlian Utama (Jurusan)

SMK Telkom Sidoarjo memiliki 2 program keahlian vokasi unggulan:

### 1. SIJA — Sistem Informasi Jaringan dan Aplikasi (Program 4 Tahun)
Program keahlian 4 tahun yang mempelajari secara mendalam pemrograman modern, pengelolaan basis data, infrastruktur jaringan, dan sistem informasi enterprise.
- **Software Development**: Membangun aplikasi web, mobile, dan desktop yang fungsional dan modern.
- **Database & Cloud Computing**: Pengelolaan basis data enterprise dan pengoperasian infrastruktur cloud computing.
- **Networking & Cybersecurity**: Pengamanan sistem jaringan dan pencegahan ancaman kejahatan siber.
- **Prospek Kerja**: Software Engineer, Web Developer, Mobile App Developer, Database Administrator, IT Security Specialist, System Analyst.

### 2. TJAT — Teknik Jaringan Akses Telekomunikasi (Program 3 Tahun)
Program keahlian 3 tahun yang berfokus pada teknologi jaringan telekomunikasi, infrastruktur fiber optik, dan sistem komunikasi modern.
- **Telecommunication Networks**: Mempelajari teknologi jaringan telekomunikasi dan sistem komunikasi modern.
- **Fiber Optic Technology**: Instalasi, pemeliharaan (maintenance), dan troubleshooting infrastruktur jaringan fiber optik.
- **Wireless Communication**: Teknologi komunikasi nirkabel (wireless) dan optimalisasi jaringan seluler (4G/5G).
- **Prospek Kerja**: Network Engineer, Telecommunication Technician, Fiber Optic Specialist, Wireless Network Administrator, ISP Technician.

---

## 🛠️ Stack Teknologi

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Go (Golang), Gin Framework, GORM ORM.
- **Database**: Supabase PostgreSQL (Cloud) dengan fallback otomatis ke SQLite (`smktelkom_dev.db`) untuk pengembangan lokal.
- **Media & Assets**: Cloudinary (`f_auto,q_auto`).
- **Architecture**: Monorepo terpisah (`frontend/` & `backend/`).

---

## 📁 Struktur Proyek

```
smktelkom-web/
├── backend/            # Service API Backend Go/Gin
│   ├── src/
│   │   ├── api/        # Endpoint handlers (health, jurusan, berita, alumni, dsb)
│   │   ├── config/     # Database GORM & environment loader
│   │   ├── models/     # GORM DB Structs (Jurusan, Berita, dll)
│   │   └── cmd/server/ # Entrypoint main.go
│   ├── .env
│   └── go.mod
├── frontend/           # Service Application Frontend Next.js 15
│   ├── src/
│   │   ├── app/        # App Router Pages ((marketing), jurusan, berita, dll)
│   │   ├── components/ # UI Primitives, Sections, Layout
│   │   ├── services/   # Fetch API wrapper ke Backend Go (ISR 60s)
│   │   └── lib/        # Data statis terstruktur (data.ts)
│   └── package.json
├── docs/               # Dokumen PRD, Arsitektur, Workflow, & Subagent Setup
└── README.md
```

---

## 🚀 Cara Menjalankan Proyek Lokal

### 1. Jalankan Backend (Go)
```bash
cd backend
go run ./src/cmd/server
```
*Backend akan berjalan di `http://localhost:8080`*.

### 2. Jalankan Frontend (Next.js)
```bash
cd frontend
npm run dev
```
*Frontend akan berjalan di `http://localhost:3000`*.

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
npm run build       # Production SSG/ISR build
```
