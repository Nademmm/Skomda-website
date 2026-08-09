import { stats } from "@/lib/data";

export default function StatsStrip() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 py-8 sm:px-8">
            <span className="font-display text-4xl text-signal">{stat.value}</span>
            <span className="eyebrow text-ink-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
