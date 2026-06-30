import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { hero, profile } from '@/data/profile';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bp-grid bp-grid-fade absolute inset-0 -z-10" aria-hidden />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                </span>
                <span className="num-mono text-[12.5px] tracking-tight text-ink-soft">
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="font-display text-lg font-medium text-slate sm:text-xl">
                {hero.prefix} <span className="text-ink">{hero.name}</span>
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-ink text-balance">
                {hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-[17px]">
                {hero.intro}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={hero.primaryCta.target} variant="primary">
                  {hero.primaryCta.label} <ArrowRight size={15} />
                </Button>
                <Button href={hero.secondaryCta.target} variant="outline">
                  <Mail size={15} /> {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-12 border-t border-line pt-6">
                <p className="num-mono mb-3 text-[12px] uppercase tracking-[0.08em] text-slate-light">
                  Currently shipping
                </p>
                <ul className="flex flex-wrap gap-3">
                  {hero.shipping.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm transition-colors hover:border-blue"
                      >
                        <span className="font-medium text-ink">{item.label}</span>
                        <span className="num-mono text-[12px] text-slate-light">{item.detail}</span>
                        <ArrowUpRight
                          size={13}
                          className="text-slate-light transition-colors group-hover:text-blue"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative mx-auto w-full max-w-[360px] lg:max-w-none">
            <div className="bp-corner relative">
              <span className="bp-c2" aria-hidden />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-panel p-2.5">
                <div className="relative h-full w-full overflow-hidden rounded-sm">
                  <Image
                    src="/images/profile.webp"
                    alt={`${profile.name}, ${profile.headline}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 360px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
              {/* <span className="num-mono text-[12px] uppercase tracking-[0.08em] text-slate-light">
                FIG. 01 — {profile.location.split(',')[0]}
              </span> */}
              <span className="num-mono text-[12px] text-blue">{profile.availability}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}


