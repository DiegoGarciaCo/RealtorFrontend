import { getAllPosts } from "@/lib/post";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Define props type to handle potentially async params
type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

// Dynamic metadata based on category
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  // Resolve params if it's a Promise
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const category = resolvedParams.category.replace(/-/g, " ").toLowerCase();
  return {
    title: `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } | Chicago Suburbs Realty Blog`,
    description: `Explore all blog posts about ${category} in the Chicago suburbs real estate market.`,
    keywords: `${category}, Chicago suburbs, real estate, Arlington Heights, Naperville`,
  };
}

// Dynamic page component
export default async function CategoryPage({ params }: CategoryPageProps) {
  // Resolve params if it's a Promise
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const categoryParam = resolvedParams.category;

  // Fetch all posts
  const posts = await getAllPosts().catch((error) => {
    console.error("Error fetching posts:", error);
    return [];
  });

  if (!posts || posts.length === 0) {
    return (
      <main className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            No Posts Found
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-center">
            There are no posts available at this time.
          </p>
          <Link
            href="/blog"
            className="block text-center mt-4 text-blue-600 hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Normalize category (e.g., "arlington-heights" -> "arlington heights")
  const category = categoryParam.replace(/-/g, " ").toLowerCase();

  // Filter posts by category
  const categoryPosts = posts.filter((post) =>
    post.tags.map((tag) => tag.toLowerCase()).includes(category)
  );

  // If no posts match the category, trigger 404
  if (categoryPosts.length === 0) {
    notFound();
  }

  // Capitalize category for display
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          {displayCategory} Posts
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Browse all articles related to {category} in the Chicago suburbs real
          estate market.
        </p>

        {/* Posts Grid */}
        <section>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Back to Blog Link */}
        <div className="mt-12 text-center">
          <Link href="/blog" className="text-blue-600 hover:underline text-lg">
            Back to All Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
