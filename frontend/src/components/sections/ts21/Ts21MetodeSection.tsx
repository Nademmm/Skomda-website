"use client";

import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  FolderGit2,
  LayoutGrid,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

const methods = [
  {
    icon: <MonitorSmartphone className="size-6 transition-colors duration-300" />,
    title: "Blended & Hybrid Learning",
    tagline: "Fleksibel, Terstandardisasi, Berbasis ICT",
    desc: "Menggabungkan interaksi tatap muka interaktif di sekolah dengan pembelajaran digital mandiri melalui platform LMS terintegrasi.",
  },
  {
    icon: <FolderGit2 className="size-6 transition-colors duration-300" />,
    title: "Project-Based Learning (PjBL)",
    tagline: "Studi Kasus & Tantangan Riil",
    desc: "Siswa mengerjakan portofolio proyek industri secara berkelompok, mengasah pemecahan masalah, eksekusi teknis, dan manajemen waktu.",
  },
  {
    icon: <LayoutGrid className="size-6 transition-colors duration-300" />,
    title: "Studio Classroom Environment",
    tagline: "Suasana Kerja Profesional",
    desc: "Desain ruang belajar bergaya studio kerja modern yang menstimulasi ide kreatif, kolaborasi tim, dan diskusi aktif antar siswa.",
  },
  {
    icon: <BriefcaseBusiness className="size-6 transition-colors duration-300" />,
    title: "Teaching Factory & Magang PKL",
    tagline: "Terjun Langsung ke Industri",
    desc: "Pengalaman magang intensif di perusahaan mitra dan sentra inovasi sekolah, didampingi langsung oleh praktisi industri profesional.",
  },
];

export default function Ts21MetodeSection() {
  return (
    <section
      id="metode"
      className="relative w-full py-20 lg:py-28 bg-[#f9fafb] border-t border-gray-200/60 overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="h-[3px] w-12 rounded-full bg-[#bc0c11] mb-5" />
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight tracking-tight text-[#101828]">
            Metode Pembelajaran <span className="text-[#bc0c11]">KBM 21.40 Plis</span>
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mt-4">
            Proses kegiatan belajar mengajar yang terstandardisasi, berpusat pada siswa (*student-centered*),
            interaktif, inovatif, dan menyenangkan untuk mencetak generasi tangguh abad ke-21.
          </p>
        </motion.div>

        {/* 4 Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methods.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-[24px] bg-white p-7 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
            >
              <div>
                {/* Top Icon Badge */}
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#bc0c11]/10 text-[#bc0c11] group-hover:bg-[#bc0c11] group-hover:text-white transition-all duration-300 shadow-xs mb-5">
                  {item.icon}
                </div>

                {/* Subtitle / Tagline */}
                <span className="text-xs font-semibold text-[#bc0c11] font-jakarta block mb-1">
                  {item.tagline}
                </span>

                {/* Title */}
                <h3 className="font-jakarta font-bold text-lg text-[#101828] group-hover:text-[#bc0c11] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Komunitas Belajar & Ekosistem Sinergi Banner */}
        <div className="rounded-[28px] bg-white p-8 sm:p-10 border-2 border-dashed border-[#d1d5dc]">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#bc0c11] text-white shadow-xs">
              <Users className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#bc0c11] font-jakarta">
                Sinergi Kolaboratif
              </span>
              <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828] mt-1">
                Komunitas Belajar Terpadu
              </h3>
              <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] leading-relaxed mt-2 max-w-3xl">
                Kurikulum TS.21 bergerak aktif melalui sinergi berkelanjutan antara sekolah, Yayasan Pendidikan Telkom (BPK YPT),
                guru pembina, peserta didik, serta diperkuat oleh nara sumber dan praktisi profesional industri.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
