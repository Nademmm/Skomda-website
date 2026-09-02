"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MOCK_NEWS } from "@/services/news";
import { DOWNLOAD_DOCUMENTS } from "@/components/sections/unduh/UnduhInformasiClient";

/* ──────────────────────── Types ──────────────────────── */
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "Jurusan" | "Halaman" | "Section" | "Berita" | "Dokumen" | "Info";
  badge?: string;
  parentPage?: string;
  iconType: "major" | "page" | "section" | "news" | "doc" | "info" | "star" | "hub" | "facility";
  keywords?: string;
}

interface NavbarSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ──────────────────── Database ──────────────────── */
const STATIC_PAGES: SearchItem[] = [
  { id: "p-home", title: "Beranda", description: "Halaman utama SMK Telkom Sidoarjo", href: "/", category: "Halaman", iconType: "page" },
  { id: "p-profil", title: "Profil Sekolah", description: "Sejarah, visi misi, dan identitas SKOMDA", href: "/tentang-kami/profil-sekolah", category: "Halaman", iconType: "page" },
  { id: "p-hub", title: "Hub Industri", description: "Kerjasama dan jejaring mitra industri nasional", href: "/tentang-kami/hub-industri", category: "Halaman", iconType: "hub" },
  { id: "p-prestasi", title: "Prestasi Siswa & Sekolah", description: "Pencapaian kejuaraan tingkat regional & nasional", href: "/tentang-kami/prestasi", category: "Halaman", iconType: "star" },
  { id: "p-fasilitas", title: "Fasilitas & Lab", description: "Laboratorium komputer, IoT, fiber optic & sarana modern", href: "/tentang-kami/fasilitas", category: "Halaman", iconType: "facility" },
  { id: "p-guru", title: "Profil Guru & Pendidik", description: "Tenaga pendidik & instruktur bersertifikasi industri", href: "/tentang-kami/profil-guru", category: "Halaman", iconType: "page" },
  { id: "p-akomodasi", title: "Akomodasi & Asrama", description: "Asrama siswa dan lingkungan pendukung belajar", href: "/tentang-kami/akomodasi", category: "Halaman", iconType: "page" },
  { id: "p-jurusan", title: "Profil Jurusan", description: "Program keahlian unggulan SIJA & TJAT berstandar industri", href: "/program/profil-jurusan", category: "Halaman", iconType: "major" },
  { id: "p-ekskul", title: "Ekstrakurikuler", description: "Wadah pengembangan minat, bakat, kepemimpinan siswa", href: "/program/ekstrakurikuler", category: "Halaman", iconType: "page" },
  { id: "p-dtp", title: "Digital Talent Program (DTP)", description: "Akselerasi keahlian teknologi khusus dan startup digital", href: "/program/digital-talent", category: "Halaman", iconType: "star" },
  { id: "p-ts21", title: "Program TS21", description: "Telkom Schools 21st Century Learning Framework", href: "/program/ts21", category: "Halaman", iconType: "page" },
  { id: "p-berita", title: "Berita & Agenda", description: "Kabar terbaru, prestasi dan kegiatan civitas akademika", href: "/informasi/berita", category: "Halaman", iconType: "news" },
  { id: "p-kelulusan", title: "Pengumuman Kelulusan", description: "Informasi resmi status kelulusan peserta didik", href: "/informasi/pengumuman-kelulusan", category: "Halaman", iconType: "doc" },
  { id: "p-k3", title: "Penerapan K3", description: "Keselamatan & Kesehatan Kerja di lingkungan sekolah", href: "/informasi/penerapan-k3", category: "Halaman", iconType: "info" },
  { id: "p-unduh", title: "Unduh Informasi & Dokumen", description: "Download brosur PPDB, sertifikat, dan file resmi", href: "/unduh-informasi", category: "Halaman", iconType: "doc" },
];

