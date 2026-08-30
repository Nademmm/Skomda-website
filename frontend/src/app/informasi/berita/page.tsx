import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BeritaPageClient from "@/components/sections/berita/BeritaPageClient";
import { getNewsList } from "@/services/news";

export const metadata: Metadata = {
  title: "SMK Telkom Sidoarjo",
  description:
    "Portal Berita & Informasi Terkini SMK Telkom Sidoarjo: Kegiatan sekolah, prestasi siswa, kemitraan industri, dan perkembangan teknologi.",
  keywords: [
    "Berita SMK Telkom Sidoarjo",
    "Prestasi SMK Telkom",
    "Kegiatan Skomda",
    "Informasi PPDB Telkom Sidoarjo",
    "Artikel Teknologi Skomda",
  ],
};

export default async function BeritaPage() {
  const newsList = await getNewsList();

  return (
    <div className="min-h-screen bg-white text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <BeritaPageClient initialNews={newsList} />
      </main>
      <Footer />
    </div>
  );
}
