// Reads Sanity connection details from env vars. Values are optional at this
// layer on purpose — sanity/lib/client.ts checks `isSanityConfigured` and the
// site pages fall back to placeholder content until these are set, so the
// project runs before a Sanity project exists.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = Boolean(projectId);
