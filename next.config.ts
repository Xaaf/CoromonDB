import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://hfnzmziajwmomwiinbdn.supabase.co/**")
    ]
  }
};

export default nextConfig;
