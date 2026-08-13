import { PLACEHOLDER_IMAGES } from "../components/placeholders";

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  image: string;
  /** What did the client need? */
  challenge: string;
  /** What did the content need to accomplish, and how did we approach it? */
  solution: string;
  /** Only verified, measurable outcomes. Leave empty rather than estimating. */
  results: { label: string; value: string }[];
};

/**
 * Local fallback used when Sanity is not configured — real case studies are
 * authored as Case Study documents in the Studio and override everything here.
 *
 * These four entries keep the page structure intact while describing only how
 * Veloc approaches each kind of project. Anything that would be a *claim* —
 * the client's name, the year, the outcome numbers — is left as a bracketed
 * placeholder or empty, because no client, project or result may appear on the
 * site unless it is real and approved. `results: []` hides the outcomes strip
 * on the detail page rather than showing an invented figure.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "recruitment-highlight-package",
    client: "[ADD CLIENT]",
    category: "Athlete Recruitment Media",
    year: "[YEAR]",
    title: "Recruitment reels built for the first ten seconds.",
    summary:
      "A recruitment package where every reel had to show an athlete's ability clearly enough for a coach to judge it fast.",
    image: PLACEHOLDER_IMAGES.goldenHour,
    challenge:
      "[ADD THE REAL BRIEF] — what the organization needed, how many athletes were involved, and what was working against them (footage quality, deadlines, recruiting windows).",
    solution:
      "We start by establishing what the reel has to prove about the athlete, then cut to that: the position-specific reads first, clean identification of the player on every clip, and a length that respects how these are actually watched.",
    results: [],
  },
  {
    slug: "event-recap-package",
    client: "[ADD CLIENT]",
    category: "Event Media Operations",
    year: "[YEAR]",
    title: "One weekend of footage, a season of media.",
    summary:
      "Turning a single event's capture into a recap film, competitor highlights, sponsor deliverables and social cuts.",
    image: PLACEHOLDER_IMAGES.liveSet,
    challenge:
      "[ADD THE REAL BRIEF] — the event, its scale, what the organizer needed the media to do afterwards, and any sponsor obligations.",
    solution:
      "An event shouldn't end when the final whistle does. We plan the deliverable set before the footage lands, then work through it as one pass so the recap, the athlete cuts and the sponsor assets all come out of the same edit.",
    results: [],
  },
  {
    slug: "league-season-content",
    client: "[ADD CLIENT]",
    category: "League & Team Media",
    year: "[YEAR]",
    title: "Week twenty has to look like week one.",
    summary: "Weekly match highlights, player cuts and scoreboard content produced across a full season.",
    image: PLACEHOLDER_IMAGES.travel,
    challenge:
      "[ADD THE REAL BRIEF] — the league or club, the fixture volume, the turnaround expected between match and publish.",
    solution:
      "Season-long work is a systems problem, not an editing problem. We fix the templates, the naming and the review loop up front so the twentieth match is handled exactly like the first.",
    results: [],
  },
  {
    slug: "ongoing-media-partnership",
    client: "[ADD CLIENT]",
    category: "Ongoing Media Partnerships",
    year: "[YEAR]",
    title: "Becoming the media department.",
    summary:
      "A standing engagement where the organization routes its media through us instead of re-briefing an editor each time.",
    image: PLACEHOLDER_IMAGES.interview,
    challenge:
      "[ADD THE REAL BRIEF] — what the organization was doing before, and what kept breaking about it.",
    solution:
      "Dedicated creative capacity on a monthly or seasonal basis, with one point of contact and a workflow that carries context between projects, so nothing has to be explained twice.",
    results: [],
  },
];
