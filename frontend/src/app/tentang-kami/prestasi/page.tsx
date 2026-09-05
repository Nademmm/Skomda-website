import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Daftar prestasi dan rekam jejak juara siswa SMK Telkom Sidoarjo di tingkat regional, nasional, dan internasional di bidang teknologi informasi dan kompetensi vokasi.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description: "Rekam jejak juara dan penghargaan siswa SMK Telkom Sidoarjo.",
    images: [
      {
        url: "/images/tentang-kami/prestasi/hero-student-prestasi.png",
        width: 1200,
        height: 630,
        alt: "Siswa Berprestasi SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function PrestasiPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <PageHeroSection
          breadcrumbs={[
            { label: "Tentang Kami", href: "/tentang-kami/profil-sekolah" },
            { label: "Prestasi", href: "/tentang-kami/prestasi" },
          ]}
          titlePrefix="Prestasi &"
          titleHighlight="Penghargaan"
          description="Komitmen mencetak generasi juara tercermin dari deretan piala kejuaraan regional hingga kancah internasional yang diraih peserta didik SMK Telkom Sidoarjo di berbagai bidang kejuruan dan inovasi teknologi."
          studentImage="/images/tentang-kami/prestasi/hero-student-prestasi.png"
          studentAlt="Siswi Berprestasi SMK Telkom Sidoarjo"
          ctaText="Lihat Prestasi"
          ctaHref="#daftar-prestasi"
        />

        <section id="daftar-prestasi" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
              Hall of Fame & Penghargaan Bergengsi
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
            <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
              Dokumentasi pencapaian juara LKS (Lomba Kompetensi Siswa), kompetisi hackathon nasional, olimpiade IT, serta kejuaraan olahraga dan seni.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
