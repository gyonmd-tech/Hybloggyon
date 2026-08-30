import HomeView from '../features/home/HomeView';
import { getAllPosts } from '../lib/content/posts';

export default async function HomePage() {
  return <HomeView posts={await getAllPosts()} />;
}
