import LandingPage from "./components/LandingPage";
import { LANDING_DEFAULTS, type LandingContent } from "./components/landing-defaults";
import { sanityFetch } from "../sanity/lib/client";
import { imageUrl } from "../sanity/lib/image";
import { landingPageQuery, testimonialsQuery } from "../sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Landing page shell.
 *
 * The page itself is a client component (GSAP + Lenis drive the scroll work),
 * so all Sanity reading happens here and the resolved content is handed down
 * as a plain object. Images and the hero video are turned into URLs at this
 * layer, which keeps LandingPage free of any CMS knowledge.
 *
 * Every field falls back to LANDING_DEFAULTS, so a half-filled (or entirely
 * missing) Sanity document still renders a complete page.
 */

type SanityLanding = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroBody?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  heroCaption?: string;
  heroVideoAssetUrl?: string;
  heroVideoUrl?: string;
  heroPoster?: SanityImageSource;
  ticker?: string[];

  servicesEyebrow?: string;
  servicesHeading?: string;
  servicesIntro?: string;
  services?: {
    number?: string;
    kicker?: string;
    meta?: string;
    title?: string;
    copy?: string;
    ctaLabel?: string;
    image?: SanityImageSource;
    featured?: boolean;
  }[];

  audiencesEyebrow?: string;
  audiencesHeading?: string;
  audiencesIntro?: string;
  audienceChips?: string[];
  audienceSlides?: { caption?: string; alt?: string; image?: SanityImageSource }[];
  audiencesOutroHeading?: string;
  audiencesOutroCta?: string;

  whyEyebrow?: string;
  whyHeading?: string;
  whyLinkLabel?: string;
  whyItems?: { eyebrow?: string; title?: string; body?: string; alt?: string; image?: SanityImageSource }[];

  proofEyebrow?: string;
  proofHeading?: string;
  proofParagraphs?: string[];
  proofStats?: { value?: string; label?: string }[];
  proofPanelTitle?: string;
  proofSteps?: { title?: string; copy?: string }[];

  reviewsEyebrow?: string;
  reviewsHeading?: string;
  reviewsIntro?: string;
  reviewsEmptyNote?: string;

  faqEyebrow?: string;
  faqHeading?: string;
  faqIntro?: string;
  faqCtaLabel?: string;
  faqs?: { q?: string; a?: string }[];

  manifestoEyebrow?: string;
  manifestoText?: string;

  apertureEyebrow?: string;
  apertureTitle?: string;
  apertureCopy?: string;
  apertureCtaLabel?: string;
  apertureBackdrop?: SanityImageSource;
  apertureChips?: string[];
  apertureOpenEyebrow?: string;
  apertureOpenTitle?: string;
  apertureOpenCopy?: string;

  statementKicker?: string;
  statementLines?: string[];
  statementPrimaryCta?: string;
  statementSecondaryCta?: string;

  footerColumns?: { title?: string; links?: { label?: string; href?: string }[] }[];
  footerCtaHeading?: string;
  footerCtaBody?: string;
  footerWordmark?: string;
  socialLinks?: { platform?: string; url?: string }[];
};

type SanityTestimonial = { quote?: string; name?: string; role?: string };

/** Falls back whenever the CMS value is missing, null or an empty string. */
function pick(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** Falls back whenever the CMS array is missing or empty. */
function pickList<T>(value: T[] | undefined, fallback: T[]): T[] {
  return value && value.length > 0 ? value : fallback;
}

/** Initials for a testimonial avatar, e.g. "Dana Okoye" -> "DO". */
function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0] ?? "").join("").toUpperCase() || "—";
}

