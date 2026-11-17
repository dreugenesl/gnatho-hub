import type { Metadata } from "next";
import "@fontsource-variable/inter";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { isPreview, site } from "@/data/site";
import { localeParams, resolveLocale } from "@/lib/page";
import "../globals.css";

export const generateStaticParams = localeParams;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolveLocale(params);
  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {isPreview ? (
          <p role="note" className="bg-brand-700 px-4 py-2 text-center text-sm font-medium text-on-brand">
            {locale === "uk"
              ? "Демо-версія нового сайту. Лікарі (крім засновника), кейси, ціни й тарифи тут умовні; форми нічого не надсилають."
              : "Preview of the new site. Team members (except the founder), cases, prices and plans are placeholders; forms send nothing."}
          </p>
        ) : null}
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
