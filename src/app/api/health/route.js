import { sql } from 'drizzle-orm';
import { getDatabase, isDatabaseConfigured } from '../../../lib/db/client';

export const dynamic = 'force-dynamic';

function json(payload, status) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

export async function GET() {
  const contentSource = process.env.CONTENT_SOURCE || 'markdown';

  if (!['markdown', 'database'].includes(contentSource)) {
    return json({ status: 'error', contentSource, database: 'unknown' }, 503);
  }

  if (contentSource !== 'database') {
    return json({ status: 'ok', contentSource, database: 'not-required' }, 200);
  }

  if (!isDatabaseConfigured()) {
    return json({ status: 'error', contentSource, database: 'not-configured' }, 503);
  }

  try {
    await getDatabase().execute(sql`select 1 as health`);
    return json({ status: 'ok', contentSource, database: 'connected' }, 200);
  } catch {
    return json({ status: 'error', contentSource, database: 'unavailable' }, 503);
  }
}
