# Backend — SMK Telkom Sidoarjo (Go/Gin)

## Setup lokal

```bash
cp .env.example .env   # isi DATABASE_URL, LLM_API_KEY, dsb
go mod tidy             # unduh dependency (gin, godotenv)
go run ./src/cmd/server
```

Cek endpoint health: `curl http://localhost:8080/api/health`

## Struktur

- `src/api/**` — route handler per domain (health, nanti: jurusan, berita, alumni, lowongan, chatbot, admin)
- `src/client/**` — service layer/business logic (belum ada, tambahkan seiring fitur: llm, cloudinary, auth)
- `src/models/**` — DB models (belum ada, tambahkan begitu koneksi Postgres disetup)
- `src/config/**` — loader environment variable
- `src/cmd/server/main.go` — entry point, wiring router + route groups

## Catatan penting

- Skeleton ini **belum divalidasi build** di lingkungan pembuatan (sandbox tidak punya Go toolchain terpasang dan tidak ada akses ke proxy.golang.org). Sebelum lanjut development, jalankan `go mod tidy && go build ./...` di mesin lokal untuk memastikan semua dependency ke-resolve dan kode kompilasi bersih.
- Belum ada koneksi database — `src/models` dan integrasi GORM/sqlc perlu ditambahkan sesuai data model di `02-ARCHITECTURE.md`.
- CORS di `main.go` masih manual middleware sederhana, cukup untuk 1 origin (frontend Next.js). Kalau nanti butuh multi-origin (staging, preview URL Vercel), ganti ke `github.com/gin-contrib/cors`.