const JURUSAN_ITEMS: SearchItem[] = [
  {
    id: "j-sija",
    title: "SIJA (Sistem Informasi Jaringan & Aplikasi)",
    description: "Program 4 Tahun: Software Engineering, Cloud Computing, Cyber Security & IoT",
    href: "/program/profil-jurusan?jurusan=SIJA#kompetensi",
    category: "Jurusan",
    badge: "Program 4 Tahun",
    iconType: "major",
    keywords: "sija software web fullstack cloud aws iot coding 4 tahun",
  },
  {
    id: "j-tjat",
    title: "TJAT (Teknik Jaringan Akses Telekomunikasi)",
    description: "Program 3 Tahun: Fiber Optic, Jaringan Nirkabel, Microwave & ISP",
    href: "/program/profil-jurusan?jurusan=TJAT#kompetensi",
    category: "Jurusan",
    badge: "Program 3 Tahun",
    iconType: "major",
    keywords: "tjat fiber optic ftth wireless bts seluler jaringan telekomunikasi 3 tahun",
  },
];

/* ─── Page Section Headings & Subsections ─── */
const PAGE_SECTIONS: SearchItem[] = [
  // ── Beranda ──
  {
    id: "sec-sambutan",
    title: "Sambutan Kepala Sekolah",
    description: "Pesan dan visi dari Kepala SMK Telkom Sidoarjo, Abror S.Hum., M.Pd.",
    href: "/#sambutan",
    category: "Section",
    parentPage: "Beranda",
    iconType: "section",
    keywords: "sambutan kepala sekolah kepsek abror pidato pimpinan pesan direktif greeting",
  },
  {
    id: "sec-keunggulan",
    title: "Keunggulan SMK Telkom Sidoarjo",
    description: "6 alasan memilih Skomda: kurikulum industri, sertifikasi internasional & fasilitas modern",
    href: "/#keunggulan",
    category: "Section",
    parentPage: "Beranda",
    iconType: "section",
    keywords: "keunggulan mengapa memilih skomda fasilitas kurikulum prestasi alasan benefit why choose us",
  },
  {
    id: "sec-mitra-home",
    title: "Mitra Industri & Perusahaan Rekanan",
    description: "Jejaring kemitraan Telkom Group, Wowrack, Weza, dan korporasi teknologi",
    href: "/#mitra",
    category: "Section",
    parentPage: "Beranda",
    iconType: "section",
    keywords: "mitra rekanan kerja sama industri telkom wowrack weza dudi marquee partners",
  },
  {
    id: "sec-program-home",
    title: "Program Keahlian Vokasi (SIJA & TJAT)",
    description: "Ringkasan kurikulum program keahlian SIJA (4 tahun) dan TJAT (3 tahun)",
    href: "/#program",
    category: "Section",
    parentPage: "Beranda",
    iconType: "section",
    keywords: "program keahlian jurusan vokasi sija tjat sistem informasi telekomunikasi",
  },
  {
    id: "sec-berita-home",
    title: "Kabar & Berita Terkini",
    description: "Liputan agenda, prestasi siswa, dan pengumuman kegiatan terbaru sekolah",
    href: "/#informasi",
    category: "Section",
    parentPage: "Beranda",
    iconType: "section",
    keywords: "berita informasi kabar terkini agenda artikel pengumuman latest news",
  },

  // ── Profil Sekolah ──
  {
    id: "sec-visi-misi",
    title: "Visi & Misi Sekolah",
    description: "Visi sekolah vokasi terdepan dan 6 misi pembinaan karakter serta lulusan BMW",
    href: "/tentang-kami/profil-sekolah#visi-misi",
    category: "Section",
    parentPage: "Profil Sekolah",
    iconType: "section",
    keywords: "visi misi tujuan sasaran bmw bekerja melanjutkan wirausaha integritas nilai sekolah",
  },
  {
    id: "sec-akreditasi-profil",
    title: "Akreditasi A UNGGUL (BAN-SM)",
    description: "Peringkat Akreditasi A (Nilai 93) BAN-SM & standar manajemen mutu ISO 21001:2018",
    href: "/tentang-kami/profil-sekolah#akreditasi",
    category: "Section",
    parentPage: "Profil Sekolah",
    iconType: "section",
    keywords: "akreditasi unggul ban-sm nilai 93 mutu iso 21001 sertifikat status kelayakan badan akreditasi",
  },
  {
    id: "sec-struktur-organisasi",
    title: "Struktur Organisasi & Pimpinan",
    description: "Bagan susunan pimpinan sekolah, wakil kepala sekolah, kaprog, dan tata kelola",
    href: "/tentang-kami/profil-sekolah#struktur-organisasi",
    category: "Section",
    parentPage: "Profil Sekolah",
    iconType: "section",
    keywords: "struktur organisasi manajemen pimpinan susunan pengurus waka kaprodi kepsek bagan dewan guru",
  },

  // ── Hub Industri ──
  {
    id: "sec-mitra-industri",
    title: "Daftar Mitra Industri & Kerjasama",
    description: "Direktori kemitraan perusahaan PKL/magang, rekrutmen kerja, dan sertifikasi",
    href: "/tentang-kami/hub-industri#mitra-industri",
    category: "Section",
    parentPage: "Hub Industri",
    iconType: "section",
    keywords: "mitra industri daftar mou pkl magang bumn swasta telkom vendor rekrutmen dudi corporate",
  },
  {
    id: "sec-skema-kerjasama",
    title: "Skema Kerjasama Industri",
    description: "Bentuk kemitraan: Prakerin/PKL, Guru Tamu Praktisi, Teaching Factory & Rekrutmen",
    href: "/tentang-kami/hub-industri#skema-kerjasama",
    category: "Section",
    parentPage: "Hub Industri",
    iconType: "section",
    keywords: "skema bentuk program kerjasama guru tamu magang tefa teaching factory kurikulum industri sinkronisasi",
  },
  {
    id: "sec-alur-kerjasama",
    title: "Alur Prosedur Kerjasama Industri",
    description: "Tahapan pengajuan kemitraan, penjajakan MoU, implementasi hingga evaluasi program",
    href: "/tentang-kami/hub-industri#alur-kerjasama",
    category: "Section",
    parentPage: "Hub Industri",
    iconType: "section",
    keywords: "alur prosedur langkah proses pendaftaran kerjasama pengajuan mou dudi kemitraan mou signing",
  },
  {
    id: "sec-kontak-kerjasama",
    title: "Hubungi Hub Industri & Kemitraan",
    description: "Kanal penghubung resmi konsultasi kemitraan dan tim Hubungan Industri (Hubin)",
    href: "/tentang-kami/hub-industri#kontak-kerjasama",
    category: "Section",
    parentPage: "Hub Industri",
    iconType: "section",
    keywords: "kontak hubin kemitraan call center bkk bursa kerja khusus form pengajuan konsultasi email",
  },

  // ── Akomodasi ──
  {
    id: "sec-rekomendasi-kos",
    title: "Rekomendasi Kos & Tempat Tinggal",
    description: "Daftar kos putra, kos putri, dan hunian nyaman di sekitar lingkungan sekolah",
    href: "/tentang-kami/akomodasi#rekomendasi-hunian",
    category: "Section",
    parentPage: "Akomodasi",
    iconType: "section",
    keywords: "kos kost asrama hunian kontrakan putra putri kamar sewa tempat tinggal penginapan boarding",
  },
  {
    id: "sec-biaya-hidup",
    title: "Estimasi Biaya Hidup Sidoarjo",
    description: "Rincian perkiraan pengeluaran makan, sewa tempat tinggal, transport, dan uang saku",
    href: "/tentang-kami/akomodasi#biaya-hidup",
    category: "Section",
    parentPage: "Akomodasi",
    iconType: "section",
    keywords: "biaya hidup pengeluaran estimasi makan kos transport laundry uang saku bulanan tarif living cost",
  },
  {
    id: "sec-lingkungan-fasilitas",
    title: "Fasilitas Sekitar & Kemudahan Akses",
    description: "Akses fasilitas umum, halte transportasi, minimarket, ATM, dan pusat kesehatan",
    href: "/tentang-kami/akomodasi#lingkungan-fasilitas",
    category: "Section",
    parentPage: "Akomodasi",
    iconType: "section",
    keywords: "lingkungan fasilitas sekitar transportasi angkutan akses atm puskesmas jalan halte warung",
  },
  {
    id: "sec-tips-akomodasi",
    title: "Tips Memilih Kos & Helpdesk",
    description: "Panduan praktis mencari kos yang aman, nyaman, dan layanan konsultasi akomodasi",
    href: "/tentang-kami/akomodasi#tips-faq",
    category: "Section",
    parentPage: "Akomodasi",
    iconType: "section",
    keywords: "tips faq bantuan konsultasi survei memilih kos aman panduan orang tua helpdesk survey",
  },

  // ── Profil Jurusan ──
  {
    id: "sec-kompetensi-sija",
    title: "Kompetensi Keahlian SIJA (4 Tahun)",
    description: "Fokus keahlian Software Development, Cloud AWS, Cyber Security, dan IoT Terapan",
    href: "/program/profil-jurusan?jurusan=SIJA#kompetensi",
    category: "Section",
    parentPage: "Profil Jurusan",
    iconType: "section",
    keywords: "kompetensi sija kurikulum software web fullstack cloud aws iot keamanan siber 4 tahun",
  },
  {
    id: "sec-kompetensi-tjat",
    title: "Kompetensi Keahlian TJAT (3 Tahun)",
    description: "Fokus keahlian Fiber Optic FTTH, Jaringan Nirkabel Microwave, Transmisi 4G/5G, dan VSAT",
    href: "/program/profil-jurusan?jurusan=TJAT#kompetensi",
    category: "Section",
    parentPage: "Profil Jurusan",
    iconType: "section",
    keywords: "kompetensi tjat kurikulum fiber optic ftth wireless bts seluler jaringan akses mikrotik",
  },
  {
    id: "sec-sertifikasi-industri",
    title: "Sertifikasi Industri SIJA & TJAT",
    description: "Uji kompetensi global: Cisco CCNA, AWS Academy, Oracle Java, MikroTik MTCNA & BNSP",
    href: "/program/profil-jurusan#keunggulan-sertifikasi",
    category: "Section",
    parentPage: "Profil Jurusan",
    iconType: "section",
    keywords: "sertifikasi cisco ccna aws cloud oracle mikrotik mtcna bnsp uji kompetensi keunggulan lisensi",
  },
  {
    id: "sec-prospek-karir",
    title: "Prospek Karir & Profesi Lulusan",
    description: "Peluang kerja: Cloud Engineer, Network Specialist, Fiber Optic Tech, Full-Stack Dev",
    href: "/program/profil-jurusan#prospek-karir",
    category: "Section",
    parentPage: "Profil Jurusan",
    iconType: "section",
    keywords: "prospek karir pekerjaan profesi gaji lulusan kerja bumn startup industri dudi peluang career",
  },

  // ── Program TS21 ──
  {
    id: "sec-ts21-framework",
    title: "Framework Pembelajaran TS21",
    description: "Model pembelajaran abad 21 Telkom Schools: Character, Competence & Collaboration",
    href: "/program/ts21#framework",
    category: "Section",
    parentPage: "Program TS21",
    iconType: "section",
    keywords: "framework ts21 telkom schools kurikulum abad 21 karakter kompetensi kolaborasi 4c",
  },
  {
    id: "sec-ts21-metode",
    title: "Metode Pembelajaran TS21",
    description: "Project-Based Learning, Teaching Factory (TeFa), Magang Industri Bersertifikat & Dual System",
    href: "/program/ts21#metode",
    category: "Section",
    parentPage: "Program TS21",
    iconType: "section",
    keywords: "metode pembelajaran project based learning pjbl teaching factory tefa dual system magang",
  },
  {
    id: "sec-ts21-enabler",
    title: "Digital Enabler TS21",
    description: "Infrastruktur digital, smart classroom, Cloud LMS & ekosistem teknologi pendidikan",
    href: "/program/ts21#enabler",
    category: "Section",
    parentPage: "Program TS21",
    iconType: "section",
    keywords: "digital enabler lms smart class teknologi ekosistem edutech google workspace laboratorium",
  },
];

