import AboutMe from "@/components/about";
import Contact from "@/components/contact";
import Estimate from "@/components/estimate";
// import FeaturedListings from "@/components/featuredListings";
import Hero from "@/components/hero";
import MarketTrends from "@/components/marketTrends";
import MortgageCalculator from "@/components/mortgageCalculator";
// import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <Hero />
      <section>
        <MarketTrends />
      </section>
      <section>
        <MortgageCalculator />
      </section>
      <section className="bg-white">
        <Estimate />
      </section>
      {/* <section>
        <FeaturedListings />
      </section> */}
      <section>
        <AboutMe />
      </section>
      {/* <section>
        <Testimonials />
      </section> */}
      <Contact />
    </main>
  );
}
