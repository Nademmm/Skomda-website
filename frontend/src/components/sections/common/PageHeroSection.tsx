"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PageHeroSectionProps {
  breadcrumbs: BreadcrumbItem[];
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  studentImage: string;
  studentAlt: string;
  bgShape?: string;
  imagePosition?: "left" | "right";
}

export default function PageHeroSection({
  breadcrumbs,
  titlePrefix,
  titleHighlight,
  titleSuffix = "",
  description,
  ctaText = "Jelajahi",
  ctaHref,
  onCtaClick,
  studentImage,
  studentAlt,
  bgShape = "/images/common/hero-bg-shapes.svg",
  imagePosition = "right",
}: PageHeroSectionProps) {
  const isImageRight = imagePosition === "right";

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#f3f4f6] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Visual Artwork Column */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`lg:col-span-5 flex justify-center ${
              isImageRight ? "lg:justify-end order-2" : "lg:justify-start order-2 lg:order-1"
            }`}
          >
            <div className="relative w-full max-w-[460px] aspect-[500/470] select-none">
              {/* Background Geometric Shapes (Telkom red arch & circles) */}
              <div className="absolute left-0 top-[17.23%] w-[99.6%] h-[83%] pointer-events-none z-0">
                <Image
                  src={bgShape}
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Student Real Photo Cutout */}
              <div className="absolute left-[20%] sm:left-[24%] top-0 w-[70%] sm:w-[66%] h-[99.57%] z-10">
                <Image
                  src={studentImage}
                  alt={studentAlt}
                  fill
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                  sizes="(max-width: 768px) 300px, 460px"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className={`lg:col-span-7 flex flex-col items-start ${
              isImageRight ? "order-1" : "order-1 lg:order-2"
            }`}
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 text-sm font-jakarta text-[#4a5565] flex-wrap">
              <Link href="/" className="hover:text-[#bc0c11] transition-colors">
                Beranda
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <span key={crumb.href + idx} className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-[#4a5565] shrink-0"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-[#101828]">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-[#bc0c11] transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            {/* Title & Red Underline Accent Bar */}
            <div className="relative mb-6">
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-[54px] leading-tight tracking-tight text-[#101828]">
                {titlePrefix} <span className="text-[#e7000b]">{titleHighlight}</span> {titleSuffix}
              </h1>
              <div className="mt-3.5 h-[3px] w-14 bg-[#bc0c11] rounded-full" />
            </div>

            {/* Description */}
            <p className="font-jakarta text-base sm:text-lg text-[#364153] leading-relaxed max-w-2xl mb-8">
              {description}
            </p>

            {/* CTA Button */}
            {ctaHref ? (
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] shadow-card-cta"
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  {ctaText}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : onCtaClick ? (
              <button
                onClick={onCtaClick}
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer shadow-card-cta"
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  {ctaText}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
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
            ) : null}

          </motion.div>

        </div>
      </div>
    </section>
  );
}
