import 'server-only';
import { unstable_cache } from 'next/cache';
import { siteConfig } from '../../config/site.js';
import { isDatabaseConfigured } from '../db/client.js';
import { getSiteSetting } from '../db/repositories/settings.js';

const defaults = {
  siteName: siteConfig.name,
  siteTitle: siteConfig.title,
  description: siteConfig.description,
  authorName: siteConfig.name,
  authorBio: '',
  defaultOgImage: '/images/og/default.webp',
  postsPerPage: 20,
};

export const getResolvedSiteProfile = unstable_cache(async () => {
  if (!isDatabaseConfigured()) return defaults;
  try {
    const setting = await getSiteSetting('site_profile');
    return { ...defaults, ...(setting?.value || {}) };
  } catch {
    return defaults;
  }
}, ['resolved-site-profile'], { revalidate: 300, tags: ['site-profile'] });
