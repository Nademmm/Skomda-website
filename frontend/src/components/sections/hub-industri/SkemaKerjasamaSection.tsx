"use client";

import { motion } from "framer-motion";

interface PilarCard {
  number: string;
  title: string;
  description: string;
}

const pilarData: PilarCard[] = [
  {
    number: "01",
    title: "Sinkronisasi Kurikulum",
    description:
      "Kurikulum disusun bersama industri melalui Focus Group Discussion (FGD), memastikan materi pembelajaran selalu selaras dengan kebutuhan dan standar dunia kerja terkini.",
  },
  {
    number: "02",
    title: "Praktik Kerja Lapangan (PKL)",
    description:
      "Siswa mendapat kesempatan magang langsung di perusahaan mitra, menerapkan keterampilan dalam lingkungan profesional sesungguhnya selama 3–6 bulan.",
  },
  {
    number: "03",
    title: "Guest Lecture & Workshop",
    description:
      "Praktisi industri diundang secara rutin untuk berbagi pengetahuan, pengalaman, dan tren teknologi terbaru melalui seminar, workshop, dan kelas tamu.",
  },
  {
    number: "04",
    title: "Rekrutmen & Penyaluran Kerja",
    description:
      "Lulusan difasilitasi untuk terserap langsung ke dunia kerja melalui program rekrutmen bersama mitra industri, job fair eksklusif, dan jaringan alumni BKK.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SkemaKerjasamaSection() {
  return (
    <section
      id="skema-kerjasama"
      className="relative w-full py-20 lg:py-28 bg-[#f3f4f6] overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828]">
            Empat Pilar{" "}
            <span className="text-[#bc0c11]">Kemitraan Industri</span>
          </h2>
          <p className="mt-4 font-jakarta text-base text-[#4a5565] max-w-[560px] leading-relaxed">
            Model Link & Match yang memastikan setiap aspek pendidikan vokasi
            terhubung langsung dengan kebutuhan dunia industri nyata.
          </p>
        </motion.div>

        {/* 4 Pilar Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {pilarData.map((pilar) => (
            <motion.div
              key={pilar.number}
              variants={cardVariants}
              className="group relative rounded-[25px] bg-white p-6 sm:p-8 flex flex-col gap-4 border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md"
            >
              {/* Top Row: Number */}
              <div className="flex items-center justify-between">
                <span className="font-jakarta font-extrabold text-4xl sm:text-5xl text-[#bc0c11] leading-none select-none">
                  {pilar.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-jakarta font-bold text-xl sm:text-[22px] text-[#101828] leading-tight">
                {pilar.title}
              </h3>

              {/* Description */}
              <p className="font-jakarta text-sm sm:text-[15px] text-[#4a5565] leading-relaxed">
                {pilar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
