'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ResumeTab {
  /** Also the panel's element id, so old links like /#experience still resolve. */
  id: string;
  label: string;
  /** Extra hashes that open this tab (e.g. #open-source sits inside Education). */
  aliases?: string[];
  panel: ReactNode;
}

/**
 * Without JS the tabs can't switch, so show every panel with its own heading.
 * Wrapped in `@layer base` because Tailwind's preflight hides [hidden] with a
 * layered !important, which beats any unlayered !important.
 */
const NO_SCRIPT_CSS =
  '@layer base{.resume-tablist{display:none!important}.resume-panel[hidden]{display:block!important}.resume-panel-heading{display:block!important}}';

function tabForHash(tabs: ResumeTab[], hash: string): ResumeTab | undefined {
  const key = decodeURIComponent(hash.replace(/^#/, ''));
  if (!key) return undefined;
  return tabs.find((tab) => tab.id === key || tab.aliases?.includes(key));
}

export function ResumeTabs({ tabs, defaultId }: { tabs: ResumeTab[]; defaultId: string }) {
  const [selectedId, setSelectedId] = useState(defaultId);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Map old section hashes (#profile, #experience, #skills, #education) to a tab,
  // on first load and whenever the hash changes, then bring the tabs into view.
  useEffect(() => {
    function scrollToTabs() {
      // Wait a frame so the panel has rendered, and for page load to finish: while
      // loading, the browser keeps scrolling to the fragment (now the unhidden
      // panel itself), which would push the tabs under the navbar.
      const run = () =>
        requestAnimationFrame(() => document.getElementById('resume')?.scrollIntoView());
      if (document.readyState === 'complete') run();
      else window.addEventListener('load', run, { once: true });
    }
    function openFromHash() {
      const tab = tabForHash(tabs, window.location.hash);
      if (!tab) return;
      setSelectedId(tab.id);
      scrollToTabs();
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [tabs]);

  function select(id: string, focus = false) {
    setSelectedId(id);
    if (focus) tabRefs.current[id]?.focus();
    // Drop a stale résumé hash so following the same link again fires `hashchange`.
    if (tabForHash(tabs, window.location.hash)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === selectedId);
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(tabs[next[event.key]].id, true);
  }

  return (
    <div>
      <noscript>
        <style>{NO_SCRIPT_CSS}</style>
      </noscript>

      <div
        role="tablist"
        aria-label="Résumé sections"
        onKeyDown={handleKeyDown}
        className="resume-tablist -mx-1 flex gap-1 sm:gap-1.5 overflow-x-auto border-b border-line px-1"
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === selectedId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={tab.id}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(tab.id)}
              className={cn(
                '-mb-px min-h-11 flex-shrink-0 rounded-t-md border-b-2 px-3 py-2.5 sm:px-[18px] text-sm font-medium transition-colors',
                isSelected
                  ? 'border-blue bg-blue-tint text-blue-deep'
                  : 'border-transparent text-slate hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={tab.id}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== selectedId}
          className="resume-panel mt-6 rounded-sm"
        >
          <h3 className="resume-panel-heading mb-4 hidden font-display text-xl font-semibold text-ink">
            {tab.label}
          </h3>
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
