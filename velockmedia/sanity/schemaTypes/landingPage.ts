import { defineField, defineType, defineArrayMember } from "sanity";

/**
 * Landing page singleton — every editable string and image on the homepage.
 *
 * Section names match the section ids in app/components/LandingPage.tsx so the
 * Studio and the markup stay easy to line up:
 *   hero → #hero, ticker, services → #lineup, audiences → #gallery,
 *   why → #stories, proof → #products, reviews → #reviews, faq → #faq,
 *   manifesto → #manifesto, aperture → #tech, statement → #statement,
 *   footer → #support
 *
 * Every field is optional. Anything left empty falls back to the defaults
 * bundled in app/components/landing-defaults.ts, so the site never renders a
 * blank section while content is still being written.
 */
export default defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Services" },
    { name: "audiences", title: "Who we serve" },
    { name: "why", title: "Why Veloc" },
    { name: "proof", title: "Track record" },
    { name: "reviews", title: "Reviews" },
    { name: "faq", title: "FAQ" },
    { name: "feature", title: "Manifesto & feature" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ---------------------------------------------------------------- HERO
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({ name: "heroBody", title: "Body", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary CTA label", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary CTA label", type: "string", group: "hero" }),
    defineField({
      name: "heroCaption",
      title: "Corner caption",
      type: "string",
      description: 'Small line bottom-left of the hero, e.g. "Recruitment · Events · Leagues & Teams".',
      group: "hero",
    }),
    defineField({
      name: "heroVideo",
      title: "Background video (upload)",
      type: "file",
      description: "MP4. Takes priority over the URL below. Keep it short, muted and well compressed.",
      options: { accept: "video/*" },
      group: "hero",
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Background video (external URL)",
      type: "url",
      description: "Used only when no file is uploaded above.",
      group: "hero",
    }),
    defineField({
      name: "heroPoster",
      title: "Video poster / fallback image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // -------------------------------------------------------------- TICKER
    defineField({
      name: "ticker",
      title: "Scrolling ticker items",
      type: "array",
      of: [{ type: "string" }],
      description: "Short deliverable names that scroll under the hero.",
      group: "hero",
    }),

    // ------------------------------------------------------------ SERVICES
    defineField({ name: "servicesEyebrow", title: "Eyebrow", type: "string", group: "services" }),
    defineField({ name: "servicesHeading", title: "Heading", type: "string", group: "services" }),
    defineField({ name: "servicesIntro", title: "Intro", type: "text", rows: 2, group: "services" }),
    defineField({
      name: "services",
      title: "Service cards",
      type: "array",
      group: "services",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "number", title: "Number badge", type: "string", description: 'e.g. "01"' },
            { name: "kicker", title: "Kicker", type: "string", description: "Who it is for." },
            { name: "meta", title: "Meta label", type: "string", description: 'Right-hand label, e.g. "Service 01".' },
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 3 },
            { name: "ctaLabel", title: "CTA label", type: "string", description: "Opens the booking modal." },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            {
              name: "featured",
              title: "Featured (dark card)",
              type: "boolean",
              description: "Renders this card on the dark ink background.",
              initialValue: false,
            },
          ],
          preview: { select: { title: "title", subtitle: "kicker", media: "image" } },
        }),
      ],
    }),

    // ----------------------------------------------------------- AUDIENCES
    defineField({ name: "audiencesEyebrow", title: "Eyebrow", type: "string", group: "audiences" }),
    defineField({ name: "audiencesHeading", title: "Heading", type: "string", group: "audiences" }),
    defineField({ name: "audiencesIntro", title: "Intro", type: "text", rows: 3, group: "audiences" }),
    defineField({
      name: "audienceChips",
      title: "Chips",
      type: "array",
      of: [{ type: "string" }],
      group: "audiences",
    }),
    defineField({
      name: "audienceSlides",
      title: "Horizontal slides",
      type: "array",
      group: "audiences",
      description: "Scrolls sideways as the section pins. Four reads best.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Image alt text", type: "string" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "caption", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "audiencesOutroHeading", title: "Closing panel heading", type: "text", rows: 2, group: "audiences" }),
    defineField({ name: "audiencesOutroCta", title: "Closing panel CTA label", type: "string", group: "audiences" }),

    // ----------------------------------------------------------------- WHY
    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why" }),
    defineField({ name: "whyHeading", title: "Heading", type: "string", group: "why" }),
    defineField({ name: "whyLinkLabel", title: "Link label", type: "string", group: "why" }),
    defineField({
      name: "whyItems",
      title: "Reasons",
      type: "array",
      group: "why",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "eyebrow", title: "Eyebrow", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 3 },
            { name: "alt", title: "Image alt text", type: "string" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
        }),
      ],
    }),

    // --------------------------------------------------------------- PROOF
    defineField({ name: "proofEyebrow", title: "Eyebrow", type: "string", group: "proof" }),
    defineField({ name: "proofHeading", title: "Heading", type: "string", group: "proof" }),
    defineField({
      name: "proofParagraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (r) => r.max(3),
      group: "proof",
    }),
    defineField({
      name: "proofStats",
      title: "Stats",
      type: "array",
      group: "proof",
      description:
        "ONLY verified figures. Never estimate — leave the bracketed placeholder ([X]+) in place until the real number is known.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "proofPanelTitle", title: "Panel title", type: "string", group: "proof" }),
    defineField({
      name: "proofSteps",
      title: "Process steps",
      type: "array",
      group: "proof",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string", description: 'e.g. "01 · Understand"' },
            { name: "copy", title: "Copy", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "copy" } },
        }),
      ],
      validation: (r) => r.max(6),
    }),

    // ------------------------------------------------------------- REVIEWS
    defineField({ name: "reviewsEyebrow", title: "Eyebrow", type: "string", group: "reviews" }),
    defineField({ name: "reviewsHeading", title: "Heading", type: "string", group: "reviews" }),
    defineField({ name: "reviewsIntro", title: "Intro", type: "text", rows: 2, group: "reviews" }),
    defineField({
      name: "reviewsEmptyNote",
      title: "Placeholder note",
      type: "text",
      rows: 3,
      description:
        "Shown while there are no Testimonial documents. Reviews themselves live under Testimonials — only add verified ones.",
      group: "reviews",
    }),

    // ----------------------------------------------------------------- FAQ
    defineField({ name: "faqEyebrow", title: "Eyebrow", type: "string", group: "faq" }),
    defineField({ name: "faqHeading", title: "Heading", type: "string", group: "faq" }),
    defineField({ name: "faqIntro", title: "Intro", type: "text", rows: 2, group: "faq" }),
    defineField({ name: "faqCtaLabel", title: "CTA label", type: "string", group: "faq" }),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text", rows: 4 },
          ],
          preview: { select: { title: "q" } },
        }),
      ],
    }),

    // ------------------------------------------------- MANIFESTO & FEATURE
    defineField({ name: "manifestoEyebrow", title: "Manifesto eyebrow", type: "string", group: "feature" }),
    defineField({
      name: "manifestoText",
      title: "Manifesto statement",
      type: "text",
      rows: 5,
      description: "The large scroll-revealed paragraph. Keep it to three or four sentences.",
      group: "feature",
    }),

    defineField({
      name: "apertureEyebrow",
      title: "Feature eyebrow",
      type: "string",
      description: "The pinned iris set-piece.",
      group: "feature",
    }),
    defineField({ name: "apertureTitle", title: "Feature title", type: "string", group: "feature" }),
    defineField({ name: "apertureCopy", title: "Feature copy", type: "text", rows: 3, group: "feature" }),
    defineField({ name: "apertureCtaLabel", title: "Feature CTA label", type: "string", group: "feature" }),
    defineField({
      name: "apertureBackdrop",
      title: "Feature backdrop image",
      type: "image",
      description: "Revealed through the iris as it opens.",
      options: { hotspot: true },
      group: "feature",
    }),
    defineField({
      name: "apertureChips",
      title: "Feature chips",
      type: "array",
      of: [{ type: "string" }],
      description: "Four floating labels around the iris.",
      validation: (r) => r.max(4),
      group: "feature",
    }),
    defineField({ name: "apertureOpenEyebrow", title: "Wide-open eyebrow", type: "string", group: "feature" }),
    defineField({
      name: "apertureOpenTitle",
      title: "Wide-open title",
      type: "string",
      description: "Swaps in as the iris finishes opening.",
      group: "feature",
    }),
    defineField({ name: "apertureOpenCopy", title: "Wide-open copy", type: "text", rows: 3, group: "feature" }),

    defineField({ name: "statementKicker", title: "Statement kicker", type: "string", group: "feature" }),
    defineField({
      name: "statementLines",
      title: "Statement lines",
      type: "array",
      of: [{ type: "string" }],
      description: "Three short words, stacked. The last renders in grey.",
      validation: (r) => r.max(3),
      group: "feature",
    }),
    defineField({ name: "statementPrimaryCta", title: "Statement primary CTA", type: "string", group: "feature" }),
    defineField({ name: "statementSecondaryCta", title: "Statement secondary CTA", type: "string", group: "feature" }),

    // -------------------------------------------------------------- FOOTER
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    {
                      name: "href",
                      title: "Link",
                      type: "string",
                      description: 'A path ("/work"), an anchor ("#faq"), or leave empty to open the booking modal.',
                    },
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                },
              ],
            },
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "footerCtaHeading", title: "Footer CTA heading", type: "string", group: "footer" }),
    defineField({ name: "footerCtaBody", title: "Footer CTA body", type: "text", rows: 2, group: "footer" }),
    defineField({
      name: "footerWordmark",
      title: "Outline wordmark",
      type: "string",
      description: "The large outlined word behind the footer.",
      group: "footer",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "footer",
      description: "Only the platforms you actually use. Icons are drawn from the platform choice.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: ["Instagram", "YouTube", "TikTok", "X", "LinkedIn"] },
            },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Landing Page" }) },
});
