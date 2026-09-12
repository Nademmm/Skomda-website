"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BkkHeroSection() {
  const scrollToPeluang = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("peluang-karier");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#f3f4f6] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start order-1"
          >
            {/* Breadcrumb Path with consistent Chevron SVG */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 text-sm font-jakarta text-[#4a5565] flex-wrap">
              <Link href="/" className="hover:text-[#bc0c11] transition-colors">
                Beranda
              </Link>
              <span className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#4a5565] shrink-0"
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
                <Link href="/program/profil-jurusan" className="hover:text-[#bc0c11] transition-colors">
                  Program
                </Link>
              </span>
              <span className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#4a5565] shrink-0"
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
                <span className="font-medium text-[#101828]">BKK</span>
              </span>
            </nav>

            {/* Title & Red Underline Accent Bar */}
            <div className="relative mb-6">
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-[54px] leading-tight tracking-tight text-[#101828]">
                Langkah Berikutnya <span className="text-[#e7000b]">Dimulai dari Sini.</span>
              </h1>
              <div className="mt-3.5 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
            </div>

            {/* Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-xl mb-8">
              Menghubungkan siswa dan alumni SMK Telkom Sidoarjo dengan peluang kerja, pengembangan karier, dan dunia industri.
            </p>

            {/* CTA Button */}
            <a
              href="#peluang-karier"
              onClick={scrollToPeluang}
              className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] shadow-card-cta"
            >
              <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                Jelajahi Peluang
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
            </a>
          </motion.div>

          {/* Visual Artwork Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-2 relative"
          >
            <div className="relative w-full max-w-[460px] aspect-[500/470] select-none">
              
              {/* Background Geometric Shapes (Telkom red arch & circles) */}
              <div className="absolute left-0 top-[17.23%] w-[99.6%] h-[83%] pointer-events-none z-0">
                <Image
                  src="/images/common/hero-bg-shapes.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Student Real Photo Cutout */}
              <div className="absolute left-[20%] sm:left-[22%] top-0 w-[70%] sm:w-[66%] h-[99.57%] z-10">
                <Image
                  src="/images/home/hero/image5.png"
                  alt="Talenta Siswa SMK Telkom Sidoarjo"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 300px, 460px"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
