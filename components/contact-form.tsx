"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

const BUDGETS = ["Under ₹10L", "₹10L – 25L", "₹25L – 50L", "₹50L – 1Cr", "Above ₹1Cr"] as const;
const TIMELINES = ["Within 3 months", "3 – 6 months", "6 – 12 months", "Flexible"] as const;
const SOURCES = ["Instagram", "Google search", "Referral / friend", "Press / publication", "Other"] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill every field; humans skip a hidden one
    if ((data.get("website") as string)?.length) {
      setStatus("success");
      return;
    }

    if (FORMSPREE_ENDPOINT.includes("REPLACE_ME")) {
      // Phase 1 placeholder: pretend-success after a beat.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-bg p-10 md:p-14">
        <div className="grid h-12 w-12 place-items-center border border-accent text-accent">
          <Check strokeWidth={1.5} size={20} />
        </div>
        <h2 className="mt-8 font-display text-3xl leading-tight tracking-tight text-fg md:text-4xl">
          Thank you. The note arrived.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fg/80">
          We read every enquiry personally and reply within two working days. If it&rsquo;s urgent,
          WhatsApp is the quickest way to reach the studio.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-border bg-bg p-6 md:p-10 lg:p-12"
      aria-label="Project enquiry form"
    >
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field name="name" label="Name" required autoComplete="name" />
        <Field name="phone" label="Phone" required type="tel" autoComplete="tel" />
      </div>
      <div className="mt-6">
        <Field name="email" label="Email" required type="email" autoComplete="email" />
      </div>
      <div className="mt-6">
        <FieldTextarea name="message" label="Project description" required rows={4} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldSelect name="budget" label="Total project budget" options={[...BUDGETS]} />
        <FieldSelect name="timeline" label="Project completion" options={[...TIMELINES]} />
      </div>
      <div className="mt-6">
        <FieldSelect name="source" label="How did you hear about us?" options={[...SOURCES]} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "mt-10 inline-flex w-full items-center justify-center gap-3 bg-fg px-6 py-5 text-xs font-medium uppercase tracking-[0.18em] text-bg transition-colors hover:bg-accent hover:text-cream disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </button>

      {error && (
        <p className="mt-4 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
      <p className="mt-6 text-xs text-muted">
        We&rsquo;ll never share your details. You&rsquo;ll hear back from us within two working days.
      </p>
    </form>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="mb-2 inline-block text-[11px] uppercase tracking-[0.16em] text-muted">
      {children}
      {required && <span className="ml-1 text-accent">*</span>}
    </span>
  );
}

interface FieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}

function Field({ name, label, required, type = "text", autoComplete }: FieldProps) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="block h-12 w-full border border-border bg-transparent px-4 text-base text-fg outline-none transition-colors placeholder:text-muted focus:border-accent"
      />
    </label>
  );
}

function FieldTextarea({
  name,
  label,
  required,
  rows = 4,
}: {
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="block w-full resize-none border border-border bg-transparent px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-muted focus:border-accent"
      />
    </label>
  );
}

function FieldSelect({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="block h-12 w-full appearance-none border border-border bg-transparent px-4 pr-10 text-base text-fg outline-none transition-colors focus:border-accent"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-bg text-fg">
              {opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        >
          ↓
        </span>
      </div>
    </label>
  );
}
