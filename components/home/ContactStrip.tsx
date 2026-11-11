import { Mail, Download } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { contact, profile } from '@/data/profile';

export function ContactStrip() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mt-16 pb-16 sm:mt-20">
      <Container>
        <div className="flex flex-col gap-6 rounded-xl border border-line bg-blue-tint-2 px-6 py-8 sm:px-10 sm:py-9 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="contact-heading" className="font-display text-[28px] font-semibold tracking-tight text-ink">
              {contact.title}
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate">
              {profile.availability}.{' '}
              <a href={`mailto:${profile.email}`} className="font-medium text-blue hover:underline">
                {profile.email}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`} variant="primary" className="min-h-11">
              <Mail size={15} aria-hidden /> Email me
            </Button>
            <Button href={profile.resumeUrl} variant="outline" download className="min-h-11">
              <Download size={15} aria-hidden /> Download résumé
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
