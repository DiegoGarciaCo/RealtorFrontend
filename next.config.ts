import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ['realtorblog.s3.us-east-2.amazonaws.com'],
  },
};

export default nextConfig;
