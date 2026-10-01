import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

function GitHubSvg({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Chip } from '@/components/ui/Chip';
import { ProjectsFilter } from '@/components/sections/ProjectsFilter';
import { featuredProjects, allProjectsSorted } from '@/data/projects';

export function Projects() {
  const otherProjects = allProjectsSorted.filter((p) => !p.isFeatured);

  return (
    <section id="work" className="py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="06 — Selected Work"
            title="Recent projects"
            description="A selection of some of my recent works"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 100}
              className="group flex flex-col rounded-lg border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-blue hover:shadow-[0_20px_40px_-20px_rgba(15,44,102,0.3)]"
            >
              <div className="flex items-center justify-between">
                <span className="num-mono text-[12px] text-slate-light">
                  0{i + 1} / {String(featuredProjects.length).padStart(2, '0')}
                </span>
                <span className="num-mono text-[12px] text-slate-light">{project.year}</span>
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{project.title}</h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-slate">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Chip key={tech} className="px-2 py-0.5 text-[11px]">
                    {tech}
                  </Chip>
                ))}
                {project.technologies.length > 4 && (
                  <Chip className="px-2 py-0.5 text-[11px]" tone="blue">
                    +{project.technologies.length - 4}
                  </Chip>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[13.5px] font-medium text-blue transition-colors hover:text-blue-deep"
                >
                  Read case study
                </Link>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="text-slate-light transition-colors hover:text-blue"
                    >
                      <GitHubSvg size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                      className="text-slate-light transition-colors hover:text-blue"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <Reveal delay={120} className="mt-20">
            <p className="num-mono mb-1 text-[12px] uppercase tracking-[0.08em] text-slate-light">
              More builds
            </p>
            <p className="mb-6 text-sm text-slate">
              Internal services and client engagements — filter by category.
            </p>
            <ProjectsFilter projects={otherProjects} />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
