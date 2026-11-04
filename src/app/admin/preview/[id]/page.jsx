import { notFound } from 'next/navigation';
import { z } from 'zod';
import ArticleView from '../../../../features/article/ArticleView';
import { requireAdmin } from '../../../../lib/auth/session';
import { parsePostDetail } from '../../../../lib/content/contracts';
import { getAllPosts, getPostNavigation } from '../../../../lib/content/posts';
import { getResolvedSiteContent } from '../../../../lib/content/site-content';
import { findPostForPreview } from '../../../../lib/db/repositories/posts';

export const dynamic = 'force-dynamic';

const STATUS_LABELS = {
  draft: 'Draft',
  scheduled: 'Terjadwal',
  published: 'Terbit',
  archived: 'Arsip',
};

export const metadata = { title: 'Pratinjau artikel' };

export default async function PostPreviewPage({ params }) {
  const { id } = await params;
  await requireAdmin(`/admin/preview/${id}`);
  if (!z.string().uuid().safeParse(id).success) notFound();

  const result = await findPostForPreview(id);
  if (!result) notFound();

  const post = parsePostDetail(result.post);
  const navigation = getPostNavigation(post, await getAllPosts());
  const footerContent = await getResolvedSiteContent('about');

  return (
    <>
      <div
        role="status"
        style={{
          position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
          backgroundColor: 'var(--color-ink)', color: 'var(--color-background)',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
          boxShadow: '4px 4px 0 var(--color-accent-warm)', maxWidth: 'calc(100vw - 32px)',
        }}
      >
        <span>Pratinjau · {STATUS_LABELS[result.status] || result.status}</span>
        <a href={`/admin/posts/${id}/edit`} style={{ color: 'inherit', textDecoration: 'underline' }}>Kembali ke editor</a>
      </div>
      <ArticleView
        post={post}
        relatedPosts={navigation.related}
        previousPost={null}
        nextPost={null}
        footerContent={footerContent}
      />
    </>
  );
}
