import './load-env.mjs';
import { eq, sql } from 'drizzle-orm';
import { closeDatabase, getDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import { adminUsers } from '../src/lib/db/schema.js';
import { hashPassword } from '../src/lib/auth/password.js';

const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = String(process.env.ADMIN_PASSWORD || '');
const displayName = String(process.env.ADMIN_DISPLAY_NAME || 'Pemilik HyBloggyon').trim();

if (!isDatabaseConfigured()) {
  console.error('DATABASE_URL belum diatur. Admin tidak dibuat.');
  process.exitCode = 1;
} else if (!email || !email.includes('@')) {
  console.error('ADMIN_EMAIL harus berupa alamat email yang valid.');
  process.exitCode = 1;
} else if (password.length < 12) {
  console.error('ADMIN_PASSWORD minimal 12 karakter.');
  process.exitCode = 1;
} else {
  try {
    const passwordHash = await hashPassword(password);
    const [existing] = await getDatabase()
      .select({ id: adminUsers.id })
      .from(adminUsers)
      .where(eq(sql`lower(${adminUsers.email})`, email))
      .limit(1);

    if (existing) {
      await getDatabase()
        .update(adminUsers)
        .set({ displayName, passwordHash, isActive: true, updatedAt: new Date() })
        .where(eq(adminUsers.id, existing.id));
      console.log(`Admin ${email} diperbarui.`);
    } else {
      await getDatabase().insert(adminUsers).values({
        email,
        displayName,
        passwordHash,
        role: 'owner',
      });
      console.log(`Admin ${email} berhasil dibuat.`);
    }
  } finally {
    await closeDatabase();
  }
}
