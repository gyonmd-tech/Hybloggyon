import { expect, test } from '@playwright/test';

const email = process.env.E2E_ADMIN_EMAIL;
const password = process.env.E2E_ADMIN_PASSWORD;

test.describe('workflow admin dengan database', () => {
  test.skip(
    !email || !password || process.env.E2E_MUTATION_TESTS !== '1',
    'Membutuhkan kredensial E2E dan E2E_MUTATION_TESTS=1.',
  );
  test.describe.configure({ mode: 'serial' });

  async function login(page) {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Masuk ke ruang kerja' }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole('heading', { name: 'Selamat datang kembali.' })).toBeVisible();
  }

  test('menolak kredensial yang salah', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('password-yang-salah');
    await page.getByRole('button', { name: 'Masuk ke ruang kerja' }).click();
    await expect(page.locator('.admin-notice[role="alert"]')).toContainText(
      'Email atau password tidak cocok',
    );
  });

  test('membuat seri, menerbitkan artikel, menyimpan revisi, dan membuat redirect slug', async ({ page, request }) => {
    await login(page);

    const suffix = Date.now().toString(36);
    const seriesName = `Catatan Integrasi ${suffix}`;
    const seriesSlug = `catatan-integrasi-${suffix}`;
    await page.goto('/admin/series');
    await page.getByLabel('Nama').first().fill(seriesName);
    await expect(page.getByLabel('Slug').first()).toHaveValue(seriesSlug);
    await page.getByRole('button', { name: 'Buat seri' }).click();
    await expect(page.getByRole('status')).toContainText('Seri dibuat');

    const originalSlug = `uji-fase-empat-${suffix}`;
    const revisedSlug = `${originalSlug}-revisi`;
    const title = `Uji Fase Empat ${suffix}`;

    await page.goto('/admin/posts/new');
    await page.getByLabel('Judul artikel').fill(title);
    await page.getByLabel('Slug URL').fill(originalSlug);
    await page.getByLabel('Isi Markdown').fill('## Bagian pertama\n\nKonten integrasi untuk menguji alur editorial.');
    await page.getByLabel('Excerpt').fill('Artikel otomatis untuk pengujian fase empat.');
    await page.getByLabel('Tag').fill('integrasi, pengujian');
    await page.getByLabel('Pilih seri').selectOption(seriesSlug);
    await page.getByLabel('Status').selectOption('published');
    await page.getByRole('button', { name: 'Simpan artikel' }).click();

    await expect(page).toHaveURL(/\/admin\/posts\/[0-9a-f-]+\/edit\?saved=1/);
    await expect(page.getByText('Artikel dan revisi baru berhasil disimpan.')).toBeVisible();
    const publicResponse = await request.get(`/esai/${originalSlug}`);
    expect(publicResponse.status()).toBe(200);
    expect(await publicResponse.text()).toContain(title);

    await page.getByLabel('Slug URL').fill(revisedSlug);
    await page.getByRole('button', { name: 'Simpan artikel' }).click();
    await expect(page.getByText('Artikel dan revisi baru berhasil disimpan.')).toBeVisible();
    await expect(page.getByText('2 snapshot')).toBeVisible();

    const oldRoute = await request.get(`/esai/${originalSlug}`, { maxRedirects: 0 });
    expect([301, 308]).toContain(oldRoute.status());
    const redirectLocations = oldRoute.headers().location
      .split(',')
      .map((value) => value.trim());
    expect(redirectLocations.every((value) => value === `/esai/${revisedSlug}`)).toBe(true);
    const newRoute = await request.get(`/esai/${revisedSlug}`);
    expect(newRoute.status()).toBe(200);
  });

  test('mengunggah gambar dan memperbarui metadata media', async ({ page }) => {
    await login(page);
    await page.goto('/admin/media');
    const fileName = `pixel-integrasi-${Date.now()}.png`;
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    );
    await page.getByLabel('File gambar').setInputFiles({
      name: fileName,
      mimeType: 'image/png',
      buffer: pixel,
    });
    await page.getByLabel('Alt text').first().fill('Pixel pengujian integrasi');
    await page.getByRole('button', { name: 'Unggah gambar' }).click();
    await expect(page.getByRole('status')).toContainText('Gambar berhasil diunggah');
    const card = page.locator('.admin-media-card').filter({ hasText: fileName });
    await expect(card).toBeVisible();
    page.once('dialog', (dialog) => dialog.accept());
    await card.getByRole('button', { name: 'Hapus' }).click();
    await expect(card).toHaveCount(0);
  });

  test('mengelola konten beranda non-artikel dan menerbitkannya', async ({ page, request }) => {
    await login(page);
    await page.goto('/admin/content');
    await expect(page.getByRole('heading', { name: 'Konten situs' })).toBeVisible();
    await expect(page.locator('.admin-content-card[href="/admin/content/home"]')).toBeVisible();
    await expect(page.getByRole('link', { name: /Kurasi \/ Hobi/ })).toBeVisible();

    await page.goto('/admin/content/home');
    const titleField = page.getByLabel('Judul hero');
    const originalTitle = await titleField.inputValue();
    const testTitle = `Field Study ${Date.now().toString(36)}.`;
    await titleField.fill(testTitle);
    await page.getByRole('button', { name: 'Simpan & terbitkan' }).click();
    await expect(page.getByRole('status')).toContainText('langsung diterbitkan', { timeout: 30_000 });

    const publicHome = await request.get('/');
    expect(publicHome.status()).toBe(200);
    expect(await publicHome.text()).toContain(testTitle);

    await titleField.fill(originalTitle);
    await page.getByRole('button', { name: 'Simpan & terbitkan' }).click();
    await expect(page.getByRole('status')).toContainText('langsung diterbitkan', { timeout: 30_000 });
  });
});
