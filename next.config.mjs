/** @type {import('next').NextConfig} */
const adminSecurityHeaders = [
  { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, noimageindex' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'no-referrer' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
    ],
  },
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
        source: '/admin',
        headers: adminSecurityHeaders,
      },
      {
        source: '/admin/:path*',
        headers: adminSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
