import { absoluteUrl, siteConfig } from '../../config/site.js';

export function serializeStructuredData(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function buildSiteStructuredData(profile) {
  const websiteId = absoluteUrl('/#website');
  const authorId = absoluteUrl('/#author');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: absoluteUrl('/'),
        name: profile.siteName,
        alternateName: profile.siteTitle,
        description: profile.description,
        inLanguage: siteConfig.language,
        publisher: { '@id': authorId },
      },
      {
        '@type': 'Person',
        '@id': authorId,
        name: profile.authorName,
        description: profile.authorBio || undefined,
        url: absoluteUrl('/about'),
      },
    ],
  };
}

export function buildArticleStructuredData(post, profile) {
  const canonicalUrl = absoluteUrl(post.canonicalUrl || post.url);
  const image = post.ogImageUrl || (post.coverExists ? post.coverImage : '');
  const authorId = absoluteUrl('/#author');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.seoDescription || post.excerpt,
        datePublished: new Date(`${post.date}T00:00:00.000Z`).toISOString(),
        dateModified: new Date(`${post.updatedAt}T00:00:00.000Z`).toISOString(),
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        url: canonicalUrl,
        image: image ? absoluteUrl(image) : undefined,
        author: { '@id': authorId },
        publisher: { '@id': authorId },
        articleSection: post.category,
        keywords: post.tags.join(', '),
        timeRequired: `PT${post.readingTime}M`,
        inLanguage: siteConfig.language,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': authorId,
        name: profile.authorName,
        url: absoluteUrl('/about'),
      },
    ],
  };
}
