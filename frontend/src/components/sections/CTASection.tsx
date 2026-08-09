import Link from "next/link";

export default function CTASection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="eyebrow mb-4 text-signal">Pendaftaran</p>
        <h2 className="mx-auto max-w-2xl font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Siap membangun karier digital sejak SMK?
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-sm text-ink-muted">
          Tim kami siap bantu jawab pertanyaan seputar jurusan, biaya, dan alur pendaftaran.
        </p>
        <div className="mt-8">
          <Link
            href="/kontak"
            className="rounded-full bg-signal px-8 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-signal-deep"
          >
            Hubungi Admisi
          </Link>
        </div>
      </div>
    </section>
  );
}
