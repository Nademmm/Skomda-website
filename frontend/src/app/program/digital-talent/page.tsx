import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Program percepatan talenta digital SMK Telkom Sidoarjo melalui sertifikasi internasional Cisco, Mikrotik, BNSP, serta pembinaan intensif cloud & software development.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description: "Pembekalan talenta digital berstandar industri internasional di SMK Telkom Sidoarjo.",
    images: [
      {
        url: "/images/program/digital-talent/hero-student-talent.png",
        width: 1200,
        height: 630,
        alt: "Talenta Digital Siswa SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function DigitalTalentPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <PageHeroSection
          breadcrumbs={[
            { label: "Program", href: "/program/profil-jurusan" },
            { label: "Digital Talent", href: "/program/digital-talent" },
          ]}
          titlePrefix="Program"
          titleHighlight="Digital Talent"
          description="Inisiatif strategis SMK Telkom Sidoarjo untuk membekali setiap siswa dengan kompetensi teknologi terdepan, sertifikasi keahlian berstandar global, serta kesiapan karier langsung di industri digital."
          studentImage="/images/program/digital-talent/hero-student-talent.png"
          studentAlt="Talenta Muda Digital SMK Telkom Sidoarjo"
          ctaText="Pelajari Program"
          ctaHref="#kurikulum-talent"
        />

        <section id="kurikulum-talent" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
              Jalur Pembinaan Talenta Digital Industri
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
            <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
              Program pembinaan mencakup Cloud Computing, Full-Stack Web Development, Cyber Security, Fiber Optic Network Engineering, dan IoT (Internet of Things).
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
