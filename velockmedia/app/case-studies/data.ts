import { PLACEHOLDER_IMAGES } from "../components/placeholders";

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  image: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sunridge-outdoors",
    client: "Sunridge Outdoors",
    category: "Brand Film",
    year: "2025",
    title: "Turning a gear launch into a golden-hour story.",
    summary: "A single-day shoot with the NIVO One kit became a 6-part launch campaign for Sunridge's new trail line.",
    image: PLACEHOLDER_IMAGES.goldenHour,
    challenge: "Sunridge needed a launch film that felt native to the outdoors, not staged in a studio, on a two-day production window.",
    solution: "We paired a lightweight NIVO rig with a two-person crew to shoot handheld, run-and-gun footage across three locations in a single day.",
    results: [
      { label: "Launch views", value: "1.2M" },
      { label: "Turnaround", value: "9 days" },
      { label: "Deliverables", value: "6 cuts" },
    ],
  },
  {
    slug: "wanderfolk-travel",
    client: "Wanderfolk",
    category: "Social Content",
    year: "2025",
    title: "A creator-style travel series shot entirely on a phone rig.",
    summary: "Wanderfolk needed 30 days of daily content from a single traveling creator with no crew.",
    image: PLACEHOLDER_IMAGES.travel,
    challenge: "One creator, one bag, thirty days — no room for a full production kit or a second set of hands.",
    solution: "We built a one-person capture workflow around the NIVO One and Mic Mini, with same-day edit templates for consistent daily posting.",
    results: [
      { label: "Episodes", value: "30" },
      { label: "Avg. watch time", value: "78%" },
      { label: "New followers", value: "44K" },
    ],
  },
  {
    slug: "afterglow-sessions",
    client: "Afterglow Sessions",
    category: "Live Music",
    year: "2024",
    title: "Multi-angle live coverage without a full multicam truck.",
    summary: "A recurring concert series needed broadcast-quality coverage on an indie budget.",
    image: PLACEHOLDER_IMAGES.liveSet,
    challenge: "Afterglow's venue had no room for a multicam truck, and the budget didn't allow for a large crew.",
    solution: "We ran a compact three-camera NIVO setup with wireless audio capture, mixed live and finished same-night.",
    results: [
      { label: "Shows covered", value: "18" },
      { label: "Crew size", value: "2" },
      { label: "Same-night delivery", value: "100%" },
    ],
  },
  {
    slug: "northline-podcast",
    client: "Northline Podcast Co.",
    category: "Interview",
    year: "2024",
    title: "Studio-grade interviews recorded on location, every week.",
    summary: "A weekly interview show needed consistent, broadcast-clean audio and video across changing locations.",
    image: PLACEHOLDER_IMAGES.interview,
    challenge: "Guests were interviewed in different offices and homes each week, with no time for a lighting or audio setup.",
    solution: "A standardized NIVO travel kit and a 20-minute setup checklist kept every episode consistent, regardless of location.",
    results: [
      { label: "Episodes shot", value: "52" },
      { label: "Setup time", value: "20 min" },
      { label: "Reshoots", value: "0" },
    ],
  },
];
