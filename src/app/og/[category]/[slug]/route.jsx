import { ImageResponse } from 'next/og';
import { getPostByRoute } from '../../../../lib/content/posts';
import { getCoverDesign } from '../../../../lib/covers';

export const revalidate = 86400;

// Gambar share default untuk tulisan tanpa cover atau ogImageUrl.
// Dipakai lewat generateMetadata, sehingga cover upload tetap diprioritaskan.
export async function GET(_request, { params }) {
  const { category, slug } = await params;
  const post = await getPostByRoute(category, slug);
  if (!post) return new Response('Not found', { status: 404 });

  const design = getCoverDesign(post);
  const chapter = post.seriesOrder ? `Bab ${String(post.seriesOrder).padStart(2, '0')}` : '';
  const kicker = [post.series, chapter].filter(Boolean).join(' · ') || 'HyBloggyon';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#121214',
          color: '#FAFAFA',
          borderBottom: `24px solid ${design.bg}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase' }}>
          <span>{kicker}</span>
          <span style={{ color: design.bg === '#2D221E' ? '#FAFAFA' : design.bg }}>{design.name}</span>
        </div>
        <div style={{ display: 'flex', fontSize: post.title.length > 28 ? 88 : 132, fontWeight: 300, letterSpacing: -4, lineHeight: 1 }}>
          {post.title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 3, color: 'rgba(250,250,250,0.75)' }}>
          <span>HYBLOGGYON</span>
          <span>{post.readingTime} MENIT BACA</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' },
    },
  );
}
