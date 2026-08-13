import { PLACEHOLDER_IMAGES, PLACEHOLDER_HERO_VIDEO } from "./placeholders";

/**
 * Resolved landing page content.
 *
 * Everything here is already a plain string or URL — the server component in
 * app/page.tsx merges the Sanity `landingPage` singleton over these defaults
 * and resolves images/video to URLs, so LandingPage stays presentational.
 *
 * CONTENT RULE: no client, statistic, review or outcome may be claimed here
 * unless verified. Unverified values ship as bracketed placeholders ("[X]+")
 * so they are obvious in the UI and easy to grep.
 */
export type LandingContent = {
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    caption: string;
    videoUrl: string | null;
    posterUrl: string | null;
  };
  ticker: string[];
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: {
      number: string;
      kicker: string;
      meta: string;
      title: string;
      copy: string;
      ctaLabel: string;
      imageUrl: string | null;
      featured: boolean;
    }[];
  };
  audiences: {
    eyebrow: string;
    heading: string;
    intro: string;
    chips: string[];
    slides: { caption: string; alt: string; imageUrl: string | null }[];
    outroHeading: string;
    outroCta: string;
  };
  why: {
    eyebrow: string;
    heading: string;
    linkLabel: string;
    items: { eyebrow: string; title: string; body: string; alt: string; imageUrl: string | null }[];
  };
  proof: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    panelTitle: string;
    steps: { title: string; copy: string }[];
  };
  reviews: {
    eyebrow: string;
    heading: string;
    intro: string;
    emptyNote: string;
    items: { quote: string; name: string; role: string; initials: string }[];
  };
  faq: { eyebrow: string; heading: string; intro: string; ctaLabel: string; items: { q: string; a: string }[] };
  manifesto: { eyebrow: string; text: string };
  aperture: {
    eyebrow: string;
    title: string;
    copy: string;
    ctaLabel: string;
    backdropUrl: string | null;
    chips: string[];
    openEyebrow: string;
    openTitle: string;
    openCopy: string;
  };
  statement: { kicker: string; lines: string[]; primaryCta: string; secondaryCta: string };
  footer: {
    columns: { title: string; links: { label: string; href: string | null }[] }[];
    ctaHeading: string;
    ctaBody: string;
    wordmark: string;
    socials: { platform: string; url: string }[];
  };
};

