import { GetPostBySlugRow, ListPublishedPostsResponse } from "./definitions";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";

export async function getAllPosts(): Promise<ListPublishedPostsResponse> {
  const response = await fetch(
    `${domain}/api/posts/published`
  );
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
