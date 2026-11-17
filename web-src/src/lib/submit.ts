/**
 * Надсилання форм. Сайт статичний (GitHub Pages), серверного коду немає,
 * тому зараз це ЗАГЛУШКИ: дані перевіряються і нікуди не надсилаються.
 * Щоб форми запрацювали, замініть тіла функцій на запит до сервісу форм,
 * Supabase або власного API.
 */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Запит демо та контактна форма. */
export async function submitLead(formData: FormData): Promise<boolean> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const consent = formData.get("consent") === "on";
  return name.length >= 2 && isEmail(email) && consent;
}

export interface LabOrderPayload {
  productId: string;
  jaw: "upper" | "lower";
  express: boolean;
  /** Лише метадані. Самі файли слід вантажити напряму в сховище за підписаним URL. */
  files: { name: string; size: number }[];
  name: string;
  clinic: string;
  email: string;
  phone: string;
  comment: string;
}

export async function submitLabOrder(payload: LabOrderPayload): Promise<{ ok: boolean; orderId?: string }> {
  const valid =
    payload.productId &&
    payload.files.length > 0 &&
    payload.name.trim().length >= 2 &&
    isEmail(payload.email) &&
    payload.phone.trim().length >= 7;
  if (!valid) return { ok: false };
  return { ok: true, orderId: `DEMO-${Date.now().toString(36).toUpperCase()}` };
}
