/**
 * Turns a raw video URL — a YouTube link (regular or Shorts) or a direct
 * hosted file (mp4) — into something a component can render without caring
 * which kind it is. Used anywhere a video URL is stored as plain data: the
 * homepage work gallery, the video lightbox, and case study pages.
 */

export type VideoSource =
  | { kind: "youtube"; id: string; embedUrl: string; thumbnail: string; vertical: boolean }
  | { kind: "file"; url: string };

const YOUTUBE_ID_PATTERNS = [
  /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
  /[?&]v=([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
];

export function getYouTubeId(url: string): string | null {
  for (const pattern of YOUTUBE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function resolveVideo(url: string | undefined | null): VideoSource | null {
  if (!url) return null;
  const id = getYouTubeId(url);
  if (id) {
    return {
      kind: "youtube",
      id,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      // Shorts are vertical (9:16) — the caller uses this to size the frame.
      vertical: url.includes("/shorts/"),
    };
  }
  return { kind: "file", url };
}
