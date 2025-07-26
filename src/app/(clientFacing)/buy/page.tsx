import Contact from "@/components/contact";
import Guide from "@/components/Guides";
import MortgageCalculator from "@/components/mortgageCalculator";
import PageHero from "@/components/pageHero";

export default function Buy() {
  return (
    <main className="bg-gray-50">
      <section>
        <PageHero variant="buy" />
      </section>
      <section>
        <MortgageCalculator />
      </section>
      <section>
        <Guide variant="buy" />
      </section>
      <section>
        <Contact />
      </section>
    </main>
  );
}
