import type { MetadataRoute } from "next";
import { CASE_STUDIES as FALLBACK_CASE_STUDIES } from "./case-studies/data";
import { sanityFetch } from "../sanity/lib/client";
import { caseStudySlugsQuery } from "../sanity/lib/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velocmedia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetched = await sanityFetch<{ slug: string }[]>(caseStudySlugsQuery);
  const slugs =
    fetched && fetched.length > 0 ? fetched.map((cs) => cs.slug) : FALLBACK_CASE_STUDIES.map((cs) => cs.slug);

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/case-studies/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
