"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfilJurusanHeroSection() {
  const scrollToKompetensi = () => {
    const el = document.getElementById("kompetensi");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs sm:text-sm text-[#4a5565] mb-5 font-jakarta"
            >
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
              <span className="font-semibold text-[#101828]">Profil Jurusan</span>
            </nav>

            {/* Heading */}
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[48px] leading-[1.18] tracking-tight text-[#101828] mb-3">
              Profil <span className="text-[#bc0c11]">Jurusan</span>
            </h1>

            {/* Red Accent Line */}
            <div className="mb-5 h-[3px] w-12 rounded-full bg-[#bc0c11]" />

            {/* Description */}
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed max-w-[580px] mb-8">
              SMK Telkom Sidoarjo memiliki dua jurusan unggulan: Teknik Jaringan
              Akses Telekomunikasi (TJAT) dan Sistem Informasi Jaringan dan
              Aplikasi (SIJA). Kurikulum Nasional Plus kami relevan dengan
              industri, melatih Anda menguasai teknologi terkini—mulai dari
              jaringan hingga pengembangan aplikasi—untuk membangun karir
              digital yang cemerlang. Jelajahi detail jurusan sekarang.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={scrollToKompetensi}
              className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer"
              style={{
                boxShadow:
                  "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-jakarta font-medium">Jelajahi</span>
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
          </motion.div>

          {/* Right: Signature Visual Artwork with Telkom Background Arch Shape */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[460px] aspect-[500/470] select-none">
              {/* Background Geometric Arches */}
              <div className="absolute left-0 top-[17.23%] w-[99.6%] h-[83%] pointer-events-none z-0">
                <Image
                  src="/images/common/hero-bg-shapes.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Student Portrait */}
              <div className="absolute left-[22%] top-0 w-[68%] h-[99.57%] z-10">
                <Image
                  src="/images/program/profil-jurusan/charen.png"
                  alt="Siswa SMK Telkom Sidoarjo"
                  fill
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
