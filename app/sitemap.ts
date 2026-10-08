import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/site';
import { PAGES } from './lib/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...PAGES.map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: p.group === 'service' ? 0.9 : 0.8,
    })),
  ];
}
