'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="h-8 w-8" aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative flex h-8 w-8 items-center justify-center rounded-md text-slate-light transition-colors hover:bg-blue-tint hover:text-blue"
    >
      <Sun
        size={16}
        className="absolute transition-all duration-300 dark:opacity-0 dark:rotate-90 dark:scale-50"
      />
      <Moon
        size={16}
        className="absolute opacity-0 -rotate-90 scale-50 transition-all duration-300 dark:opacity-100 dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
