import { GraduationCap, BadgeCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { education, certifications } from '@/data/education';

export function Education() {
  return (
    <section id="education" className="bg-panel py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="04 — Credentials" title="Education & Certifications" />
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Education */}
          <div>
            <Reveal>
              <p className="num-mono mb-5 text-[12px] uppercase tracking-[0.08em] text-blue">
                Education
              </p>
            </Reveal>
            <div className="space-y-4">
              {education.map((item, i) => (
                <Reveal key={item.school} delay={i * 80} className="rounded-lg border border-line bg-white p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue">
                      <GraduationCap size={19} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold leading-snug text-ink">
                        {item.program}
                      </h3>
                      <p className="mt-1 text-sm text-slate">{item.school}</p>
                      <p className="num-mono mt-2 text-[12.5px] uppercase tracking-[0.04em] text-slate-light">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <Reveal>
              <p className="num-mono mb-5 text-[12px] uppercase tracking-[0.08em] text-blue">
                Certifications
              </p>
            </Reveal>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 80} className="rounded-lg border border-line bg-white p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue">
                      <BadgeCheck size={19} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold leading-snug text-ink">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate">{cert.issuer}</p>
                      <p className="num-mono mt-2 text-[12.5px] uppercase tracking-[0.04em] text-slate-light">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
