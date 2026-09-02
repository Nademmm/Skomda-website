"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users2,
  Award,
  Globe2,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface AdvantageItem {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const advantages: AdvantageItem[] = [
  {
    number: "01",
    title: "Kurikulum Sinkronisasi Industri",
    desc: "Materi pembelajaran diselaraskan langsung dengan standar kebutuhan Telkom Group, Wowrack, Weza Group, dan puluhan mitra IT ternama.",
    icon: <Users2 className="size-5" />,
  },
  {
    number: "02",
    title: "Sertifikasi Profesi Nasional (BNSP)",
    desc: "Setiap siswa mengikuti uji sertifikasi keahlian berstandar Badan Nasional Sertifikasi Profesi melalui Lembaga Sertifikasi Profesi (LSP-P1).",
    icon: <Award className="size-5" />,
  },
  {
    number: "03",
    title: "Sertifikasi Vendor Global",
    desc: "Kesempatan meraih sertifikasi bertaraf internasional seperti Cisco (CCNA), MikroTik (MTCNA), AWS Cloud Practitioner, dan Oracle Academy.",
    icon: <Globe2 className="size-5" />,
  },
  {
    number: "04",
    title: "Teaching Factory & Magang Industri",
    desc: "Pembelajaran berbasis proyek riil industri (Project-Based Learning) serta program Praktik Kerja Lapangan intensif di ekosistem digital Indonesia.",
    icon: <Briefcase className="size-5" />,
  },
];

const certifications = [
  { name: "BNSP LSP-P1", tag: "Standar Nasional Profesi" },
  { name: "MikroTik Academy (MTCNA)", tag: "Networking Certification" },
  { name: "Cisco Networking Academy", tag: "Enterprise Routing & Switching" },
  { name: "AWS Academy", tag: "Cloud Architecture & Computing" },
  { name: "Oracle Academy", tag: "Database & Java Programming" },
  { name: "Telkom Certified Engineer", tag: "Fiber Optic & Telecom Core" },
];

export default function KeunggulanSertifikasiSection() {
  return (
    <section
      id="keunggulan-sertifikasi"
      className="relative w-full py-20 lg:py-28 bg-[#f9fafb] border-t border-gray-200/60 overflow-hidden scroll-mt-24"
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
            Keunggulan Kurikulum &{" "}
            <span className="text-[#bc0c11]">Sertifikasi Industri</span>
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mt-3">
            Kurikulum Nasional Plus yang didukung lisensi kompetensi resmi memastikan
            lulusan memiliki keahlian teruji dan berdaya saing tinggi di pasar kerja global.
          </p>
        </motion.div>

        {/* 4 Cards Grid without badge pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((item) => (
            <div
              key={item.number}
              className="group relative rounded-[24px] bg-white p-7 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
            >
              <div>
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-jakarta font-extrabold text-2xl text-[#bc0c11]/40 group-hover:text-[#bc0c11] transition-colors">
                    {item.number}
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#bc0c11]/10 text-[#bc0c11] group-hover:bg-[#bc0c11] group-hover:text-white transition-all duration-300 shadow-xs">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-jakarta font-bold text-lg text-[#101828] group-hover:text-[#bc0c11] transition-colors leading-snug mb-2">
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

        {/* Certification Logos & Badges Banner */}
        <div className="rounded-[24px] bg-white p-7 sm:p-9 border-2 border-dashed border-[#d1d5dc]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#bc0c11] font-jakarta">
                Portfolio Kompetensi Siswa
              </span>
              <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828] mt-1">
                Program Sertifikasi yang Dapat Diikuti Siswa
              </h3>
            </div>
            <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] max-w-md">
              Diakui oleh asosiasi industri dan menjadi nilai tambah utama pada portofolio kelulusan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#f9fafb] border border-gray-200/70 hover:border-[#bc0c11] transition-colors"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#bc0c11] text-white shadow-xs">
                  <CheckCircle2 className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta font-bold text-xs sm:text-sm text-[#101828]">
                    {cert.name}
                  </span>
                  <span className="font-jakarta text-[11px] text-[#6b7280]">
                    {cert.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
