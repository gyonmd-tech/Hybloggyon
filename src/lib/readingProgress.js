// Progres membaca disimpan di browser pembaca saja (tanpa akun).
// Akses localStorage dibungkus try/catch karena bisa diblokir.

import { useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'hybloggyon:read';

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function parse(raw) {
  try {
    const value = JSON.parse(raw);
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

export function getReadUrls() {
  return parse(readRaw());
}

function subscribe(onChange) {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
}

// Server selalu mengembalikan "belum ada yang dibaca"; klien membaca localStorage
// setelah hydration, jadi HTML server dan klien tetap sama.
export function useReadUrls() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '[]');
  return useMemo(() => parse(raw), [raw]);
}

export function markRead(url) {
  try {
    const urls = getReadUrls();
    if (urls.has(url)) return;
    urls.add(url);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...urls]));
  } catch {
    // Penyimpanan tidak tersedia; progres cukup tidak diingat.
  }
}
