import { Container } from '@/components/ui/Container';
import { ResumeTabs, type ResumeTab } from '@/components/home/ResumeTabs';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';

// Panel ids are the old section ids, so /#profile, /#experience, /#skills and
// /#education keep working.
const TABS: ResumeTab[] = [
  { id: 'profile', label: 'About', panel: <About /> },
  { id: 'experience', label: 'Experience', panel: <Experience /> },
  { id: 'skills', label: 'Skills', panel: <Skills /> },
  { id: 'education', label: 'Education', aliases: ['open-source'], panel: <Education /> },
];

export function ResumeSection() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="mt-16 sm:mt-20">
      <Container>
        <h2 id="resume-heading" className="font-display text-[28px] font-semibold tracking-tight text-ink">
          Résumé
        </h2>
        <div className="mt-4">
          <ResumeTabs tabs={TABS} defaultId="experience" />
        </div>
      </Container>
    </section>
  );
}
