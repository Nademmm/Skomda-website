"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import { EKSKUL_LIST, EKSKUL_CATEGORIES } from "@/data/ekstrakurikulerData";

export default function EkstrakurikulerClient() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    return EKSKUL_LIST.filter((item) => {
      const matchCat =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.programs", "Program"), href: "/program/profil-jurusan" },
          { label: t("ekstrakurikuler.breadcrumb", "Ekstrakurikuler"), href: "/program/ekstrakurikuler" },
        ]}
        titlePrefix={t("ekstrakurikuler.heroTitle1", "Program")}
        titleHighlight={t("ekstrakurikuler.heroTitle2", "Ekstrakurikuler")}
        description="Wadah pengembangan potensi, minat, dan bakat siswa SMK Telkom Sidoarjo di bidang kepemimpinan, kepramukaan, riset karya ilmiah, olahraga, seni musik, bahasa, dan kejuaraan kompetitif."
        studentImage="/images/program/ekstrakurikuler/hero-student-guitar.png"
        studentAlt="Ekstrakurikuler SMK Telkom Sidoarjo"
        ctaText="Jelajahi Ekskul"
        ctaHref="#daftar-ekskul"
      />

      {/* Main Catalog Section */}
      <section id="daftar-ekskul" className="py-16 sm:py-24 bg-[#f8f9fb] scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#bc0c11]/10 text-[#bc0c11] mb-3">
              12 Ekstrakurikuler Resmi
            </span>
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-[#101828] mb-4">
              Daftar Ekstrakurikuler SKOMDA
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-[#bc0c11] mb-4" />
            <p className="font-jakarta text-base text-[#4a5565] leading-relaxed">
              Program pengembangan diri siswa untuk melatih kedisiplinan, kebugaran, kreativitas, dan kerja sama tim.
            </p>
          </div>

          {/* Controls: Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
              {EKSKUL_CATEGORIES.map((cat) => {
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

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ekstrakurikuler..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-[#101828] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all placeholder:text-gray-400"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Ekstrakurikuler Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-[24px] border-2 border-dashed border-[#d1d5dc] hover:border-[#bc0c11] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Header or Image */}
                {item.image ? (
                  <div className="relative w-full aspect-[16/9] bg-gray-900 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#bc0c11] text-white shadow-md">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-gradient-to-br from-[#101828] to-[#1f2937] text-white flex items-center justify-between border-b border-gray-100">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-gray-200 mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-jakarta font-bold text-xl text-white">
                        {item.name}
                      </h4>
                    </div>
                    <div className="size-10 rounded-full bg-white/10 text-[#bc0c11] font-extrabold text-sm flex items-center justify-center">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {item.image && (
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-[#4a5565]">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-gray-400">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    
                    <h3 className="font-jakarta font-bold text-lg text-[#101828] mb-3 group-hover:text-[#bc0c11] transition-colors">
                      {item.name}
                    </h3>

                    <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Join CTA */}
                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href={`https://wa.me/628113021919?text=Halo%20Admin%20SKOMDA,%20saya%20ingin%20bertanya%20seputar%20ekstrakurikuler%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-[#bc0c11] text-[#101828] hover:text-white border border-gray-200 hover:border-[#bc0c11] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Tanya Info Ekstrakurikuler
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
