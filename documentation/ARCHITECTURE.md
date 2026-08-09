# Architecture Overview
This document serves as a critical, living template designed to equip agents with a rapid and comprehensive understanding of the codebase's architecture, enabling efficient navigation and effective contribution from day one. Update this document as the codebase evolves.

## 1. Project Structure

```
smktelkom-web/
├── backend/                      # Server-side Go/Gin API
│   ├── src/
│   │   ├── api/                  # Route handlers (chatbot, alumni, lowongan, berita, jurusan, admin)
│   │   │   ├── chatbot/
│   │   │   ├── alumni/
│   │   │   ├── lowongan/
│   │   │   ├── berita/
│   │   │   ├── jurusan/
│   │   │   └── admin/
│   │   ├── client/               # Business logic & service layer
│   │   │   ├── llm/               # LLM proxy + RAG context builder (chatbot)
│   │   │   ├── cloudinary/        # Signed upload, transformation helpers
│   │   │   └── auth/              # JWT issuing/verification, role checks
│   │   ├── models/                # DB models (User, Alumni, Lowongan, Berita, Jurusan, MarketplaceItem, ChatbotLog)
│   │   └── utils/                 # Validation, rate limiting, logging helpers
│   ├── config/                    # Env config loader, per-environment settings
│   ├── tests/                     # Go unit & integration tests
│   └── Dockerfile
├── frontend/                     # Next.js 15 (App Router) client app
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/       # Beranda, Jurusan, DTP, Berita, VR Tour, Kontak
│   │   │   ├── alumni/            # Direktori, form daftar, edit profil
│   │   │   ├── bkk/
│   │   │   ├── marketplace/
│   │   │   └── admin/             # Dashboard staff (protected)
│   │   ├── components/
│   │   │   ├── ui/                # Primitives (button, card, dsb)
│   │   │   ├── layout/             # Navbar, footer
│   │   │   ├── chatbot/            # Widget chatbot (calls backend API)
│   │   │   └── sections/
│   │   ├── services/               # Frontend API clients (fetch wrapper ke backend Go)
│   │   ├── lib/
│   │   │   ├── data.ts             # Konten editable terstruktur
│   │   │   ├── cloudinary.ts       # Client-side loader/transform URL builder
│   │   │   └── seo.ts              # Metadata helper per halaman
│   │   └── content/                # Markdown untuk jurusan, berita (fallback/cache lokal)
│   ├── public/
│   ├── tests/
│   └── package.json
├── common/                       # Shared types & utils lintas frontend/backend
│   ├── types/                     # Kontrak TypeScript (dijaga sinkron manual dgn Go structs, atau digenerate)
│   └── utils/
├── docs/                          # PRD, arsitektur, workflow, agents (dokumen ini + 01/03/04)
├── scripts/                       # Deployment, seed data, migration helper scripts
├── .github/                       # CI/CD (lint, test, build, deploy)
├── .claude/
│   └── agents/                    # Subagent definitions (lihat 03-AGENTS.md)
├── .gitignore
├── README.md
└── ARCHITECTURE.md                # Dokumen ini
```

## 2. High-Level System Diagram

```
[User (siswa/ortu/alumni/staff)]
        │
        ▼
[Frontend: Next.js App (Vercel)]
        │  REST/JSON (HTTPS)
        ▼
[Backend: Go/Gin API] ──────────────▶ [Postgres: data alumni, lowongan, berita, jurusan]
        │            │
        │            └────────────▶ [Cloudinary: media/gambar]
        │
        └──────────────────────────▶ [LLM API (Anthropic/OpenAI) — proxy chatbot, RAG context dari Postgres/markdown]

Admin/staff akses [Frontend admin routes] → auth role check → [Backend Go API, endpoint /admin/*]
```

