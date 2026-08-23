import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="relative block h-10 w-[140px]">
              <Image
                src="/figma/logo-smk-telkom.png"
                alt="SMK Telkom Sidoarjo"
                fill
                className="object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm font-poppins text-sm leading-relaxed text-[#515151]">
              Sekolah Tangguh, Berakhlak, & Berwawasan Digital. Membentuk generasi unggul yang siap berkarya, berinovasi, dan berdampak di era industri teknologi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-jakarta text-sm font-bold uppercase tracking-wider text-[#101828]">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-2.5 font-poppins text-sm text-[#515151]">
              <li>
                <Link href="/" className="hover:text-[#bc0c11] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#sambutan" className="hover:text-[#bc0c11] transition-colors">
                  Sambutan Kepala Sekolah
                </Link>
              </li>
              <li>
                <Link href="#program" className="hover:text-[#bc0c11] transition-colors">
                  Program Keahlian
                </Link>
              </li>
              <li>
                <Link href="#informasi" className="hover:text-[#bc0c11] transition-colors">
                  Informasi &amp; Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-jakarta text-sm font-bold uppercase tracking-wider text-[#101828]">
              Jurusan
            </h4>
            <ul className="mt-4 space-y-2.5 font-poppins text-sm text-[#515151]">
              <li>
                <span className="font-medium text-[#101828]">SIJA</span> — Sistem Informasi Jaringan & Aplikasi
              </li>
              <li>
                <span className="font-medium text-[#101828]">TJAT</span> — Teknik Jaringan Akses Telekomunikasi
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-jakarta text-sm font-bold uppercase tracking-wider text-[#101828]">
              Pendaftaran
            </h4>
            <ul className="mt-4 space-y-2.5 font-poppins text-sm text-[#515151]">
              <li>
                <Link href="#ppdb" className="font-semibold text-[#bc0c11] hover:underline">
                  PPDB Online →
                </Link>
              </li>
              <li>
                <Link href="#trial-class" className="hover:text-[#bc0c11] transition-colors">
                  Trial Class
                </Link>
              </li>
              <li>
                <Link href="#lab-tour" className="hover:text-[#bc0c11] transition-colors">
                  Lab Tour
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-100 pt-8 sm:flex-row">
          <p className="font-poppins text-xs text-[#787878]">
            © {new Date().getFullYear()} SMK Telkom Sidoarjo. All rights reserved.
          </p>
          <p className="mt-4 font-poppins text-xs text-[#787878] sm:mt-0">
            Yayasan Pendidikan Telkom (YPT)
          </p>
        </div>
      </div>
    </footer>
  );
}
