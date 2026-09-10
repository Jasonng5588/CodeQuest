import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "fzjdywdjbcxcjmjzhlty.supabase.co" },
    ],
  },
  experimental: {
    // Enable Server Actions
  },
};

export default nextConfig;
