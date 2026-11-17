export type Locale = "uk" | "en";

/** Текст із обов'язковою українською версією та необов'язковим перекладом. */
export type Localized = { uk: string; en?: string };

export type Audience = "patients" | "doctors";
export type Segment = "patients" | "clinics" | "software";

export type ServiceCategory = "gnathology" | "diagnostics" | "splints";

export interface Service {
  slug: string;
  category: ServiceCategory;
  title: Localized;
  summary: Localized;
  description: Localized[];
  forWhom: Localized[];
  steps: Localized[];
  durationMinutes: number;
  /** Ціна «від», грн. */
  priceFrom: number;
}

export type PersonKind = "doctor" | "technician" | "developer";

export interface Certificate {
  title: Localized;
  issuer: string;
  year: number;
}

export interface Person {
  slug: string;
  kind: PersonKind;
  name: Localized;
  role: Localized;
  bio: Localized;
  specialties: Localized[];
  experienceYears?: number;
  certificates: Certificate[];
}

export type ArticleBlock =
  | { type: "heading"; text: Localized }
  | { type: "paragraph"; text: Localized }
  | { type: "list"; items: Localized[] }
  | { type: "note"; text: Localized };

export interface Article {
  slug: string;
  audience: Audience;
  title: Localized;
  excerpt: Localized;
  body: ArticleBlock[];
  authorSlug: string;
  /** Лікар, який перевірив статтю (E-E-A-T). */
  reviewerSlug?: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  /** Грн на місяць; null — індивідуальна ціна. */
  priceMonthly: number | null;
  description: Localized;
  features: Localized[];
  highlighted?: boolean;
}

export interface Integration {
  name: string;
  description: Localized;
}

export interface CaseStudy {
  slug: string;
  title: Localized;
  complaint: Localized;
  diagnostics: Localized;
  treatment: Localized;
  result: Localized;
  doctorSlug: string;
  durationMonths: number;
  tags: string[];
}

export interface PriceGroup {
  title: Localized;
  items: { name: Localized; price: string }[];
}

export interface NavLink {
  href: string;
  label: Localized;
  description?: Localized;
}

export interface NavGroup {
  segment: Segment;
  label: Localized;
  tagline: Localized;
  links: NavLink[];
}
