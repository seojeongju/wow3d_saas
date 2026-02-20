import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* output: 'export', // Removed to allow dynamic API routes */
  // trailingSlash: true,
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
