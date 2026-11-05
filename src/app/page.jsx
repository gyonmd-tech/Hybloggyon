import HomeView from '../features/home/HomeView';
import { getAllPosts } from '../lib/content/posts';
import { getResolvedSiteContent } from '../lib/content/site-content';

export default async function HomePage() {
  const [posts, content, footerContent] = await Promise.all([
    getAllPosts(),
    getResolvedSiteContent('home'),
    getResolvedSiteContent('about'),
  ]);
  return <HomeView posts={posts} content={content} footerContent={footerContent} />;
}
