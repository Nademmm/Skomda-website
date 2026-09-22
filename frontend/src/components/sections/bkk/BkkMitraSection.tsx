"use client";

import Image from "next/image";
import { MITRA_BKK_LOGOS } from "@/data/bkkData";
import { useLanguage } from "@/context/LanguageContext";

export default function BkkMitraSection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Red Bar Divider */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828] mb-3">
            {isEn ? "Connected with the " : "Terhubung dengan "}
            <span className="text-[#bc0c11]">
              {isEn ? "Industrial World" : "Dunia Industri"}
            </span>
          </h2>

          <div className="h-1 w-12 rounded-full bg-[#bc0c11] mb-4" />

          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed">
            {isEn
              ? "Together with leading industry partners, we continuously open broader career and internship opportunities for SKOMDA students and alumni."
              : "Bersama mitra industri terkemuka, kami terus membuka peluang kerja, magang bersertifikat, dan rekrutmen prioritas bagi siswa dan alumni SKOMDA."}
          </p>
        </div>

        {/* Partner Logos Grid with Signature Dashed Border Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 items-center">
          {MITRA_BKK_LOGOS.map((mitra) => (
            <div
              key={mitra.name}
              title={mitra.name}
              className="h-24 sm:h-28 rounded-[20px] bg-white border-2 border-dashed border-[#d1d5dc] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-[#bc0c11] hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative w-full h-12 flex items-center justify-center">
                <Image
                  src={mitra.src}
                  alt={`Logo ${mitra.name}`}
                  width={110}
                  height={44}
                  className="max-h-10 w-auto max-w-[90px] object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
