import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move turbopack to the top level to resolve invalid key error
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
