import Link from "next/link";
import { navGroups, plainLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { href, tr } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types";
import { Container } from "@/components/ui";
import { DesktopNav, MobileNav, type ResolvedGroup } from "./Nav";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Logo({ locale, light = false }: { locale: Locale; light?: boolean }) {
  return (
    <Link href={href(locale)} className="flex items-center gap-2.5" aria-label={site.name}>
      <svg aria-hidden="true" viewBox="0 0 120 120" className="h-8 w-8">
        <g stroke={light ? "#ffffff" : "#eee9dd"} strokeWidth="5" strokeLinecap="round">
          <line x1="60" y1="60" x2="60" y2="16" />
          <line x1="60" y1="60" x2="89.4" y2="43" />
          <line x1="60" y1="60" x2="98.1" y2="82" />
          <line x1="60" y1="60" x2="60" y2="94" />
          <line x1="60" y1="60" x2="21.9" y2="82" />
          <line x1="60" y1="60" x2="30.6" y2="43" />
        </g>
        <g fill="#c4a989">
          <circle cx="60" cy="16" r="8" />
          <circle cx="89.4" cy="43" r="7" />
          <circle cx="98.1" cy="82" r="8" />
          <circle cx="60" cy="94" r="7" />
          <circle cx="21.9" cy="82" r="8" />
          <circle cx="30.6" cy="43" r="7" />
        </g>
        <circle cx="60" cy="60" r="11" fill={light ? "#ffffff" : "#eee9dd"} />
      </svg>
      <span className={`text-lg font-semibold tracking-tight ${light ? "text-white" : "text-ink-950"}`}>
        Gnatho<span className="text-sand-700">HUB</span>
      </span>
    </Link>
  );
}

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // Тексти меню розв'язуємо на сервері, клієнтським компонентам передаємо готові рядки.
  const groups: ResolvedGroup[] = navGroups.map((g) => ({
    segment: g.segment,
    label: tr(g.label, locale),
    tagline: tr(g.tagline, locale),
    links: g.links.map((l) => ({
      href: href(locale, l.href),
      label: tr(l.label, locale),
      description: l.description ? tr(l.description, locale) : undefined,
    })),
  }));
  const plain = plainLinks.map((l) => ({ href: href(locale, l.href), label: tr(l.label, locale) }));
  const book = { href: href(locale, "/contacts"), label: dict.nav.book };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-panel/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-panel focus:px-3 focus:py-2"
      >
        {dict.nav.skip}
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo locale={locale} />
        <DesktopNav groups={groups} plain={plain} />
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} label={dict.nav.language} />
          <Link
            href={book.href}
            className="hidden min-h-10 items-center rounded-lg bg-brand-700 px-4 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-800 sm:inline-flex"
          >
            {book.label}
          </Link>
          <MobileNav groups={groups} plain={plain} book={book} labels={{ menu: dict.nav.menu, close: dict.nav.close }} />
        </div>
      </Container>
    </header>
  );
}
