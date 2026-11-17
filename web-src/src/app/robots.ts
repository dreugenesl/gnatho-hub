import type { MetadataRoute } from "next";
import { isPreview, site } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPreview ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
