import { HomeHero } from '@/components/home/HomeHero';
import { WorkGrid } from '@/components/home/WorkGrid';
import { ContactStrip } from '@/components/home/ContactStrip';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';

export default function Home() {
  return (
    <>
      <HomeHero />
      <WorkGrid />
      <About />
      <Experience />
      <Skills />
      <Education />
      <ContactStrip />
    </>
  );
}
