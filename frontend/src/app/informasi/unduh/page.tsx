import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UnduhInformasiClient from "@/components/sections/unduh/UnduhInformasiClient";

export const metadata: Metadata = {
  title: "Unduh Informasi & Brosur Resmi",
  description:
    "Pusat unduhan informasi resmi SMK Telkom Sidoarjo. Dapatkan brosur PPDB 2026/2027, sertifikat akreditasi A, sertifikat ISO 21001, dan dokumen regulasi resmi.",
};

export default function InformasiUnduhPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <Navbar />
      <UnduhInformasiClient />
      <Footer />
    </main>
  );
}
