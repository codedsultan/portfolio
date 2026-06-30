import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { experience } from '@/data/experience';

function formatRange(start: string, end: string | null) {
  const fmt = (d: string) => {
    const [y, m] = d.split('-');
    const date = new Date(Number(y), Number(m) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
}

export function Experience() {
  return (
    <section id="experience" className="bg-panel py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="02 — Experience"
            title="Where I've built"
            description="A timeline of roles where I shipped production systems, led delivery, and mentored other engineers."
          />
        </Reveal>

        <ol className="relative mt-14">
          <span className="absolute left-[5px] top-1 bottom-1 w-px bg-line-strong" aria-hidden />

          {experience.map((item, i) => (
            <Reveal as="li" key={item.company} delay={i * 90} className="relative mb-12 pl-9 last:mb-0">
              <span
                className={`absolute left-0 top-1.5 h-[10px] w-[10px] rounded-full border-2 ${
                  item.isCurrent ? 'border-blue bg-blue' : 'border-line-strong bg-white'
                }`}
                aria-hidden
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.role} <span className="text-blue">· {item.company}</span>
                </h3>
                <span className="num-mono whitespace-nowrap text-[13px] text-slate-light">
                  {formatRange(item.startDate, item.endDate)}
                </span>
              </div>

              <p className="num-mono mt-1 text-[12.5px] uppercase tracking-[0.04em] text-slate-light">
                {item.location} · {item.employmentType}
              </p>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate">{item.summary}</p>

              <ul className="mt-4 space-y-2">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue" aria-hidden />
                    {achievement}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
