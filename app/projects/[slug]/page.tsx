import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { allProjectsSorted, getProjectBySlug } from '@/data/projects';
import { seo } from '@/data/profile';

const CATEGORY_LABELS: Record<string, string> = {
  fullstack: 'Full-stack',
  backend: 'Backend',
  wordpress: 'WordPress',
};

export function generateStaticParams() {
  return allProjectsSorted.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${seo.siteUrl.replace('https://', '')}`,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = allProjectsSorted.findIndex((p) => p.slug === slug);
  const prev = allProjectsSorted[index - 1];
  const next = allProjectsSorted[index + 1];

  return (
    <article className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div className="bp-grid bp-grid-fade absolute inset-0 -z-10 opacity-50" aria-hidden />

      <Container className="max-w-[860px]">
        <Link
          href="/#work"
          className="num-mono inline-flex items-center gap-1.5 text-[13px] text-slate transition-colors hover:text-blue"
        >
          <ArrowLeft size={14} /> All work
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <Chip tone="blue">{CATEGORY_LABELS[project.category]}</Chip>
          <span className="num-mono text-[13px] text-slate-light">{project.year}</span>
          {project.isFeatured && (
            <span className="num-mono text-[13px] text-blue">★ Featured build</span>
          )}
        </div>

        <h1 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-ink text-balance">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <Button href={project.liveUrl} target="_blank" rel="noreferrer" variant="primary">
              Visit live site <ExternalLink size={14} />
            </Button>
          )}
          {project.stagingUrl && (
            <Button href={project.stagingUrl} target="_blank" rel="noreferrer" variant="outline">
              View staging <ExternalLink size={14} />
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline">
              <Github size={14} /> View source
            </Button>
          )}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {[
            { label: 'Role', value: project.role },
            { label: 'Capacity', value: project.capacity },
            { label: 'Year', value: project.year },
            { label: 'Stack size', value: `${project.technologies.length} tools` },
          ].map((item) => (
            <div key={item.label} className="bg-white px-4 py-4">
              <p className="num-mono text-[11px] uppercase tracking-[0.06em] text-slate-light">
                {item.label}
              </p>
              <p className="mt-1 text-[13.5px] font-medium leading-snug text-ink">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">Overview</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{project.fullDescription}</p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">
              Responsibilities
            </h2>
            <ul className="mt-4 space-y-2.5">
              {project.responsibilities.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">
              Highlights
            </h2>
            <ul className="mt-4 space-y-2.5">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <h2 className="num-mono text-[12px] uppercase tracking-[0.08em] text-slate-light">
            Tech stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>

        {project.services && project.services.length > 0 && (
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">
              Services in this system
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.services.map((svc) => (
                <a
                  key={svc.name}
                  href={svc.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1.5 rounded-lg border border-line bg-white p-4 transition-colors hover:border-blue"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[14px] font-semibold text-ink group-hover:text-blue">
                      {svc.name}
                    </span>
                    <ArrowUpRight size={13} className="flex-shrink-0 text-slate-light group-hover:text-blue" />
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-slate">{svc.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        <nav className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-lg border border-line bg-white p-5 transition-colors hover:border-blue"
            >
              <span className="num-mono inline-flex items-center gap-1.5 text-[12px] text-slate-light">
                <ArrowLeft size={12} /> Previous
              </span>
              <p className="mt-1.5 font-display text-[15px] font-semibold text-ink group-hover:text-blue">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-lg border border-line bg-white p-5 text-right transition-colors hover:border-blue"
            >
              <span className="num-mono inline-flex items-center gap-1.5 text-[12px] text-slate-light">
                Next <ArrowRight size={12} />
              </span>
              <p className="mt-1.5 font-display text-[15px] font-semibold text-ink group-hover:text-blue">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Container>
    </article>
  );
}