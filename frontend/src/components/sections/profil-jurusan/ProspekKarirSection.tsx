"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Check } from "lucide-react";

interface CareerPath {
  role: string;
  focus: string;
}

interface MajorCareer {
  major: string;
  code: "SIJA" | "TJAT";
  badgeColor: string;
  scope: string;
  summary: string;
  careers: CareerPath[];
  popularCompanies: string[];
}

const careerData: MajorCareer[] = [
  {
    major: "Sistem Informasi Jaringan dan Aplikasi",
    code: "SIJA",
    badgeColor: "bg-[#bc0c11]/10 text-[#bc0c11]",
    scope: "(Software, Cloud & Cyber)",
    summary:
      "Lulusan SIJA siap berkarir di industri software development, cloud infrastructure, sistem enterprise, dan keamanan siber.",
    careers: [
      {
        role: "Full-Stack & Mobile Developer",
        focus: "Merancang dan membangun aplikasi web dan mobile modern untuk kebutuhan bisnis.",
      },
      {
        role: "Cloud & DevOps Engineer",
        focus: "Mengelola arsitektur server awan (AWS/GCP), containerization, dan otomasi deployment CI/CD.",
      },
      {
        role: "Database & System Administrator",
        focus: "Merancang skema database, optimalisasi query, dan pemeliharaan server data perusahaan.",
      },
      {
        role: "Cybersecurity Analyst",
        focus: "Melakukan audit keamanan jaringan, proteksi celah sistem, dan penanganan insiden digital.",
      },
    ],
    popularCompanies: [
      "Software House",
      "Startup Unicorn / Tech Company",
      "Perbankan & Fintech",
      "Instansi Pemerintahan / BUMN",
    ],
  },
  {
    major: "Teknik Jaringan Akses Telekomunikasi",
    code: "TJAT",
    badgeColor: "bg-[#101828]/8 text-[#101828]",
    scope: "(Fiber Optic & Telecom)",
    summary:
      "Lulusan TJAT memiliki kompetensi khusus yang sangat dicari oleh operator telekomunikasi, Internet Service Provider (ISP), dan kontraktor jaringan.",
    careers: [
      {
        role: "Fiber Optic Project Engineer",
        focus: "Perencanaan rute kabel serat optik (FTTH/FTTx), penyambungan fusion splicing, dan uji OTDR.",
      },
      {
        role: "Network Operations Center (NOC) Engineer",
        focus: "Monitoring traffic jaringan 24/7, troubleshooting link terputus, dan menjaga SLA konektivitas.",
      },
      {
        role: "Wireless & Cellular Transmission Specialist",
        focus: "Instalasi dan pemeliharaan perangkat Base Transceiver Station (BTS) dan radio link telekomunikasi.",
      },
      {
        role: "ISP Infrastructure Technician",
        focus: "Konfigurasi perangkat routing & switching backbone, distribusi bandwidth, dan instalasi pelanggan korporasi.",
      },
    ],
    popularCompanies: [
      "Telkom Group & Telkomsel",
      "Internet Service Provider (ISP)",
      "Tower & BTS Infrastructure",
      "Kontraktor Jaringan Fiber",
    ],
  },
];

const bmwData = [
  {
    letter: "B",
    title: "Bekerja",
    subtitle: "Industri & Korporasi IT",
    desc: "Siap langsung terserap di industri teknologi, telekomunikasi, startup unicorn, maupun instansi BUMN berbekal sertifikasi resmi dan portofolio proyek riil.",
    icon: <Briefcase className="size-5" />,
  },
  {
    letter: "M",
    title: "Melanjutkan",
    subtitle: "Perguruan Tinggi Ternama",
    desc: "Kesiapan akademik unggul dan peluang beasiswa prestasi untuk melanjutkan studi sarjana ke PTN dan PTS favorit (ITB, ITS, Telkom University, dll.).",
    icon: <GraduationCap className="size-5" />,
  },
  {
    letter: "W",
    title: "Wirausaha",
    subtitle: "Technopreneur & Digital Startup",
    desc: "Mendirikan bisnis teknologi mandiri, software house, agensi digital, jasa instalasi jaringan fiber optik, atau startup inovatif.",
    icon: <Rocket className="size-5" />,
  },
];

