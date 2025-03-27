"use client";

import Link from "next/link";
import Carousel from "./carousel";
import Image from "next/image";

const images = [
  "/Home6.webp",
  "/Home2.webp",
  "/Home1.webp",
  "/Home3.webp",
  "/Interior1.webp",
  "/Home4.webp",
  "/Home5.webp",
];

export default function Hero() {
  return (
    <section className="relative flex flex-col lg:flex-row h-screen w-full pt-20">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <Carousel images={images} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Branding */}
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/Headshot.jpg"
          width={64}
          height={64}
          alt="Diego Garcia, Realtor"
          className="h-16 w-16 rounded-full border-2 border-brand-secondary shadow-md"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 h-screen w-full lg:w-1/2 flex flex-col items-start justify-center p-4 sm:p-8">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-brand-text">
          Homes You&apos;ll Love in Chicago&apos;s Best Neighborhoods
        </h1>
        <p className="mt-4 text-lg leading-relaxed max-w-lg text-brand-text/90">
          Buying? Selling? Investing? As your Chicagoland realtor, I deliver
          results with personalized service and real-time market insights.
        </p>
        <span className="mt-2 text-sm bg-brand-secondary/20 px-3 py-1 rounded-full text-brand-text">
          Your Trusted Local Realtor
        </span>

        {/* Call to Action */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {/* <input
            type="text"
            placeholder="Enter city or ZIP code"
            className="px-4 py-2 rounded-lg text-brand-text bg-transparent border-2 border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <button
            className="px-6 py-2 text-lg font-semibold bg-brand-secondary text-brand-primary rounded-lg shadow-lg hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
            aria-label="Search Creekside Listings"
          >
            Search Listings
          </button> */}
          <Link
            href="/contact"
            className="px-6 py-2 text-lg font-semibold bg-brand-secondary text-brand-primary rounded-lg shadow-lg hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
            aria-label="Contact Diego"
          >
            Contact Diego
          </Link>
        </div>
      </div>
    </section>
  );
}
