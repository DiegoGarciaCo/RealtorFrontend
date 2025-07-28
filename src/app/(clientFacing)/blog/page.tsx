import { getAllPosts } from "@/lib/post";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Blog | Chicago Suburbs Realty",
  description:
    "Expert insights on buying and selling homes in the Chicago area.",
  keywords:
    "Chicago homes, Real Estate Blog, real estate tips, real estate investing, home buying tips, home selling tips, Arlington Heights Homes, Naperville Homes, Schaumburg home, Chicago suburbs homes",
};
export const dynamic = "force-dynamic"; 

export default async function BlogPage() {
  let posts = await getAllPosts().catch((error) => {
    console.error("Error fetching posts:", error);
    return [];
  });

  if (!posts) {
    posts = [];
  }
  const featuredPost = posts.filter((post) =>
    post.Tags.includes("featured")
  )[0];
  const otherPosts = posts.filter(post => !post.Tags.includes("featured"));
  const categories = Array.from(
    new Set(otherPosts.flatMap((post) => post.Tags))
  );

  return (
    <main className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          Real Estate Insights for Chicago 
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Tips, trends, and guides for buyers and sellers in the Chicago area. Whether you&apos;re looking to buy your first home, sell your property, or stay updated on the latest market trends, our blog has you covered.
        </p>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <Link href={`/blog/${featuredPost.Slug}`} className="block group">
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <Image
                  src="/Home2.webp"
                  alt={featuredPost.Title}
                  width={1200}
                  height={600}
                  className="object-cover w-full h-80 md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {featuredPost.Title}
                  </h2>
                  <p className="text-lg md:text-xl mb-4 drop-shadow-md">
                    {featuredPost.Excerpt.Valid ? featuredPost.Excerpt.String : "No excerpt available."}
                  </p>
                  <span className="text-sm opacity-80">
                    {featuredPost.PublishedAt.Valid
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(featuredPost.PublishedAt.Time))
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
            {categories.map((category) => {
              const categoryPosts = otherPosts
                .filter((post) => post.Tags.includes(category))
                .slice(0, 2);
              return (
                <div key={category}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 capitalize">
                      {category}
                    </h4>
                    <Link
                      href={`/blog/category/${category}`}
                      className="text-sm text-gray-500 hover:underline hover:text-gray-900 capitalize"
                    >
                      browse all
                    </Link>
                  </div>
                  {categoryPosts.map((post) => (
                    <BlogCard key={post.ID} post={post} />
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
