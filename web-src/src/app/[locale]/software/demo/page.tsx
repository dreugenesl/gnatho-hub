import { LeadForm } from "@/components/forms/LeadForm";
import { CheckList, Container, PageHeader } from "@/components/ui";
import { site } from "@/data/site";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/software/demo", title: dict.pages.softwareDemo.title, description: dict.pages.softwareDemo.lead });
}

const included = {
  uk: ["30-хвилинна онлайн-зустріч", "Розбір вашого клінічного випадку", "Тестовий ключ на 14 днів", "Відповіді на питання щодо модулів і тарифів"],
  en: ["A 30-minute online call", "A walkthrough of your clinical case", "A 14-day trial key", "Answers about modules and pricing"],
};

export default async function SoftwareDemoPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.softwareDemo;
  const f = dict.forms;
  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: site.software, path: "/software" },
          { name: page.title, path: "/software/demo" },
        ]}
        title={page.title}
        lead={page.lead}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <LeadForm
          source="software-demo"
          labels={{ ...f, extra: f.role, submit: f.submitDemo }}
        />
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <CheckList items={included[locale]} />
        </aside>
      </Container>
    </>
  );
}
