"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHeroSection from "@/components/sections/common/PageHeroSection";

export default function BkkHeroSection() {
  const { t } = useLanguage();

  return (
    <PageHeroSection
      breadcrumbs={[
        { label: t("nav.programs", "Program"), href: "/program/profil-jurusan" },
        { label: "BKK", href: "/program/bkk" },
      ]}
      titleHighlight="BKK"
      titleHighlightColor="text-[#101828]"
      description="Bursa Kerja Khusus (BKK) SMK Telkom Sidoarjo hadir sebagai pusat layanan karier terpadu yang menghubungkan siswa dan alumni langsung dengan dunia kerja. Kami memfasilitasi akses lowongan kerja terverifikasi, pelatihan kesiapan kerja seperti simulasi wawancara dan penyusunan portofolio, hingga penyaluran kerja ke puluhan mitra industri terpercaya."
      studentImage="/images/program/bkk/hero-student-bkk.png"
      studentAlt="Bursa Kerja Khusus SMK Telkom Sidoarjo"
      ctaText="Jelajahi"
      ctaHref="#peluang-karier"
      imagePosition="right"
      isIntegratedArtwork={true}
    />
  );
}
