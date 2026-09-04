import Image from "next/image";

const partners = [
  {
    name: "Politeknik Elektronika Negeri Surabaya (PENS)",
    src: "/images/partners/pens.webp",
  },
  {
    name: "Axelbit",
    src: "/images/partners/partner-axelbit.png",
  },
  {
    name: "PT Radnet Digital Indonesia (Radnext)",
    src: "/images/partners/partner-radnet.png",
  },
  {
    name: "Wowrack Indonesia",
    src: "/images/partners/wowrack.png",
  },
  {
    name: "Markaz Design",
    src: "/images/partners/partner-markazdesign.png",
  },
  {
    name: "DigiPrener",
    src: "/images/partners/partner-digiprener.png",
  },
  {
    name: "PT Garuda Telekomunikasi Indonesia",
    src: "/images/partners/partner-garuda.png",
  },
  {
    name: "PT TelkoMedika Indonesia",
    src: "/images/partners/TelkoMedika-v2.png",
  },
  {
    name: "Jagoan Hosting",
    src: "/images/partners/partner-jagoanhosting.png",
  },
  {
    name: "PT Digdaya Olah Teknologi (DOT Indonesia)",
    src: "/images/common/icons/DOT.svg",
  },
  {
    name: "LSP P1 / BNSP",
    src: "/images/partners/bnsp.png",
  },
  {
    name: "Jobnation IT Outsource",
    src: "/images/partners/jobnation.png",
  },
  {
    name: "PT Indev Solusi Digital (indev)",
    src: "/images/partners/indev.png",
  },
  {
    name: "PT Global Infra Teknologi (GIT)",
    src: "/images/partners/partner-globalinfra.png",
  },
  {
    name: "Weza Group",
    src: "/images/partners/weza-group.png",
  },
  {
    name: "PT Woodone Integra Tbk",
    src: "/images/partners/woodneintegra.png",
  },
  {
    name: "PT Trijaya Grafika Solutindo (TGS)",
    src: "/images/partners/trijaya.png",
  },
  {
    name: "Lasambara Karya Cipta",
    src: "/images/partners/lasambora.png",
  },
  {
    name: "RS Islam Surabaya Jemursari",
    src: "/images/partners/rsi.jpg",
  },
  {
    name: "UBIG.CO.ID",
    src: "/images/partners/ubig.png",
  },
  {
    name: "PT Javacreatiox Network Intermedia",
    src: "/images/partners/partner-javacreatiox.png",
  },
  {
    name: "Moksha Indonesia",
    src: "/images/partners/moksha.png",
  },
];

export default function PartnersSection() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...partners, ...partners];

  return (
    <section id="mitra" className="relative w-full bg-[#f3f4f6] py-8 overflow-hidden scroll-mt-24" data-node-id="95:312">
      {/* Infinite scrolling marquee track */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee items-center py-2">
          {marqueeItems.map((p, index) => (
            <div
              key={`${p.name}-${index}`}
              className="flex h-[112px] w-[240px] shrink-0 items-center justify-center px-6"
            >
              <div
                className="group relative flex h-[112px] w-[192px] items-center justify-center rounded-lg border-2 border-dashed border-[#d1d5dc] bg-white p-3 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all duration-200 hover:border-[#bd0c12] hover:shadow-md"
              >
                {/* Logo Image */}
                <div className="relative h-[70px] w-[150px] max-h-[80px] max-w-[150px] opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-contain"
                    sizes="150px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
