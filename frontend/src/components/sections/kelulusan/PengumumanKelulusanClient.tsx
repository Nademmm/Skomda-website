"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function PengumumanKelulusanClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.information", "Informasi"), href: "/informasi/berita" },
          { label: t("informasi.kelulusanBreadcrumb", "Pengumuman Kelulusan"), href: "/informasi/pengumuman-kelulusan" },
        ]}
        titlePrefix={t("informasi.kelulusanTitle1", "Pengumuman")}
        titleHighlight={t("informasi.kelulusanTitle2", "Kelulusan Resmi")}
        description={t("informasi.kelulusanDesc")}
        studentImage="/images/informasi/pengumuman-kelulusan/hero-student-megaphone.png"
        studentAlt="Pengumuman Kelulusan SMK Telkom Sidoarjo"
        ctaText={t("informasi.kelulusanCta", "Cek Status Kelulusan")}
        ctaHref="#portal-kelulusan"
      />

      <section id="portal-kelulusan" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
            {t("informasi.kelulusanPortalTitle", "Portal Pengecekan Nilai & Surat Keterangan Lulus (SKL)")}
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
          <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
            {t("informasi.kelulusanPortalDesc")}
          </p>
        </div>
      </section>
    </>
  );
}
