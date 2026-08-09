import Link from "next/link";
import SignalGrid from "./SignalGrid";
import { site } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="eyebrow mb-6 text-signal">SMK TELKOM SIDOARJO — SEKOLAH VOKASI</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Menyiapkan lulusan yang{" "}
            <span className="text-signal">langsung terpakai</span> di industri digital.
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-muted">
            {site.tagline}. Empat jurusan vokasi, sembilan spesialisasi Digital Talent
            Program, dan jalur langsung ke industri lewat BKK.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/jurusan"
              className="rounded-full bg-signal px-6 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-signal-deep"
            >
              Lihat Jurusan
            </Link>
            <Link
              href="/dtp"
              className="rounded-full border border-line px-6 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Digital Talent Program
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <SignalGrid />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-grid-fade" />
    </section>
  );
}
