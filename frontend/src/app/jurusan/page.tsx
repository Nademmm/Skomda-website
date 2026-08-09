import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getJurusanList } from "@/services/jurusan";

export const metadata: Metadata = {
  title: "Jurusan Vokasi — SMK Telkom Sidoarjo",
  description:
    "Pelajari 4 jurusan vokasi utama di SMK Telkom Sidoarjo: Rekayasa Perangkat Lunak (RPL), Teknik Komputer & Jaringan (TKJ), Multimedia (MM), dan Teknik Telekomunikasi (TT).",
};

// TODO: konten asli dari sekolah — data & deskripsi jurusan masih berupa draft awal
export default async function JurusanPage() {
  const jurusanList = await getJurusanList();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-graphite text-ink">
        {/* Header Hero Section */}
        <section className="border-b border-line py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow mb-3 text-signal">Jurusan Vokasi</p>
            <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
              Pilihan Keahlian Siap Kerja di Industri Digital.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink-muted sm:text-lg">
              Kurikulum SMK Telkom Sidoarjo dirancang bersama mitra industri untuk membekali siswa
              dengan keterampilan praktis, sertifikasi profesional, dan pengalaman kerja nyata.
            </p>
          </div>
        </section>

        {/* Grid List Jurusan */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {jurusanList.map((j) => (
                <Link
                  key={j.kode}
                  href={`/jurusan/${j.slug}`}
                  className="group flex flex-col justify-between gap-6 bg-graphite p-8 transition-colors hover:bg-raised md:p-10"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-signal">{j.kode}</span>
                      <span className="eyebrow text-xs text-ink-muted group-hover:text-signal transition-colors">
                        Detail Jurusan →
                      </span>
                    </div>
                    <h2 className="font-display text-2xl tracking-tight text-ink">{j.nama}</h2>
                    <p className="font-body text-sm leading-relaxed text-ink-muted">
                      {j.deskripsi}
                    </p>
                  </div>

                  <div>
                    <p className="eyebrow mb-2 text-xs text-ink-muted">Keahlian Utama:</p>
                    <ul className="flex flex-wrap gap-2">
                      {j.skills.map((skill) => (
                        <li
                          key={skill}
                          className="eyebrow rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
