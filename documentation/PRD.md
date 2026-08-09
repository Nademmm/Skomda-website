# PRD — SMK Telkom Sidoarjo Website Redesign

**Versi:** 1.0
**Status:** Draft
**Owner:** Fah (Full Stack Engineer)
**Target rilis:** TBD (isi setelah scoping sprint)

---

## 1. Latar Belakang & Masalah

Website SMK Telkom Sidoarjo saat ini punya masalah nyata:

| Area | Masalah | Dampak |
|---|---|---|
| Visual | Gambar buram/kompresi jelek, desain ketinggalan zaman | Kesan sekolah "kurang serius" ke calon siswa/orang tua |
| Interaksi | Banyak tombol/link tidak berfungsi (overlay/CSS bug) | Frustrasi user, bounce tinggi |
| Struktur konten | Halaman padat teks, minim heading & visual break | Info penting (jurusan, DTP, alumni) susah discan |
| SEO | Meta tag minim, URL tidak terstruktur | Sulit ditemukan di Google, kalah saing dgn sekolah lain |
| Support | Tidak ada chatbot / FAQ instan | Pertanyaan repetitif membebani staff (telepon/email) |
| A11y & performa | Tidak ada alt text, focus state, gambar tidak dioptimasi | Gagal standar aksesibilitas & mobile-friendly modern |

## 2. Tujuan (Goals)

1. Redesign UI/UX modern, mobile-first, cepat, dan aksesibel.
2. Semua interactive element (tombol, link, CTA) berfungsi 100%.
3. Struktur konten baru yang scannable per jurusan/program.
4. SEO on-page solid: meta tag, heading hierarchy, konten unik per halaman.
5. Chatbot AI 24/7 untuk FAQ (pendaftaran, jadwal, program, dsb).
6. Fitur baru: Alumni Directory + BKK, Student Marketplace (Teaching Factory), VR Campus Tour, integrasi LinkedIn.
7. Performa: Core Web Vitals hijau semua, gambar teroptimasi via Cloudinary.

## 3. Non-Goals (di luar scope v1)

- Sistem PPDB (Penerimaan Peserta Didik Baru) online penuh dengan pembayaran — hanya link/CTA ke sistem eksternal jika ada.
- LMS / e-learning penuh untuk siswa aktif.
- Native mobile app.
- Multi-bahasa penuh selain ID/EN (chatbot boleh multi-bahasa, situs utama ID dulu).

## 4. Target Pengguna

| Persona | Kebutuhan Utama |
|---|---|
| Calon siswa & orang tua | Info jurusan/DTP jelas, cara daftar, biaya, kontak cepat |
| Siswa aktif | Info ekstrakurikuler, kurikulum, event/prestasi |
| Alumni | Update data diri, lihat lowongan BKK, jaringan alumni |
| Industri partner (BKK) | Kirim lowongan, lihat profil sekolah/output siswa |
| Staff/admin sekolah | Update konten berita/event tanpa butuh developer |

## 5. Feature Requirements

### 5.1 Redesign UI/UX (P0)
- Navigasi utama jelas: Beranda, Tentang, Jurusan, Digital Talent Program, Alumni & BKK, Ekstrakurikuler, Berita, Kontak.
- Search bar global.
- Semua gambar via Cloudinary dengan `f_auto,q_auto`, responsive `srcset`.
- Lazy loading untuk gambar di luar viewport.
- Fix semua overlay/`pointer-events` yang memblokir klik.
- Kontras warna WCAG AA minimum, alt text di semua gambar, semantic heading (`h1`→`h3` berurutan).

**Acceptance criteria:**
- Lighthouse Accessibility ≥ 90.
- 0 broken link/button pada audit QA manual.
- Semua halaman punya 1 `<h1>` unik.

### 5.2 Halaman Jurusan (P0)
- List semua jurusan (TKJ, RPL, Multimedia, dst), masing-masing halaman sendiri (bukan duplikat konten).
- Tiap halaman: deskripsi, skill yang diajarkan, prospek karier, ikon/gambar.

### 5.3 Digital Talent Program / DTP (P0)
- Overview program, 9 spesialisasi dengan deskripsi masing-masing.
- Contoh proyek siswa (galeri/portfolio card).
- Update sertifikasi/kurikulum terbaru bila ada.

### 5.4 Alumni & BKK (P1)
- Direktori alumni: form registrasi + profil (nama, angkatan, jurusan, pekerjaan saat ini, kontak opsional).
- Highlight alumni berprestasi.
- Halaman BKK: daftar mitra industri, program penempatan kerja, form lowongan dari mitra (opsional, moderasi admin).

