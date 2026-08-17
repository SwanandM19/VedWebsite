"use client";

import { useEffect, useRef } from "react";
import { X as XIcon } from "lucide-react";

type Props = {
  /** Video URL. `null` closes the lightbox. */
  src: string | null;
  caption?: string;
  onClose: () => void;
};

/**
 * Full-screen video player over a blurred backdrop.
 *
 * Opened from the pinned slide track on the homepage. The slide previews are
 * muted autoplay loops, so this pauses every other <video> on the page while it
 * is open — otherwise the loop underneath keeps running behind the blur.
 */
export default function VideoLightbox({ src, caption, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!src) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause the background slide loops; remember which were actually playing
    // so they can be resumed on close.
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

  if (!src) return null;

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

      <div className="w-full max-w-5xl">
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          className="max-h-[78vh] w-full rounded-2xl bg-black shadow-2xl"
        />
        {caption && (
          <p className="font-display mt-5 text-center text-sm uppercase tracking-[0.18em] text-white/60">{caption}</p>
        )}
      </div>
    </div>
  );
}
