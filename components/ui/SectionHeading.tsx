import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <div className="mb-3 flex items-center gap-3">
        <span className="num-mono text-[13px] tracking-[0.08em] text-blue uppercase">
          {eyebrow}
        </span>
        <span className="h-px flex-1 max-w-[64px] bg-line-strong" aria-hidden />
      </div>
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate">{description}</p>
      )}
    </div>
  );
}
