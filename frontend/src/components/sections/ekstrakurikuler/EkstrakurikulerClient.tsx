"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function EkstrakurikulerClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.programs", "Program"), href: "/program/profil-jurusan" },
          { label: t("ekstrakurikuler.breadcrumb", "Ekstrakurikuler"), href: "/program/ekstrakurikuler" },
        ]}
        titlePrefix={t("ekstrakurikuler.heroTitle1", "Program")}
        titleHighlight={t("ekstrakurikuler.heroTitle2", "Ekstrakurikuler")}
        description={t("ekstrakurikuler.heroDesc")}
        studentImage="/images/program/ekstrakurikuler/hero-student-guitar.png"
        studentAlt="Ekstrakurikuler SMK Telkom Sidoarjo"
        ctaText={t("ekstrakurikuler.heroCta", "Jelajahi Ekskul")}
        ctaHref="#daftar-ekskul"
      />

      <section id="daftar-ekskul" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-[#bc0c11]/10 text-[#bc0c11] mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
            {t("ekstrakurikuler.sectionTitle", "Katalog Ekstrakurikuler Lengkap")}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
          <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed mb-8">
            {t("ekstrakurikuler.sectionDesc")}
          </p>
        </div>
      </section>
    </>
  );
}
