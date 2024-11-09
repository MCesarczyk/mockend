import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'tszyewnvlahpaoqvxlji.supabase.co'
      }
    ]
  }
};

export default nextConfig;
