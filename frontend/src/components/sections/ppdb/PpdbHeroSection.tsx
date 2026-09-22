"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import { Eye } from "lucide-react";

interface PpdbHeroSectionProps {
  onOpenBrochure?: () => void;
}

export default function PpdbHeroSection({ onOpenBrochure }: PpdbHeroSectionProps) {
  const { isEn } = useLanguage();

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#f3f4f6] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start order-1"
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-5 text-sm font-jakarta text-[#4a5565] flex-wrap">
              <Link href="/" className="hover:text-[#bc0c11] transition-colors">
                {isEn ? "Home" : "Beranda"}
              </Link>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#4a5565] shrink-0" aria-hidden="true">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-[#101828]" aria-current="page">PPDB</span>
            </nav>

            {/* Main Heading */}
            <div className="relative mb-5">
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] tracking-tight text-[#101828]">
                {isEn ? (
                  <>
                    Your Future{" "}
                    <span className="text-[#bc0c11]">Starts Here.</span>
                  </>
                ) : (
                  <>
                    Masa Depanmu{" "}
                    <span className="text-[#bc0c11]">Dimulai di Sini.</span>
                  </>
                )}
              </h1>
              <div className="mt-4 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
            </div>

            {/* Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-xl mb-8">
              {isEn
                ? "Join SMK Telkom Sidoarjo and take your first step into a world-class digital education. Choose SIJA, TJKT, or RPL and build the career you deserve."
                : "Bergabunglah dengan SMK Telkom Sidoarjo dan mulai langkah pertama menuju pendidikan kejuruan digital terbaik. Pilih jurusan SIJA, TJKT, atau RPL dan cetak karir impianmu."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="https://ppdb.telkomschools.sch.id/signup?lemdik=4"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3.5 min-h-[48px] text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] shadow-md"
              >
                <span className="font-jakarta font-semibold text-[15px] leading-none whitespace-nowrap">
                  {isEn ? "Register Now" : "Daftar Sekarang"}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 shrink-0" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#101828] bg-transparent px-6 py-3.5 min-h-[48px] text-base font-medium text-[#101828] transition-all duration-300 hover:border-[#bc0c11] hover:text-[#bc0c11] active:scale-[0.98] cursor-pointer"
              >
                <Eye className="size-[17px] text-current shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <span className="font-jakarta font-semibold text-[15px] leading-none whitespace-nowrap">
                  {isEn ? "View Brochure" : "Lihat Brosur"}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-2 relative"
          >
            <div className="relative w-full max-w-[460px] select-none">
              {/* Red rounded background shape */}
              <div className="absolute right-0 bottom-0 w-[80%] h-[88%] bg-[#bc0c11] rounded-[28px] z-0 shadow-xl shadow-red-900/10" />

              {/* Grey polygon shape - decorative */}
              <div className="absolute left-0 bottom-6 w-44 h-44 opacity-70 pointer-events-none -rotate-6 z-0">
                <Image
                  src="/images/trial-class/polygon-shape.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Student photo */}
              <div className="relative z-10 w-full aspect-[0.85/1] flex items-end justify-center">
                <Image
                  src="/images/trial-class/hero-student.png"
                  alt="Calon siswa SMK Telkom Sidoarjo"
                  fill
                  sizes="(max-width: 768px) 320px, 460px"
                  className="object-contain object-bottom drop-shadow-xl select-none pointer-events-none"
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
