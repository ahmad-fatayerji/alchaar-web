import type { MetadataRoute } from "next";

/* /careers and /apply are deliberately absent: both are hidden pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://alchaarpharmacy.com";
  return [
    { url: `${base}/` },
    { url: `${base}/about` },
    { url: `${base}/team` },
  ];
}
