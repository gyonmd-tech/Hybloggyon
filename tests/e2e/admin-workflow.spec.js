import { expect, test } from '@playwright/test';

const email = process.env.E2E_ADMIN_EMAIL;
const password = process.env.E2E_ADMIN_PASSWORD;

test.describe('workflow admin dengan database', () => {
  test.skip(!email || !password, 'Membutuhkan E2E_ADMIN_EMAIL dan E2E_ADMIN_PASSWORD.');
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
    await expect(page.getByRole('alert')).toContainText('Email atau password tidak cocok');
  });

  test('membuat seri, menerbitkan artikel, menyimpan revisi, dan membuat redirect slug', async ({ page, request }) => {
    await login(page);

    await page.goto('/admin/series');
    await page.getByLabel('Nama').first().fill('Catatan Integrasi');
    await expect(page.getByLabel('Slug').first()).toHaveValue('catatan-integrasi');
    await page.getByRole('button', { name: 'Buat seri' }).click();
    await expect(page.getByRole('status')).toContainText('Seri dibuat');

    const suffix = Date.now().toString(36);
    const originalSlug = `uji-fase-empat-${suffix}`;
    const revisedSlug = `${originalSlug}-revisi`;
    const title = `Uji Fase Empat ${suffix}`;

    await page.goto('/admin/posts/new');
    await page.getByLabel('Judul artikel').fill(title);
    await page.getByLabel('Slug URL').fill(originalSlug);
    await page.getByLabel('Isi Markdown').fill('## Bagian pertama\n\nKonten integrasi untuk menguji alur editorial.');
    await page.getByLabel('Excerpt').fill('Artikel otomatis untuk pengujian fase empat.');
    await page.getByLabel('Tag').fill('integrasi, pengujian');
    await page.getByLabel('Pilih seri').selectOption('catatan-integrasi');
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
    expect(oldRoute.headers().location).toBe(`/esai/${revisedSlug}`);
    const newRoute = await request.get(`/esai/${revisedSlug}`);
    expect(newRoute.status()).toBe(200);
  });

  test('mengunggah gambar dan memperbarui metadata media', async ({ page }) => {
    await login(page);
    await page.goto('/admin/media');
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    );
    await page.getByLabel('File gambar').setInputFiles({
      name: 'pixel-integrasi.png',
      mimeType: 'image/png',
      buffer: pixel,
    });
    await page.getByLabel('Alt text').first().fill('Pixel pengujian integrasi');
    await page.getByRole('button', { name: 'Unggah gambar' }).click();
    await expect(page.getByRole('status')).toContainText('Gambar berhasil diunggah');
    await expect(page.getByText('pixel-integrasi.png')).toBeVisible();
  });
});
