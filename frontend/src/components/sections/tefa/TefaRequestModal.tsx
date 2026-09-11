"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { TefaProductItem } from "./TefaCatalogSection";

interface TefaRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: TefaProductItem | null;
}

export default function TefaRequestModal({
  isOpen,
  onClose,
  initialProduct,
}: TefaRequestModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(
    initialProduct?.title || "Website & Sistem Digital"
  );
  const [description, setDescription] = useState("");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setService(initialProduct.title);
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Build formatted WhatsApp message
    const waMessage = `Halo Tim Teaching Factory SMK Telkom Sidoarjo,\n\nSaya ingin konsultasi dan mengajukan request project TeFa:\n- Nama: ${name}\n- Instansi/Organisasi: ${organization || "-"}\n- Kontak/WA: ${phone}\n- Layanan: ${service}\n- Kebutuhan: ${description || "Ingin berdiskusi lebih lanjut"}\n\nMohon info dan jadwal konsultasinya. Terima kasih.`;

    const encoded = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/628113021919?text=${encoded}`;

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-[25px] shadow-2xl border-2 border-dashed border-[#d1d5dc] max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir"
            className="absolute top-5 right-5 z-30 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isSent ? (
            <div className="p-8 py-12 flex flex-col items-center text-center">
              <div className="size-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-jakarta font-bold text-2xl text-[#101828] mb-2">
                Permintaan Terkirim
              </h3>
              <p className="font-jakarta text-sm text-[#4a5565] max-w-sm">
                WhatsApp Anda telah dibuka. Tim Teaching Factory SMK Telkom Sidoarjo siap membantu mewujudkan solusi terbaik untuk Anda.
              </p>
            </div>
          ) : (
            <>
              {/* Fixed Header from Figma Desktop - 5 */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-2 pr-14 shrink-0 bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-8 h-[2.5px] bg-[#bc0c11] rounded-full" />
                  <span className="text-xs font-jakarta font-bold text-[#bc0c11] uppercase tracking-wider">
                    {t("tefa.requestModalEyebrow")}
                  </span>
                </div>
                <h3 id="modal-title" className="font-jakarta font-bold text-2xl sm:text-[25px] leading-tight text-[#101828]">
                  {t("tefa.requestModalTitle")}
                </h3>
                <p className="font-jakarta text-xs sm:text-sm text-[#4a5565] mt-1.5 leading-relaxed">
                  {t("tefa.requestModalDesc")}
                </p>
              </div>

              {/* Scrollable Form Body with Search-like Custom Scrollbar */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                {/* Motto & Step Indicator Banner from Figma Desktop - 5 */}
                <div className="mb-5 p-3 rounded-2xl bg-[#ffebed]/60 border border-dashed border-[#bc0c11]/30 flex items-center justify-between gap-3">
                  <span className="font-jakarta text-xs sm:text-[13px] font-medium italic text-[#bc0c11]">
                    {t("tefa.requestModalQuote")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#bc0c11] text-white text-[11px] font-jakarta font-semibold shrink-0">
                    <span className="size-1.5 rounded-full bg-white" />
                    1 {t("tefa.requestModalStep1")}
                  </span>
                </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1">
                    Instansi / Bisnis / Organisasi
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Contoh: PT Inovasi Maju / Umum"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1">
                    Nomor WhatsApp / Kontak <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1">
                    Layanan yang Diminati
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all bg-white"
                  >
                    <option value="Website Company Profile">Website Company Profile</option>
                    <option value="UI/UX & Desain Digital">UI/UX & Desain Digital</option>
                    <option value="Instalasi Jaringan">Instalasi Jaringan</option>
                    <option value="IT Maintenance">IT Maintenance</option>
                    <option value="Custom Project Khusus">Custom Project Khusus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-jakarta text-xs font-semibold text-[#364153] mb-1">
                    Ceritakan Kebutuhan Anda
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan gambaran umum kebutuhan project Anda..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-jakarta focus:outline-none focus:border-[#bc0c11] focus:ring-1 focus:ring-[#bc0c11] transition-all"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#bc0c11] hover:bg-[#990a0e] text-white py-3.5 px-6 font-jakarta font-medium text-[15px] transition-all active:scale-[0.98] cursor-pointer"
                    style={{
                      boxShadow:
                        "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.948.879 3.018.879 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.982-5.766zm3.432 8.167c-.145.408-.847.781-1.184.829-.337.047-.734.072-2.18-.517-1.748-.714-2.883-2.484-2.97-2.6-.088-.116-.71-1.026-.71-1.956 0-.931.488-1.391.662-1.579.174-.188.379-.235.505-.235.126 0 .252.001.362.008.116.007.272-.044.425.324.158.383.541 1.32.589 1.417.047.098.079.213.016.34-.063.126-.095.205-.189.315-.095.11-.199.245-.284.33-.095.094-.194.197-.083.387.111.19.493.813 1.058 1.317.727.648 1.34.848 1.53.942.19.094.3.079.41-.047.111-.126.474-.551.6-.74.126-.189.252-.158.425-.095.173.063 1.099.518 1.288.612.19.094.316.142.363.221.047.079.047.456-.098.864z" />
                    </svg>
                    <span>Kirim via WhatsApp Humas TeFa</span>
                  </button>
                  <p className="font-jakarta text-[11px] text-center text-gray-400 mt-2">
                    Layanan resmi Teaching Factory SMK Telkom Sidoarjo (0811-3021-919)
                  </p>
                </div>
              </form>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
