"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function DigitalTalentClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.programs", "Program"), href: "/program/profil-jurusan" },
          { label: t("digitalTalent.breadcrumb", "Digital Talent"), href: "/program/digital-talent" },
        ]}
        titlePrefix={t("digitalTalent.heroTitle1", "Program")}
        titleHighlight={t("digitalTalent.heroTitle2", "Digital Talent")}
        description={t("digitalTalent.heroDesc")}
        studentImage="/images/program/digital-talent/hero-student-talent.png"
        studentAlt="Digital Talent SMK Telkom Sidoarjo"
        ctaText={t("digitalTalent.heroCta", "Pelajari Program")}
        ctaHref="#kurikulum-talent"
      />

      <section id="kurikulum-talent" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
            {t("digitalTalent.sectionTitle", "Jalur Pembinaan Talenta Digital Industri")}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
          <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
            {t("digitalTalent.sectionDesc")}
          </p>
        </div>
      </section>
    </>
  );
}
