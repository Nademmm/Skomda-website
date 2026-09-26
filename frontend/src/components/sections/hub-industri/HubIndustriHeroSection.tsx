"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function HubIndustriHeroSection() {
  const { t } = useLanguage();

  return (
    <PageHeroSection
      breadcrumbs={[
        { label: t("nav.aboutUs", "Tentang Kami"), href: "/tentang-kami/profil-sekolah" },
        { label: "Hubungan Industri", href: "/tentang-kami/hub-industri" },
      ]}
      titlePrefix="Hubungan"
      titleHighlight="Industri"
      titleHighlightColor="text-[#e7000b]"
      description="SMK Telkom Sidoarjo menjalin kemitraan strategis dengan puluhan perusahaan terkemuka di bidang teknologi informasi, telekomunikasi, dan industri kreatif. Kolaborasi ini mencakup sinkronisasi kurikulum, program magang industri bersertifikat, hingga rekrutmen langsung untuk memastikan lulusan memiliki kompetensi yang relevan dengan kebutuhan dunia kerja."
      studentImage="/images/tentang-kami/hub-industri/hero-student-hub-industri.png"
      studentAlt="Hubungan Industri SMK Telkom Sidoarjo"
      ctaText="Jelajahi"
      ctaHref="#mitra-industri"
      imagePosition="right"
      isIntegratedArtwork={true}
    />
  );
}
