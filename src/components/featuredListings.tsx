"use client";

import Image from "next/image";
import Link from "next/link";

// Placeholder data (replace with MRED API data later)
const listings = [
  {
    id: 1,
    image: "/Home1.webp",
    price: "$425,000",
    bedrooms: 3,
    bathrooms: 2,
    address: "123 Maple St, Naperville, IL",
  },
  {
    id: 2,
    image: "/Home2.webp",
    price: "$599,900",
    bedrooms: 4,
    bathrooms: 3,
    address: "456 Oak Ave, Lincoln Park, IL",
  },
  {
    id: 3,
    image: "/Home3.webp",
    price: "$375,000",
    bedrooms: 2,
    bathrooms: 2,
    address: "789 Pine Rd, Oak Park, IL",
  },
];

export default function FeaturedListings() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-neutral">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary">
            Explore Chicago&apos;s Hottest Homes
          </h2>
          <p className="mt-3 text-lg text-brand-primary/80">
            Updated daily from MRED MLS—find your perfect property now.
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={listing.image}
                  alt={listing.address}
                  fill
                  className="object-cover"
                  priority={listing.id === 1} // Priority for first image
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-brand-primary">
                  {listing.price}
                </h3>
                <p className="mt-1 text-brand-primary/80">
                  {listing.bedrooms} Bed • {listing.bathrooms} Bath
                </p>
                <p className="mt-1 text-sm text-brand-primary/60">
                  {listing.address}
                </p>
                <Link href={`/listings/${listing.id}`}>
                  <button
                    className="mt-4 w-full px-4 py-2 bg-brand-secondary text-brand-primary rounded-md font-semibold shadow-md hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
                    aria-label={`View details for ${listing.address}`}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All CTA */}
        <div className="text-center mt-10">
          <Link href="/search">
            <button className="px-6 py-3 bg-brand-neutral text-brand-primary border-2 border-brand-secondary rounded-md font-semibold hover:bg-brand-secondary hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300">
              See All Listings
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
