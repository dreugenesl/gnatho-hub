import { LeadForm } from "@/components/forms/LeadForm";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/data/site";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/contacts", title: dict.pages.contacts.title, description: dict.pages.contacts.lead });
}

export default async function ContactsPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.contacts;
  const f = dict.forms;
  return (
    <>
      <PageHeader locale={locale} homeLabel={dict.common.home} crumbs={[{ name: page.title, path: "/contacts" }]} title={page.title} lead={page.lead} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <LeadForm source="contacts" labels={{ ...f, extra: f.clinic, submit: f.submitContact }} />
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <address className="space-y-3 text-sm not-italic text-ink-700">
            <p className="text-base font-semibold text-ink-950">{site.name}</p>
            <p>
              {site.city[locale]}, {site.address[locale]}
            </p>
            <p>{site.phone}</p>
            <p>{site.email}</p>
            <p>{site.hours[locale]}</p>
          </address>
        </aside>
      </Container>
    </>
  );
}
