import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Talent — SMK Telkom Sidoarjo",
  description: "Program Digital Talent SMK Telkom Sidoarjo — pembekalan skill digital untuk kebutuhan industri.",
};

export default function DigitalTalentPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Digital Talent"
          breadcrumbs={[
            { label: "Program", href: "#" },
            { label: "Digital Talent", href: "/program/digital-talent" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
