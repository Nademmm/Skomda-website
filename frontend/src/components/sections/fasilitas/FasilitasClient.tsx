"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import { FASILITAS_LIST, FASILITAS_CATEGORIES } from "@/data/fasilitasData";

export default function FasilitasClient() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    return FASILITAS_LIST.filter((item) => {
      const matchCat =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.specs.some((s) => s.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

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

      {/* Facilities Highlight Grid */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f8f9fb] border border-gray-200/80 flex items-start gap-4">
              <div className="size-12 rounded-xl bg-[#bc0c11]/10 text-[#bc0c11] flex items-center justify-center shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-jakarta font-bold text-base text-[#101828] mb-1">
                  Smart Classroom 55 Inch
                </h3>
                <p className="text-sm text-[#4a5565] leading-relaxed">
                  Ruang kelas full AC dilengkapi Smart TV 55 Inch interaktif, meja single seat, dan Wi-Fi dedicated.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8f9fb] border border-gray-200/80 flex items-start gap-4">
              <div className="size-12 rounded-xl bg-[#bc0c11]/10 text-[#bc0c11] flex items-center justify-center shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-jakarta font-bold text-base text-[#101828] mb-1">
                  Gedung RPS 2 Lantai
                </h3>
                <p className="text-sm text-[#4a5565] leading-relaxed">
                  Pusat inkubasi vokasi siswa dengan standar teaching factory dan sertifikasi industri telekomunikasi.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8f9fb] border border-gray-200/80 flex items-start gap-4">
              <div className="size-12 rounded-xl bg-[#bc0c11]/10 text-[#bc0c11] flex items-center justify-center shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-jakarta font-bold text-base text-[#101828] mb-1">
                  Fiber Optic & AI Ready
                </h3>
                <p className="text-sm text-[#4a5565] leading-relaxed">
                  Perangkat splicing OTDR industri, server enterprise, serta workstation riset kecerdasan buatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Facilities Catalog */}
      <section id="daftar-fasilitas" className="py-16 sm:py-24 bg-[#f8f9fb] scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#bc0c11]/10 text-[#bc0c11] mb-3">
              Infrastruktur & Sarana
            </span>
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-[#101828] mb-4">
              Laboratorium & Sarana Prasarana Terpadu
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-[#bc0c11] mb-4" />
            <p className="font-jakarta text-base text-[#4a5565] leading-relaxed">
              Mulai dari laboratorium kejuruan tingkat lanjut hingga lingkungan belajar luar ruang yang asri, seluruh sarana dirancang demi kenyamanan dan kesiapan kerja siswa.
            </p>
          </div>

          {/* Controls: Category Filter & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
              {FASILITAS_CATEGORIES.map((cat) => {
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
                placeholder="Cari fasilitas atau spesifikasi..."
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

          {/* Facilities Grid */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#bc0c11] text-white shadow-md">
                      {facility.badge}
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {facility.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-jakarta font-bold text-lg text-[#101828] mb-2 group-hover:text-[#bc0c11] transition-colors">
                      {facility.name}
                    </h3>
                    <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed mb-4">
                      {facility.description}
                    </p>
                  </div>

                  {/* Specs List */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Fitur & Spesifikasi:
                    </p>
                    <ul className="space-y-1.5">
                      {facility.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs text-[#364153]">
                          <svg className="size-3.5 text-[#bc0c11] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Callout: Akomodasi / Kos Siswa Luar Daerah */}
          <div className="mt-16 bg-[#101828] rounded-[28px] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-gray-200 mb-3">
                Layanan Khusus Siswa Luar Kota
              </span>
              <h3 className="font-jakarta font-bold text-xl sm:text-2xl mb-2 text-white">
                Butuh Rekomendasi Tempat Tinggal & Kos di Dekat Sekolah?
              </h3>
              <p className="font-jakarta text-sm text-gray-300 leading-relaxed">
                SMK Telkom Sidoarjo menyediakan pusat informasi rekomendasi akomodasi dan kos aman, bersih, serta terjangkau yang dekat dengan kampus untuk kenyamanan siswa dari luar daerah.
              </p>
            </div>
            <Link
              href="/tentang-kami/akomodasi"
              className="min-h-[44px] px-6 py-3 rounded-xl bg-[#bc0c11] hover:bg-[#a00a0e] text-white text-sm font-bold transition-colors whitespace-nowrap shadow-lg shadow-[#bc0c11]/30 flex items-center gap-2"
            >
              Lihat Rekomendasi Kos
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
