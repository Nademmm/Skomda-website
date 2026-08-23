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
    <div className="absolute top-0 left-0 right-0 z-50 w-full pt-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <header
          className="relative w-full h-[66px] bg-white rounded-full px-6 sm:px-8 flex items-center justify-between"
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
            {/* Language Selector */}
            <div className="flex items-center rounded-full border border-[#e5e7eb] bg-white p-[3px]">
              <button
                onClick={() => setLang("ID")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold leading-4 transition-all ${
                  lang === "ID" ? "bg-[#bd0c12] text-white shadow-sm" : "text-[#6a7282] hover:text-[#101828]"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold leading-4 transition-all ${
                  lang === "EN" ? "bg-[#bd0c12] text-white shadow-sm" : "text-[#6a7282] hover:text-[#101828]"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="#unduh"
              className="flex items-center gap-2 rounded-full bg-[#bd0c12] px-5 py-2.5 text-[14px] font-bold text-white transition-all hover:bg-[#990a0e] shadow-sm font-jakarta leading-5"
            >
              <span>Unduh Informasi</span>
              <span className="relative size-4 shrink-0">
                <Image src="/figma/download-icon.svg" alt="" fill className="object-contain brightness-0 invert" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden flex flex-col gap-1.5 p-2 text-[#364153]"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="mt-3 w-full rounded-2xl bg-white p-6 shadow-xl xl:hidden border border-gray-100">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 py-3 text-base font-semibold text-[#364153] hover:text-[#bd0c12] font-jakarta"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Pilih Bahasa:</span>
                <div className="flex rounded-full border border-[#e5e7eb] p-1 bg-white">
                  {["ID", "EN"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l as "ID" | "EN")}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                        lang === l ? "bg-[#bd0c12] text-white" : "text-[#6a7282]"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                href="#unduh"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#bd0c12] py-3 text-sm font-bold text-white shadow"
              >
                Unduh Informasi
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
