import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsSection from "@/components/sections/NewsSection";

export const metadata: Metadata = {
  title: "Berita & Informasi Terkini — SMK Telkom Sidoarjo",
  description:
    "Update terbaru seputar kegiatan, prestasi, kemitraan industri, dan informasi penting dari SMK Telkom Sidoarjo.",
};

export default function BeritaPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 sm:pt-28 flex-1">
        <NewsSection showTitle={true} />
      </main>
      <Footer />
    </div>
  );
}
