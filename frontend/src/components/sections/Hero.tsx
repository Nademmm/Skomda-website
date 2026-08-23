"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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
              <span className="font-normal text-[#4a5565]">Selamat Datang di </span>
              <span className="font-semibold text-[#e7000b]">SMK Telkom Sidoarjo!</span>
            </p>

            {/* Main 3-line heading */}
            <h1
              className="mt-2.5 font-jakarta font-bold text-[#101828]"
              style={{ fontSize: "36px", lineHeight: "45px" }}
            >
              Sekolah Tangguh, <br />
              Berakhlak,<br />
              <span className="text-[#e7000b]">&amp; Berwawasan Digital</span>
            </h1>

            {/* Red accent line (Flush aligned with text) */}
            <div className="my-3.5 h-[2.5px] w-9 rounded-full bg-[#ee5053]" />

            {/* Subtext */}
            <p
              className="font-poppins text-[16px] leading-[28px] text-[#787878]"
              style={{ width: "365px" }}
            >
              Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak
            </p>

            {/* CTA Button "Jelajahi Lebih Lanjut" */}
            <div className="mt-7">
              <Link
                href="#sambutan"
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] pl-6 pr-1.5 py-1.5 text-white shadow-[0px_4px_10px_rgba(188,12,17,0.3)] transition-all duration-300 hover:bg-[#990a0e] hover:shadow-[0px_6px_15px_rgba(188,12,17,0.4)] active:scale-[0.98]"
              >
                <span className="font-poppins font-medium text-[15px] leading-none whitespace-nowrap">
                  Jelajahi Lebih Lanjut
                </span>
                <div className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#bc0c11] shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bc0c11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
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
                    <span className="text-white/80 text-2xl font-medium">Program</span>
                  </div>
                  <p className="mt-1 font-poppins text-sm text-white/80 font-normal">
                    SIJA (4 Thn) &amp; TJAT (3 Thn)
                  </p>
                </div>

                {/* Divider 1 */}
                <div className="flex flex-col items-center justify-center border-x border-white/20 px-4">
                  <div className="flex items-center gap-1 font-jakarta font-bold" style={{ fontSize: "36px", lineHeight: "40px" }}>
                    <span>840+</span>
                  </div>
                  <p className="mt-1 font-poppins text-sm text-white/80 font-normal">
                    Siswa Aktif Berprestasi
                  </p>
                </div>

                {/* 3: Alumni */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 font-jakarta font-bold" style={{ fontSize: "36px", lineHeight: "40px" }}>
                    <span>1372+</span>
                  </div>
                  <p className="mt-1 font-poppins text-sm text-white/80 font-normal">
                    Alumni Sukses &amp; Berkarier
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
      <section className="relative w-full bg-[#f3f4f6] overflow-hidden xl:hidden pt-[115px] pb-14">

        {/* Minimal clean background */}
        <div className="pointer-events-none absolute right-4 top-[100px] w-[200px] h-[200px] opacity-50">
          <Image src="/figma/ellipse1.svg" alt="" fill className="object-contain" />
        </div>

        <div className="px-5 sm:px-8 max-w-lg mx-auto">
          {/* Text block */}
          <div className="relative z-10 flex flex-col items-start">
            <p className="font-jakarta text-[16px] sm:text-[18px] leading-[28px]">
              <span className="font-normal text-[#4a5565]">Selamat Datang di </span>
              <span className="font-semibold text-[#e7000b]">SMK Telkom Sidoarjo!</span>
            </p>
            <div className="mt-2 font-jakarta font-bold text-[#101828] text-[28px] sm:text-[36px] leading-tight">
              <p className="mb-0">Sekolah Tangguh, </p>
              <p className="mb-0">Berakhlak,</p>
              <p className="text-[#e7000b]">&amp; Berwawasan Digital</p>
            </div>

            {/* Red accent line (Flush aligned) */}
            <div className="my-3.5 h-[2.5px] w-9 rounded-full bg-[#ee5053]" />

            <p className="font-poppins text-[14px] sm:text-[16px] leading-[28px] text-[#787878] max-w-[365px]">
              Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak
            </p>

            {/* CTA Button mobile */}
            <div className="mt-6">
              <Link
                href="#sambutan"
                className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] pl-6 pr-1.5 py-1.5 text-white shadow-[0px_4px_10px_rgba(188,12,17,0.3)] transition-all duration-300 hover:bg-[#990a0e] hover:shadow-[0px_6px_15px_rgba(188,12,17,0.4)] active:scale-[0.98]"
              >
                <span className="font-poppins font-medium text-[15px] leading-none whitespace-nowrap">
                  Jelajahi Lebih Lanjut
                </span>
                <div className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-white text-[#bc0c11] shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bc0c11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Student images collage */}
          <div className="relative mt-8" style={{ height: "270px" }}>
            <div
              className="absolute right-0 top-0 bg-[#bc0c11] pointer-events-none"
              style={{ width: "55%", height: "150px", borderRadius: "75px", transform: "rotate(-38deg)", transformOrigin: "80% 40%" }}
            />
            <div className="absolute bottom-0 z-[5]" style={{ left: "0%", width: "38%", height: "250px" }}>
              <Image src="/figma/image4.png" alt="Siswa SMK Telkom" fill className="object-cover" priority />
            </div>
            <div className="absolute bottom-0 z-[10]" style={{ left: "50%", transform: "translateX(-50%)", width: "42%", height: "270px" }}>
              <Image src="/figma/image1.png" alt="Siswa SMK Telkom" fill className="object-cover object-top" priority />
            </div>
            <div className="absolute bottom-0 z-[5]" style={{ right: "0%", width: "38%", height: "250px" }}>
              <Image src="/figma/image5.png" alt="Siswi SMK Telkom" fill className="object-cover object-top" priority />
            </div>
          </div>

          {/* Mobile stats bar */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#e7000b] to-[#bc0c11] p-5 text-white shadow-lg">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="font-jakarta font-bold text-2xl">2</span>
                <p className="font-poppins text-xs text-white/80 mt-0.5">Jurusan</p>
              </div>
              <div className="border-x border-white/20">
                <span className="font-jakarta font-bold text-2xl">840+</span>
                <p className="font-poppins text-xs text-white/80 mt-0.5">Siswa</p>
              </div>
              <div>
                <span className="font-jakarta font-bold text-2xl">1372+</span>
                <p className="font-poppins text-xs text-white/80 mt-0.5">Alumni</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
