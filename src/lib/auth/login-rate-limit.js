import 'server-only';
import { createHash } from 'node:crypto';
import { inArray, lte, sql } from 'drizzle-orm';
import { getDatabase } from '../db/client.js';
import { loginAttempts } from '../db/schema.js';

// Disimpan di PostgreSQL agar batas tetap berlaku lintas instance serverless
// dan tidak hilang saat cold start.
const WINDOW_MINUTES = 15;
const MAX_ATTEMPTS_PER_EMAIL = 10;
const MAX_ATTEMPTS_PER_ADDRESS = 20;

function attemptKey(scope, value) {
  const digest = createHash('sha256').update(String(value || 'unknown')).digest('hex');
  return `${scope}:${digest}`;
}

function limiterKeys({ email, remoteAddress }) {
  return [
    { key: attemptKey('email', email), max: MAX_ATTEMPTS_PER_EMAIL },
    { key: attemptKey('ip', remoteAddress), max: MAX_ATTEMPTS_PER_ADDRESS },
  ];
}

async function incrementAttempt(key) {
  const [record] = await getDatabase()
    .insert(loginAttempts)
    .values({
      key,
      count: 1,
      resetAt: sql.raw(`now() + interval '${WINDOW_MINUTES} minutes'`),
    })
    .onConflictDoUpdate({
      target: loginAttempts.key,
      set: {
        count: sql`case when "login_attempts"."reset_at" <= now() then 1 else "login_attempts"."count" + 1 end`,
        resetAt: sql`case when "login_attempts"."reset_at" <= now() then excluded.reset_at else "login_attempts"."reset_at" end`,
      },
    })
    .returning({ count: loginAttempts.count, resetAt: loginAttempts.resetAt });

  return record;
}

export async function consumeLoginAttempt(identity) {
  await getDatabase().delete(loginAttempts).where(lte(loginAttempts.resetAt, sql`now()`));

  let retryAfterSeconds = 0;
  for (const { key, max } of limiterKeys(identity)) {
    const record = await incrementAttempt(key);
    if (record.count > max) {
      const seconds = Math.ceil((new Date(record.resetAt).valueOf() - Date.now()) / 1000);
      retryAfterSeconds = Math.max(retryAfterSeconds, seconds, 1);
    }
  }

  return { allowed: retryAfterSeconds === 0, retryAfterSeconds };
}

export async function clearLoginAttempts(identity) {
  await getDatabase()
    .delete(loginAttempts)
    .where(inArray(loginAttempts.key, limiterKeys(identity).map(({ key }) => key)));
}
