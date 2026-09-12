"use client";

import { useState } from "react";
import Image from "next/image";
import { ALUMNI_STORIES_ITEMS } from "@/data/bkkData";

export default function BkkAlumniJourneySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStory = ALUMNI_STORIES_ITEMS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? ALUMNI_STORIES_ITEMS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === ALUMNI_STORIES_ITEMS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative w-full py-20 lg:py-24 bg-[#f3f4f6] border-t border-gray-200/60 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-[3px] w-6 bg-[#bc0c11] rounded-full" />
          <span className="font-jakarta text-xs sm:text-sm font-bold tracking-wider uppercase text-[#bc0c11]">
            ALUMNI JOURNEY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5">
            <h2 className="font-jakarta font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-[#101828] mb-4">
              Setelah SKOMDA,{" "}
              <span className="text-[#bc0c11]">Melangkah Lebih Jauh.</span>
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#4a5565] leading-relaxed mb-6">
              Cerita nyata dari alumni yang kini berkarya di berbagai industri teknologi dan telekomunikasi terkemuka.
            </p>
          </div>

          {/* Right Column: Interactive Testimonial Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs hover:border-[#bc0c11]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* Alumnus Photo */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <Image
                    src={currentStory.avatar}
                    alt={currentStory.name}
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Quote Content */}
                <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                  <div className="mb-6">
                    <span className="font-jakarta text-4xl text-[#bc0c11] leading-none block mb-1">
                      “
                    </span>
                    <p className="font-jakarta text-sm sm:text-base text-[#101828] font-medium leading-relaxed italic mb-4">
                      {currentStory.quote}
                    </p>
                    <p className="font-jakarta text-xs text-[#4a5565] leading-relaxed hidden sm:block">
                      {currentStory.story}
                    </p>
                  </div>

                  {/* Name & Alumnus Details with Navigation Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <h3 className="font-jakarta font-bold text-base text-[#101828]">
                        {currentStory.name}
                      </h3>
                      <p className="font-jakarta text-xs text-[#787878]">
                        {currentStory.role}, {currentStory.company}
                      </p>
                      <span className="inline-block mt-0.5 font-jakarta text-[11px] font-semibold text-[#bc0c11]">
                        {currentStory.alumniInfo}
                      </span>
                    </div>

                    {/* Navigation Prev & Next Controls */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        onClick={handlePrev}
                        aria-label="Cerita Alumni Sebelumnya"
                        className="w-9 h-9 rounded-full border border-gray-200 bg-white text-[#101828] hover:border-[#bc0c11] hover:text-[#bc0c11] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>

                      <button
                        onClick={handleNext}
                        aria-label="Cerita Alumni Berikutnya"
                        className="w-9 h-9 rounded-full bg-[#bc0c11] text-white hover:bg-[#990a0e] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
