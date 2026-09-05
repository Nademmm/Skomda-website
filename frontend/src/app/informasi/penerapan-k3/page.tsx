import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Standar Keselamatan dan Kesehatan Kerja (K3) di lingkungan bengkel praktikum, laboratorium jaringan fiber optik, dan sarana sekolah di SMK Telkom Sidoarjo.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description: "Standar Keselamatan dan Kesehatan Kerja (K3) di SMK Telkom Sidoarjo.",
    images: [
      {
        url: "/images/informasi/penerapan-k3/hero-student-k3.png",
        width: 1200,
        height: 630,
        alt: "Penerapan K3 SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function PenerapanK3Page() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <PageHeroSection
          breadcrumbs={[
            { label: "Informasi", href: "/informasi/berita" },
            { label: "Penerapan K3", href: "/informasi/penerapan-k3" },
          ]}
          titlePrefix="Penerapan"
          titleHighlight="K3 Lingkungan Sekolah"
          description="Menjaga keselamatan dan kesehatan seluruh warga sekolah melalui penerapan SOP K3 berstandar industri pada setiap aktivitas praktikum kabel fiber optik, server data center, dan kelistrikan."
          studentImage="/images/informasi/penerapan-k3/hero-student-k3.png"
          studentAlt="Siswi SMK Telkom Sidoarjo Mengutamakan K3"
          ctaText="Pelajari Standar K3"
          ctaHref="#standar-k3"
        />

        <section id="standar-k3" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
              Standard Operating Procedure (SOP) K3
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
            <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
              Panduan keselamatan penggunaan APD (Alat Pelindung Diri), penanganan jalur evakuasi darurat, APAR di laboratorium, serta protokol K3 di lingkungan Yayasan Pendidikan Telkom.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
