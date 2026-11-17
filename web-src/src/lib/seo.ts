import type { Metadata } from "next";
import { isPreview, site } from "@/data/site";
import { href, locales, tr } from "@/i18n/config";
import type { Article, Locale, Person } from "@/types";

const ogLocale: Record<Locale, string> = { uk: "uk_UA", en: "en_US" };

/** Єдина точка для метаданих: title, description, canonical і hreflang. */
export function buildMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const { locale, path, title, description, type = "website" } = opts;
  const full = (l: Locale) => `${href(l, path)}/`.replace(/\/\/$/, "/");
  const languages = Object.fromEntries(locales.map((l) => [l, full(l)]));
  return {
    title,
    description,
    robots: isPreview ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: full(locale),
      languages: { ...languages, "x-default": full("uk") },
    },
    openGraph: {
      title,
      description,
      url: full(locale),
      siteName: site.name,
      locale: ogLocale[locale],
      type,
    },
  };
}

const abs = (locale: Locale, path: string) => `${site.url}${href(locale, path)}`;

export function clinicJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.name,
    url: abs(locale, "/"),
    medicalSpecialty: "Dentistry",
    address: { "@type": "PostalAddress", addressLocality: site.city[locale], addressCountry: "UA" },
  };
}

function personRef(person: Person, locale: Locale) {
  return {
    "@type": "Person",
    name: tr(person.name, locale),
    jobTitle: tr(person.role, locale),
    url: abs(locale, `/doctors/${person.slug}`),
  };
}

export function personJsonLd(person: Person, locale: Locale) {
  return { "@context": "https://schema.org", ...personRef(person, locale), description: tr(person.bio, locale) };
}

/** Стаття з автором і лікарем-рецензентом — ключові сигнали E-E-A-T. */
export function articleJsonLd(article: Article, author: Person, reviewer: Person | undefined, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: tr(article.title, locale),
    description: tr(article.excerpt, locale),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale,
    url: abs(locale, `/blog/${article.slug}`),
    author: personRef(author, locale),
    ...(reviewer ? { reviewedBy: personRef(reviewer, locale), lastReviewed: article.updatedAt } : {}),
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    audience: {
      "@type": "MedicalAudience",
      audienceType: article.audience === "patients" ? "Patient" : "Clinician",
    },
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(locale, item.path),
    })),
  };
}

export function softwareJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.software,
    applicationCategory: "MedicalApplication",
    operatingSystem: "macOS, Windows",
    description,
    url: abs(locale, "/software"),
  };
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
