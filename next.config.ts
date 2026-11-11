import type { NextConfig } from "next";

// The Vivianne site lives under /vivianne now (ninesi.xyz is the 0nine Labs
// site). These paths were its top level, and installed copies of the app open
// /sign-in, so they keep working: 308, query string kept.
const moved = ["downloads", "changelog", "faq", "privacy", "terms", "sign-in"];

const nextConfig: NextConfig = {
  async redirects() {
    return moved.map((p) => ({ source: `/${p}`, destination: `/vivianne/${p}`, permanent: true }));
  },
};

export default nextConfig;
