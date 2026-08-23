import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SambutanKepsek from "@/components/sections/SambutanKepsek";
import MengapaMemilih from "@/components/sections/MengapaMemilih";
import MitraSection from "@/components/sections/MitraSection";
import JurusanSection from "@/components/sections/JurusanSection";
import BeritaSection from "@/components/sections/BeritaSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden">
      {/* Floating Navbar */}
      <Navbar />

      <main>
        {/* Hero Section with Stats Bar Overlay */}
        <Hero />

        {/* Sambutan Kepala Sekolah */}
        <SambutanKepsek />

        {/* Mengapa Memilih SMK Telkom Sidoarjo */}
        <MengapaMemilih />

        {/* Mitra & Partner Logos Strip */}
        <MitraSection />

        {/* Program Keahlian (SIJA & TJAT interactive tabs) */}
        <JurusanSection />

        {/* Berita & Informasi Terkini */}
        <BeritaSection />
      </main>

      {/* Authentic 4-Column White Footer */}
      <Footer />
    </div>
  );
}
