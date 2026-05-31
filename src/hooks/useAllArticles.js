// src/hooks/useAllArticles.js
// Hook untuk mengambil semua artikel dari MDX loader

import { useMemo } from 'react';
import { getAllArticles } from '../utils/mdxLoader';

/**
 * Hook yang mengembalikan semua artikel, sorted by date (terbaru duluan)
 */
export default function useAllArticles() {
  const articles = useMemo(() => getAllArticles(), []);
  return articles;
}
