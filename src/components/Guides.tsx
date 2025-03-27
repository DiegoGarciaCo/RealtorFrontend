"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface GuideProps {
  variant: "buy" | "sell";
}

export default function Guide({ variant }: GuideProps) {
  const buyerSteps = [
    {
      title: "Step 1: Get Pre-Approved for a Mortgage",
      description:
        "Before you start house hunting, know your budget. Pre-approval shows sellers you’re serious and gives you a competitive edge in [Your Area]’s fast-moving market. I partner with top local lenders to streamline this process, often securing better rates than you’d find on your own. Expect this to take 2-5 days with a credit check, income verification, and debt review.",
      proTip:
        "Ask for a pre-approval letter valid for 90 days—rates can shift quickly!",
    },
    {
      title: "Step 2: Define Your Must-Haves and Search Smart",
      description:
        "List your priorities: bedrooms, location, school districts, or commute time. I’ll set up a custom MLS search tailored to [Your Area]’s inventory, including off-market listings only agents can access. You’ll get real-time updates as homes hit the market. Fun fact: 80% of buyers adjust their ‘must-haves’ after seeing what’s available—flexibility pays off.",
      proTip:
        "Look beyond photos—lot size and layout matter more than you think.",
    },
    {
      title: "Step 3: Tour Homes and Make an Offer",
      description:
        "I’ll schedule private tours and point out red flags—like foundation issues or outdated systems—that photos hide. When you’re ready, I’ll craft an offer based on comps (recent sales in [Your Area]), market trends, and seller motivation. In a bidding war? My negotiation tactics have won 9 out of 10 multiple-offer scenarios for my clients last year.",
      proTip:
        "Include an escalation clause to beat competing offers without overpaying.",
    },
    {
      title: "Step 4: Navigate Inspections and Closing",
      description:
        "Post-offer, we’ll order inspections (about $300-$500 in [Your Area]) to uncover hidden costs. I’ll negotiate repairs or credits if issues arise. Then, it’s Appraisal Day—lenders verify the home’s value. Closing takes 30-45 days; I’ll coordinate with title companies and attorneys to ensure no surprises. You’ll sign 100+ pages—don’t worry, I’ll explain every one.",
      proTip:
        "Budget 2-5% of the home price for closing costs—unexpected fees add up.",
    },
  ];

  const sellerSteps = [
    {
      title: "Step 1: Price Your Home Strategically",
      description:
        "Pricing isn’t guesswork—it’s data. I’ll run a Comparative Market Analysis (CMA) using recent [Your Area] sales, adjusting for upgrades, lot size, and condition. Overprice, and you’ll sit unsold; underprice, and you lose equity. In 2024, homes here sold for 98% of list price on average—I aim for 100% or better with smart staging and timing.",
      proTip:
        "Price just below a round number (e.g., $499K vs. $500K) to attract more eyes.",
    },
    {
      title: "Step 2: Prep and Stage Like a Pro",
      description:
        "First impressions win buyers. Declutter, deep clean, and paint neutral tones—buyers hate fixer-uppers. I’ll recommend local stagers (around $1,000-$2,000 in [Your Area]) and coordinate pro photography. Curb appeal? Mow the lawn, add potted plants—stats show staged homes sell 20% faster and for 6% more. I’ve got a checklist ready.",
      proTip: "Focus on kitchens and bathrooms—buyers judge these hardest.",
    },
    {
      title: "Step 3: Market to the Right Buyers",
      description:
        "Your home deserves more than a sign and an MLS post. I’ll create a 3D virtual tour, target ads to [Your Area]’s buyer demographics, and tap my network of agents with ready clients. Open houses? I host them strategically—Sundays from 1-3 PM draw the biggest crowds here. Last year, my listings averaged 12 days on market vs. the local 30-day norm.",
      proTip:
        "Highlight unique features (e.g., a renovated basement) in every listing.",
    },
    {
      title: "Step 4: Negotiate Offers and Close Strong",
      description:
        "When offers roll in, I’ll analyze each—price, contingencies, and buyer financing. Cash offers close faster but aren’t always highest; I’ve turned lowballs into top bids with counteroffers. Closing takes 30-60 days; I’ll manage appraisals, inspections, and title work. My goal: max profit, zero stress. Clients saved $15K on average last year from my repair negotiations.",
      proTip:
        "Don’t jump at the first offer—multiple bids often follow in hot markets.",
    },
  ];

  const steps = variant === "buy" ? buyerSteps : sellerSteps;
  const title =
    variant === "buy"
      ? "Your Expert Guide to Buying a Home"
      : "Your Expert Guide to Selling Your Home";
  const intro =
    variant === "buy"
      ? "Buying a home in [Your Area] can feel overwhelming, but it doesn’t have to be. Here’s my proven process to get you from dreaming to moving in—packed with insider tips you won’t find elsewhere."
      : "Selling your home in [Your Area] is a big move. My detailed roadmap turns complexity into cash, leveraging local trends and my experience to get you the best deal possible.";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hoverVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  // UseInView hook to detect when the component is in view
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-16 bg-brand-neutral">
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-brand-primary mb-4"
            variants={stepVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-brand-primary/80 max-w-2xl mx-auto"
            variants={stepVariants}
          >
            {intro}
          </motion.p>
        </div>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-xl shadow-lg p-6 flex items-start border-l-4 border-brand-secondary cursor-pointer"
              variants={stepVariants}
              whileHover="hover"
              custom={hoverVariants}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-brand-secondary text-brand-primary rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-brand-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-brand-primary/80 mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="bg-brand-secondary/10 p-3 rounded-lg">
                  <span className="text-brand-primary font-semibold">
                    Pro Tip:{" "}
                  </span>
                  <span className="text-brand-primary">{step.proTip}</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-secondary" />
            </motion.div>
          ))}
        </div>
        <motion.div className="text-center mt-12" variants={stepVariants}>
          <p className="text-lg text-brand-primary/80">
            Ready to get started? I&apos;ve done this hundreds of
            times—let&apos;s make it seamless for you.
          </p>
          <a
            href="#contact"
            className="inline-block mt-4 bg-brand-secondary text-brand-primary py-3 px-8 rounded-lg text-lg font-semibold shadow-md hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
          >
            Work With Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
