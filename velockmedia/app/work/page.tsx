import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { PLACEHOLDER_IMAGES } from "../components/placeholders";
import { sanityFetch } from "../../sanity/lib/client";
import { imageUrl } from "../../sanity/lib/image";
import { workCategoriesQuery } from "../../sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata: Metadata = {
  title: "Work — NIVO",
  description: "What we shoot, by category — brand film, social content, live coverage and interview series.",
};

type WorkCategory = { name: string; blurb?: string; count?: string; image?: SanityImageSource };

const FALLBACK_CATEGORIES: WorkCategory[] = [
  {
    name: "Brand Film",
    blurb: "Launch films, product stories and campaign hero videos.",
    count: "12 projects",
    image: PLACEHOLDER_IMAGES.goldenHour,
  },
  {
    name: "Social Content",
    blurb: "Creator-style daily content, shot fast and edited faster.",
    count: "20 projects",
    image: PLACEHOLDER_IMAGES.travel,
  },
  {
    name: "Live Coverage",
    blurb: "Multi-angle event and performance capture, same-night turnaround.",
    count: "18 projects",
    image: PLACEHOLDER_IMAGES.liveSet,
  },
  {
    name: "Interview Series",
    blurb: "Recurring, studio-consistent interviews shot on location.",
    count: "9 projects",
    image: PLACEHOLDER_IMAGES.interview,
  },
];

export default async function WorkPage() {
  const fetched = await sanityFetch<WorkCategory[]>(workCategoriesQuery);
  const CATEGORIES = fetched && fetched.length > 0 ? fetched : FALLBACK_CATEGORIES;

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">Our Work</p>
          <h1 className="font-display mt-5 max-w-3xl text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Everything we shoot, grouped by category.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500">
            Browse by the kind of project you have in mind, then dig into the full write-ups in our case studies.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href="/case-studies"
                className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8 text-white"
              >
                <img
                  src={typeof cat.image === "string" ? cat.image : imageUrl(cat.image, 1200)}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full scale-105 object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{cat.count}</p>
                  <h2 className="font-display mt-3 flex items-center justify-between gap-3 text-2xl font-medium tracking-[-0.02em]">
                    {cat.name}
                    <ArrowUpRight className="h-6 w-6 shrink-0 text-white/70 transition group-hover:text-acid" strokeWidth={1.5} />
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">{cat.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              Not sure which category fits?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
              Tell us what you&apos;re trying to make and we&apos;ll point you to the closest work in our archive.
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
