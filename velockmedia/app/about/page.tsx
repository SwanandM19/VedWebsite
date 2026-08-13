import type { Metadata } from "next";
import { ArrowUpRight, Compass, Gauge, Handshake, ShieldCheck, Sparkle, Focus, type LucideIcon } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import BookCallButton from "../components/BookCallButton";
import { sanityFetch } from "../../sanity/lib/client";
import { imageUrl } from "../../sanity/lib/image";
import { aboutPageQuery } from "../../sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata: Metadata = {
  title: "About",
  description:
    "Veloc Media is a Sports Media Operations company built to become the trusted media partner behind ambitious sports organizations.",
  openGraph: {
    title: "About — Veloc Media",
    description:
      "Who we are, why we exist, how we think, and the standard we hold ourselves to as a sports media operations company.",
    siteName: "Veloc Media",
    type: "website",
  },
};

const ICONS: Record<string, LucideIcon> = { Compass, Gauge, Handshake, ShieldCheck, Sparkle, Focus };

type ProcessStep = { title: string; copy: string };
type Principle = { icon: string; title: string; copy: string };
type AboutPageContent = {
  missionEyebrow?: string;
  missionHeading?: string;
  missionBody?: string;
  processSteps?: ProcessStep[];
  founderName?: string;
  founderRole?: string;
  founderBio?: string;
  founderPhoto?: SanityImageSource;
  principles?: Principle[];
};

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  { title: "Understand", copy: "We learn the sport, the organization, the event and the objective before anything else." },
  { title: "Plan", copy: "We agree what needs to be created and how the footage and assets will be handled." },
  { title: "Produce", copy: "Our team executes the post-production against that plan." },
  { title: "Review", copy: "Quality control on our side first, then your feedback." },
  { title: "Deliver", copy: "Final assets, organized and labelled so your team can actually use them." },
  { title: "Continue", copy: "For ongoing clients the workflow becomes a repeatable media operation." },
];

const FALLBACK_PRINCIPLES: Principle[] = [
  { icon: "Compass", title: "Understanding before execution", copy: "We establish what the content has to accomplish before we decide how to produce it." },
  { icon: "ShieldCheck", title: "Ownership over excuses", copy: "When something is ours to solve, we solve it and we tell you where it stands." },
  { icon: "Gauge", title: "Consistency over brilliance", copy: "The same standard in week twenty as in week one beats one exceptional edit." },
  { icon: "Handshake", title: "Professionalism over flash", copy: "Clear communication and reliable delivery matter more than showing off effects." },
  { icon: "Focus", title: "Systems over heroics", copy: "Repeatable workflows, so quality never depends on one person having a good week." },
  { icon: "Sparkle", title: "Learning over ego", copy: "Every sport, league and organization works differently. We ask before we assume." },
];

export default async function AboutPage() {
  const content = await sanityFetch<AboutPageContent>(aboutPageQuery);

  const missionEyebrow = content?.missionEyebrow || "Who we are";
  const missionHeading =
    content?.missionHeading || "The reliable media team behind ambitious sports organizations.";
  const missionBody =
    content?.missionBody ||
    "Veloc Media is a Sports Media Operations company. We exist because sports organizations should not have to wonder whether their media team will understand the assignment, meet the deadline, or deliver consistently. When you work with us, media becomes one less thing you have to worry about.";

  const processSteps = content?.processSteps && content.processSteps.length > 0 ? content.processSteps : FALLBACK_PROCESS_STEPS;

  // [ADD REAL FOUNDER DETAILS] — name, role, bio and photo are managed in
  // Sanity (About Page). Until they are filled in, the page renders a neutral
  // placeholder rather than an invented biography.
  const founderName = content?.founderName || "[ADD FOUNDER NAME]";
  const founderRole = content?.founderRole || "Founder";
  const founderBio =
    content?.founderBio ||
    "[ADD FOUNDER BIO] — a short, human introduction to the person behind Veloc. Veloc is built to run as a company rather than around one individual, so keep this focused on perspective and standards rather than a full biography.";
  const founderPhoto = content?.founderPhoto ? imageUrl(content.founderPhoto, 1000) : null;

  const principles = content?.principles && content.principles.length > 0 ? content.principles : FALLBACK_PRINCIPLES;

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        {/* Mission */}
        <section className="mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pt-20 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">{missionEyebrow}</p>
          <h1 className="font-display mx-auto mt-5 max-w-3xl text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            {missionHeading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-500">{missionBody}</p>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">How we think</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Understand first. Execute flawlessly.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-500">
            The same sequence runs behind every engagement, whether it is a single recruitment reel or a full season of
            league content.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-neutral-200 p-6">
                <span className="font-display text-sm text-neutral-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-4 text-lg font-medium tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section id="founder" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 rounded-2xl bg-neutral-50 p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-200">
              {founderPhoto ? (
                <img src={founderPhoto} alt={`${founderName} portrait`} className="h-full w-full object-cover" />
              ) : (
                <div
                  className="grid h-full w-full place-items-center bg-ink"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 25%, rgba(255,105,0,.28), transparent 60%)" }}
                >
                  <span className="font-display text-6xl font-light text-white/25">V</span>
                </div>
              )}
            </div>
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">The founder</p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-[-0.02em]">
                {founderName}, {founderRole}
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-600">{founderBio}</p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">Our standard</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            What we hold ourselves to on every project.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => {
              const Icon = ICONS[p.icon] || Sparkle;
              return (
                <div key={p.title} className="rounded-2xl border border-neutral-200 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-medium tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-500">{p.copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              Let&apos;s talk about your media.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
              Tell us about your organization, project, event or season. We&apos;ll take a look and work out whether Veloc
              is the right fit.
            </p>
            <BookCallButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white">
              Book a discovery call <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </BookCallButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