export const LANDING_DEFAULTS: LandingContent = {
  hero: {
    eyebrow: "Sports Media Operations",
    heading: "Media operations for sports organizations.",
    body: "Professional media for events, leagues, teams and recruitment programs — delivered with the reliability and sports understanding your organization deserves.",
    primaryCta: "Explore our services",
    secondaryCta: "See our work",
    caption: "Recruitment · Events · Leagues & Teams",
    // [ADD REAL VELOC SHOWREEL] — placeholder footage from the original build.
    videoUrl: PLACEHOLDER_HERO_VIDEO,
    posterUrl: PLACEHOLDER_IMAGES.hero,
  },

  ticker: [
    "Recruitment media",
    "Event recap films",
    "Match highlights",
    "Athlete showcase reels",
    "Season recaps",
    "Ongoing media partnerships",
  ],

  services: {
    eyebrow: "(03) — What we do",
    heading: "Four ways organizations work with us.",
    intro: "Organized around what your organization needs to accomplish — not around the software we happen to open.",
    items: [
      {
        number: "01",
        kicker: "Colleges · academies · recruiting programs",
        meta: "Service 01",
        title: "Athlete Recruitment Media",
        copy: "Recruitment highlight videos, player showcases, position-specific reels, season highlights and full recruitment media packages — built to communicate an athlete's ability clearly.",
        ctaLabel: "Discuss a recruitment project",
        imageUrl: PLACEHOLDER_IMAGES.studioA,
        featured: false,
      },
      {
        number: "02",
        kicker: "Fitness · combat sports · tournaments",
        meta: "Service 02",
        title: "Event Media Operations",
        copy: "Event recap films, competitor highlights, hype and promotional edits, social clips, sponsor deliverables and awards edits. An event shouldn't end when the final whistle does.",
        ctaLabel: "Discuss an event",
        imageUrl: PLACEHOLDER_IMAGES.studioB,
        featured: false,
      },
      {
        number: "03",
        kicker: "Leagues · clubs · teams · academies",
        meta: "Service 03",
        title: "League & Team Media",
        copy: "Match and game highlights, scoreboard-integrated content, player highlights, weekly match content and season recaps — produced to the same standard in week one and week twenty.",
        ctaLabel: "Discuss your season",
        imageUrl: PLACEHOLDER_IMAGES.kit,
        featured: true,
      },
      {
        number: "04",
        kicker: "The relationship model",
        meta: "Service 04",
        title: "Ongoing Media Partnerships",
        copy: "Monthly and seasonal media support, recurring event coverage and dedicated creative capacity. For organizations that would rather have a media team than hire an editor.",
        ctaLabel: "Discuss a partnership",
        imageUrl: PLACEHOLDER_IMAGES.onLocation,
        featured: false,
      },
    ],
  },

  audiences: {
    eyebrow: "(04) — Who we serve",
    heading: "Built for organizations, not one-off briefs.",
    intro: "Three kinds of organizations bring us the majority of their media. If one of them describes you, we already understand most of the problem.",
    chips: ["Recruitment programs", "Event organizers", "Leagues & teams", "Ongoing partners"],
    slides: [
      { caption: "Recruitment · athlete reels", alt: "Recruitment and athlete showcase media", imageUrl: PLACEHOLDER_IMAGES.goldenHour },
      { caption: "Events · recap films", alt: "Event media operations", imageUrl: PLACEHOLDER_IMAGES.travel },
      { caption: "Leagues · match highlights", alt: "League and team media", imageUrl: PLACEHOLDER_IMAGES.liveSet },
      { caption: "Season-long · ongoing", alt: "Ongoing media partnership", imageUrl: PLACEHOLDER_IMAGES.interview },
    ],
    outroHeading: "Not sure where you fit? Tell us what you're trying to achieve.",
    outroCta: "Start a conversation",
  },

  why: {
    eyebrow: "(06) — Why Veloc",
    heading: "A normal editor waits for a brief. We start with the objective.",
    linkLabel: "See how we work",
    items: [
      {
        eyebrow: "Sports understanding",
        title: "We know what we're watching",
        body: "We don't treat sports footage like generic footage. The context, the pace, the competition and the purpose behind the content all change how it should be cut.",
        alt: "Sports media operations",
        imageUrl: PLACEHOLDER_IMAGES.onLocation,
      },
      {
        eyebrow: "Purpose before production",
        title: "The objective decides the edit",
        body: "Before anything gets cut, we establish what the content has to accomplish. A recruitment reel and an event hype film are not the same job.",
        alt: "Planning the objective before the edit",
        imageUrl: PLACEHOLDER_IMAGES.fieldA,
      },
      {
        eyebrow: "Reliability & systems",
        title: "Repeatable, not heroic",
        body: "Professional execution, clear communication and delivering when we said we would are the product. We build workflows, so quality never depends on one person having a good week.",
        alt: "Repeatable post-production workflow",
        imageUrl: PLACEHOLDER_IMAGES.fieldB,
      },
      {
        eyebrow: "Long-term partnership",
        title: "A media team, not a vendor",
        body: "We want to be the team you rely on across a season and beyond — not the editor you hire for one video and re-brief every time.",
        alt: "Long-term media partnership",
        imageUrl: PLACEHOLDER_IMAGES.fieldC,
      },
    ],
  },

  proof: {
    eyebrow: "(02) — Track record",
    heading: "Experience earned on real sports work.",
    paragraphs: [
      "Veloc grew out of sports video editing work delivered for clients on Upwork — recruitment reels, event footage and match content, reviewed by the people who commissioned it.",
      "That is the foundation the company is built on: repeatable post-production for sports organizations, run as an operation rather than a series of favours.",
    ],
    // [ADD VERIFIED NUMBERS] — never estimate. Bracketed placeholders ship
    // until the real Upwork / project figures are supplied.
    stats: [
      { value: "[X]+", label: "Sports projects delivered" },
      { value: "[X.X]", label: "Upwork rating" },
      { value: "[X]%", label: "Job success score" },
      { value: "[X]+", label: "Sports worked in" },
    ],
    panelTitle: "How an engagement runs",
    steps: [
      { title: "01 · Understand", copy: "The sport, the org, the objective" },
      { title: "02 · Plan", copy: "What gets made, how footage is handled" },
      { title: "03 · Produce", copy: "Our team executes the post" },
      { title: "04 · Review", copy: "Quality control, then your feedback" },
      { title: "05 · Deliver", copy: "Final assets, organized" },
      { title: "06 · Continue", copy: "It becomes a media operation" },
    ],
  },

  reviews: {
    eyebrow: "(07) — Client reviews",
    heading: "What organizations say after working with us.",
    intro: "Verified reviews from the organizations whose media we handle.",
    emptyNote:
      "Verified client reviews go here. We publish reviews as they are approved rather than writing them ourselves — ask us on a call and we will walk you through the feedback we have received so far.",
    // [ADD REAL TESTIMONIALS] — populated from Sanity Testimonial documents.
    // Empty means the section shows the note above instead of a fake quote.
    items: [],
  },

  faq: {
    eyebrow: "(08) — Questions",
    heading: "What organizations usually ask us first.",
    intro: "Who we work with, what we produce, and how an engagement actually runs.",
    ctaLabel: "Ask us directly",
    items: [
      {
        q: "What types of sports organizations do you work with?",
        a: "Three groups: recruitment organizations (colleges, athletic departments, academies, recruiting programs, teams and coaches), event organizers (fitness competitions, boxing and MMA promotions, tournaments and multi-sport events), and leagues, clubs and teams producing content across a season.",
      },
      {
        q: "What kind of media do you produce?",
        a: "Recruitment and athlete showcase videos, event recap films and hype edits, match and player highlights, scoreboard-integrated content, season recaps, social-ready cuts and sponsor deliverables.",
      },
      {
        q: "Can you work with footage we already have?",
        a: "Yes — that is the core of what we do. We are a post-production operation. Send us what your team, your venue or your broadcast partner captured and we take it from there.",
      },
      {
        q: "Can you support us through a full season?",
        a: "Yes. Ongoing media partnerships are a deliberate part of how we work: monthly or seasonal support, recurring event coverage and dedicated creative capacity, so the standard holds from the first fixture to the last.",
      },
      {
        q: "How does the process work?",
        a: "Understand, plan, produce, review, deliver. We start by learning the sport, the organization and the objective, agree what needs to be created, execute the post-production, run it through quality control and your feedback, then deliver organized final assets. For ongoing clients, that loop becomes a repeatable operation.",
      },
      {
        q: "How do we get started?",
        a: "Book a discovery call. Tell us about your organization, your event or your season, and we'll work out together whether Veloc is the right fit.",
      },
    ],
  },

  manifesto: {
    eyebrow: "(01) — The idea",
    text: "Most editing agencies ask what video you want. We ask what you are trying to achieve — then we work out what the content has to do, and execute it. The video is the deliverable. Trust, reliability and understanding the sport are the product.",
  },

  aperture: {
    eyebrow: "(05) — Inside the lens",
    title: "f/1.6 opens the night.",
    copy: "A wide aperture, a stacked sensor and dual-native ISO. Scroll to open the iris and watch the frame gather light.",
    ctaLabel: "Book a discovery call",
    backdropUrl: PLACEHOLDER_IMAGES.aperture,
    chips: ["f/1.6 — f/11", "Phase-detect AF", "3-axis gimbal", "32-bit float"],
    openEyebrow: "(05) — Wide open",
    openTitle: "And the whole frame breathes.",
    openCopy: "Depth falls away, the subject separates, and the background turns to light.",
  },

  statement: {
    kicker: "Understand first. Execute flawlessly.",
    lines: ["UNDER", "STAND", "FIRST"],
    primaryCta: "Start a conversation",
    secondaryCta: "Explore our services",
  },

  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "Athlete recruitment media", href: "#lineup" },
          { label: "Event media operations", href: "#lineup" },
          { label: "League & team media", href: "#lineup" },
          { label: "Ongoing partnerships", href: "#lineup" },
        ],
      },
      {
        title: "Organizations",
        links: [
          { label: "Recruitment programs", href: "#gallery" },
          { label: "Event organizers", href: "#gallery" },
          { label: "Leagues & teams", href: "#gallery" },
          { label: "Why Veloc", href: "#stories" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Our work", href: "/work" },
          { label: "Case studies", href: "/case-studies" },
          { label: "Track record", href: "#products" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Veloc", href: "/about" },
          { label: "How we work", href: "/about#process" },
          { label: "Our standard", href: "/about#principles" },
          { label: "Book a discovery call", href: null },
        ],
      },
    ],
    ctaHeading: "Sports media notes, straight to your inbox.",
    ctaBody: "Occasional notes on recruitment, event and league media. No noise.",
    wordmark: "VELOC",
    // [ADD REAL SOCIAL URLS] — these point nowhere until real profiles exist.
    socials: [
      { platform: "Instagram", url: "#" },
      { platform: "YouTube", url: "#" },
      { platform: "X", url: "#" },
      { platform: "LinkedIn", url: "#" },
    ],
  },
};
