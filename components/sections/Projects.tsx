import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
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
            eyebrow="05 — Selected Work"
            title="Products I've built and shipped"
            description="A selection of work across SaaS platforms, internal services, and client engagements — ranked by scope and impact."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 100}
              className="group flex flex-col rounded-lg border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue hover:shadow-[0_20px_40px_-20px_rgba(15,44,102,0.3)]"
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
                      <Github size={16} />
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

        <Reveal delay={120} className="mt-20">
          <p className="num-mono mb-1 text-[12px] uppercase tracking-[0.08em] text-slate-light">
            More builds
          </p>
          <p className="mb-6 text-sm text-slate">
            Internal services and client engagements — filter by category.
          </p>
          <ProjectsFilter projects={otherProjects} />
        </Reveal>
      </Container>
    </section>
  );
}
