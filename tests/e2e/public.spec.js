import { expect, test } from '@playwright/test';

test('halaman publik dan SEO dasar dapat diakses', async ({ page, request }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('<urlset');

  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Disallow: /admin');
  expect(await robots.text()).toContain('Disallow: /admin/');
});

test('login admin tidak dapat diindeks dan route privat dilindungi', async ({ page, request }) => {
  const loginResponse = await page.goto('/admin/login');
  expect(loginResponse?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Masuk ke meja editorial.' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  expect(loginResponse?.headers()['x-robots-tag']).toContain('noindex');
  expect(loginResponse?.headers()['x-frame-options']).toBe('DENY');
  expect(loginResponse?.headers()['cache-control']).toContain('no-store');

  const protectedResponse = await request.get('/admin/posts', { maxRedirects: 0 });
  expect([303, 307, 308]).toContain(protectedResponse.status());
  expect(protectedResponse.headers().location).toContain('/admin/login');

  const adminResponse = await request.get('/admin', { maxRedirects: 0 });
  expect(adminResponse.headers()['x-robots-tag']).toContain('noindex');

  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('/admin');
});
