import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ProjectImage } from '@/data/projects';

/**
 * Fixed-ratio crop used on project cards. The parent card must have the
 * Tailwind `group` class so the hover zoom works.
 * Cards are decorative: the heading and "Read case study" link already name
 * the project, so pass `decorative` when the cover sits inside a card that
 * has its own link and title.
 */
export function ProjectCover({
  image,
  sizes,
  decorative = false,
  className,
}: {
  image: ProjectImage;
  sizes: string;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('relative aspect-[16/10] w-full overflow-hidden bg-panel', className)}>
      <Image
        src={image.src}
        alt={decorative ? '' : image.alt}
        fill
        sizes={sizes}
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}

/**
 * Full-width image with its natural aspect ratio, used on project pages.
 * `preload` should only be set on the one image that is the largest thing
 * above the fold (the page cover).
 */
export function ProjectFigure({
  image,
  preload = false,
  className,
}: {
  image: ProjectImage;
  preload?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn('overflow-hidden rounded-lg border border-line bg-surface', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 860px) 100vw, 860px"
        preload={preload}
        className="h-auto w-full"
      />
      {image.caption && (
        <figcaption className="border-t border-line px-4 py-3 text-[13px] leading-relaxed text-slate">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