Alur singkat: Frontend Next.js murni presentational + client-side interaction, semua logic bisnis & akses data lewat Backend Go/Gin. Backend jadi satu-satunya pintu ke Postgres, Cloudinary (signed upload), dan LLM API — frontend tidak pernah pegang secret apa pun.

## 3. Core Components

### 3.1. Frontend

**Name:** SMK Telkom Sidoarjo Web App

**Description:** UI publik sekolah (Beranda, Jurusan, DTP, Berita, Alumni & BKK, Marketplace, VR Tour, Kontak) plus dashboard admin terbatas untuk staff moderasi konten. Konsumsi data dari Backend Go via REST API, render SSR/ISR untuk SEO.

**Technologies:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion.

**Deployment:** Vercel (frontend only — bukan host backend).

### 3.2. Backend Services

#### 3.2.1. Core API Service

**Name:** SMK Telkom Sidoarjo API (`backend/`)

**Description:** Satu service Go/Gin yang menangani seluruh domain: autentikasi alumni & admin, CRUD berita/jurusan/lowongan/marketplace, moderasi alumni, dan proxy chatbot ke LLM API dengan RAG context. Dipisah secara modular di dalam `src/api/*` per domain, tapi dideploy sebagai satu binary/service (belum perlu microservices di skala sekolah ini).

**Technologies:** Go, Gin, Prisma-equivalent di Go (GORM atau sqlc), JWT untuk auth.

**Deployment:** Vercel Go serverless runtime (opsi ringan) atau container terpisah di Fly.io/Railway kalau butuh koneksi persisten (mis. untuk rate-limit state lokal) — pilih salah satu saat kickoff, dicatat di `docs/`.

## 4. Data Stores

### 4.1. Primary Database

**Name:** SMK Telkom Primary DB

**Type:** PostgreSQL (hosting: Supabase atau Neon)

**Purpose:** Menyimpan seluruh data terstruktur situs: profil alumni, lowongan BKK, berita, jurusan, item marketplace, log chatbot.

**Key Schemas/Tables:** `users` (alumni + admin), `lowongan`, `berita`, `jurusan`, `marketplace_items`, `chatbot_logs`.

### 4.2. Media Store

**Name:** Cloudinary Media Store

**Type:** Cloudinary (object storage + CDN + transformation)

**Purpose:** Semua gambar (foto jurusan, cover berita, foto profil alumni, produk marketplace) disimpan & dioptimasi di sini (`f_auto,q_auto`, responsive delivery). Upload selalu lewat signed request dari Backend Go, bukan langsung dari client.

### 4.3. Rate Limit / Cache (opsional, disiapkan kalau traffic naik)

**Name:** Upstash Redis

**Type:** Redis (serverless)

**Purpose:** Rate limiting endpoint publik (`/chatbot`, form alumni/lowongan) dan cache ringan untuk hasil retrieval RAG chatbot.

## 5. External Integrations / APIs

**Service Name:** Anthropic/OpenAI LLM API
**Purpose:** Menjawab pertanyaan chatbot FAQ berbasis konten resmi situs (RAG).
**Integration Method:** REST API, dipanggil dari Backend Go (`src/client/llm/`), key disimpan sebagai env var backend saja.

**Service Name:** Cloudinary
**Purpose:** Optimasi & delivery media (gambar).
**Integration Method:** REST API + signed upload dari backend.

**Service Name:** Google Search Console
**Purpose:** Submit sitemap, monitor indexing & performa pencarian.
**Integration Method:** Sitemap XML (`frontend/src/app/sitemap.ts`) + verifikasi manual.

**Service Name:** LinkedIn (opsional, fase P2)
**Purpose:** Social proof alumni/sekolah.
**Integration Method:** Link/badge statis, embed opsional (bukan API resmi kecuali dibutuhkan nanti).

## 6. Deployment & Infrastructure

**Cloud Provider:** Vercel (frontend) + Fly.io/Railway atau Vercel Go runtime (backend) — final keputusan dicatat sebelum Fase 1 mulai.

