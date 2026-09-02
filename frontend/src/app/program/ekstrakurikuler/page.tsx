import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekstrakurikuler — SMK Telkom Sidoarjo",
  description: "Program ekstrakurikuler dan pengembangan minat bakat di SMK Telkom Sidoarjo.",
};

export default function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Ekstrakurikuler"
          breadcrumbs={[
            { label: "Program", href: "#" },
            { label: "Ekstrakurikuler", href: "/program/ekstrakurikuler" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
