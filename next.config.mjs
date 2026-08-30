/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: `${Math.max(1, Number(process.env.MEDIA_MAX_SIZE_MB || 8) + 1)}mb`,
    },
  },
  env: {
    NEXT_PUBLIC_TMDB_API_KEY:
      process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.VITE_TMDB_API_KEY || '',
  },
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
