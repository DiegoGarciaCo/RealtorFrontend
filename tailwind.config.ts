import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#1E293B", // Dark Slate Gray
        "brand-secondary": "#A3BFFA", // Sage Green
        "brand-accent": "#93C5FD", // Soft Blue
        "brand-neutral": "#F3F4F6", // Warm Gray
        "brand-text": "#E5E7EB", // Off-White
      },
    },
  },
  plugins: [],
} satisfies Config;
