# Arsitektur Teknis — SMK Telkom Sidoarjo Website

## 1. Overview

Arsitektur **headless**, dipisah jadi 3 layer utama:

```
┌─────────────────────┐      ┌──────────────────────┐      ┌────────────────────┐
│   Frontend (Vercel)  │────▶│   Backend API (Go/Gin) │────▶│   Data & Media      │
│   Next.js 15+ (App   │      │   REST/JSON API        │      │   - Postgres (data) │
│   Router), TS,        │◀────│   Auth, business logic  │◀────│   - Cloudinary (media)│
│   Tailwind CSS         │      │                        │      │   - Markdown/CMS-lite│
└─────────────────────┘      └──────────────────────┘      └────────────────────┘
         │                              │
         ▼                              ▼
   Chatbot widget  ──────────▶  LLM Proxy Endpoint  ──────▶  Anthropic/OpenAI API
   (client-side)                (rate-limit, RAG context)
```

> Catatan: dokumen sumber nyebut Go/Gin sebagai backend. Karena stack utama lu Next.js/TS, opsi realistis: **(A)** tetap Go/Gin sebagai API terpisah (lebih scalable, cocok kalau backend juga dipakai tim lain/non-JS), atau **(B)** all-in Next.js pakai Route Handlers + Server Actions (lebih cepat dikembangkan solo, satu bahasa). Gua tulis dua-duanya di bawah, tinggal lu pilih pas kickoff.

## 2. Stack Pilihan

| Layer | Opsi A (sesuai dokumen) | Opsi B (all Next.js — direkomendasikan untuk solo dev) |
|---|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind, Framer Motion | sama |
| Backend | Go + Gin, deploy sebagai Vercel Go serverless function atau container terpisah | Next.js Route Handlers (`/app/api/*`) + Server Actions |
| Database | Postgres (Supabase/Neon) | Postgres (Supabase/Neon) — sama |
| Auth (alumni) | JWT custom via Go | Supabase Auth / Auth.js (NextAuth) |
| Media | Cloudinary | Cloudinary — sama |
| Konten statis (berita, jurusan) | Headless CMS ringan (mis. markdown di repo, atau Sanity/Payload) | sama |
| Chatbot | Backend proxy Go → LLM API | Route Handler proxy → LLM API |
| Hosting | Frontend di Vercel, backend di Vercel Go runtime / Fly.io / Railway | Semuanya di Vercel |

**Rekomendasi gua: Opsi B.** Alasan: lu solo freelancer, satu bahasa (TS) di seluruh stack ngurangin context-switching & maintenance burden, deploy 1x ke Vercel, dan skala traffic sekolah gak butuh Go's concurrency benefit secara signifikan di awal. Go/Gin baru worth it kalau nanti backend dipakai lintas platform (mobile app, dsb) atau butuh compute berat.

## 3. Struktur Proyek (Next.js, Opsi B)

```
smktelkom-web/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                 # Beranda
│   │   │   ├── jurusan/
│   │   │   │   ├── page.tsx             # List jurusan
│   │   │   │   └── [slug]/page.tsx      # Detail jurusan
│   │   │   ├── dtp/page.tsx
│   │   │   ├── ekstrakurikuler/page.tsx
│   │   │   ├── berita/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── vr-tour/page.tsx
│   │   │   └── kontak/page.tsx
│   │   ├── alumni/
│   │   │   ├── page.tsx                 # Direktori (public, terbatas)
│   │   │   ├── daftar/page.tsx          # Form registrasi
│   │   │   └── profil/page.tsx          # Edit profil (auth)
│   │   ├── bkk/page.tsx
│   │   ├── marketplace/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── admin/                       # Dashboard staff (protected)
│   │   │   ├── berita/
│   │   │   ├── alumni-moderation/
│   │   │   └── lowongan-moderation/
│   │   └── api/
│   │       ├── chatbot/route.ts         # Proxy ke LLM + RAG context
│   │       ├── alumni/route.ts
│   │       ├── lowongan/route.ts
│   │       └── revalidate/route.ts      # ISR webhook dari CMS
│   ├── components/
│   │   ├── ui/                          # primitives (button, card, dsb)
│   │   ├── layout/                      # navbar, footer
│   │   ├── chatbot/                     # widget chatbot
│   │   └── sections/                    # per-halaman section components
│   ├── lib/
│   │   ├── data.ts                      # (pola yang udah lu pake di STUDIO_VOID)
│   │   ├── cloudinary.ts
│   │   ├── db.ts                        # drizzle/prisma client
│   │   ├── auth.ts
│   │   └── seo.ts                       # metadata helper per halaman
│   ├── content/                         # markdown untuk jurusan, DTP, berita
│   │   ├── jurusan/*.md
│   │   └── berita/*.md
│   └── styles/
├── prisma/ (atau drizzle/)
│   └── schema.prisma
├── public/
├── CLAUDE.md
├── .claude/
│   └── agents/
└── next.config.ts
```