function resolve(cms: SanityLanding | null, testimonials: SanityTestimonial[] | null): LandingContent {
  const d = LANDING_DEFAULTS;
  if (!cms) {
    return {
      ...d,
      reviews: { ...d.reviews, items: mapTestimonials(testimonials, d.reviews.items) },
    };
  }

  return {
    hero: {
      eyebrow: pick(cms.heroEyebrow, d.hero.eyebrow),
      heading: pick(cms.heroHeading, d.hero.heading),
      body: pick(cms.heroBody, d.hero.body),
      primaryCta: pick(cms.heroPrimaryCta, d.hero.primaryCta),
      secondaryCta: pick(cms.heroSecondaryCta, d.hero.secondaryCta),
      caption: pick(cms.heroCaption, d.hero.caption),
      // Uploaded file wins over an external URL; both fall back to the default.
      videoUrl: cms.heroVideoAssetUrl || cms.heroVideoUrl || d.hero.videoUrl,
      posterUrl: imageUrl(cms.heroPoster, 1600) || d.hero.posterUrl,
    },

    ticker: pickList(cms.ticker, d.ticker),

    services: {
      eyebrow: pick(cms.servicesEyebrow, d.services.eyebrow),
      heading: pick(cms.servicesHeading, d.services.heading),
      intro: pick(cms.servicesIntro, d.services.intro),
      items:
        cms.services && cms.services.length > 0
          ? cms.services.map((item, i) => ({
              number: pick(item.number, String(i + 1).padStart(2, "0")),
              kicker: item.kicker || "",
              meta: item.meta || "",
              title: item.title || "",
              copy: item.copy || "",
              ctaLabel: pick(item.ctaLabel, "Discuss your project"),
              imageUrl: imageUrl(item.image, 1800) || null,
              featured: Boolean(item.featured),
            }))
          : d.services.items,
    },

    audiences: {
      eyebrow: pick(cms.audiencesEyebrow, d.audiences.eyebrow),
      heading: pick(cms.audiencesHeading, d.audiences.heading),
      intro: pick(cms.audiencesIntro, d.audiences.intro),
      chips: pickList(cms.audienceChips, d.audiences.chips),
      slides:
        cms.audienceSlides && cms.audienceSlides.length > 0
          ? cms.audienceSlides.map((slide) => ({
              caption: slide.caption || "",
              alt: slide.alt || slide.caption || "",
              imageUrl: imageUrl(slide.image, 1800) || null,
            }))
          : d.audiences.slides,
      outroHeading: pick(cms.audiencesOutroHeading, d.audiences.outroHeading),
      outroCta: pick(cms.audiencesOutroCta, d.audiences.outroCta),
    },

    why: {
      eyebrow: pick(cms.whyEyebrow, d.why.eyebrow),
      heading: pick(cms.whyHeading, d.why.heading),
      linkLabel: pick(cms.whyLinkLabel, d.why.linkLabel),
      items:
        cms.whyItems && cms.whyItems.length > 0
          ? cms.whyItems.map((item) => ({
              eyebrow: item.eyebrow || "",
              title: item.title || "",
              body: item.body || "",
              alt: item.alt || item.title || "",
              imageUrl: imageUrl(item.image, 1300) || null,
            }))
          : d.why.items,
    },

    proof: {
      eyebrow: pick(cms.proofEyebrow, d.proof.eyebrow),
      heading: pick(cms.proofHeading, d.proof.heading),
      paragraphs: pickList(cms.proofParagraphs, d.proof.paragraphs),
      stats:
        cms.proofStats && cms.proofStats.length > 0
          ? cms.proofStats.map((stat) => ({ value: stat.value || "", label: stat.label || "" }))
          : d.proof.stats,
      panelTitle: pick(cms.proofPanelTitle, d.proof.panelTitle),
      steps:
        cms.proofSteps && cms.proofSteps.length > 0
          ? cms.proofSteps.map((step) => ({ title: step.title || "", copy: step.copy || "" }))
          : d.proof.steps,
    },

    reviews: {
      eyebrow: pick(cms.reviewsEyebrow, d.reviews.eyebrow),
      heading: pick(cms.reviewsHeading, d.reviews.heading),
      intro: pick(cms.reviewsIntro, d.reviews.intro),
      emptyNote: pick(cms.reviewsEmptyNote, d.reviews.emptyNote),
      items: mapTestimonials(testimonials, d.reviews.items),
    },

    faq: {
      eyebrow: pick(cms.faqEyebrow, d.faq.eyebrow),
      heading: pick(cms.faqHeading, d.faq.heading),
      intro: pick(cms.faqIntro, d.faq.intro),
      ctaLabel: pick(cms.faqCtaLabel, d.faq.ctaLabel),
      items:
        cms.faqs && cms.faqs.length > 0
          ? cms.faqs.filter((f) => f.q).map((f) => ({ q: f.q!, a: f.a || "" }))
          : d.faq.items,
    },

    manifesto: {
      eyebrow: pick(cms.manifestoEyebrow, d.manifesto.eyebrow),
      text: pick(cms.manifestoText, d.manifesto.text),
    },

    aperture: {
      eyebrow: pick(cms.apertureEyebrow, d.aperture.eyebrow),
      title: pick(cms.apertureTitle, d.aperture.title),
      copy: pick(cms.apertureCopy, d.aperture.copy),
      ctaLabel: pick(cms.apertureCtaLabel, d.aperture.ctaLabel),
      backdropUrl: imageUrl(cms.apertureBackdrop, 3840) || d.aperture.backdropUrl,
      chips: pickList(cms.apertureChips, d.aperture.chips),
      openEyebrow: pick(cms.apertureOpenEyebrow, d.aperture.openEyebrow),
      openTitle: pick(cms.apertureOpenTitle, d.aperture.openTitle),
      openCopy: pick(cms.apertureOpenCopy, d.aperture.openCopy),
    },

    statement: {
      kicker: pick(cms.statementKicker, d.statement.kicker),
      lines: pickList(cms.statementLines, d.statement.lines),
      primaryCta: pick(cms.statementPrimaryCta, d.statement.primaryCta),
      secondaryCta: pick(cms.statementSecondaryCta, d.statement.secondaryCta),
    },

    footer: {
      columns:
        cms.footerColumns && cms.footerColumns.length > 0
          ? cms.footerColumns.map((col) => ({
              title: col.title || "",
              // An empty href means "open the booking modal".
              links: (col.links || []).map((l) => ({ label: l.label || "", href: l.href?.trim() || null })),
            }))
          : d.footer.columns,
      ctaHeading: pick(cms.footerCtaHeading, d.footer.ctaHeading),
      ctaBody: pick(cms.footerCtaBody, d.footer.ctaBody),
      wordmark: pick(cms.footerWordmark, d.footer.wordmark),
      socials:
        cms.socialLinks && cms.socialLinks.length > 0
          ? cms.socialLinks
              .filter((sl) => sl.platform)
              .map((sl) => ({ platform: sl.platform!, url: sl.url || "#" }))
          : d.footer.socials,
    },
  };
}

/**
 * Testimonials come from the shared Testimonial documents rather than the
 * landing page singleton, so the same verified reviews can be reused across
 * pages. No local fallback exists on purpose — an empty list renders the
 * placeholder note instead of an invented quote.
 */
function mapTestimonials(list: SanityTestimonial[] | null, fallback: LandingContent["reviews"]["items"]) {
  if (!list || list.length === 0) return fallback;
  return list
    .filter((t) => t.quote && t.name)
    .map((t) => ({
      quote: t.quote!,
      name: t.name!,
      role: t.role || "",
      initials: initialsFor(t.name!),
    }));
}

export default async function Page() {
  const [cms, testimonials] = await Promise.all([
    sanityFetch<SanityLanding>(landingPageQuery),
    sanityFetch<SanityTestimonial[]>(testimonialsQuery),
  ]);

  return <LandingPage content={resolve(cms, testimonials)} />;
}
