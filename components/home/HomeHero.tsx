import { Container } from '@/components/ui/Container';
import { AskPanel } from '@/components/home/AskPanel';
import { askIntro } from '@/data/answers';
import { hero } from '@/data/profile';

export function HomeHero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-28 sm:pt-32">
      <Container>
        <p className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">{hero.eyebrow}</p>
        <h1
          id="hero-heading"
          className="mt-3.5 max-w-[820px] font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance"
        >
          {askIntro.title}
        </h1>
        <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-slate sm:text-lg">
          {askIntro.text}
        </p>
        <AskPanel />
      </Container>
    </section>
  );
}
