import { GraduationCap, BadgeCheck, GitMerge, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { education, certifications, openSourceContributions } from '@/data/education';

export function Education() {
  return (
    <>
      {/* 04 — Credentials (Education & Certifications) */}
      <section id="education" className="bg-panel py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="04 — Credentials" title="Education & Certifications" />
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
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

      {/* 05 — Open Source */}
      <section id="open-source" className="bg-panel pb-24 sm:pb-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="05 — Open Source" title="Ecosystem & Contributions" />
          </Reveal>

          <div className="mt-12 space-y-6">
            {openSourceContributions.map((contrib, i) => (
              <Reveal key={contrib.project} delay={i * 80} className="rounded-lg border border-line bg-white p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue">
                    <GitMerge size={20} />
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <a
                        href={contrib.website}
                        target="_blank"
                        rel="noreferrer"
                        className="font-display flex items-center gap-1.5 text-lg font-semibold text-ink transition-colors hover:text-blue"
                      >
                        {contrib.project}
                        <ExternalLink size={16} className="text-slate-light" />
                      </a>
                      <span className="num-mono text-[12px] text-blue">{contrib.tech} · {contrib.date}</span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate">{contrib.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {contrib.repos.map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="num-mono inline-flex items-center gap-1 rounded border border-line-strong px-2.5 py-1 text-[11.5px] text-ink-soft transition-colors hover:border-blue hover:text-blue"
                        >
                          {repo.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}