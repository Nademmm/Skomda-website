"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import { FASILITAS_LIST } from "@/data/fasilitasData";

export default function FasilitasClient() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FASILITAS_LIST;
    return FASILITAS_LIST.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.specs && item.specs.some((s) => s.toLowerCase().includes(q)))
      );
    });
  }, [searchQuery]);

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.aboutUs", "Tentang Kami"), href: "/tentang-kami/profil-sekolah" },
          { label: t("fasilitas.breadcrumb", "Fasilitas"), href: "/tentang-kami/fasilitas" },
        ]}
        titlePrefix={t("fasilitas.heroTitle1", "Fasilitas &")}
        titleHighlight={t("fasilitas.heroTitle2", "Infrastruktur")}
        description="Fasilitas modern berstandar internasional ISO 21001:2018 di SMK Telkom Sidoarjo dirancang untuk memberikan pengalaman belajar praktis, inovatif, dan relevan dengan industri telekomunikasi masa kini."
        studentImage="/images/tentang-kami/fasilitas/hero-student-fasilitas.png"
        studentAlt="Fasilitas SMK Telkom Sidoarjo"
        ctaText="Jelajahi Sarana"
        ctaHref="#daftar-fasilitas"
      />

      {/* Main Facilities Catalog */}
      <section id="daftar-fasilitas" className="py-16 sm:py-24 bg-[#f8f9fb] scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-[#101828] mb-4">
              Laboratorium &amp; Sarana Prasarana Terpadu
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-[#bc0c11] mb-4" />
            <p className="font-jakarta text-base text-[#4a5565] leading-relaxed">
              Mulai dari laboratorium kejuruan tingkat lanjut hingga lingkungan belajar luar ruang yang asri, seluruh sarana dirancang demi kenyamanan dan kesiapan kerja siswa.
            </p>
          </div>

          {/* Controls: Search Only */}
          <div className="mb-10 max-w-2xl mx-auto">
            <div className="relative w-full">
              <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search className="size-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari fasilitas sekolah..."
                className="w-full rounded-full bg-white pl-14 sm:pl-16 pr-12 sm:pr-14 py-3.5 sm:py-4 text-sm sm:text-base font-jakarta text-[#101828] placeholder-gray-400 border border-gray-200/90 focus:border-[#bc0c11] focus:outline-none shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Hapus pencarian"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Facilities Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[24px] border-2 border-dashed border-[#d1d5dc] p-8 max-w-xl mx-auto">
              <p className="font-jakarta text-sm sm:text-base text-[#4a5565] mb-4">
                Tidak ada fasilitas yang sesuai dengan pencarian &ldquo;<strong className="text-[#101828]">{searchQuery}</strong>&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 rounded-full bg-[#bc0c11] hover:bg-[#990a0e] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold font-jakarta transition-all duration-200 cursor-pointer shadow-xs"
              >
                <span>Atur Ulang Pencarian</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredItems.map((facility) => (
                <motion.div
                  key={facility.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-[24px] border-2 border-dashed border-[#d1d5dc] hover:border-[#bc0c11] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="font-jakarta font-bold text-lg text-[#101828] mb-2 group-hover:text-[#bc0c11] transition-colors">
                      {facility.name}
                    </h3>
                    <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
