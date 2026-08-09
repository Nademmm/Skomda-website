import Link from "next/link";
import { beritaPreview } from "@/lib/data";

export default function BeritaPreview() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-signal">Berita &amp; Kegiatan</p>
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Apa yang sedang terjadi di sekolah.
            </h2>
          </div>
          <Link
            href="/berita"
            className="eyebrow shrink-0 text-ink-muted transition-colors hover:text-signal"
          >
            Semua berita →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {beritaPreview.map((post) => (
            <Link
              key={post.slug}
              href={`/berita/${post.slug}`}
              className="group flex flex-col gap-3 border-t border-line pt-6 transition-colors"
            >
              <span className="eyebrow text-ink-muted">{post.category}</span>
              <h3 className="font-display text-lg leading-snug text-ink group-hover:text-signal">
                {post.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
