import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-neutral">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative w-full aspect-square max-h-[22rem] lg:max-h-[30rem] overflow-hidden rounded-lg shadow-md">
            <Image
              src="/Headshot.jpg"
              alt="Diego Garcia, Realtor"
              fill
              className="object-cover object-[center_20%]"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary">
              Meet Diego Garcia, Chicago Realtor
            </h2>
            <p className="mt-4 text-lg text-brand-primary/80 leading-relaxed">
              Diego Garcia (License #475198454) is a dedicated Chicagoland
              realtor with Stonebridge Realty with two years of licensed
              experience, specializing in real estate investing. Leveraging his
              extensive knowledge of the Chicagoland market, Diego assists
              sellers in maximizing property value, guides investors to
              profitable opportunities, and helps buyers find their ideal homes
              across the region.
            </p>
            <p className="mt-4 text-lg text-brand-primary/80 leading-relaxed">
              Born and raised in the Chicago area, Diego Garcia brings a
              local&apos;s insight to neighborhoods and local cities like
              Schaumburg, Palatine, Aurora and beyond. Fluent in Spanish and an
              avid fitness enthusiast, he delivers energetic, personalized
              service to every client. Trust Diego to turn real estate goals
              into reality in the Chicago area.
            </p>
            <div className="mt-6">
              <Link href="/about">
                <button
                  className="px-6 py-3 bg-brand-secondary text-brand-primary rounded-md font-semibold shadow-md hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
                  aria-label="Learn more about Diego Garcia"
                >
                  Learn More About Diego
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
