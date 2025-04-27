import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["files.edgestore.dev"],
  },
  serverComponentsExternalPackages: ["convex"],
  reactRoot: true,
  serverActions: true,
};

export default nextConfig;
