"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MOCK_NEWS } from "@/services/news";
import { DOWNLOAD_DOCUMENTS } from "@/components/sections/unduh/UnduhInformasiClient";

/* ──────────────────────── Types ──────────────────────── */
interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "Halaman" | "Section" | "Berita" | "Dokumen" | "Jurusan" | "Info";
  parentPage?: string;
  icon: "page" | "section" | "news" | "doc" | "major" | "info";
  keywords?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ──────────────────── Static Searchables ──────────────────── */
const PAGES: SearchResult[] = [
  { id: "p-home", title: "Beranda", description: "Halaman utama SMK Telkom Sidoarjo", href: "/", category: "Halaman", icon: "page" },
  { id: "p-profil", title: "Profil Sekolah", description: "Sejarah, visi misi, dan identitas sekolah", href: "/tentang-kami/profil-sekolah", category: "Halaman", icon: "page" },
  { id: "p-hub", title: "Hub Industri", description: "Kerjasama dan jaringan kemitraan industri", href: "/tentang-kami/hub-industri", category: "Halaman", icon: "page" },
  { id: "p-prestasi", title: "Prestasi", description: "Pencapaian siswa & sekolah tingkat nasional", href: "/tentang-kami/prestasi", category: "Halaman", icon: "page" },
  { id: "p-fasilitas", title: "Fasilitas", description: "Laboratorium modern & sarana prasarana", href: "/tentang-kami/fasilitas", category: "Halaman", icon: "page" },
  { id: "p-guru", title: "Profil Guru", description: "Tenaga pendidik & instruktur bersertifikasi", href: "/tentang-kami/profil-guru", category: "Halaman", icon: "page" },
  { id: "p-akomodasi", title: "Akomodasi", description: "Asrama dan lingkungan pendukung siswa", href: "/tentang-kami/akomodasi", category: "Halaman", icon: "page" },
  { id: "p-jurusan", title: "Profil Jurusan", description: "Program keahlian SIJA & TJAT berstandar industri", href: "/program/profil-jurusan", category: "Halaman", icon: "page" },
  { id: "p-ekskul", title: "Ekstrakurikuler", description: "Wadah minat, bakat, kepemimpinan & soft skills", href: "/program/ekstrakurikuler", category: "Halaman", icon: "page" },
  { id: "p-dtp", title: "Digital Talent Program", description: "Akselerasi keahlian teknologi dan startup", href: "/program/digital-talent", category: "Halaman", icon: "page" },
  { id: "p-ts21", title: "Program TS21", description: "Telkom Schools 21st Century Learning Framework", href: "/program/ts21", category: "Halaman", icon: "page" },
  { id: "p-berita", title: "Berita & Informasi", description: "Kabar terbaru dan agenda kegiatan sekolah", href: "/informasi/berita", category: "Halaman", icon: "page" },
  { id: "p-kelulusan", title: "Pengumuman Kelulusan", description: "Informasi resmi status kelulusan peserta didik", href: "/informasi/pengumuman-kelulusan", category: "Halaman", icon: "page" },
  { id: "p-k3", title: "Penerapan K3", description: "Keselamatan & Kesehatan Kerja di lingkungan sekolah", href: "/informasi/penerapan-k3", category: "Halaman", icon: "page" },
  { id: "p-unduh", title: "Unduh Informasi", description: "Download brosur, sertifikat, dan dokumen resmi", href: "/unduh-informasi", category: "Halaman", icon: "page" },
];

const JURUSAN_INFO: SearchResult[] = [
  { id: "j-sija", title: "SIJA — Sistem Informasi Jaringan & Aplikasi", description: "Program 4 tahun: software development, cloud computing, IoT & cybersecurity", href: "/program/profil-jurusan?jurusan=SIJA#kompetensi", category: "Jurusan", icon: "major" },
  { id: "j-tjat", title: "TJAT — Teknik Jaringan Akses Telekomunikasi", description: "Program 3 tahun: fiber optic, wireless communication & BTS engineering", href: "/program/profil-jurusan?jurusan=TJAT#kompetensi", category: "Jurusan", icon: "major" },
];

