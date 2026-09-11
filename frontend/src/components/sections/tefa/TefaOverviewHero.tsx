"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function TefaOverviewHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-[#f3f4f6] pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
      {/* Subtle Background Watermark from Figma */}
      <div
        className="absolute top-12 left-[48%] pointer-events-none select-none z-0 hidden xl:block"
        aria-hidden="true"
      >
        <span className="text-[140px] font-black text-gray-300/20 tracking-widest font-jakarta">
          TEFA
        </span>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-start"
        >
          {/* Standard Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-jakarta text-[#4a5565] mb-5"
          >
            <Link href="/" className="hover:text-[#bc0c11] transition-colors">
              {t("nav.home")}
            </Link>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-[#9ca3af]"
              aria-hidden="true"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#6b7280]">Teaching Factory</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-[#9ca3af]"
              aria-hidden="true"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold text-[#101828]" aria-current="page">
              Overview
            </span>
          </nav>

          {/* Main Title */}
          <div className="relative mb-5">
            <h1 className="font-jakarta font-bold text-3xl sm:text-5xl lg:text-[54px] leading-[1.18] tracking-tight text-[#101828]">
              Teaching Factory{" "}
              <span className="text-[#bc0c11]">SMK Telkom Sidoarjo</span>
            </h1>
            {/* Standard Red Accent Underline Bar */}
            <div className="mt-3.5 h-[3.5px] w-16 bg-[#bc0c11] rounded-full" />
          </div>

          {/* Description */}
          <p className="font-jakarta text-base sm:text-lg text-[#4a5565] leading-relaxed mb-8 max-w-2xl font-normal">
            Teaching Factory (TEFA) adalah konsep pembelajaran berbasis produksi yang menggabungkan
            kompetensi siswa dengan kebutuhan industri, sehingga menghasilkan karya nyata dan bernilai.
          </p>

          {/* Website Standard Primary CTA Button to Produk & Jasa */}
          <div>
            <Link
              href="/tefa/produk"
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
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
