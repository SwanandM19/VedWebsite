"use client";

import { useEffect, useRef } from "react";

export type Review = {
  quote: string;
  initials: string;
  name: string;
  role: string;
};

/**
 * Auto-scrolling review row that can also be dragged manually. Content is
 * rendered twice (two "passes") so translating by -half the track width
 * loops seamlessly, matching the CSS `.marquee-loop` version this replaces.
 */
export default function ReviewMarquee({
  speed,
  reviews,
}: {
  speed: string;
  reviews: Review[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = reducedMotion ? 0 : parseFloat(speed) || 0.4;
    let half = 0;
    let x = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartTrackX = 0;
    let raf = 0;
    let lastTime = performance.now();

    function measure() {
      half = track!.scrollWidth / 2;
    }
    measure();
    if (base > 0) x = -half;

    function wrap() {
      if (!half) return;
      while (x <= -half) x += half;
      while (x > 0) x -= half;
    }

    function tick(time: number) {
      const deltaTime = time - lastTime;
      lastTime = time;
      if (half && !dragging) {
        const f = Math.min(deltaTime, 50) / 16.667;
        x += base * f;
        wrap();
        track!.style.transform = "translate3d(" + x + "px,0,0)";
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    track.style.cursor = "grab";
    track.style.touchAction = "pan-y";

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartTrackX = x;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      x = dragStartTrackX + (e.clientX - dragStartX);
      wrap();
      track.style.transform = "translate3d(" + x + "px,0,0)";
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = "grab";
      track.releasePointerCapture(e.pointerId);
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
    };
  }, [speed]);

  return (
    <div
      ref={trackRef}
      className="edge-fade flex w-max select-none will-change-transform"
    >
      {[0, 1].map((pass) => (
        <div key={pass} aria-hidden={pass === 1} className="flex gap-5 pr-5">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="flex w-[86vw] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:w-[26rem]"
            >
              <p className="text-base leading-7 text-neutral-700">
                &ldquo;{r.quote}&rdquo;
              </p>

              <footer className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-medium text-white">
                  {r.initials}
                </div>

                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="font-display text-[13px] uppercase tracking-[0.18em] text-neutral-400">
                    {r.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      ))}
    </div>
  );
}
