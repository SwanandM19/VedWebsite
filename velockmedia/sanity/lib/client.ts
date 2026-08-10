import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

export { isSanityConfigured };

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Fetches from Sanity when a project is configured, otherwise resolves to
 * `null` so callers can fall back to the bundled placeholder content.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return null;
  }
}
