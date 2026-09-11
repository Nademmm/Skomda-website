"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TefaCtaBannerProps {
  onRequestProject: () => void;
}

export default function TefaCtaBanner({ onRequestProject }: TefaCtaBannerProps) {
  const { t } = useLanguage();

  return (
    <section id="request-project" className="relative w-full bg-[#f3f4f6] pb-20 lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[28px] bg-gradient-to-r from-[#bd0c12] via-[#bc0c11] to-[#990a0e] p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-xl border-2 border-dashed border-white/30"
        >
          {/* Subtle background glow */}
          <div
            className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 relative z-10">
            {/* Left Column: Heading & Description */}
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[2.5px] bg-white rounded-full" />
                <span className="font-jakarta font-bold text-xs sm:text-sm tracking-wider uppercase text-white/90">
                  {t("tefa.ctaEyebrow")}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white mb-4">
                {t("tefa.ctaTitle")}
              </h2>

              {/* Subtitle */}
              <p className="font-jakarta text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {t("tefa.ctaDesc")}
              </p>
            </div>

            {/* Right Column: CTA Button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onRequestProject}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-base font-medium text-[#bc0c11] transition-all duration-300 hover:bg-gray-100 hover:shadow-lg active:scale-[0.98] cursor-pointer shadow-md"
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  {t("tefa.ctaButton")}
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
                    stroke="#bc0c11"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
