import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/posts/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/recipes", destination: "/food-reviews", permanent: true },
    ];
  },
};

export default nextConfig;