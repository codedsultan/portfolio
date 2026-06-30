import { Container } from '@/components/ui/Container';
import { profile, footer } from '@/data/profile';
import { socialLinks } from '@/data/social';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-panel">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 font-display font-semibold text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue text-[12px] font-bold text-white num-mono">
              {profile.initials}
            </span>
            <span className="text-[15px]">{profile.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate">{footer.text}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="num-mono text-[12px] uppercase tracking-[0.08em] text-slate-light">
            Elsewhere
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-blue"
              >
                <link.icon size={15} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-slate-light sm:flex-row sm:items-center sm:justify-between">
        <span className="num-mono">© {year} {profile.name}. All rights reserved.</span>
        <span className="num-mono">Built with Next.js · Deployed on Vercel</span>
      </Container>
    </footer>
  );
}
