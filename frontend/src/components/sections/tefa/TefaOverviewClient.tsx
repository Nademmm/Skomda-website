"use client";

import TefaOverviewHero from "./TefaOverviewHero";
import TefaAboutSection from "./TefaAboutSection";
import TefaPartnersSection from "./TefaPartnersSection";

export default function TefaOverviewClient() {
  return (
    <>
      {/* 1. Hero Overview */}
      <TefaOverviewHero />

      {/* 2. Tentang TEFA (Gedung & Quote) */}
      <TefaAboutSection />

      {/* 3. Mitra Industri (Logos Grid) */}
      <TefaPartnersSection />
    </>
  );
}
