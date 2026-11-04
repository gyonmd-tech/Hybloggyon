import HomeView from '../features/home/HomeView';
import { getAllPosts } from '../lib/content/posts';
import { getCategories } from '../lib/content/categories';
import { getResolvedSiteContent } from '../lib/content/site-content';

export default async function HomePage() {
  const [posts, categories, content, footerContent] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getResolvedSiteContent('home'),
    getResolvedSiteContent('about'),
  ]);
  return <HomeView posts={posts} categories={categories} content={content} footerContent={footerContent} />;
}