## 4. Data Model (ringkas)

```
User (alumni)
- id, email, nama, angkatan, jurusan, pekerjaan_saat_ini, linkedin_url, status (pending/approved), created_at

Lowongan (BKK)
- id, mitra_nama, posisi, deskripsi, kontak, status (pending/approved/expired), created_at

Berita
- id, judul, slug, kategori (prestasi/pengumuman/event), konten (markdown), cover_image, published_at

Jurusan
- id, nama, slug, deskripsi, skill[], prospek_karier[], gambar

MarketplaceItem
- id, jurusan_id, judul, deskripsi, gambar[], kontak_pemesanan

ChatbotLog
- id, pertanyaan, terjawab (bool), timestamp
```

## 5. Chatbot: Alur RAG Sederhana

1. User kirim pertanyaan ke widget → POST `/api/chatbot`.
2. Route handler ambil query, cari konten relevan dari `content/*.md` + tabel `Jurusan`/`Berita` (embedding search atau keyword search sederhana untuk v1 — embedding pakai pgvector kalau mau lebih akurat).
3. Susun prompt: system prompt (brand voice, batasan jawab) + context yang diambil + pertanyaan user.
4. Panggil LLM API (lihat `anthropic_api_in_artifacts` pattern kalau mau demo cepat, atau server-side Anthropic SDK untuk production).
5. Jika confidence rendah / tidak ada context relevan → jawab template "belum ada info, hubungi admin di [kontak]" — **jangan hallucinate**.
6. Log pertanyaan (terjawab/tidak) ke `ChatbotLog` untuk analitik gap konten.

## 6. Image Pipeline (Cloudinary)

- Semua upload (admin dashboard) langsung ke Cloudinary via signed upload.
- Render pakai transformation URL: `f_auto,q_auto,c_fill,w_auto` + `srcset` responsive.
- Next.js `<Image>` component dengan custom loader Cloudinary, atau `next-cloudinary` package.

## 7. SEO Implementation

- `generateMetadata()` per route (App Router) — title/description unik per halaman.
- `app/sitemap.ts` dinamis dari daftar jurusan + berita.
- `app/robots.ts`.
- JSON-LD `EducationalOrganization` schema di root layout.
- ISR (`revalidate`) untuk halaman berita/jurusan biar tetap fresh tanpa rebuild penuh.

## 8. Auth & Permission

- Alumni: email OTP atau Google OAuth (lewat Auth.js) — akun ringan, cuma buat edit profil sendiri.
- Admin/staff: role terpisah (`role: admin`) untuk akses `/admin/*` — proteksi via middleware Next.js cek session + role.

## 9. Performance & Hosting

- Vercel (frontend + API routes) — Hobby/Pro tier sesuai kebutuhan traffic.
- Supabase/Neon Postgres (free tier cukup untuk awal).
- Cloudinary free tier (25 credit/bulan cukup untuk sekolah skala menengah).
- Edge caching untuk halaman statis (jurusan, DTP) via ISR.
- Core Web Vitals dimonitor via Vercel Analytics + Lighthouse CI di pipeline.

## 10. Security Checklist

- Validasi & sanitize semua input form (alumni, lowongan) — cegah XSS/spam.
- Rate limit `/api/chatbot` dan form submission (mis. Upstash Ratelimit).
- CAPTCHA/honeypot di form publik (registrasi alumni, lowongan).
- Admin routes wajib auth + role check di server (bukan cuma client-side hide).
- Environment secrets (LLM API key, DB url, Cloudinary secret) via Vercel env vars, never commit.
