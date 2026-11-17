import { ButtonLink, Card, PageHeader, Section, SectionHeading } from "@/components/ui";
import { labProducts, labSteps } from "@/data/laboratory";
import { href, tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/laboratory", title: dict.pages.laboratory.title, description: dict.pages.laboratory.lead });
}

export default async function LaboratoryPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.laboratory;
  return (
    <>
      <PageHeader locale={locale} homeLabel={dict.common.home} crumbs={[{ name: page.title, path: "/laboratory" }]} title={page.title} lead={page.lead}>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink to={href(locale, "/laboratory/order")}>{dict.home.labCta}</ButtonLink>
          <ButtonLink to={href(locale, "/laboratory/protocol")} variant="outline">
            {dict.pages.labProtocol.title}
          </ButtonLink>
        </div>
      </PageHeader>
      <Section>
        <SectionHeading title={dict.services.splints} />
        <div className="grid gap-5 sm:grid-cols-2">
          {labProducts.map((p) => (
            <Card key={p.id}>
              <h3 className="text-lg font-semibold text-ink-950">{tr(p.name, locale)}</h3>
              <p className="mt-2 text-sm text-ink-500">{tr(p.text, locale)}</p>
              <p className="mt-4 text-sm font-medium text-sand-700">
                {p.price.toLocaleString("uk-UA")} {dict.common.uah} · {p.days} {locale === "uk" ? "роб. днів" : "business days"}
              </p>
            </Card>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading title={dict.home.labTitle} lead={dict.home.labLead} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {labSteps.map((step, i) => (
            <li key={i} className="rounded-2xl border border-line bg-panel p-6">
              <span className="text-sm font-semibold text-sand-700">0{i + 1}</span>
              <h3 className="mt-2 font-semibold text-ink-950">{tr(step.title, locale)}</h3>
              <p className="mt-2 text-sm text-ink-500">{tr(step.text, locale)}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
