import { eq } from 'drizzle-orm';
import { getDatabase } from '../client.js';
import { slugRedirects } from '../schema.js';

export async function findSlugRedirect(fromPath) {
  const [redirect] = await getDatabase()
    .select({
      toPath: slugRedirects.toPath,
      statusCode: slugRedirects.statusCode,
    })
    .from(slugRedirects)
    .where(eq(slugRedirects.fromPath, fromPath))
    .limit(1);

  return redirect || null;
}
