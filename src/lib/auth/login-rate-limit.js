const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function prune(now) {
  for (const [key, record] of attempts.entries()) {
    if (record.resetAt <= now) attempts.delete(key);
  }
}

export function consumeLoginAttempt(identifier) {
  const now = Date.now();
  prune(now);
  const key = identifier || 'unknown';
  const record = attempts.get(key);

  if (!record) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
    };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearLoginAttempts(identifier) {
  if (identifier) attempts.delete(identifier);
}
