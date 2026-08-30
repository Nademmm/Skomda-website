"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AkomodasiHeroSection() {
  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start order-1"
          >
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs sm:text-sm text-[#4a5565] mb-5 font-jakarta"
            >
              <Link
                href="/"
                className="hover:text-[#bc0c11] transition-colors"
              >
                Beranda
              </Link>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Tentang Kami</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-[#101828]">Akomodasi</span>
            </nav>

            {/* Main Heading */}
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[48px] leading-[1.18] tracking-tight text-[#101828] mb-3">
              Akomodasi &amp;{" "}
              <span className="text-[#bc0c11]">Biaya Hidup</span>
            </h1>

            {/* Red accent line */}
            <div className="mb-5 h-[3px] w-12 rounded-full bg-[#bc0c11]" />

            {/* Description Paragraph */}
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed max-w-[560px] mb-8">
              SMK Telkom Sidoarjo menyajikan informasi akomodasi dan biaya hidup
              secara transparan. Kami merekomendasikan berbagai pilihan tempat
              tinggal yang nyaman, seperti kos atau kontrakan, di sekitar sekolah.
              Dukungan ini bertujuan agar siswa fokus pada pembelajaran dan mencapai
              hasil optimal. Jelajahi rekomendasi penginapan di sekitar SMK Telkom
              Sidoarjo untuk mempermudah perencanaan Anda.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="#biaya-hidup"
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98]"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium">Jelajahi Estimasi Biaya</span>
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
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center lg:justify-end order-2"
          >
            <div className="relative w-full max-w-[580px] aspect-[16/10] rounded-[25px] overflow-hidden shadow-xl border-2 border-white">
              <Image
                src="/figma/akomodasi-hero.jpg"
                alt="Suasana kamar kos dan akomodasi siswa SMK Telkom Sidoarjo yang nyaman dan modern"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 580px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
