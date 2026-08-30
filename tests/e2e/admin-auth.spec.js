import { expect, test } from '@playwright/test';

const email = process.env.E2E_ADMIN_EMAIL;
const password = process.env.E2E_ADMIN_PASSWORD;

async function login(page) {
  await page.goto('/admin/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Masuk ke ruang kerja' }).click();
  await expect(page).toHaveURL(/\/admin$/, { timeout: 30_000 });
}

test('akun admin dapat masuk dan keluar', async ({ page }) => {
  test.skip(!email || !password, 'Membutuhkan E2E_ADMIN_EMAIL dan E2E_ADMIN_PASSWORD.');

  await login(page);
  await expect(page.getByRole('heading', { name: 'Selamat datang kembali.' })).toBeVisible();
  await page.getByRole('button', { name: 'Keluar' }).click();
  await expect(page).toHaveURL(/\/admin\/login/);
});

test('media production dapat diunggah dan dihapus kembali', async ({ page }) => {
  test.skip(
    !email || !password || process.env.E2E_MEDIA_SMOKE !== '1',
    'Membutuhkan kredensial E2E dan E2E_MEDIA_SMOKE=1.',
  );

  await login(page);
  await page.goto('/admin/media');
  const fileName = `smoke-${Date.now()}.png`;
  const pixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    'base64',
  );
  await page.getByLabel('File gambar').setInputFiles({
    name: fileName,
    mimeType: 'image/png',
    buffer: pixel,
  });
  await page.getByLabel('Alt text').first().fill('Uji sementara penyimpanan media');
  await page.getByRole('button', { name: 'Unggah gambar' }).click();
  await expect(page.getByRole('status')).toContainText('Gambar berhasil diunggah', {
    timeout: 30_000,
  });

  const card = page.locator('.admin-media-card').filter({ hasText: fileName });
  await expect(card).toBeVisible();
  await expect(card.locator('img')).toHaveAttribute('src', /blob\.vercel-storage\.com/);
  page.once('dialog', (dialog) => dialog.accept());
  await card.getByRole('button', { name: 'Hapus' }).click();
  await expect(card).toHaveCount(0, { timeout: 30_000 });
});
