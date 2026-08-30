const DEFAULT_SITE_URL = 'https://hybloggyon.vercel.app';

export const siteConfig = {
  name: 'HyBloggyon',
  title: 'HyBloggyon — Field Study',
  description:
    'Workshop digital untuk preservasi pemikiran — esai panjang, catatan belajar, dan analisis pop-culture dari sudut pandang filosofis.',
  locale: 'id_ID',
  language: 'id',
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ''),
};

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteConfig.url}/`).toString();
}
