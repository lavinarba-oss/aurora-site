"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/lib/contact";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "landing",
  "catalog",
  "multipage",
  "ecommerce",
  "webapp",
  "integrations",
  "automation",
  "design",
  "marketing",
  "support",
  "other",
] as const;

const BUDGET_OPTIONS = [
  "small",
  "medium",
  "large",
  "xl",
  "unknown",
] as const;

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  telegram: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof Schema>;

/** Contact form with react-hook-form + zod + server action */
export function ContactForm() {
  const t = useTranslations("contacts.form");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", email: "", telegram: "", message: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setStatus("idle");
    startTransition(async () => {
      try {
        const res = await submitContactForm(data);
        if (res.ok) {
          setStatus("ok");
          reset();
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    });
  });

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-card/40 px-8 py-16 text-center">
        <span
          aria-hidden
          className="grid size-14 place-items-center rounded-2xl text-[#0A0E27]"
          style={{ background: "linear-gradient(135deg,#01CDFE,#B967FF)" }}
        >
          <Check className="size-6" strokeWidth={2.4} />
        </span>
        <p className="font-display text-2xl font-semibold leading-tight tracking-tight">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-card/40 p-6 backdrop-blur-xl sm:p-8"
    >
      <Field label={t("name.label")} error={errors.name && t("errors.nameRequired")}>
        <Input
          placeholder={t("name.placeholder")}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("email.label")}
          error={
            errors.email
              ? errors.email.message === "Invalid email"
                ? t("errors.emailInvalid")
                : t("errors.emailRequired")
              : undefined
          }
        >
          <Input
            type="email"
            placeholder={t("email.placeholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field label={t("telegram.label")}>
          <Input
            placeholder={t("telegram.placeholder")}
            {...register("telegram")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("service.label")}>
          <Select {...register("service")} defaultValue="">
            <option value="" disabled>
              {t("service.placeholder")}
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {t(`service.options.${opt}`)}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t("budget.label")}>
          <Select {...register("budget")} defaultValue="">
            <option value="" disabled>
              {t("budget.placeholder")}
            </option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {t(`budget.options.${opt}`)}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label={t("message.label")}
        error={errors.message && t("errors.messageRequired")}
      >
        <Textarea
          rows={6}
          placeholder={t("message.placeholder")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="group gap-2 px-6"
        >
          {isPending ? t("submitting") : t("submit")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>

        {status === "error" && (
          <span className="text-sm text-[#FF4D6D]">{t("error")}</span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <span className="text-xs text-[#FF4D6D]">{error}</span>}
    </div>
  );
}

const Select = ({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      "h-10 w-full appearance-none rounded-md border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-foreground",
      "focus:border-white/[0.16] focus:outline-none focus:ring-2 focus:ring-ring/30",
      className
    )}
    {...props}
  >
    {children}
  </select>
);
