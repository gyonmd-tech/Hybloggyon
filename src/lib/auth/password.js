import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;
const SCRYPT_COST = 16384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;

function scrypt(password, salt, keyLength, options) {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keyLength, options, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 12) {
    throw new Error('Password admin minimal 12 karakter.');
  }

  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELIZATION,
    maxmem: 64 * 1024 * 1024,
  });

  return [
    'scrypt',
    SCRYPT_COST,
    SCRYPT_BLOCK_SIZE,
    SCRYPT_PARALLELIZATION,
    salt,
    key.toString('hex'),
  ].join('$');
}

export async function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;

  const [algorithm, rawCost, rawBlockSize, rawParallelization, salt, digest] =
    storedHash.split('$');
  if (algorithm !== 'scrypt' || !salt || !digest) return false;

  const expected = Buffer.from(digest, 'hex');
  if (expected.length !== KEY_LENGTH) return false;

  try {
    const actual = await scrypt(password, salt, KEY_LENGTH, {
      N: Number(rawCost),
      r: Number(rawBlockSize),
      p: Number(rawParallelization),
      maxmem: 64 * 1024 * 1024,
    });
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
