// src/hooks/useArticlesByCategory.js
// Hook untuk mengambil artikel berdasarkan kategori

import { useMemo } from 'react';
import { getArticlesByCategory } from '../utils/mdxLoader';

/**
 * Hook yang mengembalikan artikel berdasarkan kategori
 * @param {string} category - esai | notes | musik | film-anime
 */
export default function useArticlesByCategory(category) {
  const articles = useMemo(
    () => getArticlesByCategory(category),
    [category]
  );
  return articles;
}
