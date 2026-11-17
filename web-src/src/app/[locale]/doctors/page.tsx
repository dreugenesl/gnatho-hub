import { PersonCard } from "@/components/cards";
import { PageHeader, Section, SectionHeading } from "@/components/ui";
import { people } from "@/data/people";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import type { PersonKind } from "@/types";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/doctors", title: dict.pages.doctors.title, description: dict.pages.doctors.lead });
}

const kinds: PersonKind[] = ["doctor", "technician", "developer"];

export default async function DoctorsPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.doctors;
  return (
    <>
      <PageHeader locale={locale} homeLabel={dict.common.home} crumbs={[{ name: page.title, path: "/doctors" }]} title={page.title} lead={page.lead} />
      {kinds.map((kind, i) => (
        <Section key={kind} tone={i % 2 ? "surface" : "white"}>
          <SectionHeading title={dict.team[kind]} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {people
              .filter((p) => p.kind === kind)
              .map((p) => (
                <PersonCard key={p.slug} person={p} locale={locale} />
              ))}
          </div>
        </Section>
      ))}
    </>
  );
}
