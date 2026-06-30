import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

const variants: Record<string, string> = {
  primary:
    'bg-blue text-white px-5 py-2.5 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-8px_rgba(29,78,216,0.55)] hover:bg-blue-bright hover:shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_24px_-8px_rgba(29,78,216,0.65)] active:translate-y-px',
  outline:
    'border border-line-strong text-ink px-5 py-2.5 bg-white hover:border-blue hover:text-blue active:translate-y-px',
  ghost: 'text-ink px-2 py-1 hover:text-blue',
};

type CommonProps = {
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = 'primary', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
