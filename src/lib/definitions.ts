export interface GetPostBySlugRow {
  id: string; // uuid.UUID -> string
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null; // sql.NullString -> optional string or null
  status?: string | null; // sql.NullString -> optional string or null
  author?: string | null; // sql.NullString -> optional string or null
  publishedAt?: Date | null; // sql.NullTime -> optional Date or null
  thumbnail?: string | null; // sql.NullString -> optional string or null
  createdAt?: Date | null; // sql.NullTime -> optional Date or null
  updatedAt?: Date | null; // sql.NullTime -> optional Date or null
  tags: string[]; // []string -> string[]
}

interface ListPublishedPostsRow {
  id: string; // uuid.UUID -> string
  title: string;
  slug: string;
  excerpt?: string | null; // sql.NullString -> optional string or null
  createdAt?: Date | null; // sql.NullTime -> optional Date or null
  tags: string[]; // []string -> string[]
  thumbnail?: string | null; // sql.NullString -> optional string or null
  publishedAt?: Date | null; // sql.NullTime -> optional Date or null
  author?: string | null; // sql.NullString -> optional string or null
}

export type ListPublishedPostsResponse = ListPublishedPostsRow[];
