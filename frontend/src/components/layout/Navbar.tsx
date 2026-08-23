"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "/", hasDropdown: false },
    { label: "Tentang Kami", href: "#sambutan", hasDropdown: true },
    { label: "Program", href: "#program", hasDropdown: true },
    { label: "Informasi", href: "#informasi", hasDropdown: true },
    { label: "Lab Tour", href: "#lab-tour", hasDropdown: false },
    { label: "Trial Class", href: "#trial-class", hasDropdown: false },
    { label: "PPDB", href: "#ppdb", hasDropdown: false },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="mx-auto max-w-[1280px]">
        <header
          className="pointer-events-auto relative w-full h-[66px] bg-white/95 backdrop-blur-md rounded-full px-6 sm:px-8 flex items-center justify-between border border-white/50"
          style={{ boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)" }}
        >
          {/* Logo */}
          <Link href="/" className="relative h-9 w-[122px] shrink-0">
            <Image
              src="/figma/logo-smk-telkom.png"
              alt="SMK Telkom Sidoarjo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-[15px] font-semibold text-[#364153] transition-colors hover:text-[#bd0c12] whitespace-nowrap font-jakarta leading-6"
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60 mt-0.5">
                    <path d="M2 4L6 8L10 4" stroke="#364153" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          {/* Right CTA & Lang */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Selector (Consistent pill sizing) */}
            <div className="flex h-[38px] items-center rounded-full border border-[#e5e7eb] bg-[#f9fafb] p-1 gap-1">
              <button
                onClick={() => setLang("ID")}
                className={`h-[30px] w-[34px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all ${
                  lang === "ID"
                    ? "bg-[#bd0c12] text-white shadow-sm"
                    : "text-[#4b5563] hover:text-[#bd0c12]"
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`h-[30px] w-[34px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all ${
                  lang === "EN"
                    ? "bg-[#bd0c12] text-white shadow-sm"
                    : "text-[#4b5563] hover:text-[#bd0c12]"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* CTA Button Unduh Informasi */}
            <Link
              href="#unduh"
              className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#bd0c12] px-5 text-xs font-bold font-jakarta text-[#bd0c12] transition-all hover:bg-[#bd0c12] hover:text-white active:scale-[0.98] shadow-sm"
            >
              <span>Unduh Informasi</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.75V9.25M7 9.25L4.25 6.5M7 9.25L9.75 6.5M2.5 11.25H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#364153] hover:border-[#bd0c12] hover:text-[#bd0c12]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="pointer-events-auto mt-2 w-full rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 xl:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 text-base font-semibold text-[#364153] hover:text-[#bd0c12]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex h-[36px] items-center rounded-full border border-[#e5e7eb] bg-[#f9fafb] p-1 gap-1">
                  <button
                    onClick={() => setLang("ID")}
                    className={`h-[28px] w-[32px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all ${
                      lang === "ID" ? "bg-[#bd0c12] text-white shadow-sm" : "text-[#4b5563]"
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLang("EN")}
                    className={`h-[28px] w-[32px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all ${
                      lang === "EN" ? "bg-[#bd0c12] text-white shadow-sm" : "text-[#4b5563]"
                    }`}
                  >
                    EN
                  </button>
                </div>
                <Link
                  href="#unduh"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-[36px] items-center rounded-full bg-[#bd0c12] px-5 text-xs font-bold font-jakarta text-white"
                >
                  Unduh Informasi
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
