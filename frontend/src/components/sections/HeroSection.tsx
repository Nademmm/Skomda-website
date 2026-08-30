"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT (≥1280px) — Spacious, Comfortable, No Gap
          ══════════════════════════════════════════════ */}
      <section
        className="relative w-full bg-[#f3f4f6] overflow-hidden hidden xl:block mb-20"
        style={{ height: "730px" }}
      >
        <div className="relative mx-auto w-full max-w-[1280px] h-full">

          {/* ── Large light-grey circle backdrop behind students ── */}
          <div
            className="pointer-events-none absolute"
            style={{ left: "558px", top: "130px", width: "568px", height: "568px" }}
          >
            <Image src="/figma/ellipse1.svg" alt="" fill className="object-contain" priority />
          </div>

          {/* ── Red rotated capsule accent behind right student ── */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: "774px",
              top: "240px",
              width: "505px",
              height: "181px",
              transform: "rotate(-38.35deg)",
              transformOrigin: "center",
            }}
          >
            <div className="w-full h-full rounded-full bg-[#bc0c11] opacity-90" />
          </div>

          {/* ── Left Text Block (Spacious top margin from floating navbar) ── */}
          <div
            className="absolute flex flex-col items-start z-10"
            style={{ left: "32px", top: "190px", width: "420px" }}
          >
            {/* Welcome label */}
            <p className="font-jakarta text-[18px] leading-[28px]">
              <span className="font-normal text-[#4a5565]">{t("hero.welcome")} </span>
              <span className="font-semibold text-[#e7000b]">SMK Telkom Sidoarjo!</span>
            </p>

            {/* Main 3-line heading */}
            <h1
              className="mt-2.5 font-jakarta font-bold text-[#101828]"
              style={{ fontSize: "36px", lineHeight: "45px" }}
            >
              {t("hero.title1")} <br />
              {t("hero.title2")}<br />
              <span className="text-[#e7000b]">{t("hero.title3")}</span>
            </h1>

            {/* Red accent line (Flush aligned with text) */}
            <div className="my-3.5 h-[2.5px] w-9 rounded-full bg-[#ee5053]" />

            {/* Subtext */}
            <p
              className="font-poppins text-[16px] leading-[28px] text-[#787878]"
              style={{ width: "365px" }}
            >
              {t("hero.description")}
            </p>

            {/* CTA Button "Jelajahi Lebih Lanjut" */}
            <div className="mt-7">
              <Link
                href="#sambutan"
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98]"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
                  {t("hero.exploreMore")}
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
            </div>
          </div>

          {/* ── Student 1 (Left) - bottom extends seamlessly into stats bar ── */}
          <div
            className="absolute overflow-hidden z-[5]"
            style={{ left: "357px", top: "230px", width: "508px", height: "460px" }}
          >
            <Image
              src="/figma/image4.png"
              alt="Siswa SMK Telkom Sidoarjo"
              fill
              sizes="508px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* ── Student 2 (Center Front) - bottom extends seamlessly into stats bar ── */}
          <div
            className="absolute overflow-hidden z-[10]"
            style={{ left: "672px", top: "140px", width: "325px", height: "550px" }}
          >
            <Image
              src="/figma/image1.png"
              alt="Siswa SMK Telkom Sidoarjo"
              fill
              sizes="325px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* ── Student 3 (Right) - bottom extends seamlessly into stats bar ── */}
          <div
            className="absolute overflow-hidden z-[5]"
            style={{ left: "852px", top: "185px", width: "389px", height: "505px" }}
          >
            <Image
              src="/figma/image5.png"
              alt="Siswi SMK Telkom Sidoarjo"
              fill
              sizes="389px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* ══════════════════════════════════════════════
              FLOATING STATS BAR OVERLAY (Zero gap)
              ══════════════════════════════════════════════ */}
          <div
            className="absolute z-20"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "0px",
              width: "calc(100% - 64px)",
              maxWidth: "1216px",
            }}
          >
            <div
              className="relative w-full rounded-[25px] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #e7000b 0%, #bc0c11 100%)",
                boxShadow: "0px 10px 30px rgba(188, 12, 17, 0.25)",
                padding: "24px 40px",
              }}
            >

              {/* Stats items grid */}
              <div className="relative z-10 grid grid-cols-3 gap-6 text-white text-center">
                {/* 1: Jurusan */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1.5 font-jakarta font-bold" style={{ fontSize: "36px", lineHeight: "40px" }}>
                    <span>2</span>
                    <span className="text-white/80 text-2xl font-medium">
                      {t("hero.programCount")}
                    </span>
                  </div>
                  <p className="mt-1 font-poppins text-sm text-white/80 font-normal">
                    {t("hero.programDesc")}
                  </p>
                </div>

                {/* Divider 1 */}
                <div className="flex flex-col items-center justify-center border-x border-white/20 px-4">
                  <div className="flex items-center gap-1 font-jakarta font-bold" style={{ fontSize: "36px", lineHeight: "40px" }}>
                    <span>840+</span>
                  </div>
                  <p className="mt-1 font-poppins text-sm text-white/80 font-normal">
                    {t("hero.studentsCount")}
                  </p>
                </div>

                {/* 3: Alumni */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 font-jakarta font-bold" style={{ fontSize: "36px", lineHeight: "40px" }}>
                    <span>1372+</span>
                  </div>
                  <p className="mt-1 font-poppins text-sm text-white/80 font-normal">
                    {t("hero.alumniCount")}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MOBILE / TABLET LAYOUT (<1280px)
          ══════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#f3f4f6] overflow-hidden xl:hidden pt-[128px] sm:pt-[144px] pb-12 sm:pb-16">

        <div className="px-4 sm:px-8 max-w-lg mx-auto">
          {/* Text block */}
          <div className="relative z-10 flex flex-col items-start">
            <p className="font-jakarta text-[14px] sm:text-[17px] leading-snug">
              <span className="font-normal text-[#4a5565]">{t("hero.welcome")} </span>
              <span className="font-semibold text-[#e7000b]">SMK Telkom Sidoarjo!</span>
            </p>
            <div className="mt-1.5 sm:mt-2 font-jakarta font-bold text-[#101828] text-[24px] sm:text-[32px] leading-tight">
              <p className="mb-0">{t("hero.title1")}</p>
              <p className="mb-0">{t("hero.title2")}</p>
              <p className="text-[#e7000b]">{t("hero.title3")}</p>
            </div>

            {/* Red accent line */}
            <div className="my-2.5 sm:my-3.5 h-[2.5px] w-9 rounded-full bg-[#ee5053]" />

            <p className="font-poppins text-[13px] sm:text-[15px] leading-relaxed text-[#787878] max-w-[365px]">
              {t("hero.description")}
            </p>

            {/* Compact & Proportional CTA Button on mobile */}
            <div className="mt-4 sm:mt-5">
              <Link
                href="#sambutan"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#bc0c11] px-6 py-2.5 text-white transition-all duration-200 hover:bg-[#990a0e] active:scale-[0.97]"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-jakarta font-medium text-[14px] leading-none whitespace-nowrap">
                  {t("hero.exploreMore")}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
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
            </div>
          </div>

          {/* Student images collage with backdrop circle & capsule */}
          <div className="relative mt-6 sm:mt-8" style={{ height: "270px" }}>
            {/* Light-grey circle backdrop directly behind students */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-10px] w-[260px] h-[260px]">
              <Image src="/figma/ellipse1.svg" alt="" fill className="object-contain opacity-80" />
            </div>

            {/* Red rotated capsule accent behind right student */}
            <div
              className="absolute right-0 top-0 bg-[#bc0c11] pointer-events-none opacity-90"
              style={{
                width: "55%",
                height: "150px",
                borderRadius: "75px",
                transform: "rotate(-38deg)",
                transformOrigin: "80% 40%",
              }}
            />

            {/* Student 1 (Left) */}
            <div className="absolute bottom-0 z-[5]" style={{ left: "0%", width: "38%", height: "250px" }}>
              <Image src="/figma/image4.png" alt="Siswa SMK Telkom" fill sizes="38vw" className="object-cover" priority />
            </div>

            {/* Student 2 (Center Front) */}
            <div className="absolute bottom-0 z-[10]" style={{ left: "50%", transform: "translateX(-50%)", width: "42%", height: "270px" }}>
              <Image src="/figma/image1.png" alt="Siswa SMK Telkom" fill sizes="42vw" className="object-cover object-top" priority />
            </div>

            {/* Student 3 (Right) */}
            <div className="absolute bottom-0 z-[5]" style={{ right: "0%", width: "38%", height: "250px" }}>
              <Image src="/figma/image5.png" alt="Siswi SMK Telkom" fill sizes="38vw" className="object-cover object-top" priority />
            </div>
          </div>

          {/* Mobile stats bar seamlessly connected with 0 gap */}
          <div className="relative z-20 -mt-1 sm:-mt-2 rounded-[20px] bg-gradient-to-r from-[#e7000b] to-[#bc0c11] p-4 sm:p-5 text-white shadow-[0px_8px_20px_rgba(188,12,17,0.25)]">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <div>
                <span className="font-jakarta font-bold text-xl sm:text-2xl">2</span>
                <p className="font-poppins text-[11px] sm:text-xs text-white/80 mt-0.5">
                  {t("hero.programCount")}
                </p>
              </div>
              <div className="border-x border-white/20">
                <span className="font-jakarta font-bold text-xl sm:text-2xl">840+</span>
                <p className="font-poppins text-[11px] sm:text-xs text-white/80 mt-0.5">
                  {t("hero.studentsCount")}
                </p>
              </div>
              <div>
                <span className="font-jakarta font-bold text-xl sm:text-2xl">1372+</span>
                <p className="font-poppins text-[11px] sm:text-xs text-white/80 mt-0.5">
                  {t("hero.alumniCount")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
