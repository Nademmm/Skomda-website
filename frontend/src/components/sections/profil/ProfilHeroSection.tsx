"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilHeroSection() {
  const scrollToVisiMisi = () => {
    const element = document.getElementById("visi-misi");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Visual Artwork (Exact Figma proportions & layering) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[460px] aspect-[500/470] select-none">
              
              {/* Background Geometric Arches: left 0%, top 17.23%, w 99.6%, h 83% */}
              <div className="absolute left-0 top-[17.23%] w-[99.6%] h-[83%] pointer-events-none z-0">
                <Image
                  src="/images/tentang-kami/profil-sekolah/hero-bg-shapes.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Student Portrait: left 26.6%, top 0%, w 62.4%, h 99.57% */}
              <div className="absolute left-[26.6%] top-0 w-[62.4%] h-[99.57%] z-10">
                <Image
                  src="/images/tentang-kami/profil-sekolah/profil-hero-student.png"
                  alt="Siswi SMK Telkom Sidoarjo"
                  fill
                  className="object-contain object-bottom drop-shadow-md"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Information Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2"
          >
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-4 text-sm font-jakarta">
              <Link
                href="/"
                className="text-[#4a5565] hover:text-[#bd0c12] transition-colors"
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
              <span className="font-medium text-[#101828]">Profil Sekolah</span>
            </div>

            {/* Main Heading */}
            <div className="relative mb-6">
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-[56px] leading-tight tracking-tight text-[#101828]">
                Profil <span className="text-[#e7000b]">Sekolah</span>
              </h1>
              {/* Red Accent Underline Bar */}
              <div className="mt-3.5 h-[3px] w-14 bg-[#bd0c12] rounded-full" />
            </div>

            {/* Description Paragraph */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-2xl mb-8">
              SMK Telkom Sidoarjo adalah SMK Teknologi dan Informatika di bawah
              Yayasan Pendidikan Telkom, berdiri tahun 2018 dengan akreditasi
              &ldquo;A&rdquo; dan standar ISO 21001:2018. Sekolah ini menawarkan
              jurusan TJAT dan SIJA, menggunakan Kurikulum Nasional Plus yang
              fokus melatih siswa siap bekerja dan terampil dalam mengoperasikan
              serta memelihara jaringan telekomunikasi sesuai kebutuhan
              industri.
            </p>

            {/* CTA Button */}
            <button
              onClick={scrollToVisiMisi}
              className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer"
              style={{
                boxShadow:
                  "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
              }}
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
