import type { MetadataRoute } from "next";

/* /careers and /apply also carry noindex metadata; the disallow here keeps
   crawlers from fetching them at all. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/apply", "/careers"],
    },
    sitemap: "https://alchaarpharmacy.com/sitemap.xml",
  };
}
