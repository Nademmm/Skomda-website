import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SambutanKepsek from "@/components/sections/SambutanKepsek";
import MengapaMemilih from "@/components/sections/MengapaMemilih";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden">
      {/* Floating Navbar — absolute, overlays the hero */}
      <Navbar />
      <main>
        {/* Hero has built-in top padding of 140px for the navbar height */}
        <Hero />
        <SambutanKepsek />
        <MengapaMemilih />
      </main>
      <Footer />
    </div>
  );
}
