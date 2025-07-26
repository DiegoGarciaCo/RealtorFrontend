import { GetPostBySlugRow, ListPublishedPostsResponse, PostByCategoryRow } from "./definitions";

const domain = "https://api.soldbyghost.com";

export async function getAllPosts(): Promise<ListPublishedPostsResponse> {
  const response = await fetch(domain + "/api/posts/published");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data;
}

export async function getPostBySlug(slug: string): Promise<GetPostBySlugRow> {
  const response = await fetch(`${domain}/api/posts/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with slug: ${slug}`);
  }
  return response.json();
}

export async function getPostsByCategory(category: string): Promise<PostByCategoryRow[]> {
    const endcodedCategory = encodeURIComponent(category);
  const response = await fetch(`${domain}/api/posts/category/${endcodedCategory}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for category: ${category}`);
  }
  return response.json();
} 
