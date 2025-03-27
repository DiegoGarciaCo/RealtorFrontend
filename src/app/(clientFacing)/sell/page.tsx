import Contact from "@/components/contact";
import Estimate from "@/components/estimate";
import Guide from "@/components/Guides";
import MarketTrends from "@/components/marketTrends";
import PageHero from "@/components/pageHero";

export default function Sell() {
  return (
    <main className="bg-gray-100">
      <section>
        <PageHero variant="sell" />
      </section>
      <section>
        <Estimate />
      </section>
      <section>
        <Guide variant="sell" />
      </section>
      <section className="bg-white">
        <MarketTrends />
      </section>
      <section>
        <Contact />
      </section>
    </main>
  );
}