const QUICK_FEATURED_ITEMS: SearchItem[] = [
  {
    id: "q-sija",
    title: "Jurusan SIJA (4 Tahun)",
    description: "Software engineering, cloud architecture, cybersecurity & IoT",
    href: "/program/profil-jurusan?jurusan=SIJA#kompetensi",
    category: "Jurusan",
    badge: "SIJA",
    iconType: "major",
  },
  {
    id: "q-tjat",
    title: "Jurusan TJAT (3 Tahun)",
    description: "Teknik jaringan fiber optic, wireless communication & seluler",
    href: "/program/profil-jurusan?jurusan=TJAT#kompetensi",
    category: "Jurusan",
    badge: "TJAT",
    iconType: "major",
  },
  {
    id: "q-ppdb",
    title: "Brosur & Info PPDB 2026/2027",
    description: "Alur pendaftaran peserta didik baru, rincian biaya & beasiswa",
    href: "/unduh-informasi",
    category: "Info",
    badge: "PPDB",
    iconType: "doc",
  },
  {
    id: "q-visi-misi",
    title: "Visi & Misi Sekolah",
    description: "Visi keunggulan vokasi dan 6 misi pembinaan karakter serta lulusan BMW",
    href: "/tentang-kami/profil-sekolah#visi-misi",
    category: "Section",
    parentPage: "Profil Sekolah",
    iconType: "section",
  },
  {
    id: "q-mitra",
    title: "Hub Industri & Kerjasama Perusahaan",
    description: "Kemitraan Telkom Group, Jagoan Hosting, Wowrack & magang industri",
    href: "/tentang-kami/hub-industri#mitra-industri",
    category: "Section",
    parentPage: "Hub Industri",
    iconType: "hub",
  },
  {
    id: "q-biaya-hidup",
    title: "Estimasi Biaya Hidup Sidoarjo",
    description: "Perkiraan biaya makan, sewa kos, transport, dan kebutuhan siswa",
    href: "/tentang-kami/akomodasi#biaya-hidup",
    category: "Section",
    parentPage: "Akomodasi",
    iconType: "section",
  },
];

