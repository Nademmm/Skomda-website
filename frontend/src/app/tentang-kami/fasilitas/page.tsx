import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fasilitas — SMK Telkom Sidoarjo",
  description: "Fasilitas lengkap dan modern di SMK Telkom Sidoarjo untuk menunjang proses belajar mengajar.",
};

export default function FasilitasPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Fasilitas"
          breadcrumbs={[
            { label: "Tentang Kami", href: "#" },
            { label: "Fasilitas", href: "/tentang-kami/fasilitas" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
