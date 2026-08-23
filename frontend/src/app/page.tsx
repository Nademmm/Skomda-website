import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PrincipalSection from "@/components/sections/PrincipalSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import NewsSection from "@/components/sections/NewsSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#101828] overflow-x-hidden">
      {/* Persistent Floating Navbar on Scroll */}
      <Navbar />

      <main>
        {/* Hero Section with Floating Stats Bar */}
        <HeroSection />

        {/* Principal Greeting & School Vision */}
        <PrincipalSection />

        {/* Why Choose Us & Digital Talent Features */}
        <WhyChooseUsSection />

        {/* Industrial Partners Continuous Infinite Marquee */}
        <PartnersSection />

        {/* Vocational Programs (SIJA & TJAT Interactive Tab System) */}
        <ProgramsSection />

        {/* Latest News & Activities with Category Filter */}
        <NewsSection />
      </main>

      {/* 4-Column Footer with Live Stats & Maps Embed */}
      <Footer />
    </div>
  );
}
