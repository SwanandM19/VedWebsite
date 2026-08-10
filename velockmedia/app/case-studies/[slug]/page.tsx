import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { CASE_STUDIES } from "../data";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: `${cs.client} — NIVO Case Studies`, description: cs.summary };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();

  const cs = CASE_STUDIES[index];
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-4xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> All case studies
          </Link>
          <p className="font-display mt-8 text-[11px] uppercase tracking-[0.28em] text-acid">
            {cs.category} · {cs.year}
          </p>
          <h1 className="font-display mt-5 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">{cs.title}</h1>
          <p className="mt-6 text-base leading-7 text-neutral-500">{cs.summary}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-neutral-400">Client — {cs.client}</p>
        </section>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
            <img src={cs.image} alt={cs.title} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10">
          <div>
            <h2 className="font-display text-xl font-medium tracking-[-0.02em]">The challenge</h2>
            <p className="mt-4 text-base leading-7 text-neutral-500">{cs.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium tracking-[-0.02em]">The approach</h2>
            <p className="mt-4 text-base leading-7 text-neutral-500">{cs.solution}</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8 lg:px-10">
          <div className="grid grid-cols-3 gap-6 rounded-2xl bg-neutral-50 px-6 py-10 text-center sm:px-10">
            {cs.results.map((r) => (
              <div key={r.label}>
                <p className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">{r.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">{r.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group mx-auto flex max-w-4xl items-center justify-between gap-6 px-5 py-10 sm:px-8 lg:px-10"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Next case study</p>
              <p className="font-display mt-2 text-xl font-medium tracking-[-0.02em]">{next.title}</p>
            </div>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-300 transition group-hover:text-acid" strokeWidth={1.5} />
          </Link>
        </section>

        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">Want results like this?</h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
              Tell us about your brief and we&apos;ll put together a plan that fits your timeline and budget.
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
