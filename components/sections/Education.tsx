import { GraduationCap, BadgeCheck, GitMerge, ExternalLink } from 'lucide-react';
import { education, certifications, openSourceContributions } from '@/data/education';

const LABEL = 'num-mono mb-5 text-[12px] uppercase tracking-[0.08em] text-blue';

/** Résumé tab panel: education, certifications and open-source contributions. */
export function Education() {
  return (
    <>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className={LABEL}>Education</h3>
          <ul className="space-y-4">
            {education.map((item) => (
              <li key={item.school} className="rounded-lg border border-line bg-surface p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue">
                    <GraduationCap size={19} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold leading-snug text-ink">{item.program}</p>
                    <p className="mt-1 text-sm text-slate">{item.school}</p>
                    <p className="num-mono mt-2 text-[12.5px] uppercase tracking-[0.04em] text-slate-light">
                      {item.date}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={LABEL}>Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li key={cert.name} className="rounded-lg border border-line bg-surface p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue">
                    <BadgeCheck size={19} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold leading-snug text-ink">{cert.name}</p>
                    <p className="mt-1 text-sm text-slate">{cert.issuer}</p>
                    <p className="num-mono mt-2 text-[12.5px] uppercase tracking-[0.04em] text-slate-light">
                      {cert.date}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="open-source" className="mt-12">
        <h3 className={LABEL}>Open source</h3>
        <ul className="space-y-6">
          {openSourceContributions.map((contrib) => (
            <li key={contrib.project} className="rounded-lg border border-line bg-surface p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-tint text-blue">
                  <GitMerge size={20} aria-hidden />
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
                      <ExternalLink size={16} className="text-slate-light" aria-hidden />
                    </a>
                    <span className="num-mono text-[12px] text-blue">
                      {contrib.tech} · {contrib.date}
                    </span>
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
