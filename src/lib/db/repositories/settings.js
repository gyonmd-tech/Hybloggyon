import { eq } from 'drizzle-orm';
import { getDatabase } from '../client.js';
import { siteSettings } from '../schema.js';

export async function getSiteSetting(key) {
  const [setting] = await getDatabase()
    .select({ value: siteSettings.value, updatedAt: siteSettings.updatedAt })
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);

  return setting || null;
}

export async function setSiteSetting(key, value, updatedById = null) {
  const [setting] = await getDatabase()
    .insert(siteSettings)
    .values({ key, value, updatedById, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedById, updatedAt: new Date() },
    })
    .returning();

  return setting;
}
