"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MarketTrends() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeChart, setActiveChart] = useState("price");

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Chart data with brand colors
  const priceData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025 (Proj)"],
    datasets: [
      {
        label: "Median Sale Price (Northwest Suburbs)",
        data: [300000, 320000, 340000, 360000, 395000, 410000],
        borderColor: "#93C5FD", // brand-accent
        backgroundColor: "rgba(147, 197, 253, 0.2)", // brand-accent with opacity
        tension: 0.1,
      },
      {
        label: "Median Sale Price (West Suburbs)",
        data: [280000, 300000, 315000, 335000, 365000, 380000],
        borderColor: "#A3BFFA", // brand-secondary
        backgroundColor: "rgba(163, 191, 250, 0.2)", // brand-secondary with opacity
        tension: 0.1,
      },
    ],
  };

  const inventoryData = {
    labels: ["2022", "2023", "2024", "2025 (Proj)"],
    datasets: [
      {
        label: "Months of Supply (Schaumburg)",
        data: [3.5, 2.8, 1.5, 1.8],
        backgroundColor: "rgba(163, 191, 250, 0.6)", // brand-secondary with opacity
      },
      {
        label: "Months of Supply (Naperville)",
        data: [4.0, 3.2, 2.0, 2.3],
        backgroundColor: "rgba(147, 197, 253, 0.6)", // brand-accent with opacity
      },
    ],
  };

  const daysOnMarketData = {
    labels: ["2022", "2023", "2024", "2025 (Proj)"],
    datasets: [
      {
        label: "Days on Market (Arlington Heights)",
        data: [70, 65, 57, 50],
        borderColor: "#93C5FD", // brand-accent
        backgroundColor: "rgba(147, 197, 253, 0.2)", // brand-accent with opacity
        tension: 0.1,
      },
      {
        label: "Days on Market (Naperville)",
        data: [60, 45, 30, 25],
        borderColor: "#A3BFFA", // brand-secondary
        backgroundColor: "rgba(163, 191, 250, 0.2)", // brand-secondary with opacity
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: (chart: "price" | "inventory" | "days") =>
          chart === "price"
            ? "Median Sale Price Trends"
            : chart === "inventory"
            ? "Inventory Trends (Months of Supply)"
            : "Days on Market Trends",
        color: "#1E293B", // brand-primary
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: (chart: "price" | "inventory" | "days") =>
            chart === "price"
              ? "Price ($)"
              : chart === "inventory"
              ? "Months"
              : "Days",
          color: "#1E293B", // brand-primary
        },
        ticks: { color: "#1E293B" }, // brand-primary
      },
      x: {
        ticks: { color: "#1E293B" }, // brand-primary
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-brand-neutral to-white">
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-brand-primary mb-6 text-center"
          variants={itemVariants}
        >
          Market Trends in the Chicagoland area 
        </motion.h2>
        <motion.p
          className="text-lg text-brand-primary/80 mb-12 text-center max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Thinking of selling in 2025? The chicago area is buzzing with
          opportunity. Here&apos;s the latest on what&apos;s driving our local
          market, straight from the data, so you can sell smarter.
        </motion.p>

        {/* Interactive Chart Controls */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveChart("price")}
            className={`py-2 px-4 rounded-lg ${
              activeChart === "price"
                ? "bg-brand-secondary text-brand-primary"
                : "bg-brand-neutral text-brand-primary hover:bg-brand-secondary/20"
            } transition`}
          >
            Price Trends
          </button>
          <button
            onClick={() => setActiveChart("inventory")}
            className={`py-2 px-4 rounded-lg ${
              activeChart === "inventory"
                ? "bg-brand-secondary text-brand-primary"
                : "bg-brand-neutral text-brand-primary hover:bg-brand-secondary/20"
            } transition`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveChart("days")}
            className={`py-2 px-4 rounded-lg ${
              activeChart === "days"
                ? "bg-brand-secondary text-brand-primary"
                : "bg-brand-neutral text-brand-primary hover:bg-brand-secondary/20"
            } transition`}
          >
            Days on Market
          </button>
        </div>

        {/* Chart Display */}
        <motion.div
          variants={itemVariants}
          className="bg-brand-neutral p-6 rounded-xl shadow-lg mb-8"
        >
          {activeChart === "price" && (
            <Line
              data={priceData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Median Sale Price Trends",
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: {
                      ...chartOptions.scales.y.title,
                      text: "Price ($)",
                    },
                  },
                },
              }}
            />
          )}
          {activeChart === "inventory" && (
            <Bar
              data={inventoryData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Inventory Trends (Months of Supply)",
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: { ...chartOptions.scales.y.title, text: "Months" },
                  },
                },
              }}
            />
          )}
          {activeChart === "days" && (
            <Line
              data={daysOnMarketData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Days on Market Trends",
                  },
                },
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: { ...chartOptions.scales.y.title, text: "Days" },
                  },
                },
              }}
            />
          )}
        </motion.div>

        {/* Trend Details */}
        <div className="space-y-8">
          <motion.div
            className="bg-brand-neutral rounded-xl shadow-lg p-6 border-l-4 border-brand-secondary"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-brand-primary mb-2">
              Home Prices Are Climbing—But Moderating
            </h3>
            <p className="text-brand-primary/80 mb-4 leading-relaxed">
              In 2024, median home prices in the Chicago metro rose 6.7% to
              $320,000. In our suburbs, like Naperville ($530K, +20% since 2022)
              and Arlington Heights ($395K, +11.3%), gains were steeper due to
              low inventory. For 2025, expect 3-5% growth as rates ease to ~6%
              (NAR projection).
            </p>
            <div className="bg-brand-secondary/10 p-3 rounded-lg">
              <span className="text-brand-primary font-semibold">
                Seller Tip:{" "}
              </span>
              <span className="text-brand-primary">
                Price just under a threshold to spark bidding wars.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-brand-neutral rounded-xl shadow-lg p-6 border-l-4 border-brand-secondary"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-brand-primary mb-2">
              Inventory Stays Tight—Sellers Hold the Edge
            </h3>
            <p className="text-brand-primary/80 mb-4 leading-relaxed">
              Schaumburg and Elk Grove Village averaged 1.5-2 months of supply
              in 2024, with Elmhurst down 38.1% in listings. Homeowners with
              3-4% rates are staying put, but 2025 may see a slight listing
              bump—still a seller&apos;s market in family-friendly Naperville.
            </p>
            <div className="bg-brand-secondary/10 p-3 rounded-lg">
              <span className="text-brand-primary font-semibold">
                Seller Tip:{" "}
              </span>
              <span className="text-brand-primary">
                Stage your home—turnkey properties sell in under 30 days.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-brand-neutral rounded-xl shadow-lg p-6 border-l-4 border-brand-secondary"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-brand-primary mb-2">
              Homes Sell Fast—Timing Is Everything
            </h3>
            <p className="text-brand-primary/80 mb-4 leading-relaxed">
              Arlington Heights averaged 57 days on market in 2024, Naperville
              20-30 days, and West Chicago just 11 days. With remote work
              driving demand, 2025 will stay quick. I sold an Elmhurst ranch 5%
              above asking in 14 days last year—prep works.
            </p>
            <div className="bg-brand-secondary/10 p-3 rounded-lg">
              <span className="text-brand-primary font-semibold">
                Seller Tip:{" "}
              </span>
              <span className="text-brand-primary">
                List in spring (March-May) for peak buyer traffic.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-brand-neutral rounded-xl shadow-lg p-6 border-l-4 border-brand-secondary"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-brand-primary mb-2">
              Suburban Living Fuels Demand
            </h3>
            <p className="text-brand-primary/80 mb-4 leading-relaxed">
              Evanston and Hinsdale draw ex-city buyers with schools and
              downtowns. Naperville&apos;s $530K median reflects a 20% rise
              since 2022. The Double Track NWI line (2025) will boost west
              suburbs like Elmhurst—60% of buyers want suburban perks.
            </p>
            <div className="bg-brand-secondary/10 p-3 rounded-lg">
              <span className="text-brand-primary font-semibold">
                Seller Tip:{" "}
              </span>
              <span className="text-brand-primary">
                Highlight Metra access or parks—buyers crave lifestyle.
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div className="text-center mt-12" variants={itemVariants}>
          <p className="text-lg text-brand-primary/80 mb-6">
            Our market is primed for sellers in 2025. With my expertise in
            the chicagoland area, I&apos;ll get
            your home sold fast and for top value.
          </p>
          <a
            href="#contact"
            className="inline-block bg-brand-secondary text-brand-primary py-3 px-8 rounded-lg text-lg font-semibold hover:bg-brand-accent transition-all duration-300"
          >
            Let&apos;s Talk About Your Sale
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
