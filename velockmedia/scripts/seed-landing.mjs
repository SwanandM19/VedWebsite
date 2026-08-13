// Landing page seed content, kept in its own module because it is by far the
// largest document in the dataset.
//
// It mirrors the fallbacks in app/components/landing-defaults.ts, so seeding
// gives an editor the page exactly as it renders today and they can change one
// field at a time instead of starting from an empty form.
//
// Same content rule as the site: no client, statistic, review or outcome is
// asserted here unless verified. Unverified figures are bracketed ("[X]+").

const IMAGE_SOURCES = {
  hero: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f4987304-fb2f-48cf-a0b2-5974b2bd47b3_1600w.jpg",
  aperture:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0b747a96-4f78-4e4e-8152-d26201955a6b_3840w.png",
  studioA:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0711a0c1-d01e-461b-a3a4-f1c870278629_3840w.png",
  studioB:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee86ccc6-e7a9-4a81-a328-5c5894aa8e48_3840w.png",
  kit: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7b477bfa-78bb-42fe-b3a1-d23ddac27768_3840w.png",
  onLocation:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/78066529-5e01-476f-b330-dfa9695454f7_3840w.png",
  goldenHour:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cdef4873-8fea-4115-8a82-006a32e63f52_3840w.png",
  travel:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8f231664-7b31-4a1f-8e19-f18dd34d436f_3840w.png",
  liveSet:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b739edad-d484-48c1-8cef-883153b95f4e_3840w.png",
  interview:
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0eca95bb-6ae2-4781-8e51-dc99c29cea24_3840w.png",
  fieldA: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1300&q=90",
  fieldB: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1300&q=90",
  fieldC: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1300&q=90",
};

/**
 * Builds the landingPage document.
 *
 * @param {(key: string, url: string) => Promise<object>} uploadImage
 *   Uploads once per key and returns a Sanity image field.
 */
