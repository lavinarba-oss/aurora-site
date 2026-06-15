import { z } from "zod";

/**
 * Client-side contact submission — works on a fully static site (no server).
 *
 * Delivery is configured with NEXT_PUBLIC_CONTACT_ENDPOINT:
 *   • Formspree:   https://formspree.io/f/XXXX
 *   • Telegram:    a small webhook / Apps Script URL that forwards to a bot
 *   • Any service that accepts a JSON POST
 *
 * If no endpoint is set, it gracefully falls back to opening a pre-filled
 * email so the form still does something useful on a demo deploy.
 */

export const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  telegram: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export type ContactResult = { ok: true } | { ok: false; error: string };

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const FALLBACK_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@aurora.digital";

export async function submitContactForm(
  input: ContactInput
): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;

  // Preferred path — POST to the configured endpoint
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      return res.ok ? { ok: true } : { ok: false, error: "network" };
    } catch {
      return { ok: false, error: "network" };
    }
  }

  return sendOrMail(data);
}

export type CallbackInput = { name: string; email: string; phone: string };

/** Lightweight "call me back" submission (name + email + phone). */
export async function submitCallback(
  input: CallbackInput
): Promise<ContactResult> {
  if (!input.name.trim() || !input.phone.trim()) {
    return { ok: false, error: "required" };
  }
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...input, kind: "callback" }),
      });
      return res.ok ? { ok: true } : { ok: false, error: "network" };
    } catch {
      return { ok: false, error: "network" };
    }
  }
  return sendOrMail({
    name: input.name,
    email: input.email,
    telegram: "",
    service: "callback",
    budget: "",
    message: `Перезвоните мне. Телефон: ${input.phone}`,
  });
}

/** Shared mailto fallback used when no endpoint is configured. */
function sendOrMail(data: ContactInput): ContactResult {
  if (typeof window !== "undefined") {
    const subject = encodeURIComponent(`Заявка с сайта — ${data.name}`);
    const body = encodeURIComponent(
      [
        `Имя: ${data.name}`,
        `Email: ${data.email}`,
        `Telegram: ${data.telegram || "—"}`,
        `Услуга: ${data.service || "—"}`,
        `Бюджет: ${data.budget || "—"}`,
        "",
        data.message,
      ].join("\n")
    );
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  }
  return { ok: true };
}
