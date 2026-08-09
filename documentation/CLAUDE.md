# CLAUDE.md — SMK Telkom Sidoarjo Website

Instruksi project-level untuk Claude Code. File ini otomatis dibaca tiap sesi.

## Ringkasan Proyek

Redesign website sekolah SMK Telkom Sidoarjo. Stack: **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma/Postgres + Cloudinary**. Lihat `01-PRD.md` dan `02-ARCHITECTURE.md` di root repo untuk spek lengkap sebelum mulai kerja apa pun.

## Aturan Kerja

- **Bahasa komunikasi:** Bahasa Indonesia, casual, langsung ke poin (gaya lu/gua kalau lagi diskusi santai, tapi commit message & kode comment tetap Bahasa Indonesia/Inggris formal).
- **Konten editable** (teks jurusan, DTP, dsb) selalu di `src/lib/data.ts` atau `src/content/**/*.md` — JANGAN hardcode string panjang di dalam komponen `.tsx`.
- **Desain**: baca `/mnt/skills/public/frontend-design/SKILL.md` sebelum bikin/ubah UI apa pun. Hindari layout generik ala template — harus terasa intentional.
- **Aksesibilitas & SEO bukan opsional**: setiap halaman baru wajib punya `generateMetadata()`, alt text di semua gambar, dan heading hierarchy yang benar. Ini dicek `qa-reviewer` agent sebelum dianggap selesai.
- **Jangan pernah** commit `.env`, API key, atau credential apa pun.
- **Gambar**: selalu lewat Cloudinary dengan `f_auto,q_auto` — jangan import gambar mentah besar ke `/public` kecuali asset kecil (favicon, logo svg).
- **Chatbot**: jawaban HARUS berbasis konten resmi situs (RAG). Kalau tidak ada context relevan, fallback ke "belum ada info, hubungi admin" — jangan biarkan model mengarang kebijakan sekolah (info PPDB, biaya, jadwal, dsb sensitif kalau salah).

## Subagents

Proyek ini pakai 4 subagent di `.claude/agents/` (detail di `03-AGENTS.md`):
- `frontend-builder` — komponen UI & halaman marketing
- `backend-integrator` — API routes, database, auth, integrasi eksternal
- `content-seo` — copywriting, metadata, sitemap
- `qa-reviewer` — gate kualitas sebelum fitur dianggap selesai

Delegasikan task ke agent yang sesuai domainnya. Kalau task lintas domain (mis. "buat halaman alumni lengkap dengan form + API"), pecah jadi beberapa langkah dan panggil agent berbeda per langkah.

## Perintah Umum

```bash
npm run dev          # local dev server
npm run build         # production build — WAJIB lulus sebelum lapor selesai
npm run lint          # eslint
npx tsc --noEmit       # type check
npx prisma migrate dev # jalanin migration setelah ubah schema
```

## Struktur Referensi Cepat

- `src/app/(marketing)/**` — halaman publik (Beranda, Jurusan, DTP, Berita, VR Tour, Kontak)
- `src/app/alumni/**`, `src/app/bkk/**`, `src/app/marketplace/**` — fitur P1
- `src/app/admin/**` — dashboard staff, protected
- `src/app/api/**` — semua backend logic
- `src/content/**` — markdown konten (jurusan, berita)
- `src/lib/data.ts` — data terstruktur editable (mirip pola di proyek STUDIO_VOID)

## Definition of Done (per fitur)

1. `npm run build` & `tsc --noEmit` lolos tanpa error.
2. Tidak ada broken link/button (cek manual atau via `qa-reviewer`).
3. Semua gambar punya alt text, semua halaman punya metadata unik.
4. Sudah direview oleh `qa-reviewer` agent.
5. Konten sudah dalam Bahasa Indonesia yang benar, bukan lorem ipsum/placeholder (kecuali memang belum ada data asli — tandai jelas dengan komentar `// TODO: konten asli dari sekolah`).
