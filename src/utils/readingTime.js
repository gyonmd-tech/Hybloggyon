// src/utils/readingTime.js
// Hitung estimasi waktu baca dari teks

/**
 * Hitung estimasi reading time (dalam menit)
 * Rata-rata kecepatan baca: 200 kata/menit
 * @param {string} text - body teks artikel
 * @returns {number} menit (minimum 1)
 */
export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}
