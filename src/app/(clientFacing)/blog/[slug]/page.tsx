import { getPostBySlug, getAllPosts } from "@/lib/post";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

// Define props type to handle potentially async params
type BlogPostPageProps = {
  params: Promise<string>; // Union type for flexibility
};

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const slug = await params;

  const post = await getPostBySlug(slug).catch((error) => {
    console.error("Error fetching post:", error);
    return null;
  });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: `${post.title
      .split(" ")
      .join(", ")}, Chicago suburbs real estate`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

// Page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Resolve params if it's a Promise
  const slug = await params;

  const post = await getPostBySlug(slug).catch((error) => {
    console.error("Error fetching post:", error);
    return null;
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown date"}
        </p>
        <Image
          src={post.thumbnail || "/default-thumbnail.jpg"}
          alt={post.title}
          width={800}
          height={400}
          className="object-cover w-full h-64 md:h-96 rounded-lg mb-8"
        />
        <article className="prose prose-lg text-gray-700">
          {post.content}
        </article>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Contact Me for Expert Help
          </Link>
        </div>
      </div>
    </main>
  );
}

// Generate static paths
export async function generateStaticParams() {
  let posts = await getAllPosts().catch((error) => {
    console.error("Error fetching posts:", error);
    return [];
  });
  if (!posts) {
    posts = [];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
