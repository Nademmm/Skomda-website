import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeroSection from "@/components/sections/common/PageHeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Portal resmi informasi pengumuman kelulusan, jadwal pengambilan surat keterangan lulus (SKL), dan ijazah siswa SMK Telkom Sidoarjo.",
  openGraph: {
    title: "SMK Telkom Sidoarjo",
    description: "Informasi resmi kelulusan siswa SMK Telkom Sidoarjo.",
    images: [
      {
        url: "/images/informasi/pengumuman-kelulusan/hero-student-megaphone.png",
        width: 1200,
        height: 630,
        alt: "Pengumuman Kelulusan SMK Telkom Sidoarjo",
      },
    ],
  },
};

export default function PengumumanKelulusanPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <PageHeroSection
          breadcrumbs={[
            { label: "Informasi", href: "/informasi/berita" },
            { label: "Pengumuman Kelulusan", href: "/informasi/pengumuman-kelulusan" },
          ]}
          titlePrefix="Pengumuman"
          titleHighlight="Kelulusan Resmi"
          description="Akses informasi resmi penetapan kelulusan peserta didik SMK Telkom Sidoarjo tahun ajaran berjalan, prosedur verifikasi berkas, dan panduan transisi ke dunia kerja maupun perguruan tinggi."
          studentImage="/images/informasi/pengumuman-kelulusan/hero-student-megaphone.png"
          studentAlt="Siswa Mengumumkan Kelulusan SMK Telkom Sidoarjo"
          ctaText="Cek Status Kelulusan"
          ctaHref="#portal-kelulusan"
        />

        <section id="portal-kelulusan" className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-[#101828] mb-3">
              Portal Pengecekan Nilai & Surat Keterangan Lulus (SKL)
            </h2>
            <div className="mx-auto h-1 w-12 rounded-full bg-[#bc0c11] mb-5" />
            <p className="font-jakarta text-base text-[#4a5565] max-w-xl mx-auto leading-relaxed">
              Peserta didik dan orang tua/wali murid dapat memasukkan NISN dan kode verifikasi yang telah dibagikan oleh wali kelas masing-masing.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
