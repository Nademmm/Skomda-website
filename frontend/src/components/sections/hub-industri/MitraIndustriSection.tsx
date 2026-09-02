"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface MitraPartner {
  name: string;
  logo: string;
  focus: string;
  description: string;
  url: string;
}

const mitraList: MitraPartner[] = [
  // ─── Row 1 ───
  {
    name: "Politeknik Elektronika Negeri Surabaya (PENS)",
    logo: "/figma/pens.webp",
    focus: "Pendidikan Vokasi & Rekayasa Teknologi",
    description:
      "Kerjasama strategis program lanjutan studi terapan, sinkronisasi kurikulum rekayasa informatika, dan riset terapan bersama.",
    url: "https://www.pens.ac.id",
  },
  {
    name: "Axelbit (Accelerate You BIT-by-BIT)",
    logo: "/figma/partner-axelbit.png",
    focus: "Networking & Sertifikasi MikroTik",
    description:
      "Program pelatihan dan sertifikasi profesional MikroTik, Ubiquiti, serta transfer teknologi jaringan nirkabel enterprise.",
    url: "https://axelbit.com",
  },
  {
    name: "PT. RADNET DIGITAL INDONESIA (Radnext)",
    logo: "/figma/partner-radnet.png",
    focus: "Internet Service & Data Center",
    description:
      "Kemitraan penyelenggaraan kelas industri ISP, pembekalan manajemen bandwidth & server, serta sertifikasi komunikasi data.",
    url: "https://rad.net.id",
  },
  {
    name: "Wowrack Indonesia",
    logo: "/figma/wowrack.png",
    focus: "Cloud Computing & Data Center",
    description:
      "Pendampingan pembelajaran teknologi cloud computing, virtualisasi server, dan pengelolaan infrastruktur data center modern.",
    url: "https://www.wowrack.co.id",
  },
  {
    name: "Markaz Design",
    logo: "/figma/partner-markazdesign.png",
    focus: "UI/UX Design & Kreativitas Digital",
    description:
      "Peningkatan kompetensi perancangan antarmuka pengguna (UI/UX), riset produk digital, dan branding kreatif inovasi siswa.",
    url: "https://markazdesign.com",
  },
  {
    name: "DigiPrener",
    logo: "/figma/partner-digiprener.png",
    focus: "Sistem Informasi & Solusi Digital",
    description:
      "Fasilitasi mentoring teknis pengembangan sistem informasi, rancang bangun database enterprise, dan adaptasi alur kerja software industri.",
    url: "https://digiprener.com",
  },

  // ─── Row 2 ───
  {
    name: "PT. Garuda Telekomunikasi Indonesia",
    logo: "/figma/partner-garuda.png",
    focus: "Telekomunikasi & Fiber Optic",
    description:
      "Kolaborasi strategis dalam pengembangan kompetensi jaringan fiber optik, transmisi broadband, dan penempatan program PKL siswa TJAT.",
    url: "https://garudatelekomunikasi.co.id",
  },
  {
    name: "Slash (/. SLASH)",
    logo: "/figma/partner-slash-v2.png",
    focus: "Digital Product Agency & Software Engineering",
    description:
      "Inkubasi proyek web application, mentoring agile development, dan implementasi teknologi front-end/back-end modern industri.",
    url: "https://slash.id",
  },
  {
    name: "PT. TelkoMedika Indonesia (TBA)",
    logo: "/figma/TelkoMedika-v2.png",
    focus: "Healthcare IT & Telemedicine Services",
    description:
      "Integrasi sistem informasi manajemen layanan kesehatan digital, pengelolaan database medis secure, dan implementasi IoT kesehatan.",
    url: "https://telkomedika.co.id",
  },
  {
    name: "Jagoan Hosting",
    logo: "/figma/partner-jagoanhosting.png",
    focus: "Web Cloud & DevOps Architecture",
    description:
      "Pembekalan keterampilan deployment web, manajemen server cloud, dan konsep modern DevOps melalui kelas tamu praktisi serta magang intensif.",
    url: "https://www.jagoanhosting.com",
  },
  {
    name: "Sans Souci Creative Studio",
    logo: "/figma/partner-sanssouci-v2.png",
    focus: "Creative Media Production & Multimedia",
    description:
      "Pelatihan produksi multimedia digital, motion graphics, video komersial kreatif, dan perancangan strategi visual marketing modern.",
    url: "https://instagram.com/sanssouci.creative",
  },
  {
    name: "PT Digdaya Olah Teknologi (DOT Indonesia)",
    logo: "/figma/DOT.svg",
    focus: "Custom Software & Mobile App Solutions",
    description:
      "Kolaborasi rekayasa perangkat lunak skala enterprise, pembangunan aplikasi mobile multiplatform, dan program magang intensif siswa SIJA.",
    url: "https://dot.co.id",
  },

  // ─── Row 3 ───
  {
    name: "LSP P1 / Jejaring Vokasi Sidoarjo",
    logo: "/figma/bnsp.png",
    focus: "Sertifikasi Profesi & Standarisasi Vokasi",
    description:
      "Kemitraan pengujian kompetensi keahlian terstandar BNSP, sinkronisasi skema sertifikasi industri, dan uji kelayakan sertifikasi profesi.",
    url: "https://bnsp.go.id",
  },
  {
    name: "PT. Saha Global Perkasa (SGP)",
    logo: "/figma/partner-sgp-v2.png",
    focus: "Engineering & IT Infrastructure",
    description:
      "Dukungan pengadaan perangkat pendukung laboratorium kejuruan, instalasi jaringan pabrik, dan pengenalan rantai pasok industri modern.",
    url: "https://sahaglobalperkasa.com",
  },
  {
    name: "Jobnation IT Outsource",
    logo: "/figma/jobnation.png",
    focus: "IT Talent Sourcing & Outsource",
    description:
      "Penyaluran lulusan ke dunia kerja teknologi (BMW - Bekerja), pembekalan rekrutmen profesional, serta talent mapping lulusan terbaik.",
    url: "https://jobnation.id",
  },
  {
    name: "PT. Indev Solusi Digital (indev)",
    logo: "/figma/indev.png",
    focus: "Web System & Enterprise Solutions",
    description:
      "Pengembangan sistem informasi Enterprise Resource Planning (ERP), integrasi gateway pembayaran, dan arsitektur database skala besar.",
    url: "https://indev.co.id",
  },
  {
    name: "PT. Global Infra Teknologi (GIT)",
    logo: "/figma/partner-globalinfra.png",
    focus: "Infrastruktur IT & Enterprise Network",
    description:
      "Penyediaan akses ke proyek nyata pembangunan infrastruktur jaringan berskala enterprise, mentoring teknisi muda, dan sertifikasi keahlian.",
    url: "https://globalinfrateknologi.com",
  },
  {
    name: "Weza Group",
    logo: "/figma/weza-group.png",
    focus: "Software House & B2B Solutions",
    description:
      "Kerjasama pengembangan aplikasi digital dan sistem B2B berbasis proyek nyata (Teaching Factory), serta inkubasi talenta software engineer siswa SIJA.",
    url: "https://weza.co.id",
  },
  {
    name: "PT. Infratra Telekomunikasi (INFRATRA)",
    logo: "/figma/partner-infratra-v2.png",
    focus: "Infrastruktur Jaringan & Pemeliharaan Fiber",
    description:
      "Pemeliharaan jaringan kabel fiber optik udara dan tanah, pengukuran redaman sinyal optik, serta pengawasan keselamatan kerja K3 telekomunikasi.",
    url: "https://infratra.co.id",
  },

  // ─── Row 4 ───
  {
    name: "PT. Woodone Integra Tbk",
    logo: "/figma/woodneintegra.png",
    focus: "Smart Manufacturing & Automated Production",
    description:
      "Penerapan digitalisasi pabrik manufaktur ekspor, otomatisasi sistem industri, dan program pemagangan operasional sistem cerdas.",
    url: "https://woodoneintegra.com",
  },
  {
    name: "PT. Trijaya Grafika Solutindo (TGS)",
    logo: "/figma/trijaya.png",
    focus: "Digital Printing & Creative Packaging",
    description:
      "Penerapan teknologi grafika digital presisi tinggi, reproduksi warna komersial, dan perancangan desain packaging produk kreatif inovasi siswa.",
    url: "https://trijayagrafika.co.id",
  },
  {
    name: "Lasambara Karya Cipta",
    logo: "/figma/lasambora.png",
    focus: "Creative Craft & Digital Merchandising",
    description:
      "Pengembangan kewirausahaan produk kreatif (Teaching Factory), branding merchandise sekolah, dan inkubasi bisnis rintisan siswa.",
    url: "https://lasambara.com",
  },
  {
    name: "Purnama Hotel Batu",
    logo: "/figma/partner-purnamahotel-v2.png",
    focus: "Hospitality IT & Smart Hotel Systems",
    description:
      "Pengelolaan infrastruktur jaringan Wi-Fi perhotelan skala luas, implementasi sistem reservasi digital, dan integrasi IoT fasilitas kamar.",
    url: "https://hotelpurnama.com",
  },
  {
    name: "RS Islam Surabaya Jemursari (KODI)",
    logo: "/figma/rsi.jpg",
    focus: "SIMRS & Healthcare Technology",
    description:
      "Pengelolaan server infrastruktur rumah sakit, keamanan data rekam medis digital (cyber security), dan pemeliharaan intranet kesehatan.",
    url: "https://rsisurabaya.com",
  },
  {
    name: "PT. Efortech (Technology for Solver)",
    logo: "/figma/partner-efortech-v2.png",
    focus: "Industrial IoT & Embedded Systems",
    description:
      "Riset terapan Internet of Things (IoT), integrasi mikrokontroler sensor industri, dan sistem kendali otomatisasi telemetri cerdas.",
    url: "https://efortech.com",
  },

  // ─── Row 5 ───
  {
    name: "Alfath Corp",
    logo: "/figma/partner-alfath-v2.png",
    focus: "Corporate Business & Digital Services",
    description:
      "Penyelenggaraan event teknologi korporasi, manajemen kemitraan strategis, dan pembekalan kewirausahaan digital modern bagi siswa.",
    url: "https://alfathcorp.com",
  },
  {
    name: "UBIG.CO.ID",
    logo: "/figma/ubig.png",
    focus: "Software Development & SaaS Platform",
    description:
      "Inkubasi produk Software as a Service (SaaS), arsitektur cloud microservices, dan pembinaan startup digital siswa berprestasi.",
    url: "https://ubig.co.id",
  },
  {
    name: "PT Javacreatiox Network Intermedia",
    logo: "/figma/partner-javacreatiox.png",
    focus: "Software Development & Teaching Factory",
    description:
      "Kolaborasi pengembangan produk perangkat lunak komersial, mentoring code review standar industri, dan penyaluran kerja lulusan berprestasi.",
    url: "https://javacreatiox.com",
  },
  {
    name: "Moksha Indonesia (Event Producer)",
    logo: "/figma/moksha.png",
    focus: "Creative Production & Event Technology",
    description:
      "Pengoperasian teknologi audio-visual digital skala konser/event nasional, live streaming broadcast multi-kamera, dan stage lighting digital.",
    url: "https://mokshaindonesia.com",
  },
  {
    name: "HAI (Himpunan Ahli Informatika)",
    logo: "/figma/partner-hai-v2.png",
    focus: "Asosiasi Profesi & Standardisasi IT",
    description:
      "Standardisasi kurikulum kompetensi lulusan IT nasional, seminar keilmuan teknologi terkini, dan pengakuan sertifikasi keahlian profesional.",
    url: "https://hai.or.id",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MitraIndustriSection() {
  return (
    <section
      id="mitra-industri"
      className="relative w-full py-20 lg:py-28 bg-white border-t border-gray-200/60 overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-2 mb-14"
        >
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828]">
            Mitra Industri <span className="text-[#bc0c11]">Kami</span>
          </h2>
          <p className="font-jakarta text-base text-[#4a5565] max-w-[540px] leading-relaxed">
            Perusahaan-perusahaan terkemuka di bidang teknologi, telekomunikasi,
            cloud, dan solusi digital yang menjadi mitra strategis SMK Telkom Sidoarjo.
          </p>
        </motion.div>

        {/* 30 Partner Cards Grid (100% with Active HD Logos) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mitraList.map((mitra) => (
            <motion.div key={mitra.name} variants={cardVariants}>
              <Link
                href={mitra.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-full rounded-[24px] bg-white p-6 sm:p-7 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Bar: Logo + External Link Button */}
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="relative h-14 w-44 sm:w-48 flex items-center">
                      <Image
                        src={mitra.logo}
                        alt={`Logo ${mitra.name}`}
                        fill
                        className="object-contain object-left"
                        sizes="192px"
                      />
                    </div>
                    {/* Visit Link Action Button */}
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280] transition-all duration-300 group-hover:bg-[#bc0c11] group-hover:text-white shrink-0 shadow-xs">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="flex flex-col gap-1 pt-1">
                    {/* Subtitle / Focus */}
                    <span className="text-xs font-semibold text-[#bc0c11] tracking-wide font-jakarta">
                      {mitra.focus}
                    </span>

                    {/* Company Name */}
                    <h3 className="font-jakarta font-bold text-lg text-[#101828] leading-snug group-hover:text-[#bc0c11] transition-colors mt-0.5">
                      {mitra.name}
                    </h3>

                    {/* Description */}
                    <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed mt-2">
                      {mitra.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
