"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface HeroSectionProps {
  variant: "buy" | "sell";
}

export default function PageHero({ variant }: HeroSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  if (variant === "sell") {
    return (
      <motion.section
        ref={ref}
        className="relative py-12 text-center overflow-hidden bg-brand-neutral"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0">
          <Image
            src="/Home2.webp"
            alt="Beautiful home for sale"
            fill
            className="object-cover opacity-80"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col justify-center min-h-[450px]">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg tracking-tight text-brand-text"
            variants={textVariants}
          >
            Sell Your Home Fast and For Top Dollar
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto text-brand-text"
            variants={textVariants}
          >
            Get a free estimate in minutes. I&apos;ll handle every
            detail—marketing, negotiations, closing—so you can focus on your
            next chapter.
          </motion.p>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              href="/sell#home-estimate"
              className="inline-block bg-brand-secondary text-brand-primary py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
            >
              Get Your Free Estimate
            </Link>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (variant === "buy") {
    return (
      <motion.section
        ref={ref}
        className="relative py-12 text-center overflow-hidden bg-brand-neutral"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0">
          <Image
            src="/Home1.webp"
            alt="Dream home in the suburbs"
            fill
            className="object-cover opacity-80"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col justify-center min-h-[450px]">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg tracking-tight text-brand-text"
            variants={textVariants}
          >
            Find Your Dream Home Today
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto text-brand-text"
            variants={textVariants}
          >
            Helping buyers in the Chicago suburbs since 2022. From pre-approval
            to keys in hand, I&apos;ll guide you every step of the way.
          </motion.p>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              href="/buy#mortgage-calculator"
              className="inline-block bg-brand-secondary text-brand-primary py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
            >
              Calculate Your Mortgage
            </Link>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return null;
}
