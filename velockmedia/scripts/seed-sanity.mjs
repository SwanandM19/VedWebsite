// One-off script that seeds the Sanity dataset with Veloc Media's editable
// baseline content, so the Studio opens with real, structured documents
// instead of empty singletons.
//
// Usage:
//   node --env-file=.env.local scripts/seed-sanity.mjs
//
// Requires SANITY_API_WRITE_TOKEN (Editor permission) in .env.local — see
// .env.local.example. This script is safe to re-run: it upserts by a fixed
// _id per document, so it won't create duplicates.
//
// IMPORTANT: this script never seeds case studies, testimonials, client names
// or performance numbers. Those must only ever be entered by hand from real,
// approved material. Where a figure is required, a bracketed placeholder is
// written so it is obvious in both the Studio and the live site.

import { createClient } from "@sanity/client";
import { buildLandingPage } from "./seed-landing.mjs";

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

async function upsert(doc) {
  console.log(`Upserting ${doc._type}: ${doc._id}`);
  await client.createOrReplace(doc);
}

const uploadedAssets = new Map();

/**
 * Uploads a placeholder still once and reuses the asset afterwards, so the
 * Studio opens showing the images the site currently renders and an editor can
 * swap them one at a time instead of facing empty slots.
 */
async function uploadImage(key, url) {
  if (uploadedAssets.has(key)) return uploadedAssets.get(key);
  console.log(`Uploading image: ${key}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${key}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${key}.jpg` });
  const field = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadedAssets.set(key, field);
  return field;
}

async function main() {
  // Work categories mirror the four services on the homepage. Cover images and
  // project-count labels are intentionally left unset — add them in the Studio
  // once real project stills and verified counts exist.
  const categories = [
    {
      _id: "workCategory.athlete-recruitment-media",
      name: "Athlete Recruitment Media",
      blurb:
        "Recruitment highlight videos, player showcases, position-specific reels, season highlights and full recruitment media packages.",
    },
    {
      _id: "workCategory.event-media-operations",
      name: "Event Media Operations",
      blurb:
        "Event recap films, competitor highlights, hype and promotional edits, social clips, sponsor deliverables and awards edits.",
    },
    {
      _id: "workCategory.league-team-media",
      name: "League & Team Media",
      blurb:
        "Match and game highlights, scoreboard-integrated content, player highlights, weekly match content and season recaps.",
    },
    {
      _id: "workCategory.ongoing-media-partnerships",
      name: "Ongoing Media Partnerships",
      blurb:
        "Monthly and seasonal media support, recurring event coverage and dedicated creative capacity for organizations that want a media team.",
    },
  ];

  for (const [i, c] of categories.entries()) {
    await upsert({
      _id: c._id,
      _type: "workCategory",
      name: c.name,
      slug: { _type: "slug", current: c._id.replace("workCategory.", "") },
      blurb: c.blurb,
      order: i,
    });
  }

  await upsert({
    _id: "caseStudiesPage",
    _type: "caseStudiesPage",
    eyebrow: "Case Studies",
    heading: "The objective, the approach, the work.",
    intro:
      "Selected projects for sports organizations — what the client needed, what the content had to accomplish, how we approached it and what we delivered.",
    // Replace every bracketed value with a verified figure before launch.
    metrics: [
      { _key: "m1", label: "Sports projects delivered", value: "[X]+" },
      { _key: "m2", label: "Organizations served", value: "[X]+" },
      { _key: "m3", label: "Sports worked in", value: "[X]+" },
      { _key: "m4", label: "Upwork rating", value: "[X.X]" },
    ],
  });

  await upsert({
    _id: "aboutPage",
    _type: "aboutPage",
    missionEyebrow: "Who we are",
    missionHeading: "The reliable media team behind ambitious sports organizations.",
    missionBody:
      "Veloc Media is a Sports Media Operations company. We exist because sports organizations should not have to wonder whether their media team will understand the assignment, meet the deadline, or deliver consistently. When you work with us, media becomes one less thing you have to worry about.",
    processSteps: [
      { _key: "p1", title: "Understand", copy: "We learn the sport, the organization, the event and the objective before anything else." },
      { _key: "p2", title: "Plan", copy: "We agree what needs to be created and how the footage and assets will be handled." },
      { _key: "p3", title: "Produce", copy: "Our team executes the post-production against that plan." },
      { _key: "p4", title: "Review", copy: "Quality control on our side first, then your feedback." },
      { _key: "p5", title: "Deliver", copy: "Final assets, organized and labelled so your team can actually use them." },
      { _key: "p6", title: "Continue", copy: "For ongoing clients the workflow becomes a repeatable media operation." },
    ],
    // [ADD REAL FOUNDER DETAILS] before launch.
    founderName: "[ADD FOUNDER NAME]",
    founderRole: "Founder",
    founderBio:
      "[ADD FOUNDER BIO] — a short, human introduction to the person behind Veloc. Veloc is built to run as a company rather than around one individual, so keep this focused on perspective and standards rather than a full biography.",
    principles: [
      { _key: "c1", icon: "Compass", title: "Understanding before execution", copy: "We establish what the content has to accomplish before we decide how to produce it." },
      { _key: "c2", icon: "ShieldCheck", title: "Ownership over excuses", copy: "When something is ours to solve, we solve it and we tell you where it stands." },
      { _key: "c3", icon: "Gauge", title: "Consistency over brilliance", copy: "The same standard in week twenty as in week one beats one exceptional edit." },
      { _key: "c4", icon: "Handshake", title: "Professionalism over flash", copy: "Clear communication and reliable delivery matter more than showing off effects." },
      { _key: "c5", icon: "Focus", title: "Systems over heroics", copy: "Repeatable workflows, so quality never depends on one person having a good week." },
      { _key: "c6", icon: "Sparkle", title: "Learning over ego", copy: "Every sport, league and organization works differently. We ask before we assume." },
    ],
  });

  // The landing page singleton — every editable string and image on the
  // homepage. Seeded last because it uploads the imagery.
  await upsert(await buildLandingPage(uploadImage));

  console.log("\nDone. Case studies and testimonials are deliberately NOT seeded —");
  console.log("add them in the Studio from real, client-approved material only.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
