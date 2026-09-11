"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TrialClassEventCardProps {
  onOpenRegister: () => void;
}

export default function TrialClassEventCard({ onOpenRegister }: TrialClassEventCardProps) {
  const { t } = useLanguage();

  return (
    <section id="event-terdekat" className="relative w-full py-8 sm:py-12 scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-white rounded-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.06)] border border-[#eceef1] p-6 sm:p-8 lg:p-10 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left: Event Details (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {/* Event Tag */}
              <div className="flex items-center gap-2 text-[#bc0c11]">
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src="/images/trial-class/icon-date.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {t("trialClassPage.upcomingBadge", "EVENT TERDEKAT")}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#101828] mt-2 mb-6">
                {t("trialClassPage.eventTitle", "Virtual Trial Class 2026")}
              </h2>

              {/* 3 Details in a single row */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 pt-4 border-t border-gray-100">
                {/* Date */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
                    <Image
                      src="/images/trial-class/icon-date.png"
                      alt="Date icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-jakarta text-xs sm:text-sm font-bold text-[#101828] whitespace-nowrap">
                      {t("trialClassPage.eventDateDay", "Sabtu,")}
                    </span>
                    <span className="font-jakarta text-[11px] sm:text-xs text-[#6a7282] whitespace-nowrap">
                      {t("trialClassPage.eventDateFull", "26 September 2026")}
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
                    <Image
                      src="/images/trial-class/icon-time.png"
                      alt="Time icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-jakarta text-xs sm:text-sm font-bold text-[#101828] whitespace-nowrap">
                      {t("trialClassPage.eventTime", "09.00 - 11.00")}
                    </span>
                    <span className="font-jakarta text-[11px] sm:text-xs text-[#6a7282] whitespace-nowrap">
                      {t("trialClassPage.eventTimezone", "WIB")}
                    </span>
                  </div>
                </div>

                {/* Platform */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
                    <Image
                      src="/images/trial-class/icon-online.png"
                      alt="Platform icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-jakarta text-xs sm:text-sm font-bold text-[#101828] whitespace-nowrap">
                      {t("trialClassPage.eventMode", "Online")}
                    </span>
                    <span className="font-jakarta text-[11px] sm:text-xs text-[#6a7282] whitespace-nowrap">
                      {t("trialClassPage.eventSubmode", "(Virtual Class)")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Actions (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-center justify-center">
              {/* Register CTA Button */}
              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full sm:w-auto lg:w-[200px] group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#bc0c11] text-white font-jakarta font-semibold text-sm sm:text-base hover:bg-[#990a0e] shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="whitespace-nowrap">{t("trialClassPage.registerNow", "Daftar Sekarang")}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Right: Laptop Mockup (3 cols) */}
            <div className="lg:col-span-3 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[300px] xl:max-w-[320px] aspect-[1.45/1]">
                <Image
                  src="/images/trial-class/laptop-mockup.png"
                  alt="Virtual Trial Class Laptop Screen"
                  fill
                  sizes="(max-width: 1024px) 340px, 320px"
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
