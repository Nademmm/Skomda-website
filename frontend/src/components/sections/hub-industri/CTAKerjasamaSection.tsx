"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTAKerjasamaSection() {
  return (
    <section id="kontak-kerjasama" className="relative w-full py-20 lg:py-28 bg-[#f3f4f6] overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-[25px] overflow-hidden"
        >
          {/* Red Gradient Background */}
          <div
            className="relative z-10 px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20"
            style={{
              background: "linear-gradient(135deg, #e7000b 0%, #bc0c11 50%, #990a0e 100%)",
            }}
          >
            {/* Decorative Geometric Elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div
              className="absolute top-[20%] right-[10%] w-[120px] h-[50px] rounded-full bg-white/8 rotate-[-30deg] pointer-events-none hidden lg:block"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left: Text */}
              <div className="flex-1 max-w-2xl">
                <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight mb-4">
                  Tertarik Menjadi Mitra Industri?
                </h2>
                <p className="font-jakarta text-base sm:text-lg text-white/85 leading-relaxed">
                  Kami membuka pintu lebar bagi perusahaan teknologi,
                  telekomunikasi, dan digital yang ingin berkolaborasi dalam
                  mencetak talenta masa depan. Mari bergabung dengan ekosistem
                  pendidikan vokasi terdepan di Sidoarjo.
                </p>
              </div>

              {/* Right: CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <Link
                  href="mailto:informasi@smktelkom-sda.sch.id"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[#bc0c11] font-jakarta font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Hubungi Kami</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1 shrink-0"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://wa.me/628113021919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-white font-jakarta font-medium text-base transition-all hover:bg-white/15 hover:border-white/60 active:scale-[0.98]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>WhatsApp</span>
                </Link>
              </div>
            </div>

            {/* Bottom Info Row */}
            <div className="relative z-10 mt-10 pt-8 border-t border-white/15">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/10 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-xs text-white/50">Email</p>
                    <p className="font-jakarta text-sm font-medium">
                      informasi@smktelkom-sda.sch.id
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/10 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-xs text-white/50">Telepon</p>
                    <p className="font-jakarta text-sm font-medium">
                      0811-3021-919
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/10 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-xs text-white/50">Lokasi</p>
                    <p className="font-jakarta text-sm font-medium">
                      Sidoarjo, Jawa Timur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
