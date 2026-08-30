import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

let queryClient;
let database;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDatabase() {
  if (!isDatabaseConfigured()) {
    throw new Error(
      'DATABASE_URL belum diatur. Tambahkan koneksi PostgreSQL sebelum memakai repository database.',
    );
  }

  if (!queryClient) {
    const options = {
      max: Number(process.env.DATABASE_POOL_MAX) || 1,
      connect_timeout: 10,
      idle_timeout: 20,
      prepare: false,
    };

    if (process.env.DATABASE_SSL === 'require') options.ssl = 'require';
    if (process.env.DATABASE_SSL === 'disable') options.ssl = false;

    queryClient = postgres(process.env.DATABASE_URL, options);
    database = drizzle(queryClient, { schema });
  }

  return database;
}

export async function closeDatabase() {
  if (!queryClient) return;
  await queryClient.end({ timeout: 5 });
  queryClient = undefined;
  database = undefined;
}
