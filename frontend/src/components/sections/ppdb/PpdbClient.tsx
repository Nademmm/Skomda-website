"use client";

import { useState } from "react";
import PpdbHeroSection from "./PpdbHeroSection";
import PpdbAlurSection from "./PpdbAlurSection";
import PpdbLearningJourneySection from "./PpdbLearningJourneySection";
import PpdbFaqSection from "./PpdbFaqSection";
import PpdbCtaSection from "./PpdbCtaSection";
import PpdbBrochureModal from "./PpdbBrochureModal";

export default function PpdbClient() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <div className="w-full">
      <PpdbHeroSection onOpenBrochure={() => setIsBrochureOpen(true)} />
      <PpdbAlurSection />
      <PpdbLearningJourneySection />
      <PpdbFaqSection />
      <PpdbCtaSection onOpenBrochure={() => setIsBrochureOpen(true)} />

      <PpdbBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </div>
  );
}
