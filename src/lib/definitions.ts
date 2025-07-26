interface nullableString {
    String: string;
    Valid: boolean;
}

interface nullableDate {
    Time: string;
    Valid: boolean;
}

export interface GetPostBySlugRow {
  ID: string;
  Title: string;
  Slug: string;
  Content: string;
  Excerpt: nullableString;
  Status: nullableString;
  Author: nullableString;
  PublishedAt: nullableDate;
  Thumbnail: nullableString;
  CreatedAt: nullableDate;
  UpdatedAt: nullableDate;
  Tags: string[];
}

export interface ListPublishedPostsRow {
  ID: string;
  Title: string;
  Slug: string;
  Excerpt: nullableString;
  CreatedAt: nullableDate; 
  Tags: string[];
  Thumbnail: nullableString;
  PublishedAt: nullableDate;
  Author: nullableString;
}

export type ListPublishedPostsResponse = ListPublishedPostsRow[];

export interface PostByCategoryRow {
    ID: string;
    Title: string;
    Slug: string;
    Excerpt: nullableString;
    CreatedAt: nullableDate;
    Tags: string[];
    Thumbnail: nullableString;
    PublishedAt: nullableDate;
    Author: nullableString;
}
