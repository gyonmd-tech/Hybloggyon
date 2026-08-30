import './load-env.mjs';
import { count } from 'drizzle-orm';
import { closeDatabase, getDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import { categories, posts } from '../src/lib/db/schema.js';

if (!isDatabaseConfigured()) {
  console.log('Database belum dikonfigurasi. Sumber konten aktif: Markdown.');
  process.exitCode = 1;
} else {
  try {
    const database = getDatabase();
    const [categoryCount] = await database.select({ value: count() }).from(categories);
    const [postCount] = await database.select({ value: count() }).from(posts);

    console.log('Koneksi PostgreSQL berhasil.');
    console.log(`Kategori: ${categoryCount.value}`);
    console.log(`Artikel: ${postCount.value}`);
  } catch (error) {
    console.error(`Pemeriksaan database gagal: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}
