// Semua konten yang berpotensi diedit staff/non-developer dipusatkan di sini.
// Jangan hardcode string konten panjang langsung di komponen .tsx.
// TODO: konten asli dari sekolah — data di bawah masih draft, tandai jelas sebelum launch.

export const site = {
  name: "SMK Telkom Sidoarjo",
  tagline: "Sekolah vokasi telekomunikasi & digital talent di Sidoarjo",
  city: "Sidoarjo, Jawa Timur",
};

export const nav = [
  { label: "Jurusan", href: "/jurusan" },
  { label: "Digital Talent Program", href: "/dtp" },
  { label: "Alumni & BKK", href: "/alumni" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

export type Jurusan = {
  code: string; // kode jurusan resmi, dipakai sebagai eyebrow label
  name: string;
  summary: string;
  skills: string[];
};

// TODO: validasi kode & nama resmi jurusan ke pihak sekolah.
export const jurusanList: Jurusan[] = [
  {
    code: "RPL",
    name: "Rekayasa Perangkat Lunak",
    summary: "Membangun aplikasi web & mobile dari nol — dari desain sistem sampai deployment.",
    skills: ["Pemrograman Web", "Basis Data", "Mobile Development"],
  },
  {
    code: "TKJ",
    name: "Teknik Komputer & Jaringan",
    summary: "Merancang, memasang, dan merawat infrastruktur jaringan dan sistem komputer.",
    skills: ["Jaringan Komputer", "Administrasi Server", "Keamanan Siber Dasar"],
  },
  {
    code: "MM",
    name: "Multimedia",
    summary: "Produksi konten visual, motion graphic, dan editing untuk kebutuhan digital & broadcast.",
    skills: ["Desain Grafis", "Videografi", "Motion Design"],
  },
  {
    code: "TT",
    name: "Teknik Telekomunikasi",
    summary: "Mempelajari sistem transmisi sinyal, jaringan fiber optik, dan infrastruktur telekomunikasi.",
    skills: ["Fiber Optik", "Sistem Transmisi", "Jaringan Seluler"],
  },
];

export const stats = [
  { value: "9", label: "Spesialisasi Digital Talent Program" },
  { value: "4", label: "Jurusan Vokasi Utama" },
  { value: "24/7", label: "Asisten Tanya-Jawab AI" },
];

export type BeritaPreview = {
  slug: string;
  title: string;
  category: "Prestasi" | "Pengumuman" | "Event";
  excerpt: string;
};

// TODO: ganti dengan data berita asli dari CMS/markdown begitu tersedia.
export const beritaPreview: BeritaPreview[] = [
  {
    slug: "juara-lomba-jaringan-provinsi",
    title: "Tim TKJ Juara 1 Lomba Rancang Jaringan Tingkat Provinsi",
    category: "Prestasi",
    excerpt: "Tim siswa Teknik Komputer & Jaringan berhasil membawa pulang gelar juara pada kompetisi tingkat provinsi.",
  },
  {
    slug: "pendaftaran-dtp-gelombang-2",
    title: "Pendaftaran Digital Talent Program Gelombang 2 Dibuka",
    category: "Pengumuman",
    excerpt: "Kesempatan kedua bagi siswa untuk bergabung ke salah satu dari 9 spesialisasi Digital Talent Program.",
  },
  {
    slug: "campus-expo-2026",
    title: "Campus Expo 2026: Pameran Karya Teaching Factory",
    category: "Event",
    excerpt: "Showcase produk dan layanan hasil karya siswa dari seluruh jurusan, terbuka untuk umum.",
  },
];
