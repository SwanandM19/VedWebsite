import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { CASE_STUDIES } from "./data";

export const metadata: Metadata = {
  title: "Case Studies — NIVO",
  description: "Real projects shot on the NIVO system, from brand films to weekly interview shows.",
};

const METRICS = [
  { label: "Projects delivered", value: "150+" },
  { label: "Clients served", value: "40+" },
  { label: "Countries shot in", value: "12" },
  { label: "Upwork rating", value: "4.9" },
];

const TESTIMONIALS = [
  {
    quote: "They shipped six launch cuts in nine days without a single reshoot. The whole thing looked native to our brand.",
    name: "Priya Anand",
    role: "Marketing Lead, Sunridge Outdoors",
  },
  {
    quote: "One creator, one bag, thirty straight days of content — and it never felt rushed on camera.",
    name: "Theo Marchetti",
    role: "Founder, Wanderfolk",
  },
  {
    quote: "We went from a multicam truck budget to a two-person crew with better footage. Every show ships the same night.",
    name: "Jess Okafor",
    role: "Producer, Afterglow Sessions",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">Case Studies</p>
          <h1 className="font-display mt-5 max-w-3xl text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Real shoots, real deadlines, real results.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500">
            A selection of projects delivered on the NIVO system — from single-day brand films to weekly production
            schedules with zero crew.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group block overflow-hidden rounded-2xl border border-neutral-200 transition hover:border-neutral-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-700 backdrop-blur">
                    {cs.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                    <span>{cs.client}</span>
                    <span>{cs.year}</span>
                  </div>
                  <h2 className="font-display mt-3 flex items-start justify-between gap-3 text-xl font-medium tracking-[-0.02em]">
                    {cs.title}
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-neutral-300 transition group-hover:text-acid" strokeWidth={1.5} />
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-500">{cs.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 gap-6 rounded-2xl bg-neutral-50 px-6 py-10 sm:px-10 md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label}>
                <p className="font-display flex items-center gap-1.5 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
                  {m.value}
                  {m.label === "Upwork rating" && <Star className="mb-1 h-5 w-5 fill-acid text-acid" />}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">What clients say</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-neutral-200 p-6">
                <p className="text-base leading-7 text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-6 text-sm font-medium text-neutral-900">{t.name}</p>
                <p className="text-sm text-neutral-500">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              Have a shoot on the calendar?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
              Tell us about the brief and we&apos;ll put together a plan that fits your timeline and budget.
            </p>
            <Link
              href="/#support"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white"
            >
              Book a call <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
