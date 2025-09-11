import type { NextConfig } from "next";
 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
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

module.exports = withBundleAnalyzer(nextConfig)