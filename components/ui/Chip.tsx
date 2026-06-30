import { cn } from '@/lib/utils';

export function Chip({
  children,
  className,
  tone = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'blue';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[12.5px] font-medium num-mono tracking-tight',
        tone === 'default' && 'border-line-strong bg-white text-ink-soft',
        tone === 'blue' && 'border-blue/20 bg-blue-tint text-blue-deep',
        className,
      )}
    >
      {children}
    </span>
  );
}
