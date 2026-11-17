"use client";

import { useId, useMemo, useState, useTransition } from "react";
import { isPreview } from "@/data/site";
import { submitLabOrder } from "@/lib/submit";
import type { Locale } from "@/types";

export interface LabProductOption {
  id: string;
  name: string;
  text: string;
  days: number;
  price: number;
}

const MAX_SIZE = 100 * 1024 * 1024;
const ALLOWED = ["stl", "ply", "obj"];
const EXPRESS_FACTOR = 1.3;

const copy = {
  uk: {
    steps: ["Виріб", "Скани", "Контакти", "Перевірка"],
    product: "Що виготовляємо",
    jaw: "Щелепа",
    upper: "Верхня",
    lower: "Нижня",
    speed: "Термін",
    standard: "Стандартно",
    express: "Терміново (+30%)",
    days: "роб. днів",
    drop: "Перетягніть файли сюди або оберіть на компʼютері",
    dropHint: "STL, PLY або OBJ, до 100 МБ кожен. Потрібні обидві щелепи та скан прикусу.",
    choose: "Обрати файли",
    remove: "Видалити",
    fileError: "Пропущено файли невідповідного формату або більші за 100 МБ:",
    needFile: "Додайте принаймні один скан.",
    name: "Імʼя та прізвище лікаря",
    clinic: "Клініка",
    email: "Електронна пошта",
    phone: "Телефон",
    comment: "Коментар для техніка (товщина, тип напрямних, побажання)",
    consent: "Підтверджую, що маю згоду пацієнта на передачу даних у лабораторію",
    needContacts: "Заповніть імʼя, пошту, телефон і підтвердьте згоду.",
    back: "Назад",
    next: "Далі",
    submit: "Надіслати замовлення",
    sending: "Надсилаємо…",
    summary: "Ваше замовлення",
    estimate: "Орієнтовна вартість",
    ready: "Готовність",
    files: "Файлів",
    uah: "грн",
    failed: "Не вдалося надіслати. Перевірте дані та спробуйте ще раз.",
    doneTitle: "Замовлення прийнято",
    doneText: "Номер замовлення:",
    doneNext: "Технік перевірить скани та надішле превʼю дизайну на вашу пошту.",
    again: "Оформити ще одне",
  },
  en: {
    steps: ["Appliance", "Scans", "Contacts", "Review"],
    product: "What we make",
    jaw: "Jaw",
    upper: "Upper",
    lower: "Lower",
    speed: "Turnaround",
    standard: "Standard",
    express: "Express (+30%)",
    days: "business days",
    drop: "Drag files here or choose from your computer",
    dropHint: "STL, PLY or OBJ, up to 100 MB each. Both arches and a bite scan are required.",
    choose: "Choose files",
    remove: "Remove",
    fileError: "Skipped files with a wrong format or larger than 100 MB:",
    needFile: "Add at least one scan.",
    name: "Dentist's full name",
    clinic: "Clinic",
    email: "Email",
    phone: "Phone",
    comment: "Comment for the technician (thickness, guidance type, notes)",
    consent: "I confirm I have the patient's consent to share data with the laboratory",
    needContacts: "Fill in name, email, phone and confirm consent.",
    back: "Back",
    next: "Next",
    submit: "Send order",
    sending: "Sending…",
    summary: "Your order",
    estimate: "Estimated cost",
    ready: "Ready in",
    files: "Files",
    uah: "UAH",
    failed: "Could not send. Check the data and try again.",
    doneTitle: "Order received",
    doneText: "Order number:",
    doneNext: "A technician will check the scans and email you a design preview.",
    again: "Place another order",
  },
};

