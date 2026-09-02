"use client";

import { motion } from "framer-motion";

interface EnvironmentFeature {
  title: string;
  description: string;
  points: string[];
  icon: string;
}

const features: EnvironmentFeature[] = [
  {
    title: "Aksesibilitas & Transportasi",
    icon: "🚆",
    description:
      "Lokasi strategis di pusat kota Sidoarjo dengan akses transportasi publik yang mudah dan terjangkau.",
    points: [
      "10 Menit dari Stasiun Kereta Api Sidoarjo",
      "Jalur transportasi umum & angkutan kota",
      "Akses ojek online (Gojek / Grab) 24 jam",
      "Dekat akses Tol Sidoarjo Kota",
    ],
  },
  {
    title: "Kebutuhan Harian & Kuliner",
    icon: "🍱",
    description:
      "Tersedia beragam pilihan makanan sehat, higienis, dan terjangkau di sekitar lingkungan sekolah.",
    points: [
      "Kantin sehat berstandar higienis di dalam sekolah",
      "Pusat kuliner kaki lima & warung makan terjangkau",
      "Minimarket (Indomaret, Alfamart) radius 200 meter",
      "Apotek & toko kelontong kebutuhan harian",
    ],
  },
  {
    title: "Keamanan & Fasilitas Medis",
    icon: "🏥",
    description:
      "Lingkungan pemukiman yang ramah, aman, dan dekat dengan fasilitas kesehatan resmi.",
    points: [
      "Petugas keamanan sekolah & pos ronda warga 24 jam",
      "Dekat dengan RSUD Sidoarjo & RS Delta Surya",
      "Puskesmas Sekardangan radius 800 meter",
      "Klinik pratama & dokter 24 jam",
    ],
  },
  {
    title: "Suasana Belajar & Ibadah",
    icon: "📚",
    description:
      "Dikelilingi sarana penunjang kegiatan akademis dan keagamaan yang kondusif bagi pelajar.",
    points: [
      "Masjid Agung Sidoarjo & masjid jami sekitar kampus",
      "Perpustakaan Digital SMK Telkom Sidoarjo",
      "Workspace & kafe belajar ramah pelajar",
      "Toko fotokopi & percetakan tepat di depan gerbang",
    ],
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

export default function LingkunganKampusSection() {
  return (
    <section id="lingkungan-fasilitas" className="relative w-full py-20 lg:py-28 bg-white border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-2 mb-14 text-center items-center max-w-3xl mx-auto"
        >
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828]">
            Fasilitas Sekitar &amp;{" "}
            <span className="text-[#bc0c11]">Kemudahan Akses</span>
          </h2>
          <p className="font-jakarta text-base text-[#4a5565] leading-relaxed">
            Kawasan sekitar SMK Telkom Sidoarjo dirancang ramah bagi pelajar
            dengan kelengkapan fasilitas hidup harian dan akses mobilitas yang mudah.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feat) => (
            <motion.div
              key={feat.title}
              variants={cardVariants}
              className="group relative rounded-[24px] bg-[#fafafa] p-6 sm:p-7 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:bg-white hover:shadow-md"
            >
              <div className="flex flex-col gap-3">
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white border border-gray-200/80 text-2xl shadow-xs group-hover:scale-105 transition-transform">
                  {feat.icon}
                </div>

                {/* Title */}
                <h3 className="font-jakarta font-bold text-lg text-[#101828] group-hover:text-[#bc0c11] transition-colors leading-snug mt-1">
                  {feat.title}
                </h3>

                {/* Desc */}
                <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                  {feat.description}
                </p>

                {/* Points */}
                <ul className="flex flex-col gap-2 pt-3 border-t border-gray-200/60 mt-1">
                  {feat.points.map((p) => (
                    <li
                      key={p}
                      className="font-jakarta text-xs text-[#374151] flex items-start gap-2"
                    >
                      <span className="text-[#bc0c11] font-bold text-xs mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
