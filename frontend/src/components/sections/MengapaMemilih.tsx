import Image from "next/image";
import Link from "next/link";

export default function MengapaMemilih() {
  const whyCards = [
    {
      id: "01",
      title: "Kurikulum Berbasis Industri",
      description:
        "Kurikulum vokasi terkini yang diselaraskan langsung dengan standar DUDI (Dunia Usaha & Dunia Industri) dan ekosistem digital Telkom Group.",
    },
    {
      id: "02",
      title: "Fasilitas & Lab Modern",
      description:
        "Didukung laboratorium komputer, jaringan fiber optik, dan perangkat teknologi berstandar industri untuk praktikum optimal setiap hari.",
    },
    {
      id: "03",
      title: "Penyaluran Karir Terpercaya",
      description:
        "Jejaring kerjasama luas dengan berbagai perusahaan mitra untuk magang, sertifikasi profesional, hingga penyaluran kerja langsung bagi alumni.",
    },
  ];

  return (
    <section className="w-full bg-[#f3f4f6] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Header Row: Title on left + Button on right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#101828]">
              Mengapa memilih
            </h2>
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e7000b]">
              SMK Telkom Sidoarjo?
            </span>
          </div>

          {/* CTA Daftar Sekarang */}
          <div className="shrink-0">
            <Link
              href="#ppdb"
              className="group inline-flex items-center gap-3 rounded-full bg-[#bd0c12] px-7 py-3.5 text-base font-medium text-white shadow-card transition-all hover:bg-[#990a0e] hover:shadow-lg active:scale-[0.98]"
              style={{
                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), inset 0px -4px 2px 0px rgba(0,0,0,0.25)",
              }}
            >
              <span>Daftar Sekarang</span>
              <span className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1">
                <Image
                  src="/figma/lucide-move-right.svg"
                  alt=""
                  fill
                  className="object-contain brightness-0 invert"
                />
              </span>
            </Link>
          </div>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-2xl bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100/80 flex flex-col justify-between"
              style={{ minHeight: "155px" }}
            >
              <div>
                <h3 className="font-jakarta text-lg sm:text-xl font-bold text-[#101828]">
                  {card.title}
                </h3>
                <p className="mt-3 font-poppins text-sm leading-relaxed text-[#515151]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
