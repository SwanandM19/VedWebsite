// One-off script that seeds the Sanity dataset with the same dummy content
// the site already falls back to in code, so the Studio has real, editable
// documents to start from instead of empty singletons.
//
// Usage:
//   node --env-file=.env.local scripts/seed-sanity.mjs
//
// Requires SANITY_API_WRITE_TOKEN (Editor permission) in .env.local — see
// .env.local.example. This script is safe to re-run: it upserts by a fixed
// _id per document, so it won't create duplicates.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local (create an Editor token at sanity.io/manage)");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const IMAGES = {
  goldenHour: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cdef4873-8fea-4115-8a82-006a32e63f52_3840w.png",
  travel: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8f231664-7b31-4a1f-8e19-f18dd34d436f_3840w.png",
  liveSet: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b739edad-d484-48c1-8cef-883153b95f4e_3840w.png",
  interview: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0eca95bb-6ae2-4781-8e51-dc99c29cea24_3840w.png",
};

const uploadedAssets = new Map();

async function uploadImage(key, url) {
  if (uploadedAssets.has(key)) return uploadedAssets.get(key);
  console.log(`Uploading image: ${key}...`);
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${key}.png` });
  uploadedAssets.set(key, asset);
  return asset;
}

function imageField(asset) {
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function upsert(doc) {
  console.log(`Upserting ${doc._type}: ${doc._id}`);
  await client.createOrReplace(doc);
}

async function main() {
  const [goldenHour, travel, liveSet, interview] = await Promise.all([
    uploadImage("golden-hour", IMAGES.goldenHour),
    uploadImage("travel", IMAGES.travel),
    uploadImage("live-set", IMAGES.liveSet),
    uploadImage("interview", IMAGES.interview),
  ]);

  const categories = [
    { _id: "workCategory.brand-film", name: "Brand Film", blurb: "Launch films, product stories and campaign hero videos.", count: "12 projects", image: goldenHour },
    { _id: "workCategory.social-content", name: "Social Content", blurb: "Creator-style daily content, shot fast and edited faster.", count: "20 projects", image: travel },
    { _id: "workCategory.live-coverage", name: "Live Coverage", blurb: "Multi-angle event and performance capture, same-night turnaround.", count: "18 projects", image: liveSet },
    { _id: "workCategory.interview-series", name: "Interview Series", blurb: "Recurring, studio-consistent interviews shot on location.", count: "9 projects", image: interview },
  ];

  for (const [i, cat] of categories.entries()) {
    await upsert({
      _id: cat._id,
      _type: "workCategory",
      name: cat.name,
      slug: { _type: "slug", current: cat._id.split(".")[1] },
      blurb: cat.blurb,
      count: cat.count,
      image: imageField(cat.image),
      order: i,
    });
  }

  const caseStudies = [
    {
      _id: "caseStudy.sunridge-outdoors",
      title: "Turning a gear launch into a golden-hour story.",
      slug: "sunridge-outdoors",
      client: "Sunridge Outdoors",
      category: "workCategory.brand-film",
      year: "2025",
      summary: "A single-day shoot with the NIVO One kit became a 6-part launch campaign for Sunridge's new trail line.",
      image: goldenHour,
      challenge: "Sunridge needed a launch film that felt native to the outdoors, not staged in a studio, on a two-day production window.",
      solution: "We paired a lightweight NIVO rig with a two-person crew to shoot handheld, run-and-gun footage across three locations in a single day.",
      results: [{ label: "Launch views", value: "1.2M" }, { label: "Turnaround", value: "9 days" }, { label: "Deliverables", value: "6 cuts" }],
    },
    {
      _id: "caseStudy.wanderfolk-travel",
      title: "A creator-style travel series shot entirely on a phone rig.",
      slug: "wanderfolk-travel",
      client: "Wanderfolk",
      category: "workCategory.social-content",
      year: "2025",
      summary: "Wanderfolk needed 30 days of daily content from a single traveling creator with no crew.",
      image: travel,
      challenge: "One creator, one bag, thirty days — no room for a full production kit or a second set of hands.",
      solution: "We built a one-person capture workflow around the NIVO One and Mic Mini, with same-day edit templates for consistent daily posting.",
      results: [{ label: "Episodes", value: "30" }, { label: "Avg. watch time", value: "78%" }, { label: "New followers", value: "44K" }],
    },
    {
      _id: "caseStudy.afterglow-sessions",
      title: "Multi-angle live coverage without a full multicam truck.",
      slug: "afterglow-sessions",
      client: "Afterglow Sessions",
      category: "workCategory.live-coverage",
      year: "2024",
      summary: "A recurring concert series needed broadcast-quality coverage on an indie budget.",
      image: liveSet,
      challenge: "Afterglow's venue had no room for a multicam truck, and the budget didn't allow for a large crew.",
      solution: "We ran a compact three-camera NIVO setup with wireless audio capture, mixed live and finished same-night.",
      results: [{ label: "Shows covered", value: "18" }, { label: "Crew size", value: "2" }, { label: "Same-night delivery", value: "100%" }],
    },
    {
      _id: "caseStudy.northline-podcast",
      title: "Studio-grade interviews recorded on location, every week.",
      slug: "northline-podcast",
      client: "Northline Podcast Co.",
      category: "workCategory.interview-series",
      year: "2024",
      summary: "A weekly interview show needed consistent, broadcast-clean audio and video across changing locations.",
      image: interview,
      challenge: "Guests were interviewed in different offices and homes each week, with no time for a lighting or audio setup.",
      solution: "A standardized NIVO travel kit and a 20-minute setup checklist kept every episode consistent, regardless of location.",
      results: [{ label: "Episodes shot", value: "52" }, { label: "Setup time", value: "20 min" }, { label: "Reshoots", value: "0" }],
    },
  ];

  for (const [i, cs] of caseStudies.entries()) {
    await upsert({
      _id: cs._id,
      _type: "caseStudy",
      title: cs.title,
      slug: { _type: "slug", current: cs.slug },
      client: cs.client,
      category: { _type: "reference", _ref: cs.category },
      year: cs.year,
      summary: cs.summary,
      image: imageField(cs.image),
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results,
      order: i,
    });
  }

  const testimonials = [
    { _id: "testimonial.priya-anand", quote: "They shipped six launch cuts in nine days without a single reshoot. The whole thing looked native to our brand.", name: "Priya Anand", role: "Marketing Lead, Sunridge Outdoors" },
    { _id: "testimonial.theo-marchetti", quote: "One creator, one bag, thirty straight days of content — and it never felt rushed on camera.", name: "Theo Marchetti", role: "Founder, Wanderfolk" },
    { _id: "testimonial.jess-okafor", quote: "We went from a multicam truck budget to a two-person crew with better footage. Every show ships the same night.", name: "Jess Okafor", role: "Producer, Afterglow Sessions" },
  ];

  for (const [i, t] of testimonials.entries()) {
    await upsert({ _id: t._id, _type: "testimonial", quote: t.quote, name: t.name, role: t.role, order: i });
  }

  await upsert({
    _id: "caseStudiesPage",
    _type: "caseStudiesPage",
    eyebrow: "Case Studies",
    heading: "Real shoots, real deadlines, real results.",
    intro: "A selection of projects delivered on the NIVO system — from single-day brand films to weekly production schedules with zero crew.",
    metrics: [
      { label: "Projects delivered", value: "150+" },
      { label: "Clients served", value: "40+" },
      { label: "Countries shot in", value: "12" },
      { label: "Upwork rating", value: "4.9" },
    ],
  });

  await upsert({
    _id: "aboutPage",
    _type: "aboutPage",
    missionEyebrow: "Our Mission",
    missionHeading: "Make studio-quality video possible for anyone with one bag and a deadline.",
    missionBody: "NIVO started as a camera company and grew into a production partner — building the kit, the workflow, and the crew relationships that let small teams ship work that used to take a full production truck.",
    processSteps: [
      { title: "Brief & scope", copy: "A short call to pin down the story, the deadline and what success looks like." },
      { title: "Plan the shoot", copy: "Locations, kit and a shot list built around the NIVO one-bag workflow." },
      { title: "Shoot", copy: "Lean crews, fast setups, and coverage built for the edit — not the other way around." },
      { title: "Edit & deliver", copy: "Cuts turned around in days, not weeks, with revisions built into the timeline." },
    ],
    founderName: "Sam Rourke",
    founderRole: "Founder & Director",
    founderBio: "Sam spent eight years shooting run-and-gun documentary work before building NIVO to solve a problem every small crew has: too much gear, not enough time. Today NIVO both makes the kit and runs the shoots — proof that the workflow holds up on real deadlines, not just on paper.",
    founderPhoto: imageField(interview),
    principles: [
      { icon: "Compass", title: "Story first", copy: "Every shot earns its place by serving the story, not the gear list." },
      { icon: "Gauge", title: "Move fast", copy: "Small crews and light kits mean faster setups and faster turnarounds." },
      { icon: "Handshake", title: "Plain communication", copy: "One point of contact, clear timelines, no surprise invoices." },
      { icon: "ShieldCheck", title: "Own the outcome", copy: "We don't hand off a drive of footage — we deliver a finished result." },
    ],
  });

  console.log("\nDone. Everything was created as PUBLISHED documents — open /studio to review and edit.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
