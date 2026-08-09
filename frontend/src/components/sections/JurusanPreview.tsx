import Link from "next/link";
import { jurusanList } from "@/lib/data";

export default function JurusanPreview() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-signal">Jurusan</p>
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Empat jalur vokasi, satu arah: siap kerja.
            </h2>
          </div>
          <Link
            href="/jurusan"
            className="eyebrow shrink-0 text-ink-muted transition-colors hover:text-signal"
          >
            Lihat semua jurusan →
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {jurusanList.map((j) => (
            <Link
              key={j.code}
              href={`/jurusan/${j.code.toLowerCase()}`}
              className="group flex flex-col gap-4 bg-graphite p-8 transition-colors hover:bg-raised"
            >
              <span className="eyebrow text-signal">{j.code}</span>
              <h3 className="font-display text-xl text-ink">{j.name}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-muted">{j.summary}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {j.skills.map((skill) => (
                  <li
                    key={skill}
                    className="eyebrow rounded-full border border-line px-3 py-1 text-ink-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
