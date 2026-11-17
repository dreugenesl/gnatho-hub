import { ServiceCard } from "@/components/cards";
import { PageHeader, Section, SectionHeading } from "@/components/ui";
import { services } from "@/data/services";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import type { ServiceCategory } from "@/types";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/services", ...{ title: dict.pages.services.title, description: dict.pages.services.lead } });
}

const categories: ServiceCategory[] = ["gnathology", "diagnostics", "splints"];

export default async function ServicesPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.services;
  return (
    <>
      <PageHeader locale={locale} homeLabel={dict.common.home} crumbs={[{ name: page.title, path: "/services" }]} title={page.title} lead={page.lead} />
      {categories.map((category, i) => (
        <Section key={category} tone={i % 2 ? "surface" : "white"} id={category}>
          <SectionHeading title={dict.services[category]} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.category === category)
              .map((s) => (
                <ServiceCard key={s.slug} service={s} locale={locale} dict={dict} />
              ))}
          </div>
        </Section>
      ))}
    </>
  );
}
