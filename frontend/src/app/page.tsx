import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import JurusanPreview from "@/components/sections/JurusanPreview";
import BeritaPreview from "@/components/sections/BeritaPreview";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <JurusanPreview />
        <BeritaPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
