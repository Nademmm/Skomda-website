"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface TefaHeroSectionProps {
  onOpenProducts: () => void;
}

export default function TefaHeroSection({ onOpenProducts }: TefaHeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#f3f4f6] pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-start"
        >
          {/* Standard Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-jakarta text-[#4a5565] mb-4"
          >
            <Link href="/" className="hover:text-[#bc0c11] transition-colors">
              Beranda
            </Link>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]" aria-hidden="true">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold text-[#101828]" aria-current="page">
              Teaching Factory
            </span>
          </nav>

          {/* Main Title */}
          <div className="relative mb-5">
            <h1 className="font-jakarta font-bold text-3xl sm:text-5xl lg:text-[56px] leading-[1.16] tracking-tight text-[#101828]">
              Teaching Factory{" "}
              <span className="text-[#bc0c11]">SMK Telkom Sidoarjo</span>
            </h1>
            {/* Standard Red Accent Underline Bar */}
            <div className="mt-3.5 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
          </div>

          {/* Description */}
          <p className="font-jakarta text-base sm:text-lg text-[#4a5565] leading-relaxed mb-8 max-w-2xl font-normal">
            Teaching Factory (TEFA) adalah konsep pembelajaran berbasis produksi yang menggabungkan
            kompetensi siswa dengan kebutuhan industri, sehingga menghasilkan karya nyata dan bernilai.
          </p>

          {/* Website Standard Primary CTA Button */}
          <div>
            <button
              type="button"
              onClick={onOpenProducts}
              className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer"
              style={{
                boxShadow:
                  "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                Jelajahi Produk & Jasa
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
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
      </div>
    </section>
  );
}
