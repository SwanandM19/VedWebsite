import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Gauge, Handshake, ShieldCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { PLACEHOLDER_IMAGES } from "../components/placeholders";

export const metadata: Metadata = {
  title: "About — NIVO",
  description: "Our mission, how we operate, the founder behind NIVO, and the principles we shoot by.",
};

const PROCESS_STEPS = [
  { n: "01", title: "Brief & scope", copy: "A short call to pin down the story, the deadline and what success looks like." },
  { n: "02", title: "Plan the shoot", copy: "Locations, kit and a shot list built around the NIVO one-bag workflow." },
  { n: "03", title: "Shoot", copy: "Lean crews, fast setups, and coverage built for the edit — not the other way around." },
  { n: "04", title: "Edit & deliver", copy: "Cuts turned around in days, not weeks, with revisions built into the timeline." },
];

const PRINCIPLES = [
  { icon: Compass, title: "Story first", copy: "Every shot earns its place by serving the story, not the gear list." },
  { icon: Gauge, title: "Move fast", copy: "Small crews and light kits mean faster setups and faster turnarounds." },
  { icon: Handshake, title: "Plain communication", copy: "One point of contact, clear timelines, no surprise invoices." },
  { icon: ShieldCheck, title: "Own the outcome", copy: "We don't hand off a drive of footage — we deliver a finished result." },
];

export default function AboutPage() {
  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        {/* Mission */}
        <section className="mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pt-20 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">Our Mission</p>
          <h1 className="font-display mx-auto mt-5 max-w-3xl text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Make studio-quality video possible for anyone with one bag and a deadline.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-500">
            NIVO started as a camera company and grew into a production partner — building the kit, the workflow,
            and the crew relationships that let small teams ship work that used to take a full production truck.
          </p>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">How we operate</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            A four-step process built for tight timelines.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="rounded-2xl border border-neutral-200 p-6">
                <span className="font-display text-sm text-neutral-300">{step.n}</span>
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
              <img src={PLACEHOLDER_IMAGES.interview} alt="Founder portrait" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">About the founder</p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-[-0.02em]">Sam Rourke, Founder &amp; Director</h2>
              <p className="mt-5 text-base leading-7 text-neutral-600">
                Sam spent eight years shooting run-and-gun documentary work before building NIVO to solve a problem
                every small crew has: too much gear, not enough time. Today NIVO both makes the kit and runs the
                shoots — proof that the workflow holds up on real deadlines, not just on paper.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">Company principles</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            What we hold ourselves to on every shoot.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-2xl border border-neutral-200 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-display mt-5 text-lg font-medium tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">{p.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              Let&apos;s build something worth shipping.
            </h2>
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
