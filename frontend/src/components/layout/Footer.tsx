import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.city}.
        </p>
        <p className="eyebrow text-ink-muted">Dibangun untuk masa depan digital.</p>
      </div>
    </footer>
  );
}
