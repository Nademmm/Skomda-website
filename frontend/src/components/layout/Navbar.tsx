import Link from "next/link";
import { nav, site } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-graphite/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-sm font-medium tracking-tight text-ink">
          {site.name}
        </Link>
        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow text-ink-muted transition-colors hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/kontak"
          className="eyebrow rounded-full border border-line px-4 py-2 text-ink transition-colors hover:border-signal hover:text-signal"
        >
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
}
