# Frontend: SMK Telkom Sidoarjo (Next.js 16 App Router)

Aplikasi klien resmi **SMK Telkom Sidoarjo**, dibangun menggunakan arsitektur modern **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**.

---

## 🌟 Fitur & Keunggulan Frontend

1. **Design System Editorial-Modern**:
   - Palet warna resmi Telkom Schools: Telkom Red (`#bc0c11`), Dark `#101828`, Neutral `#364153`, Background `#f3f4f6`.
   - Tipografi terstruktur: **Plus Jakarta Sans** untuk headline & elemen UI primer, serta **Poppins** untuk body text & metadata.
   - Micro-interaction & transisi halus dengan akselerasi perangkat keras via Tailwind CSS & Framer Motion.
2. **Struktur Navigasi & Halaman Lengkap**:
   - **Beranda (`/`)**: Hero interaktif dengan bar statistik melayang, Sambutan Kepala Sekolah, Keunggulan Sekolah, Marquee mitra industri tanpa henti, Tab interaktif Program Keahlian (SIJA & TJAT), dan Berita Pilihan.
   - **Tentang Kami**: Profil Sekolah (`/tentang-kami/profil-sekolah`), Hubungan Industri (`/tentang-kami/hub-industri`), Prestasi Siswa & Guru (`/tentang-kami/prestasi`), Sarana & Fasilitas (`/tentang-kami/fasilitas`), Direktori Guru & Tenaga Kependidikan (`/tentang-kami/profil-guru`), serta Informasi Akomodasi/Asrama (`/tentang-kami/akomodasi`).
   - **Program Keahlian**: Profil Lengkap Jurusan SIJA & TJAT (`/program/profil-jurusan`), Ekstrakurikuler (`/program/ekstrakurikuler`), Digital Talent Program (`/program/digital-talent`), dan Program Karakter TS21 (`/program/ts21`).
   - **Pusat Informasi**: Portal Berita Terpadu (`/informasi/berita`), Halaman Baca Artikel Dinamis (`/berita/[slug]`), Pengumuman Kelulusan (`/informasi/pengumuman-kelulusan`), dan Penerapan K3 (`/informasi/penerapan-k3`).
   - **Unit Khusus**: Teaching Factory (`/tefa`) dan Unduh Brosur/Dokumen PPDB (`/unduh-informasi`).
3. **Pusat Manajemen Berita (Admin CMS)**:
   - Akses via `/admin/berita`: Dashboard pengelola untuk menambah, menyunting, mencari, memfilter, dan menghapus artikel.
   - Dilengkapi pratinjau kartu berita real-time dan opsi unggah gambar cover (Cloudinary / aset lokal).
4. **Pencarian Cepat Global (Global Search Modal)**:
   - Komponen `NavbarSearch` dengan shortcut keyboard `Cmd+K` atau `Ctrl+K`.
   - Menelusuri seluruh halaman situs, program keahlian, dan arsip berita secara instan tanpa reload halaman.
5. **Dukungan Multi-Bahasa (Bilingual i18n)**:
   - Dikelola melalui `LanguageContext` dengan kamus terjemahan Bahasa Indonesia (`src/locales/id.json`) dan Bahasa Inggris (`src/locales/en.json`).
   - Toggle instan pada navbar yang menyimpan preferensi pengunjung.
6. **Asisten Virtual Cerdas (Skomda Intelligence Chatbot)**:
   - Widget melayang `SkomdaChatWidget` yang terhubung ke backend Go (`/api/chatbot/message`).
   - Mendukung format jawaban Markdown, rekomendasi pertanyaan cepat (quick suggestions), riwayat obrolan, dan fallback otomatis ke kontak Humas sekolah saat koneksi offline.
7. **Strategi Media Hibrida (Cloudinary CDN)**:
   - Fungsi pembantu di `src/lib/cloudinary.ts` untuk pengoptimalan format otomatis (AVIF/WebP), kompresi kualitas dinamis (`q_auto`), dan deteksi wajah pada foto guru (`g_face`).
   - Ikon vektor (SVG) dan logo tetap disajikan secara lokal untuk efisiensi transfer data.

---

## 📁 Struktur Direktori

```
frontend/
├── public/
│   ├── figma/              # Aset ilustrasi & elemen desain
│   └── images/             # Gambar lokal terstruktur (berita, jurusan, guru, fasilitas)
├── src/
│   ├── app/                # Next.js App Router (Halaman & Layouts)
│   │   ├── admin/          # Admin CMS (/admin/berita)
│   │   ├── berita/[slug]/  # Halaman detail artikel dinamis
│   │   ├── informasi/      # Sub-rute: berita, pengumuman-kelulusan, penerapan-k3
│   │   ├── program/        # Sub-rute: profil-jurusan, ekstrakurikuler, digital-talent, ts21
│   │   ├── tefa/           # Teaching Factory
│   │   ├── tentang-kami/   # Sub-rute: profil-sekolah, hub-industri, prestasi, fasilitas, dll
│   │   ├── unduh-informasi/# Halaman download dokumen resmi
│   │   ├── globals.css     # Style global & animasi kustom
│   │   ├── layout.tsx      # Root layout (Fonts, LanguageProvider, Chatbot)
│   │   └── page.tsx        # Halaman Beranda
│   ├── components/
│   │   ├── chatbot/        # Komponen widget chatbot (SkomdaChatWidget.tsx)
│   │   ├── layout/         # Navbar, Footer, NavbarSearch
│   │   ├── news/           # Widget share artikel & navigasi berita
│   │   └── sections/       # Komponen seksi per halaman
│   ├── context/
│   │   └── LanguageContext.tsx # Provider state bahasa (ID / EN)
│   ├── data/
│   │   └── teachers.ts     # Data guru & tenaga kependidikan
│   ├── lib/
│   │   ├── cloudinary.ts   # Helper pembentuk URL Cloudinary & optimasi
│   │   └── cloudinary-manifest.json # Manifest pemetaan aset gambar
│   ├── locales/
│   │   ├── en.json         # Terjemahan Bahasa Inggris
│   │   └── id.json         # Terjemahan Bahasa Indonesia
│   └── services/
│       └── news.ts         # Service fetch API berita ke backend Go
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Panduan Menjalankan Frontend

### 1. Instalasi Dependensi
```bash
cd frontend
npm install
```

### 2. Menjalankan Server Development
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3001` (atau `http://localhost:3000`).

### 3. Build & Evaluasi Produksi
Untuk memastikan tidak ada kesalahan kompilasi dan menguji performa Core Web Vitals:
```bash
npm run build
npm run start
```

---

## 🧪 Pemeriksaan Kualitas Kode (QA)

Pastikan semua perintah di bawah ini lulus sebelum melakukan commit atau rilis:

```bash
# 1. Verifikasi tipe data TypeScript (wajib 0 error)
npm run typecheck

# 2. Pemeriksaan aturan kode & standar penulisan ESLint
npm run lint

# 3. Validasi kompilasi build produksi Next.js
npm run build
```
