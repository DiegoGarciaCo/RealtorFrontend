import { getPostBySlug, getAllPosts } from "@/lib/post";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

// Define props type to handle async params and searchParams
type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>> | undefined; // Updated to Promise
};

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params; // Await params to get slug

  const post = await getPostBySlug(slug).catch((error) => {
    console.error("Error fetching post:", error);
    return null;
  });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.Title,
    description: post.Excerpt.Valid ? post.Excerpt.String : "No excerpt available.",
    keywords: `${post.Title
      .split(" ")
      .join(", ")}, Chicago suburbs real estate`,
    openGraph: {
      title: post.Title,
      description: post.Excerpt.Valid ? post.Excerpt.String : "No excerpt available.",
      images: post.Thumbnail.Valid ? [post.Thumbnail.String] : [],
    },
  };
}

// Page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

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
          {post.Title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.PublishedAt.Valid
            ? new Date(post.PublishedAt.Time).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown date"}
        </p>
        <Image
          src={post.Thumbnail.Valid ? post.Thumbnail.String : "/default-thumbnail.jpg"}
          alt={post.Title}
          width={800}
          height={400}
          className="object-cover w-full h-64 md:h-96 rounded-lg mb-8"
        />
        <article className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: post.Content }} />
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="px-10 py-5 text-lg font-semibold bg-brand-secondary text-brand-primary rounded-lg shadow-lg hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
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
    slug: post.Slug,
  }));
}
