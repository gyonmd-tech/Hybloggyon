// src/utils/formatDate.js
// Format tanggal ke format editorial: "12 MEI 2026"

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN',
  'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'
];

/**
 * Format date string ke format editorial uppercase
 * @param {string} dateString - format YYYY-MM-DD
 * @returns {string} "12 MEI 2026"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
