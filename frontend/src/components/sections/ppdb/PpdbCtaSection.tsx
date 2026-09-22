"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PpdbCtaSectionProps {
  onOpenBrochure?: () => void;
}

export default function PpdbCtaSection({ onOpenBrochure }: PpdbCtaSectionProps) {
  const { isEn } = useLanguage();

  return (
    <section className="relative w-full py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative bg-[#bc0c11] rounded-[24px] sm:rounded-[32px] px-8 sm:px-12 lg:px-16 py-12 sm:py-14 text-center overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-16 -right-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute top-6 right-8 w-20 h-20 bg-white/5 rounded-full pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[42px] text-white leading-tight mb-4">
              {isEn
                ? "Ready to Join Our Family?"
                : "Siap Bergabung Bersama Kami?"}
            </h2>
            <p className="font-jakarta text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-lg mx-auto">
              {isEn
                ? "Thousands of alumni have started here. Your turn to build a future in the digital world."
                : "Ribuan alumni sudah memulai dari sini. Kini giliran kamu untuk membangun masa depan di dunia digital."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://ppdb.telkomschools.sch.id/signup?lemdik=4"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 min-h-[48px] font-jakarta font-semibold text-[15px] text-[#bc0c11] transition-all duration-300 hover:bg-gray-50 active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <span className="whitespace-nowrap">
                  {isEn ? "Register for PPDB" : "Daftar PPDB Sekarang"}
                </span>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 shrink-0" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#bc0c11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-transparent px-7 py-3.5 min-h-[48px] font-jakarta font-semibold text-[15px] text-white transition-all duration-300 hover:border-white hover:bg-white/10 active:scale-[0.98] cursor-pointer"
              >
                <Eye className="size-4 text-white shrink-0" aria-hidden="true" />
                <span>{isEn ? "View Brochure" : "Lihat Brosur"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
