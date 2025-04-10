import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
    domains: ['covers.openlibrary.org'],
  },
};

export default nextConfig;
