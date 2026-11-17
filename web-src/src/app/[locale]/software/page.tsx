import Link from "next/link";
import { PricingPlans } from "@/components/PricingPlans";
import { ButtonLink, Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui";
import { site } from "@/data/site";
import { integrations, modules } from "@/data/software";
import { href, tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { breadcrumbJsonLd, buildMetadata, softwareJsonLd } from "@/lib/seo";
import type { Localized } from "@/types";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: "/software",
    title: `${site.software} — ${dict.pages.software.lead}`,
    description: dict.home.softwareLead,
  });
}

const copy: Record<string, Localized> = {
  eyebrow: { uk: "Програмне забезпечення для стоматологів і гнатологів", en: "Software for dentists and gnathologists" },
  title: { uk: "Плануйте на артикуляторі пацієнта, а не на середніх значеннях", en: "Plan on the patient's articulator, not on average values" },
  platforms: { uk: "macOS і Windows · 8 модулів · ліцензійні ключі", en: "macOS and Windows · 8 modules · licence keys" },
  modulesTitle: { uk: "Вісім модулів — одна сцена", en: "Eight modules, one scene" },
  modulesLead: { uk: "Купуйте лише ті інструменти, якими користуєтеся. Решту можна відкрити пізніше.", en: "Buy only the tools you use. Unlock the rest later." },
  flowTitle: { uk: "Як це працює", en: "How it works" },
  integrationsTitle: { uk: "Інтеграції та формати", en: "Integrations and formats" },
  integrationsLead: { uk: "GnathoLine працює з відкритими форматами, тому не привʼязує вас до одного виробника обладнання.", en: "GnathoLine works with open formats, so you are not tied to one equipment vendor." },
  pricingTitle: { uk: "Тарифи", en: "Pricing" },
  pricingLead: { uk: "Місячна підписка без довгострокових зобовʼязань.", en: "Monthly subscription with no long-term commitment." },
  docs: { uk: "Документація", en: "Documentation" },
  ctaTitle: { uk: "Подивіться GnathoLine на власному випадку", en: "See GnathoLine on your own case" },
  ctaLead: { uk: "Надішліть скани — на демо-зустрічі змонтуємо їх в артикулятор разом із вами.", en: "Send scans and we will mount them in the articulator with you during the demo." },
  disclaimer: { uk: "GnathoLine є інструментом планування і не замінює клінічного рішення лікаря.", en: "GnathoLine is a planning tool and does not replace the clinician's judgement." },
};

const flow: { title: Localized; text: Localized }[] = [
  { title: { uk: "Імпорт", en: "Import" }, text: { uk: "Завантажте скани щелеп, КТ і запис рухів.", en: "Load jaw scans, CBCT and motion records." } },
  { title: { uk: "Монтаж", en: "Mounting" }, text: { uk: "Сумістіть дані й перенесіть моделі в артикулятор.", en: "Align the data and mount models in the articulator." } },
  { title: { uk: "Планування", en: "Planning" }, text: { uk: "Перевірте контакти та спроєктуйте сплінт.", en: "Check contacts and design the splint." } },
  { title: { uk: "Передача", en: "Handoff" }, text: { uk: "Експортуйте STL або надішліть у лабораторію.", en: "Export STL or send it to the laboratory." } },
];

export default async function SoftwarePage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const t = (key: string) => tr(copy[key], locale);

  return (
    <>
      <JsonLd data={softwareJsonLd(locale, dict.home.softwareLead)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.common.home, path: "/" },
          { name: site.software, path: "/software" },
        ])}
      />

      <section className="bg-deep">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sand-400">{t("eyebrow")}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {site.software}: {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-300">{dict.home.softwareLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={href(locale, "/software/demo")} variant="accent">
                {dict.home.softwareCta}
              </ButtonLink>
              <Link
                href={href(locale, "/software/docs")}
                className="inline-flex min-h-11 items-center rounded-lg border border-white/30 px-5 text-sm font-semibold hover:border-sand-400 hover:text-sand-400"
              >
                {t("docs")}
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-300">{t("platforms")}</p>
          </div>
          {/* Схематичне вікно застосунку замість скриншота */}
          <div aria-hidden="true" className="rounded-2xl border border-white/10 bg-panel p-4 shadow-2xl">
            <div className="mb-4 flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4">
              <ul className="space-y-1.5">
                {modules.slice(0, 6).map((m, i) => (
                  <li key={m.name} className={`rounded-md px-2.5 py-1.5 font-mono text-xs ${i === 4 ? "bg-sand-400 text-on-brand" : "bg-white/5 text-ink-300"}`}>
                    {m.name}
                  </li>
                ))}
              </ul>
              <svg viewBox="0 0 240 180" className="h-full w-full rounded-lg bg-deep">
                <path d="M40 150 C40 40 200 40 200 150" fill="none" stroke="#c4a989" strokeWidth="14" strokeLinecap="round" opacity="0.35" />
                <path d="M40 150 C40 40 200 40 200 150" fill="none" stroke="#c4a989" strokeWidth="2" strokeDasharray="5 6" />
                <line x1="20" y1="30" x2="220" y2="30" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="20" cy="30" r="5" fill="#ffffff" />
                <circle cx="220" cy="30" r="5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      <Section id="modules">
        <SectionHeading title={t("modulesTitle")} lead={t("modulesLead")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <li key={m.name} className="rounded-2xl border border-line p-5">
              <p className="font-mono text-sm font-semibold text-sand-700">{m.name}</p>
              <p className="mt-2 text-sm text-ink-700">{tr(m.text, locale)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="workflow">
        <SectionHeading title={t("flowTitle")} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((step, i) => (
            <li key={i} className="rounded-2xl border border-line bg-panel p-6">
              <span className="text-sm font-semibold text-sand-700">0{i + 1}</span>
              <h3 className="mt-2 font-semibold text-ink-950">{tr(step.title, locale)}</h3>
              <p className="mt-2 text-sm text-ink-500">{tr(step.text, locale)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="integrations">
        <SectionHeading title={t("integrationsTitle")} lead={t("integrationsLead")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((item) => (
            <Card key={item.name}>
              <h3 className="font-mono text-sm font-semibold text-ink-950">{item.name}</h3>
              <p className="mt-2 text-sm text-ink-500">{tr(item.description, locale)}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="surface" id="pricing">
        <SectionHeading
          title={t("pricingTitle")}
          lead={t("pricingLead")}
          action={
            <ButtonLink to={href(locale, "/software/pricing")} variant="ghost">
              {dict.common.more} →
            </ButtonLink>
          }
        />
        <PricingPlans locale={locale} dict={dict} />
      </Section>

      <Section>
        <div className="rounded-3xl border border-line bg-panel p-8 sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("ctaTitle")}</h2>
          <p className="mt-3 max-w-xl text-ink-500">{t("ctaLead")}</p>
          <ButtonLink to={href(locale, "/software/demo")} variant="accent" className="mt-7">
            {dict.home.softwareCta}
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-ink-500">{t("disclaimer")}</p>
      </Section>
    </>
  );
}