**Acceptance criteria:**
- Alumni bisa daftar & edit profil sendiri (auth sederhana via email/OTP atau Google login).
- Admin bisa approve/reject profil & lowongan sebelum tayang publik.

### 5.5 Student Marketplace / Teaching Factory Showcase (P1)
- Galeri produk/jasa buatan siswa per jurusan (app RPL, kit elektronik TKJ, dsb).
- Bisa berupa showcase read-only di v1 (bukan e-commerce transaksi penuh) — link ke kontak/WA untuk pemesanan.

### 5.6 VR Campus Tour (P2)
- Embed tur 360°/VR (pakai platform pihak ketiga seperti Kuula/Matterport, atau video walkthrough sebagai fallback murah).
- Halaman dedicated + tombol akses dari Beranda.

### 5.7 AI Chatbot (P0)
- Widget floating, non-intrusive, brand voice sekolah.
- Menjawab FAQ: jadwal, pendaftaran, jurusan, kontak, event.
- Basis pengetahuan dari konten resmi situs (RAG dari CMS/markdown, bukan hallucinate).
- Support Bahasa Indonesia (+ Inggris sebagai nice-to-have).
- Analytics: log pertanyaan tak terjawab untuk isi gap konten.
- Update knowledge base saat kebijakan berubah (proses manual/admin-triggered di v1).

**Acceptance criteria:**
- Chatbot menjawab ≥ 80% FAQ umum dengan benar (diuji dengan test set 30 pertanyaan).
- Response time < 3 detik.
- Ada fallback "belum tau, hubungi admin" alih-alih ngarang jawaban.

### 5.8 Berita & Event (P0)
- CMS-lite (markdown/headless) untuk staff update berita tanpa deploy.
- Kategori (Prestasi, Pengumuman, Event).
- Mendukung SEO (fresh content, sitemap otomatis update).

### 5.9 LinkedIn / Social Proof (P2)
- Link/badge LinkedIn sekolah di footer.
- Section "featured alumni" dengan link ke profil LinkedIn (opsional embed feed).

### 5.10 SEO & Content (P0)
- Meta title/description unik per halaman.
- URL terstruktur (`/jurusan/rpl`, `/dtp`, `/alumni`, dst — bukan `?id=123`).
- Sitemap.xml otomatis + submit ke Google Search Console.
- Structured data (Schema.org `EducationalOrganization`) di halaman utama.

## 6. Success Metrics

| Metrik | Baseline | Target 3 bulan pasca-launch |
|---|---|---|
| Lighthouse Performance | (audit dulu) | ≥ 85 |
| Lighthouse Accessibility | (audit dulu) | ≥ 90 |
| Organic traffic | (audit dulu) | +30% |
| Bounce rate | (audit dulu) | -20% |
| Chatbot resolution rate | 0 (belum ada) | ≥ 80% self-service |
| Broken link count | (audit dulu) | 0 |

## 7. Constraints & Assumptions

- Konten resmi (teks jurusan, data alumni existing) perlu disuplai/divalidasi pihak sekolah.
- Data alumni lama (jika ada spreadsheet manual) perlu proses migrasi.
- Budget hosting/tools terbatas → prioritaskan tool gratis/murah (Vercel free/hobby tier, Cloudinary free tier, dsb) sesuai preferensi lu ke tools gratis.
- Chatbot pakai LLM API berbayar (token-based) → perlu estimasi biaya & rate limiting.

## 8. Rollout Plan (ringkas — detail di WORKFLOW.md)

1. **Fase 0** — Audit & content inventory (1 minggu)
2. **Fase 1** — Desain sistem + arsitektur teknis (1-2 minggu)
3. **Fase 2** — Build core pages (Beranda, Jurusan, DTP, Berita) (2-3 minggu)
4. **Fase 3** — Fitur P1 (Alumni/BKK, Marketplace) (2 minggu)
5. **Fase 4** — Chatbot integration + SEO pass (1-2 minggu)
6. **Fase 5** — Fitur P2 (VR Tour, LinkedIn), QA, launch (1 minggu)

## 9. Open Questions

- Siapa yang akan jadi content owner pasca-launch (staff sekolah)?
- Ada budget untuk platform VR tour berbayar atau full DIY (360 camera + self-host viewer)?
- Sistem PPDB eksisting perlu diintegrasikan atau cukup di-link?
- Data alumni existing formatnya seperti apa (Excel, Google Form, tidak ada sama sekali)?
