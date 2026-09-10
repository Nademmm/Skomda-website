"use client";

import { useState } from "react";
import TefaHeroSection from "./TefaHeroSection";
import TefaAboutSection from "./TefaAboutSection";
import TefaPartnersSection from "./TefaPartnersSection";
import TefaProductsModal from "./TefaProductsModal";

export default function TefaPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 1. Hero Section with Breadcrumb & CTA */}
      <TefaHeroSection onOpenProducts={() => setIsModalOpen(true)} />

      {/* 2. Tentang TEFA Section with Building Image & Quote */}
      <TefaAboutSection />

      {/* 3. Mitra Industri Section with Partner Logos Grid */}
      <TefaPartnersSection />

      {/* 4. Interactive Showcase Modal */}
      <TefaProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
