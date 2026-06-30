import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-24">
      <div className="bp-grid bp-grid-fade absolute inset-0 -z-10" aria-hidden />
      <Container className="text-center">
        <p className="num-mono text-[13px] tracking-[0.08em] text-blue uppercase">404 — Not found</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-ink">
          This route doesn&rsquo;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-slate">
          The page you&rsquo;re looking for may have moved, or never existed. Let&rsquo;s get you back
          on track.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">
            <ArrowLeft size={15} /> Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
