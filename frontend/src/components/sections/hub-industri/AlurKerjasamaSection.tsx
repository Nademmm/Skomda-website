"use client";

import { motion } from "framer-motion";

interface AlurStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

const alurSteps: AlurStep[] = [
  {
    step: "01",
    phase: "Tahap Eksplorasi",
    title: "Identifikasi Kebutuhan",
    description:
      "Diskusi awal antara sekolah dan mitra industri untuk memetakan kebutuhan kompetensi, gap keterampilan, dan ruang lingkup sinergi.",
  },
  {
    step: "02",
    phase: "Legalitas & Komitmen",
    title: "Penyusunan MoU",
    description:
      "Perumusan Memorandum of Understanding (MoU) dan Perjanjian Kerjasama (PKS) yang memuat hak, kewajiban, dan target kolaborasi kedua belah pihak.",
  },
  {
    step: "03",
    phase: "Eksekusi Kolaborasi",
    title: "Implementasi Program",
    description:
      "Pelaksanaan program nyata: penyelarasan kurikulum, magang/PKL siswa, kelas industri bersama praktisi, dan sertifikasi keahlian.",
  },
  {
    step: "04",
    phase: "Monitoring Mutu",
    title: "Evaluasi & Ekspansi",
    description:
      "Review berkala terhadap serapan kompetensi, umpan balik dari industri mitra, serta perluasan lingkup kemitraan secara berkelanjutan.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AlurKerjasamaSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-white border-t border-gray-200/60 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 mb-16"
        >
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828]">
            Alur <span className="text-[#bc0c11]">Kerjasama</span>
          </h2>
          <p className="font-jakarta text-base text-[#4a5565] max-w-[560px] leading-relaxed">
            Tahapan kemitraan yang terstruktur, transparan, dan terukur dari
            awal inisiasi hingga evaluasi kesinambungan program.
          </p>
        </motion.div>

        {/* 4-Step Process Flow Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {alurSteps.map((item) => (
            <motion.div
              key={item.step}
              variants={cardVariants}
              className="relative group rounded-[24px] bg-[#f9fafb] p-6 sm:p-7 flex flex-col gap-3 border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
            >
              {/* Step Number Header */}
              <div className="mb-2">
                <span className="font-jakarta font-extrabold text-3xl text-[#bc0c11] select-none">
                  {item.step}
                </span>
              </div>

              {/* Phase Tag */}
              <span className="inline-block text-[11px] font-semibold tracking-wider text-[#6b7280] uppercase font-jakarta">
                {item.phase}
              </span>

              {/* Title */}
              <h3 className="font-jakarta font-bold text-lg sm:text-[19px] text-[#101828] leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-jakarta text-sm text-[#4a5565] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
