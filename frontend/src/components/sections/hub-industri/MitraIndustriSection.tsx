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
  {
    name: "PT. Garuda Telekomunikasi Indonesia",
    logo: "/figma/partner-garuda.png",
    focus: "Telekomunikasi & Fiber Optic",
    description:
      "Kolaborasi strategis dalam pengembangan kompetensi jaringan fiber optik, transmisi sinyal broadband, serta penempatan program Praktik Kerja Lapangan (PKL) bagi siswa jurusan TJAT.",
    url: "https://garudatelekomunikasi.co.id",
  },
  {
    name: "PT. Global Infra Teknologi",
    logo: "/figma/partner-globalinfra.png",
    focus: "Infrastruktur IT & Enterprise Network",
    description:
      "Penyediaan akses ke proyek nyata pembangunan infrastruktur jaringan berskala enterprise, mentoring teknisi muda, dan sertifikasi keahlian instalasi IT.",
    url: "https://globalinfrateknologi.com",
  },
  {
    name: "PT. RADNET DIGITAL INDONESIA",
    logo: "/figma/partner-radnet.png",
    focus: "Internet Service & Data Center",
    description:
      "Kemitraan penyelenggaraan kelas industri ISP, pembekalan manajemen bandwidth & server, serta sertifikasi kompetensi komunikasi data bagi siswa.",
    url: "https://rad.net.id",
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
    name: "Wowrack Indonesia",
    logo: "/figma/wowrack.png",
    focus: "Cloud Computing & Data Center",
    description:
      "Pendampingan pembelajaran teknologi cloud computing, virtualisasi server, dan pengelolaan infrastruktur data center modern berstandar internasional.",
    url: "https://www.wowrack.co.id",
  },
  {
    name: "Axelbit",
    logo: "/figma/partner-axelbit.png",
    focus: "Networking & Sertifikasi MikroTik",
    description:
      "Program pelatihan dan sertifikasi profesional MikroTik, Ubiquiti, serta transfer teknologi jaringan nirkabel terkini untuk mencetak network engineer andal.",
    url: "https://axelbit.com",
  },
  {
    name: "DigiPrener",
    logo: "/figma/partner-digiprener.png",
    focus: "Sistem Informasi & Solusi Digital",
    description:
      "Fasilitasi mentoring teknis pengembangan sistem informasi, rancang bangun database enterprise, dan adaptasi alur kerja industri software modern.",
    url: "https://digiprener.com",
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
    name: "Markaz Design",
    logo: "/figma/partner-markazdesign.png",
    focus: "UI/UX Design & Kreativitas Digital",
    description:
      "Peningkatan kompetensi perancangan antarmuka pengguna (UI/UX), riset produk digital, dan branding kreatif bagi pengembangan inovasi teknologi siswa.",
    url: "https://markazdesign.com",
  },
  {
    name: "PT Javacreatiox Network Intermedia",
    logo: "/figma/partner-javacreatiox.png",
    focus: "Software Development & Teaching Factory",
    description:
      "Kolaborasi pengembangan produk perangkat lunak komersial, mentoring code review standar industri, dan penyaluran kerja lulusan berprestasi.",
    url: "https://javacreatiox.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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
      className="relative w-full py-20 lg:py-28 bg-white border-t border-gray-200/60 overflow-hidden"
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
            Mitra Industri{" "}
            <span className="text-[#bc0c11]">Kami</span>
          </h2>
          <p className="font-jakarta text-base text-[#4a5565] max-w-[540px] leading-relaxed">
            Perusahaan-perusahaan terkemuka di bidang teknologi, telekomunikasi,
            cloud, dan solusi digital yang menjadi mitra strategis SMK Telkom Sidoarjo.
          </p>
        </motion.div>

        {/* Partner Grid */}
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
                    <div className="relative h-14 w-44 sm:w-48">
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

                  {/* Content Body - Perfectly Left-Aligned */}
                  <div className="flex flex-col gap-1 pt-1">
                    {/* Subtitle / Focus */}
                    <span className="text-xs font-semibold text-[#bc0c11] tracking-wide font-jakarta">
                      {mitra.focus}
                    </span>

                    {/* Company Name */}
                    <h3 className="font-jakarta font-bold text-lg text-[#101828] leading-snug group-hover:text-[#bc0c11] transition-colors mt-0.5">
                      {mitra.name}
                    </h3>

                    {/* Full Description - Tailored Link & Match Tone */}
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
