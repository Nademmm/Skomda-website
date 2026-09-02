import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestasi — SMK Telkom Sidoarjo",
  description: "Daftar prestasi dan pencapaian siswa SMK Telkom Sidoarjo di tingkat regional, nasional, dan internasional.",
};

export default function PrestasiPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Prestasi"
          breadcrumbs={[
            { label: "Tentang Kami", href: "#" },
            { label: "Prestasi", href: "/tentang-kami/prestasi" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
