import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoonPage from "@/components/sections/ComingSoonPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Guru — SMK Telkom Sidoarjo",
  description: "Profil tenaga pengajar profesional dan bersertifikat di SMK Telkom Sidoarjo.",
};

export default function ProfilGuruPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ComingSoonPage
          title="Profil Guru"
          breadcrumbs={[
            { label: "Tentang Kami", href: "#" },
            { label: "Profil Guru", href: "/tentang-kami/profil-guru" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
