"use client"; // Client component for animations

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // For animations

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-t from-brand-primary to-brand-secondary">
      <div className="text-center">
        {/* Animated 404 Heading */}
        <motion.h1
          className="text-9xl font-bold text-dark-leather mb-4 tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-2xl brand-text mb-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Oops! Looks like this page wandered off the trail.
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-lg brand-text mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We couldn&apos;t find what you&apos;re looking for. Let&apos;s get you
          back to the home page!
        </motion.p>

        {/* Back to Shop Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block bg-brand-accent brand-text px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-dark-leather hover:text-ivory-cream transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-tanned-leather focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Optional Background Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory-cream via-tanned-leather/10 to-ivory-cream opacity-50 pointer-events-none" />
    </div>
  );
}
