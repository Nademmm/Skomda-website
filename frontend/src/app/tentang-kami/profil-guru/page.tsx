import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfilGuruHeroSection from "@/components/sections/profil-guru/ProfilGuruHeroSection";
import KepalaSekolahSection from "@/components/sections/profil-guru/KepalaSekolahSection";
import TeacherCarouselSection from "@/components/sections/profil-guru/TeacherCarouselSection";
import { wakilKepalaList, guruList, staffList } from "@/data/teachers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Profil tenaga pengajar dan staf profesional berdedikasi dengan keahlian di bidang Teknologi Informasi dan Komunikasi di SMK Telkom Sidoarjo.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description:
      "Tim pengajar profesional berdedikasi dengan keahlian teknologi dan pengalaman industri di SMK Telkom Sidoarjo.",
    images: [
      {
        url: "/images/tentang-kami/profil-guru/profil-guru-hero.png",
        width: 1200,
        height: 630,
        alt: "Profil Guru SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function ProfilGuruPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      {/* Floating Navbar */}
      <Navbar />
      
      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Top Hero Section */}
        <ProfilGuruHeroSection />

        {/* 2. Kepala Sekolah Featured Section */}
        <KepalaSekolahSection />

        {/* 3. Wakil Kepala Bidang Carousel */}
        <TeacherCarouselSection
          title="Wakil Kepala Bidang"
          subtitle="SMK Telkom Sidoarjo"
          items={wakilKepalaList}
          itemsPerPage={4}
          bgWhite={false}
        />

        {/* 4. Guru Produktif dan Non Produktif Carousel */}
        <TeacherCarouselSection
          title="Guru Produktif dan Non Produktif"
          subtitle="SMK Telkom Sidoarjo"
          items={guruList}
          itemsPerPage={4}
          bgWhite={true}
        />

        {/* 5. Staff dan Karyawan Carousel */}
        <TeacherCarouselSection
          title="Staff dan Karyawan"
          subtitle="SMK Telkom Sidoarjo"
          items={staffList}
          itemsPerPage={4}
          bgWhite={false}
        />
      </main>

      {/* 4-Column Footer */}
      <Footer />
    </div>
  );
}
