"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function TrialClassHero() {
  const { t } = useLanguage();

  const handleScrollToEvent = () => {
    const el = document.getElementById("event-terdekat");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text & CTA Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Breadcrumb Path */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mb-4 text-sm font-jakarta text-[#4a5565] flex-wrap"
            >
              <Link href="/" className="hover:text-[#bc0c11] transition-colors">
                {t("common.home", "Beranda")}
              </Link>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="text-[#4a5565] shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium text-[#101828]" aria-current="page">
                {t("trialClassPage.heroTitle", "Trial Class")}
              </span>
            </nav>

            {/* Main Heading with Signature Red Underline Bar */}
            <div className="relative mb-4 sm:mb-5">
              <h1 className="font-jakarta text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#101828] leading-[1.15] tracking-tight">
                Trial <span className="text-[#bc0c11]">Class</span>
              </h1>
              <div className="mt-3.5 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
            </div>

            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-xl mb-8">
              {t(
                "trialClassPage.heroDesc",
                "Ikuti Virtual Class untuk merasakan langsung suasana belajar di SMK Telkom Sidoarjo, mengenal metode pembelajaran: semuanya dari mana saja."
              )}
            </p>

            <div>
              <button
                type="button"
                onClick={handleScrollToEvent}
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer shadow-card-cta"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  {t("trialClassPage.seeUpcoming", "Lihat Event Terdekat")}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-[300px] sm:w-[360px] lg:w-[390px] xl:w-[410px] h-[360px] sm:h-[420px] lg:h-[440px] flex items-center justify-center">
              {/* Background Grey Polygonal Shape */}
              <div className="absolute left-0 bottom-4 w-40 sm:w-48 h-48 sm:h-56 opacity-80 pointer-events-none -rotate-6 z-0">
                <Image
                  src="/images/trial-class/polygon-shape.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Red Rounded Rectangle Backdrop */}
              <div className="absolute right-2 sm:right-4 bottom-2 w-[220px] sm:w-[260px] h-[280px] sm:h-[330px] bg-[#bc0c11] rounded-[22px] z-0 shadow-lg shadow-red-900/10" />

              {/* Student Visual (transparent PNG) */}
              <div className="relative z-10 w-[280px] sm:w-[330px] lg:w-[360px] h-[350px] sm:h-[400px] lg:h-[430px] flex items-end justify-center">
                <Image
                  src="/images/trial-class/hero-student.png"
                  alt="Siswa SMK Telkom Sidoarjo"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 330px, 360px"
                  className="object-contain object-bottom drop-shadow-md select-none pointer-events-none"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
