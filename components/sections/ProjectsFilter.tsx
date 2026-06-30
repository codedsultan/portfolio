'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

const CATEGORY_LABELS: Record<Project['category'], string> = {
  platform: 'Platform',
  fullstack: 'Full-stack',
  backend: 'Backend',
};

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const present = Array.from(new Set(projects.map((p) => p.category)));
    return ['all' as const, ...present];
  }, [projects]);

  const [active, setActive] = useState<'all' | Project['category']>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              'num-mono rounded-full border px-3.5 py-1.5 text-[12.5px] tracking-tight transition-colors',
              active === cat
                ? 'border-blue bg-blue text-white'
                : 'border-line-strong bg-white text-slate hover:border-blue hover:text-blue',
            )}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col rounded-lg border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue hover:shadow-[0_12px_28px_-16px_rgba(15,44,102,0.25)]"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">
                {project.title}
              </h3>
              <ArrowUpRight
                size={15}
                className="mt-1 flex-shrink-0 text-slate-light transition-colors group-hover:text-blue"
              />
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate line-clamp-3">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <Chip key={tech} className="px-2 py-0.5 text-[11px]">
                  {tech}
                </Chip>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}