# CLAUDE.md — SMK Telkom Sidoarjo Website

Instruksi project-level untuk Claude Code. File ini otomatis dibaca tiap sesi.

## Ringkasan Proyek

Redesign website sekolah SMK Telkom Sidoarjo. Stack: **Frontend Next.js 15 (App Router) + TypeScript + Tailwind CSS**, **Backend Go/Gin + Postgres (GORM/sqlc)**, media di **Cloudinary**. Frontend dan backend adalah dua service terpisah (lihat `docs/ARCHITECTURE.md` untuk struktur `backend/` vs `frontend/`). Lihat `docs/PRD.md` dan `docs/ARCHITECTURE.md` di root repo untuk spek lengkap sebelum mulai kerja apa pun.

## Aturan Kerja

- **Bahasa komunikasi:** Bahasa Indonesia, casual, langsung ke poin (gaya lu/gua kalau lagi diskusi santai, tapi commit message & kode comment tetap Bahasa Indonesia/Inggris formal).
- **Aturan Type-Sync Manual (Go <-> TypeScript):** Kalau mengubah struct model Go di `backend/src/models/**`, WAJIB meng-update interface/tipe TypeScript terkait di `frontend/src/services/**` pada commit yang sama. Commit yang mengubah salah satu tanpa yang lain dianggap tidak lengkap.
- **Konten editable** (teks jurusan, DTP, dsb) selalu di `src/lib/data.ts` atau `src/content/**/*.md` — JANGAN hardcode string panjang di dalam komponen `.tsx`.
- **Desain**: baca `/mnt/skills/public/frontend-design/SKILL.md` sebelum bikin/ubah UI apa pun. Hindari layout generik ala template — harus terasa intentional.
- **Aksesibilitas & SEO bukan opsional**: setiap halaman baru wajib punya `generateMetadata()`, alt text di semua gambar, dan heading hierarchy yang benar. Ini dicek `qa-reviewer` agent sebelum dianggap selesai.
- **Jangan pernah** commit `.env`, API key, atau credential apa pun.
- **Gambar**: selalu lewat Cloudinary dengan `f_auto,q_auto` — jangan import gambar mentah besar ke `/public` kecuali asset kecil (favicon, logo svg).
- **Chatbot**: jawaban HARUS berbasis konten resmi situs (RAG). Kalau tidak ada context relevan, fallback ke "belum ada info, hubungi admin" — jangan biarkan model mengarang kebijakan sekolah (info PPDB, biaya, jadwal, dsb sensitif kalau salah).

## Subagents

Proyek ini pakai 4 subagent di `.claude/agents/` (detail di `docs/AGENTS.md`):
- `frontend-builder` — komponen UI & halaman marketing
- `backend-integrator` — API routes, database, auth, integrasi eksternal
- `content-seo` — copywriting, metadata, sitemap
- `qa-reviewer` — gate kualitas sebelum fitur dianggap selesai

Delegasikan task ke agent yang sesuai domainnya. Kalau task lintas domain (mis. "buat halaman alumni lengkap dengan form + API"), pecah jadi beberapa langkah dan panggil agent berbeda per langkah.

## Perintah Umum

**Frontend:**
```bash
cd frontend
npm run dev          # local dev server
npm run build        # production build — WAJIB lulus sebelum lapor selesai
npm run lint         # eslint
npm run typecheck    # type check (tsc --noEmit)
```

**Backend:**
```bash
cd backend
go run ./src/cmd/server   # local dev server
go vet ./...
go test ./...
```

## Struktur Referensi Cepat

- `frontend/src/app/(marketing)/**` — halaman publik (Beranda, Jurusan, DTP, Berita, VR Tour, Kontak)
- `frontend/src/app/alumni/**`, `bkk/**`, `marketplace/**` — fitur P1
- `frontend/src/app/admin/**` — dashboard staff, protected (UI saja — enforcement asli di backend)
- `frontend/src/services/**` — API client yang manggil backend Go, satu-satunya jalur frontend ke data
- `frontend/src/content/**` — markdown konten (jurusan, berita), fallback/cache lokal
- `frontend/src/lib/data.ts` — data terstruktur editable (mirip pola di proyek STUDIO_VOID)
- `backend/src/api/**` — route handler per domain (chatbot, alumni, lowongan, berita, jurusan, admin)
- `backend/src/client/**` — service layer/business logic (llm, cloudinary, auth)
- `backend/src/models/**` — DB models

## Definition of Done (per fitur)

1. `npm run build` & `npm run typecheck` & `npm run lint` lolos tanpa error.
2. `go vet ./...` & `go test ./...` di backend lolos tanpa error.
3. Struct Go & interface TypeScript tersinkronisasi presisi.
4. Tidak ada broken link/button (cek manual atau via `qa-reviewer`).
5. Semua gambar punya alt text, semua halaman punya metadata unik.
6. Sudah direview oleh `qa-reviewer` agent.
7. Konten sudah dalam Bahasa Indonesia yang benar, bukan lorem ipsum/placeholder (kecuali memang belum ada data asli — tandai jelas dengan komentar `// TODO: konten asli dari sekolah`).
