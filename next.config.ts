import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy UI routes (public stuff)
      {
        source: "/api/:path*",
        destination: "https://products-repo.onrender.com/:path*"
      },
    ]
  },
};

export default nextConfig;

