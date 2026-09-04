"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HubIndustriHeroSection() {
  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start order-1"
          >
            {/* Breadcrumbs */}
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
                href="#"
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
              <span className="font-medium text-[#101828]">Hub Industri</span>
            </div>

            {/* Main Heading */}
            <div className="relative mb-6">
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-[56px] leading-tight tracking-tight text-[#101828]">
                Hub{" "}
                <span className="text-[#bc0c11]">Industri</span>
              </h1>
              {/* Red Accent Underline Bar */}
              <div className="mt-3.5 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
            </div>

            {/* Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-xl mb-8">
              Kemitraan strategis SMK Telkom Sidoarjo dengan berbagai perusahaan
              teknologi dan telekomunikasi terkemuka — memastikan kurikulum
              tetap relevan, siswa mendapat pengalaman nyata, dan lulusan
              langsung terserap di dunia industri.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#mitra-industri"
                className="inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-colors hover:bg-[#990a0e]"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium">Lihat Mitra Kami</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
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
            <div className="relative w-full max-w-[580px] aspect-[16/10] rounded-[25px] overflow-hidden shadow-xl">
              <Image
                src="/images/tentang-kami/hub-industri/hub-industri-hero.jpg"
                alt="Siswa SMK Telkom Sidoarjo berkolaborasi dengan profesional industri di laboratorium teknologi"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
