"use client";

import { useState } from "react";
import TrialClassHero from "./TrialClassHero";
import TrialClassFeelingsSection from "./TrialClassFeelingsSection";
import TrialClassStepsSection from "./TrialClassStepsSection";
import TrialClassRegistrationModal from "./TrialClassRegistrationModal";

export default function TrialClassClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Unified Hero & Upcoming Event Section matching */}
      <TrialClassHero onOpenRegister={() => setIsModalOpen(true)} />
      <TrialClassFeelingsSection />
      <TrialClassStepsSection />
      <TrialClassRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
