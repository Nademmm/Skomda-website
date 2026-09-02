import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman Kelulusan — SMK Telkom Sidoarjo",
  description: "Pengumuman kelulusan resmi siswa SMK Telkom Sidoarjo.",
};

export default function PengumumanKelulusanPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Pengumuman Kelulusan"
          breadcrumbs={[
            { label: "Informasi", href: "#" },
            { label: "Pengumuman Kelulusan", href: "/informasi/pengumuman-kelulusan" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
