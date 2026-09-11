"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TefaNeedSectionProps {
  onSelectCategory?: (category: string) => void;
  onRequestProject?: () => void;
  onViewAllServices: () => void;
}

export default function TefaNeedSection({
  onSelectCategory,
  onRequestProject,
  onViewAllServices,
}: TefaNeedSectionProps) {
  const { t } = useLanguage();

  const needs = [
    {
      id: "01",
      titleKey: "tefa.need1Title",
      descKey: "tefa.need1Desc",
      icon: "/images/tefa/icon-web-system.png",
      action: () => onSelectCategory?.("Web & Software"),
    },
    {
      id: "02",
      titleKey: "tefa.need2Title",
      descKey: "tefa.need2Desc",
      icon: "/images/tefa/icon-network-infra.png",
      action: () => onSelectCategory?.("Network"),
    },
    {
      id: "03",
      titleKey: "tefa.need3Title",
      descKey: "tefa.need3Desc",
      icon: "/images/tefa/icon-project-idea.png",
      href: "/tefa/request",
    },
    {
      id: "04",
      titleKey: "tefa.need4Title",
      descKey: "tefa.need4Desc",
      icon: "/images/tefa/icon-all-services.png",
      action: onViewAllServices,
    },
  ];

  return (
    <section id="layanan" className="relative w-full bg-white scroll-mt-24 overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row items-stretch">
        {/* Left Column: Eyebrow, Title & 4 Numbered Rows */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+2rem))] lg:pr-10 xl:pr-14 z-10">
          {/* Eyebrow Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[3px] bg-[#bc0c11] rounded-full" />
            <span className="font-jakarta font-bold text-xs sm:text-sm text-[#bc0c11] tracking-wider uppercase">
              {t("tefa.needEyebrow")}
            </span>
          </div>

          {/* Section Title */}
          <div className="relative mb-6 sm:mb-8 lg:mb-10">
            <h2 className="font-jakarta font-bold text-3xl sm:text-[36px] lg:text-[40px] leading-[44px] text-[#101828]">
              {t("tefa.needTitle")}
            </h2>
          </div>

          {/* 4 Numbered Rows */}
          <div className="flex flex-col">
            {needs.map((item) => (
              <div key={item.id} className="w-full">
                {/* Clean Solid Divider */}
                <div className="w-full h-px bg-[#e5e7eb]" />

                {item.href ? (
                  <Link
                    href={item.href}
                    className="group w-full flex items-center gap-4 sm:gap-6 py-4 sm:py-4.5 text-left transition-all duration-200 hover:bg-gray-50/90 rounded-2xl px-2 sm:px-3 -mx-2 sm:-mx-3 cursor-pointer"
                  >
                    {/* Big Number from Figma */}
                    <span className="font-jakarta font-bold text-3xl sm:text-[38px] text-[#747878] w-10 sm:w-14 shrink-0 text-left group-hover:text-[#bc0c11] transition-colors leading-none select-none">
                      {item.id}
                    </span>

                    {/* Icon Container: Simple consistent circle matching other sections */}
                    <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-full bg-[#ffebed] transition-transform duration-200 group-hover:scale-105 p-3">
                      <div className="relative size-7 sm:size-8">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="font-jakarta font-bold text-base sm:text-[17px] text-[#101828] group-hover:text-[#bc0c11] transition-colors leading-snug mb-1">
                        {t(item.titleKey)}
                      </h3>
                      <p className="font-jakarta text-xs sm:text-[13px] text-[#787878] leading-relaxed font-normal">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.action}
                    className="group w-full flex items-center gap-4 sm:gap-6 py-4 sm:py-4.5 text-left transition-all duration-200 hover:bg-gray-50/90 rounded-2xl px-2 sm:px-3 -mx-2 sm:-mx-3 cursor-pointer"
                  >
                    {/* Big Number from Figma */}
                    <span className="font-jakarta font-bold text-3xl sm:text-[38px] text-[#747878] w-10 sm:w-14 shrink-0 text-left group-hover:text-[#bc0c11] transition-colors leading-none select-none">
                      {item.id}
                    </span>

                    {/* Icon Container: Simple consistent circle matching other sections */}
                    <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-full bg-[#ffebed] transition-transform duration-200 group-hover:scale-105 p-3">
                      <div className="relative size-7 sm:size-8">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="font-jakarta font-bold text-base sm:text-[17px] text-[#101828] group-hover:text-[#bc0c11] transition-colors leading-snug mb-1">
                        {t(item.titleKey)}
                      </h3>
                      <p className="font-jakarta text-xs sm:text-[13px] text-[#787878] leading-relaxed font-normal">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            ))}
            {/* Bottom Closing Divider */}
            <div className="w-full h-px bg-[#e5e7eb]" />
          </div>
        </div>

        {/* Right Column: TeFa Building Photo completely filling the right side top-to-bottom and right edge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative min-h-[380px] sm:min-h-[460px] lg:min-h-0 flex flex-col justify-end"
        >
          {/* Building Photo with integrated dark grey banner filling right half */}
          <div className="absolute inset-0 select-none">
            <Image
              src="/images/tefa/tefa-building-banner.png"
              alt="Gedung Teaching Factory SMK Telkom Sidoarjo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-right-bottom"
              priority
            />
          </div>

          {/* Overlay Text Content (Figma Frame 184) sitting seamlessly over the dark banner area */}
          <div className="relative z-10 w-full h-[32%] min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-center pl-6 sm:pl-[24%] lg:pl-[22%] xl:pl-[20%] pr-6 sm:pr-8 lg:pr-10 xl:pr-14">
            <h4 className="font-jakarta font-bold text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] text-white leading-[1.25] mb-0 max-w-[360px] sm:max-w-[440px] lg:max-w-[480px] tracking-tight">
              {t("tefa.buildingCardTitle")}
            </h4>
            {/* Red Accent Line matching Figma Rectangle 17 */}
            <div className="w-40 sm:w-52 lg:w-60 h-[3.5px] lg:h-[4px] bg-[#bc0c11] rounded-full my-2.5 sm:my-3 lg:my-3.5" />
            <p className="font-jakarta text-sm sm:text-base lg:text-[15px] xl:text-[16px] text-gray-200/95 font-normal leading-relaxed max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]">
              {t("tefa.buildingCardDesc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
