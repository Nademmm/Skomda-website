"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import { PRESTASI_LIST, PRESTASI_CATEGORIES, PrestasiItem } from "@/data/prestasiData";

export default function PrestasiClient() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalItem, setActiveModalItem] = useState<PrestasiItem | null>(null);

  const filteredItems = useMemo(() => {
    return PRESTASI_LIST.filter((item) => {
      const matchCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q) ||
        item.competition.toLowerCase().includes(q) ||
        item.organizer.toLowerCase().includes(q) ||
        item.award.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const stats = [
    { value: "11+", label: "Prestasi Terkini 2026" },
    { value: "4", label: "Juara 1 & Gold Medal" },
    { value: "3", label: "Juara 2 Bergengsi" },
    { value: "4", label: "Juara 3 Tingkat Wilayah" },
  ];

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.aboutUs", "Tentang Kami"), href: "/tentang-kami/profil-sekolah" },
          { label: t("prestasi.breadcrumb", "Prestasi"), href: "/tentang-kami/prestasi" },
        ]}
        titlePrefix={t("prestasi.heroTitle1", "Prestasi &")}
        titleHighlight={t("prestasi.heroTitle2", "Penghargaan")}
        description="Jejak langkah prestasi membanggakan siswa-siswi SMK Telkom Sidoarjo dalam berbagai ajang kompetisi sains, teknologi kecerdasan artifisial, seni multimedia, olahraga, dan kepemimpinan."
        studentImage="/images/tentang-kami/prestasi/hero-student-prestasi.png"
        studentAlt="Prestasi SMK Telkom Sidoarjo"
        ctaText="Jelajahi Prestasi"
        ctaHref="#daftar-prestasi"
      />

      {/* Stats Counter Strip */}
      <section className="bg-[#101828] text-white py-10 sm:py-12 border-b border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
              >
                <div className="font-jakarta font-extrabold text-3xl sm:text-4xl text-[#f3f4f6] mb-1">
                  {stat.value}
                </div>
                <div className="font-jakarta text-xs sm:text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Prestasi Section */}
      <section id="daftar-prestasi" className="py-16 sm:py-24 bg-[#f8f9fb] scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#bc0c11]/10 text-[#bc0c11] mb-3">
              Hall of Fame SKOMDA
            </span>
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-[#101828] mb-4">
              Koleksi Prestasi & Kejuaraan Siswa
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-[#bc0c11] mb-4" />
            <p className="font-jakarta text-base text-[#4a5565] leading-relaxed">
              Bukti nyata dedikasi dan keterampilan siswa SMK Telkom Sidoarjo yang siap bersaing dan berinovasi di kancah daerah hingga nasional.
            </p>
          </div>

          {/* Controls: Search & Category Pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
              {PRESTASI_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#bc0c11] text-white shadow-md shadow-[#bc0c11]/25"
                        : "bg-white text-[#4a5565] border border-gray-200 hover:border-[#bc0c11]/50 hover:text-[#bc0c11]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari prestasi, nama, ajang..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-[#101828] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all placeholder:text-gray-400"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Prestasi Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200 p-8">
              <p className="font-jakarta text-base text-gray-500 mb-4">
                Tidak ditemukan prestasi yang sesuai dengan kriteria pencarian.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("Semua");
                  setSearchQuery("");
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#bc0c11] text-white text-sm font-semibold hover:bg-[#a00a0e] transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredItems.map((item) => {
                const isGold = item.badgeLevel === "Juara 1" || item.badgeLevel === "Gold Medal";
                const isSilver = item.badgeLevel === "Juara 2";
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-[24px] border-2 border-dashed border-[#d1d5dc] hover:border-[#bc0c11] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Award Level Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                            isGold
                              ? "bg-amber-400 text-amber-950"
                              : isSilver
                              ? "bg-slate-200 text-slate-800"
                              : "bg-orange-200 text-orange-900"
                          }`}
                        >
                          <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {item.award}
                        </span>
                      </div>

                      {/* Year & Category Tag */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
                          {item.year}
                        </span>
                      </div>

                      {/* Winner Name Bar on Image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs text-gray-200 font-medium">{item.category}</p>
                        <p className="text-sm font-bold truncate">{item.studentName}</p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Competition Info */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#bc0c11] mb-2">
                          <span>{item.competition}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-jakarta font-bold text-lg text-[#101828] mb-3 line-clamp-2 group-hover:text-[#bc0c11] transition-colors">
                          {item.title}
                        </h3>

                        {/* Description Preview */}
                        <p className="font-jakarta text-sm text-[#4a5565] line-clamp-3 mb-4 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Footer: Student Info & Action */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-[#bc0c11]/10 text-[#bc0c11] flex items-center justify-center font-bold text-xs">
                            {item.studentClass.slice(0, 3)}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {item.studentClass}
                          </span>
                        </div>

                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold text-[#bc0c11] bg-[#bc0c11]/5 hover:bg-[#bc0c11] hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                        >
                          Lihat Detail
                          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Prestasi Detail Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Image */}
              <div className="relative w-full h-64 sm:h-72 bg-gray-900 shrink-0">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 size-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                  aria-label="Tutup modal"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
                    {activeModalItem.award}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#bc0c11] mb-2">
                  <span>{activeModalItem.category}</span>
                  <span>•</span>
                  <span>Tahun {activeModalItem.year}</span>
                </div>

                <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828] mb-4">
                  {activeModalItem.title}
                </h3>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#f8f9fb] border border-gray-100 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Nama Siswa / Pemenang</p>
                    <p className="text-sm font-bold text-[#101828]">{activeModalItem.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Kelas / Tim</p>
                    <p className="text-sm font-bold text-[#101828]">{activeModalItem.studentClass}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Ajang Kompetisi</p>
                    <p className="text-sm font-bold text-[#101828]">{activeModalItem.competition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Penyelenggara</p>
                    <p className="text-sm font-bold text-[#101828]">{activeModalItem.organizer}</p>
                  </div>
                </div>

                <h4 className="font-jakarta font-bold text-sm text-[#101828] mb-2">
                  Ulasan Prestasi:
                </h4>
                <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mb-6">
                  {activeModalItem.description}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#bc0c11] text-white text-sm font-semibold hover:bg-[#a00a0e] transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
