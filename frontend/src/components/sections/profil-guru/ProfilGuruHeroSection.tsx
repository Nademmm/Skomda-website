"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilGuruHeroSection() {
  const handleScrollToContent = () => {
    const el = document.getElementById("kepala-sekolah-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#f3f4f6] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Graphic Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[460px] aspect-[384/345] select-none">
              <Image
                src="/images/tentang-kami/profil-guru/profil-guru-hero.png"
                alt="Tim Guru SMK Telkom Sidoarjo"
                fill
                priority
                className="object-contain drop-shadow-md"
                sizes="(max-width: 768px) 100vw, 460px"
              />
            </div>
          </motion.div>

          {/* Right Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-sm font-jakarta">
              <Link
                href="/"
                className="text-[#4a5565] hover:text-[#bc0c11] transition-colors"
              >
                Beranda
              </Link>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="text-[#4a5565] shrink-0"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href="/tentang-kami/profil-sekolah"
                className="text-[#4a5565] hover:text-[#bc0c11] transition-colors"
              >
                Tentang Kami
              </Link>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="text-[#4a5565] shrink-0"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium text-[#101828]">Profil Guru</span>
            </div>

            {/* Title & Red Underline Bar */}
            <div className="relative mb-6">
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-[56px] leading-tight tracking-tight text-[#101828]">
                Profil <span className="text-[#e7000b]">Guru</span>
              </h1>
              <div className="mt-3.5 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
            </div>

            {/* Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-2xl mb-8">
              Tim pengajar kami adalah para profesional berdedikasi dengan keahlian di bidang Teknologi dan Informatika, serta berpengalaman di industri. Mereka siap membimbing siswa dengan metode inovatif dan mendukung pengembangan potensi maksimal.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleScrollToContent}
              className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer shadow-card-cta"
            >
              <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                Jelajahi
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
