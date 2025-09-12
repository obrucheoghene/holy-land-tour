import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  env: {
    TOUR_DATE: process.env.TOUR_DATE,
    REGISTRATION_FEE: process.env.REGISTRATION_FEE,
  },
  experimental: {
    turbo: {},
  },
};

export default nextConfig;
