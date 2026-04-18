import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/ryukanban",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
