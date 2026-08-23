import Image from "next/image";

export default function SambutanKepsek() {
  return (
    <section id="sambutan" className="relative w-full overflow-hidden bg-white py-16 lg:py-24 shadow-sm">
      
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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 xl:gap-24">
          
          {/* Left Column: Kepsek Photo with Signature Styled Frames */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative flex items-center justify-center">
              
              {/* Dashed Border Frame (Shifted to Top-Left) */}
              <div
                className="absolute -left-4 -top-4 sm:-left-5 sm:-top-5 h-[330px] sm:h-[350px] w-[260px] sm:w-[280px] border-2 border-dashed border-gray-400/50 pointer-events-none"
                style={{ borderRadius: "40px 0 40px 0" }}
              />
              
              {/* Solid Red Curved Frame (Middle) */}
              <div
                className="relative h-[330px] sm:h-[350px] w-[260px] sm:w-[280px] overflow-hidden bg-[#bc0c11] shadow-xl"
                style={{ borderRadius: "140px 0 140px 0" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#990a0e] to-[#e7000b] opacity-85" />
              </div>

              {/* Kepsek Image Overlaid (Aligned flush to the bottom) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[340px] sm:h-[365px] w-[290px] sm:w-[320px] transition-transform duration-300 hover:scale-105 pointer-events-none">
                <Image
                  src="/figma/kepsek.png"
                  alt="Abror S.hum M.pd - Kepala Sekolah SMK Telkom Sidoarjo"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Kepsek Name below photo on mobile/tablet */}
            <div className="mt-5 flex flex-col items-center text-center lg:hidden">
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
