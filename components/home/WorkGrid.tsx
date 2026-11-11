import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProjectCover } from '@/components/ui/ProjectShot';
import { featuredProjects } from '@/data/projects';

export function WorkGrid() {
  return (
    <section id="work" aria-labelledby="work-heading" className="mt-16 sm:mt-20">
      <Container>
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="work-heading" className="font-display text-[28px] font-semibold tracking-tight text-ink">
            Selected work
          </h2>
          <Link href="/projects" className="text-sm font-medium text-blue hover:underline">
            All projects
          </Link>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="flex">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-[10px] border border-line bg-surface transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-blue hover:shadow-[0_16px_32px_-20px_rgba(15,44,102,0.35)] motion-reduce:hover:translate-y-0"
              >
                {project.cover ? (
                  <ProjectCover
                    image={project.cover}
                    decorative
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="border-b border-line"
                  />
                ) : (
                  <div className="aspect-[16/10] w-full border-b border-line bg-blue-tint-2" aria-hidden />
                )}
                <div className="flex flex-col gap-1.5 px-[18px] pt-4 pb-[18px]">
                  <h3 className="font-display text-[17px] font-semibold text-ink">{project.title}</h3>
                  <p className="line-clamp-2 text-sm leading-normal text-slate">{project.description}</p>
                </div>
              </Link>
            </li>
          ))}
          <li className="flex">
            <Link
              href="/projects"
              className="group flex min-h-40 w-full flex-col items-center justify-center rounded-[10px] border border-dashed border-line-strong px-6 py-8 text-center transition-colors hover:border-blue hover:bg-blue-tint"
            >
              <span className="inline-flex items-center gap-2 font-display text-xl font-semibold text-blue">
                All projects
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                />
              </span>
              <span className="mt-1.5 text-sm text-slate">Case studies and repos</span>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
