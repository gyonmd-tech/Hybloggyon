import './load-env.mjs';
import { closeDatabase, getDatabase, isDatabaseConfigured } from '../src/lib/db/client.js';
import { sql } from 'drizzle-orm';

const flags = new Set(process.argv.slice(2));
const requireDatabase = flags.has('--require-database');
const production = flags.has('--production');
const failures = [];
const warnings = [];

function present(key) {
  return Boolean(String(process.env[key] || '').trim());
}

function requireKey(key, reason) {
  if (!present(key)) failures.push(`${key}: ${reason}`);
}

const source = process.env.CONTENT_SOURCE || 'markdown';
const mediaStorage = process.env.MEDIA_STORAGE || 'local';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

if (!['markdown', 'database'].includes(source)) {
  failures.push('CONTENT_SOURCE harus bernilai markdown atau database.');
}
if (!['local', 's3'].includes(mediaStorage)) {
  failures.push('MEDIA_STORAGE harus bernilai local atau s3.');
}
if ((requireDatabase || source === 'database') && !isDatabaseConfigured()) {
  failures.push('DATABASE_URL wajib tersedia untuk aktivasi database.');
}
if (present('ADMIN_PASSWORD') && production) {
  failures.push('ADMIN_PASSWORD harus dihapus dari environment setelah bootstrap akun.');
}

if (production) {
  requireKey('NEXT_PUBLIC_SITE_URL', 'URL canonical production wajib diisi.');
  if (siteUrl && !siteUrl.startsWith('https://')) {
    failures.push('NEXT_PUBLIC_SITE_URL production harus menggunakan HTTPS.');
  }
  if (source !== 'database') {
    failures.push('CONTENT_SOURCE harus database sebelum cutover production.');
  }
  if (mediaStorage !== 's3') {
    failures.push('MEDIA_STORAGE harus s3 untuk deployment dengan filesystem sementara.');
  }
}

if (mediaStorage === 's3') {
  for (const key of [
    'S3_ENDPOINT',
    'S3_REGION',
    'S3_BUCKET',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
    'S3_PUBLIC_URL',
  ]) {
    requireKey(key, 'diperlukan ketika MEDIA_STORAGE=s3.');
  }
}

if (mediaStorage === 'local' && production) {
  warnings.push('Upload lokal hanya aman pada host dengan disk persisten.');
}
if (!present('DATABASE_SSL')) {
  warnings.push('DATABASE_SSL belum eksplisit; gunakan require pada koneksi production yang mendukung TLS.');
}

let databaseConnected = false;
if (isDatabaseConfigured()) {
  try {
    await getDatabase().execute(sql`select 1 as readiness`);
    databaseConnected = true;
  } catch (error) {
    failures.push(`Koneksi database gagal: ${error.message}`);
  } finally {
    await closeDatabase();
  }
}

console.log('HyBloggyon release readiness');
console.log(`- mode: ${production ? 'production' : 'development/staging'}`);
console.log(`- content source: ${source}`);
console.log(`- media storage: ${mediaStorage}`);
console.log(`- database: ${databaseConnected ? 'connected' : isDatabaseConfigured() ? 'failed' : 'not configured'}`);

for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const failure of failures) console.error(`FAIL  ${failure}`);

if (failures.length) {
  console.error(`Readiness gagal: ${failures.length} masalah.`);
  process.exitCode = 1;
} else {
  console.log('Readiness lolos.');
}
