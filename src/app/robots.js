import { absoluteUrl, siteConfig } from '../config/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/preview/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
