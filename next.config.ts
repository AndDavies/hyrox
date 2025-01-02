import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores all linting errors during builds
  },
  /* Add other config options here if needed */
};

export default nextConfig;
