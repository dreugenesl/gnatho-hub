import Link from "next/link";
import { Badge, Container, PageHeader } from "@/components/ui";
import { cases } from "@/data/cases";
import { getPerson } from "@/data/people";
import { href, tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/cases", title: dict.pages.cases.title, description: dict.pages.cases.lead });
}

export default async function CasesPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.cases;
  const c = dict.cases;
  return (
    <>
      <PageHeader locale={locale} homeLabel={dict.common.home} crumbs={[{ name: page.title, path: "/cases" }]} title={page.title} lead={page.lead} />
      <Container className="space-y-6 py-12">
        {cases.map((item) => {
          const doctor = getPerson(item.doctorSlug);
          const rows = [
            [c.complaint, item.complaint],
            [c.diagnostics, item.diagnostics],
            [c.treatment, item.treatment],
            [c.result, item.result],
          ] as const;
          return (
            <article key={item.slug} id={item.slug} className="rounded-2xl border border-line p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
                <span className="text-sm text-ink-500">
                  {item.durationMonths} {c.months}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-ink-950">{tr(item.title, locale)}</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-sand-700">{label}</dt>
                    <dd className="mt-2 text-sm text-ink-700">{tr(value, locale)}</dd>
                  </div>
                ))}
              </dl>
              {doctor ? (
                <p className="mt-6 border-t border-line pt-4 text-sm text-ink-500">
                  {c.doctor}:{" "}
                  <Link href={href(locale, `/doctors/${doctor.slug}`)} className="font-semibold text-ink-950 hover:text-brand-700">
                    {tr(doctor.name, locale)}
                  </Link>
                </p>
              ) : null}
            </article>
          );
        })}
      </Container>
    </>
  );
}
