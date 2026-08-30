import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { and, eq, gt } from 'drizzle-orm';
import { getDatabase, isDatabaseConfigured } from '../db/client.js';
import { adminSessions, adminUsers } from '../db/schema.js';

export const ADMIN_SESSION_COOKIE = 'hybloggyon_admin_session';
const DEFAULT_SESSION_DAYS = 30;

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function sessionDurationMs() {
  const configuredDays = Number(process.env.ADMIN_SESSION_DAYS || DEFAULT_SESSION_DAYS);
  const safeDays = Number.isFinite(configuredDays)
    ? Math.min(Math.max(configuredDays, 1), 90)
    : DEFAULT_SESSION_DAYS;
  return safeDays * 24 * 60 * 60 * 1000;
}

export async function createAdminSession(userId) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + sessionDurationMs());

  await getDatabase().insert(adminSessions).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });
}

export const getCurrentAdmin = cache(async () => {
  if (!isDatabaseConfigured()) return null;

  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const [session] = await getDatabase()
    .select({
      sessionId: adminSessions.id,
      expiresAt: adminSessions.expiresAt,
      userId: adminUsers.id,
      email: adminUsers.email,
      displayName: adminUsers.displayName,
      role: adminUsers.role,
    })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
    .where(
      and(
        eq(adminSessions.tokenHash, hashToken(token)),
        gt(adminSessions.expiresAt, new Date()),
        eq(adminUsers.isActive, true),
      ),
    )
    .limit(1);

  return session || null;
});

export async function requireAdmin(returnTo = '/admin') {
  const admin = await getCurrentAdmin();
  if (!admin) {
    const safeReturnTo = returnTo.startsWith('/admin') && !returnTo.startsWith('//')
      ? returnTo
      : '/admin';
    redirect(`/admin/login?returnTo=${encodeURIComponent(safeReturnTo)}`);
  }
  return admin;
}

export async function destroyCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token && isDatabaseConfigured()) {
    await getDatabase()
      .delete(adminSessions)
      .where(eq(adminSessions.tokenHash, hashToken(token)));
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
