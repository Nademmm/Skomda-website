"use client";

import { useState, useEffect } from "react";

export default function BkkKerjasamaSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    emailOrWa: "",
    positionTitle: "",
    jobType: "Full Time",
    jurusanNeeded: "SIJA",
    notes: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        companyName: "",
        contactPerson: "",
        emailOrWa: "",
        positionTitle: "",
        jobType: "Full Time",
        jurusanNeeded: "SIJA",
        notes: "",
      });
    }, 2200);
  };

  return (
    <section id="kerjasama-rekrutmen" className="relative w-full py-20 lg:py-24 bg-[#f3f4f6] border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-white border border-gray-200/80 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-[3px] w-6 bg-[#bc0c11] rounded-full" />
                <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wider uppercase text-[#bc0c11]">
                  MENCARI TALENTA?
                </span>
              </div>

              {/* Title */}
              <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828] mb-4">
                Bekerja Sama dengan <span className="text-[#bc0c11]">SKOMDA</span>
              </h2>

              {/* Description */}
              <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed max-w-xl mb-8">
                BKK SMK Telkom Sidoarjo membuka kesempatan bagi perusahaan untuk terhubung langsung dengan siswa dan alumni berkompetensi tinggi sesuai kebutuhan industri.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#bc0c11] px-7 py-3 text-sm font-jakarta font-bold text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98] shadow-card-cta cursor-pointer"
                >
                  <span>Pasang Lowongan</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <a
                  href="https://wa.me/628113021919?text=Halo%20BKK%20SMK%20Telkom%20Sidoarjo,%20kami%20ingin%20berkolaborasi%20untuk%20kebutuhan%20rekrutmen%20talenta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#bc0c11] px-7 py-2.5 text-sm font-jakarta font-bold text-[#bc0c11] transition-all duration-300 hover:bg-[#bc0c11] hover:text-white active:scale-[0.98] cursor-pointer"
                >
                  <span>Hubungi BKK</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Visual / Tagline Column */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center text-center lg:text-right">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-[#f3f4f6] border border-gray-200/70 shadow-xs max-w-sm">
                <div className="w-12 h-12 rounded-full bg-red-50 text-[#bc0c11] flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="font-jakarta italic text-base sm:text-lg font-medium text-[#101828] leading-snug mb-3">
                  “Kolaborasi untuk Masa Depan Talenta Indonesia”
                </p>
                <span className="font-jakarta text-xs font-bold text-[#bc0c11] tracking-wide uppercase">
                  Bursa Kerja Khusus SKOMDA
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Recruiter Job Posting Submission Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-recruiter-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Tutup Form Lowongan"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-jakarta font-bold text-xl text-[#101828] mb-2">
                  Permintaan Berhasil Terkirim!
                </h3>
                <p className="font-poppins text-sm text-[#4a5565]">
                  Tim BKK SMK Telkom Sidoarjo akan segera menghubungi perusahaan Anda untuk proses verifikasi dan publikasi lowongan.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-jakarta font-bold uppercase tracking-wider text-[#bc0c11] block mb-1">
                    Kemitraan Rekrutmen
                  </span>
                  <h3 id="modal-recruiter-title" className="font-jakarta font-bold text-xl text-[#101828]">
                    Pasang Lowongan Kerja / Magang
                  </h3>
                  <p className="font-poppins text-xs text-[#787878] mt-1">
                    Silakan isi data kebutuhan rekrutmen perusahaan Anda untuk dipublikasikan ke siswa dan alumni SKOMDA.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-jakarta text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-[#101828] mb-1">
                      Nama Perusahaan / Institusi *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Contoh: PT Teknologi Inovasi Bersama"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#101828] mb-1">
                        Nama PIC / HR *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nama narahubung"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#101828] mb-1">
                        No. WhatsApp / Email *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="0812... / hr@perusahaan.com"
                        value={formData.emailOrWa}
                        onChange={(e) => setFormData({ ...formData, emailOrWa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#101828] mb-1">
                        Posisi yang Dibuka *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Network Technician"
                        value={formData.positionTitle}
                        onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#101828] mb-1">
                        Tipe Pekerjaan
                      </label>
                      <select
                        value={formData.jobType}
                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Internship">Internship / Magang</option>
                        <option value="Contract">Kontrak Proyek</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#101828] mb-1">
                      Jurusan yang Dibutuhkan
                    </label>
                    <select
                      value={formData.jurusanNeeded}
                      onChange={(e) => setFormData({ ...formData, jurusanNeeded: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                    >
                      <option value="SIJA">SIJA (Sistem Informasi Jaringan dan Aplikasi)</option>
                      <option value="TJAT">TJAT (Teknik Jaringan Akses Telekomunikasi)</option>
                      <option value="SIJA & TJAT">Keduanya (SIJA & TJAT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#101828] mb-1">
                      Kualifikasi Ringkas / Catatan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan kualifikasi utama atau tautan dokumen lowongan..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#bc0c11] font-bold text-white hover:bg-[#990a0e] transition-colors shadow-sm cursor-pointer"
                    >
                      Kirim Kebutuhan Lowongan
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
