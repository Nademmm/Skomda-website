"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function FasilitasClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.aboutUs", "Tentang Kami"), href: "/tentang-kami/profil-sekolah" },
          { label: t("fasilitas.breadcrumb", "Fasilitas"), href: "/tentang-kami/fasilitas" },
        ]}
        titlePrefix={t("fasilitas.heroTitle1", "Fasilitas &")}
        titleHighlight={t("fasilitas.heroTitle2", "Infrastruktur")}
        description={t("fasilitas.heroDesc")}
        studentImage="/images/tentang-kami/fasilitas/hero-student-fasilitas.png"
        studentAlt="Fasilitas SMK Telkom Sidoarjo"
        ctaText={t("fasilitas.heroCta", "Jelajahi Fasilitas")}
        ctaHref="#daftar-fasilitas"
      />

      <section id="daftar-fasilitas" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
            {t("fasilitas.sectionTitle", "Laboratorium & Sarana Prasarana Terpadu")}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
          <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
            {t("fasilitas.sectionDesc")}
          </p>
        </div>
      </section>
    </>
  );
}
