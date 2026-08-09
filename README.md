# SMK Telkom Sidoarjo — Website Redesign

Starter scaffold sesuai `02-ARCHITECTURE.md` (Opsi A: backend Go/Gin terpisah dari frontend Next.js).

```
smktelkom-web/
├── frontend/   # Next.js 15 (App Router), TypeScript, Tailwind — lihat frontend/README.md
├── backend/    # Go + Gin API — lihat backend/README.md
└── .gitignore
```

## Status saat ini

- ✅ Frontend: scaffold penuh + halaman Beranda sudah jadi dan **lolos `npm run build`**.
- ⚠️ Backend: skeleton struktur + endpoint `/api/health` sudah ditulis, tapi **belum divalidasi build** (butuh `go mod tidy` di mesin dengan akses ke proxy.golang.org).
- ❌ Belum ada: halaman Jurusan/DTP/Alumni/Berita/Kontak, koneksi database, integrasi Cloudinary, chatbot, auth.

## Langkah selanjutnya (urut prioritas, ikuti `04-WORKFLOW.md` Fase 1)

1. `cd backend && go mod tidy && go build ./...` — pastikan skeleton backend kompilasi bersih.
2. Setup Postgres (Supabase/Neon) + tulis `src/models` pertama (mulai dari `Jurusan`, paling sederhana).
3. Bangun halaman `/jurusan` (list + detail) di frontend, connect ke endpoint backend yang baru.
4. Baru lanjut ke fitur lain sesuai urutan di `04-WORKFLOW.md`.

Dokumen pendukung (PRD, arsitektur lengkap, agents, workflow) ada di percakapan sebelumnya / folder `docs/` kalau sudah dipindah ke repo asli.
