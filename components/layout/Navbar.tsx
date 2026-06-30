'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Profile', href: '/#profile' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Work', href: '/#work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Education', href: '/#education' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-line bg-white/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/#top" className="flex items-center gap-2.5 font-display font-semibold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue text-[13px] font-bold text-white num-mono">
            {profile.initials}
          </span>
          <span className="hidden text-[15px] sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="num-mono text-[13px] tracking-tight text-slate transition-colors hover:text-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/#contact"
            className="num-mono text-[13px] tracking-tight text-slate transition-colors hover:text-blue"
          >
            Contact
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Résumé <ArrowUpRight size={13} />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <div
        className={cn(
          'overflow-hidden border-t border-line bg-white transition-[max-height] duration-300 ease-out lg:hidden',
          open ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {[...NAV_LINKS, { label: 'Contact', href: '/#contact' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-blue-tint hover:text-blue"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue px-4 py-2.5 text-[15px] font-medium text-white"
          >
            Download résumé <ArrowUpRight size={14} />
          </a>
        </Container>
      </div>
    </header>
  );
}
