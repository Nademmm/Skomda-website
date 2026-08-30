"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function VisiMisiSection() {
  const misiList = [
    "Mengembangkan sistem pembinaan peserta didik untuk membentuk lulusan yang berkarakter tangguh, berakhlak, dan berwawasan digital.",
    "Menyelenggarakan pendidikan dengan kurikulum Link and Match di bidang Teknologi Informasi.",
    "Mewujudkan lulusan yang memiliki pengetahuan dan keterampilan siap untuk Bekerja, Melanjutkan, atau Wirausaha (BMW).",
  ];

  return (
    <section id="visi-misi" className="relative w-full py-16 lg:py-24 bg-[#f3f4f6] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visi & Misi Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Section Heading */}
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-[#101828] mb-10 tracking-tight">
              Visi &amp; Misi Sekolah
            </h2>

            {/* Visi Block */}
            <div className="flex items-start gap-4 sm:gap-5 mb-10 group">
              {/* Icon Container */}
              <div className="shrink-0 size-12 sm:size-14 rounded-full bg-[#e7000b] flex items-center justify-center shadow-md shadow-[#e7000b]/20 group-hover:scale-105 transition-transform duration-300">
                <div className="relative size-6 sm:size-7">
                  <Image
                    src="/figma/icon-target-dart.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 pt-1">
                <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828] mb-2">
                  Visi Sekolah
                </h3>
                <p className="font-jakarta text-base sm:text-[17px] text-[#364153] leading-relaxed">
                  Mewujudkan Lulusan Tangguh, Berakhlak, dan Berwawasan Digital.
                </p>
              </div>
            </div>

            {/* Misi Block */}
            <div className="flex items-start gap-4 sm:gap-5 group">
              {/* Icon Container */}
              <div className="shrink-0 size-12 sm:size-14 rounded-full bg-[#e7000b] flex items-center justify-center shadow-md shadow-[#e7000b]/20 group-hover:scale-105 transition-transform duration-300">
                <div className="relative size-6 sm:size-7">
                  <Image
                    src="/figma/icon-misi.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 pt-1">
                <h3 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828] mb-4">
                  Misi Sekolah
                </h3>

                {/* Numbered List */}
                <div className="space-y-4">
                  {misiList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="font-jakarta font-bold text-base text-[#e7000b] shrink-0 pt-0.5">
                        {index + 1}.
                      </span>
                      <p className="font-jakarta text-base text-[#364153] leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Composition + Quote (Matching exact Figma coordinates & layering) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            {/* Visual Art Container with exact proportional geometry */}
            <div className="relative w-full max-w-[380px] sm:max-w-[400px] aspect-[400/430] select-none">
              
              {/* Large Red Circle (Ellipse 22): left 1.25%, top 17.9%, w 77.75%, h 72.3% */}
              <div className="absolute left-[1.25%] top-[17.9%] w-[77.75%] h-[72.3%] pointer-events-none z-0">
                <Image
                  src="/figma/visimisi-circle-large.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Small Red Circle (Ellipse 23): left 47.75%, top 26.28%, w 52%, h 48.37% */}
              <div className="absolute left-[47.75%] top-[26.28%] w-[52%] h-[48.37%] pointer-events-none z-0">
                <Image
                  src="/figma/visimisi-circle-small.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Dark Grey Circle (Ellipse 24): left 0%, top 72.09%, w 27%, h 25.12% */}
              <div className="absolute left-0 top-[72.09%] w-[27%] h-[25.12%] pointer-events-none z-0">
                <Image
                  src="/figma/visimisi-ellipse-decor.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Student Photo (image 11): left 10%, top 2.33%, w 69%, h 96.28% */}
              <div className="absolute left-[10%] top-[2.33%] w-[69%] h-[96.28%] z-10">
                <Image
                  src="/figma/visimisi-student.png"
                  alt="Siswi SMK Telkom Sidoarjo dengan tablet"
                  fill
                  className="object-contain object-bottom drop-shadow-md"
                  priority
                />
              </div>
            </div>

            {/* Quote Caption */}
            <div className="mt-4 max-w-[380px] text-center lg:text-left px-2">
              <p className="font-jakarta italic text-sm sm:text-[15px] text-[#4a5565] leading-relaxed">
                Visi dan misi ini menjadi arah langkah SMK Telkom Sidoarjo dalam mencetak generasi unggul di era digital.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