const field =
  "mt-1.5 block min-h-11 w-full rounded-lg border border-ink-300 bg-panel px-3 py-2 text-ink-950 focus:border-brand-700";

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/** Покрокова форма B2B-замовлення капи: виріб → скани → контакти → перевірка. */
export function LabOrderForm({ locale, products }: { locale: Locale; products: LabProductOption[] }) {
  const t = copy[locale];
  const uid = useId();

  const [step, setStep] = useState(0);
  const [productId, setProductId] = useState(products[0].id);
  const [jaw, setJaw] = useState<"upper" | "lower">("lower");
  const [express, setExpress] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [contacts, setContacts] = useState({ name: "", clinic: "", email: "", phone: "", comment: "" });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const product = products.find((p) => p.id === productId) ?? products[0];
  const price = useMemo(() => Math.round(product.price * (express ? EXPRESS_FACTOR : 1)), [product, express]);
  const days = express ? Math.max(2, product.days - 2) : product.days;

  function addFiles(list: FileList | null) {
    if (!list) return;
    const ok: File[] = [];
    const bad: string[] = [];
    for (const file of Array.from(list)) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (ALLOWED.includes(ext) && file.size <= MAX_SIZE) ok.push(file);
      else bad.push(file.name);
    }
    setFiles((prev) => [...prev, ...ok.filter((f) => !prev.some((p) => p.name === f.name && p.size === f.size))]);
    setRejected(bad);
    setError("");
  }

  const contactsValid =
    contacts.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts.email) &&
    contacts.phone.trim().length >= 7 &&
    consent;

  function next() {
    if (step === 1 && files.length === 0) return setError(t.needFile);
    if (step === 2 && !contactsValid) return setError(t.needContacts);
    setError("");
    setStep((s) => Math.min(s + 1, 3));
  }

  function submit() {
    startTransition(async () => {
      const result = await submitLabOrder({
        productId,
        jaw,
        express,
        files: files.map((f) => ({ name: f.name, size: f.size })),
        ...contacts,
      });
      if (result.ok && result.orderId) setOrderId(result.orderId);
      else setError(t.failed);
    });
  }

  function reset() {
    setOrderId(null);
    setFiles([]);
    setStep(0);
  }

  if (orderId) {
    return (
      <div role="status" className="rounded-2xl border border-sand-100 bg-sand-50 p-8">
        <h2 className="text-xl font-semibold text-ink-950">{t.doneTitle}</h2>
        <p className="mt-2 text-ink-700">
          {t.doneText} <strong className="font-mono">{orderId}</strong>
        </p>
        <p className="mt-2 text-ink-700">
          {isPreview ? "Демо-режим: замовлення і файли нікуди не надіслано. · Preview: nothing was sent." : t.doneNext}
        </p>
        <button type="button" onClick={reset} className="mt-6 min-h-11 rounded-lg border border-ink-300 bg-panel px-5 text-sm font-semibold">
          {t.again}
        </button>
      </div>
    );
  }

  const choice = (active: boolean) =>
    `flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors ${
      active ? "border-brand-700 bg-brand-700 text-on-brand" : "border-ink-300 bg-panel text-ink-900 hover:border-brand-700"
    }`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Steps">
          {t.steps.map((label, i) => (
            <li key={label} aria-current={i === step ? "step" : undefined}>
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-sand-500" : "bg-line"}`} />
              <span className={`mt-2 block text-xs font-medium sm:text-sm ${i === step ? "text-ink-950" : "text-ink-500"}`}>
                {i + 1}. {label}
              </span>
            </li>
          ))}
        </ol>

        {step === 0 ? (
          <div className="space-y-8">
            <fieldset>
              <legend className="text-base font-semibold text-ink-950">{t.product}</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {products.map((p) => (
                  <label
                    key={p.id}
                    className={`cursor-pointer rounded-2xl border p-4 transition-colors ${
                      p.id === productId ? "border-brand-700 bg-sand-50" : "border-line bg-panel hover:border-ink-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${uid}-product`}
                      className="sr-only"
                      checked={p.id === productId}
                      onChange={() => setProductId(p.id)}
                    />
                    <span className="block font-semibold text-ink-950">{p.name}</span>
                    <span className="mt-1 block text-sm text-ink-500">{p.text}</span>
                    <span className="mt-3 block text-sm font-medium text-sand-700">
                      {p.price.toLocaleString("uk-UA")} {t.uah} · {p.days} {t.days}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-base font-semibold text-ink-950">{t.jaw}</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-xs">
                {(["upper", "lower"] as const).map((j) => (
                  <label key={j} className={choice(jaw === j)}>
                    <input type="radio" name={`${uid}-jaw`} className="sr-only" checked={jaw === j} onChange={() => setJaw(j)} />
                    {t[j]}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-base font-semibold text-ink-950">{t.speed}</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-md">
                <label className={choice(!express)}>
                  <input type="radio" name={`${uid}-speed`} className="sr-only" checked={!express} onChange={() => setExpress(false)} />
                  {t.standard}
                </label>
                <label className={choice(express)}>
                  <input type="radio" name={`${uid}-speed`} className="sr-only" checked={express} onChange={() => setExpress(true)} />
                  {t.express}
                </label>
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                dragging ? "border-sand-500 bg-sand-50" : "border-ink-300 bg-surface"
              }`}
            >
              <p className="font-medium text-ink-950">{t.drop}</p>
              <p className="mt-1 text-sm text-ink-500">{t.dropHint}</p>
              <input
                id={`${uid}-files`}
                type="file"
                multiple
                accept=".stl,.ply,.obj"
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <label
                htmlFor={`${uid}-files`}
                className="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-brand-700 px-5 text-sm font-semibold text-on-brand hover:bg-brand-800"
              >
                {t.choose}
              </label>
            </div>
            {rejected.length > 0 ? (
              <p role="alert" className="mt-3 text-sm text-red-400">
                {t.fileError} {rejected.join(", ")}
              </p>
            ) : null}
            {files.length > 0 ? (
              <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
                {files.map((f) => (
                  <li key={`${f.name}-${f.size}`} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                    <span className="min-w-0 truncate font-medium text-ink-950">{f.name}</span>
                    <span className="flex flex-none items-center gap-3 text-ink-500">
                      {formatSize(f.size)}
                      <button
                        type="button"
                        onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                        className="min-h-9 rounded px-2 font-medium text-red-400 hover:bg-red-950"
                      >
                        {t.remove}
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-ink-900">
                {t.name} *
                <input
                  className={field}
                  autoComplete="name"
                  value={contacts.name}
                  onChange={(e) => setContacts({ ...contacts, name: e.target.value })}
                />
              </label>
              <label className="block text-sm font-medium text-ink-900">
                {t.clinic}
                <input
                  className={field}
                  autoComplete="organization"
                  value={contacts.clinic}
                  onChange={(e) => setContacts({ ...contacts, clinic: e.target.value })}
                />
              </label>
              <label className="block text-sm font-medium text-ink-900">
                {t.email} *
                <input
                  className={field}
                  type="email"
                  autoComplete="email"
                  value={contacts.email}
                  onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
                />
              </label>
              <label className="block text-sm font-medium text-ink-900">
                {t.phone} *
                <input
                  className={field}
                  type="tel"
                  autoComplete="tel"
                  value={contacts.phone}
                  onChange={(e) => setContacts({ ...contacts, phone: e.target.value })}
                />
              </label>
            </div>
            <label className="block text-sm font-medium text-ink-900">
              {t.comment}
              <textarea
                className={field}
                rows={4}
                value={contacts.comment}
                onChange={(e) => setContacts({ ...contacts, comment: e.target.value })}
              />
            </label>
            <label className="flex items-start gap-3 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 accent-brand-700"
              />
              {t.consent} *
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <dl className="divide-y divide-line rounded-2xl border border-line text-sm">
            {[
              [t.product, product.name],
              [t.jaw, t[jaw]],
              [t.speed, express ? t.express : t.standard],
              [t.files, files.map((f) => f.name).join(", ")],
              [t.name, contacts.name],
              [t.clinic, contacts.clinic || "—"],
              [t.email, contacts.email],
              [t.phone, contacts.phone],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr]">
                <dt className="text-ink-500">{k}</dt>
                <dd className="break-words font-medium text-ink-950">{v}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep(step - 1);
              }}
              className="min-h-11 rounded-lg border border-ink-300 bg-panel px-5 text-sm font-semibold text-ink-900 hover:border-brand-700"
            >
              {t.back}
            </button>
          ) : null}
          {step < 3 ? (
            <button type="button" onClick={next} className="min-h-11 rounded-lg bg-brand-700 px-6 text-sm font-semibold text-on-brand hover:bg-brand-800">
              {t.next}
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={pending}
              className="min-h-11 rounded-lg bg-sand-400 px-6 text-sm font-semibold text-on-brand hover:bg-sand-500 disabled:opacity-60"
            >
              {pending ? t.sending : t.submit}
            </button>
          )}
        </div>
      </div>

      <aside aria-live="polite" className="h-fit rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">{t.summary}</h2>
        <p className="mt-3 text-lg font-semibold text-ink-950">{product.name}</p>
        <p className="text-sm text-ink-500">
          {t[jaw]} · {express ? t.express : t.standard}
        </p>
        <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">{t.files}</dt>
            <dd className="font-medium text-ink-950">{files.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">{t.ready}</dt>
            <dd className="font-medium text-ink-950">
              {days} {t.days}
            </dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="text-ink-500">{t.estimate}</dt>
            <dd className="text-xl font-semibold text-ink-950">
              {price.toLocaleString("uk-UA")} {t.uah}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
