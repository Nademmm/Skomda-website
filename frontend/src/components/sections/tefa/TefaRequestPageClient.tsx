"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function TefaRequestPageClient() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Website & Sistem Digital");
  const [description, setDescription] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const waMessage = `Halo Tim Teaching Factory SMK Telkom Sidoarjo,\n\nSaya ingin konsultasi dan mengajukan request project TeFa:\n- Nama: ${name}\n- Instansi/Organisasi: ${organization || "-"}\n- Kontak/WA: ${phone}\n- Layanan: ${service}\n- Kebutuhan: ${description || "Ingin berdiskusi lebih lanjut"}\n\nMohon info dan jadwal konsultasinya. Terima kasih.`;

    const encoded = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/628113021919?text=${encoded}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSent(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f3f4f6] pt-32 sm:pt-36 lg:pt-40 pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm font-jakarta text-[#4a5565] mb-8"
        >
          <Link href="/" className="hover:text-[#bc0c11] transition-colors">
            {t("nav.home")}
          </Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 text-[#9ca3af]"
            aria-hidden="true"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link href="/tefa" className="hover:text-[#bc0c11] transition-colors">
            Teaching Factory
          </Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 text-[#9ca3af]"
            aria-hidden="true"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold text-[#101828]" aria-current="page">
            Request Project
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Heading, Description & Trust Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Standard Red Accent Bar & Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-[3px] bg-[#bc0c11] rounded-full shrink-0" />
              <span className="font-jakarta font-bold text-xs sm:text-sm text-[#bc0c11] tracking-wider uppercase">
                REQUEST PROJECT TEFA
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#101828] mb-4">
              Ceritakan Kebutuhan <br />
              <span className="text-[#bc0c11]">Project Anda</span>
            </h1>

            {/* Subtitle */}
            <p className="font-jakarta text-base sm:text-lg text-[#4a5565] leading-relaxed mb-6 font-normal">
              Sampaikan kebutuhan Anda dan tim Teaching Factory akan meninjau request sebelum menentukan langkah selanjutnya. Bersama, kita wujudkan solusi nyata yang berdampak.
            </p>

            {/* Quote Box from Figma */}
            <div className="relative w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-200/80 mb-8">
              <div
                className="text-[#bc0c11] text-4xl font-serif font-black leading-none mb-2 select-none"
                aria-hidden="true"
              >
                “
              </div>
              <blockquote className="font-jakarta text-base font-semibold text-[#101828] italic">
                “Dari ide, menjadi karya nyata”
              </blockquote>
              <p className="text-xs font-jakarta text-[#6b7280] mt-2">
                Teaching Factory SMK Telkom Sidoarjo
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="w-full flex flex-col gap-3 pt-2 border-t border-gray-200">
              <span className="text-xs font-bold text-[#101828] font-jakarta uppercase tracking-wider">
                Kontak Langsung
              </span>
              <div className="flex items-center gap-3 text-sm text-[#4a5565] font-jakarta">
                <span className="font-medium text-[#101828]">WhatsApp:</span>
                <a
                  href="https://wa.me/628113021919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bc0c11] hover:underline font-semibold"
                >
                  0811-3021-919
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#4a5565] font-jakarta">
                <span className="font-medium text-[#101828]">Email:</span>
                <a
                  href="mailto:informasi@smktelkom-sda.sch.id"
                  className="text-[#bc0c11] hover:underline font-semibold"
                >
                  informasi@smktelkom-sda.sch.id
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white rounded-[24px] shadow-xl border-2 border-dashed border-[#d1d5dc] p-6 sm:p-8 lg:p-10">
              {isSent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-jakarta font-bold text-2xl text-[#101828] mb-2">
                    Request Berhasil Dibuka!
                  </h3>
                  <p className="text-[#4a5565] font-jakarta text-sm sm:text-base max-w-md">
                    WhatsApp Anda telah terbuka dengan format data konsultasi. Silakan kirimkan pesan tersebut agar tim TeFa segera merespons.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#bc0c11] text-white text-sm font-semibold font-jakarta hover:bg-[#990a0e] transition-colors"
                  >
                    Kirim Request Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="border-b border-gray-100 pb-4 mb-1">
                    <h2 className="font-jakarta font-bold text-xl sm:text-2xl text-[#101828]">
                      Formulir Pengajuan Proyek
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4a5565] font-jakarta mt-1">
                      Lengkapi data singkat di bawah ini untuk memulai sesi konsultasi.
                    </p>
                  </div>

                  {/* Nama */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold font-jakarta text-[#101828] mb-1.5">
                      Nama Lengkap <span className="text-[#bc0c11]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* Instansi */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold font-jakarta text-[#101828] mb-1.5">
                      Instansi / Perusahaan / Sekolah
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Contoh: PT Digital Karya / Pribadi"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* Kontak WA */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold font-jakarta text-[#101828] mb-1.5">
                      Nomor WhatsApp / HP <span className="text-[#bc0c11]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* Kategori Layanan */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold font-jakarta text-[#101828] mb-1.5">
                      Kategori Layanan yang Dibutuhkan
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] bg-white focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all cursor-pointer"
                    >
                      <option value="Website & Sistem Digital">Website & Sistem Digital</option>
                      <option value="UI/UX & Desain Digital">UI/UX & Desain Digital</option>
                      <option value="Instalasi Jaringan">Instalasi & Konfigurasi Jaringan</option>
                      <option value="IT Maintenance">IT Maintenance & Hardware Care</option>
                      <option value="Kebutuhan Kustom Lainnya">Kebutuhan Kustom / Proyek Lainnya</option>
                    </select>
                  </div>

                  {/* Deskripsi Singkat */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold font-jakarta text-[#101828] mb-1.5">
                      Ceritakan Kebutuhan Proyek Anda
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Jelaskan kebutuhan, gambaran sistem, atau target waktu pengerjaan..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full group inline-flex items-center justify-center gap-3 rounded-full bg-[#bc0c11] px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] cursor-pointer"
                      style={{
                        boxShadow:
                          "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                      }}
                    >
                      <span className="font-jakarta font-semibold text-[15px] leading-none">
                        Kirim Request via WhatsApp
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
