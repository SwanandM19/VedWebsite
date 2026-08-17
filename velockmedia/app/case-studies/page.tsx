
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import BookCallButton from "../components/BookCallButton";
import { CASE_STUDIES as FALLBACK_CASE_STUDIES, type CaseStudy } from "./data";
import { sanityFetch } from "../../sanity/lib/client";
import { imageUrl } from "../../sanity/lib/image";
import {
  caseStudiesPageQuery,
  caseStudiesQuery,
  testimonialsQuery,
} from "../../sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";
import { PackageOpen } from "lucide-react";

type Review = {
  quote: string;
  initials: string;
  bg: string;
  fg: string;
  name: string;
  role: string;
};

function ReviewRow({
  speed,
  reviews,
}: {
  speed: string;
  reviews: Review[];
}) {
  const numericSpeed = parseFloat(speed) || 0.4;

  const marqueeStyle = {
    "--marquee-duration": `${Math.round(
      38 + Math.abs(numericSpeed) * 10
    )}s`,
    "--marquee-direction": numericSpeed > 0 ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div
      className="marquee-loop edge-fade flex w-max will-change-transform"
      style={marqueeStyle}
    >
      {[0, 1].map((pass) => (
        <div
          key={pass}
          aria-hidden={pass === 1}
          className="flex gap-5 pr-5"
        >
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="flex w-[86vw] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:w-[26rem]"
            >
              <p className="text-base leading-7 text-neutral-700">
                &ldquo;{r.quote}&rdquo;
              </p>

              <footer className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-medium ${r.bg} ${r.fg}`}
                >
                  {r.initials}
                </div>

                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="font-display text-[13px] uppercase tracking-[0.18em] text-neutral-400">
                    {r.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How Veloc approaches media for sports organizations: the challenge, the objective, the approach and the deliverables.",
  openGraph: {
    title: "Case Studies — Veloc Media",
    description:
      "Real projects for sports organizations — the challenge, the objective, the approach and the deliverables.",
    siteName: "Veloc Media",
    type: "website",
  },
};

type SanityCaseStudy = Omit<
  CaseStudy,
  "image" | "challenge" | "solution" | "results"
> & {
  image?: SanityImageSource;
};

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

type Metric = {
  label: string;
  value: string;
};

type CaseStudiesPageContent = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  metrics?: Metric[];
};

// [ADD VERIFIED NUMBERS] — managed in Sanity (Case Studies Page → Metrics).
// Bracketed placeholders ship until real figures exist; never estimate.
const FALLBACK_METRICS: Metric[] = [
  { label: "Sports projects delivered", value: "[X]+" },
  { label: "Organizations served", value: "[X]+" },
  { label: "Sports worked in", value: "[X]+" },
  { label: "Upwork rating", value: "[X.X]" },
];

// [ADD REAL TESTIMONIALS] — authored in Sanity (Testimonial documents). No
// local fallback on purpose: an empty list shows a visible placeholder in the
// reviews section rather than inventing a quote.
const FALLBACK_TESTIMONIALS: Testimonial[] = [];

export default async function CaseStudiesPage() {
  const [
    fetchedCaseStudies,
    fetchedTestimonials,
    pageContent,
  ] = await Promise.all([
    sanityFetch<SanityCaseStudy[]>(caseStudiesQuery),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<CaseStudiesPageContent>(caseStudiesPageQuery),
  ]);

  const usingSanity = Boolean(
    fetchedCaseStudies && fetchedCaseStudies.length > 0
  );

  const CASE_STUDIES = usingSanity
    ? fetchedCaseStudies!
    : FALLBACK_CASE_STUDIES;

  const TESTIMONIALS =
    fetchedTestimonials && fetchedTestimonials.length > 0
      ? fetchedTestimonials
      : FALLBACK_TESTIMONIALS;

  const METRICS =
    pageContent?.metrics && pageContent.metrics.length > 0
      ? pageContent.metrics
      : FALLBACK_METRICS;

  const eyebrow = pageContent?.eyebrow || "Case Studies";

  const heading =
    pageContent?.heading ||
    "The objective, the approach, the work.";

  const intro =
    pageContent?.intro ||
    "Selected projects for sports organizations — what the client needed, what the content had to accomplish, how we approached it and what we delivered.";

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        {/* ==================== HERO ==================== */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <p className="font-display text-[14px] uppercase tracking-[0.2em] text-acid">
            {eyebrow}
          </p>

          <h1 className="font-display mt-5 max-w-3xl text-5xl font-medium leading-tight tracking-normal sm:text-6xl">
            {heading}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500">
            {intro}
          </p>
        </section>

        {/* ==================== CASE STUDIES ==================== */}
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
                    src={
                      typeof cs.image === "string"
                        ? cs.image
                        : imageUrl(cs.image, 1200)
                    }
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

                  <h2 className="font-display mt-3 flex items-start justify-between gap-3 text-3xl font-medium leading-tight tracking-normal">
                    {cs.title}

                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-neutral-300 transition group-hover:text-acid"
                      strokeWidth={1.5}
                    />
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {cs.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

          {/* ============ 04 · NUMBERS ============ */}
<section id="products" className="border-t border-neutral-200 bg-white py-20 sm:py-28">
  <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
    <div>
      <h2
        className="font-display mt-5 max-w-lg text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl"
        data-split="lines"
      >
        We are a post-production operation.
      </h2>

      <p
        className="mt-7 max-w-xl text-base leading-7 text-neutral-600"
        data-reveal
      >
        Most of our work starts with footage that already exists — captured by
        your team, your venue or your broadcast partner. Send us what you have
        and what you are trying to achieve.
      </p>

      <p
        className="mt-4 max-w-xl text-base leading-7 text-neutral-600"
        data-reveal
      >
        We work out what should be made from it before we open an edit, because
        the objective decides the cut — not the other way around.
      </p>

      {/* TRUST / NUMBERS */}
      <div
        className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3"
        data-stagger
      >
        {[
          { value: "50+", label: "Clients Served" },
          { value: "10+", label: "Sports Covered" },
          { value: "3+", label: "Years of Experience" },
          { value: "500+", label: "Projects Delivered" },
          { value: "1000+", label: "Hours of Footage Processed" },
          { value: "10+", label: "Countries Worked With" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border-t border-neutral-900/15 pt-4"
          >
            <p className="font-display text-4xl font-medium leading-tight tracking-normal">
              {stat.value}
            </p>

            <p className="mt-2 font-display text-[13px] uppercase tracking-[0.18em] text-neutral-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* HOW AN ENGAGEMENT RUNS */}
    <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-neutral-50 p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300" />

        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200" />

        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300" />
      </div>

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-neutral-300 bg-white px-4 py-2 font-display text-[13px] uppercase tracking-[0.2em]">
            How an engagement runs
          </span>

          <PackageOpen
            className="h-6 w-6 text-neutral-400"
            strokeWidth={1.5}
          />
        </div>

        <div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3"
          data-stagger
        >
          {[
            {
              t: "01 · Understand",
              s: "The sport, the org, the objective",
            },
            {
              t: "02 · Plan",
              s: "What gets made, how footage is handled",
            },
            {
              t: "03 · Produce",
              s: "Our team executes the post",
            },
            {
              t: "04 · Review",
              s: "Quality control, then your feedback",
            },
            {
              t: "05 · Deliver",
              s: "Final assets, organized",
            },
            {
              t: "06 · Continue",
              s: "It becomes a media operation",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur"
            >
              {/* Orange dot */}
              <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-acid" />

              <p className="text-sm font-medium">
                {item.t}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {item.s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

        {/* ==================== 09 · REVIEWS ==================== */}
        {/* Added mt-20 sm:mt-28 to create visible separation from metrics */}
        <section
          id="reviews"
          className="mt-20 overflow-hidden border-y border-neutral-200 bg-neutral-50 py-20 sm:mt-28 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[14px] uppercase tracking-[0.2em] text-neutral-400">
              Client reviews
            </p>

            <h2
              className="font-display mt-5 max-w-3xl text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl"
              data-split="lines"
            >
              What organizations say after working with us.
            </h2>

            <p
              className="mt-5 max-w-xl text-base leading-7 text-neutral-500"
              data-reveal
            >
              Verified reviews from the organizations whose media we handle.
            </p>
          </div>

          {TESTIMONIALS.length > 0 ? (
            <div className="mt-14 space-y-5">
              <ReviewRow
                speed="-0.5"
                reviews={TESTIMONIALS.slice(0, 3).map((t, i) => ({
                  quote: t.quote,
                  name: t.name,
                  role: t.role || "",
                  initials: t.name.slice(0, 2).toUpperCase(),
                  bg: [
                    "bg-neutral-200",
                    "bg-neutral-200",
                    "bg-neutral-200",
                  ][i % 3],
                  fg: "text-neutral-800",
                }))}
              />
            </div>
          ) : (
            /* Placeholder, not a quote — populate Testimonials in Sanity. */
            <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8 lg:px-10">
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center sm:px-12">
                <p className="font-display text-[14px] uppercase tracking-[0.2em] text-acid">
                  [ADD REAL TESTIMONIALS]
                </p>

                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-500">
                  Verified client reviews go here. We publish reviews as they
                  are approved rather than writing them ourselves — ask us on a
                  call and we will walk you through the feedback we have
                  received so far.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ==================== CTA ==================== */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-4xl font-medium leading-tight tracking-normal sm:text-5xl">
              Have a season or an event coming up?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
              Tell us what you are trying to achieve and we will work out what
              the content needs to do — and whether we are the right fit to
              make it.
            </p>

            <BookCallButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white">
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </BookCallButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
