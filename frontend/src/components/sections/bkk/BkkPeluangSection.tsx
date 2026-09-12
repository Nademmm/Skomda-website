"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { PELUANG_KARIER_ITEMS, PeluangKarierItem } from "@/data/bkkData";

export default function BkkPeluangSection() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<PeluangKarierItem | null>(null);
  const [copied, setCopied] = useState(false);

  const filterOptions = ["Semua", "SIJA", "TJAT", "Internship", "Full Time"];

  // Filter jobs based on active category & search query
  const filteredJobs = useMemo(() => {
    return PELUANG_KARIER_ITEMS.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (activeFilter === "Semua") return true;
      if (activeFilter === "SIJA") return job.jurusan.includes("SIJA");
      if (activeFilter === "TJAT") return job.jurusan.includes("TJAT");
      if (activeFilter === "Internship") return job.type === "Internship";
      if (activeFilter === "Full Time") return job.type === "Full Time";

      return true;
    });
  }, [activeFilter, searchQuery]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedJob(null);
      }
    };
    if (selectedJob) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedJob]);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="peluang-karier" className="relative w-full py-20 lg:py-24 bg-[#f3f4f6] border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-[3px] w-6 bg-[#bc0c11] rounded-full" />
          <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wider uppercase text-[#bc0c11]">
            PELUANG KARIER
          </span>
        </div>

        {/* Section Header with Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828] mb-2">
              Peluang <span className="text-[#bc0c11]">Karier Terbaru</span>
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565]">
              Temukan kesempatan karier dan magang industri yang sesuai dengan kompetensimu.
            </p>
          </div>

          {/* Search Input & Filter Tabs Container */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input Box */}
            <div className="relative w-full sm:w-64 md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari posisi atau perusahaan..."
                className="w-full h-[42px] pl-4 pr-10 rounded-full border border-gray-200 bg-white text-sm font-jakarta text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all shadow-xs"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21L16.65 16.65" />
                </svg>
              </span>
            </div>

            {/* Filter Pills (Segmented Pill Container) */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-gray-200/80 shadow-xs overflow-x-auto scrollbar-none">
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`h-[34px] px-4 rounded-full text-xs sm:text-sm font-jakarta transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#bc0c11] text-white font-semibold shadow-xs"
                        : "text-[#364153] hover:text-[#bc0c11] font-medium"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Job Opportunity Cards List */}
        <div className="flex flex-col gap-3.5 mb-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200/80 px-5 sm:px-6 py-4 sm:py-5 hover:shadow-md hover:border-[#bc0c11]/40 transition-all duration-300"
              >
                {/* Desktop Aligned Row Layout (>= 1024px) */}
                <div className="hidden lg:flex items-center justify-between gap-6">
                  
                  {/* Column 1: Unboxed Large Company Logo */}
                  <div className="w-36 shrink-0 h-10 flex items-center justify-start">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={130}
                      height={38}
                      className="object-contain object-left max-h-10 max-w-[130px]"
                    />
                  </div>

                  {/* Column 2: Job Title & Company Name */}
                  <div className="flex-1 min-w-[220px]">
                    <h3 className="font-jakarta font-bold text-base sm:text-lg text-[#101828] truncate hover:text-[#bc0c11] transition-colors">
                      {job.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] truncate mt-0.5">
                      {job.company}
                    </p>
                  </div>

                  {/* Column 3: Location */}
                  <div className="w-28 shrink-0 flex items-center gap-1.5 text-xs sm:text-sm font-jakarta text-[#4a5565]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bc0c11" strokeWidth="2" className="shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{job.location}</span>
                  </div>

                  {/* Column 4: Job Type */}
                  <div className="w-28 shrink-0 flex items-center gap-1.5 text-xs sm:text-sm font-jakarta text-[#4a5565]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bc0c11" strokeWidth="2" className="shrink-0">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <span>{job.type}</span>
                  </div>

                  {/* Column 5: Jurusan Badge */}
                  <div className="w-24 shrink-0 text-left">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-jakarta font-bold bg-[#bc0c11]/10 text-[#bc0c11]">
                      {job.jurusan}
                    </span>
                  </div>

                  {/* Column 6: Action Button */}
                  <div className="w-32 shrink-0 text-right">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex items-center gap-1.5 text-sm font-jakarta font-semibold text-[#bc0c11] hover:text-[#990a0e] group cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                </div>

                {/* Mobile & Tablet Responsive Card Layout (< 1024px) */}
                <div className="flex lg:hidden flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-9 w-28 shrink-0 flex items-center">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={110}
                        height={34}
                        className="object-contain object-left max-h-9 max-w-[110px]"
                      />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-jakarta font-bold bg-[#bc0c11]/10 text-[#bc0c11]">
                      {job.jurusan}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-jakarta font-bold text-base text-[#101828]">
                      {job.title}
                    </h3>
                    <p className="font-jakarta text-xs text-[#4a5565] mt-0.5">
                      {job.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-100 gap-2">
                    <div className="flex items-center gap-3 text-xs font-jakarta text-[#4a5565]">
                      <span className="flex items-center gap-1">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bc0c11" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bc0c11" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        {job.type}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex items-center gap-1 text-xs font-jakarta font-semibold text-[#bc0c11] hover:text-[#990a0e] cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
              <p className="font-jakarta font-semibold text-base text-[#101828] mb-1">
                Tidak ada lowongan yang sesuai
              </p>
              <p className="font-poppins text-sm text-[#4a5565] mb-4">
                Coba ubah kata kunci pencarian atau pilih filter kategori lainnya.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("Semua");
                  setSearchQuery("");
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 text-xs font-jakarta font-semibold text-[#101828] hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Bottom Link */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setActiveFilter("Semua");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 text-sm font-jakarta font-bold text-[#bc0c11] hover:text-[#990a0e] transition-colors group cursor-pointer"
          >
            <span>Lihat Semua Peluang</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Modal Dialog for Job Details */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-job-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              aria-label="Tutup Detail Lowongan"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header Job Info */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              <div className="w-32 h-10 shrink-0 flex items-center">
                <Image
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  width={120}
                  height={36}
                  className="object-contain object-left"
                />
              </div>
              <div>
                <h3 id="modal-job-title" className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828]">
                  {selectedJob.title}
                </h3>
                <p className="font-poppins text-sm font-medium text-[#4a5565]">
                  {selectedJob.company}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs font-jakarta">
                  <span className="bg-gray-100 text-[#4a5565] px-2.5 py-1 rounded-md font-medium">
                    {selectedJob.location}
                  </span>
                  <span className="bg-gray-100 text-[#4a5565] px-2.5 py-1 rounded-md font-medium">
                    {selectedJob.type}
                  </span>
                  <span className="bg-red-50 text-[#bc0c11] px-2.5 py-1 rounded-md font-bold">
                    Jurusan: {selectedJob.jurusan}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline & Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 mb-6 text-xs font-jakarta">
              <div>
                <span className="text-gray-400 block mb-0.5">Batas Lamaran</span>
                <span className="font-semibold text-[#101828]">{selectedJob.deadline}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Tanggal Terbit</span>
                <span className="font-semibold text-[#101828]">{selectedJob.postedDate}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-gray-400 block mb-0.5">Kisaran Gaji</span>
                <span className="font-semibold text-[#bc0c11]">{selectedJob.salaryRange || "Sesuai Standar"}</span>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <h4 className="font-jakarta font-bold text-sm text-[#101828] mb-2 uppercase tracking-wider">
                Deskripsi Pekerjaan
              </h4>
              <p className="font-poppins text-sm text-[#4a5565] leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <h4 className="font-jakarta font-bold text-sm text-[#101828] mb-2 uppercase tracking-wider">
                Tanggung Jawab Utama
              </h4>
              <ul className="space-y-1.5 list-disc list-inside font-poppins text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                {selectedJob.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h4 className="font-jakarta font-bold text-sm text-[#101828] mb-2 uppercase tracking-wider">
                Kualifikasi & Persyaratan
              </h4>
              <ul className="space-y-1.5 list-disc list-inside font-poppins text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => copyEmail(selectedJob.applyEmail)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-xs sm:text-sm font-jakarta font-semibold text-[#4a5565] hover:border-[#bc0c11] hover:text-[#bc0c11] transition-colors cursor-pointer"
              >
                <span>{copied ? "Email Disalin!" : "Salin Email Perusahaan"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>

              <a
                href={`mailto:${selectedJob.applyEmail}?subject=Lamaran%20Posisi%20${encodeURIComponent(selectedJob.title)}%20-%20Alumni%20SMK%20Telkom%20Sidoarjo`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#bc0c11] text-xs sm:text-sm font-jakarta font-bold text-white hover:bg-[#990a0e] transition-colors shadow-sm cursor-pointer"
              >
                <span>Kirim Lamaran / CV</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
