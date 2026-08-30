import { expect, test } from '@playwright/test';

function structuredData(page) {
  return page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.map((node) => JSON.parse(node.textContent)),
  );
}

test('metadata situs, discovery feed, dan manifest dapat dibaca mesin', async ({ page, request }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/HyBloggyon/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
  await expect(page.locator('link[type="application/rss+xml"]')).toHaveAttribute('href', /\/feed\.xml$/);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', /\/manifest\.webmanifest$/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.getByRole('link', { name: /IKUTI RSS/ })).toHaveAttribute('href', '/feed.xml');

  const schemas = await structuredData(page);
  const graph = schemas.flatMap((schema) => schema['@graph'] || []);
  expect(graph.some((entry) => entry['@type'] === 'WebSite')).toBe(true);
  expect(graph.some((entry) => entry['@type'] === 'Person')).toBe(true);

  const feed = await request.get('/feed.xml');
  expect(feed.status()).toBe(200);
  expect(feed.headers()['content-type']).toContain('application/rss+xml');
  expect(await feed.text()).toContain('<rss version="2.0"');

  const manifest = await request.get('/manifest.webmanifest');
  expect(manifest.status()).toBe(200);
  expect(manifest.headers()['content-type']).toContain('application/manifest+json');
  expect((await manifest.json()).lang).toBe('id');
});

test('artikel memiliki canonical, Open Graph, dan schema BlogPosting', async ({ page }) => {
  const response = await page.goto('/esai/anak-itu-aku');
  expect(response?.status()).toBe(200);

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/esai\/anak-itu-aku$/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index/);

  const schemas = await structuredData(page);
  const graph = schemas.flatMap((schema) => schema['@graph'] || []);
  expect(graph.some((entry) => entry['@type'] === 'BlogPosting')).toBe(true);
  expect(graph.some((entry) => entry['@type'] === 'BreadcrumbList')).toBe(true);
});

test('health endpoint siap dipakai monitor tanpa dapat diindeks', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toContain('no-store');
  expect(response.headers()['x-robots-tag']).toContain('noindex');
  expect((await response.json()).status).toBe('ok');
});
