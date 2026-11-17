import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/seo";
import { href } from "@/i18n/config";
import type { Locale } from "@/types";

/** Слоган сайту: шість слів, розділених пісочними крапками. */
export function Slogan({ words, className = "" }: { words: string[]; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-medium uppercase tracking-[0.2em] sm:text-sm ${className}`}>
      {words.map((word, i) => (
        <span key={word} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-700" /> : null}
          {word}
        </span>
      ))}
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const buttonStyles = {
  primary: "bg-brand-700 text-on-brand hover:bg-brand-800",
  accent: "bg-sand-400 text-on-brand hover:bg-sand-500",
  outline: "border border-ink-300 text-ink-900 hover:border-brand-700 hover:text-brand-700 bg-panel",
  ghost: "text-sand-700 hover:text-brand-700 px-0",
};

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link
      href={to}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Section({
  children,
  tone = "white",
  id,
}: {
  children: ReactNode;
  tone?: "white" | "surface" | "dark";
  id?: string;
}) {
  const tones = { white: "bg-base", surface: "bg-surface", dark: "bg-deep" };
  return (
    <section id={id} className={`py-14 sm:py-20 ${tones[tone]}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  title,
  lead,
  action,
  dark = false,
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {lead ? <p className={`mt-3 text-base ${dark ? "text-ink-300" : "text-ink-500"}`}>{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = "mint" }: { children: ReactNode; tone?: "mint" | "blue" | "gray" }) {
  const tones = {
    mint: "bg-sand-50 text-sand-700",
    blue: "bg-brand-700/10 text-brand-700",
    gray: "bg-surface text-ink-700",
  };
  return (
    <span className={`inline-flex items-center self-start rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-panel p-6 ${className}`}>{children}</div>;
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Шапка внутрішньої сторінки: хлібні крихти (з розміткою), H1 і лід. */
export function PageHeader({
  locale,
  homeLabel,
  crumbs,
  title,
  lead,
  children,
}: {
  locale: Locale;
  homeLabel: string;
  crumbs: { name: string; path: string }[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  const all = [{ name: homeLabel, path: "/" }, ...crumbs];
  return (
    <header className="border-b border-line bg-surface py-10 sm:py-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-500">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i < all.length - 1 ? (
                  <Link href={href(locale, c.path)} className="hover:text-brand-700">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-900">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-lg text-ink-500">{lead}</p> : null}
        {children}
        <JsonLd data={breadcrumbJsonLd(locale, all)} />
      </Container>
    </header>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-700">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none text-sand-700">
            <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
