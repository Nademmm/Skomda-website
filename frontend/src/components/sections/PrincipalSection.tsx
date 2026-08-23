import Image from "next/image";

export default function PrincipalSection() {
  return (
    <section
      id="sambutan"
      className="relative w-full overflow-hidden bg-white py-16 lg:py-24 shadow-sm"
      data-node-id="67:2"
    >
      
      {/* Background Watermark Logo Telkom Schools */}
      <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 h-[450px] w-[550px] md:h-[550px] md:w-[650px] rotate-[12deg] opacity-[0.06] select-none">
        <Image
          src="/figma/logo-telkom-schools.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 xl:gap-20">
          
          {/* Left Column: Authentic Kepsek Graphic (Figma 96:350 background + 67:118 person) */}
          <div className="flex flex-col items-center justify-center shrink-0 pt-4 sm:pt-10 lg:pt-12">
            <div className="relative h-[293px] sm:h-[353px] w-[340px] sm:w-[409px] flex items-center justify-center transition-transform duration-300 hover:scale-105">
              
              {/* 1. Background Art from Figma (Node 96:350 / image 6) */}
              <div
                className="absolute inset-0 pointer-events-none"
                data-node-id="96:350"
                data-name="image 6"
              >
                <Image
                  src="/figma/image6.png"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* 2. Kepsek Person Photo shifted higher up and slightly to the left */}
              <div
                className="absolute -top-[60px] sm:-top-12 bottom-5 sm:bottom-11 left-[7%] sm:left-[7.5%] w-[80%] pointer-events-none flex items-center justify-center"
                data-node-id="67:118"
                data-name="kepsek"
              >
                <div className="relative w-full h-full scale-[1.10] origin-bottom">
                  <Image
                    src="/figma/kepsek.png"
                    alt="Abror S.Hum., M.Pd. - Kepala Sekolah SMK Telkom Sidoarjo"
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

            </div>

            {/* Kepsek Name below photo on mobile/tablet */}
            <div className="mt-4 flex flex-col items-center text-center lg:hidden">
              <div className="mb-2 h-0.5 w-10 rounded-full bg-black/80" />
              <h3 className="font-poppins text-lg font-semibold text-[#101828]">
                Abror S.Hum., M.Pd.
              </h3>
              <p className="font-poppins text-sm text-[#787878]">
                Kepala SMK Telkom Sidoarjo
              </p>
            </div>
          </div>

          {/* Right Column: Sambutan Message (Tightly & Cleanly Spaced) */}
          <div className="z-10 flex flex-col items-start max-w-[540px]">
            
            {/* Sambutan Badge with Icon */}
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] px-4 py-1.5 border border-gray-200">
              <span className="relative size-5 shrink-0">
                <Image
                  src="/figma/icon-profile.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <span className="font-poppins text-sm sm:text-base font-medium text-[#515151]">
                Sambutan
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-[#101828]">
              <span>Kepala Sekolah </span>
              <br />
              <span className="text-[#bc0c11]">SMK Telkom Sidoarjo</span>
            </h2>

            {/* Accent Line Underline */}
            <div className="mt-3 mb-5 h-1 w-14 rounded-full bg-[#bc0c11]" />

            {/* Sambutan Paragraph Text */}
            <p className="font-poppins text-sm sm:text-[15px] leading-relaxed text-[#515151]">
              Selamat datang di website resmi SMK Telkom Sidoarjo. Sebagai institusi pendidikan vokasi yang berfokus pada bidang teknologi dan informatika, kami berkomitmen mencetak generasi yang tidak hanya unggul dalam kompetensi, tetapi juga berkarakter dan siap menghadapi tantangan era digital. Semoga kehadiran website ini menjadi jendela informasi yang bermanfaat bagi seluruh masyarakat.
            </p>

            {/* Desktop Signature Name with horizontal bar */}
            <div className="mt-7 hidden lg:flex items-center gap-3">
              <div className="h-0.5 w-8 rounded-full bg-black/80" />
              <span className="font-poppins font-medium text-lg text-black">
                Abror S.Hum., M.Pd.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