const POPULAR_TAGS = [
  "SIJA",
  "TJAT",
  "Visi Misi",
  "Sambutan Kepsek",
  "Mitra Industri",
  "Biaya Hidup",
  "Sertifikasi",
  "PPDB 2026",
  "Brosur",
  "Fasilitas",
];

/* ──────────────────── Clean Minimalist Icons ──────────────────── */
function ItemIcon({ type }: { type: SearchItem["iconType"] }) {
  const cls = "size-4 text-slate-600 transition-colors";
  switch (type) {
    case "major":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "section":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <line x1="10" y1="3" x2="8" y2="21" />
          <line x1="16" y1="3" x2="14" y2="21" />
        </svg>
      );
    case "news":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
      );
    case "doc":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case "star":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case "facility":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" /><path d="M16 6h.01" />
          <path d="M8 10h.01" /><path d="M16 10h.01" />
          <path d="M8 14h.01" /><path d="M16 14h.01" />
        </svg>
      );
    case "hub":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "info":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
    case "page":
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
  }
}

/* ──────────────────── Component ──────────────────── */
export default function NavbarSearch({ isOpen, onClose }: NavbarSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combine full dataset
  const dataset = useMemo<SearchItem[]>(() => {
    const newsItems: SearchItem[] = MOCK_NEWS.map((n) => ({
      id: `news-${n.slug}`,
      title: n.title,
      description: n.summary || `Kategori: ${n.category}`,
      href: `/berita/${n.slug}`,
      category: "Berita",
      badge: n.category,
      iconType: "news",
    }));

    const docItems: SearchItem[] = DOWNLOAD_DOCUMENTS.map((d) => ({
      id: `doc-${d.id}`,
      title: d.title,
      description: d.description,
      href: "/unduh-informasi",
      category: "Dokumen",
      badge: d.category,
      iconType: "doc",
    }));

    const quickInfo: SearchItem[] = [
      { id: "i-ppdb", title: "Brosur PPDB 2026/2027", description: "Alur pendaftaran, biaya, beasiswa dan persyaratan siswa baru", href: "/unduh-informasi", category: "Info", badge: "PPDB", iconType: "info", keywords: "daftar masuk pendaftaran sekolah biaya" },
      { id: "i-akreditasi", title: "Akreditasi A Unggul", description: "Sertifikasi BAN-SM nilai tertinggi sekolah vokasi (93)", href: "/unduh-informasi", category: "Info", badge: "Akreditasi", iconType: "info", keywords: "status sertifikat nilai unggul" },
      { id: "i-sertifikasi", title: "Sertifikasi Industri (Cisco, BNSP, AWS, MikroTik)", description: "Uji kompetensi internasional siap kerja di industri global", href: "/program/profil-jurusan#keunggulan-sertifikasi", category: "Info", badge: "Sertifikasi", iconType: "info", keywords: "lisensi keahlian sertifikasi dudi" },
    ];

    return [...JURUSAN_ITEMS, ...PAGE_SECTIONS, ...STATIC_PAGES, ...newsItems, ...docItems, ...quickInfo];
  }, []);

  // Filter with scoring
  const filteredResults = useMemo<SearchItem[]>(() => {
    if (!query.trim()) return [];

    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0);

    return dataset
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const catLower = item.category.toLowerCase();
        const parentLower = (item.parentPage || "").toLowerCase();
        const kwLower = (item.keywords || "").toLowerCase();
        let score = 0;

        for (const t of terms) {
          if (titleLower.includes(t)) {
            score += 5;
            if (titleLower.startsWith(t)) score += 3;
          } else if (parentLower.includes(t)) {
            score += 3;
          } else if (kwLower.includes(t)) {
            score += 3;
          } else if (descLower.includes(t)) {
            score += 2;
          } else if (catLower.includes(t)) {
            score += 1;
          } else {
            return { item, score: -1 };
          }
        }
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item)
      .slice(0, 12);
  }, [query, dataset]);

  // Group filtered results: Section, Jurusan, Halaman, Berita, Dokumen, Info
  const groupedResults = useMemo(() => {
    const order = ["Jurusan", "Section", "Halaman", "Berita", "Dokumen", "Info"];
    const map = new Map<string, SearchItem[]>();
    
    for (const cat of order) {
      const matched = filteredResults.filter((r) => r.category === cat);
      if (matched.length > 0) {
        map.set(cat === "Section" ? "Bagian Halaman (Section)" : cat, matched);
      }
    }
    return map;
  }, [filteredResults]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleSelect = useCallback(
    (href: string) => {
      onClose();

      if (typeof window !== "undefined" && href.includes("#")) {
        const [targetPath, hash] = href.split("#");
        const currentPath = window.location.pathname;
        const isCurrentPage =
          targetPath === "" ||
          targetPath === currentPath ||
          (targetPath === "/" && currentPath === "/");

        if (isCurrentPage && hash) {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
            return;
          }
        }
      }

      router.push(href);
    },
    [onClose, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentList = query.trim() ? filteredResults : QUICK_FEATURED_ITEMS;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, currentList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentList[selectedIndex]) {
        handleSelect(currentList[selectedIndex].href);
      }
    }
  };

  let counter = -1;

  return (
    <>
      {/* ─── Solid Dark Backdrop Dimmer ─── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] pointer-events-auto cursor-pointer"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ─── Inline Expanded Search Header Bar ─── */}
      <div className="flex items-center w-full h-full gap-3 bg-white">
        {/* Search Icon */}
        <div className="flex items-center justify-center shrink-0 text-slate-500 pl-1">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Cari section, halaman, jurusan, berita, dokumen..."
          className="flex-1 bg-transparent font-jakarta text-[15px] font-semibold text-slate-900 placeholder-slate-400 outline-none min-w-0"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="size-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Hapus teks"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center h-[34px] px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold font-jakarta text-slate-700 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* ─── Results & Quick Access Dropdown ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+10px)] w-full bg-white rounded-3xl p-2 shadow-[0px_25px_60px_-15px_rgba(0,0,0,0.25)] border border-slate-200/90 z-[55] pointer-events-auto overflow-hidden"
            style={{ backgroundColor: "#ffffff" }}
          >
            {/* Inner Scroll Container */}
            <div className="max-h-[68vh] overflow-y-auto custom-scrollbar p-3 sm:p-4 flex flex-col gap-4">
              {/* ─── Default State: Clean Quick Access Menu ─── */}
              {!query.trim() ? (
                <div className="flex flex-col gap-4">
                  {/* Popular Search Tags */}
                  <div>
                    <p className="font-jakarta text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                      Pencarian Populer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setQuery(tag);
                            inputRef.current?.focus();
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold font-jakarta text-slate-700 transition-all cursor-pointer"
                        >
                          <svg className="size-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clean List Quick Access Links */}
                  <div>
                    <p className="font-jakarta text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      Akses Cepat Halaman & Section
                    </p>
                    <div className="flex flex-col gap-1">
                      {QUICK_FEATURED_ITEMS.map((item, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect(item.href)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${isSelected
                                ? "bg-slate-100/90 text-slate-900"
                                : "bg-white hover:bg-slate-50 text-slate-700"
                              }`}
                          >
                            <div
                              className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected
                                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                                  : "bg-slate-100/80 border border-slate-200/50 text-slate-600"
                                }`}
                            >
                              <ItemIcon type={item.iconType} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-jakarta text-sm font-bold truncate block transition-colors ${isSelected ? "text-[#bd0c12]" : "text-slate-900"
                                    }`}
                                >
                                  {item.title}
                                </span>
                                {item.parentPage && (
                                  <span className="shrink-0 font-jakarta text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200/70 px-1.5 py-0.5 rounded-md">
                                    {item.parentPage}
                                  </span>
                                )}
                                {item.badge && !item.parentPage && (
                                  <span className="shrink-0 font-jakarta text-[10px] font-semibold text-[#bd0c12] bg-[#ffebed] px-1.5 py-0.5 rounded-md">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="font-jakarta text-xs text-slate-500 truncate mt-0.5">
                                {item.description}
                              </p>
                            </div>

                            <svg
                              className={`size-4 shrink-0 transition-transform ${isSelected ? "text-slate-700 translate-x-1" : "text-slate-300 opacity-0"
                                }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : filteredResults.length > 0 ? (
                /* ─── Search Results State ─── */
                <div className="flex flex-col gap-3.5">
                  {Array.from(groupedResults.entries()).map(([category, items]) => (
                    <div key={category} className="flex flex-col">
                      <div className="px-2 pt-1 pb-1.5 flex items-center justify-between">
                        <span className="font-jakarta text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {category}
                        </span>
                        <span className="font-jakarta text-[11px] font-medium text-slate-400">
                          {items.length} hasil
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        {items.map((item) => {
                          counter++;
                          const idx = counter;
                          const isSelected = idx === selectedIndex;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelect(item.href)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${isSelected
                                  ? "bg-slate-100/90 text-slate-900"
                                  : "bg-white hover:bg-slate-50 text-slate-700"
                                }`}
                            >
                              <div
                                className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected
                                    ? "bg-white text-[#bd0c12] shadow-xs border border-slate-200"
                                    : "bg-slate-100/80 border border-slate-200/50 text-slate-600"
                                  }`}
                              >
                                <ItemIcon type={item.iconType} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`font-jakarta text-sm font-bold truncate block transition-colors ${isSelected ? "text-[#bd0c12]" : "text-slate-900"
                                      }`}
                                  >
                                    {item.title}
                                  </span>
                                  {item.parentPage && (
                                    <span className="shrink-0 font-jakarta text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200/70 px-1.5 py-0.5 rounded-md">
                                      {item.parentPage}
                                    </span>
                                  )}
                                  {item.badge && !item.parentPage && (
                                    <span className="shrink-0 font-jakarta text-[10px] font-semibold text-[#bd0c12] bg-[#ffebed] px-1.5 py-0.5 rounded-md">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="font-jakarta text-xs text-slate-500 truncate mt-0.5">
                                  {item.description}
                                </p>
                              </div>

                              <svg
                                className={`size-4 shrink-0 transition-transform ${isSelected ? "text-[#bd0c12] translate-x-1" : "text-slate-300 opacity-0"
                                  }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* ─── Empty Result State ─── */
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="size-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <p className="font-jakarta text-sm font-bold text-slate-900">
                    Tidak ada hasil untuk &ldquo;{query}&rdquo;
                  </p>
                  <p className="font-jakarta text-xs text-slate-500 mt-1">
                    Coba kata kunci seperti &lsquo;Visi Misi&rsquo;, &lsquo;Biaya Hidup&rsquo;, &lsquo;SIJA&rsquo;, &lsquo;Mitra&rsquo;, atau &lsquo;Sertifikasi&rsquo;
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
