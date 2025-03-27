import { GetPostBySlugRow, ListPublishedPostsResponse } from "./definitions";

export async function getAllPosts(): Promise<ListPublishedPostsResponse> {
  const response = await fetch(
    "https://api.soldbyghost.com/api/posts/published"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data;
}

export async function getPostBySlug(slug: string): Promise<GetPostBySlugRow> {
  const response = await fetch(`https://api.soldbyghost.com/api/posts/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with slug: ${slug}`);
  }
  return response.json();
}
