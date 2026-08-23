"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT (≥1280px) — Clean, Balanced, Uncluttered
          ══════════════════════════════════════════════ */}
      <section
        className="relative w-full bg-[#f3f4f6] overflow-hidden hidden xl:block mb-16"
        style={{ height: "730px" }}
      >
        <div className="relative mx-auto w-full max-w-[1280px] h-full">

          {/* ── Large light-grey circle backdrop behind students ── */}
          <div
            className="pointer-events-none absolute"
            style={{ left: "558px", top: "140px", width: "568px", height: "568px" }}
          >
            <Image src="/figma/ellipse1.svg" alt="" fill className="object-contain" priority />
          </div>

          {/* ── Red rotated capsule accent behind right student ── */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: "774px",
              top: "250px",
              width: "505px",
              height: "181px",
              transform: "rotate(-38.35deg)",
              transformOrigin: "center",
            }}
          >
            <div className="w-full h-full rounded-full bg-[#bc0c11] opacity-90" />
          </div>

          {/* ── Left Text Block (Cleanly aligned, balanced gap from Navbar) ── */}
          <div
            className="absolute flex flex-col items-start z-10"
            style={{ left: "32px", top: "185px", width: "400px" }}
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

            {/* Red accent line */}
            <div className="mt-3.5 relative h-5 w-[45px]">
              <Image src="/figma/frame15.svg" alt="" fill className="object-contain object-left" />
            </div>

            {/* Subtext */}
            <p
              className="mt-2.5 font-poppins text-[16px] leading-[28px] text-[#787878]"
              style={{ width: "365px" }}
            >
              Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak
            </p>

            {/* CTA Button "Jelajahi Lebih Lanjut" */}
            <div className="mt-7">
              <Link
                href="#sambutan"
                className="group relative inline-flex items-center"
                style={{ width: "246px", height: "63px" }}
              >
                {/* Red pill background */}
                <div
                  className="absolute bg-[#bc0c11] group-hover:bg-[#990a0e] transition-colors shadow-md"
                  style={{ left: "0px", top: "10px", width: "219px", height: "43px", borderRadius: "21.5px" }}
                />
                {/* Text */}
                <div
                  className="absolute flex items-center"
                  style={{ left: "20px", top: "10px", height: "43px" }}
                >
                  <span className="font-poppins font-medium text-white whitespace-nowrap" style={{ fontSize: "15px", lineHeight: "28px" }}>
                    Jelajahi Lebih Lanjut
                  </span>
                </div>
                {/* White circle with red arrow */}
                <div
                  className="absolute z-10 group-hover:translate-x-1 transition-transform"
                  style={{ left: "168px", top: "2px", width: "59px", height: "59px" }}
                >
                  <Image src="/figma/frame20.svg" alt="" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[20px] h-[20px]">
                      <Image src="/figma/vector-arrow.svg" alt="" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* ── Student 1 (Left) ── */}
          <div
            className="absolute overflow-hidden z-[5]"
            style={{ left: "357px", top: "230px", width: "508px", height: "338px" }}
          >
            <Image
              src="/figma/image4.png"
              alt="Siswa SMK Telkom Sidoarjo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ── Student 2 (Center Front) ── */}
          <div
            className="absolute overflow-hidden z-[10]"
            style={{ left: "672px", top: "140px", width: "319px", height: "426px" }}
          >
            <Image
              src="/figma/image1.png"
              alt="Siswa SMK Telkom Sidoarjo"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* ── Student 3 (Right) ── */}
          <div
            className="absolute overflow-hidden z-[5]"
            style={{ left: "916px", top: "185px", width: "271px", height: "406px" }}
          >
            <Image
              src="/figma/image5.png"
              alt="Siswi SMK Telkom Sidoarjo"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* ── Red Stats Bar (z-20 cleanly covering lower waist of students) ── */}
          <div
            className="absolute bg-[#bc0c11] rounded-[15px] flex items-center justify-between text-white z-20"
            style={{
              left: "448px",
              top: "545px",
              width: "750px",
              height: "132px",
              paddingLeft: "88px",
              paddingRight: "67px",
              boxShadow: "0px 10px 25px -5px rgba(188, 12, 17, 0.4), 0px 3px 1px rgba(0,0,0,0.09)",
            }}
          >
            {/* Stat 1: Jurusan */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-jakarta font-bold text-[36px] leading-[40px]">2</span>
              <span className="font-poppins font-medium text-[16px] leading-[20px] text-white/95">Jurusan</span>
            </div>

            {/* Divider 1 */}
            <div className="h-[100px] w-px bg-white/30" />

            {/* Stat 2: Siswa Aktif */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-jakarta font-bold text-[36px] leading-[40px]">840+</span>
              <span className="font-poppins font-medium text-[16px] leading-[20px] text-white/95">Siswa Aktif</span>
            </div>

            {/* Divider 2 */}
            <div className="h-[100px] w-px bg-white/30" />

            {/* Stat 3: Alumni */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-jakarta font-bold text-[36px] leading-[40px]">1372+</span>
              <span className="font-poppins font-medium text-[16px] leading-[20px] text-white/95">Alumni</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MOBILE / TABLET LAYOUT (< 1280px)
          ══════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#f3f4f6] overflow-hidden xl:hidden pt-[100px] pb-14">

        {/* Minimal clean background */}
        <div className="pointer-events-none absolute right-4 top-[100px] w-[200px] h-[200px] opacity-50">
          <Image src="/figma/ellipse1.svg" alt="" fill className="object-contain" />
        </div>

        <div className="px-5 sm:px-8 max-w-lg mx-auto">
          {/* Text block */}
          <div className="relative z-10">
            <p className="font-jakarta text-[16px] sm:text-[18px] leading-[28px]">
              <span className="font-normal text-[#4a5565]">Selamat Datang di </span>
              <span className="font-semibold text-[#e7000b]">SMK Telkom Sidoarjo!</span>
            </p>
            <div className="mt-2 font-jakarta font-bold text-[#101828] text-[28px] sm:text-[36px] leading-tight">
              <p className="mb-0">Sekolah Tangguh, </p>
              <p className="mb-0">Berakhlak,</p>
              <p className="text-[#e7000b]">&amp; Berwawasan Digital</p>
            </div>

            <div className="mt-3 relative h-5 w-11">
              <Image src="/figma/frame15.svg" alt="" fill className="object-contain object-left" />
            </div>

            <p className="mt-2 font-poppins text-[14px] sm:text-[16px] leading-[28px] text-[#787878] max-w-[365px]">
              Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak
            </p>

            {/* CTA Button mobile */}
            <div className="mt-6">
              <Link
                href="#sambutan"
                className="group relative inline-flex items-center"
                style={{ width: "246px", height: "63px" }}
              >
                <div
                  className="absolute bg-[#bc0c11] group-hover:bg-[#990a0e] transition-colors shadow-md"
                  style={{ left: "0px", top: "10px", width: "219px", height: "43px", borderRadius: "21.5px" }}
                />
                <div className="relative z-10 flex items-center" style={{ paddingLeft: "18px", paddingRight: "10px" }}>
                  <span className="font-poppins font-medium text-white text-[15px] leading-[28px] whitespace-nowrap">
                    Jelajahi Lebih Lanjut
                  </span>
                </div>
                <div
                  className="absolute z-10 group-hover:translate-x-1 transition-transform"
                  style={{ left: "168px", top: "2px", width: "59px", height: "59px" }}
                >
                  <Image src="/figma/frame20.svg" alt="" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[20px] h-[20px]">
                      <Image src="/figma/vector-arrow.svg" alt="" fill className="object-contain" />
                    </div>
                  </div>
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

          {/* Stats bar mobile */}
          <div
            className="mt-6 bg-[#bc0c11] rounded-[15px] flex items-center justify-between z-20 relative text-white"
            style={{
              padding: "16px 24px",
              boxShadow: "0px 10px 25px -5px rgba(188, 12, 17, 0.4), 0px 3px 1px rgba(0,0,0,0.09)",
            }}
          >
            {[
              { v: "2", l: "Jurusan" },
              { v: "840+", l: "Siswa Aktif" },
              { v: "1372+", l: "Alumni" },
            ].map((stat, i, arr) => (
              <div key={stat.l} className="flex items-center gap-3 sm:gap-5">
                <div className="flex flex-col gap-1 items-center text-center text-white">
                  <span className="font-jakarta font-bold text-2xl sm:text-[36px] leading-[40px]">{stat.v}</span>
                  <span className="font-poppins text-xs sm:text-[16px] leading-[20px]">{stat.l}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-[60px] w-px bg-white/30 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
