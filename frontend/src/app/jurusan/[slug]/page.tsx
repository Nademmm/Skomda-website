import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getJurusanBySlug, getJurusanList } from "@/services/jurusan";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generasi metadata unik per halaman jurusan
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const jurusan = await getJurusanBySlug(slug);

  if (!jurusan) {
    return {
      title: "Jurusan Tidak Ditemukan — SMK Telkom Sidoarjo",
      description: "Halaman jurusan yang Anda cari tidak ditemukan di SMK Telkom Sidoarjo.",
    };
  }

  return {
    title: `${jurusan.nama} (${jurusan.kode}) — SMK Telkom Sidoarjo`,
    description: `Program keahlian ${jurusan.nama} (${jurusan.kode}) di SMK Telkom Sidoarjo. ${jurusan.deskripsi}`,
  };
}

// Generate static params untuk SSG/ISR
export async function generateStaticParams() {
  const list = await getJurusanList();
  return list.map((j) => ({
    slug: j.slug,
  }));
}

// TODO: konten asli dari sekolah — detail silabus & prospek karier masih dalam draft
export default async function JurusanDetailPage({ params }: Props) {
  const { slug } = await params;
  const jurusan = await getJurusanBySlug(slug);

  if (!jurusan) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-graphite text-ink">
        {/* Top Header & Breadcrumb */}
        <section className="border-b border-line py-12 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href="/jurusan"
              className="eyebrow mb-6 inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-signal"
            >
              ← Kembali ke Semua Jurusan
            </Link>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="eyebrow text-signal">{jurusan.kode}</span>
                <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                  {jurusan.nama}
                </h1>
              </div>
              <div className="shrink-0">
                <Link
                  href="/kontak"
                  className="eyebrow inline-block rounded-full border border-line bg-raised px-6 py-3 text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Konsultasi Pendaftaran →
                </Link>
              </div>
            </div>

            <p className="mt-6 font-body text-lg leading-relaxed text-ink-muted sm:text-xl">
              {jurusan.deskripsi}
            </p>
          </div>
        </section>

        {/* Content Section: Skills & Career Pathways */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Box 1: Keahlian & Skills */}
              <div className="rounded-2xl border border-line bg-graphite p-8 md:p-10">
                <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                  <h2 className="font-display text-2xl tracking-tight text-ink">
                    Kompetensi & Skills
                  </h2>
                  <span className="eyebrow text-xs text-signal">Keahlian</span>
                </div>
                <p className="mb-6 font-body text-sm text-ink-muted">
                  Keahlian teknis dan pengetahuan praktis yang akan dikuasai oleh siswa selama masa pembelajaran:
                </p>
                <ul className="space-y-3">
                  {jurusan.skills.map((skill, index) => (
                    <li key={skill} className="flex items-start gap-3 text-sm text-ink">
                      <span className="eyebrow font-mono text-signal">0{index + 1}.</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Prospek Karier */}
              <div className="rounded-2xl border border-line bg-graphite p-8 md:p-10">
                <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                  <h2 className="font-display text-2xl tracking-tight text-ink">
                    Prospek Karier & Industri
                  </h2>
                  <span className="eyebrow text-xs text-signal">Peluang Kerja</span>
                </div>
                <p className="mb-6 font-body text-sm text-ink-muted">
                  Jalur profesi dan peluang karier potensial bagi lulusan {jurusan.nama} di dunia kerja:
                </p>
                <ul className="space-y-3">
                  {jurusan.prospek_karier.map((career, index) => (
                    <li key={career} className="flex items-start gap-3 text-sm text-ink">
                      <span className="eyebrow font-mono text-signal">✓</span>
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div className="mt-12 rounded-2xl border border-line bg-raised p-8 text-center md:p-12">
              <h3 className="font-display text-2xl text-ink md:text-3xl">
                Tertarik Mengembangkan Karier di Bidang {jurusan.nama}?
              </h3>
              <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink-muted">
                Bergabunglah bersama SMK Telkom Sidoarjo dan raih sertifikasi industri standar nasional & internasional.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  href="/kontak"
                  className="eyebrow rounded-full border border-line bg-signal px-6 py-3 text-graphite transition-opacity hover:opacity-90 font-medium"
                >
                  Daftar Sekarang
                </Link>
                <Link
                  href="/jurusan"
                  className="eyebrow rounded-full border border-line px-6 py-3 text-ink hover:border-signal transition-colors"
                >
                  Lihat Jurusan Lain
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
