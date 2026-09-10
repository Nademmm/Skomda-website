"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TefaAboutSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-white border-y border-gray-200/60 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Standard Red Accent Bar & Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-[3px] w-10 rounded-full bg-[#bc0c11]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#bc0c11] font-jakarta">
                TENTANG TEFA
              </span>
            </div>

            {/* Section Heading */}
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-[#101828] mb-5">
              Membentuk Kompetensi, <br />
              <span>Menghasilkan Karya Nyata</span>
            </h2>

            {/* Body Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#4a5565] leading-relaxed max-w-xl">
              TEFA di SMK Telkom Sidoarjo menjadi jembatan antara dunia pendidikan dan industri. Siswa
              tidak hanya belajar teori, tetapi juga terlibat langsung dalam proses produksi, proyek
              nyata, dan kolaborasi dengan mitra industri.
            </p>
          </motion.div>

          {/* Right Column: Building Image & Floating Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-6 relative mt-6 lg:mt-0"
          >
            {/* Main Building Photo Card */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-[24px] overflow-hidden shadow-sm border border-gray-200/70 bg-gray-100">
              <Image
                src="/images/tefa/tefa-building.png"
                alt="Gedung Teaching Factory SMK Telkom Sidoarjo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Overlapping Floating Quote Card */}
            <div className="relative lg:absolute -mt-10 sm:-mt-14 lg:mt-0 lg:-top-6 lg:-left-6 z-10 mx-4 lg:mx-0 max-w-[280px] sm:max-w-[300px] bg-white rounded-[20px] p-5 sm:p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] border border-gray-100">
              <div
                className="text-[#bc0c11] text-4xl sm:text-5xl font-serif font-black leading-none mb-2 select-none"
                aria-hidden="true"
              >
                “
              </div>
              <blockquote className="font-jakarta text-xs sm:text-sm font-medium text-[#4a5565] leading-relaxed">
                “TEFA membentuk siswa menjadi pribadi yang produktif, kompeten, dan siap kerja”
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
