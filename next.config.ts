import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy UI routes (public stuff)
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === "production" ? "https://products-repo.onrender.com/:path*": "http://localhost:3000/:path*"
      },
    ]
  },
};

export default nextConfig;

