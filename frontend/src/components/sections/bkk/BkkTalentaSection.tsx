"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TALENTA_SKOMDA_ITEMS, TalentaSkomdaItem } from "@/data/bkkData";

export default function BkkTalentaSection() {
  const [selectedTalent, setSelectedTalent] = useState<TalentaSkomdaItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTalent(null);
      }
    };
    if (selectedTalent) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedTalent]);

  return (
    <section className="relative w-full py-20 lg:py-24 bg-white border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-[3px] w-6 bg-[#bc0c11] rounded-full" />
          <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wider uppercase text-[#bc0c11]">
            TALENTA SKOMDA
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828] mb-2">
              Kenali <span className="text-[#bc0c11]">Talenta SKOMDA</span>
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565]">
              Siswa dan alumni dengan kompetensi yang siap berkembang bersama industri.
            </p>
          </div>

          <a
            href="#kerjasama-rekrutmen"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-jakarta font-bold text-[#bc0c11] hover:text-[#990a0e] transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>Lihat Semua Talenta</span>
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
          </a>
        </div>

        {/* 3 Uniform Talent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {TALENTA_SKOMDA_ITEMS.map((talent) => (
            <div
              key={talent.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 flex flex-row items-center gap-4 sm:gap-5 hover:shadow-md hover:border-[#bc0c11]/40 transition-all duration-300 group h-full justify-between"
            >
              {/* Left: Student Photo */}
              <div className="relative w-24 sm:w-28 h-32 sm:h-36 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100/90">
                <Image
                  src={talent.avatar}
                  alt={talent.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Right: Info & Meta */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                <div>
                  <h3 className="font-jakarta font-bold text-base text-[#101828] truncate group-hover:text-[#bc0c11] transition-colors">
                    {talent.name}
                  </h3>
                  <p className="font-jakarta text-xs sm:text-sm font-semibold text-[#364153] truncate mt-0.5">
                    {talent.role}
                  </p>
                  <p className="font-jakarta text-xs text-[#787878] mt-0.5">
                    {talent.status}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {talent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-gray-50 text-[#4a5565] border border-gray-200/60 text-[11px] font-jakarta font-medium whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-3">
                  <button
                    onClick={() => setSelectedTalent(talent)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-jakarta font-semibold text-[#bc0c11] hover:text-[#990a0e] group/btn cursor-pointer"
                  >
                    <span>Lihat Profil</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover/btn:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Talent Profile Modal */}
      {selectedTalent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-talent-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedTalent(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTalent(null)}
              aria-label="Tutup Profil Talenta"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Overview */}
            <div className="flex items-center gap-4 mb-6 pr-8">
              <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0">
                <Image
                  src={selectedTalent.avatar}
                  alt={selectedTalent.name}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 id="modal-talent-name" className="font-jakarta font-bold text-xl text-[#101828]">
                  {selectedTalent.name}
                </h3>
                <p className="font-jakarta text-sm font-semibold text-[#bc0c11]">
                  {selectedTalent.role}
                </p>
                <p className="font-poppins text-xs text-[#787878] mt-0.5">
                  {selectedTalent.status}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-5">
              <h4 className="font-jakarta font-bold text-xs uppercase tracking-wider text-[#101828] mb-1.5">
                Ringkasan Kompetensi
              </h4>
              <p className="font-poppins text-sm text-[#4a5565] leading-relaxed">
                {selectedTalent.bio}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h4 className="font-jakarta font-bold text-xs uppercase tracking-wider text-[#101828] mb-2">
                Keahlian & Teknologi
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedTalent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-red-50 text-[#bc0c11] border border-red-100 text-xs font-jakarta font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="font-jakarta font-bold text-xs uppercase tracking-wider text-[#101828] mb-2">
                Prestasi & Sertifikasi
              </h4>
              <ul className="space-y-1.5 list-disc list-inside font-poppins text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                {selectedTalent.achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <a
                href="https://wa.me/628113021919?text=Halo%20BKK%20SMK%20Telkom%20Sidoarjo,%20perusahaan%20kami%20tertarik%20dengan%20profil%20talenta%20ini"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#bc0c11] text-xs sm:text-sm font-jakarta font-bold text-white hover:bg-[#990a0e] transition-colors shadow-sm"
              >
                <span>Hubungi Talenta via BKK</span>
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
