import { notFound, permanentRedirect, redirect } from 'next/navigation';
import ArticleView from '../../../features/article/ArticleView';
import {
  getAllPosts,
  getContentSource,
  getPostByRoute,
  getPostNavigation,
  getPostRouteParams,
} from '../../../lib/content/posts';
import { siteConfig } from '../../../config/site';
import { findSlugRedirect } from '../../../lib/db/repositories/redirects';
import { getResolvedSiteProfile } from '../../../lib/content/site-settings';
import {
  buildArticleStructuredData,
  serializeStructuredData,
} from '../../../lib/seo/structured-data';

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

  const image = post.ogImageUrl || (post.coverExists ? post.coverImage : '');
  const description = post.seoDescription || post.excerpt;
  const title = post.seoTitle || post.title;
  const canonical = post.canonicalUrl || post.url;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: !post.noIndex, follow: !post.noIndex },
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      siteName: profile.siteName,
      url: canonical,
      title,
      description,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: ['/about'],
      section: post.category,
      tags: post.tags,
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
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
  const serializedSchema = serializeStructuredData(
    buildArticleStructuredData(post, profile),
  );

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
