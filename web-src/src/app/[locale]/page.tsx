import Link from "next/link";
import { ArticleCard, PersonCard, ServiceCard } from "@/components/cards";
import { ButtonLink, Container, JsonLd, Section, SectionHeading, Slogan } from "@/components/ui";
import { site } from "@/data/site";
import { getArticles } from "@/data/articles";
import { labSteps } from "@/data/laboratory";
import { people } from "@/data/people";
import { services } from "@/data/services";
import { modules } from "@/data/software";
import { href, tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata, clinicJsonLd } from "@/lib/seo";
import type { Segment } from "@/types";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/", title: dict.home.title, description: dict.home.lead });
}

const segmentTargets: Record<Segment, string> = {
  patients: "/services",
  clinics: "/laboratory",
  software: "/software",
};

const segmentIcons: Record<Segment, string> = {
  patients: "M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.500-7 10-7 10z",
  clinics: "M4 20V8l8-4 8 4v12M9 20v-6h6v6",
  software: "M4 6h16v10H4zM9 20h6M12 16v4",
};

export default async function HomePage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const h = dict.home;
  const segments: Segment[] = ["patients", "clinics", "software"];

  return (
    <>
      <JsonLd data={clinicJsonLd(locale)} />

      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Slogan words={site.slogan[locale]} className="text-ink-700" />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">{h.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-ink-500">{h.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={href(locale, "/services")}>{h.ctaPatient}</ButtonLink>
              <ButtonLink to={href(locale, "/laboratory")} variant="outline">
                {h.ctaClinic}
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-panel p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-ink-950">{h.labTitle}</h2>
            <p className="mt-1 text-sm text-ink-500">{h.labLead}</p>
            <ol className="mt-6 space-y-5">
              {labSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sand-50 text-sm font-semibold text-sand-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">{tr(step.title, locale)}</p>
                    <p className="text-sm text-ink-500">{tr(step.text, locale)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink to={href(locale, "/laboratory/order")} variant="accent" className="mt-7 w-full sm:w-auto">
              {h.labCta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Розведення трафіку на три сегменти */}
      <Section>
        <SectionHeading title={h.segmentsTitle} lead={h.segmentsLead} />
        <div className="grid gap-5 md:grid-cols-3">
          {segments.map((s) => (
            <Link
              key={s}
              href={href(locale, segmentTargets[s])}
              className="group flex flex-col rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-brand-700"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-on-brand">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={segmentIcons[s]} />
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink-950">{dict.segments[s].title}</h3>
              <p className="mt-2 flex-1 text-ink-500">{dict.segments[s].text}</p>
              <span className="mt-5 text-sm font-semibold text-sand-700 group-hover:text-brand-700">
                {dict.segments[s].cta} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Послуги */}
      <Section tone="surface">
        <SectionHeading
          title={h.servicesTitle}
          lead={h.servicesLead}
          action={
            <ButtonLink to={href(locale, "/services")} variant="ghost">
              {h.servicesAll} →
            </ButtonLink>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.slug} service={s} locale={locale} dict={dict} />
          ))}
        </div>
      </Section>

      {/* Софт */}
      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{h.softwareTitle}</h2>
            <p className="mt-3 max-w-lg text-ink-300">{h.softwareLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={href(locale, "/software/demo")} variant="accent">
                {h.softwareCta}
              </ButtonLink>
              <Link
                href={href(locale, "/software/pricing")}
                className="inline-flex min-h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold text-white hover:border-sand-400 hover:text-sand-400"
              >
                {h.softwarePricing}
              </Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {modules.map((m) => (
              <li key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="font-mono text-sm font-semibold text-sand-400">{m.name}</p>
                <p className="mt-1 text-sm text-ink-300">{tr(m.text, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Команда */}
      <Section>
        <SectionHeading
          title={h.teamTitle}
          lead={h.teamLead}
          action={
            <ButtonLink to={href(locale, "/doctors")} variant="ghost">
              {h.teamAll} →
            </ButtonLink>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <PersonCard key={p.slug} person={p} locale={locale} />
          ))}
        </div>
      </Section>

      {/* Блог */}
      <Section tone="surface">
        <SectionHeading
          title={h.blogTitle}
          lead={h.blogLead}
          action={
            <ButtonLink to={href(locale, "/blog")} variant="ghost">
              {h.blogAll} →
            </ButtonLink>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {getArticles().slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} locale={locale} dict={dict} />
          ))}
        </div>
      </Section>

      {/* Заклик до дії */}
      <Section>
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-sand-50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950">{h.ctaTitle}</h2>
            <p className="mt-2 text-ink-700">{h.ctaLead}</p>
          </div>
          <ButtonLink to={href(locale, "/contacts")}>{h.ctaButton}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
