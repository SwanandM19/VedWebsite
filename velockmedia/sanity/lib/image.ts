import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Resolves a Sanity image field to a plain URL, or undefined if the field is empty. */
export function imageUrl(source: SanityImageSource | null | undefined, width?: number): string | undefined {
  if (!source) return undefined;
  const img = urlFor(source).auto("format");
  return (width ? img.width(width) : img).url();
}
