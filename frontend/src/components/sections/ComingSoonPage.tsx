"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function ComingSoonPage({ title, breadcrumbs }: ComingSoonPageProps) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute top-[15%] right-[-5%] w-[350px] h-[350px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #bc0c11 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-[#4a5565] mb-8 font-jakarta"
          >
            <Link href="/" className="hover:text-[#bc0c11] transition-colors">
              Beranda
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9ca3af]">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-semibold text-[#101828]">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-[#bc0c11] transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          {/* Icon */}
          <div className="flex size-20 items-center justify-center rounded-2xl bg-[#bc0c11]/10 text-[#bc0c11] mb-6">
            <Construction className="size-10" />
          </div>

          {/* Title */}
          <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-[48px] leading-tight tracking-tight text-[#101828] mb-3">
            {title}
          </h1>

          {/* Red Accent */}
          <div className="h-[3px] w-12 rounded-full bg-[#bc0c11] mb-5" />

          {/* Description */}
          <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed max-w-md mb-8">
            Halaman ini sedang dalam tahap pengembangan. Kami akan segera menghadirkan konten terbaik untuk Anda.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-[#bc0c11] px-7 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#990a0e] active:scale-[0.98]"
            style={{
              boxShadow:
                "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-jakarta font-medium text-[15px] leading-none whitespace-nowrap">
              Kembali ke Beranda
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
