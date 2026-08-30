import 'server-only';
import { unstable_cache } from 'next/cache';
import { siteContentDefaults } from '../../content/site-content.js';
import { isDatabaseConfigured } from '../db/client.js';
import { getSiteSetting } from '../db/repositories/settings.js';
import { parseSiteContent } from './site-content-contracts.js';

const loaders = Object.fromEntries(Object.keys(siteContentDefaults).map((section) => [
  section,
  unstable_cache(async () => {
  const fallback = siteContentDefaults[section];
  if (!isDatabaseConfigured()) return fallback;

  try {
    const setting = await getSiteSetting(`site_content_${section}`);
    return setting?.value ? parseSiteContent(section, setting.value) : fallback;
  } catch {
    return fallback;
  }
  }, [`resolved-site-content-${section}`], {
    revalidate: 300,
    tags: [`site-content-${section}`],
  }),
]));

export async function getResolvedSiteContent(section) {
  const loader = loaders[section];
  if (!loader) throw new Error(`Konten situs tidak dikenal: ${section}`);
  return loader();
}
