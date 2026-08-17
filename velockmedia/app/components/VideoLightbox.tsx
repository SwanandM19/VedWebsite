"use client";

import { useEffect, useRef } from "react";
import { X as XIcon } from "lucide-react";
import { resolveVideo } from "./video-utils";

type Props = {
  /** Video URL — a YouTube link or a direct file. `null` closes the lightbox. */
  src: string | null;
  caption?: string;
  onClose: () => void;
};

/**
 * Full-screen video player over a blurred backdrop.
 *
 * Opened from the pinned slide track on the homepage and from case study
 * pages. YouTube links (including Shorts) render as an embedded iframe;
 * direct files render as a native <video>. Muted background preview loops
 * elsewhere on the page are paused while this is open.
 */
export default function VideoLightbox({ src, caption, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = resolveVideo(src);

  useEffect(() => {
    if (!src) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause the background slide loops; remember which were actually playing
    // so they can be resumed on close. Only native <video> loops are tracked
    // — YouTube embeds behind the blur are left alone.
    const others = Array.from(document.querySelectorAll("video")).filter((v) => v !== videoRef.current);
    const wasPlaying = others.filter((v) => !v.paused);
    wasPlaying.forEach((v) => v.pause());

    // Give the player focus so keyboard controls work straight away.
    const focusTimer = window.setTimeout(() => videoRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      wasPlaying.forEach((v) => {
        // Autoplay can reject if the tab lost permission; nothing to do.
        void v.play().catch(() => {});
      });
    };
  }, [src, onClose]);

  if (!video) return null;

  const vertical = video.kind === "youtube" && video.vertical;

  return (
    <div
      // `data-lenis-prevent` stops the page's smooth-scroll driver from
      // scrolling the page behind the overlay.
      data-lenis-prevent
      className="fixed inset-0 z-[420] grid place-items-center bg-ink/80 px-4 py-16 backdrop-blur-xl sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label={caption ? `${caption} — video` : "Video"}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-acid hover:text-acid sm:right-8 sm:top-8"
      >
        <XIcon className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div className={vertical ? "w-full max-w-[420px]" : "w-full max-w-5xl"}>
        {video.kind === "youtube" ? (
          <div className={`overflow-hidden rounded-2xl bg-black shadow-2xl ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
            <iframe
              src={`${video.embedUrl}?autoplay=1&rel=0`}
              title={caption || "Video"}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={video.url}
            controls
            autoPlay
            playsInline
            className="max-h-[78vh] w-full rounded-2xl bg-black shadow-2xl"
          />
        )}
        {caption && (
          <p className="font-display mt-5 text-center text-sm uppercase tracking-[0.18em] text-white/60">{caption}</p>
        )}
      </div>
    </div>
  );
}