**Key Services Used:** Vercel (Next.js hosting, CDN, ISR), Supabase/Neon (Postgres), Cloudinary (media), Upstash (rate limit, opsional).

**CI/CD Pipeline:** GitHub Actions — pipeline terpisah untuk `frontend/` (lint, type-check, build, deploy Vercel) dan `backend/` (go vet, go test, build, deploy).

**Monitoring & Logging:** Vercel Analytics (frontend, Core Web Vitals), structured logging di Go (mis. `zerolog`) dikirim ke provider log sederhana (mis. Better Stack/Logtail) — hindari over-engineering untuk skala proyek ini.

## 7. Security Considerations

**Authentication:** JWT diterbitkan oleh Backend Go — alumni login via email OTP atau OAuth Google, admin login via kredensial staff. Token disimpan httpOnly cookie di frontend.

**Authorization:** RBAC sederhana dua role (`alumni`, `admin`). Semua endpoint `/admin/*` di backend wajib cek role di server — tidak boleh mengandalkan penyembunyian UI di frontend saja.

**Data Encryption:** TLS wajib di semua koneksi (frontend↔backend, backend↔Postgres, backend↔LLM/Cloudinary). Data sensitif alumni (kontak) tidak dienkripsi khusus di rest kecuali kebijakan sekolah minta lebih — cukup andalkan enkripsi at-rest bawaan Supabase/Neon di awal.

**Key Security Tools/Practices:** Validasi input pakai `validator` Go tag di setiap request body; rate limiting endpoint publik (form + chatbot); honeypot/captcha di form registrasi alumni & lowongan; secret hanya di env var backend, tidak pernah di-commit atau diekspos ke frontend.

## 8. Development & Testing Environment

**Local Setup Instructions:** Lihat `README.md` — ringkas: `docker-compose up` untuk Postgres lokal, `cd backend && go run ./src/cmd/server`, `cd frontend && npm run dev`.

**Testing Frameworks:** Go — `testing` bawaan + `testify` untuk backend; Jest/Vitest + React Testing Library untuk frontend.

**Code Quality Tools:** `golangci-lint` untuk backend; ESLint + Prettier + `tsc --noEmit` untuk frontend.

## 9. Future Considerations / Roadmap

- Pertimbangkan pisah `chatbot` jadi service terpisah kalau volume trafik/embedding search jadi berat (saat ini masih dalam satu Go service).
- Tambah pgvector di Postgres untuk RAG embedding search yang lebih akurat (v1 masih boleh keyword-based).
- Evaluasi migrasi rate-limit dari in-memory ke Redis begitu traffic form/chatbot mulai signifikan.
- Multi-bahasa penuh (EN) untuk konten utama, bukan cuma chatbot, jika ada kebutuhan siswa/ortu internasional.

## 10. Project Identification

**Project Name:** SMK Telkom Sidoarjo — Website Redesign

**Repository URL:** _(isi setelah repo dibuat)_

**Primary Contact/Team:** Fah (Full Stack Engineer, freelance)

**Date of Last Update:** 2026-08-09

## 11. Glossary / Acronyms

**DTP:** Digital Talent Program — program spesialisasi unggulan sekolah dengan 9 bidang.

**BKK:** Bursa Kerja Khusus — unit penyalur kerja/lowongan resmi sekolah vokasi untuk alumni.

**RAG:** Retrieval-Augmented Generation — teknik menjawab pertanyaan chatbot dengan mengambil konteks relevan dari data situs sebelum memanggil LLM, supaya jawaban akurat dan tidak mengarang.

**ISR:** Incremental Static Regeneration — fitur Next.js untuk regenerasi halaman statis secara periodik tanpa full rebuild.

**Teaching Factory:** Model pembelajaran vokasi di mana siswa memproduksi produk/jasa nyata sebagai bagian kurikulum (dasar dari fitur Student Marketplace).