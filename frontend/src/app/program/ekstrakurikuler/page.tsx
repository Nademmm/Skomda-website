import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Wadah pengembangan minat, bakat, dan kepemimpinan siswa melalui 18+ pilihan cabang ekstrakurikuler di bidang teknologi, olahraga, dan seni budaya di SMK Telkom Sidoarjo.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description: "18+ Ekstrakurikuler Unggulan SMK Telkom Sidoarjo untuk mengasah bakat dan potensi siswa.",
    images: [
      {
        url: "/images/program/ekstrakurikuler/hero-student-guitar.png",
        width: 1200,
        height: 630,
        alt: "Ekstrakurikuler Siswa SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <PageHeroSection
          breadcrumbs={[
            { label: "Program", href: "/program/profil-jurusan" },
            { label: "Ekstrakurikuler", href: "/program/ekstrakurikuler" },
          ]}
          titlePrefix="Program"
          titleHighlight="Ekstrakurikuler"
          description="Wadah pengembangan minat, bakat, dan karakter kepemimpinan siswa melalui 18+ cabang ekstrakurikuler unggulan di bidang teknologi, robotika, seni musik, olahraga prestasi, dan kepemimpinan."
          studentImage="/images/program/ekstrakurikuler/hero-student-guitar.png"
          studentAlt="Siswa Ekstrakurikuler Musik SMK Telkom Sidoarjo"
          ctaText="Jelajahi Ekskul"
          ctaHref="#daftar-ekskul"
        />

        {/* Section info & in-development notice */}
        <section id="daftar-ekskul" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-[#bc0c11]/10 text-[#bc0c11] mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
              Katalog Ekstrakurikuler Lengkap
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
            <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed mb-8">
              Pendaftaran ekstrakurikuler untuk peserta didik baru dibuka setiap awal semester ganjil. Informasi jadwal latihan rutin dan pembina klub dapat dilihat pada kalender kesiswaan.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
