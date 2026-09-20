"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function BkkPeranSection() {
  const { isEn, t } = useLanguage();

  const peranItems = [
    {
      id: "peluang",
      number: "01",
      title: isEn ? "Opportunity" : "Peluang",
      description: isEn
        ? "Discover career openings, internships, and professional placement channels."
        : "Temukan informasi lowongan dan kesempatan karier.",
    },
    {
      id: "persiapan",
      number: "02",
      title: isEn ? "Preparation" : "Persiapan",
      description: isEn
        ? "Access job readiness workshops, soft skills enhancement, and technical mentoring."
        : "Akses pengembangan karier dan kesiapan kerja.",
    },
    {
      id: "koneksi",
      number: "03",
      title: isEn ? "Connection" : "Koneksi",
      description: isEn
        ? "Connect directly with prominent alumni networks and active corporate industry partners."
        : "Terhubung dengan alumni dan mitra industri.",
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-24 bg-white border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-[3px] w-6 bg-[#bc0c11] rounded-full" />
          <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wider uppercase text-[#bc0c11]">
            {isEn ? "BKK ROLE" : "PERAN BKK"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5">
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828] mb-4">
              {isEn ? (
                <>
                  From School, Towards the{" "}
                  <span className="text-[#bc0c11]">Professional World.</span>
                </>
              ) : (
                <>
                  Dari Sekolah, Menuju{" "}
                  <span className="text-[#bc0c11]">Dunia Profesional.</span>
                </>
              )}
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed">
              {t("bkk.peranSubtitle")}
            </p>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 lg:gap-8 pt-2">
            {peranItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col border-l-2 border-gray-200 pl-4 sm:pl-5 hover:border-[#bc0c11] transition-colors duration-200"
              >
                <span className="font-jakarta font-extrabold text-2xl sm:text-3xl text-[#bc0c11] mb-1.5 transition-transform duration-200 group-hover:translate-x-0.5">
                  {item.number}
                </span>
                <h3 className="font-jakarta font-bold text-lg text-[#101828] group-hover:text-[#bc0c11] transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
