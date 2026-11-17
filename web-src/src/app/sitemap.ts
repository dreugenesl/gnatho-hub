import type { MetadataRoute } from "next";
import { articles, audiences } from "@/data/articles";
import { people } from "@/data/people";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { href, locales } from "@/i18n/config";

export const dynamic = "force-static";

/** Карта сайту з hreflang-альтернативами для кожної сторінки. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/laboratory",
    "/laboratory/protocol",
    "/laboratory/order",
    "/software",
    "/software/pricing",
    "/software/docs",
    "/software/demo",
    "/blog",
    ...audiences.map((a) => `/blog/category/${a}`),
    ...articles.map((a) => `/blog/${a.slug}`),
    "/doctors",
    ...people.map((p) => `/doctors/${p.slug}`),
    "/cases",
    "/prices",
    "/contacts",
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${href(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, path)}`])),
      },
    })),
  );
}
