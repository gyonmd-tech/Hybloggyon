import { z } from 'zod';

const text = (max = 500) => z.string().trim().min(1).max(max);
const optionalText = (max = 500) => z.string().trim().max(max).default('');
const imageUrl = text(2000).refine(
  (value) => value.startsWith('/') || /^https?:\/\//.test(value),
  'Gunakan URL http(s) atau path yang diawali /.',
);
const linkUrl = text(2000).refine(
  (value) => value.startsWith('/') || /^https?:\/\//.test(value) || value.startsWith('mailto:'),
  'Gunakan URL, mailto:, atau path yang diawali /.',
);

export const siteContentSchemas = {
  home: z.object({
    hero: z.object({ title: text(120), edition: text(120), coordinates: optionalText(120), eyebrow: text(120), description: text(500), ctaLabel: text(80), ctaUrl: linkUrl, imageUrl }),
    ticker: text(1000),
    intro: z.object({ lead: text(1200), meta: text(600) }),
    quote: z.object({ text: text(800), citation: text(160) }),
    hobbies: z.array(z.object({ label: text(80), title: text(160), description: text(500), tag: text(80), imageUrl })).min(1).max(20),
    showcase: z.array(z.object({ title: text(160), tag: text(160), imageUrl })).min(1).max(20),
    logs: z.array(z.object({ date: text(80), time: optionalText(30), text: text(800), status: z.enum(['OPEN', 'CLOSED']) })).max(30),
    timeline: z.array(z.object({ year: text(20), title: text(160), description: text(600) })).max(20),
    manifesto: z.object({ eyebrow: text(120), title: text(300), description: text(1000), ctaLabel: text(100), ctaUrl: linkUrl, author: text(120), location: text(120), status: text(120) }),
  }),
  about: z.object({
    openerText: text(500), name: text(160), shortBio: text(800), portraitImage: imageUrl,
    meta: z.array(z.object({ label: text(80), value: text(160) })).max(20),
    manifestoParagraphs: z.array(text(2500)).min(1).max(20),
    beliefs: z.array(text(500)).max(30),
    contactEmail: z.email(),
    socialLinks: z.array(z.object({ label: text(80), url: linkUrl })).max(20),
  }),
  hobby: z.object({
    hero: z.object({ titleFirst: text(200), titleSecond: text(200), subtitle: text(600) }),
    music: z.array(z.object({ id: z.number().int().positive(), artist: text(160), title: text(200), year: text(30), genre: text(100), mood: text(100), isCurrentlyPlaying: z.boolean() })).max(50),
    watchlist: z.object({
      featured: z.object({ title: text(200), year: text(30), genre: text(120), tmdbId: z.number().int().nonnegative(), mediaType: z.enum(['movie', 'tv']), impression: text(2000), oneWord: text(80) }),
      others: z.array(z.object({ title: text(200), year: text(30), genre: text(120), tmdbId: z.number().int().nonnegative(), mediaType: z.enum(['movie', 'tv']), type: text(80), impression: text(2000), oneWord: text(80) })).max(50),
    }),
    books: z.array(z.object({ title: text(200), author: text(160), isbn: optionalText(40), status: z.enum(['reading', 'done', 'queue']), impression: text(2000) })).max(100),
    observations: z.array(z.object({ text: text(1000), date: text(80) })).max(50),
    lastUpdated: text(80),
  }),
  notes: z.object({
    quote: z.object({ text: text(1000), citation: text(160) }),
    currentThinking: z.array(z.object({ label: text(120), value: text(500) })).max(30),
    randomThoughts: z.array(text(1000)).min(1).max(50),
    connections: z.array(z.object({ from: text(240), to: text(240), via: text(800) })).max(30),
  }),
};

export function parseSiteContent(section, value) {
  const schema = siteContentSchemas[section];
  if (!schema) throw new Error('Bagian konten tidak dikenal.');
  return schema.parse(value);
}
