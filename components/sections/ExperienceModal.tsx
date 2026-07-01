'use client';

import { useEffect, useRef } from 'react';
import { X, MapPin, Briefcase } from 'lucide-react';
import type { ExperienceItem } from '@/data/experience';

function formatRange(start: string, end: string | null) {
  const fmt = (d: string) => {
    const [y, m] = d.split('-');
    const date = new Date(Number(y), Number(m) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
}

interface ExperienceModalProps {
  item: ExperienceItem | null;
  onClose: () => void;
}

export function ExperienceModal({ item, onClose }: ExperienceModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end sm:items-stretch"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.role} at ${item.company} — details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 flex h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-white sm:h-full sm:max-w-[520px] sm:rounded-none sm:border-l sm:border-t-0"
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 flex-shrink-0 rounded-full ${item.isCurrent ? 'bg-blue' : 'bg-line-strong'}`}
                aria-hidden
              />
              <span className="num-mono text-[12px] uppercase tracking-[0.06em] text-slate-light">
                {item.employmentType}
              </span>
            </div>
            <h2 className="mt-1.5 font-display text-[17px] font-semibold leading-snug text-ink">
              {item.role}
            </h2>
            <p className="mt-0.5 text-sm font-medium text-blue">{item.company}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 rounded-md p-1.5 text-slate-light transition-colors hover:bg-blue-tint hover:text-blue"
          >
            <X size={18} />
          </button>
        </div>

        {/* Meta strip */}
        <div className="flex flex-shrink-0 flex-wrap items-center gap-x-5 gap-y-1.5 border-b border-line bg-panel px-6 py-3">
          <span className="flex items-center gap-1.5 text-[13px] text-slate">
            <MapPin size={13} className="text-slate-light" />
            {item.location}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] text-slate">
            <Briefcase size={13} className="text-slate-light" />
            {formatRange(item.startDate, item.endDate)}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-[14.5px] leading-relaxed text-slate">{item.summary}</p>

          <div className="mt-6">
            <p className="num-mono mb-4 text-[11.5px] uppercase tracking-[0.08em] text-blue">
              Key achievements
            </p>
            <ul className="space-y-3.5">
              {item.achievements.map((ach, i) => (
                <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue" aria-hidden />
                  {ach}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-line bg-panel px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="num-mono w-full rounded-md border border-line-strong bg-white py-2.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-blue hover:text-blue"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
