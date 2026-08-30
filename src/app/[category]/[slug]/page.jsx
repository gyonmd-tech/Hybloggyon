import { notFound, permanentRedirect, redirect } from 'next/navigation';
import ArticleView from '../../../features/article/ArticleView';
import {
  getAllPosts,
  getContentSource,
  getPostByRoute,
  getPostNavigation,
  getPostRouteParams,
} from '../../../lib/content/posts';
import { absoluteUrl, siteConfig } from '../../../config/site';
import { findSlugRedirect } from '../../../lib/db/repositories/redirects';
import { getResolvedSiteProfile } from '../../../lib/content/site-settings';

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return getPostRouteParams();
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const post = await getPostByRoute(category, slug);
  if (!post) return {};
  const profile = await getResolvedSiteProfile();

  const image =
    post.ogImageUrl ||
    (post.coverExists ? post.coverImage : profile.defaultOgImage);
  const description = post.seoDescription || post.excerpt;

  return {
    title: post.seoTitle || post.title,
    description,
    alternates: { canonical: post.canonicalUrl || post.url },
    robots: { index: !post.noIndex, follow: !post.noIndex },
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      siteName: profile.siteName,
      url: post.url,
      title: post.title,
      description,
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const post = await getPostByRoute(category, slug);
  if (!post) {
    if (getContentSource() === 'database') {
      const routeRedirect = await findSlugRedirect(`/${category}/${slug}`);
      if (routeRedirect?.statusCode === 301 || routeRedirect?.statusCode === 308) {
        permanentRedirect(routeRedirect.toPath);
      }
      if (routeRedirect) redirect(routeRedirect.toPath);
    }
    notFound();
  }

  const navigation = getPostNavigation(post, await getAllPosts());
  const profile = await getResolvedSiteProfile();
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: absoluteUrl(post.url),
    image: absoluteUrl(post.coverExists ? post.coverImage : profile.defaultOgImage),
    author: {
      '@type': 'Person',
      name: profile.authorName,
      url: absoluteUrl('/about'),
    },
  };
  const serializedSchema = JSON.stringify(articleSchema).replace(/</g, '\\u003c');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedSchema }}
      />
      <ArticleView
        post={post}
        relatedPosts={navigation.related}
        previousPost={navigation.previous}
        nextPost={navigation.next}
      />
    </>
  );
}
