import { about } from '@/data/profile';

/** Résumé tab panel: profile summary and headline metrics. */
export function About() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div>
        <p className="font-display text-xl font-medium leading-snug text-ink text-balance sm:text-2xl">
          {about.tagline}
        </p>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate">{about.summary}</p>
      </div>

      <dl className="self-start rounded-lg border border-line bg-surface">
        {about.metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={`flex items-center justify-between gap-4 px-6 py-5 ${
              i !== about.metrics.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <dt className="num-mono text-[13px] uppercase tracking-[0.06em] text-slate">{metric.label}</dt>
            <dd className="font-display text-2xl font-semibold text-blue-deep">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
