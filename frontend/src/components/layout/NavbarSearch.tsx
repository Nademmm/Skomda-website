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
  category: "Jurusan" | "Halaman" | "Berita" | "Dokumen" | "Info";
  badge?: string;
  iconType: "major" | "page" | "news" | "doc" | "info" | "star" | "hub" | "facility";
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
  },
  {
    id: "j-tjat",
    title: "TJAT (Teknik Jaringan Akses Telekomunikasi)",
    description: "Program 3 Tahun: Fiber Optic, Jaringan Nirkabel, Microwave & ISP",
    href: "/program/profil-jurusan?jurusan=TJAT#kompetensi",
    category: "Jurusan",
    badge: "Program 3 Tahun",
    iconType: "major",
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
    id: "q-prestasi",
    title: "Prestasi Siswa & Penghargaan",
    description: "Juara kompetisi IT, IoT, inovasi aplikasi dan olimpiade nasional",
    href: "/tentang-kami/prestasi",
    category: "Halaman",
    badge: "Prestasi",
    iconType: "star",
  },
  {
    id: "q-fasilitas",
    title: "Fasilitas & Laboratorium Modern",
    description: "Lab cloud computing, fiber optic simulator, sport hall & studio",
    href: "/tentang-kami/fasilitas",
    category: "Halaman",
    badge: "Fasilitas",
    iconType: "facility",
  },
  {
    id: "q-hub",
    title: "Hub Industri & Kerjasama Perusahaan",
    description: "Kemitraan Telkom Group, Jagoan Hosting, Wowrack & magang industri",
    href: "/tentang-kami/hub-industri",
    category: "Halaman",
    badge: "Industri",
    iconType: "hub",
  },
];

const POPULAR_TAGS = [
  "SIJA",
  "TJAT",
  "PPDB 2026",
  "Brosur",
  "Prestasi",
  "Fasilitas",
  "Berita",
  "Mitra Industri",
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
      { id: "i-ppdb", title: "Brosur PPDB 2026/2027", description: "Alur pendaftaran, biaya, beasiswa dan persyaratan siswa baru", href: "/unduh-informasi", category: "Info", badge: "PPDB", iconType: "info" },
      { id: "i-akreditasi", title: "Akreditasi A Unggul", description: "Sertifikasi BAN-SM nilai tertinggi sekolah vokasi", href: "/unduh-informasi", category: "Info", badge: "Akreditasi", iconType: "info" },
      { id: "i-sertifikasi", title: "Sertifikasi Industri (Cisco, BNSP, AWS, MikroTik)", description: "Uji kompetensi internasional siap kerja di industri global", href: "/program/profil-jurusan#keunggulan-sertifikasi", category: "Info", badge: "Sertifikasi", iconType: "info" },
    ];

    return [...JURUSAN_ITEMS, ...STATIC_PAGES, ...newsItems, ...docItems, ...quickInfo];
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
        let score = 0;

        for (const t of terms) {
          if (titleLower.includes(t)) {
            score += 4;
            if (titleLower.startsWith(t)) score += 2;
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
      .slice(0, 10);
  }, [query, dataset]);

  // Group filtered results
  const groupedResults = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of filteredResults) {
      const arr = map.get(item.category) || [];
      arr.push(item);
      map.set(item.category, arr);
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
          placeholder="Cari jurusan, berita, PPDB, dokumen, fasilitas..."
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
                      Akses Cepat Halaman & Menu
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
                              <span
                                className={`font-jakarta text-sm font-bold truncate block transition-colors ${isSelected ? "text-[#bd0c12]" : "text-slate-900"
                                  }`}
                              >
                                {item.title}
                              </span>
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
                      <div className="px-2 pt-1 pb-1.5">
                        <span className="font-jakarta text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {category} ({items.length})
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
                                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                                    : "bg-slate-100/80 border border-slate-200/50 text-slate-600"
                                  }`}
                              >
                                <ItemIcon type={item.iconType} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <span
                                  className={`font-jakarta text-sm font-bold truncate block transition-colors ${isSelected ? "text-[#bd0c12]" : "text-slate-900"
                                    }`}
                                >
                                  {item.title}
                                </span>
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
                    Coba kata kunci lain seperti &lsquo;SIJA&rsquo;, &lsquo;PPDB&rsquo;, &lsquo;Beasiswa&rsquo;, atau &lsquo;Prestasi&rsquo;
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
