import 'server-only';
import { createHash, createHmac, randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { del as deleteBlob, put as putBlob } from '@vercel/blob';
import { slugify } from '../slugify.js';

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function hmac(key, value, encoding) {
  return createHmac('sha256', key).update(value).digest(encoding);
}

function encodeKey(key) {
  return key.split('/').map(encodeURIComponent).join('/');
}

function s3Config() {
  const config = {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || 'auto',
    bucket: process.env.S3_BUCKET,
    accessKey: process.env.S3_ACCESS_KEY_ID,
    secretKey: process.env.S3_SECRET_ACCESS_KEY,
    publicUrl: process.env.S3_PUBLIC_URL,
  };
  const missing = Object.entries(config).filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) throw new Error(`Konfigurasi media S3 belum lengkap: ${missing.join(', ')}.`);
  return config;
}

async function signedS3Request(method, key, bytes = Buffer.alloc(0), mimeType = '') {
  const config = s3Config();
  const endpoint = new URL(config.endpoint);
  const encodedKey = encodeKey(key);
  const canonicalUri = `${endpoint.pathname.replace(/\/$/, '')}/${encodeURIComponent(config.bucket)}/${encodedKey}`.replace(/\/+/g, '/');
  const requestUrl = new URL(endpoint);
  requestUrl.pathname = canonicalUri;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = sha256(bytes);
  const headers = {
    host: requestUrl.host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };
  if (mimeType) headers['content-type'] = mimeType;

  const signedHeaderNames = Object.keys(headers).sort();
  const canonicalHeaders = signedHeaderNames.map((name) => `${name}:${headers[name].trim()}\n`).join('');
  const signedHeaders = signedHeaderNames.join(';');
  const canonicalRequest = [
    method,
    canonicalUri,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');
  const credentialScope = `${dateStamp}/${config.region}/s3/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, sha256(canonicalRequest)].join('\n');
  const dateKey = hmac(`AWS4${config.secretKey}`, dateStamp);
  const regionKey = hmac(dateKey, config.region);
  const serviceKey = hmac(regionKey, 's3');
  const signingKey = hmac(serviceKey, 'aws4_request');
  const signature = hmac(signingKey, stringToSign, 'hex');
  const authorization = `AWS4-HMAC-SHA256 Credential=${config.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(requestUrl, {
    method,
    headers: { ...headers, authorization },
    body: method === 'PUT' ? bytes : undefined,
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Penyimpanan media menolak permintaan (${response.status}): ${detail || response.statusText}`);
  }
  return config;
}

function createStorageKey(fileName, extension) {
  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const baseName = slugify(path.parse(fileName).name).slice(0, 100) || 'image';
  return `${year}/${month}/${baseName}-${randomUUID()}.${extension}`;
}

export async function storeImage({ fileName, extension, mimeType, bytes }) {
  const key = createStorageKey(fileName, extension);
  const driver = process.env.MEDIA_STORAGE || 'local';

  if (driver === 'local') {
    const absolutePath = path.join(process.cwd(), 'public', 'uploads', ...key.split('/'));
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, bytes, { flag: 'wx' });
    return { storageKey: `local/${key}`, publicUrl: `/uploads/${key}` };
  }
  if (driver === 's3') {
    const config = await signedS3Request('PUT', key, bytes, mimeType);
    return {
      storageKey: `s3/${key}`,
      publicUrl: `${config.publicUrl.replace(/\/$/, '')}/${encodeKey(key)}`,
    };
  }
  if (driver === 'blob') {
    if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
      throw new Error('BLOB_READ_WRITE_TOKEN belum dikonfigurasi.');
    }
    const blob = await putBlob(key, bytes, {
      access: 'public',
      addRandomSuffix: false,
      contentType: mimeType,
    });
    return { storageKey: `blob/${blob.pathname}`, publicUrl: blob.url };
  }
  throw new Error(`MEDIA_STORAGE tidak dikenali: ${driver}.`);
}

export async function deleteStoredImage(asset) {
  if (asset.storageKey.startsWith('local/')) {
    const key = asset.storageKey.slice('local/'.length);
    const uploadRoot = path.resolve(process.cwd(), 'public', 'uploads');
    const absolutePath = path.resolve(uploadRoot, ...key.split('/'));
    if (!absolutePath.startsWith(`${uploadRoot}${path.sep}`)) {
      throw new Error('Lokasi file media lokal tidak aman.');
    }
    await unlink(absolutePath).catch((error) => {
      if (error.code !== 'ENOENT') throw error;
    });
    return;
  }
  if (asset.storageKey.startsWith('s3/')) {
    await signedS3Request('DELETE', asset.storageKey.slice('s3/'.length));
    return;
  }
  if (asset.storageKey.startsWith('blob/')) {
    await deleteBlob(asset.publicUrl);
  }
}
