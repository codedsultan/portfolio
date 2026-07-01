'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
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

function ExperienceCard({
  item,
  index,
  onOpen,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  onOpen: () => void;
  isLast: boolean;
}) {
  return (
    <Reveal as="li" delay={index * 70} className="relative pl-8">
      {!isLast && (
        <span className="absolute left-[5px] top-5 bottom-[-1rem] w-px bg-line-strong" aria-hidden />
      )}
      <span
        className={`absolute left-0 top-2 flex h-[10px] w-[10px] items-center justify-center rounded-full border-2 transition-colors ${item.isCurrent ? 'border-blue bg-blue' : 'border-line-strong bg-white'
          }`}
        aria-hidden
      />

      <button
        type="button"
        onClick={onOpen}
        className="group w-full rounded-lg border border-line bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-blue hover:shadow-[0_8px_24px_-12px_rgba(15,44,102,0.2)]"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[15px] font-semibold leading-snug text-ink">
                {item.role}
              </span>
              {item.isCurrent && (
                <span className="num-mono inline-flex items-center gap-1 rounded-full bg-blue-tint px-2 py-0.5 text-[11px] font-medium text-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden /> Current
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[13.5px] font-medium text-blue">{item.company}</p>
          </div>
          <span className="num-mono flex-shrink-0 text-[12px] text-slate-light">
            {formatRange(item.startDate, item.endDate)}
          </span>
        </div>

        <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-relaxed text-slate">
          {item.summary}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] font-medium text-blue opacity-0 transition-opacity group-hover:opacity-100">
          View {item.achievements.length} highlights <ArrowRight size={12} />
        </div>
      </button>
    </Reveal>
  );
}

export function Experience() {
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <>
      <section id="experience" className="bg-panel py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="02 — Experience"
              title="Where I've built"
              description="Click any role to see the full scope of work and key achievements."
            />
          </Reveal>

          <ol className="relative mt-14 space-y-4">
            {experience.map((item, i) => (
              <ExperienceCard
                key={`${item.company}-${item.startDate}`}
                item={item}
                index={i}
                isLast={i === experience.length - 1}
                onOpen={() => setSelected(item)}
              />
            ))}
          </ol>
        </Container>
      </section>

      <ExperienceModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}