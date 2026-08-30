import { z } from 'zod';

export const postStatusSchema = z.enum([
  'draft',
  'scheduled',
  'published',
  'archived',
]);

export const postSummarySchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  subtitle: z.string().default(''),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slug: z.string().min(1),
  featured: z.boolean().default(false),
  excerpt: z.string().default(''),
  coverImage: z.string().default(''),
  coverExists: z.boolean().default(false),
  readingTime: z.number().int().positive(),
  pullQuote: z.string().default(''),
  series: z.string().default(''),
  seriesOrder: z.number().int().positive().nullable().default(null),
  seoTitle: z.string().default(''),
  seoDescription: z.string().default(''),
  canonicalUrl: z.string().default(''),
  ogImageUrl: z.string().default(''),
  noIndex: z.boolean().default(false),
  url: z.string().startsWith('/'),
});

export const postDetailSchema = postSummarySchema.extend({
  content: z.string(),
});

export const postEditorInputSchema = z.object({
  title: z.string().trim().min(1).max(240),
  subtitle: z.string().trim().max(500).default(''),
  categorySlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(200),
  excerpt: z.string().trim().max(500).default(''),
  contentMarkdown: z.string().default(''),
  pullQuote: z.string().trim().max(500).default(''),
  status: postStatusSchema.default('draft'),
  featured: z.boolean().default(false),
  tags: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
  seriesSlug: z.string().nullable().default(null),
  seriesOrder: z.number().int().positive().nullable().default(null),
  scheduledAt: z.iso.datetime().nullable().default(null),
  publishedAt: z.iso.datetime().nullable().default(null),
  coverAssetId: z.string().uuid().nullable().default(null),
  seoTitle: z.string().trim().max(240).default(''),
  seoDescription: z.string().trim().max(320).default(''),
  canonicalUrl: z.union([z.literal(''), z.url()]).default(''),
  ogImageUrl: z.union([z.literal(''), z.url()]).default(''),
  noIndex: z.boolean().default(false),
});

export function parsePostSummaries(posts) {
  return z.array(postSummarySchema).parse(posts);
}

export function parsePostDetail(post) {
  return postDetailSchema.parse(post);
}
