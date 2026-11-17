"use client";

import { useState, type FormEvent } from "react";
import { isPreview } from "@/data/site";
import { submitLead } from "@/lib/submit";

export interface LeadFormLabels {
  name: string;
  email: string;
  phone: string;
  extra: string;
  message: string;
  consent: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
}

const field =
  "mt-1.5 block min-h-11 w-full rounded-lg border border-ink-300 bg-panel px-3 py-2 text-ink-950 placeholder:text-ink-300 focus:border-brand-700";

/** Проста форма заявки: використовується для демо софту та на сторінці контактів. */
export function LeadForm({ source, labels }: { source: string; labels: LeadFormLabels }) {
  const [state, setState] = useState<{ status: "idle" | "success" | "error" }>({ status: "idle" });
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const ok = await submitLead(new FormData(event.currentTarget));
    setPending(false);
    setState({ status: ok ? "success" : "error" });
  }

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-2xl border border-sand-100 bg-sand-50 p-6 text-sand-700">
        {isPreview ? "Демо-режим: форма працює, але заявку нікуди не надіслано. · Preview: nothing was sent." : labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <label className="block text-sm font-medium text-ink-900">
        {labels.name} *
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-900">
          {labels.email} *
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-sm font-medium text-ink-900">
          {labels.phone}
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="block text-sm font-medium text-ink-900">
        {labels.extra}
        <input name="extra" className={field} />
      </label>
      <label className="block text-sm font-medium text-ink-900">
        {labels.message}
        <textarea name="message" rows={4} className={field} />
      </label>
      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 accent-brand-700" />
        {labels.consent} *
      </label>
      {state.status === "error" ? (
        <p role="alert" className="text-sm text-red-400">
          {labels.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-700 px-6 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
