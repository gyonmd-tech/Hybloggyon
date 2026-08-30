import './load-env.mjs';
import { getDatabase, closeDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import { categories, siteSettings } from '../src/lib/db/schema.js';

const categorySeeds = [
  { name: 'Esai', slug: 'esai', description: 'Tulisan reflektif panjang.' },
  { name: 'Notes', slug: 'notes', description: 'Catatan belajar dan log.' },
  { name: 'Musik', slug: 'musik', description: 'Analisis dan ulasan album.' },
  { name: 'Film & Anime', slug: 'film-anime', description: 'Sinema dan pergerakan.' },
];

if (!isDatabaseConfigured()) {
  console.error('DATABASE_URL belum diatur. Seed dibatalkan.');
  process.exitCode = 1;
} else {
  const database = getDatabase();

  for (const category of categorySeeds) {
    await database
      .insert(categories)
      .values(category)
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          name: category.name,
          description: category.description,
          updatedAt: new Date(),
        },
      });
  }

  await database
    .insert(siteSettings)
    .values({
      key: 'content_source_version',
      value: { version: 1, source: 'database' },
    })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: {
        value: { version: 1, source: 'database' },
        updatedAt: new Date(),
      },
    });

  console.log(`Seed selesai: ${categorySeeds.length} kategori dan site settings dasar.`);
  await closeDatabase();
}
