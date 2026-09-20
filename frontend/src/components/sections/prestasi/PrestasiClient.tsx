"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function PrestasiClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.aboutUs", "Tentang Kami"), href: "/tentang-kami/profil-sekolah" },
          { label: t("prestasi.breadcrumb", "Prestasi"), href: "/tentang-kami/prestasi" },
        ]}
        titlePrefix={t("prestasi.heroTitle1", "Prestasi &")}
        titleHighlight={t("prestasi.heroTitle2", "Penghargaan")}
        description={t("prestasi.heroDesc")}
        studentImage="/images/tentang-kami/prestasi/hero-student-prestasi.png"
        studentAlt="Prestasi SMK Telkom Sidoarjo"
        ctaText={t("prestasi.heroCta", "Lihat Prestasi")}
        ctaHref="#daftar-prestasi"
      />

      <section id="daftar-prestasi" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
            {t("prestasi.sectionTitle", "Hall of Fame & Penghargaan Bergengsi")}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
          <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
            {t("prestasi.sectionDesc")}
          </p>
        </div>
      </section>
    </>
  );
}
