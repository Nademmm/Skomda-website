"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TrialClassRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrialClassRegistrationModal({
  isOpen,
  onClose,
}: TrialClassRegistrationModalProps) {
  const { t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [schoolOrigin, setSchoolOrigin] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("SIJA");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketCode, setTicketCode] = useState("");

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset after animation
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !schoolOrigin || !whatsapp) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      const code = "TC-" + Math.floor(100000 + Math.random() * 900000);
      setTicketCode(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setFullName("");
    setSchoolOrigin("");
    setWhatsapp("");
    setEmail("");
    setMajor("SIJA");
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden border border-gray-100"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Tutup formulir"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!isSuccess ? (
              <div>
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#bc0c11] text-xs font-bold tracking-wider uppercase mb-2">
                    {t("trialClassPage.upcomingBadge", "EVENT TERDEKAT")}
                  </div>
                  <h3 className="font-jakarta text-2xl font-bold text-[#101828]">
                    {t("trialClassPage.modalTitle", "Pendaftaran Virtual Trial Class 2026")}
                  </h3>
                  <p className="font-jakarta text-sm text-[#4a5565] mt-1.5 leading-relaxed">
                    {t(
                      "trialClassPage.modalSubtitle",
                      "Amankan kursi virtual kamu untuk merasakan pengalaman belajar digital di SMK Telkom Sidoarjo."
                    )}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1.5">
                      {t("trialClassPage.fullName", "Nama Lengkap Siswa")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Muhammad Raihan"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* Asal SMP / MTs */}
                  <div>
                    <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1.5">
                      {t("trialClassPage.schoolOrigin", "Asal SMP / MTs")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolOrigin}
                      onChange={(e) => setSchoolOrigin(e.target.value)}
                      placeholder="Contoh: SMP Negeri 1 Sidoarjo"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1.5">
                      {t("trialClassPage.whatsapp", "Nomor WhatsApp (Aktif)")} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1.5">
                      {t("trialClassPage.email", "Alamat Email")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all"
                    />
                  </div>

                  {/* Major Choice */}
                  <div>
                    <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1.5">
                      {t("trialClassPage.majorChoice", "Pilihan Peminatan Jurusan")}
                    </label>
                    <select
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta text-[#101828] bg-white focus:outline-none focus:ring-2 focus:ring-[#bc0c11]/20 focus:border-[#bc0c11] transition-all"
                    >
                      <option value="SIJA">Sistem Informasi, Jaringan, dan Aplikasi (SIJA - 4 Tahun)</option>
                      <option value="TJKT">Teknik Komputer & Jaringan (TJKT - 3 Tahun)</option>
                      <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-full bg-[#bc0c11] text-white font-jakarta font-semibold text-sm hover:bg-[#990a0e] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          <span>{t("trialClassPage.submitting", "Mengirim Pendaftaran...")}</span>
                        </>
                      ) : (
                        <span>{t("trialClassPage.submitRegistration", "Kirim Pendaftaran")}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="font-jakarta text-2xl font-bold text-[#101828]">
                  {t("trialClassPage.successTitle", "Pendaftaran Berhasil!")}
                </h3>
                <p className="font-jakarta text-sm text-[#4a5565] mt-2 max-w-sm mx-auto leading-relaxed">
                  {t(
                    "trialClassPage.successDesc",
                    "Selamat! Data pendaftaran kamu telah kami terima. Detail akses dan Trial Pass akan dikirimkan ke WhatsApp & Email kamu."
                  )}
                </p>

                {/* Ticket Pass Display */}
                <div className="my-6 p-4 rounded-2xl bg-gradient-to-br from-red-50 to-gray-50 border border-red-100 flex flex-col items-center">
                  <span className="font-jakarta text-xs font-semibold text-[#bc0c11] tracking-wider uppercase">
                    {t("trialClassPage.ticketPass", "KODE TRIAL PASS:")}
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#101828] mt-1 tracking-widest">
                    {ticketCode}
                  </span>
                  <span className="font-jakarta text-xs text-gray-500 mt-2">
                    {fullName} - {major}
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-full bg-[#101828] text-white font-jakarta font-semibold text-sm hover:bg-gray-800 transition-all cursor-pointer"
                >
                  {t("trialClassPage.close", "Tutup")}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
