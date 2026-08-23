import Image from "next/image";

const partners = [
  {
    name: "Axelbit",
    src: "/figma/partner-axelbit.png",
  },
  {
    name: "DigiPrener",
    src: "/figma/partner-digiprener.png",
  },
  {
    name: "Jagoan Hosting",
    src: "/figma/partner-jagoanhosting.png",
  },
  {
    name: "Markaz Design",
    src: "/figma/partner-markazdesign.png",
  },
  {
    name: "PT Garuda Telekomunikasi Indonesia",
    src: "/figma/partner-garuda.png",
  },
  {
    name: "PT Global Infra Teknologi",
    src: "/figma/partner-globalinfra.png",
  },
  {
    name: "PT Javacreatiox Network Intermedia",
    src: "/figma/partner-javacreatiox.png",
  },
  {
    name: "PT Radnet Digital Indonesia",
    src: "/figma/partner-radnet.png",
  },
];

export default function PartnersSection() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="relative w-full bg-[#f3f4f6] py-8 overflow-hidden" data-node-id="95:312">
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
