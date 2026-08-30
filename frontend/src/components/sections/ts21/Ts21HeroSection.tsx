"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";

export default function Ts21HeroSection() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToFramework = () => {
    const el = document.getElementById("framework");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Close modal with ESC key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <section className="relative w-full overflow-hidden bg-[#f3f4f6] pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Text Content & Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Breadcrumbs - placed tightly right above the heading */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-jakarta text-[#4a5565] mb-3">
              <Link href="/" className="hover:text-[#bc0c11] transition-colors">
                Beranda
              </Link>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Program</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-[#101828]">Program TS.21</span>
            </nav>

            {/* Main Title */}
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.18] tracking-tight text-[#101828] mb-5">
              Program TS.21: Langkah Menuju{" "}
              <span className="text-[#bc0c11]">Sekolah 4.0</span>
            </h1>

            {/* Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#4a5565] leading-relaxed mb-8 max-w-2xl">
              Kurikulum unggulan yang berfokus pada Kompetensi Abad 21. Mengintegrasikan{" "}
              <strong className="text-[#101828] font-semibold">Blended Learning</strong>,{" "}
              <strong className="text-[#101828] font-semibold">Project-Based Learning</strong>, dan{" "}
              <strong className="text-[#101828] font-semibold">Studio Classroom</strong> untuk mencetak
              lulusan berkarakter unggul, berdaya saing digital tinggi, dan siap kerja.
            </p>

            {/* Exact Website Standard Primary CTA Button */}
            <div>
              <button
                type="button"
                onClick={scrollToFramework}
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  Pelajari Selengkapnya
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Right: Signature Framed Diagram Image with Interactive Lightbox Zoom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[580px]">
              {/* 1. Outer Dashed Border Accent Frame */}
              <div className="absolute -left-2.5 -top-2.5 -right-2.5 -bottom-2.5 border-2 border-dashed border-[#bc0c11]/30 rounded-[26px] pointer-events-none transition-colors duration-300" />

              {/* 2. Main Image Container */}
              <div
                onClick={() => setIsOpen(true)}
                className="group relative w-full aspect-[16/10] rounded-[20px] bg-white p-2 sm:p-3 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200/80 flex items-center justify-center"
              >
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="/figma/ts21-framework.png"
                    alt="Framework Ekosistem Implementasi Kurikulum Merdeka TS 21.40 PLiS"
                    fill
                    className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    priority
                  />
                </div>

                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-[#101828]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/95 text-[#101828] font-jakarta font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="size-4 text-[#bc0c11]" />
                    <span>Klik untuk memperbesar</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[92vh] bg-white rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200">
                <div>
                  <h3 className="font-jakarta font-bold text-base sm:text-lg text-[#101828]">
                    Framework Ekosistem Implementasi Kurikulum Merdeka TS 21.40 PLiS
                  </h3>
                  <p className="font-jakarta text-xs text-[#6a7282]">
                    SMK Telkom Sidoarjo &bull; Langkah Menuju Sekolah 4.0
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Modal Image Area with Scroll */}
              <div className="relative flex-1 min-h-[360px] sm:min-h-[560px] w-full mt-4 overflow-auto rounded-xl bg-gray-50 flex items-center justify-center p-2">
                <div className="relative w-full h-full min-h-[460px]">
                  <Image
                    src="/figma/ts21-framework.png"
                    alt="Diagram Framework Kurikulum TS21 Lengkap"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
