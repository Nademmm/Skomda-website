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

export const jurusanList: Jurusan[] = [
  {
    code: "SIJA",
    name: "Sistem Informasi Jaringan dan Aplikasi",
    summary:
      "Program 4 tahun yang mempelajari pemrograman, pengelolaan basis data, infrastruktur jaringan, dan cloud computing.",
    skills: ["Software Development", "Database & Cloud Computing", "Networking & Cybersecurity"],
  },
  {
    code: "TJAT",
    name: "Teknik Jaringan Akses Telekomunikasi",
    summary:
      "Program 3 tahun yang fokus pada teknologi jaringan telekomunikasi, infrastruktur fiber optik, dan komunikasi nirkabel.",
    skills: ["Telecommunication Networks", "Fiber Optic Technology", "Wireless Communication"],
  },
];

export const stats = [
  { value: "9", label: "Spesialisasi Digital Talent Program" },
  { value: "2", label: "Program Keahlian Utama" },
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
