"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Phone, X, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { submitCallback } from "@/lib/contact";
import { easeAurora } from "@/lib/motion";
import { cn } from "@/lib/utils";

const COOKIE_KEY = "aurora-cookie-consent";
const CALLBACK_KEY = "aurora-callback-seen";
const CALLBACK_DELAY_MS = 30000;

/** Mounts the site-wide floating widgets: cookie consent, back-to-top, callback popup. */
export function SiteWidgets() {
  return (
    <>
      <BackToTop />
      <CookieConsent />
      <CallbackPopup />
    </>
  );
}

/* ── Back to top — bottom-left ─────────────────────────────────── */
function BackToTop() {
  const t = useTranslations("widgets");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("toTop")}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: easeAurora }}
          className="glass fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full text-foreground shadow-lg shadow-black/40 transition-colors hover:border-white/20 hover:text-[var(--aurora-cyan)]"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Cookie / PDN consent — bottom-center ──────────────────────── */
function CookieConsent() {
  const t = useTranslations("widgets");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      const id = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(id);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: easeAurora }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl sm:inset-x-0"
        >
          <div className="glass flex flex-col gap-3 rounded-2xl px-4 py-3.5 shadow-2xl shadow-black/50 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {t("cookie.text")}{" "}
              <Link
                href="/faq"
                className="text-[var(--aurora-cyan)] underline-offset-2 hover:underline"
              >
                {t("cookie.privacy")}
              </Link>
            </p>
            <button
              type="button"
              onClick={accept}
              className="shrink-0 rounded-lg bg-gradient-to-r from-[var(--aurora-purple)] to-[var(--aurora-cyan)] px-4 py-2 text-sm font-semibold text-[#0A0E27] transition-opacity hover:opacity-90"
            >
              {t("cookie.accept")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Callback popup — appears after 30s, bottom-right ──────────── */
function CallbackPopup() {
  const t = useTranslations("widgets");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (sessionStorage.getItem(CALLBACK_KEY)) return;
    const id = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(CALLBACK_KEY, "1");
    }, CALLBACK_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const res = await submitCallback(form);
    setStatus(res.ok ? "ok" : "error");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: easeAurora }}
          className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-card/95 p-5 shadow-2xl shadow-[rgba(185,103,255,0.25)] backdrop-blur-xl">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-30 blur-2xl"
              style={{ background: "linear-gradient(135deg,#B967FF,#01CDFE)" }}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("callback.close")}
              className="absolute right-3 top-3 z-10 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {status === "ok" ? (
              <div className="relative flex flex-col items-center gap-3 py-6 text-center">
                <span
                  className="grid size-12 place-items-center rounded-2xl text-[#0A0E27]"
                  style={{ background: "linear-gradient(135deg,#01CDFE,#B967FF)" }}
                >
                  <Check className="size-6" strokeWidth={2.4} />
                </span>
                <p className="font-display text-lg font-semibold">
                  {t("callback.success")}
                </p>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <span
                    className="grid size-9 place-items-center rounded-xl text-[#0A0E27]"
                    style={{ background: "linear-gradient(135deg,#B967FF,#01CDFE)" }}
                  >
                    <Phone className="size-4" strokeWidth={2.4} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {t("callback.title")}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("callback.subtitle")}
                </p>
                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2.5">
                  <Input
                    placeholder={t("callback.name")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-label={t("callback.name")}
                  />
                  <Input
                    type="email"
                    placeholder={t("callback.email")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-label={t("callback.email")}
                  />
                  <Input
                    type="tel"
                    placeholder={t("callback.phone")}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    aria-label={t("callback.phone")}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "mt-1 rounded-lg bg-gradient-to-r from-[var(--aurora-purple)] to-[var(--aurora-cyan)] px-4 py-2.5 text-sm font-semibold text-[#0A0E27] transition-opacity hover:opacity-90 disabled:opacity-60"
                    )}
                  >
                    {t("callback.submit")}
                  </button>
                  {status === "error" && (
                    <span className="text-xs text-[#FF4D6D]">
                      {t("callback.name")} + {t("callback.phone")}
                    </span>
                  )}
                </form>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
