import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  serverExternalPackages: ["pdfkit"],
};

export default nextConfig;
