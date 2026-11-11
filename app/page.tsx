import { HomeHero } from '@/components/home/HomeHero';
import { WorkGrid } from '@/components/home/WorkGrid';
import { ResumeSection } from '@/components/home/ResumeSection';
import { ContactStrip } from '@/components/home/ContactStrip';

export default function Home() {
  return (
    <>
      <HomeHero />
      <WorkGrid />
      <ResumeSection />
      <ContactStrip />
    </>
  );
}
