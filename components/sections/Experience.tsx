'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ExperienceModal } from '@/components/sections/ExperienceModal';
import { experience, type ExperienceItem } from '@/data/experience';

function formatRange(start: string, end: string | null) {
  const fmt = (d: string) => {
    const [y, m] = d.split('-');
    const date = new Date(Number(y), Number(m) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
}

/**
 * The highlights live in a <details>, so they are in the server HTML and expand
 * inline without JS. With JS, the summary opens ExperienceModal instead; its
 * stretched ::after keeps the whole card clickable.
 */
function ExperienceCard({ item, onOpen }: { item: ExperienceItem; onOpen: () => void }) {
  return (
    <li className="flex">
      <article className="group relative flex w-full flex-col rounded-lg border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-blue hover:bg-blue-tint hover:shadow-[0_12px_32px_-12px_rgba(15,44,102,0.28)] has-[summary:focus-visible]:border-blue motion-reduce:hover:translate-y-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">{item.role}</h3>
          {item.isCurrent && (
            <span className="num-mono inline-flex items-center gap-1 rounded-full bg-blue-tint px-2 py-0.5 text-[11px] font-medium text-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden /> Current
            </span>
          )}
        </div>
        <p className="mt-1 text-[13.5px] font-medium text-blue">{item.company}</p>
        <p className="num-mono mt-1 text-[12px] text-slate-light">{formatRange(item.startDate, item.endDate)}</p>

        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-slate">{item.summary}</p>

        <details className="mt-4">
          <summary
            onClick={(event) => {
              event.preventDefault();
              onOpen();
            }}
            aria-haspopup="dialog"
            className="flex cursor-pointer list-none items-center gap-1.5 text-[12.5px] font-medium text-slate transition-colors after:absolute after:inset-0 after:rounded-lg after:content-[''] group-hover:text-blue [&::-webkit-details-marker]:hidden"
          >
            View {item.achievements.length} highlights
            <span className="sr-only">for {item.role} at {item.company}</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </summary>
          <ul className="mt-3 space-y-2.5">
            {item.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue" aria-hidden />
                {achievement}
              </li>
            ))}
          </ul>
        </details>
      </article>
    </li>
  );
}

/** Résumé tab panel: roles as cards; each opens ExperienceModal with its highlights. */
export function Experience() {
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {experience.map((item) => (
          <ExperienceCard
            key={`${item.company}-${item.startDate}`}
            item={item}
            onOpen={() => setSelected(item)}
          />
        ))}
      </ol>

      <ExperienceModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
