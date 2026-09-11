"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AkreditasiSection() {
  return (
    <section id="akreditasi" className="relative w-full py-20 lg:py-28 bg-white border-y border-[#e5e7eb]/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center"
        >
          {/* Official Accreditation Badge */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8 sm:mb-10 drop-shadow-md hover:scale-102 transition-transform duration-300">
            <Image
              src="/images/common/akreditasi-a-badge.png"
              alt="Akreditasi A Unggul - SMK Telkom Sidoarjo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Official Decree Statement */}
          <div className="max-w-[680px] px-4">
            <p className="font-jakarta text-lg sm:text-xl text-[#364153] leading-relaxed">
              Berdasarkan Keputusan Badan Akreditasi Nasional Sekolah/Madrasah Nomor:{" "}
              <span className="font-semibold text-[#101828]">1336/BAN-SM/SK/2021</span>, menyatakan bahwa SMK Telkom Sidoarjo{" "}
              <span className="font-semibold text-[#bc0c11]">&ldquo;Terakreditasi A (UNGGUL).&rdquo;</span> Dengan Nilai{" "}
              <span className="font-semibold text-[#101828]">93</span>, Akreditasi SMK Telkom Sidoarjo berlaku sampai dengan{" "}
              <span className="font-semibold text-[#101828]">31 Desember 2026</span>.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
