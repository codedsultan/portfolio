import type { MetadataRoute } from 'next';
import { allProjectsSorted } from '@/data/projects';
import { seo } from '@/data/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = seo.siteUrl;

  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    ...allProjectsSorted.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
