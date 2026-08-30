import { absoluteUrl } from '../../config/site';
import { getAllPosts } from '../../lib/content/posts';
import { getResolvedSiteProfile } from '../../lib/content/site-settings';

export const revalidate = 300;

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(date) {
  return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

export async function GET() {
  const [posts, profile] = await Promise.all([getAllPosts(), getResolvedSiteProfile()]);
  const visiblePosts = posts.filter((post) => !post.noIndex).slice(0, 50);
  const lastBuildDate = visiblePosts[0]?.updatedAt
    ? toRfc822(visiblePosts[0].updatedAt)
    : new Date().toUTCString();

  const items = visiblePosts.map((post) => {
    const url = absoluteUrl(post.url);
    const categories = post.tags
      .map((tag) => `<category>${escapeXml(tag)}</category>`)
      .join('');

    return [
      '<item>',
      `<title>${escapeXml(post.title)}</title>`,
      `<link>${escapeXml(url)}</link>`,
      `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `<description>${escapeXml(post.excerpt)}</description>`,
      `<pubDate>${toRfc822(post.date)}</pubDate>`,
      categories,
      '</item>',
    ].join('');
  }).join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>${escapeXml(profile.siteTitle)}</title>`,
    `<link>${escapeXml(absoluteUrl('/'))}</link>`,
    `<description>${escapeXml(profile.description)}</description>`,
    `<language>id-ID</language>`,
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `<atom:link href="${escapeXml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml" />`,
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  });
}
