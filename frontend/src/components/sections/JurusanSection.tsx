"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function JurusanSection() {
  const [activeTab, setActiveTab] = useState<"SIJA" | "TJAT">("SIJA");

  return (
    <section id="program" className="w-full bg-[#f3f4f6] py-20 lg:py-24" data-node-id="100:460">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-jakarta font-bold text-3xl sm:text-[36px] leading-[40px] text-[#101828]">
            Program Keahlian
          </h2>

          <p className="mt-2 font-jakarta font-bold text-2xl sm:text-[30px] leading-[36px] text-[#101828]">
            di <span className="text-[#bc0c11]">SMK Telkom Sidoarjo</span>
          </p>

          {/* Segmented Pill Tabs */}
          <div className="mt-8 inline-flex h-[52px] w-[340px] items-center rounded-full bg-white p-1 shadow-sm border border-gray-200/60">
            <button
              onClick={() => setActiveTab("SIJA")}
              className={`flex-1 h-full rounded-full flex items-center justify-center gap-2 font-jakarta text-sm font-medium transition-all ${
                activeTab === "SIJA"
                  ? "bg-[#bd0c12] text-white shadow-sm font-semibold"
                  : "text-[#364153] hover:text-[#bd0c12]"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>SIJA</span>
            </button>
            <button
              onClick={() => setActiveTab("TJAT")}
              className={`flex-1 h-full rounded-full flex items-center justify-center gap-2 font-jakarta text-sm font-medium transition-all ${
                activeTab === "TJAT"
                  ? "bg-[#bd0c12] text-white shadow-sm font-semibold"
                  : "text-[#364153] hover:text-[#bd0c12]"
              }`}
            >
              {/* Exact TJAT vector icon from Figma (node 96:378) */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.54 6.47a5 5 0 0 1 0 7.06" />
                <path d="M15.9 4.11a8.33 8.33 0 0 1 0 11.78" />
                <path d="M4.1 15.89a8.33 8.33 0 0 1 0-11.78" />
                <path d="M6.46 13.53a5 5 0 0 1 0-7.06" />
                <circle cx="10" cy="10" r="1.5" stroke="currentColor" fill="none" />
              </svg>
              <span>TJAT</span>
            </button>
          </div>
        </div>

        {/* Tab Content: SIJA */}
        {activeTab === "SIJA" && (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Student Image with Double Frames (Figma 67:112, 104:463, 105:467, 105:468) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative flex items-center justify-center" data-node-id="67:112">
                
                {/* 1. Outer Dashed Border Frame */}
                <div
                  className="absolute -left-4 -top-4 sm:-left-5 sm:-top-5 h-[370px] sm:h-[400px] lg:h-[430px] w-[290px] sm:w-[320px] lg:w-[340px] border-2 border-dashed border-[#787878]/60 pointer-events-none"
                  style={{ borderRadius: "55px 0 55px 0" }}
                  data-node-id="67:100"
                />

                {/* 2. Inner Solid Red Curved Frame */}
                <div
                  className="relative h-[370px] sm:h-[400px] lg:h-[430px] w-[290px] sm:w-[320px] lg:w-[340px] overflow-hidden bg-[#bc0c11] shadow-xl"
                  style={{ borderRadius: "190px 0 190px 0" }}
                  data-node-id="67:103"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#990a0e] to-[#bc0c11] opacity-90" />
                </div>

                {/* 3. Student Photo - charen (SIJA) precisely height-matched to TJAT */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[445px] w-[668px] pointer-events-none flex items-end justify-center overflow-visible"
                  data-node-id="104:463"
                  data-name="charen"
                >
                  <Image
                    src="/figma/charen.png"
                    alt="Siswa SIJA SMK Telkom Sidoarjo"
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* 4. Floating Code Badge Top-Right (Figma 105:467) */}
                <div
                  className="absolute top-8 -right-3 sm:-right-4 z-20 flex size-[52px] items-center justify-center rounded-[12px] bg-white/95 shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform hover:scale-110"
                  data-node-id="105:467"
                >
                  <div className="relative size-[30px]" data-node-id="105:465" data-name="ph:code-fill">
                    <Image
                      src="/figma/ph-code-fill.svg"
                      alt="Code icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 5. Floating Code Badge Bottom-Left (Figma 105:468) */}
                <div
                  className="absolute bottom-20 -left-3 sm:-left-4 z-20 flex size-[52px] items-center justify-center rounded-[12px] bg-white/95 shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform hover:scale-110"
                  data-node-id="105:468"
                >
                  <div className="relative size-[30px]" data-name="ph:code-fill">
                    <Image
                      src="/figma/ph-code-fill.svg"
                      alt="Code icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Program Details (Figma 96:391) */}
            <div className="lg:col-span-7 flex flex-col gap-6" data-node-id="96:391">
              <div>
                <h3 className="font-jakarta font-bold text-2xl sm:text-3xl leading-tight">
                  <span className="text-[#bd0c12]">Sistem Informasi</span>{" "}
                  <span className="text-[#101828]">Jaringan dan Aplikasi</span>
                </h3>
                <p className="mt-2 font-jakarta text-sm sm:text-base leading-relaxed text-[#4a5565]">
                  Program 4 tahun yang mempelajari pemrograman, pengelolaan basis data, dan sistem informasi berbasis teknologi modern.
                </p>
              </div>

              {/* 3 Competencies */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Software Development",
                    desc: "Belajar membuat aplikasi web, mobile, dan desktop yang fungsional dan modern.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bd0c12" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ),
                  },
                  {
                    title: "Database & Cloud Computing",
                    desc: "Belajar membuat aplikasi web, mobile, dan desktop yang fungsional dan modern.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bd0c12" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      </svg>
                    ),
                  },
                  {
                    title: "Networking & Cybersecurity",
                    desc: "Belajar membuat aplikasi web, mobile, dan desktop yang fungsional dan modern.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bd0c12" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    ),
                  },
                ].map((comp) => (
                  <div key={comp.title} className="flex items-start gap-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)]">
                      {comp.icon}
                    </div>
                    <div>
                      <h4 className="font-jakarta font-semibold text-sm sm:text-base text-[#101828]">
                        {comp.title}
                      </h4>
                      <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] mt-0.5">
                        {comp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospek Kerja Container */}
              <div className="rounded-2xl bg-white/70 border border-gray-200/70 p-4 sm:p-5">
                <h4 className="font-jakarta font-semibold text-sm sm:text-base text-[#c10007]">
                  Prospek Kerja:
                </h4>
                <p className="font-jakarta text-xs sm:text-sm text-[#364153] mt-1 leading-relaxed">
                  Software Engineer, Web Developer, Mobile App Developer, Database Administrator, IT Security Specialist, System Analyst.
                </p>
              </div>

              {/* Consistent Red Pill CTA Button */}
              <div>
                <Link
                  href="/jurusan/sija"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#bd0c12] px-7 py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-[#990a0e] active:scale-[0.98]"
                  style={{
                    boxShadow:
                      "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                  }}
                >
                  <span className="font-jakarta font-medium">Pelajari Selengkapnya</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
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
          </div>
        )}

        {/* Tab Content: TJAT */}
        {activeTab === "TJAT" && (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Student Image with Double Frames */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative flex items-center justify-center">
                
                {/* 1. Outer Dashed Border Frame */}
                <div
                  className="absolute -left-4 -top-4 sm:-left-5 sm:-top-5 h-[370px] sm:h-[400px] lg:h-[430px] w-[290px] sm:w-[320px] lg:w-[340px] border-2 border-dashed border-[#787878]/60 pointer-events-none"
                  style={{ borderRadius: "55px 0 55px 0" }}
                />

                {/* 2. Inner Solid Red Curved Frame */}
                <div
                  className="relative h-[370px] sm:h-[400px] lg:h-[430px] w-[290px] sm:w-[320px] lg:w-[340px] overflow-hidden bg-[#bc0c11] shadow-xl"
                  style={{ borderRadius: "190px 0 190px 0" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#990a0e] to-[#bc0c11] opacity-90" />
                </div>

                {/* 3. Student Photo - TJAT */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[470px] w-[314px] pointer-events-none flex items-end justify-center overflow-visible">
                  <Image
                    src="/figma/image5.png"
                    alt="Siswi TJAT SMK Telkom Sidoarjo"
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* 4. Floating Badge Top-Right */}
                <div className="absolute top-8 -right-3 sm:-right-4 z-20 flex size-[52px] items-center justify-center rounded-[12px] bg-white/95 shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform hover:scale-110">
                  <div className="relative size-[30px]">
                    <Image
                      src="/figma/ph-code-fill.svg"
                      alt="Code icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 5. Floating Badge Bottom-Left */}
                <div className="absolute bottom-20 -left-3 sm:-left-4 z-20 flex size-[52px] items-center justify-center rounded-[12px] bg-white/95 shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform hover:scale-110">
                  <div className="relative size-[30px]">
                    <Image
                      src="/figma/ph-code-fill.svg"
                      alt="Code icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: TJAT Details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h3 className="font-jakarta font-bold text-2xl sm:text-3xl leading-tight">
                  <span className="text-[#bd0c12]">Teknik Jaringan</span>{" "}
                  <span className="text-[#101828]">Akses Telekomunikasi</span>
                </h3>
                <p className="mt-2 font-jakarta text-sm sm:text-base leading-relaxed text-[#4a5565]">
                  Program 3 tahun yang fokus pada teknologi jaringan telekomunikasi, infrastruktur fiber optik, dan komunikasi nirkabel berkecepatan tinggi.
                </p>
              </div>

              {/* 3 Competencies */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Telecommunication Networks",
                    desc: "Mempelajari prinsip transmisi sinyal dan arsitektur jaringan komunikasi suara dan data.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bd0c12" strokeWidth="2">
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    ),
                  },
                  {
                    title: "Fiber Optic Technology",
                    desc: "Instalasi, penyambungan fusion splicing, pengukuran OTDR, dan pemeliharaan kabel serat optik.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bd0c12" strokeWidth="2">
                        <path d="M4 11a9 9 0 0 1 9 9" />
                        <path d="M4 4a16 16 0 0 1 16 16" />
                        <circle cx="5" cy="19" r="1" />
                      </svg>
                    ),
                  },
                  {
                    title: "Wireless & Microwave Communication",
                    desc: "Konfigurasi radio link, base transceiver station (BTS), serta transmisi frekuensi nirkabel seluler.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bd0c12" strokeWidth="2">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        <line x1="12" y1="20" x2="12.01" y2="20" />
                      </svg>
                    ),
                  },
                ].map((comp) => (
                  <div key={comp.title} className="flex items-start gap-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)]">
                      {comp.icon}
                    </div>
                    <div>
                      <h4 className="font-jakarta font-semibold text-sm sm:text-base text-[#101828]">
                        {comp.title}
                      </h4>
                      <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] mt-0.5">
                        {comp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospek Kerja Container */}
              <div className="rounded-2xl bg-white/70 border border-gray-200/70 p-4 sm:p-5">
                <h4 className="font-jakarta font-semibold text-sm sm:text-base text-[#c10007]">
                  Prospek Kerja:
                </h4>
                <p className="font-jakarta text-xs sm:text-sm text-[#364153] mt-1 leading-relaxed">
                  Fiber Optic Engineer, Telecom Network Specialist, BTS Engineer, Wireless Technician, ISP Support Engineer.
                </p>
              </div>

              {/* Consistent Red Pill CTA Button */}
              <div>
                <Link
                  href="/jurusan/tjat"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#bd0c12] px-7 py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-[#990a0e] active:scale-[0.98]"
                  style={{
                    boxShadow:
                      "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                  }}
                >
                  <span className="font-jakarta font-medium">Pelajari Selengkapnya</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
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
          </div>
        )}

      </div>
    </section>
  );
}