const PAGE_SECTIONS: SearchResult[] = [
  // ── Beranda ──
  {
    id: "sec-sambutan",
    title: "Sambutan Kepala Sekolah",
    description: "Pesan dan visi dari Kepala SMK Telkom Sidoarjo, Abror S.Hum., M.Pd.",
    href: "/#sambutan",
    category: "Section",
    parentPage: "Beranda",
    icon: "section",
    keywords: "sambutan kepala sekolah kepsek abror pidato pimpinan",
  },
  {
    id: "sec-keunggulan",
    title: "Keunggulan SMK Telkom Sidoarjo",
    description: "6 alasan memilih Skomda: kurikulum industri, sertifikasi internasional & fasilitas modern",
    href: "/#keunggulan",
    category: "Section",
    parentPage: "Beranda",
    icon: "section",
    keywords: "keunggulan mengapa memilih skomda fasilitas kurikulum prestasi alasan",
  },
  {
    id: "sec-mitra-home",
    title: "Mitra Industri & Perusahaan Rekanan",
    description: "Jejaring kemitraan Telkom Group, Wowrack, Weza, dan korporasi teknologi",
    href: "/#mitra",
    category: "Section",
    parentPage: "Beranda",
    icon: "section",
    keywords: "mitra rekanan kerja sama industri telkom wowrack weza dudi marquee",
  },
  {
    id: "sec-program-home",
    title: "Program Keahlian Vokasi (SIJA & TJAT)",
    description: "Ringkasan kurikulum program keahlian SIJA (4 tahun) dan TJAT (3 tahun)",
    href: "/#program",
    category: "Section",
    parentPage: "Beranda",
    icon: "section",
    keywords: "program keahlian jurusan vokasi sija tjat",
  },
  {
    id: "sec-berita-home",
    title: "Kabar & Berita Terkini",
    description: "Liputan agenda, prestasi siswa, dan pengumuman kegiatan terbaru sekolah",
    href: "/#informasi",
    category: "Section",
    parentPage: "Beranda",
    icon: "section",
    keywords: "berita informasi kabar terkini agenda artikel pengumuman",
  },

  // ── Profil Sekolah ──
  {
    id: "sec-visi-misi",
    title: "Visi & Misi Sekolah",
    description: "Visi sekolah vokasi terdepan dan 6 misi pembinaan karakter serta lulusan BMW",
    href: "/tentang-kami/profil-sekolah#visi-misi",
    category: "Section",
    parentPage: "Profil Sekolah",
    icon: "section",
    keywords: "visi misi tujuan sasaran bmw bekerja melanjutkan wirausaha integritas",
  },
  {
    id: "sec-akreditasi-profil",
    title: "Akreditasi A UNGGUL (BAN-SM)",
    description: "Peringkat Akreditasi A (Nilai 93) BAN-SM & standar manajemen mutu ISO 21001:2018",
    href: "/tentang-kami/profil-sekolah#akreditasi",
    category: "Section",
    parentPage: "Profil Sekolah",
    icon: "section",
    keywords: "akreditasi unggul ban-sm nilai 93 mutu iso 21001 sertifikat",
  },
  {
    id: "sec-struktur-organisasi",
    title: "Struktur Organisasi & Pimpinan",
    description: "Bagan susunan pimpinan sekolah, wakil kepala sekolah, kaprog, dan tata kelola",
    href: "/tentang-kami/profil-sekolah#struktur-organisasi",
    category: "Section",
    parentPage: "Profil Sekolah",
    icon: "section",
    keywords: "struktur organisasi manajemen pimpinan susunan pengurus waka kaprodi kepsek",
  },

  // ── Hub Industri ──
  {
    id: "sec-mitra-industri",
    title: "Daftar Mitra Industri & Kerjasama",
    description: "Direktori kemitraan perusahaan PKL/magang, rekrutmen kerja, dan sertifikasi",
    href: "/tentang-kami/hub-industri#mitra-industri",
    category: "Section",
    parentPage: "Hub Industri",
    icon: "section",
    keywords: "mitra industri daftar mou pkl magang bumn swasta telkom vendor rekrutmen",
  },
  {
    id: "sec-skema-kerjasama",
    title: "Skema Kerjasama Industri",
    description: "Bentuk kemitraan: Prakerin/PKL, Guru Tamu Praktisi, Teaching Factory & Rekrutmen",
    href: "/tentang-kami/hub-industri#skema-kerjasama",
    category: "Section",
    parentPage: "Hub Industri",
    icon: "section",
    keywords: "skema bentuk program kerjasama guru tamu magang tefa teaching factory",
  },
  {
    id: "sec-alur-kerjasama",
    title: "Alur Prosedur Kerjasama Industri",
    description: "Tahapan pengajuan kemitraan, penjajakan MoU, implementasi hingga evaluasi program",
    href: "/tentang-kami/hub-industri#alur-kerjasama",
    category: "Section",
    parentPage: "Hub Industri",
    icon: "section",
    keywords: "alur prosedur langkah proses pendaftaran kerjasama pengajuan mou dudi",
  },
  {
    id: "sec-kontak-kerjasama",
    title: "Hubungi Hub Industri & Kemitraan",
    description: "Kanal penghubung resmi konsultasi kemitraan dan tim Hubungan Industri (Hubin)",
    href: "/tentang-kami/hub-industri#kontak-kerjasama",
    category: "Section",
    parentPage: "Hub Industri",
    icon: "section",
    keywords: "kontak hubin kemitraan call center bkk bursa kerja khusus form pengajuan",
  },

  // ── Akomodasi ──
  {
    id: "sec-rekomendasi-kos",
    title: "Rekomendasi Kos & Tempat Tinggal",
    description: "Daftar kos putra, kos putri, dan hunian nyaman di sekitar lingkungan sekolah",
    href: "/tentang-kami/akomodasi#rekomendasi-hunian",
    category: "Section",
    parentPage: "Akomodasi",
    icon: "section",
    keywords: "kos kost asrama hunian kontrakan putra putri kamar sewa tempat tinggal",
  },
  {
    id: "sec-biaya-hidup",
    title: "Estimasi Biaya Hidup Sidoarjo",
    description: "Rincian perkiraan pengeluaran makan, sewa tempat tinggal, transport, dan uang saku",
    href: "/tentang-kami/akomodasi#biaya-hidup",
    category: "Section",
    parentPage: "Akomodasi",
    icon: "section",
    keywords: "biaya hidup pengeluaran estimasi makan kos transport laundry uang saku",
  },
  {
    id: "sec-lingkungan-fasilitas",
    title: "Fasilitas Sekitar & Kemudahan Akses",
    description: "Akses fasilitas umum, halte transportasi, minimarket, ATM, dan pusat kesehatan",
    href: "/tentang-kami/akomodasi#lingkungan-fasilitas",
    category: "Section",
    parentPage: "Akomodasi",
    icon: "section",
    keywords: "lingkungan fasilitas sekitar transportasi angkutan akses atm puskesmas",
  },
  {
    id: "sec-tips-akomodasi",
    title: "Tips Memilih Kos & Helpdesk",
    description: "Panduan praktis mencari kos yang aman, nyaman, dan layanan konsultasi akomodasi",
    href: "/tentang-kami/akomodasi#tips-faq",
    category: "Section",
    parentPage: "Akomodasi",
    icon: "section",
    keywords: "tips faq bantuan konsultasi survei memilih kos aman panduan orang tua",
  },

  // ── Profil Jurusan ──
  {
    id: "sec-kompetensi-sija",
    title: "Kompetensi Keahlian SIJA (4 Tahun)",
    description: "Fokus keahlian Software Development, Cloud AWS, Cyber Security, dan IoT Terapan",
    href: "/program/profil-jurusan?jurusan=SIJA#kompetensi",
    category: "Section",
    parentPage: "Profil Jurusan",
    icon: "section",
    keywords: "kompetensi sija kurikulum software web fullstack cloud aws iot keamanan siber 4 tahun",
  },
  {
    id: "sec-kompetensi-tjat",
    title: "Kompetensi Keahlian TJAT (3 Tahun)",
    description: "Fokus keahlian Fiber Optic FTTH, Jaringan Nirkabel Microwave, Transmisi 4G/5G, dan VSAT",
    href: "/program/profil-jurusan?jurusan=TJAT#kompetensi",
    category: "Section",
    parentPage: "Profil Jurusan",
    icon: "section",
    keywords: "kompetensi tjat kurikulum fiber optic ftth wireless bts seluler jaringan akses mikrotik",
  },
  {
    id: "sec-sertifikasi-industri",
    title: "Sertifikasi Industri SIJA & TJAT",
    description: "Uji kompetensi global: Cisco CCNA, AWS Academy, Oracle Java, MikroTik & BNSP",
    href: "/program/profil-jurusan#keunggulan-sertifikasi",
    category: "Section",
    parentPage: "Profil Jurusan",
    icon: "section",
    keywords: "sertifikasi cisco ccna aws cloud oracle mikrotik mtcna bnsp uji kompetensi keunggulan",
  },
  {
    id: "sec-prospek-karir",
    title: "Prospek Karir & Profesi Lulusan",
    description: "Peluang kerja: Cloud Engineer, Network Specialist, Fiber Optic Tech, Full-Stack Dev",
    href: "/program/profil-jurusan#prospek-karir",
    category: "Section",
    parentPage: "Profil Jurusan",
    icon: "section",
    keywords: "prospek karir pekerjaan profesi gaji lulusan kerja bumn startup industri",
  },

  // ── Program TS21 ──
  {
    id: "sec-ts21-framework",
    title: "Framework Pembelajaran TS21",
    description: "Model pembelajaran abad 21 Telkom Schools: Character, Competence & Collaboration",
    href: "/program/ts21#framework",
    category: "Section",
    parentPage: "Program TS21",
    icon: "section",
    keywords: "framework ts21 telkom schools kurikulum abad 21 karakter kompetensi kolaborasi 4c",
  },
  {
    id: "sec-ts21-metode",
    title: "Metode Pembelajaran TS21",
    description: "Project-Based Learning, Teaching Factory (TeFa), Magang Industri Bersertifikat & Dual System",
    href: "/program/ts21#metode",
    category: "Section",
    parentPage: "Program TS21",
    icon: "section",
    keywords: "metode pembelajaran project based learning pjbl teaching factory tefa dual system magang",
  },
  {
    id: "sec-ts21-enabler",
    title: "Digital Enabler TS21",
    description: "Infrastruktur digital, smart classroom, Cloud LMS & ekosistem teknologi pendidikan",
    href: "/program/ts21#enabler",
    category: "Section",
    parentPage: "Program TS21",
    icon: "section",
    keywords: "digital enabler lms smart class teknologi ekosistem edutech google workspace",
  },
];

