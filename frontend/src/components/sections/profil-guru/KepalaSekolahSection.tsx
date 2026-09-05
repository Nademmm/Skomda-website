"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { kepalaSekolah } from "@/data/teachers";
import { Mail } from "lucide-react";

export default function KepalaSekolahSection() {
  return (
    <section
      id="kepala-sekolah-section"
      className="relative w-full py-20 lg:py-28 bg-white border-y border-gray-200/60 overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Photo Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-[420px] aspect-[448/560] relative rounded-[20px] border-2 border-dashed border-[#d1d5dc] p-3 bg-white shadow-sm overflow-hidden group hover:border-[#bc0c11] transition-colors">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-gradient-to-b from-[#f3f4f6] to-[#e5e7eb]">
                <Image
                  src={kepalaSekolah.image}
                  alt={kepalaSekolah.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Info Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow */}
            <p className="font-jakarta text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4a5565] mb-2">
              Kepala Sekolah <span className="text-[#bc0c11]">SMK Telkom Sidoarjo</span>
            </p>

            {/* Name */}
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#101828] leading-tight mb-4 tracking-tight">
              {kepalaSekolah.name}
            </h2>

            {/* Bio */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed mb-8 max-w-2xl">
              {kepalaSekolah.bio}
            </p>

            {/* 2x2 Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-xl mb-8">
              <div className="rounded-2xl bg-[#f9fafb] p-5 border border-gray-100 hover:border-gray-200/80 transition-all shadow-xs">
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-[#bc0c11] block mb-1">
                  Pendidikan Terakhir
                </span>
                <p className="font-jakarta text-base text-[#101828] font-medium">
                  {kepalaSekolah.pendidikanTerakhir}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f9fafb] p-5 border border-gray-100 hover:border-gray-200/80 transition-all shadow-xs">
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-[#bc0c11] block mb-1">
                  Bidang Keahlian
                </span>
                <p className="font-jakarta text-base text-[#101828] font-medium">
                  {kepalaSekolah.bidangKeahlian}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f9fafb] p-5 border border-gray-100 hover:border-gray-200/80 transition-all shadow-xs">
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-[#bc0c11] block mb-1">
                  Jabatan / Posisi
                </span>
                <p className="font-jakarta text-base text-[#101828] font-medium">
                  {kepalaSekolah.role}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f9fafb] p-5 border border-gray-100 hover:border-gray-200/80 transition-all shadow-xs">
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-[#bc0c11] block mb-1">
                  Motto
                </span>
                <p className="font-jakarta text-sm sm:text-[15px] text-[#364153] italic leading-relaxed">
                  &ldquo;{kepalaSekolah.motto}&rdquo;
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-[#bc0c11]">
                Kontak Profesional:
              </span>
              <a
                href={`mailto:${kepalaSekolah.kontak}`}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f3f4f6] text-[#101828] hover:bg-[#bc0c11] hover:text-white transition-all text-sm font-medium shadow-xs"
              >
                <Mail className="size-4 text-[#bc0c11] group-hover:text-white transition-colors" />
                <span>{kepalaSekolah.kontak}</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}