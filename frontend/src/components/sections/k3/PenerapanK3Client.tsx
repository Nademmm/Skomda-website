"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import K3SopLabsSection from "@/components/sections/k3/K3SopLabsSection";
import K3DocumentsListSection from "@/components/sections/k3/K3DocumentsListSection";
import K3ApdSection from "@/components/sections/k3/K3ApdSection";
import K3EmergencySection from "@/components/sections/k3/K3EmergencySection";

export default function PenerapanK3Client() {
  const { isEn, t } = useLanguage();

  return (
    <>
      <PageHeroSection
        breadcrumbs={[
          { label: t("nav.information", "Informasi"), href: "/informasi/berita" },
          { label: "Penerapan K3", href: "/informasi/penerapan-k3" },
        ]}
        titleHighlight="Penerapan K3"
        titleHighlightColor="text-[#101828]"
        description="SMK Telkom Sidoarjo berkomitmen menerapkan standar Keselamatan dan Kesehatan Kerja (K3) secara menyeluruh di setiap ruang belajar, laboratorium, dan bengkel praktik. Melalui kepatuhan SOP resmi, penyediaan Alat Pelindung Diri (APD), serta simulasi tanggap darurat berkala, kami membentuk budaya kerja yang aman, disiplin, dan berstandar industri bagi seluruh siswa."
        studentImage="/images/informasi/penerapan-k3/hero-student-k3.png"
        studentAlt="Penerapan K3 SMK Telkom Sidoarjo"
        ctaText="Jelajahi"
        ctaHref="#berkas-k3"
        imagePosition="right"
        isIntegratedArtwork={true}
      />

      <K3DocumentsListSection />
      <K3SopLabsSection />
      <K3ApdSection />
      <K3EmergencySection />
    </>
  );
}
