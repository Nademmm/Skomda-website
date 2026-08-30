"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { NewsItem, NEWS_CATEGORIES } from "@/services/news";

interface BeritaPageClientProps {
  initialNews: NewsItem[];
}

export default function BeritaPageClient({ initialNews }: BeritaPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter & Search Logic
  const filteredNews = useMemo(() => {
    let list = [...initialNews];

    // Filter by category
    if (selectedCategory && selectedCategory !== "Semua") {
      list = list.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.summary && item.summary.toLowerCase().includes(q)) ||
          (item.category && item.category.toLowerCase().includes(q)) ||
          (item.content && item.content.toLowerCase().includes(q))
      );
    }

    return list;
  }, [initialNews, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
  const paginatedArticles = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setCurrentPage(1);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f3f4f6] pt-36 sm:pt-40 lg:pt-44 pb-20 sm:pb-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* ─── 1. Header & Breadcrumbs ─── */}
        <div className="max-w-3xl mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-jakarta text-[#4a5565] mb-3">
            <Link href="/" className="hover:text-[#bc0c11] transition-colors">
              Beranda
            </Link>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Informasi</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold text-[#101828]">Berita</span>
          </nav>

          <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.18] tracking-tight text-[#101828]">
            Berita & Informasi <span className="text-[#bc0c11]">Terkini</span>
          </h1>
          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mt-2.5 max-w-2xl">
            Temukan kabar terbaru seputar kegiatan sekolah, prestasi siswa, kemitraan industri,
            dan informasi penting dari SMK Telkom Sidoarjo.
          </p>
        </div>

        {/* ─── 2. Clean Search & Category Filter Bar ─── */}
        <div className="mb-10 flex flex-col gap-4">
          {/* Full-Width Clean Search Input */}
          <div className="relative w-full">
            <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari judul berita, kegiatan, prestasi, atau pengumuman..."
              className="w-full rounded-full bg-white pl-14 sm:pl-16 pr-12 sm:pr-14 py-3.5 text-sm sm:text-base font-jakarta text-[#101828] placeholder-gray-400 border border-gray-200/90 focus:border-[#bc0c11] focus:outline-none shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 size-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Hapus pencarian"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {NEWS_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold font-jakarta transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#bc0c11] text-white shadow-xs"
                      : "bg-white text-[#4a5565] border border-gray-200/80 hover:border-[#bc0c11] hover:text-[#bc0c11]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 3. News Articles Grid (Exact Beranda Card Design) ─── */}
        {paginatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-5 gap-y-6 lg:gap-y-7">
            {paginatedArticles.map((item) => (
              <article
                key={item.id || item.slug}
                className="bg-white rounded-[16px] p-[11px] pt-[13px] pb-[14px] flex flex-col gap-[4px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-2 border-dashed border-[#d1d5dc] hover:border-[#bc0c11] group"
              >
                {/* Thumbnail with Date Badge */}
                <div className="relative h-[192px] w-full rounded-[12px] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image || "/figma/news-thumb-1.png"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Top-Right Red Date Badge */}
                  <div className="absolute top-0 right-0 bg-[rgba(188,12,17,0.98)] w-[53px] h-[60px] rounded-bl-[15px] rounded-tr-[10px] flex flex-col items-center justify-center text-white text-center shadow-sm pointer-events-none">
                    <span className="font-poppins font-medium text-[16px] leading-[16px]">
                      {item.day || "24"}
                    </span>
                    <span className="font-poppins font-medium text-[16px] leading-[16px] uppercase tracking-wide">
                      {item.month || "MEI"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-1 pt-1">
                  {/* Title */}
                  <div className="p-[10px] pb-0 mb-[-6px]">
                    <Link href={`/berita/${item.slug}`}>
                      <h4 className="font-jakarta font-bold text-[14px] leading-[17.5px] text-[#101828] line-clamp-3 min-h-[52px] group-hover:text-[#bd0c12] transition-colors">
                        {item.title}
                      </h4>
                    </Link>
                  </div>

                  {/* Category */}
                  <div className="p-[10px] py-1 mb-[-6px]">
                    <span className="font-jakarta font-semibold text-[12px] leading-[16px] text-[#e7000b]">
                      {item.category}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="p-[10px] pt-1 flex items-center gap-[6px] text-[#6a7282]">
                    <div className="shrink-0 size-[12px] flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-[#6a7282]"
                      >
                        <circle
                          cx="6.375"
                          cy="6.375"
                          r="5.625"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.75 3.875V7H8.875"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="font-poppins font-normal text-[12px] leading-[16px]">
                      {item.dateFormatted} {item.time ? `• ${item.time}` : ""}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* ─── Simplified Minimal Empty State ─── */
          <div className="py-16 text-center">
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565] mb-4">
              Tidak ada berita yang sesuai dengan pencarian{" "}
              {searchQuery && (
                <>
                  kata kunci &ldquo;<strong className="text-[#101828]">{searchQuery}</strong>&rdquo;
                </>
              )}
              {selectedCategory !== "Semua" && (
                <>
                  {searchQuery ? " di" : ""} kategori &ldquo;<strong className="text-[#101828]">{selectedCategory}</strong>&rdquo;
                </>
              )}
              .
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 rounded-full bg-[#bc0c11] hover:bg-[#990a0e] text-white px-6 py-2 text-xs sm:text-sm font-semibold font-jakarta transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>Reset Pencarian</span>
            </button>
          </div>
        )}

        {/* ─── 4. Pagination Controls (Exact Beranda Style) ─── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center sm:justify-between w-full pt-10">
            {/* Previous Page Button */}
            <div className="p-[10px]">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`size-[48px] rounded-[8px] bg-white border border-[rgba(188,12,17,0.98)] flex items-center justify-center transition-all ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-red-50 hover:shadow-sm active:scale-95 cursor-pointer"
                }`}
                aria-label="Previous page"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19L5 12L12 5"
                    stroke="#BC0C11"
                    strokeOpacity="0.98"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H5"
                    stroke="#BC0C11"
                    strokeOpacity="0.98"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Page Indicator Dots */}
            <div className="flex items-center gap-[4px] sm:gap-[8px] overflow-x-auto py-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className="size-[32px] sm:size-[40px] flex items-center justify-center rounded-full hover:bg-gray-200/50 transition-colors cursor-pointer"
                    aria-label={`Go to page ${pageNum}`}
                  >
                    <span
                      className={`rounded-full transition-all duration-200 ${
                        isActive
                          ? "size-[12px] bg-[#bd0c12] scale-110 shadow-sm"
                          : "size-[8px] bg-[#99a1af] hover:bg-[#6a7282]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <div className="p-[10px]">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`size-[48px] rounded-[8px] bg-[rgba(188,12,17,0.98)] text-white flex items-center justify-center transition-all shadow-sm ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#990a0e] hover:shadow-md active:scale-95 cursor-pointer"
                }`}
                aria-label="Next page"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
