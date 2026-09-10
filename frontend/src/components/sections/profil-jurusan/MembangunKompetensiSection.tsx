"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Globe2,
  GraduationCap,
  Network,
  Cloud,
  Cpu,
  Lightbulb,
  Monitor,
  Code2,
  Palette,
  Server,
  CloudCog,
  ShieldCheck,
  Building2,
  Cable,
  Wifi,
  Radio,
  LucideIcon,
} from "lucide-react";

type JurusanKey = "SIJA" | "TJAT";

interface SubjectItem {
  name: string;
  icon: LucideIcon;
}

interface JurusanData {
  key: JurusanKey;
  label: string;
  badge: string;
  titleRed: string;
  titleBlack: string;
  description: string;
  duration: string;
  studentImage: string;
  studentAlt: string;
  badgeIcon: string;
  subjects: SubjectItem[];
}

const jurusanContent: Record<JurusanKey, JurusanData> = {
  SIJA: {
    key: "SIJA",
    label: "SIJA",
    badge: "Sistem Informasi Jaringan & Aplikasi",
    titleRed: "Sistem Informasi",
    titleBlack: "Jaringan dan Aplikasi",
    description:
      "Merupakan kompetensi keahlian baru berbasis Teknologi Informasi dan Komunikasi pada program keahlian Teknik Komputer dan Informatika yang mulai dibuka pada Tahun Pelajaran 2017/2018 untuk program pendidikan SMK dengan pembelajaran Empat (4) Tahun. Sesuai dengan Keputusan Dirjen Dikdasmen Kemendikbud Nomor: 4678/D/KEP/MK/2016.",
    duration: "Masa pendidikan 4 tahun",
    studentImage: "/images/program/profil-jurusan/charen.png",
    studentAlt: "Siswi SIJA SMK Telkom Sidoarjo",
    badgeIcon: "/images/common/icons/ph-code-fill.svg",
    subjects: [
      { name: "Kelompok Mata Pelajaran Nasional", icon: BookOpen },
      { name: "Kelompok Mata Pelajaran Kewilayahan", icon: Globe2 },
      { name: "Kelompok Mata Pelajaran Peminatan", icon: GraduationCap },
      { name: "Komputer dan Jaringan Dasar", icon: Network },
      { name: "Platform Komputasi Awan", icon: Cloud },
      { name: "Sistem Internet of Things (SIoT)", icon: Cpu },
      { name: "Produk Kreatif dan Kewirausahaan", icon: Lightbulb },
      { name: "Sistem Komputer", icon: Monitor },
      { name: "Pemrograman Dasar", icon: Code2 },
      { name: "Dasar Desain Grafis", icon: Palette },
      { name: "Infrastruktur Komputasi Awan", icon: Server },
      { name: "Layanan Komputasi Awan", icon: CloudCog },
      { name: "Sistem Keamanan Jaringan", icon: ShieldCheck },
      { name: "Materi sinkronisasi dengan industri", icon: Building2 },
    ],
  },
  TJAT: {
    key: "TJAT",
    label: "TJAT",
    badge: "Teknik Jaringan Akses Telekomunikasi",
    titleRed: "Teknik Jaringan Akses",
    titleBlack: "Telekomunikasi",
    description:
      "Merupakan program keahlian unggulan SMK Telkom Sidoarjo yang berfokus pada teknologi transmisi gelombang, instalasi dan penyambungan serat optik (Fiber Optic), konfigurasi jaringan nirkabel (Wireless & Seluler), serta pemeliharaan infrastruktur telekomunikasi terintegrasi standar industri Telkom.",
    duration: "Masa pendidikan 3 tahun",
    studentImage: "/images/home/hero/image5.png",
    studentAlt: "Siswi TJAT SMK Telkom Sidoarjo",
    badgeIcon: "/images/program/profil-jurusan/icon-tjat.svg",
    subjects: [
      { name: "Jaringan Fiber Optic", icon: Cable },
      { name: "Jaringan Komputer", icon: Network },
      { name: "Jaringan Nirkabel / Wireless", icon: Wifi },
      { name: "Pemrograman Web", icon: Code2 },
      { name: "Desain Grafis", icon: Palette },
      { name: "Internet of things (IOT)", icon: Radio },
      { name: "Sistem Keamanan Jaringan", icon: ShieldCheck },
      { name: "Produk Kreatif dan Kewirausahaan", icon: Lightbulb },
      { name: "Materi sinkronisasi dengan industri", icon: Building2 },
    ],
  },
};

