"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ClipboardList, UserCheck, FileCheck, GraduationCap } from "lucide-react";

const ALUR_STEPS = [
  {
    id: "pendaftaran",
    number: "01",
    icon: ClipboardList,
    titleId: "Pendaftaran",
    titleEn: "Registration",
    descId: "Daftar online melalui portal resmi, isi formulir dengan data diri yang lengkap dan benar, lalu selesaikan pembayaran biaya pendaftaran untuk lanjut ke tahap berikutnya.",
    descEn: "Register online through the official portal, fill in the form accurately, then complete the registration fee payment to proceed to the next stage.",
    detailId: "Pendaftaran Online Resmi",
    detailEn: "Official Online Registration",
  },
  {
    id: "seleksi",
    number: "02",
    icon: UserCheck,
    titleId: "Seleksi",
    titleEn: "Selection",
    descId: "Peserta mengikuti serangkaian tes seleksi: Tes Kemampuan Dasar, Psikotes, serta sesi wawancara siswa dan orang tua / wali.",
    descEn: "Participants take a series of selection tests: Basic Ability Test, Psychotest, and an interview session for students and parents / guardians.",
    detailId: "Tes Kemampuan & Wawancara",
    detailEn: "Aptitude Test & Interview",
  },
  {
    id: "daftar-ulang",
    number: "03",
    icon: FileCheck,
    titleId: "Daftar Ulang",
    titleEn: "Re-Registration",
    descId: "Jika dinyatakan lolos seleksi, lakukan daftar ulang dengan menyelesaikan pembayaran dan melengkapi seluruh berkas administrasi yang diperlukan.",
    descEn: "Upon passing the selection, complete the re-registration by settling payment and submitting all required administrative documents.",
    detailId: "Verifikasi Berkas Administrasi",
    detailEn: "Administrative Document Verification",
  },
  {
    id: "penerimaan",
    number: "04",
    icon: GraduationCap,
    titleId: "Penerimaan",
    titleEn: "Acceptance",
    descId: "Selamat! Kamu resmi menjadi bagian dari keluarga besar SMK Telkom Sidoarjo. Mulai perjalanan pendidikan kejuruan digital terbaikmu sekarang.",
    descEn: "Congratulations! You are officially part of the SMK Telkom Sidoarjo family. Begin your world-class digital vocational education journey now.",
    detailId: "Siswa SMK Telkom Sidoarjo",
    detailEn: "SMK Telkom Sidoarjo Student",
  },
];

export default function PpdbAlurSection() {
  const { isEn } = useLanguage();

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white border-t border-gray-200/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-[#101828] mb-3 tracking-tight">
            {isEn ? (
              <>Enrollment <span className="text-[#bc0c11]">Process</span></>
            ) : (
              <>Alur <span className="text-[#bc0c11]">Pendaftaran</span></>
            )}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-4" />
          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed">
            {isEn
              ? "Four clear steps to begin your journey at SMK Telkom Sidoarjo. Straightforward, transparent, and fully guided."
              : "Empat langkah jelas untuk memulai perjalananmu di SMK Telkom Sidoarjo. Proses yang transparan dan terbimbing penuh."}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {ALUR_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              >
                <div className="group h-full rounded-[24px] bg-white p-6 sm:p-7 flex flex-col justify-between border-2 border-dashed border-[#d1d5dc] transition-all duration-300 hover:border-[#bc0c11] hover:shadow-md">
                  <div>
                    {/* Icon + Number Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[#bc0c11]">
                        <Icon className="size-7 text-[#bc0c11]" />
                      </div>
                      <span className="font-jakarta font-extrabold text-2xl sm:text-3xl text-gray-300 group-hover:text-[#bc0c11]/40 transition-colors">
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-jakarta font-bold text-lg sm:text-xl text-[#101828] group-hover:text-[#bc0c11] transition-colors mb-2">
                      {isEn ? step.titleEn : step.titleId}
                    </h3>

                    {/* Description */}
                    <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] leading-relaxed">
                      {isEn ? step.descEn : step.descId}
                    </p>
                  </div>

                  {/* Footer Divider */}
                  <div className="mt-5 pt-4 border-t border-dashed border-gray-200 font-jakarta text-xs text-gray-400 font-medium flex items-center justify-between">
                    <span>{isEn ? step.detailEn : step.detailId}</span>
                    <span className="text-[#bc0c11] font-semibold group-hover:translate-x-0.5 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
