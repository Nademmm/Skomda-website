"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface SubMenuItem {
  label: string;
  href: string;
  desc?: string;
}

interface NavItem {
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const toggleMobileSubmenu = (href: string) => {
    setMobileSubmenu((prev) => (prev === href ? null : href));
  };

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.aboutUs"),
      href: "#sambutan",
      submenu: [
        { label: t("nav.schoolProfile"), href: "/tentang-kami/profil-sekolah", desc: t("nav.schoolProfileDesc") },
        { label: t("nav.industryHub"), href: "/tentang-kami/hub-industri", desc: t("nav.industryHubDesc") },
        { label: t("nav.achievements"), href: "/tentang-kami/prestasi", desc: t("nav.achievementsDesc") },
        { label: t("nav.facilities"), href: "/tentang-kami/fasilitas", desc: t("nav.facilitiesDesc") },
        { label: t("nav.teachers"), href: "/tentang-kami/profil-guru", desc: t("nav.teachersDesc") },
        { label: t("nav.accommodation"), href: "/tentang-kami/akomodasi", desc: t("nav.accommodationDesc") },
      ],
    },
    {
      label: t("nav.programs"),
      href: "#program",
      submenu: [
        { label: t("nav.majorProfiles"), href: "/program/profil-jurusan", desc: t("nav.majorProfilesDesc") },
        { label: t("nav.extracurriculars"), href: "/program/ekstrakurikuler", desc: t("nav.extracurricularsDesc") },
        { label: t("nav.digitalTalent"), href: "/program/digital-talent", desc: t("nav.digitalTalentDesc") },
        { label: t("nav.ts21Program"), href: "/program/ts21", desc: t("nav.ts21ProgramDesc") },
      ],
    },
    {
      label: t("nav.information"),
      href: "#informasi",
      submenu: [
        { label: t("nav.news"), href: "/informasi/berita", desc: t("nav.newsDesc") },
        { label: t("nav.graduationAnnouncement"), href: "/informasi/pengumuman-kelulusan", desc: t("nav.graduationAnnouncementDesc") },
        { label: t("nav.k3Implementation"), href: "/informasi/penerapan-k3", desc: t("nav.k3ImplementationDesc") },
      ],
    },
    { label: t("nav.trialClass"), href: "#trial-class" },
    { label: t("nav.ppdb"), href: "#ppdb" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="mx-auto max-w-[1280px]">
        <header
          className="pointer-events-auto relative w-full h-[66px] bg-white/95 backdrop-blur-md rounded-full px-5 sm:px-8 flex items-center justify-between border border-white/50 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_10px_10px_-5px_rgba(0,0,0,0.04)]"
        >
          {/* Logo */}
          <Link href="/" className="relative h-9 w-[122px] shrink-0">
            <Image
              src="/figma/logo-smk-telkom.png"
              alt="SMK Telkom Sidoarjo"
              fill
              sizes="122px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav Links with Glassmorphism Dropdowns */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              if (item.submenu) {
                return (
                  <div key={item.href} className="relative group/nav py-3">
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[15px] font-semibold text-[#364153] transition-colors group-hover/nav:text-[#bd0c12] whitespace-nowrap font-jakarta leading-6 rounded-full cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="opacity-60 transition-transform duration-200 group-hover/nav:rotate-180 group-hover/nav:opacity-100 group-hover/nav:text-[#bd0c12]"
                      >
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Floating Dropdown Card */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-200 ease-out z-50">
                      <div className="w-[300px] sm:w-[330px] rounded-2xl bg-white/95 backdrop-blur-md p-2.5 shadow-[0px_20px_35px_-5px_rgba(0,0,0,0.12),0px_10px_10px_-5px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="group/item flex flex-col p-2.5 rounded-xl transition-all hover:bg-[#ffebed] text-left"
                          >
                            <span className="font-jakarta text-sm font-semibold text-[#101828] group-hover/item:text-[#bd0c12] flex items-center justify-between">
                              <span>{sub.label}</span>
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#bd0c12]"
                              >
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {sub.desc && (
                              <span className="font-jakarta text-xs text-[#71717a] mt-0.5 group-hover/item:text-[#4a5565] line-clamp-1">
                                {sub.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-1.5 text-[15px] font-semibold text-[#364153] transition-colors hover:text-[#bd0c12] whitespace-nowrap font-jakarta leading-6"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA & Lang */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex h-[38px] items-center rounded-full border border-[#e5e7eb] bg-[#f9fafb] p-1 gap-1">
              <button
                type="button"
                onClick={() => setLang("ID")}
                className={`h-[30px] w-[34px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all cursor-pointer ${
                  lang === "ID"
                    ? "bg-[#bd0c12] text-white shadow-sm"
                    : "text-[#4b5563] hover:text-[#bd0c12]"
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("EN")}
                className={`h-[30px] w-[34px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all cursor-pointer ${
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
              href="/unduh-informasi"
              className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#bd0c12] px-5 text-xs font-bold font-jakarta text-[#bd0c12] transition-all hover:bg-[#bd0c12] hover:text-white active:scale-[0.98] shadow-sm"
            >
              <span>{t("nav.downloadInfo")}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.75V9.25M7 9.25L4.25 6.5M7 9.25L9.75 6.5M2.5 11.25H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setMobileOpen((prev) => !prev); }}
              onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setMobileOpen((prev) => !prev); }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#364153] active:border-[#bd0c12] active:text-[#bd0c12] active:bg-gray-50 bg-white"
              aria-label="Toggle menu"
              style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu with Expandable Accordions */}
        {mobileOpen && (
          <div className="pointer-events-auto mt-2 w-full max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-gray-100 xl:hidden">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                if (item.submenu) {
                  const isOpen = mobileSubmenu === item.href;
                  return (
                    <div key={item.href} className="flex flex-col border-b border-gray-100 pb-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.href)}
                        className="flex items-center justify-between px-2 py-2.5 text-base font-semibold text-[#364153] hover:text-[#bd0c12] w-full text-left cursor-pointer select-none"
                      >
                        <span>{item.label}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#bd0c12]" : "text-gray-400"}`}
                        >
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="mt-1 flex flex-col gap-1 pl-4 border-l-2 border-[#bd0c12]/30 ml-2">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="px-2 py-2 text-sm font-medium text-[#4a5565] hover:text-[#bd0c12] active:text-[#bd0c12]"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2.5 text-base font-semibold text-[#364153] hover:text-[#bd0c12] active:text-[#bd0c12] border-b border-gray-100 last:border-0"
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex h-[36px] items-center rounded-full border border-[#e5e7eb] bg-[#f9fafb] p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setLang("ID")}
                    className={`h-[28px] w-[32px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all cursor-pointer ${
                      lang === "ID" ? "bg-[#bd0c12] text-white shadow-sm" : "text-[#4b5563]"
                    }`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("EN")}
                    className={`h-[28px] w-[32px] flex items-center justify-center rounded-full text-xs font-bold font-jakarta transition-all cursor-pointer ${
                      lang === "EN" ? "bg-[#bd0c12] text-white shadow-sm" : "text-[#4b5563]"
                    }`}
                  >
                    EN
                  </button>
                </div>
                <Link
                  href="/unduh-informasi"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-[36px] items-center rounded-full bg-[#bd0c12] px-5 text-xs font-bold font-jakarta text-white shadow-sm"
                >
                  {t("nav.downloadInfo")}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
