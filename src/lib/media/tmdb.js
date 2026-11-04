import 'server-only';

const IMAGE_BASE = 'https://image.tmdb.org/t/p';
const CACHE_SECONDS = 60 * 60 * 24;

function tmdbApiKey() {
  const key = (
    process.env.TMDB_API_KEY ||
    process.env.NEXT_PUBLIC_TMDB_API_KEY ||
    process.env.VITE_TMDB_API_KEY ||
    ''
  ).trim();
  return key && key !== 'your_tmdb_api_key_here' ? key : '';
}

// Dipanggil di server agar API key tidak pernah dikirim ke browser.
// Hasil di-cache 24 jam; null berarti komponen memakai fallback tipografis.
async function fetchBackdropUrl(film, size) {
  const apiKey = tmdbApiKey();
  if (!apiKey || !film.tmdbId) return null;

  const kind = film.mediaType === 'tv' ? 'tv' : 'movie';
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${kind}/${film.tmdbId}/images?api_key=${encodeURIComponent(apiKey)}`,
      { cache: 'force-cache', next: { revalidate: CACHE_SECONDS } },
    );
    if (!response.ok) return null;
    const data = await response.json();
    const filePath = data.backdrops?.[0]?.file_path;
    return filePath ? `${IMAGE_BASE}/${size}${filePath}` : null;
  } catch {
    return null;
  }
}

export async function withTmdbBackdrops(watchlist) {
  const [featuredBackdrop, otherBackdrops] = await Promise.all([
    fetchBackdropUrl(watchlist.featured, 'w1280'),
    Promise.all(watchlist.others.map((film) => fetchBackdropUrl(film, 'w780'))),
  ]);

  return {
    ...watchlist,
    featured: { ...watchlist.featured, backdropUrl: featuredBackdrop },
    others: watchlist.others.map((film, index) => ({
      ...film,
      backdropUrl: otherBackdrops[index],
    })),
  };
}
