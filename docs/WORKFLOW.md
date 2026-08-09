# Workflow — SMK Telkom Sidoarjo Website Redesign

Timeline realistis untuk solo freelancer (lu) dibantu Claude Code + subagents. Estimasi asumsikan kerja part-time di sela kegiatan sekolah/klien lain.

## Fase 0 — Audit & Persiapan (3-5 hari)

| Task | Output | Agent/Tools |
|---|---|---|
| Audit site lama (screenshot, broken link, Lighthouse score) | Laporan audit | manual + Lighthouse CI |
| Kumpulkan konten resmi dari sekolah (teks jurusan, foto, data alumni jika ada) | Google Doc/Sheet mentah | manual (koordinasi sama pihak sekolah) |
| Setup repo, `CLAUDE.md`, `.claude/agents/`, struktur folder | Repo siap | `frontend-builder` (scaffold) |
| Setup Supabase/Neon + Cloudinary account | Kredensial env | manual |

**Gate:** PRD & arsitektur disetujui pihak sekolah (kalau ada stakeholder yang perlu approve) sebelum lanjut Fase 1.

## Fase 1 — Design System & Fondasi Teknis (1-2 minggu)

1. Tentukan design tokens (warna, tipografi, spacing) — konsisten sama identitas Telkom Schools.
2. Setup Tailwind config + komponen primitive (`Button`, `Card`, `Navbar`, `Footer`).
3. Setup Prisma schema awal (User, Berita, Jurusan, dst) + migration pertama.
4. Setup auth dasar (alumni login + admin role).
5. Setup Cloudinary loader + `next-cloudinary`.

**Agent flow:** `frontend-builder` untuk design system → `backend-integrator` untuk schema & auth (paralel jika memungkinkan) → `qa-reviewer` cek fondasi sebelum lanjut.

## Fase 2 — Core Pages (2-3 minggu)

Urutan build (prioritas SEO & first impression duluan):

1. Beranda
2. Jurusan (list + detail per jurusan)
3. Digital Talent Program
4. Berita & Event (+ admin CMS-lite untuk staff)
5. Kontak

**Per halaman, alur kerja:**
```
content-seo (siapkan copy + metadata)
      ↓
frontend-builder (bangun UI dari data.ts/markdown)
      ↓
backend-integrator (kalau butuh data dinamis, mis. berita dari DB)
      ↓
qa-reviewer (checklist a11y/SEO/broken link)
```

**Gate:** Semua core pages lulus `qa-reviewer` checklist sebelum mulai Fase 3.

## Fase 3 — Fitur P1: Alumni, BKK, Marketplace (2 minggu)

1. Form registrasi alumni + halaman edit profil (auth-gated).
2. Direktori alumni publik (dengan moderasi admin sebelum tayang).
3. Halaman BKK + form lowongan dari mitra (moderasi admin).
4. Galeri Student Marketplace per jurusan.
5. Dashboard admin sederhana untuk approve/reject alumni & lowongan.

**Agent flow:** `backend-integrator` duluan (schema, API, auth-gate) → `frontend-builder` (form & UI) → `qa-reviewer`.

## Fase 4 — Chatbot & SEO Pass (1-2 minggu)

1. Bangun endpoint `/api/chatbot` dengan RAG sederhana dari konten yang sudah ada.
2. Buat test set 30 pertanyaan FAQ umum, ukur akurasi jawaban.
3. Widget chatbot di frontend (floating, brand voice).
4. Full SEO audit: sitemap, robots.txt, structured data, meta tag semua halaman.
5. Submit sitemap ke Google Search Console.

**Gate:** Chatbot lulus ≥ 80% test set FAQ sebelum dianggap selesai. Kalau di bawah itu, perbaiki retrieval/context sebelum lanjut, bukan tambah instruksi prompt secara sembarangan.

## Fase 5 — Fitur P2, QA Menyeluruh, Launch (1 minggu)

1. VR Campus Tour (embed platform pihak ketiga atau video walkthrough).
2. LinkedIn integration/badge.
3. Full regression QA: semua halaman, semua device (mobile/tablet/desktop).
4. Lighthouse audit penuh (Performance, A11y, SEO, Best Practices) — semua ≥ target di PRD.
5. Setup monitoring (Vercel Analytics) + backup plan (rollback rencana kalau ada masalah pasca-launch).
6. Soft launch → kumpulkan feedback staff/siswa 3-5 hari → fix cepat → full launch.

## Ritme Kerja Harian/Mingguan (saran)

- Mulai tiap sesi dengan baca ulang `CLAUDE.md` + task list aktif (bisa taruh di `TODO.md` terpisah kalau mau).
- Delegasikan task granular ke agent spesifik — jangan minta 1 agent kerjain semuanya sekaligus (ngurangin resiko context bocor antar domain).
- `qa-reviewer` jalan tiap akhir fitur, bukan cuma di akhir fase — biar bug ketauan lebih awal.
- Commit kecil & sering, per fitur/halaman, biar gampang di-rollback kalau ada yang salah.

## Risk & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Konten dari sekolah telat/tidak lengkap | Mulai build dengan placeholder yang jelas ditandai TODO, jangan blocking seluruh timeline |
| Chatbot ngasih info salah (misal soal biaya/PPDB) | Fallback wajib ke "hubungi admin" untuk topik sensitif, jangan andalkan LLM freeform |
| Data alumni lama berantakan | Sisihkan waktu khusus fase 0 untuk cleaning/migration, jangan digabung fase build |
| Scope creep (fitur P2 masuk lebih awal) | PRD sudah prioritized (P0/P1/P2) — pegang itu sebagai kontrak scope |
