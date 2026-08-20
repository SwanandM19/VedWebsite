import { PLACEHOLDER_IMAGES } from "../components/placeholders";

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  image: string;
  /** YouTube link or direct file. Takes priority over `image` when set. */
  video?: string;
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
 * Each entry now links a real deliverable (`video`), so the copy is written
 * around that specific piece of work. Anything that would be a *claim* we
 * can't verify — the client's name, the year, outcome numbers — stays a
 * bracketed placeholder or empty, because no client or result may appear on
 * the site unless it is real and approved. `results: []` hides the outcomes
 * strip on the detail page rather than showing an invented figure.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "recruitment-highlight-package",
    client: "[ADD CLIENT]",
    category: "Athlete Recruitment Media",
    year: "[YEAR]",
    title: "A soccer recruitment tape built for the first ten seconds.",
    summary:
      "A recruitment tape where every clip had to show the athlete's ability clearly enough for a coach to judge it fast.",
    image: PLACEHOLDER_IMAGES.goldenHour,
    video: "https://youtu.be/Pb99qRZGscU",
    challenge:
      " a soccer recruitment tape, cut from game footage the family already had, that needed to hold a coach's attention in the first few seconds and prove the player's ability without padding.",
    solution:
      "We start by establishing what the tape has to prove about the player, then cut to that: the position-specific reads first, clean identification of the athlete on every clip, and a length that respects how these are actually watched — coaches scanning dozens of tapes, not sitting through a highlight reel.",
    results: [],
  },
  {
    slug: "event-recap-package",
    client: "[ADD CLIENT]",
    category: "Event Media Operations",
    year: "[YEAR]",
    title: "One CrossFit event, a full recap package.",
    summary:
      "Turning a single CrossFit event's capture into a recap edit built for energy and pace, not just a highlight dump.",
    image: PLACEHOLDER_IMAGES.liveSet,
    video: "https://res.cloudinary.com/fhboztke/video/upload/v1786992531/Nick_Crossfit_low_filesize.mp4",
    challenge:
      " a CrossFit event recap that needed to capture the intensity of the competition floor and hold up as something athletes and sponsors would actually want to share.",
    solution:
      "An event shouldn't end when the final rep does. We plan the deliverable before the footage lands, then cut for the energy of the room — pace, reps, crowd reaction — so the recap reads as an experience, not a highlight reel.",
    results: [],
  },
  {
    slug: "league-season-content",
    client: "[ADD CLIENT]",
    category: "League & Team Media",
    year: "[YEAR]",
    title: "A basketball mixtape built to travel.",
    summary: "An athlete mixtape cut to the standard we hold every league and team deliverable to.",
    image: PLACEHOLDER_IMAGES.travel,
    video: "https://youtube.com/shorts/OtIkn0FIfu0?feature=share",
    challenge:
      "the league or club, the fixture volume, and the turnaround expected between game footage and a publishable cut.",
    solution:
      "Season-long work is a systems problem, not an editing problem. We fix the templates, the naming and the review loop up front so a mixtape like this one is handled exactly the same whether it's the first week of the season or the twentieth.",
    results: [],
  },
  {
    slug: "ongoing-media-partnership",
    client: "[ADD CLIENT]",
    category: "Ongoing Media Partnerships",
    year: "[YEAR]",
    title: "A wrestling hype reel from a standing engagement.",
    summary:
      "One deliverable from an ongoing partnership — a wrestling event hype video cut for a client who routes their media through us instead of re-briefing an editor each time.",
    image: PLACEHOLDER_IMAGES.interview,
    video: "https://youtu.be/bSB59r7525A",
    challenge:
      " what the organization was doing before this partnership, and what kept breaking about it.",
    solution:
      "Dedicated creative capacity on a monthly or seasonal basis, with one point of contact and a workflow that carries context between projects — this hype reel is one of the deliverables that came out of that standing relationship.",
    results: [],
  },
];
