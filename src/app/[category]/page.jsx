import { notFound } from 'next/navigation';
import CategoryView from '../../features/category/CategoryView';
import { getAllPosts } from '../../lib/content/posts';
import { getCategories, getCategoryBySlug } from '../../lib/content/categories';
import { getResolvedSiteContent } from '../../lib/content/site-content';

export const revalidate = 300;

const PAGE_SIZE = 12;

function parsePage(value) {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export async function generateStaticParams() {
  return (await getCategories())
    .filter((category) => category.href === `/${category.slug}`)
    .map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  const page = parsePage((await searchParams).halaman);

  return {
    title: page > 1 ? `${category.name} — Halaman ${page}` : category.name,
    description: category.description || `Kumpulan tulisan kategori ${category.name} di HyBloggyon.`,
    alternates: { canonical: page > 1 ? `${category.href}?halaman=${page}` : category.href },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || category.href !== `/${slug}`) notFound();

  const posts = (await getAllPosts()).filter((post) => post.category === slug);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const page = parsePage((await searchParams).halaman);
  if (page > totalPages) notFound();

  const offset = (page - 1) * PAGE_SIZE;
  const footerContent = await getResolvedSiteContent('about');

  return (
    <CategoryView
      category={category}
      posts={posts.slice(offset, offset + PAGE_SIZE)}
      page={page}
      totalPages={totalPages}
      offset={offset}
      footerContent={footerContent}
    />
  );
}
