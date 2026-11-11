import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectsFilter } from '@/components/sections/ProjectsFilter';
import { allProjectsSorted } from '@/data/projects';

const description =
  'Every project with a case study: AI agents and RAG platforms, multi-tenant SaaS, and full-stack products, with links to live demos and repos.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects — Olusegun Ibraheem',
    description,
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <section className="pt-28 pb-24 sm:pt-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Work"
          title="All projects"
          description="Case studies, live demos and repos. Filter by category."
        />
        <div className="mt-10">
          <ProjectsFilter projects={allProjectsSorted} />
        </div>
      </Container>
    </section>
  );
}
