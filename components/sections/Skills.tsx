import {
  Layers,
  RefreshCw,
  FlaskConical,
  Database,
  Box,
  Users,
  Gauge,
  GitBranch,
  Cloud,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Chip } from '@/components/ui/Chip';
import { skillGroups, engineeringPractices } from '@/data/skills';

const PRACTICE_ICONS = [Layers, RefreshCw, FlaskConical, Database, Box, Users, Gauge, GitBranch, Cloud];

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="03 — Capabilities"
            title="Tools and practices"
            description="The languages, frameworks, and infrastructure I reach for — and the engineering practices I hold myself to on every build."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={i * 70}
              className="rounded-lg border border-line bg-white p-5"
            >
              <p className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">
                {group.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-16">
          <p className="num-mono text-[12px] uppercase tracking-[0.08em] text-slate-light">
            Engineering practices
          </p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {engineeringPractices.map((practice, i) => {
              const Icon = PRACTICE_ICONS[i % PRACTICE_ICONS.length];
              return (
                <div
                  key={practice.title}
                  className="flex items-center gap-3 bg-white px-5 py-4 transition-colors hover:bg-blue-tint"
                >
                  <Icon size={17} className="flex-shrink-0 text-blue" />
                  <span className="text-[14.5px] font-medium text-ink-soft">{practice.title}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
