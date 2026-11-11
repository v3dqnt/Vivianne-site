import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/vivianne/sign-in"] },
    sitemap: "https://ninesi.xyz/sitemap.xml",
  };
}
