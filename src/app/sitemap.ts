import { getAllPosts } from '@/lib/post';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic'; 

// Define your static pages
const staticPages = [
  {
    url: 'https://soldbyghost.com/',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  },
  {
    url: 'https://soldbyghost.com/sell',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: 'https://soldbyghost.com/buy',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: 'https://soldbyghost.com/blog',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  },
  {
    url: 'https://soldbyghost.com/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
];

// Mock function to fetch blog posts (replace with your actual data fetching logic)
async function getBlogPostsPages() {
  const posts = await getAllPosts();
 
  return posts.map(post => ({
    url: `https://soldbyghost.com/blog/${post.Slug}`,
    lastModified: new Date(post.PublishedAt.Time),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
}

// Mock function to fetch blog categories (replace with your actual data fetching logic)
async function getBlogCategoriesPages() {
    const posts = await getAllPosts();
    const categories = Array.from(new Set(posts.flatMap(post => post.Tags)));
  return categories.map(category => ({
    url: `https://soldbyghost.com/blog/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes
  const blogPostsPages = await getBlogPostsPages();
  const blogCategoriesPages = await getBlogCategoriesPages();

  // Combine static and dynamic routes
  return [
    ...staticPages,
    ...blogPostsPages,
    ...blogCategoriesPages,
  ];
}
