import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Fasilitas lengkap dan modern berstandar industri di SMK Telkom Sidoarjo: laboratorium jaringan fiber optik, lab komputer canggih, studio multimedia, dan sarana olahraga representatif.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description: "Fasilitas dan infrastruktur modern berstandar industri di SMK Telkom Sidoarjo.",
    images: [
      {
        url: "/images/tentang-kami/fasilitas/hero-student-fasilitas.png",
        width: 1200,
        height: 630,
        alt: "Fasilitas SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function FasilitasPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <PageHeroSection
          breadcrumbs={[
            { label: "Tentang Kami", href: "/tentang-kami/profil-sekolah" },
            { label: "Fasilitas", href: "/tentang-kami/fasilitas" },
          ]}
          titlePrefix="Fasilitas &"
          titleHighlight="Infrastruktur"
          description="Didukung infrastruktur modern bersertifikasi ISO 21001:2018, kami menyediakan laboratorium jaringan berkecepatan tinggi, studio pengembangan software, perpustakaan digital, serta ruang kelas interaktif."
          studentImage="/images/tentang-kami/fasilitas/hero-student-fasilitas.png"
          studentAlt="Siswa SMK Telkom Sidoarjo Mengenalkan Fasilitas"
          ctaText="Jelajahi Fasilitas"
          ctaHref="#daftar-fasilitas"
        />

        <section id="daftar-fasilitas" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
              Laboratorium & Sarana Prasarana Terpadu
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
            <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
              Mulai dari Lab TJAT (Teknik Jaringan Akses Telekomunikasi), Lab SIJA (Sistem Informasi Jaringan & Aplikasi), Smart Classroom, hingga lapangan futsal dan masjid sekolah.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
