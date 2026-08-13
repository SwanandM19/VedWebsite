"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X as XIcon, Loader2, CheckCircle2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

const ORG_TYPES = [
  "Recruitment program / college",
  "Academy",
  "Event organizer",
  "League",
  "Team / club",
  "Other",
];

export default function BookCallModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset the form's result state whenever the modal transitions from
  // closed to open, so a previous success/error doesn't linger on reopen.
  // Done during render (not in an effect) per React's guidance for
  // resetting state on a prop change: https://react.dev/learn/you-might-not-need-an-effect
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      company: String(data.get("company") || ""),
      orgType: String(data.get("orgType") || ""),
      sport: String(data.get("sport") || ""),
      message: String(data.get("message") || ""),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[400] grid place-items-center bg-ink/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookCallTitle"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-7 text-white shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-acid hover:text-acid"
        >
          <XIcon className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-acid/15 text-acid">
              <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h2 className="font-display mt-5 text-2xl font-medium tracking-[-0.02em]">Request received</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Thanks — we&apos;ll read it properly and come back to you to arrange a time.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-acid px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">Discovery call</p>
            <h2 id="bookCallTitle" className="font-display mt-3 text-2xl font-medium tracking-[-0.02em]">
              Let&apos;s talk about your media.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Tell us about your organization, project, event or season. We&apos;ll take a look and work out whether Veloc
              is the right fit.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div>
                <label htmlFor="bc-name" className="sr-only">Full name</label>
                <input
                  ref={firstFieldRef}
                  id="bc-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-acid"
                />
              </div>
              <div>
                <label htmlFor="bc-email" className="sr-only">Email</label>
                <input
                  id="bc-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-acid"
                />
              </div>
              <div>
                <label htmlFor="bc-phone" className="sr-only">Phone</label>
                <input
                  id="bc-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-acid"
                />
              </div>
              <div>
                <label htmlFor="bc-company" className="sr-only">Organization</label>
                <input
                  id="bc-company"
                  name="company"
                  type="text"
                  placeholder="Organization"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-acid"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="bc-org-type" className="sr-only">Organization type</label>
                  <select
                    id="bc-org-type"
                    name="orgType"
                    defaultValue=""
                    className="w-full appearance-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-acid"
                  >
                    <option value="" disabled className="bg-neutral-900">
                      Organization type
                    </option>
                    {ORG_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-neutral-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bc-sport" className="sr-only">Sport</label>
                  <input
                    id="bc-sport"
                    name="sport"
                    type="text"
                    placeholder="Sport"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-acid"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bc-message" className="sr-only">What do you need help with?</label>
                <textarea
                  id="bc-message"
                  name="message"
                  rows={4}
                  placeholder="Your sport, and what you need help with"
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-acid"
                />
              </div>

              {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} /> Sending
                  </>
                ) : (
                  "Start the conversation"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