export default function MembangunKompetensiSection() {
  const searchParams = useSearchParams();
  const jurusanParam =
    searchParams.get("jurusan")?.toUpperCase() ||
    searchParams.get("tab")?.toUpperCase();

  const [activeJurusan, setActiveJurusan] = useState<JurusanKey>(() => {
    if (jurusanParam === "TJAT" || jurusanParam === "TJA") return "TJAT";
    return "SIJA";
  });

  useEffect(() => {
    if (jurusanParam === "TJAT" || jurusanParam === "TJA") {
      setActiveJurusan("TJAT");
    } else if (jurusanParam === "SIJA") {
      setActiveJurusan("SIJA");
    } else {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("tjat") || hash.includes("tja")) {
        setActiveJurusan("TJAT");
      } else if (hash.includes("sija")) {
        setActiveJurusan("SIJA");
      }
    }

    if (jurusanParam || window.location.hash.includes("kompetensi")) {
      const timer = setTimeout(() => {
        const el = document.getElementById("kompetensi");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [jurusanParam]);

  const current = jurusanContent[activeJurusan];

  return (
    <section
      id="kompetensi"
      className="relative w-full py-20 lg:py-28 bg-white border-t border-gray-200/60 overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Top Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Top Red Accent Bar */}
          <div className="h-[3px] w-12 rounded-full bg-[#bc0c11] mb-5" />
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight tracking-tight text-[#101828]">
            Membangun Kompetensi
          </h2>
          <p className="font-jakarta font-semibold text-xl sm:text-2xl text-[#101828] mt-1">
            Sesuai Minat dan Bakat Siswa.
          </p>

          {/* Segmented Pill Tabs with Animated Sliding Pill Indicator */}
          <div className="mt-8 relative inline-flex h-[52px] w-[340px] items-center rounded-full bg-[#f3f4f6] p-1 shadow-sm border border-gray-200/60">
            {/* SIJA Button */}
            <button
              type="button"
              onClick={() => setActiveJurusan("SIJA")}
              className={`relative z-10 flex-1 h-full rounded-full flex items-center justify-center gap-2 font-jakarta text-sm font-medium transition-colors duration-200 cursor-pointer select-none ${
                activeJurusan === "SIJA"
                  ? "text-white font-semibold"
                  : "text-[#364153] hover:text-[#bd0c12]"
              }`}
            >
              {activeJurusan === "SIJA" && (
                <motion.div
                  layoutId="activeJurusanPill"
                  className="absolute inset-0 rounded-full bg-[#bd0c12] shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>SIJA</span>
            </button>

            {/* TJAT Button */}
            <button
              type="button"
              onClick={() => setActiveJurusan("TJAT")}
              className={`relative z-10 flex-1 h-full rounded-full flex items-center justify-center gap-2 font-jakarta text-sm font-medium transition-colors duration-200 cursor-pointer select-none ${
                activeJurusan === "TJAT"
                  ? "text-white font-semibold"
                  : "text-[#364153] hover:text-[#bd0c12]"
              }`}
            >
              {activeJurusan === "TJAT" && (
                <motion.div
                  layoutId="activeJurusanPill"
                  className="absolute inset-0 rounded-full bg-[#bd0c12] shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
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

        {/* Content Container with Clean, Instant Crossfade */}
        <motion.div
          key={activeJurusan}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Main Jurusan Showcase Box */}
          <div className="my-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: Student Image with Signature Double Curved Frame */}
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

                  {/* 3. Student Photo */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[445px] sm:h-[460px] w-[500px] pointer-events-none flex items-end justify-center overflow-visible">
                    <Image
                      src={current.studentImage}
                      alt={current.studentAlt}
                      fill
                      className="object-contain object-bottom drop-shadow-2xl"
                      priority
                    />
                  </div>

                  {/* 4. Floating Badge Top-Right */}
                  <div className="absolute top-8 -right-3 sm:-right-4 z-20 flex size-[52px] items-center justify-center rounded-[12px] bg-white/95 shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                    <div className="relative size-[30px]">
                      <Image
                        src={current.badgeIcon}
                        alt="Icon badge"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* 5. Floating Badge Bottom-Left */}
                  <div className="absolute bottom-20 -left-3 sm:-left-4 z-20 flex size-[52px] items-center justify-center rounded-[12px] bg-white/95 shadow-[0px_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                    <div className="relative size-[30px]">
                      <Image
                        src={current.badgeIcon}
                        alt="Icon badge"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Detailed Info */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Title: Red on Top, Black Below */}
                <h3 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-[40px] leading-[1.18] tracking-tight">
                  <span className="text-[#bd0c12] block">{current.titleRed}</span>
                  <span className="text-[#101828] block">{current.titleBlack}</span>
                </h3>

                {/* Description Paragraph */}
                <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mt-5 mb-5">
                  {current.description}
                </p>

                {/* Duration Tag */}
                <div className="pt-2">
                  <span className="font-jakarta font-bold text-base text-[#101828] tracking-wide">
                    {current.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* "Apa saja yang di pelajari?" Section */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <div className="text-center mb-10">
              <h3 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828]">
                Apa saja yang <span className="text-[#bc0c11]">di pelajari?</span>
              </h3>
            </div>

            {/* Subjects Grid with Dashed Border Cards & Lucide Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {current.subjects.map((sub, idx) => {
                const IconComponent = sub.icon;
                return (
                  <div
                    key={`${activeJurusan}-${idx}-${sub.name}`}
                    className="relative min-h-[74px] rounded-[16px] bg-white p-4 flex items-center gap-3.5 border-2 border-dashed border-[#d1d5dc] transition-colors duration-200 hover:border-[#bc0c11]"
                  >
                    {/* Red Icon Badge */}
                    <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#bc0c11] text-white shrink-0">
                      <IconComponent className="size-5 text-white stroke-[2.2]" />
                    </div>

                    {/* Subject Name */}
                    <p className="font-jakarta font-semibold text-xs sm:text-[13px] text-[#101828] leading-[1.3]">
                      {sub.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
