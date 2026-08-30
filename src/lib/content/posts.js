import 'server-only';
import { cache } from 'react';
import {
  getAllPosts as getMarkdownPosts,
  getPostByRoute as getMarkdownPostByRoute,
  getPostNavigation,
  getPostRouteParams as getMarkdownRouteParams,
} from './markdown-posts.js';
import { parsePostDetail, parsePostSummaries } from './contracts.js';
import { isDatabaseConfigured } from '../db/client.js';
import {
  findPublishedPostByRoute,
  listPublishedPosts,
  listPublishedRouteParams,
} from '../db/repositories/posts.js';

export function getContentSource() {
  const source = process.env.CONTENT_SOURCE || 'markdown';

  if (!['markdown', 'database'].includes(source)) {
    throw new Error(`CONTENT_SOURCE tidak valid: "${source}".`);
  }
  if (source === 'database' && !isDatabaseConfigured()) {
    throw new Error('CONTENT_SOURCE=database membutuhkan DATABASE_URL.');
  }

  return source;
}

const loadPostSummaries = cache(async () => {
  const values = getContentSource() === 'database'
    ? await listPublishedPosts()
    : getMarkdownPosts();

  return parsePostSummaries(values);
});

export async function getAllPosts() {
  return loadPostSummaries();
}

export const getPostByRoute = cache(async (category, slug) => {
  const value = getContentSource() === 'database'
    ? await findPublishedPostByRoute(category, slug)
    : getMarkdownPostByRoute(category, slug);

  return value ? parsePostDetail(value) : null;
});

export async function getPostRouteParams() {
  return getContentSource() === 'database'
    ? listPublishedRouteParams()
    : getMarkdownRouteParams();
}

export { getPostNavigation };
