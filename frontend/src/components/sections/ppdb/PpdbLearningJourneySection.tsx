"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const YEARS = [
  {
    id: "year-10",
    grade: "10",
    yearLabel: "First Year",
    colorClass: "bg-[#bc0c11]",
    trackAll: true,
    itemsId: [
      "Mata Pelajaran Umum Kejuruan",
      "Digital Talent Program (Dasar & Pemahaman)",
      "Proyek Penguatan Profil Pelajar (P5)",
      "Pandawa Community Service",
    ],
    itemsEn: [
      "General & Vocational Subjects",
      "Digital Talent Program (Foundation)",
      "Student Profile Strengthening Project (P5)",
      "Pandawa Community Service",
    ],
  },
  {
    id: "year-11",
    grade: "11",
    yearLabel: "Second Year",
    colorClass: "bg-[#bc0c11]",
    trackAll: true,
    itemsId: [
      "Mata Pelajaran Umum & Kejuruan",
      "Digital Talent Program",
      "Proyek Penguatan Profil Pelajar (P5)",
      "Proyek Kolaborasi Antar Kelas & Industri",
      "Community Service",
    ],
    itemsEn: [
      "General & Vocational Subjects",
      "Digital Talent Program",
      "Student Profile Strengthening Project (P5)",
      "Inter-class & Industry Collaboration Project",
      "Community Service",
    ],
  },
  {
    id: "year-12",
    grade: "12",
    yearLabel: "Third Year",
    colorClass: "bg-[#bc0c11]",
    trackAll: false,
    track3: {
      labelId: "Program 3 Tahun",
      labelEn: "3-Year Program",
      itemsId: [
        "Praktik Kerja Lapangan (PKL)",
        "Penilaian Akhir Kelulusan",
        "Sertifikasi Kompetensi",
        "Program BMW",
      ],
      itemsEn: [
        "Vocational Field Practice (PKL)",
        "Final Graduation Assessment",
        "Competency Certification",
        "BMW Program",
      ],
    },
    track4: {
      labelId: "Program 4 Tahun",
      labelEn: "4-Year Program",
      itemsId: [
        "Mata Pelajaran Umum & Kejuruan",
        "Penilaian Akhir Kelulusan",
        "Program Inkubasi Startup",
        "Proyek Kolaborasi dengan Industri",
      ],
      itemsEn: [
        "General & Vocational Subjects",
        "Final Graduation Assessment",
        "Startup Incubation Program",
        "Industry Collaboration Project",
      ],
    },
  },
  {
    id: "year-13",
    grade: "13",
    yearLabel: "Fourth Year",
    colorClass: "bg-[#101828]",
    trackAll: false,
    track4Only: {
      labelId: "Khusus Program 4 Tahun",
      labelEn: "4-Year Program Only",
      itemsId: [
        "Praktik Kerja Lapangan (PKL)",
        "Sertifikasi Kompetensi",
        "Program BMW",
        "Proyek Industri Akhir",
      ],
      itemsEn: [
        "Vocational Field Practice (PKL)",
        "Competency Certification",
        "BMW Program",
        "Final Industry Project",
      ],
    },
  },
];

function BulletItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm font-jakarta text-[#364153] leading-relaxed">
      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#bc0c11]" aria-hidden="true" />
      {text}
    </li>
  );
}

function TrackBadge({ label, isEn: _isEn }: { label: string; isEn: boolean }) {
  return (
    <span className="inline-block font-jakarta text-[11px] font-semibold text-[#bc0c11] bg-red-50 border border-red-100 rounded-md px-2 py-0.5 mb-2">
      {label}
    </span>
  );
}

export default function PpdbLearningJourneySection() {
  const { isEn } = useLanguage();

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#f3f4f6]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 sm:mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-[#101828] mb-3 tracking-tight">
                {isEn ? (
                  <>Learning <span className="text-[#bc0c11]">Journey</span></>
                ) : (
                  <>Perjalanan <span className="text-[#bc0c11]">Belajarmu</span></>
                )}
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#bc0c11] mb-3" />
              <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed max-w-xl">
                {isEn
                  ? "A structured 3-to-4 year curriculum designed to develop world-ready digital talent at every stage."
                  : "Kurikulum terstruktur 3 hingga 4 tahun yang dirancang membentuk talenta digital siap kerja di setiap jenjangnya."}
              </p>
            </div>
            {/* SMK badge */}
            <div className="shrink-0 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
              <span className="font-jakarta text-xs text-[#4a5565]">SMK Telkom Sidoarjo</span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="font-jakarta text-xs font-bold text-[#bc0c11]">SIJA / TJKT / RPL</span>
            </div>
          </div>
        </motion.div>

        {/* Year Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {YEARS.map((year, idx) => (
            <motion.div
              key={year.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col"
            >
              <div className="h-full bg-white rounded-[20px] sm:rounded-[24px] border border-gray-200 shadow-sm overflow-hidden flex flex-col">

                {/* Card Header */}
                <div className={`${year.colorClass} px-5 py-4 flex items-center justify-between`}>
                  <div>
                    <span className="font-jakarta text-white/70 text-[10px] font-semibold tracking-widest uppercase block">
                      {year.yearLabel}
                    </span>
                    <span className="font-jakarta text-white font-bold text-2xl leading-none">
                      {isEn ? `Grade ${year.grade}` : `Kelas ${year.grade}`}
                    </span>
                  </div>
                  <span className="font-jakarta font-extrabold text-5xl text-white/10 leading-none">
                    {year.grade}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4">

                  {year.trackAll && "itemsId" in year && (
                    <ul className="flex flex-col gap-2.5">
                      {(isEn ? year.itemsEn : year.itemsId)?.map((item, i) => (
                        <BulletItem key={i} text={item} />
                      ))}
                    </ul>
                  )}

                  {!year.trackAll && "track3" in year && year.track3 && (
                    <>
                      {/* Two track split (Kelas 12) */}
                      <div className="flex flex-col gap-4">
                        {/* Track 3 */}
                        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                          <TrackBadge label={isEn ? year.track3.labelEn : year.track3.labelId} isEn={isEn} />
                          <ul className="flex flex-col gap-2">
                            {(isEn ? year.track3.itemsEn : year.track3.itemsId).map((item, i) => (
                              <BulletItem key={i} text={item} />
                            ))}
                          </ul>
                        </div>
                        {/* Track 4 */}
                        {"track4" in year && year.track4 && (
                          <div className="p-3.5 rounded-xl bg-red-50/40 border border-red-100/60">
                            <TrackBadge label={isEn ? year.track4.labelEn : year.track4.labelId} isEn={isEn} />
                            <ul className="flex flex-col gap-2">
                              {(isEn ? year.track4.itemsEn : year.track4.itemsId).map((item, i) => (
                                <BulletItem key={i} text={item} />
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {!year.trackAll && "track4Only" in year && year.track4Only && (
                    <div className="p-3.5 rounded-xl bg-red-50/40 border border-red-100/60">
                      <TrackBadge label={isEn ? year.track4Only.labelEn : year.track4Only.labelId} isEn={isEn} />
                      <ul className="flex flex-col gap-2">
                        {(isEn ? year.track4Only.itemsEn : year.track4Only.itemsId).map((item, i) => (
                          <BulletItem key={i} text={item} />
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
