"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Segment } from "@/types";

export interface ResolvedLink {
  href: string;
  label: string;
  description?: string;
}
export interface ResolvedGroup {
  segment: Segment;
  label: string;
  tagline: string;
  links: ResolvedLink[];
}

const Chevron = ({ open }: { open: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}>
    <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Мега-меню: три сегменти аудиторії відкриваються окремими панелями. */
export function DesktopNav({ groups, plain }: { groups: ResolvedGroup[]; plain: ResolvedLink[] }) {
  const [open, setOpen] = useState<Segment | null>(null);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <nav ref={ref} aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {groups.map((g) => {
          const isOpen = open === g.segment;
          return (
            <li key={g.segment} className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`mega-${g.segment}`}
                onClick={() => setOpen(isOpen ? null : g.segment)}
                className={`flex min-h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-surface ${
                  isOpen ? "bg-surface text-brand-700" : "text-ink-900"
                }`}
              >
                {g.label}
                <Chevron open={isOpen} />
              </button>
              {isOpen ? (
                <div
                  id={`mega-${g.segment}`}
                  className="absolute left-0 top-full mt-2 w-[26rem] rounded-2xl border border-line bg-panel p-4 shadow-xl"
                >
                  <p className="border-b border-line px-3 pb-3 text-sm text-ink-500">{g.tagline}</p>
                  <ul className="mt-2">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={() => setOpen(null)} className="block rounded-lg px-3 py-2.5 hover:bg-sand-50">
                          <span className="block text-sm font-semibold text-ink-950">{l.label}</span>
                          {l.description ? <span className="block text-sm text-ink-500">{l.description}</span> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
        {plain.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={() => setOpen(null)}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-ink-900 transition-colors hover:bg-surface aria-[current=page]:text-brand-700"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNav({
  groups,
  plain,
  book,
  labels,
}: {
  groups: ResolvedGroup[];
  plain: ResolvedLink[];
  book: ResolvedLink;
  labels: { menu: string; close: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.close : labels.menu}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink-900"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      {open ? (
        <div id="mobile-nav" className="absolute inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-panel px-4 pb-10 pt-4">
          <nav aria-label="Mobile">
            {groups.map((g) => (
              <details key={g.segment} className="group border-b border-line py-1">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-base font-semibold text-ink-950">
                  {g.label}
                  <span className="text-ink-500 group-open:rotate-180">
                    <Chevron open={false} />
                  </span>
                </summary>
                <ul className="pb-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-ink-700 hover:bg-sand-50">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <ul>
              {plain.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-base font-semibold text-ink-950">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={book.href}
              onClick={() => setOpen(false)}
              className="mt-6 flex min-h-12 items-center justify-center rounded-lg bg-brand-700 font-semibold text-on-brand"
            >
              {book.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
