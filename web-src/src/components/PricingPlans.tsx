import { ButtonLink, CheckList } from "@/components/ui";
import { plans } from "@/data/software";
import { href, tr } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types";

export function PricingPlans({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`flex flex-col rounded-2xl border bg-panel p-6 ${plan.highlighted ? "border-brand-700 ring-1 ring-brand-700" : "border-line"}`}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-semibold text-ink-950">{plan.name}</h3>
            {plan.highlighted ? (
              <span className="rounded-full bg-sand-50 px-2.5 py-1 text-xs font-medium text-sand-700">{dict.common.popular}</span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-ink-500">{tr(plan.description, locale)}</p>
          <p className="mt-6">
            {plan.priceMonthly === null ? (
              <span className="text-3xl font-semibold text-ink-950">{dict.common.custom}</span>
            ) : (
              <>
                <span className="text-3xl font-semibold text-ink-950">
                  {plan.priceMonthly.toLocaleString("uk-UA")} {dict.common.uah}
                </span>
                <span className="text-sm text-ink-500"> / {dict.common.perMonth}</span>
              </>
            )}
          </p>
          <div className="mt-6 flex-1">
            <CheckList items={plan.features.map((f) => tr(f, locale))} />
          </div>
          <ButtonLink to={href(locale, "/software/demo")} variant={plan.highlighted ? "primary" : "outline"} className="mt-8 w-full">
            {dict.home.softwareCta}
          </ButtonLink>
        </div>
      ))}
    </div>
  );
}
