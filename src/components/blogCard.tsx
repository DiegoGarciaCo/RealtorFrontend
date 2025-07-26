import Link from "next/link";
import Image from "next/image";
import { GetPostBySlugRow, ListPublishedPostsRow, PostByCategoryRow } from "@/lib/definitions";

interface BlogCardProps {
  post: GetPostBySlugRow | ListPublishedPostsRow | PostByCategoryRow;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.Slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <Image
          src={post.Thumbnail.Valid ? post.Thumbnail.String : "/default-thumbnail.jpg"}
          alt={post.Title}
          width={400}
          height={250}
          className="object-cover w-full h-48"
        />
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.Title}
          </h2>
          <p
          className="text-gray-600 mb-3 line-clamp-3"
          dangerouslySetInnerHTML={{
              __html: post.Excerpt.Valid ? post.Excerpt.String : "<i>No excerpt available.</i>",
          }}
          ></p>
          <p className="text-sm text-gray-500">
            {post.PublishedAt.Valid
              ? new Date(post.PublishedAt.Time).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
              })
              : "Unknown date"}
          </p>
        </div>
      </div>
    </Link>
  );
}
