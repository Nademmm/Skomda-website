"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  "Semua",
  "Kegiatan Sekolah",
  "Prestasi",
  "Pengumuman",
  "Kemitraan & Kerja Sama",
  "Karya & Inovasi Siswa",
  "Artikel & Edukasi",
  "Alumni",
];

const allNews = [
  {
    id: "1",
    title: "Lomba Matematika SMP/MTs Terbesar Se-Sidoarjo Sukses Digelar di SKOMDA",
    category: "Kegiatan Sekolah",
    date: "27 Nov 2025",
    slug: "lomba-matematika-smp-mts-terbesar-se-sidoarjo",
    gradient: "from-[#bc0c11] to-[#990a0e]",
  },
  {
    id: "2",
    title: "Siswi SKOMDA Sukses Raih Juara 1 INSYS FEST 5.0 dengan Aplikasi Kustomisasi Batik",
    category: "Prestasi",
    date: "24 Nov 2025",
    slug: "siswi-skomda-raih-juara-1-insys-fest",
    gradient: "from-[#364153] to-[#101828]",
  },
  {
    id: "3",
    title: "Dies Natalis SKOMDA ke-6: Perayaan Kreativitas, Prestasi, dan Kolaborasi Antar Pelajar",
    category: "Kegiatan Sekolah",
    date: "20 Nov 2025",
    slug: "dies-natalis-skomda-ke-6",
    gradient: "from-[#1d4ed8] to-[#1e3a8a]",
  },
  {
    id: "4",
    title: "Siswa XII SIJA 1 Raih Juara 3 FITCOM 3.0 di Universitas Dinamika",
    category: "Prestasi",
    date: "17 Nov 2025",
    slug: "siswa-xii-sija-1-raih-juara-3-fitcom",
    gradient: "from-[#15803d] to-[#166534]",
  },
  {
    id: "5",
    title: "SKOMDA KUBIK 2025 Resmi Dibuka: SMK Telkom Sidoarjo Dorong Siswa Jadi Inovator Muda",
    category: "Kegiatan Sekolah",
    date: "13 Nov 2025",
    slug: "skomda-kubik-2025-resmi-dibuka",
    gradient: "from-[#e7000b] to-[#bc0c11]",
  },
  {
    id: "6",
    title: "Tidak Sekadar Ziarah: Siswa SMK Telkom Sidoarjo Hidupkan Semangat Kepahlawanan di TMP",
    category: "Kegiatan Sekolah",
    date: "10 Nov 2025",
    slug: "ziarah-tmp-semangat-kepahlawanan",
    gradient: "from-[#4a5565] to-[#364153]",
  },
];

export default function BeritaSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews =
    activeCategory === "Semua"
      ? allNews
      : allNews.filter((item) => item.category === activeCategory);

  return (
    <section id="informasi" className="w-full bg-[#f3f4f6] py-20 lg:py-28" data-node-id="23:337">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="font-jakarta font-bold text-3xl sm:text-[36px] leading-[40px] text-[#101828]">
            Berita &amp; Informasi Terkini
          </h2>
          <p className="mt-2 font-jakarta font-bold text-2xl sm:text-[30px] leading-[36px] text-[#bc0c11]">
            SMK Telkom Sidoarjo
          </p>
        </div>

        {/* Two Columns: Category Sidebar (Left) + News Grid (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Category Filter (Col span 3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-jakarta font-bold text-base text-[#101828] mb-4">
              Kategori Berita
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2 font-jakarta text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-[#bd0c12] text-white font-semibold shadow-sm"
                      : "text-[#364153] hover:bg-gray-100 hover:text-[#bd0c12]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: 6 News Cards (Col span 9) */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.slug}`}
                  className="group flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Thumbnail Placeholder */}
                  <div className={`relative h-44 w-full bg-gradient-to-br ${news.gradient} flex items-center justify-center p-4`}>
                    <span className="font-jakarta font-bold text-white/20 text-4xl select-none">
                      SKOMDA
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h4 className="font-jakarta font-bold text-sm leading-snug text-[#101828] group-hover:text-[#bd0c12] transition-colors line-clamp-2 min-h-[40px]">
                      {news.title}
                    </h4>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#787878] font-jakarta">
                      <span className="font-medium text-[#bd0c12]">{news.category}</span>
                      <span>{news.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls (Figma 23:434) */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#364153] hover:border-[#bd0c12] hover:text-[#bd0c12] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-[#364153]"
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Page indicator dots */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`size-2.5 rounded-full transition-all ${
                      currentPage === page ? "bg-[#bd0c12] scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${page}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, 10))}
                disabled={currentPage === 10}
                className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#364153] hover:border-[#bd0c12] hover:text-[#bd0c12] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-[#364153]"
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