export default function ProspekKarirSection() {
  return (
    <section
      id="prospek-karir"
      className="relative w-full py-20 lg:py-28 bg-white border-t border-gray-200/60 overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="h-[3px] w-12 rounded-full bg-[#bc0c11] mb-5" />
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828]">
            Peluang Karir &{" "}
            <span className="text-[#bc0c11]">Prospek Kerja Lulusan</span>
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mt-3">
            Lulusan SMK Telkom Sidoarjo dipersiapkan menjadi talenta unggul yang
            memiliki arah masa depan terarah dengan serapan industri yang tinggi.
          </p>
        </motion.div>

        {/* 2 Majors Career Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {careerData.map((item) => (
            <div
              key={item.code}
              className="group relative rounded-[28px] bg-white p-7 sm:p-9 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex flex-col gap-2 pb-6 border-b border-gray-100">
                  <h3 className="font-jakarta font-bold text-2xl text-[#101828] leading-snug mt-1">
                    Prospek Karir <span className="text-[#bc0c11]">{item.code}</span> {item.scope}
                  </h3>
                  <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Career Roles Checklist */}
                <div className="flex flex-col gap-4 py-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#101828] font-jakarta">
                    Profesi & Bidang Pekerjaan:
                  </span>
                  <div className="flex flex-col gap-3.5">
                    {item.careers.map((career) => (
                      <div
                        key={career.role}
                        className="flex items-start gap-3 text-sm font-jakarta"
                      >
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#bc0c11]/10 text-[#bc0c11] mt-0.5">
                          <Check className="size-3.5 stroke-[2.5]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#101828] text-sm">
                            {career.role}
                          </span>
                          <span className="text-xs text-[#6b7280] leading-relaxed mt-0.5">
                            {career.focus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Industry Tags */}
              <div className="pt-6 border-t border-gray-100 flex flex-col gap-2">
                <span className="font-jakarta text-xs font-semibold text-[#6b7280]">
                  Ekosistem Industri Penempatan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.popularCompanies.map((comp) => (
                    <span
                      key={comp}
                      className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-[#374151] font-jakarta"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BMW (Bekerja, Melanjutkan, Wirausaha) Redesigned Section */}
        <div className="rounded-[28px] bg-[#f9fafb] p-8 sm:p-12 border-2 border-dashed border-[#d1d5dc]">
          {/* Top Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828]">
              Orientasi Masa Depan: <span className="text-[#bc0c11]">Konsep BMW</span>
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] mt-2 leading-relaxed">
              Setiap siswa dibimbing dan dipersiapkan secara komprehensif agar siap menempuh salah satu dari tiga pilar masa depan sesuai minat dan potensinya.
            </p>
          </div>

          {/* 3 Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bmwData.map((bmw) => (
              <div
                key={bmw.letter}
                className="group relative rounded-[24px] bg-white p-7 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
              >
                <div>
                  {/* Top Letter & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-jakarta font-extrabold text-4xl text-[#bc0c11]">
                      {bmw.letter}
                    </span>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#bc0c11]/10 text-[#bc0c11] group-hover:bg-[#bc0c11] group-hover:text-white transition-all duration-300 shadow-xs">
                      {bmw.icon}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="font-jakarta font-bold text-xl text-[#101828] group-hover:text-[#bc0c11] transition-colors mb-1">
                    {bmw.title}
                  </h4>
                  <span className="text-xs font-semibold text-[#bc0c11] font-jakarta block mb-3">
                    {bmw.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                    {bmw.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
