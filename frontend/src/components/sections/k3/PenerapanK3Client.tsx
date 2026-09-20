"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function PenerapanK3Client() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.information", "Informasi"), href: "/informasi/berita" },
          { label: t("informasi.k3Breadcrumb", "Penerapan K3"), href: "/informasi/penerapan-k3" },
        ]}
        titlePrefix={t("informasi.k3Title1", "Penerapan")}
        titleHighlight={t("informasi.k3Title2", "K3 Lingkungan Sekolah")}
        description={t("informasi.k3Desc")}
        studentImage="/images/informasi/penerapan-k3/hero-student-k3.png"
        studentAlt="Penerapan K3 SMK Telkom Sidoarjo"
        ctaText={t("informasi.k3Cta", "Pelajari Standar K3")}
        ctaHref="#standar-k3"
      />

      <section id="standar-k3" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
            {t("informasi.k3SopTitle", "Standard Operating Procedure (SOP) K3")}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
          <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
            {t("informasi.k3SopDesc")}
          </p>
        </div>
      </section>
    </>
  );
}
