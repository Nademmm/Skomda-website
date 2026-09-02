import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penerapan K3 — SMK Telkom Sidoarjo",
  description: "Informasi penerapan Keselamatan dan Kesehatan Kerja (K3) di SMK Telkom Sidoarjo.",
};

export default function PenerapanK3Page() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Penerapan K3"
          breadcrumbs={[
            { label: "Informasi", href: "#" },
            { label: "Penerapan K3", href: "/informasi/penerapan-k3" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
