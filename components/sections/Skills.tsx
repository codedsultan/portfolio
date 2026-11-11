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
import { Chip } from '@/components/ui/Chip';
import { skillGroups, engineeringPractices } from '@/data/skills';

const PRACTICE_ICONS = [Layers, RefreshCw, FlaskConical, Database, Box, Users, Gauge, GitBranch, Cloud];

/** Résumé tab panel: skill groups and engineering practices. */
export function Skills() {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.category} className="rounded-lg border border-line bg-surface p-5">
            <h3 className="num-mono text-[12px] uppercase tracking-[0.08em] text-blue">{group.label}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="num-mono text-[12px] uppercase tracking-[0.08em] text-slate-light">
          Engineering practices
        </h3>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {engineeringPractices.map((practice, i) => {
            const Icon = PRACTICE_ICONS[i % PRACTICE_ICONS.length];
            return (
              <li
                key={practice.title}
                className="flex items-center gap-3 bg-surface px-5 py-4 transition-colors hover:bg-blue-tint"
              >
                <Icon size={17} className="flex-shrink-0 text-blue" aria-hidden />
                <span className="text-[14.5px] font-medium text-ink-soft">{practice.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
