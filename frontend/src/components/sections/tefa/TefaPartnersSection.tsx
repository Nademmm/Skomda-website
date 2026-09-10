"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const TEFA_PARTNERS = [
  {
    name: "Axelbit",
    src: "/images/partners/partner-axelbit.png",
    width: 140,
    height: 48,
  },
  {
    name: "Digital Creative Partner",
    src: "/images/partners/partner-play.png",
    width: 60,
    height: 44,
  },
  {
    name: "Jagoan Hosting",
    src: "/images/partners/partner-jagoanhosting.png",
    width: 150,
    height: 46,
  },
  {
    name: "Garuda Cyber",
    src: "/images/partners/partner-garuda.png",
    width: 110,
    height: 44,
  },
  {
    name: "Markaz Design",
    src: "/images/partners/partner-markazdesign.png",
    width: 145,
    height: 44,
  },
  {
    name: "GIT Solution",
    src: "/images/partners/partner-globalinfra.png",
    width: 125,
    height: 44,
  },
];

export default function TefaPartnersSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#f3f4f6]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Description & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Standard Red Accent Bar & Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-[3px] w-10 rounded-full bg-[#bc0c11]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#bc0c11] font-jakarta">
                MITRA INDUSTRI
              </span>
            </div>

            {/* Section Heading */}
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-[#101828] mb-5">
              Kolaborasi untuk{" "}
              <span className="text-[#bc0c11]">Industri</span>
            </h2>

            {/* Body Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#4a5565] leading-relaxed max-w-xl mb-8">
              TEFA di SMK Telkom Sidoarjo didukung oleh berbagai mitra industri dari berbagai sektor.
              Kolaborasi ini menjadi bukti nyata bahwa karya siswa kami diakui dan dimanfaatkan di
              dunia kerja.
            </p>

            {/* Website Standard CTA Button */}
            <div>
              <Link
                href="/tentang-kami/hub-industri"
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  Lihat Mitra Industri
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

          {/* Right Column: Industry Partner Logos Grid with Side Dividers */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            {/* Outer container with clean side divider lines on larger screens */}
            <div className="relative py-6 sm:py-8 lg:px-8 border-y sm:border-y-0 lg:border-y-0 lg:border-x border-gray-300/80 rounded-2xl sm:rounded-none bg-white/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center">
                {TEFA_PARTNERS.map((partner, index) => (
                  <div
                    key={index}
                    className="group w-full h-24 flex items-center justify-center p-3 rounded-xl bg-white sm:bg-white/80 border-2 border-dashed border-[#d1d5dc] shadow-sm hover:shadow-md hover:border-[#bc0c11] hover:scale-[1.03] transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative w-full h-full max-h-12 flex items-center justify-center pointer-events-none">
                      <Image
                        src={partner.src}
                        alt={`Logo ${partner.name}`}
                        width={partner.width}
                        height={partner.height}
                        className="object-contain max-h-12 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-200 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
