import type { MetadataRoute } from "next";

const BASE = "https://ninesi.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/vivianne`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/vivianne/downloads`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/vivianne/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/vivianne/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/vivianne/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/vivianne/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
