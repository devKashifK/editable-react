import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['ui-avatars.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
