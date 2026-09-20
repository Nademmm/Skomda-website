import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PengumumanKelulusanClient from "@/components/sections/kelulusan/PengumumanKelulusanClient";
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
        <PengumumanKelulusanClient />
      </main>
      <Footer />
    </div>
  );
}
