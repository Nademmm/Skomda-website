import Image from "next/image";
import Link from "next/link";

interface WhyCard {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
  isHighlight: boolean;
  href?: string;
}

const whyCards: WhyCard[] = [
  {
    id: "67:180",
    title: "School of Digital Era",
    description: "Fokus pada kurikulum digital dan keterampilan teknologi masa depan.",
    iconSrc: "/figma/why-icon-1.svg",
    isHighlight: false,
  },
  {
    id: "67:235",
    title: "Program Digital Talent",
    description: "Pembekalan skill digital yang sesuai kebutuhan industri dan startup.",
    iconSrc: "/figma/why-icon-2.svg",
    isHighlight: true, // Red card (Figma 67:235 & 23:119)
    href: "/program/digital-talent",
  },
  {
    id: "67:214",
    title: "Akreditasi A - Unggul",
    description: "Diakui secara nasional dengan standar kualitas terbaik oleh BAN-S/M.",
    iconSrc: "/figma/why-icon-3.svg",
    isHighlight: false,
  },
  {
    id: "67:248",
    title: "ISO 21001:2018",
    description: "Telah menerapkan standar manajemen pendidikan internasional.",
    iconSrc: "/figma/why-icon-4.svg",
    isHighlight: false,
  },
  {
    id: "67:261",
    title: "Program OPES",
    description: "Jalur pendidikan berkelanjutan dari SMK hingga perguruan tinggi Telkom.",
    iconSrc: "/figma/why-icon-5.svg",
    isHighlight: false,
  },
  {
    id: "67:274",
    title: "Yayasan Pendidikan Telkom",
    description: "Bagian dari grup pendidikan terpercaya di bawah naungan Telkom Indonesia.",
    iconSrc: "/figma/why-icon-6.svg",
    isHighlight: false,
  },
];

export default function MengapaMemilih() {
  return (
    <section className="w-full bg-[#f3f4f6] py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Header Row (Figma 67:126 & 67:140) */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div className="flex flex-col gap-1">
            <h2 className="font-jakarta font-bold text-3xl sm:text-[36px] leading-[40px] text-[#101828]">
              Mengapa memilih
            </h2>
            <span className="font-jakarta font-bold text-3xl sm:text-[36px] leading-[40px] text-[#e7000b]">
              SMK Telkom Sidoarjo?
            </span>
          </div>

          {/* CTA Daftar Sekarang Button (Figma 67:140) */}
          <div className="shrink-0">
            <Link
              href="#ppdb"
              className="group inline-flex items-center gap-3 rounded-full bg-[#bd0c12] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[#990a0e] active:scale-[0.98]"
              style={{
                boxShadow:
                  "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-jakarta font-medium text-base">Daftar Sekarang</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* 6 Feature Cards Grid (Figma nodes 67:180, 67:235, 67:214, 67:248, 67:261, 67:274) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card) => {
            if (card.isHighlight) {
              return (
                <Link
                  key={card.id}
                  href={card.href || "#"}
                  data-node-id={card.id}
                  className="group relative rounded-[25px] bg-[#bd0c12] px-6 sm:px-7 py-6 text-white shadow-[0px_4px_9px_0px_rgba(0,0,0,0.1)] flex items-center gap-4 sm:gap-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                >
                  {/* White circle icon (Figma 23:120 / 67:237) */}
                  <div className="flex size-[64px] sm:size-[70px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm p-3 transition-transform duration-300 group-hover:scale-105">
                    <div className="relative size-[36px] sm:size-[40px]">
                      <Image
                        src={card.iconSrc}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Text column (Figma 67:242) */}
                  <div className="flex flex-col items-start min-w-0">
                    <h3 className="font-jakarta font-bold text-base sm:text-[18px] lg:text-[20px] text-white leading-[26px] sm:leading-[28px] relative inline-flex items-center gap-1.5">
                      <span className="relative pb-0.5">
                        {card.title}
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full" />
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </h3>
                    <p className="mt-1 font-jakarta text-xs sm:text-[13px] leading-[18px] sm:leading-[20px] text-white/90">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={card.id}
                data-node-id={card.id}
                className="group relative rounded-[25px] bg-white px-6 sm:px-7 py-6 shadow-[0px_4px_4.5px_rgba(0,0,0,0.08)] flex items-center gap-4 sm:gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Light pink/red circle icon (Figma 67:145) */}
                <div className="flex size-[64px] sm:size-[70px] shrink-0 items-center justify-center rounded-full bg-[#ffebed] p-3 transition-transform duration-300 group-hover:scale-105">
                  <div className="relative size-[36px] sm:size-[40px]">
                    <Image
                      src={card.iconSrc}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text column (Figma 67:177) */}
                <div className="flex flex-col items-start min-w-0">
                  <h3 className="font-jakarta font-bold text-base sm:text-[18px] lg:text-[20px] text-[#101828] leading-[26px] sm:leading-[28px]">
                    {card.title}
                  </h3>
                  <p className="mt-1 font-jakarta text-xs sm:text-[13px] leading-[18px] sm:leading-[20px] text-[#4a5565]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
