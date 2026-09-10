"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, Network, Palette, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface TefaProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEFA_UNITS = [
  {
    id: "sija",
    title: "Software & Web Development",
    jurusan: "Kompetensi Keahlian SIJA",
    icon: Code2,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    description:
      "Pengembangan sistem informasi, website profil institusi, web app manajemen, dan aplikasi berbasis cloud yang dikerjakan langsung oleh siswa berprestasi di bawah bimbingan instruktur profesional.",
    deliverables: [
      "Custom Web Application & Company Profile",
      "Sistem Informasi Manajemen Sekolah / UMKM",
      "API Integration & Cloud Database Setup",
      "Quality Assurance & Pengujian Sistem",
    ],
  },
  {
    id: "tjat",
    title: "Jaringan & Fiber Optic Solution",
    jurusan: "Kompetensi Keahlian TJAT",
    icon: Network,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    description:
      "Layanan teknis instalasi dan pengujian infrastruktur jaringan komputer, instalasi FTTH (Fiber to the Home), splicing kabel optik, hingga konfigurasi perangkat jaringan skala enterprise.",
    deliverables: [
      "Instalasi & Splicing Kabel Fiber Optik",
      "Pengujian Redaman Jaringan menggunakan OTDR",
      "Konfigurasi Routing, Switching & WiFi Hotspot",
      "Dokumentasi & Topologi Jaringan Terstandar",
    ],
  },
  {
    id: "kreatif",
    title: "Digital Design & Media Kreatif",
    jurusan: "Layanan Lintas Kompetensi",
    icon: Palette,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    description:
      "Pembuatan materi visual representatif untuk kebutuhan promosi, identitas visual merek, perancangan antarmuka pengguna (UI/UX), dan video profil berstandar komersial.",
    deliverables: [
      "Perancangan Desain UI/UX Web & Mobile",
      "Desain Identitas Visual (Branding & Logo)",
      "Produksi Video Konten & Dokumentasi Acara",
      "Digital Marketing Visual Assets",
    ],
  },
];

export default function TefaProductsModal({ isOpen, onClose }: TefaProductsModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-jakarta">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tefa-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-[24px] shadow-2xl overflow-hidden border border-gray-100 z-10 my-auto"
          >
            {/* Header */}
            <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gradient-to-b from-gray-50/70 to-white">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-[#bc0c11]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#bc0c11] font-jakarta">
                    Teaching Factory Showcase
                  </span>
                </div>
                <h3 id="tefa-modal-title" className="text-xl sm:text-2xl font-bold font-jakarta text-[#101828]">
                  Produk & Layanan Jasa Siswa TeFa
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5565] mt-0.5 font-jakarta">
                  Hasil karya nyata siswa SMK Telkom Sidoarjo berbasis standar industri
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup jendela"
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#bc0c11] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-5">
              {TEFA_UNITS.map((unit) => {
                const IconComponent = unit.icon;
                return (
                  <div
                    key={unit.id}
                    className="p-5 sm:p-6 rounded-[20px] border border-gray-200/80 bg-white hover:border-[#bc0c11]/30 transition-all hover:shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${unit.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold font-jakarta text-[#101828] leading-tight">
                            {unit.title}
                          </h4>
                          <span className="text-xs font-medium font-jakarta text-gray-500">{unit.jurusan}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-jakarta text-[#4a5565] leading-relaxed mb-4">
                      {unit.description}
                    </p>

                    <div className="bg-[#f3f4f6]/70 rounded-xl p-4 border border-gray-100">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 block mb-2 font-jakarta">
                        Portofolio Layanan Unggulan:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {unit.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-jakarta text-[#364153]">
                            <CheckCircle2 className="w-4 h-4 text-[#bc0c11] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-jakarta text-[#4a5565] text-center sm:text-left">
                Tertarik menjalin kemitraan atau memesan jasa produksi TeFa?
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 text-xs sm:text-sm font-medium font-jakarta text-[#4a5565] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <Link
                  href="/tentang-kami/hub-industri"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#bc0c11] hover:bg-[#990a0e] text-xs sm:text-sm font-medium font-jakarta text-white transition-all active:scale-[0.98] shadow-sm cursor-pointer"
                >
                  <span>Hubungi Hub Industri</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
