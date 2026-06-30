import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import { contact, profile } from '@/data/profile';
import { socialLinks } from '@/data/social';

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="bp-grid bp-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <Reveal>
            <span className="num-mono text-[13px] tracking-[0.08em] text-blue uppercase">
              {contact.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink text-balance">
              {contact.title}
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate">{contact.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`} variant="primary">
                <Mail size={15} /> Email me
              </Button>
              <Button href={profile.resumeUrl} variant="outline" download>
                Download résumé
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-lg border border-line bg-white p-7">
            <h3 className="font-display text-base font-semibold text-ink">{contact.cardTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{contact.cardText}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 text-[14.5px] text-ink-soft">
                  <Mail size={15} className="text-blue" />
                  {profile.email}
                </span>
                <CopyEmailButton email={profile.email} />
              </div>

              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-2.5 text-[14.5px] text-ink-soft transition-colors hover:text-blue"
              >
                <Phone size={15} className="text-blue" />
                {profile.phone}
              </a>

              <span className="flex items-center gap-2.5 text-[14.5px] text-ink-soft">
                <MapPin size={15} className="text-blue" />
                {profile.location}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
              {socialLinks
                .filter((l) => l.platform !== 'email')
                .map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:text-blue"
                  >
                    <link.icon size={14} />
                    {link.label}
                    <ArrowUpRight size={11} className="text-slate-light" />
                  </a>
                ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
