import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { about } from '@/data/profile';

export function About() {
  return (
    <section id="profile" className="py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal delay={80}>
            <p className="font-display text-xl font-medium leading-snug text-ink text-balance sm:text-2xl">
              {about.tagline}
            </p>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate">
              {about.summary}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-lg border border-line bg-panel">
              {about.metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`flex items-center justify-between gap-4 px-6 py-5 ${
                    i !== about.metrics.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <span className="num-mono text-[13px] uppercase tracking-[0.06em] text-slate">
                    {metric.label}
                  </span>
                  <span className="font-display text-2xl font-semibold text-blue-deep">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
