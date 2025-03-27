import { getAllPosts } from "@/lib/post";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Blog | Chicago Suburbs Realty",
  description:
    "Expert insights on buying and selling homes in the northwest, north, and west suburbs of Chicago.",
  keywords:
    "Chicago suburbs real estate, Arlington Heights homes, Naperville market",
};

export default async function BlogPage() {
  let posts = await getAllPosts().catch((error) => {
    console.error("Error fetching posts:", error);
    return [];
  });

  if (!posts) {
    posts = [];
  }
  const featuredPost = posts.filter((post) =>
    post.tags.includes("featured")
  )[0];
  const otherPosts = posts[0] ? posts.slice(1) : [];

  return (
    <main className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          Real Estate Insights for Chicago Suburbs
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Tips, trends, and guides for buyers and sellers in Arlington Heights,
          Naperville, Schaumburg, and beyond.
        </p>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <Image
                  src="/Home2.webp"
                  alt={featuredPost.title}
                  width={1200}
                  height={600}
                  className="object-cover w-full h-80 md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-4 drop-shadow-md">
                    {featuredPost.excerpt}
                  </p>
                  <span className="text-sm opacity-80">
                    {featuredPost.publishedAt
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(featuredPost.publishedAt))
                      : "Date not available"}
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Other Posts */}
        <section>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
            More Real Estate Tips & Trends
          </h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={{
                  ...post,
                  image: post.thumbnail || "/Home2.webp", // Fallback stock image
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