export async function buildLandingPage(uploadImage) {
  const keys = Object.keys(IMAGE_SOURCES);
  const assets = {};
  for (const key of keys) {
    assets[key] = await uploadImage(key, IMAGE_SOURCES[key]);
  }

  return {
    _id: "landingPage",
    _type: "landingPage",

    // ---------------------------------------------------------------- hero
    heroEyebrow: "Sports Media Operations",
    heroHeading: "Media operations for sports organizations.",
    heroBody:
      "Professional media for events, leagues, teams and recruitment programs — delivered with the reliability and sports understanding your organization deserves.",
    heroPrimaryCta: "Explore our services",
    heroSecondaryCta: "See our work",
    heroCaption: "Recruitment · Events · Leagues & Teams",
    heroPoster: assets.hero,
    // [ADD REAL VELOC SHOWREEL] — upload an MP4 into "Background video".

    ticker: [
      "Recruitment media",
      "Event recap films",
      "Match highlights",
      "Athlete showcase reels",
      "Season recaps",
      "Ongoing media partnerships",
    ],

    // ------------------------------------------------------------ services
    servicesEyebrow: "(03) — What we do",
    servicesHeading: "Four ways organizations work with us.",
    servicesIntro:
      "Organized around what your organization needs to accomplish — not around the software we happen to open.",
    services: [
      {
        _key: "svc1",
        number: "01",
        kicker: "Colleges · academies · recruiting programs",
        meta: "Service 01",
        title: "Athlete Recruitment Media",
        copy: "Recruitment highlight videos, player showcases, position-specific reels, season highlights and full recruitment media packages — built to communicate an athlete's ability clearly.",
        ctaLabel: "Discuss a recruitment project",
        image: assets.studioA,
        featured: false,
      },
      {
        _key: "svc2",
        number: "02",
        kicker: "Fitness · combat sports · tournaments",
        meta: "Service 02",
        title: "Event Media Operations",
        copy: "Event recap films, competitor highlights, hype and promotional edits, social clips, sponsor deliverables and awards edits. An event shouldn't end when the final whistle does.",
        ctaLabel: "Discuss an event",
        image: assets.studioB,
        featured: false,
      },
      {
        _key: "svc3",
        number: "03",
        kicker: "Leagues · clubs · teams · academies",
        meta: "Service 03",
        title: "League & Team Media",
        copy: "Match and game highlights, scoreboard-integrated content, player highlights, weekly match content and season recaps — produced to the same standard in week one and week twenty.",
        ctaLabel: "Discuss your season",
        image: assets.kit,
        featured: true,
      },
      {
        _key: "svc4",
        number: "04",
        kicker: "The relationship model",
        meta: "Service 04",
        title: "Ongoing Media Partnerships",
        copy: "Monthly and seasonal media support, recurring event coverage and dedicated creative capacity. For organizations that would rather have a media team than hire an editor.",
        ctaLabel: "Discuss a partnership",
        image: assets.onLocation,
        featured: false,
      },
    ],

    // ----------------------------------------------------------- audiences
    audiencesEyebrow: "(04) — Who we serve",
    audiencesHeading: "Built for organizations, not one-off briefs.",
    audiencesIntro:
      "Three kinds of organizations bring us the majority of their media. If one of them describes you, we already understand most of the problem.",
    audienceChips: ["Recruitment programs", "Event organizers", "Leagues & teams", "Ongoing partners"],
    audienceSlides: [
      { _key: "sl1", caption: "Recruitment · athlete reels", alt: "Recruitment and athlete showcase media", image: assets.goldenHour },
      { _key: "sl2", caption: "Events · recap films", alt: "Event media operations", image: assets.travel },
      { _key: "sl3", caption: "Leagues · match highlights", alt: "League and team media", image: assets.liveSet },
      { _key: "sl4", caption: "Season-long · ongoing", alt: "Ongoing media partnership", image: assets.interview },
    ],
    audiencesOutroHeading: "Not sure where you fit? Tell us what you're trying to achieve.",
    audiencesOutroCta: "Start a conversation",

    // ----------------------------------------------------------------- why
    whyEyebrow: "(06) — Why Veloc",
    whyHeading: "A normal editor waits for a brief. We start with the objective.",
    whyLinkLabel: "See how we work",
    whyItems: [
      {
        _key: "why1",
        eyebrow: "Sports understanding",
        title: "We know what we're watching",
        body: "We don't treat sports footage like generic footage. The context, the pace, the competition and the purpose behind the content all change how it should be cut.",
        alt: "Sports media operations",
        image: assets.onLocation,
      },
      {
        _key: "why2",
        eyebrow: "Purpose before production",
        title: "The objective decides the edit",
        body: "Before anything gets cut, we establish what the content has to accomplish. A recruitment reel and an event hype film are not the same job.",
        alt: "Planning the objective before the edit",
        image: assets.fieldA,
      },
      {
        _key: "why3",
        eyebrow: "Reliability & systems",
        title: "Repeatable, not heroic",
        body: "Professional execution, clear communication and delivering when we said we would are the product. We build workflows, so quality never depends on one person having a good week.",
        alt: "Repeatable post-production workflow",
        image: assets.fieldB,
      },
      {
        _key: "why4",
        eyebrow: "Long-term partnership",
        title: "A media team, not a vendor",
        body: "We want to be the team you rely on across a season and beyond — not the editor you hire for one video and re-brief every time.",
        alt: "Long-term media partnership",
        image: assets.fieldC,
      },
    ],

    // --------------------------------------------------------------- proof
    proofEyebrow: "(02) — Track record",
    proofHeading: "Experience earned on real sports work.",
    proofParagraphs: [
      "Veloc grew out of sports video editing work delivered for clients on Upwork — recruitment reels, event footage and match content, reviewed by the people who commissioned it.",
      "That is the foundation the company is built on: repeatable post-production for sports organizations, run as an operation rather than a series of favours.",
    ],
    // Replace every bracketed value with a verified figure before launch.
    proofStats: [
      { _key: "st1", value: "[X]+", label: "Sports projects delivered" },
      { _key: "st2", value: "[X.X]", label: "Upwork rating" },
      { _key: "st3", value: "[X]%", label: "Job success score" },
      { _key: "st4", value: "[X]+", label: "Sports worked in" },
    ],
    proofPanelTitle: "How an engagement runs",
    proofSteps: [
      { _key: "ps1", title: "01 · Understand", copy: "The sport, the org, the objective" },
      { _key: "ps2", title: "02 · Plan", copy: "What gets made, how footage is handled" },
      { _key: "ps3", title: "03 · Produce", copy: "Our team executes the post" },
      { _key: "ps4", title: "04 · Review", copy: "Quality control, then your feedback" },
      { _key: "ps5", title: "05 · Deliver", copy: "Final assets, organized" },
      { _key: "ps6", title: "06 · Continue", copy: "It becomes a media operation" },
    ],

    // ------------------------------------------------------------- reviews
    reviewsEyebrow: "(07) — Client reviews",
    reviewsHeading: "What organizations say after working with us.",
    reviewsIntro: "Verified reviews from the organizations whose media we handle.",
    reviewsEmptyNote:
      "Verified client reviews go here. We publish reviews as they are approved rather than writing them ourselves — ask us on a call and we will walk you through the feedback we have received so far.",

    // ----------------------------------------------------------------- faq
    faqEyebrow: "(08) — Questions",
    faqHeading: "What organizations usually ask us first.",
    faqIntro: "Who we work with, what we produce, and how an engagement actually runs.",
    faqCtaLabel: "Ask us directly",
    faqs: [
      {
        _key: "faq1",
        q: "What types of sports organizations do you work with?",
        a: "Three groups: recruitment organizations (colleges, athletic departments, academies, recruiting programs, teams and coaches), event organizers (fitness competitions, boxing and MMA promotions, tournaments and multi-sport events), and leagues, clubs and teams producing content across a season.",
      },
      {
        _key: "faq2",
        q: "What kind of media do you produce?",
        a: "Recruitment and athlete showcase videos, event recap films and hype edits, match and player highlights, scoreboard-integrated content, season recaps, social-ready cuts and sponsor deliverables.",
      },
      {
        _key: "faq3",
        q: "Can you work with footage we already have?",
        a: "Yes — that is the core of what we do. We are a post-production operation. Send us what your team, your venue or your broadcast partner captured and we take it from there.",
      },
      {
        _key: "faq4",
        q: "Can you support us through a full season?",
        a: "Yes. Ongoing media partnerships are a deliberate part of how we work: monthly or seasonal support, recurring event coverage and dedicated creative capacity, so the standard holds from the first fixture to the last.",
      },
      {
        _key: "faq5",
        q: "How does the process work?",
        a: "Understand, plan, produce, review, deliver. We start by learning the sport, the organization and the objective, agree what needs to be created, execute the post-production, run it through quality control and your feedback, then deliver organized final assets. For ongoing clients, that loop becomes a repeatable operation.",
      },
      {
        _key: "faq6",
        q: "How do we get started?",
        a: "Book a discovery call. Tell us about your organization, your event or your season, and we'll work out together whether Veloc is the right fit.",
      },
    ],

    // ------------------------------------------------- manifesto & feature
    manifestoEyebrow: "(01) — The idea",
    manifestoText:
      "Most editing agencies ask what video you want. We ask what you are trying to achieve — then we work out what the content has to do, and execute it. The video is the deliverable. Trust, reliability and understanding the sport are the product.",

    apertureEyebrow: "(05) — Inside the lens",
    apertureTitle: "f/1.6 opens the night.",
    apertureCopy:
      "A wide aperture, a stacked sensor and dual-native ISO. Scroll to open the iris and watch the frame gather light.",
    apertureCtaLabel: "Book a discovery call",
    apertureBackdrop: assets.aperture,
    apertureChips: ["f/1.6 — f/11", "Phase-detect AF", "3-axis gimbal", "32-bit float"],
    apertureOpenEyebrow: "(05) — Wide open",
    apertureOpenTitle: "And the whole frame breathes.",
    apertureOpenCopy: "Depth falls away, the subject separates, and the background turns to light.",

    statementKicker: "Understand first. Execute flawlessly.",
    statementLines: ["UNDER", "STAND", "FIRST"],
    statementPrimaryCta: "Start a conversation",
    statementSecondaryCta: "Explore our services",

    // -------------------------------------------------------------- footer
    footerColumns: [
      {
        _key: "fc1",
        title: "Services",
        links: [
          { _key: "a1", label: "Athlete recruitment media", href: "#lineup" },
          { _key: "a2", label: "Event media operations", href: "#lineup" },
          { _key: "a3", label: "League & team media", href: "#lineup" },
          { _key: "a4", label: "Ongoing partnerships", href: "#lineup" },
        ],
      },
      {
        _key: "fc2",
        title: "Organizations",
        links: [
          { _key: "b1", label: "Recruitment programs", href: "#gallery" },
          { _key: "b2", label: "Event organizers", href: "#gallery" },
          { _key: "b3", label: "Leagues & teams", href: "#gallery" },
          { _key: "b4", label: "Why Veloc", href: "#stories" },
        ],
      },
      {
        _key: "fc3",
        title: "Explore",
        links: [
          { _key: "c1", label: "Our work", href: "/work" },
          { _key: "c2", label: "Case studies", href: "/case-studies" },
          { _key: "c3", label: "Track record", href: "#products" },
          { _key: "c4", label: "FAQ", href: "#faq" },
        ],
      },
      {
        _key: "fc4",
        title: "Company",
        links: [
          { _key: "d1", label: "About Veloc", href: "/about" },
          { _key: "d2", label: "How we work", href: "/about#process" },
          { _key: "d3", label: "Our standard", href: "/about#principles" },
          // An empty href opens the booking modal.
          { _key: "d4", label: "Book a discovery call", href: "" },
        ],
      },
    ],
    footerCtaHeading: "Sports media notes, straight to your inbox.",
    footerCtaBody: "Occasional notes on recruitment, event and league media. No noise.",
    footerWordmark: "VELOC",
    // [ADD REAL SOCIAL URLS] — these point nowhere until real profiles exist.
    socialLinks: [
      { _key: "so1", platform: "Instagram", url: "#" },
      { _key: "so2", platform: "YouTube", url: "#" },
      { _key: "so3", platform: "X", url: "#" },
      { _key: "so4", platform: "LinkedIn", url: "#" },
    ],
  };
}