const QUICK_INFO: SearchResult[] = [
  { id: "i-akreditasi", title: "Akreditasi A (BAN-SM)", description: "SMK Telkom Sidoarjo terakreditasi 'A' Unggul dari BAN-SM (93)", href: "/unduh-informasi", category: "Info", icon: "info" },
  { id: "i-iso", title: "Sertifikasi ISO 21001:2018", description: "Standar internasional sistem manajemen mutu pendidikan", href: "/unduh-informasi", category: "Info", icon: "info" },
  { id: "i-ppdb", title: "PPDB 2026/2027", description: "Info Penerimaan Peserta Didik Baru tahun ajaran terbaru", href: "/unduh-informasi", category: "Info", icon: "info" },
  { id: "i-sertifikasi", title: "Sertifikasi Industri", description: "BNSP, Cisco CCNA, MikroTik MTCNA, AWS Academy, Oracle", href: "/program/profil-jurusan#keunggulan-sertifikasi", category: "Info", icon: "info" },
  { id: "i-mitra", title: "Mitra Industri", description: "Telkom Group, Wowrack, Weza Group, Jagoan Hosting, dan lainnya", href: "/tentang-kami/hub-industri#mitra-industri", category: "Info", icon: "info" },
];

/* ──────────────────── Icon Components ──────────────────── */
function CategoryIcon({ type }: { type: SearchResult["icon"] }) {
  const cls = "size-4";
  switch (type) {
    case "page":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
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
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "doc":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case "major":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "info":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}

/* ──────────────────── Component ──────────────────── */
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build the full searchable index
  const allItems = useMemo<SearchResult[]>(() => {
    const newsItems: SearchResult[] = MOCK_NEWS.map((n) => ({
      id: `n-${n.slug}`,
      title: n.title,
      description: n.summary || n.category,
      href: `/berita/${n.slug}`,
      category: "Berita",
      icon: "news",
    }));

    const docItems: SearchResult[] = DOWNLOAD_DOCUMENTS.map((d) => ({
      id: `d-${d.id}`,
      title: d.title,
      description: d.description,
      href: "/unduh-informasi",
      category: "Dokumen",
      icon: "doc",
    }));

    return [...JURUSAN_INFO, ...PAGE_SECTIONS, ...PAGES, ...newsItems, ...docItems, ...QUICK_INFO];
  }, []);

  // Filter results
  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) {
      return [
        ...PAGE_SECTIONS.slice(0, 3),
        ...JURUSAN_INFO,
        ...PAGES.slice(0, 3),
        ...QUICK_INFO.slice(0, 2),
      ];
    }

    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0);

    return allItems
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const catLower = item.category.toLowerCase();
        const parentLower = (item.parentPage || "").toLowerCase();
        const kwLower = (item.keywords || "").toLowerCase();
        let score = 0;

        for (const term of terms) {
          if (titleLower.includes(term)) {
            score += 5;
            if (titleLower.startsWith(term)) score += 3;
          } else if (parentLower.includes(term)) {
            score += 3;
          } else if (kwLower.includes(term)) {
            score += 3;
          } else if (descLower.includes(term)) {
            score += 2;
          } else if (catLower.includes(term)) {
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
      .slice(0, 14);
  }, [query, allItems]);

  // Group results by category in a clean order
  const grouped = useMemo(() => {
    const order = ["Jurusan", "Section", "Halaman", "Berita", "Dokumen", "Info"];
    const map = new Map<string, SearchResult[]>();
    for (const cat of order) {
      const items = results.filter((r) => r.category === cat);
      if (items.length > 0) {
        map.set(cat === "Section" ? "Bagian Halaman (Section)" : cat, items);
      }
    }
    return map;
  }, [results]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigateTo = useCallback(
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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateTo(results[selectedIndex].href);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [results, selectedIndex, navigateTo, onClose]
  );

  // Keep selected item scrolled into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  let flatIndex = -1;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[min(18vh,140px)] px-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", damping: 28, stiffness: 400 }}
            className="w-full max-w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden flex flex-col max-h-[70vh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* ─── Search Input ─── */}
            <div className="relative flex items-center border-b border-gray-200 px-5 gap-3">
              <svg className="size-5 text-[#9ca3af] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari section, halaman, jurusan, berita, dokumen..."
                className="flex-1 h-[56px] bg-transparent font-jakarta text-[15px] text-[#101828] placeholder-[#9ca3af] outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="size-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* ─── Results List ─── */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto overscroll-contain px-2 py-2"
            >
              {results.length > 0 ? (
                Array.from(grouped.entries()).map(([category, items]) => (
                  <div key={category} className="mb-1 last:mb-0">
                    <div className="px-3 pt-2 pb-1.5 flex items-center justify-between">
                      <span className="font-jakarta text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">
                        {category}
                      </span>
                      <span className="font-jakarta text-[11px] font-medium text-[#9ca3af]">
                        {items.length} hasil
                      </span>
                    </div>
                    {items.map((item) => {
                      flatIndex++;
                      const idx = flatIndex;
                      const isActive = idx === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-index={idx}
                          onClick={() => navigateTo(item.href)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-100 cursor-pointer ${
                            isActive
                              ? "bg-[#ffebed] text-[#bc0c11]"
                              : "text-[#364153] hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-[#bc0c11] text-white"
                                : "bg-gray-100 text-[#6b7280]"
                            }`}
                          >
                            <CategoryIcon type={item.icon} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p
                                className={`font-jakarta text-sm font-semibold truncate transition-colors ${
                                  isActive ? "text-[#bc0c11]" : "text-[#101828]"
                                }`}
                              >
                                {item.title}
                              </p>
                              {item.parentPage && (
                                <span className="shrink-0 font-jakarta text-[10px] font-semibold text-[#6b7280] bg-gray-100 px-1.5 py-0.5 rounded-md">
                                  {item.parentPage}
                                </span>
                              )}
                            </div>
                            <p className="font-jakarta text-xs text-[#6b7280] truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="size-12 rounded-2xl bg-gray-100 text-[#9ca3af] flex items-center justify-center mx-auto mb-3">
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <p className="font-jakarta text-sm font-semibold text-[#364153]">
                    Tidak ada hasil untuk &ldquo;{query}&rdquo;
                  </p>
                  <p className="font-jakarta text-xs text-[#9ca3af] mt-1">
                    Coba kata kunci lain atau periksa ejaan
                  </p>
                </div>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render on document.body
  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
