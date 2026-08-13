
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Aperture,
  Menu,
  ArrowDownRight,
  Play,
  ArrowDown,
  PackageOpen,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Sparkle,
  Focus,
  Move3d,
  AudioLines,
} from "lucide-react";
import { useBookCall } from "./BookCallProvider";
import type { LandingContent } from "./landing-defaults";

/**
 * Veloc Media — Sports Media Operations
 *
 * Homepage. Animated with GSAP + Lenis; the section ids and data-* attributes
 * below are read by the scroll effects in the effect hook, so keep them stable.
 *
 * CONTENT RULE: nothing here may claim a client, statistic, review or outcome
 * that has not been verified. Unverified values ship as bracketed placeholders
 * ("[X]+", "[ADD REAL TESTIMONIAL]") so they are obvious and greppable.
 *
 * IMAGERY: still the placeholder stock from the original build — see
 * app/components/placeholders.ts. Swap for real Veloc project stills.
 */

// Icon paths for the footer social links. The platform name comes from the
// CMS; the artwork lives here so editors never have to paste SVG.
const SOCIAL_PATHS: Record<string, string> = {
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  TikTok:
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  X: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.291 19.49h2.039L6.486 3.24H4.298l13.312 17.403z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
};

export default function LandingPage({ content }: { content: LandingContent }) {
  const { openBookCall } = useBookCall();
  const { hero, services, audiences, why, proof, reviews, faq, manifesto, aperture: ap, statement, footer } = content;
  const rootRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const subMsgRef = useRef<HTMLParagraphElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const plPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });

    const EASE = "expo.out";
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      // ---------------------------------------------------------------
      // graceful degradation
      // ---------------------------------------------------------------
      if (reduced) {
        root.classList.remove("js");
        // Hide rather than .remove() — these are React-managed ref nodes, and
        // ripping them out of the DOM directly desyncs React's fiber tree
        // from reality. The next unrelated re-render (e.g. opening the
        // booking modal) then crashes with a "not a child of this node"
        // insertBefore error the first time React touches this subtree.
        if (preloaderRef.current) preloaderRef.current.style.display = "none";
        if (plPanelRef.current) plPanelRef.current.style.display = "none";
        root.querySelectorAll<HTMLElement>("#apCtaWrap").forEach((el) => {
          el.style.opacity = "1";
        });
        initMenu();
        initFAQ();
        initForm();
        return;
      }

      root.classList.add("js");

      // ---------------------------------------------------------------
      // 1 · smooth scroll
      // ---------------------------------------------------------------
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.addEventListener("refresh", () => lenis.resize());
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();

      root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");
          if (!id || id === "#") return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, { offset: -60, duration: 1.4 });
        });
      });

      // ---------------------------------------------------------------
      // 2 · text splitting (words, then measured lines)
      // ---------------------------------------------------------------
      function splitWords(el: Element): HTMLElement[] {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        const nodes: Node[] = [];
        let n: Node | null;
        while ((n = walker.nextNode())) nodes.push(n);
        nodes.forEach((node) => {
          if (!node.nodeValue || !node.nodeValue.trim()) return;
          const frag = document.createDocumentFragment();
          node.nodeValue.split(/(\s+)/).forEach((chunk) => {
            if (!chunk) return;
            if (/^\s+$/.test(chunk)) {
              frag.appendChild(document.createTextNode(chunk));
              return;
            }
            const s = document.createElement("span");
            s.className = "word";
            s.textContent = chunk;
            frag.appendChild(s);
          });
          node.parentNode?.replaceChild(frag, node);
        });
        return Array.prototype.slice.call(el.querySelectorAll(".word"));
      }

      function splitLines(el: HTMLElement, force?: boolean): HTMLElement[] {
        if (el.dataset.splitDone && !force) {
          return Array.prototype.slice.call(el.querySelectorAll(".line-inner"));
        }
        if (!el.dataset.origText) {
          el.dataset.origText = el.textContent?.replace(/\s+/g, " ").trim() || "";
        }
        if (force) {
          el.innerHTML = el.dataset.origText || "";
          delete el.dataset.splitDone;
        }
        const words = splitWords(el);
        if (!words.length) return [];
        const lines: HTMLElement[][] = [];
        let current: HTMLElement[] = [];
        let lastTop: number | null = null;
        words.forEach((w) => {
          const top = Math.round(w.offsetTop);
          if (lastTop === null || Math.abs(top - lastTop) > 4) {
            current = [];
            lines.push(current);
            lastTop = top;
          }
          current.push(w);
        });
        el.innerHTML = "";
        const inners: HTMLElement[] = [];
        lines.forEach((group) => {
          const mask = document.createElement("span");
          mask.className = "line-mask";
          const inner = document.createElement("span");
          inner.className = "line-inner";
          inner.textContent = group.map((w) => w.textContent).join(" ");
          mask.appendChild(inner);
          el.appendChild(mask);
          inners.push(inner);
        });
        el.dataset.splitDone = "1";
        el.style.opacity = "1";
        return inners;
      }

      // ---------------------------------------------------------------
      // 3 · preloader
      // ---------------------------------------------------------------
      function preload() {
        const num = root!.querySelector("#plNum") as HTMLElement;
        const fill = root!.querySelector("#plFill") as HTMLElement;
        const word = root!.querySelector("#plWord") as HTMLElement;
        const pre = preloaderRef.current;
        const panel = plPanelRef.current;
        if (!pre || !panel) return;
        const phases = ["Loading", "Syncing footage", "Checking audio", "Ready"];
        const counter = { v: 0 };

        gsap
          .timeline({ onComplete: revealHero })
          .to(counter, {
            v: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: () => {
              const p = Math.round(counter.v);
              if (num) num.textContent = String(p);
              gsap.set(fill, { scaleX: p / 100 });
              const idx = Math.min(phases.length - 1, Math.floor(p / 26));
              if (word && word.textContent !== phases[idx]) word.textContent = phases[idx];
            },
          })
          .to(pre.querySelectorAll(".pl-bar, p, div > div"), { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.15")
          .to(pre, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1")
          .to(panel, { scaleY: 0, transformOrigin: "top center", duration: 1.0, ease: "expo.inOut" }, "-=0.75")
          .set([pre, panel], { display: "none" }, ">-0.05");
      }

      // ---------------------------------------------------------------
      // 4 · hero entrance
      // ---------------------------------------------------------------
      function revealHero() {
        lenis.start();
        const h1 = root!.querySelector<HTMLElement>("#heroCopy h1");
        const lines = h1 ? splitLines(h1) : [];

        gsap
          .timeline()
          .fromTo(
            "#heroImg",
            { scale: 1.32, filter: "brightness(0.5)" },
            { scale: 1, filter: "brightness(1)", duration: 2.0, ease: "expo.out" },
            0
          )
          .fromTo("#heroRule", { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: EASE }, 0.25)
          .fromTo(lines, { yPercent: 118 }, { yPercent: 0, duration: 1.35, ease: EASE, stagger: 0.09 }, 0.3)
          .fromTo(
            "[data-hero-el]",
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: EASE, stagger: 0.08 },
            0.55
          )
          .fromTo("#siteHeader", { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: EASE }, 0.4);

        gsap.to("#scrollArrow", { y: 5, duration: 0.9, ease: "sine.inOut", repeat: -1, yoyo: true });
        ScrollTrigger.refresh();
      }

      // ---------------------------------------------------------------
      // 5 · hero scroll parallax
      // ---------------------------------------------------------------
      function heroScroll() {
        gsap
          .timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } })
          .to("#heroImg", { yPercent: 12, scale: 1.12, ease: "none" }, 0)
          .to("#heroCopy", { yPercent: -22, opacity: 0, ease: "none" }, 0)
          .to("#heroVeil", { opacity: 0.65, ease: "none" }, 0);
      }

      // ---------------------------------------------------------------
      // 6 · nav theme swap + hide on scroll
      // ---------------------------------------------------------------
      function nav() {
        const header = root!.querySelector<HTMLElement>("#siteHeader");
        if (!header) return;
        const darkSections = root!.querySelectorAll("#hero, #gallery, #tech, #support");
        // Seed with the real scroll position (not 0) — otherwise the very
        // first onUpdate below can read a scrolled-in page as "scrolling
        // down" and hide the header on load with no user input.
        let last = window.scrollY || document.documentElement.scrollTop || 0;

        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: () => {
            let over = false;
            darkSections.forEach((sec) => {
              const r = sec.getBoundingClientRect();
              if (r.top <= 72 && r.bottom >= 72) over = true;
            });
            setTheme(over ? "light" : "dark");
          },
        });

        function setTheme(t: "light" | "dark") {
          if (header!.dataset.navTheme === t) return;
          header!.dataset.navTheme = t;
          const onDark = t === "light";
          header!.querySelectorAll(".nav-ink").forEach((el) => {
            el.classList.toggle("text-white", onDark);
            el.classList.toggle("text-neutral-900", !onDark);
          });
          header!.querySelectorAll("#navLinks a").forEach((el) => {
            el.classList.toggle("text-white/70", onDark);
            el.classList.toggle("text-neutral-500", !onDark);
            el.classList.toggle("hover:text-white", onDark);
            el.classList.toggle("hover:text-neutral-900", !onDark);
          });
          const cta = header!.querySelector(".nav-cta");
          if (cta) {
            cta.classList.toggle("bg-white", onDark);
            cta.classList.toggle("bg-ink", !onDark);
            cta.classList.toggle("text-ink", onDark);
            cta.classList.toggle("text-white", !onDark);
          }
        }

        ScrollTrigger.create({
          start: "top -80",
          onUpdate: (self) => {
            const y = self.scroll();
            const delta = y - last;

            // Always show the header near the top, and ignore sub-pixel
            // jitter from Lenis's smoothing so direction doesn't flip on
            // every tiny scroll tick (that flip/overwrite churn is what
            // made the header flicker in and out while scrolling).
            if (y <= 320) {
              gsap.to(header, { y: 0, duration: 0.6, ease: "power3.out", overwrite: true });
              last = y;
              return;
            }

            if (Math.abs(delta) < 6) return;

            const down = delta > 0;
            last = y;
            gsap.to(header, { y: down ? -140 : 0, duration: 0.6, ease: "power3.out", overwrite: true });
          },
          onToggle: (self) => {
            gsap.to(header, { top: self.isActive ? 12 : 36, duration: 0.6, ease: "power3.out" });
            const bar = header!.querySelector("nav");
            gsap.to(bar, {
              backgroundColor: self.isActive ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
              backdropFilter: self.isActive ? "blur(14px)" : "blur(0px)",
              borderRadius: self.isActive ? 999 : 0,
              maxWidth: self.isActive ? 1120 : 1280,
              paddingTop: self.isActive ? 10 : 20,
              paddingBottom: self.isActive ? 10 : 20,
              boxShadow: self.isActive ? "0 12px 40px rgba(8,9,10,.10)" : "0 0 0 rgba(0,0,0,0)",
              duration: 0.6,
              ease: "power3.out",
            });
          },
        });
      }

      // ---------------------------------------------------------------
      // 7 · cursor + magnetic
      // ---------------------------------------------------------------
      function cursor() {
        if (isTouch) return;

        root!.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          el.addEventListener("mousemove", (e) => {
            const r = el.getBoundingClientRect();
            qx((e.clientX - (r.left + r.width / 2)) * 0.34);
            qy((e.clientY - (r.top + r.height / 2)) * 0.44);
          });
          el.addEventListener("mouseleave", () => {
            qx(0);
            qy(0);
          });
        });
      }

      // ---------------------------------------------------------------
      // 8 · generic reveals
      // ---------------------------------------------------------------
      function reveals() {
        function triggerFor(el: Element) {
          let node: Element | null = el;
          while (node && node !== document.body) {
            if (getComputedStyle(node).position === "sticky") return el.closest("section") || el;
            node = node.parentElement;
          }
          return el;
        }

        root!.querySelectorAll<HTMLElement>('[data-split="lines"]').forEach((el) => {
          const lines = splitLines(el);
          gsap.fromTo(
            lines,
            { yPercent: 112 },
            {
              yPercent: 0,
              duration: 1.25,
              ease: EASE,
              stagger: 0.08,
              scrollTrigger: { trigger: triggerFor(el), start: "top 88%" },
            }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: EASE, scrollTrigger: { trigger: triggerFor(el), start: "top 90%" } }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.95, ease: EASE, stagger: 0.07, scrollTrigger: { trigger: el, start: "top 88%" } }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 86%" } }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%" } }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-parallax-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      }

      // ---------------------------------------------------------------
      // 8b · creator stories — typed eyebrow, rolling index
      // ---------------------------------------------------------------
      function storyType() {
        root!.querySelectorAll<HTMLElement>("[data-story]").forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { x: fromLeft ? -120 : 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 82%" } }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-type]").forEach((el) => {
          const full = (el.textContent || "").replace(/\s+/g, " ").trim();
          if (!full) return;

          el.setAttribute("aria-label", full);
          el.innerHTML =
            '<span class="type-ghost" aria-hidden="true">' +
            full +
            '</span><span class="type-live" aria-hidden="true"><span class="type-line"></span><span class="caret"></span></span>';
          const live = el.lastElementChild as HTMLElement;
          const out = live.firstElementChild as HTMLElement;
          const caret = live.lastElementChild as HTMLElement;
          const o = { i: 0 };
          const delay = parseFloat(el.getAttribute("data-type-delay") || "0") || 0;

          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => {
              gsap.delayedCall(delay, () => {
                caret.classList.add("is-live");
                gsap.to(o, {
                  i: full.length,
                  duration: Math.max(0.6, Math.min(1.9, full.length * 0.03)),
                  ease: "none",
                  onUpdate: () => {
                    out.textContent = full.slice(0, Math.round(o.i));
                  },
                  onComplete: () => {
                    out.textContent = full;
                    gsap.delayedCall(0.7, () => {
                      caret.classList.remove("is-live");
                      gsap.fromTo(caret, { opacity: 0.9 }, { opacity: 0, duration: 0.45 });
                    });
                  },
                });
              });
            },
          });
        });

        root!.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
          const end = parseInt(el.textContent?.trim() || "", 10);
          if (isNaN(end)) return;
          const o = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.to(o, {
                v: end,
                duration: 1.1,
                ease: "power2.out",
                onUpdate: () => {
                  const n = Math.round(o.v);
                  el.textContent = (n < 10 ? "0" : "") + n;
                },
              });
            },
          });
        });
      }

      // ---------------------------------------------------------------
      // 9 · manifesto — word-by-word scrub
      // ---------------------------------------------------------------
      function manifesto() {
        const el = root!.querySelector<HTMLElement>("#manifestoText");
        if (!el) return;
        const words = splitWords(el);
        gsap.set(words, { opacity: 0.12 });
        gsap.to(words, {
          opacity: 1,
          ease: "none",
          stagger: 1,
          scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 55%", scrub: 0.6 },
        });
      }

      // ---------------------------------------------------------------
      // 10 · counters
      // ---------------------------------------------------------------
      function counters() {
        root!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const end = parseFloat(el.getAttribute("data-count") || "0");
          const suffix = el.getAttribute("data-suffix") || "";
          const obj = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                v: end,
                duration: 1.8,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = Math.round(obj.v) + suffix;
                },
              });
            },
          });
        });
      }

      // ---------------------------------------------------------------
      // 11 · stacking product cards
      // ---------------------------------------------------------------
      function stack() {
        const cards = root!.querySelectorAll<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card.firstElementChild, {
            scale: 0.9,
            yPercent: -4,
            filter: "brightness(0.82)",
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 18%", scrub: true },
          });
        });
      }

      // ---------------------------------------------------------------
      // 12 · marquees (scroll-velocity aware)
      // ---------------------------------------------------------------
      function marquees() {
        let scrollVel = 0;
        lenis.on("scroll", (e: { velocity?: number }) => {
          scrollVel = e.velocity || 0;
        });

        root!.querySelectorAll<HTMLElement>("[data-marquee]").forEach((track) => {
          const base = parseFloat(track.getAttribute("data-speed") || "0.4") || 0.4;
          const reactive = track.hasAttribute("data-velocity");
          let half = 0;
          let x = 0;

          function measure() {
            half = track.scrollWidth / 2;
          }
          measure();
          window.addEventListener("resize", measure);
          if (base > 0) x = -half;

          gsap.ticker.add((_time, deltaTime) => {
            if (!half) return;
            const f = Math.min(deltaTime, 50) / 16.667;
            const boost = reactive ? Math.min(Math.abs(scrollVel) * 0.28, 22) * (base < 0 ? -1 : 1) : 0;
            x += (base + boost) * f;
            if (x <= -half) x += half;
            if (x >= 0 && base > 0) x -= half;
            track.style.transform = "translate3d(" + x + "px,0,0)";
          });
        });
      }

      // ---------------------------------------------------------------
      // 13 · horizontal pinned gallery
      // ---------------------------------------------------------------
      function horizontal() {
        const section = root!.querySelector<HTMLElement>("#hScroll");
        const trackEl = root!.querySelector<HTMLElement>("#hTrack");
        const bar = root!.querySelector<HTMLElement>("#hBar");
        if (!section || !trackEl) return;

        function getDistance() {
          return Math.max(0, trackEl!.scrollWidth - window.innerWidth);
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getDistance(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
            onUpdate: (self) => {
              if (bar) bar.style.width = (self.progress * 100).toFixed(1) + "%";
            },
          },
        });

        tl.to(trackEl, { x: () => -getDistance(), ease: "none" }, 0);

        trackEl.querySelectorAll("figure img").forEach((img) => {
          tl.fromTo(img, { xPercent: -4 }, { xPercent: 4, ease: "none" }, 0);
        });
      }

      // ---------------------------------------------------------------
      // 14 · aperture — the scroll set-piece
      // ---------------------------------------------------------------
      function aperture() {
        const svg = root!.querySelector<SVGSVGElement>("#apSvg");
        const pin = root!.querySelector<HTMLElement>("#apPin");
        if (!svg || !pin) return;

        const N = 9;
        const R_BARREL = 90;
        const TAU = Math.PI * 2;

        const clipPath = root!.querySelector<SVGPathElement>("#apClipPath")!;
        const ring = root!.querySelector<SVGPathElement>("#apBladeRing")!;
        const edge = root!.querySelector<SVGPathElement>("#apEdge")!;
        const seams = root!.querySelector<SVGGElement>("#apSeams")!;
        const glints = root!.querySelector<SVGGElement>("#apGlints")!;
        const knurl = root!.querySelector<SVGGElement>("#apKnurl")!;
        const scaleG = root!.querySelector<SVGGElement>("#apScale")!;
        const photo = root!.querySelector<SVGImageElement>("#apPhoto")!;
        const dof = root!.querySelector<SVGFEGaussianBlurElement>("#apDof")!;
        const back = root!.querySelector<HTMLImageElement>("#apBack")!;

        if (photo && back) {
          photo.setAttributeNS("http://www.w3.org/1999/xlink", "href", back.currentSrc || back.src);
          photo.setAttribute("href", back.currentSrc || back.src);
          photo.setAttribute("opacity", "0.42");
        }

        let kd = "";
        for (let k = 0; k < 84; k++) {
          const ka = (k / 84) * TAU;
          kd +=
            "M" + (93.6 * Math.cos(ka)).toFixed(2) + " " + (93.6 * Math.sin(ka)).toFixed(2) +
            "L" + (97.4 * Math.cos(ka)).toFixed(2) + " " + (97.4 * Math.sin(ka)).toFixed(2);
        }
        knurl.innerHTML = '<path d="' + kd + '"></path>';

        const STOPS = ["f/11", "f/8", "f/5.6", "f/4", "f/2.8", "f/2", "f/1.6"];
        let sh = "";
        STOPS.forEach((s, i) => {
          sh += '<text transform="rotate(' + (-42 + i * 14) + ') translate(0 -104)">' + s + "</text>";
        });
        scaleG.innerHTML = sh;

        let gh = "";
        for (let g = 0; g < N; g++) {
          gh +=
            '<path class="ap-glint" opacity="0" fill="#fff" d="M0 -3.6L0.9 -0.9L3.6 0L0.9 0.9L0 3.6L-0.9 0.9L-3.6 0L-0.9 -0.9Z"></path>';
        }
        glints.innerHTML = gh;
        const glintEls = glints.children;

        seams.innerHTML = "<path></path>";
        const seamPath = seams.firstElementChild as SVGPathElement;

        const OUTER = "M-90 0A90 90 0 1 0 90 0A90 90 0 1 0-90 0Z";

        function pt(r: number, a: number): [number, number] {
          return [r * Math.cos(a), r * Math.sin(a)];
        }
        function f(v: number) {
          return v.toFixed(2);
        }

        const state = { r: 2.6, phi: -0.62, open: 0 };

        function draw() {
          const r = state.r,
            phi = state.phi;
          const arcR = r * 2.4;
          let d = "";
          for (let i = 0; i < N; i++) {
            const p = pt(r, phi + (i * TAU) / N);
            d += (i === 0 ? "M" : "A" + f(arcR) + " " + f(arcR) + " 0 0 1 ") + f(p[0]) + " " + f(p[1]);
          }
          const p0 = pt(r, phi);
          d += "A" + f(arcR) + " " + f(arcR) + " 0 0 1 " + f(p0[0]) + " " + f(p0[1]) + "Z";

          clipPath.setAttribute("d", d);
          edge.setAttribute("d", d);
          ring.setAttribute("d", OUTER + d);

          let sd = "";
          for (let j = 0; j < N; j++) {
            const av = phi + (j * TAU) / N;
            const v = pt(r, av);
            const c = pt((r + R_BARREL) * 0.55, av - 0.3);
            const e = pt(R_BARREL, av - 0.72);
            sd += "M" + f(v[0]) + " " + f(v[1]) + "Q" + f(c[0]) + " " + f(c[1]) + " " + f(e[0]) + " " + f(e[1]);
          }
          seamPath.setAttribute("d", sd);

          for (let m = 0; m < N; m++) {
            const am = phi + (m * TAU) / N;
            const gp = pt(r, am);
            (glintEls[m] as SVGElement).setAttribute("transform", "translate(" + f(gp[0]) + " " + f(gp[1]) + ")");
          }

          knurl.setAttribute("transform", "rotate(" + f(state.open * 26) + ")");
          scaleG.setAttribute("transform", "rotate(" + f(42 - state.open * 84) + ")");
        }
        draw();

        const stopEl = root!.querySelector<HTMLElement>("#apStop");
        const pctEl = root!.querySelector<HTMLElement>("#apPct");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            refreshPriority: 1,
            onUpdate: (self) => {
              const eased = Math.min(1, self.progress / 0.72);
              const idx = Math.min(STOPS.length - 1, Math.floor(eased * STOPS.length));
              if (stopEl) stopEl.textContent = STOPS[idx];
              if (pctEl) pctEl.textContent = String(Math.round(eased * 100));
            },
          },
        });

        tl.to(state, { r: 86, phi: 0, open: 1, ease: "power2.inOut", duration: 1, onUpdate: draw }, 0)
          .to(photo, { attr: { opacity: 1 }, ease: "none", duration: 1 }, 0)
          .to(dof, { attr: { stdDeviation: 1.1 }, ease: "none", duration: 1 }, 0)
          .to("#apBack", { scale: 1.0, opacity: 1, ease: "none", duration: 1 }, 0)
          .fromTo(
            ".ap-chip",
            { opacity: 0, scale: 0.86, y: 24 },
            { opacity: 1, scale: 1, y: 0, ease: "power3.out", duration: 0.35, stagger: 0.06 },
            0.08
          )
          .to(".ap-glint", { opacity: 0.85, duration: 0.16, stagger: 0.015 }, 0.6)
          .to(".ap-glint", { opacity: 0.3, duration: 0.22 }, 0.88)
          .to("#apTitle", { opacity: 0, y: -18, duration: 0.18, ease: "power2.in" }, 0.42)
          .to("#apCopy", { opacity: 0, y: -14, duration: 0.18, ease: "power2.in" }, 0.42)
          .add(() => {
            const t = root!.querySelector<HTMLElement>("#apTitle");
            const c = root!.querySelector<HTMLElement>("#apCopy");
            const l = root!.querySelector<HTMLElement>("#apLabel");
            if (!t || !c || !l) return;
            t.textContent = ap.openTitle;
            c.textContent =
              "Dual-native ISO up to 12800, 10-bit color and a stacked sensor that reads out fast enough to kill rolling shutter.";
            l.textContent = ap.openEyebrow;
          }, 0.52)
          .to("#apTitle", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.54)
          .to("#apCopy", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.56)
          .to("#apStage", { scale: 1.18, ease: "power1.in", duration: 0.3 }, 0.7)
          .to(".ap-chip", { opacity: 0, duration: 0.2 }, 0.78)
          .fromTo(
            "#apCtaWrap",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            0.94
          );
      }

      // ---------------------------------------------------------------
      // 15 · statement lines
      // ---------------------------------------------------------------
      function statement() {
        const el = root!.querySelector<HTMLElement>("[data-statement]");
        if (!el) return;
        const lines = el.querySelectorAll(".line-inner");
        gsap.fromTo(
          lines,
          { yPercent: 108, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 1.4, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 86%" } }
        );
        gsap.to(el, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      // ---------------------------------------------------------------
      // 16 · footer wordmark parallax
      // ---------------------------------------------------------------
      function footer() {
        const word = root!.querySelector<HTMLElement>("#footerWord");
        if (!word) return;
        gsap.fromTo(
          word,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: word, start: "top bottom", end: "bottom bottom", scrub: true } }
        );
      }

      // ---------------------------------------------------------------
      // 17 · progress bar
      // ---------------------------------------------------------------
      function progress() {
        gsap.to("#progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      }

      // ---------------------------------------------------------------
      // 18 · grain drift
      // ---------------------------------------------------------------
      function grain() {
        gsap.to("#grain", {
          x: 12,
          y: -14,
          duration: 0.35,
          repeat: -1,
          yoyo: true,
          ease: "none",
          repeatRefresh: true,
          modifiers: {
            x: () => Math.random() * 24 - 12 + "px",
            y: () => Math.random() * 24 - 12 + "px",
          },
        });
      }

      // ---------------------------------------------------------------
      // menu / faq / form (also used in reduced-motion fallback)
      // ---------------------------------------------------------------
      function initMenu() {
        const menuButton = menuButtonRef.current;
        const mobileMenu = mobileMenuRef.current;
        if (!menuButton || !mobileMenu) return;

        const onClick = () => {
          const isOpen = !mobileMenu.classList.contains("hidden");
          mobileMenu.classList.toggle("hidden");
          mobileMenu.classList.toggle("pointer-events-none", isOpen);
          menuButton.setAttribute("aria-expanded", String(!isOpen));
          if (!isOpen) {
            gsap.fromTo(mobileMenu, { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
            gsap.fromTo(
              mobileMenu.querySelectorAll("a"),
              { y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.05, delay: 0.05 }
            );
          }
        };
        menuButton.addEventListener("click", onClick);

        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden", "pointer-events-none");
            menuButton.setAttribute("aria-expanded", "false");
          });
        });
      }

      function initFAQ() {
        const list = faqListRef.current;
        if (!list) return;
        list.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
          const head = item.querySelector<HTMLElement>(".faq-head")!;
          const body = item.querySelector<HTMLElement>(".faq-body")!;
          if (item.classList.contains("is-open")) body.style.height = "auto";
          head.addEventListener("click", () => {
            const open = item.classList.contains("is-open");
            list.querySelectorAll(".faq-item.is-open").forEach((other) => {
              if (other === item) return;
              other.classList.remove("is-open");
              other.querySelector(".faq-head")?.setAttribute("aria-expanded", "false");
              const ob = other.querySelector<HTMLElement>(".faq-body")!;
              gsap.to(ob, { height: 0, duration: 0.5, ease: "power3.inOut" });
            });
            item.classList.toggle("is-open", !open);
            head.setAttribute("aria-expanded", String(!open));
            gsap.to(body, {
              height: open ? 0 : (body.firstElementChild as HTMLElement).offsetHeight,
              duration: 0.55,
              ease: "power3.inOut",
              onComplete: () => {
                if (!open) body.style.height = "auto";
                ScrollTrigger.refresh();
              },
            });
          });
        });
      }

      function initForm() {
        const form = formRef.current;
        const msg = subMsgRef.current;
        if (!form || !msg) return;
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const input = form.querySelector("input") as HTMLInputElement;
          if (!input.value || !input.checkValidity()) {
            gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.35)" });
            return;
          }
          input.value = "";
          input.placeholder = "Thanks — check your inbox";
          gsap.to(msg, { opacity: 1, duration: 0.4 });
        });
      }

      function watchResize() {
        let w = window.innerWidth;
        let t: ReturnType<typeof setTimeout>;
        window.addEventListener("resize", () => {
          if (window.innerWidth === w) return;
          w = window.innerWidth;
          clearTimeout(t);
          t = setTimeout(() => {
            root!.querySelectorAll<HTMLElement>('[data-split="lines"]').forEach((el) => {
              const lines = splitLines(el, true);
              gsap.set(lines, { yPercent: 0 });
            });
            ScrollTrigger.refresh();
          }, 220);
        });
      }

      // ---------------------------------------------------------------
      // boot
      // ---------------------------------------------------------------
      const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fonts.then(() => {
        setTimeout(() => {
          heroScroll();
          nav();
          cursor();
          reveals();
          storyType();
          manifesto();
          counters();
          stack();
          initMenu();
          initFAQ();
          initForm();
          watchResize();
          marquees();
          horizontal();
          aperture();
          statement();
          footer();
          progress();
          grain();
          ScrollTrigger.refresh();
          preload();
        }, 30);
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="bg-white font-sans text-neutral-900 antialiased selection:bg-acid selection:text-ink">
      {/* ============ PRELOADER ============ */}
      <div id="preloader" ref={preloaderRef} className="fixed inset-0 z-[200] grid place-items-center bg-ink">
        <div className="w-full px-6 text-white">
          <div className="mx-auto flex max-w-[420px] items-end justify-between pb-5">
            <span id="plWord" className="font-display text-[11px] uppercase tracking-[0.34em] text-white/50">
              Loading
            </span>
            <span className="font-display text-[11px] tabular-nums tracking-[0.2em] text-white/80">
              <span id="plNum">0</span>%
            </span>
          </div>
          <div className="pl-bar mx-auto">
            <span id="plFill" />
          </div>
          <div className="mx-auto mt-6 max-w-[420px] overflow-hidden">
            <p className="font-display text-[10px] uppercase tracking-[0.34em] text-white/25">Veloc Media — Sports Media Operations</p>
          </div>
        </div>
      </div>
      <div ref={plPanelRef} className="pl-panel fixed inset-0 z-[199] origin-top bg-ink" />

      {/* ============ CHROME ============ */}
      <div id="progress" className="fixed inset-x-0 top-0 z-[160] h-0.5 origin-left scale-x-0 bg-acid" />
      <div id="grain" className="pointer-events-none fixed -inset-1/2 z-[150] opacity-[0.05]" style={{ backgroundImage: GRAIN_SVG }} />



      {/* ============ HEADER ============ */}
      <header id="siteHeader" className="fixed inset-x-0 top-9 z-50" data-nav-theme="light">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"
          aria-label="Main navigation"
        >
          <a
  href="#top"
  className="nav-ink flex items-center gap-3 text-white"
  data-cursor="Top"
>
  <img
    src="/WhiteLogo.png"
    alt="Veloc Media"
    className="h-10 w-auto object-contain"
  />
</a>

          <div id="navLinks" className="hidden items-center gap-1 md:flex">
            <Link
              href="/work"
              className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
            >
              Work
            </Link>

            <Link
              href="/case-studies"
              className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
            >
              Case Studies
            </Link>

            <Link
              href="/about"
              className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openBookCall}
              data-magnetic
              data-cursor="Book"
              className="nav-cta hidden overflow-hidden rounded-full bg-white px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-acid sm:inline-flex"
            >
              <span className="btn-flip relative block">
                <span className="block">Book a call</span>
              </span>
            </button>

            <button
              ref={menuButtonRef}
              id="menuButton"
              type="button"
              className="nav-ink grid h-10 w-10 place-items-center rounded-full border border-current/30 text-white md:hidden"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        <div ref={mobileMenuRef} id="mobileMenu" className="pointer-events-none mx-5 hidden rounded-2xl border border-white/15 bg-ink/95 p-5 text-white shadow-2xl backdrop-blur md:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/work" className="rounded-xl px-4 py-3 text-sm hover:bg-white/10">Work</Link>
            <Link href="/case-studies" className="rounded-xl px-4 py-3 text-sm hover:bg-white/10">Case Studies</Link>
            <Link href="/about" className="rounded-xl px-4 py-3 text-sm hover:bg-white/10">About</Link>
            <button type="button" onClick={openBookCall} className="mt-3 rounded-xl bg-acid px-4 py-3 text-center text-sm font-medium text-ink">Book a call</button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ============ 01 · HERO ============ */}
        <section id="hero" className="relative h-[100svh] overflow-hidden bg-ink">
          <div className="hero-media absolute inset-0 will-change-transform">
            {hero.videoUrl ? (
              <video
                id="heroImg"
                src={hero.videoUrl}
                poster={hero.posterUrl || undefined}
                muted
                playsInline
                preload="metadata"
                loop
                autoPlay
                aria-label="Veloc Media sports work showreel"
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
            ) : hero.posterUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img id="heroImg" src={hero.posterUrl} alt="" aria-hidden="true" className="absolute inset-0 h-[112%] w-full object-cover" />
            ) : (
              <div id="heroImg" aria-hidden="true" className="absolute inset-0 h-[112%] w-full bg-ink" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div id="heroVeil" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

          <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:items-center lg:px-10 lg:pb-0">
            <div id="heroCopy" className="max-w-2xl text-white">
              <p className="mb-6 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.28em] text-acid" data-hero-el>
                <span id="heroRule" className="h-px w-10 origin-left bg-acid" />
                {hero.eyebrow}
              </p>
              <h1 className="font-display max-w-2xl text-[13vw] font-medium leading-[0.88] tracking-[-0.03em] sm:text-6xl lg:text-[5.4rem]" data-split="lines">
                {hero.heading}
              </h1>
              <p className="mt-8 max-w-lg text-base leading-7 text-white/65 sm:text-lg" data-hero-el>
                {hero.body}
              </p>
              <div className="mt-10 flex flex-wrap gap-3" data-hero-el>
                <a href="#lineup" data-magnetic data-cursor="Services" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-acid">
                  {hero.primaryCta}
                  <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.5} />
                </a>
                <a href="#gallery" data-magnetic data-cursor="Play" className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur transition-colors hover:bg-white hover:text-ink">
                  {hero.secondaryCta}
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-7 left-5 hidden font-display text-[10px] uppercase tracking-[0.28em] text-white/40 sm:left-8 lg:left-10 lg:block" data-hero-el>
            {hero.caption}
          </div>
          <div className="absolute bottom-7 right-5 hidden items-center gap-3 text-white/55 sm:right-8 lg:right-10 lg:flex" data-hero-el>
            <span className="font-display text-[10px] uppercase tracking-[0.28em]">Scroll to explore</span>
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25">
              <ArrowDown id="scrollArrow" className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </section>

        {/* ============ 02 · SPEC TICKER ============ */}
        <section className="relative z-10 overflow-hidden border-y border-neutral-200 bg-white py-5">
          <div className="marquee edge-fade flex w-max will-change-transform" data-marquee data-speed="-0.6">
            {[0, 1].map((i) => (
              <div key={i} aria-hidden={i === 1} className="flex items-center gap-10 pr-10 font-display text-[12px] uppercase tracking-[0.22em] text-neutral-400">
                {content.ticker.map((item) => (
                  <span key={item} className="flex items-center gap-10">
                    <span>{item}</span>
                    <span className="text-acid">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>


        {/* ============ 05 · LINEUP ============ */}
        <section id="lineup" className="relative bg-neutral-50 pb-[10vh] pt-20 sm:pt-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-neutral-400" data-reveal>{services.eyebrow}</p>
            <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <h2 className="font-display max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl" data-split="lines">
                {services.heading}
              </h2>
              <p className="max-w-sm text-base leading-7 text-neutral-600" data-reveal>
                {services.intro}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8 lg:px-10">
            {services.items.map((item, i) => {
              const last = i === services.items.length - 1;
              return (
                <article
                  key={item.title}
                  className={`stack-card sticky${last ? "" : " mb-6"}`}
                  style={{ top: `${12 + i * 2}vh` }}
                  data-stack-card
                >
                  <div
                    className={`group grid overflow-hidden rounded-[2rem] border lg:grid-cols-[1.3fr_0.7fr] ${
                      item.featured ? "border-neutral-800 bg-ink text-white" : "border-neutral-200 bg-white"
                    }`}
                  >
                    <div className="relative overflow-hidden bg-neutral-100">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          data-parallax-img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-80 w-full scale-110 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.16] lg:h-[30rem]"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="h-80 w-full bg-ink lg:h-[30rem]"
                          style={{ backgroundImage: "radial-gradient(circle at 25% 20%, rgba(255,105,0,.26), transparent 60%)" }}
                        />
                      )}
                      <span
                        className={`absolute left-6 top-6 rounded-full px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] backdrop-blur ${
                          item.featured ? "bg-acid text-ink" : "bg-black/45 text-white"
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>
                    <div className="flex min-h-80 flex-col justify-between p-7 sm:p-10">
                      <div
                        className={`flex items-center justify-between gap-4 border-b pb-5 ${
                          item.featured ? "border-white/15" : "border-neutral-200"
                        }`}
                      >
                        <span
                          className={`font-display text-[10px] uppercase tracking-[0.2em] ${
                            item.featured ? "text-white/45" : "text-neutral-400"
                          }`}
                        >
                          {item.kicker}
                        </span>
                        <span
                          className={`shrink-0 font-display text-[10px] uppercase tracking-[0.2em] ${
                            item.featured ? "text-white/45" : "text-neutral-400"
                          }`}
                        >
                          {item.meta}
                        </span>
                      </div>
                      <div className="py-10">
                        <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
                        <p className={`mt-4 text-base leading-7 ${item.featured ? "text-white/60" : "text-neutral-600"}`}>
                          {item.copy}
                        </p>
                      </div>
                      {item.featured ? (
                        <button
                          type="button"
                          onClick={openBookCall}
                          data-magnetic
                          data-cursor="Talk"
                          className="inline-flex w-fit items-center gap-2 rounded-full bg-acid px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white"
                        >
                          {item.ctaLabel}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={openBookCall}
                          data-cursor="Talk"
                          className="link-underline inline-flex w-fit items-center gap-2 text-sm font-medium"
                        >
                          {item.ctaLabel}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ============ 06 · WHO WE SERVE (pinned horizontal) ============ */}
        <section id="gallery" className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-3xl px-5 pt-24 text-center sm:px-8 sm:pt-32">
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-white/40" data-reveal>{audiences.eyebrow}</p>
            <h2 className="font-display mt-5 text-4xl font-medium tracking-[-0.03em] sm:text-5xl" data-split="lines">
              {audiences.heading}
            </h2>
            <p className="mt-6 text-base leading-7 text-white/55" data-reveal>{audiences.intro}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-2.5" data-stagger>
              {audiences.chips.map((t) => (
                <span key={t} className="rounded-full border border-white/20 px-4 py-2 font-display text-[10px] uppercase tracking-[0.18em] text-white/70">{t}</span>
              ))}
            </div>
          </div>

          <div id="hScroll" className="relative mt-16 h-[100svh] pb-0">
            <div className="flex h-full items-center overflow-hidden">
              <div id="hTrack" className="flex w-max items-center gap-5 px-5 sm:gap-7 sm:px-[12vw]">
                {audiences.slides.map((fig, i) => {
                  const tall = i % 2 === 1;
                  return (
                    <figure
                      key={`${fig.caption}-${i}`}
                      className={`relative w-[78vw] overflow-hidden rounded-2xl ${tall ? "sm:w-[26rem]" : "sm:w-[34rem]"}`}
                    >
                      {fig.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          data-parallax-img
                          src={fig.imageUrl}
                          alt={fig.alt}
                          className={`w-full scale-110 object-cover ${tall ? "h-[56vh] sm:h-[32rem]" : "h-[46vh] sm:h-[26rem]"}`}
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className={`w-full bg-white/[0.06] ${tall ? "h-[56vh] sm:h-[32rem]" : "h-[46vh] sm:h-[26rem]"}`}
                          style={{ backgroundImage: "radial-gradient(circle at 70% 15%, rgba(255,105,0,.22), transparent 58%)" }}
                        />
                      )}
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5">
                        <span className="font-display text-sm">{fig.caption}</span>
                        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
                <div className="flex w-[70vw] shrink-0 flex-col justify-center gap-5 pr-5 sm:w-[24rem]">
                  <p className="font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-4xl">
                    {audiences.outroHeading}
                  </p>
                  <button
                    type="button"
                    onClick={openBookCall}
                    data-magnetic
                    data-cursor="Talk"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-display text-[10px] uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink"
                  >
                    {audiences.outroCta} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-5 bottom-8 mx-auto hidden max-w-7xl items-center gap-4 sm:flex sm:px-3">
              <span className="font-display text-[10px] uppercase tracking-[0.22em] text-white/40">Drag / scroll</span>
              <span className="relative h-px flex-1 bg-white/15">
                <span id="hBar" className="absolute inset-y-0 left-0 block w-0 bg-acid" />
              </span>
            </div>
          </div>
        </section>

        {/* ============ 08 · WHY VELOC ============ */}
        <section id="stories" className="overflow-hidden bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-neutral-400" data-type>{why.eyebrow}</p>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="font-display max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl" data-type data-type-delay="0.45">
                {why.heading}
              </h2>
              <Link href="/about" data-cursor="About" className="link-underline inline-flex w-fit items-center gap-2 text-sm font-medium">
                {why.linkLabel} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {why.items.map((item, i) => {
                const offset = i % 2 === 1;
                const rounded = offset
                  ? i % 4 === 1
                    ? "rounded-[3.5rem] rounded-bl-2xl"
                    : "rounded-[3.5rem] rounded-tr-2xl"
                  : "rounded-[2rem]";
                return (
                  <article key={item.title} className={`group${offset ? " md:mt-24" : ""}`} data-story>
                    <div className={`overflow-hidden bg-neutral-100 ${rounded}`} data-clip>
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          data-parallax-img
                          src={item.imageUrl}
                          alt={item.alt}
                          className="aspect-[4/3] w-full scale-110 object-cover transition-transform duration-[1.2s] group-hover:scale-[1.16]"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="aspect-[4/3] w-full bg-ink"
                          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,105,0,.24), transparent 58%)" }}
                        />
                      )}
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-5">
                      <div>
                        <p data-type className="font-display text-[10px] uppercase tracking-[0.2em] text-neutral-400">{item.eyebrow}</p>
                        <h3 data-split="lines" className="font-display mt-2 text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
                        <p className="mt-3 max-w-md text-base leading-7 text-neutral-600">{item.body}</p>
                      </div>
                      <span data-num className="font-display text-5xl font-light text-neutral-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ 04 · TRACK RECORD ============ */}
        <section id="products" className="border-t border-neutral-200 bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-neutral-400" data-reveal>{proof.eyebrow}</p>
              <h2 className="font-display mt-5 max-w-lg text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl" data-split="lines">
                {proof.heading}
              </h2>
              {proof.paragraphs.map((para, i) => (
                <p key={i} className={`${i === 0 ? "mt-7" : "mt-4"} max-w-xl text-base leading-7 text-neutral-600`} data-reveal>
                  {para}
                </p>
              ))}

              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" data-stagger>
                {proof.stats.map((stat) => (
                  <div key={stat.label} className="border-t border-neutral-900/15 pt-4">
                    <p className="font-display text-4xl font-medium tracking-[-0.04em]">{stat.value}</p>
                    <p className="mt-2 font-display text-[10px] uppercase tracking-[0.18em] text-neutral-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-neutral-50 p-6 sm:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300" />
                <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200" />
                <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300" />
              </div>
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-neutral-300 bg-white px-4 py-2 font-display text-[10px] uppercase tracking-[0.2em]">
                    {proof.panelTitle}
                  </span>
                  <PackageOpen className="h-6 w-6 text-neutral-400" strokeWidth={1.5} />
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3" data-stagger>
                  {proof.steps.map((step, i) => (
                    <div key={step.title} className="rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                      <span className={`mb-3 block h-1.5 w-1.5 rounded-full ${i < 3 ? "bg-acid" : "bg-neutral-300"}`} />
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="mt-1 text-xs text-neutral-500">{step.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 09 · REVIEWS ============ */}
        <section id="reviews" className="overflow-hidden border-y border-neutral-200 bg-neutral-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-neutral-400" data-reveal>{reviews.eyebrow}</p>
            <h2 className="font-display mt-5 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl" data-split="lines">
              {reviews.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500" data-reveal>{reviews.intro}</p>
          </div>

          {reviews.items.length > 0 ? (
            <div className="mt-14 space-y-5">
              <ReviewRow speed="-0.5" reviews={reviews.items.slice(0, 3)} />
              {reviews.items.length > 3 && <ReviewRow speed="0.4" reviews={reviews.items.slice(3, 6)} />}
            </div>
          ) : (
            /* Placeholder, not a quote. Add Testimonial documents in Sanity and
               the marquee above takes over automatically. */
            <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8 lg:px-10">
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center sm:px-12">
                <p className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">[ADD REAL TESTIMONIALS]</p>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-500">{reviews.emptyNote}</p>
              </div>
            </div>
          )}
        </section>

        {/* ============ 10 · FAQ ============ */}
        <section id="faq" className="relative overflow-hidden bg-neutral-100 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-display text-[11px] uppercase tracking-[0.28em] text-neutral-400" data-reveal>{faq.eyebrow}</p>
                <h2 className="font-display mt-5 max-w-xl text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl" data-split="lines">
                  {faq.heading}
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600" data-reveal>
                  {faq.intro}
                </p>
                <button type="button" onClick={openBookCall} data-magnetic data-cursor="Ask" className="mt-9 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white" data-reveal>
                  {faq.ctaLabel} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div ref={faqListRef} id="faqList" className="divide-y divide-neutral-300 border-y border-neutral-300">
                {faq.items.map((item, i) => (
                  <div key={item.q} className={`faq-item${i === 0 ? " is-open" : ""}`}>
                    <button type="button" className="faq-head flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left sm:py-7" aria-expanded={i === 0}>
                      <span className="font-display text-lg tracking-[-0.01em] text-neutral-900 sm:text-xl">{item.q}</span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 bg-white">
                        <svg className="faq-plus h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </span>
                    </button>
                    <div className="faq-body" style={i === 0 ? { height: "auto" } : { height: 0 }}>
                      <div className="max-w-2xl pb-7 pr-12 text-base leading-7 text-neutral-600">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 03 · MANIFESTO ============ */}
        <section id="manifesto" className="relative bg-white">
          <div className="mx-auto max-w-6xl px-5 py-[18vh] sm:px-8 lg:px-10">
            <p className="mb-10 font-display text-[11px] uppercase tracking-[0.28em] text-neutral-400" data-reveal>{manifesto.eyebrow}</p>
            <p id="manifestoText" className="font-display text-[7.2vw] font-medium leading-[1.06] tracking-[-0.025em] text-neutral-900 sm:text-5xl lg:text-[3.6rem]">
              {manifesto.text}
            </p>
          </div>
        </section>







        {/* ============ 07 · APERTURE ============ */}
        <section id="tech" className="relative bg-ink text-white">
          <div id="apPin" className="relative h-[100svh] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {ap.backdropUrl && (
              <img id="apBack" src={ap.backdropUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70" />
            )}
            <div className="absolute inset-0 bg-ink/45" />

            <div className="absolute inset-0 grid place-items-center">
              <div id="apStage" className="relative h-[86vmin] w-[86vmin] max-h-[92vw] max-w-[92vw]">
                <svg id="apSvg" viewBox="-120 -120 240 240" className="h-full w-full overflow-visible" aria-hidden="true">
                  <defs>
                    <clipPath id="apClip"><path id="apClipPath" d="M0 0Z" /></clipPath>
                    <linearGradient id="gBlade" x1="0" y1="0" x2="0.65" y2="1">
                      <stop offset="0%" stopColor="#3a3d43" />
                      <stop offset="28%" stopColor="#17191d" />
                      <stop offset="52%" stopColor="#25282d" />
                      <stop offset="74%" stopColor="#101216" />
                      <stop offset="100%" stopColor="#33363c" />
                    </linearGradient>
                    <linearGradient id="gEdge" x1="0" y1="0" x2="0.4" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,.85)" />
                      <stop offset="40%" stopColor="rgba(255,255,255,.22)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,.55)" />
                    </linearGradient>
                    <linearGradient id="gBarrel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4a4e55" />
                      <stop offset="45%" stopColor="#15171a" />
                      <stop offset="100%" stopColor="#3c4046" />
                    </linearGradient>
                    <radialGradient id="gScrim">
                      <stop offset="0%" stopColor="rgba(8,9,10,.80)" />
                      <stop offset="55%" stopColor="rgba(8,9,10,.34)" />
                      <stop offset="100%" stopColor="rgba(8,9,10,0)" />
                    </radialGradient>
                    <radialGradient id="gWell">
                      <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,.85)" />
                    </radialGradient>
                    <filter id="fGlint" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="1.6" />
                    </filter>
                    <filter id="fDof" x="-15%" y="-15%" width="130%" height="130%">
                      <feGaussianBlur id="apDof" stdDeviation="0" />
                    </filter>
                  </defs>

                  <g clipPath="url(#apClip)">
                    <g filter="url(#fDof)">
                      <image id="apPhoto" x="-96" y="-96" width="192" height="192" preserveAspectRatio="xMidYMid slice" />
                    </g>
                    <circle r="96" fill="url(#gWell)" />
                    <circle r="96" fill="url(#gScrim)" />
                  </g>

                  <path id="apBladeRing" fill="url(#gBlade)" fillRule="evenodd" />
                  <g id="apSeams" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={0.5} />
                  <path id="apEdge" fill="none" stroke="url(#gEdge)" strokeWidth={0.7} />
                  <g id="apGlints" filter="url(#fGlint)" />

                  <circle r="92.6" fill="none" stroke="url(#gBarrel)" strokeWidth={5} />
                  <circle r="95.4" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth={0.6} />
                  <circle r="89.6" fill="none" stroke="rgba(0,0,0,.85)" strokeWidth={1.2} />
                  <g id="apKnurl" stroke="rgba(255,255,255,.16)" strokeWidth={0.55} />

                  <g id="apScale" fill="rgba(255,255,255,.42)" fontSize={5.2} fontFamily="Inter Tight, Inter, sans-serif" textAnchor="middle" letterSpacing={0.5} />
                  <path d="M0 -100.5 L2.6 -105.5 L-2.6 -105.5 Z" fill="#ff6900" />
                </svg>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
              <div className="max-w-xl">
                <p id="apLabel" className="font-display text-[11px] uppercase tracking-[0.28em] text-acid">{ap.eyebrow}</p>
                <h2 id="apTitle" className="font-display mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-6xl">{ap.title}</h2>
                <p id="apCopy" className="mx-auto mt-5 max-w-md text-base leading-7 text-white/60">
                  {ap.copy}
                </p>
                <div id="apCtaWrap" className="mt-8 opacity-0">
                  <button
                    type="button"
                    onClick={openBookCall}
                    data-magnetic
                    data-cursor="Book"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-acid px-7 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white"
                  >
                    {ap.ctaLabel} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0">
              {ap.chips.map((chip, i) => {
                const Icon = [Aperture, Focus, Move3d, AudioLines][i] || Aperture;
                const place = [
                  "left-[6%] top-[18%] sm:left-[12%]",
                  "right-[6%] top-[26%] sm:right-[12%]",
                  "bottom-[24%] left-[6%] sm:left-[14%]",
                  "bottom-[18%] right-[6%] sm:right-[14%]",
                ][i];
                if (!place) return null;
                return (
                  <div key={chip} className={`ap-chip absolute ${place} rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs backdrop-blur`}>
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-acid" strokeWidth={1.5} /> {chip}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-[10px] uppercase tracking-[0.28em] text-white/35">
              <span id="apStop">f/11</span> · <span id="apPct">0</span>% open
            </div>
          </div>
        </section>







        {/* ============ 11 · STATEMENT ============ */}
        <section id="statement" className="relative overflow-hidden bg-neutral-100 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
            <p className="text-sm text-neutral-500" data-reveal>{statement.kicker}</p>
            <h2 className="font-display mx-auto mt-10 max-w-5xl text-[16vw] font-medium leading-[0.84] tracking-[-0.045em] text-neutral-900 sm:text-8xl lg:text-[9.5rem]" data-statement>
              {statement.lines.map((line, i) => (
                <span key={line} className="line-mask">
                  <span className={`line-inner${i === statement.lines.length - 1 ? " text-neutral-400" : ""}`}>{line}</span>
                </span>
              ))}
            </h2>
            <div className="mt-14 flex flex-wrap justify-center gap-3" data-stagger>
              <button type="button" onClick={openBookCall} data-magnetic data-cursor="Mail" className="inline-flex items-center gap-2 rounded-full border border-neutral-400 bg-white px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] transition hover:bg-ink hover:text-white">
                {statement.primaryCta} <Mail className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <a href="#lineup" data-magnetic data-cursor="Services" className="inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white">
                {statement.secondaryCta} <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="support"
        className="relative overflow-hidden bg-ink text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 72% 60%, rgba(255,255,255,.03), transparent 32%), radial-gradient(circle at 10% 90%, rgba(255,255,255,.02), transparent 26%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
          <div className="flex items-center gap-5">
            <span data-line className="h-px flex-1 origin-left bg-white/20" />
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25">
              <Sparkle className="h-5 w-5" strokeWidth={1.5} />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-4 lg:gap-x-20" data-stagger>
            {footer.columns.map((col) => (
              <FooterCol key={col.title} title={col.title} links={col.links} onBookCall={openBookCall} />
            ))}
          </div>

          <div className="relative grid min-h-72 overflow-hidden pb-10 pt-6 lg:grid-cols-[0.9fr_1.5fr] lg:items-end">
            <div className="relative z-10 max-w-md">
              <h2 className="font-display text-2xl leading-tight tracking-[-0.02em] sm:text-3xl" data-split="lines">
                {footer.ctaHeading}
              </h2>
              <p className="mt-4 text-base leading-7 text-white/55" data-reveal>{footer.ctaBody}</p>
              <form ref={formRef} id="subForm" className="mt-7 flex h-14 max-w-sm overflow-hidden rounded-xl border border-white/25 bg-white/[0.03] transition-colors focus-within:border-acid">
                <label htmlFor="footer-email" className="sr-only">Enter your email</label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-base text-white outline-none placeholder:text-white/40"
                />
                <button type="submit" aria-label="Subscribe" data-cursor="Send" className="grid w-14 shrink-0 place-items-center border-l border-white/20 transition hover:bg-acid hover:text-ink">
                  <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </form>
              <p ref={subMsgRef} id="subMsg" className="mt-3 h-5 font-display text-[10px] uppercase tracking-[0.2em] text-acid opacity-0">
                You are on the list.
              </p>
            </div>

            <div className="pointer-events-none relative mt-16 h-48 lg:mt-0 lg:h-64">
              <svg viewBox="0 0 900 320" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-full w-full text-white/[0.09]" fill="none">
                <path d="M20 190C112 22 224 36 337 126C449 215 536 27 666 59C760 82 827 163 884 211" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5" />
                <path d="M18 207C109 39 225 53 337 142C447 229 538 45 665 76C759 98 826 179 884 226" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5" />
                <path d="M16 224C108 57 224 70 337 159C447 245 539 63 665 92C757 114 826 195 884 241" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5" />
                <path d="M15 241C106 74 223 87 337 176C447 262 540 80 665 109C756 130 826 211 884 256" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5" />
                <path d="M14 258C105 91 223 104 337 193C447 278 541 97 665 126C755 147 826 227 884 271" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5" />
                <path d="M13 275C104 108 222 121 337 210C447 295 542 114 665 143C754 164 826 243 884 286" stroke="currentColor" strokeWidth={1} strokeDasharray="2 5" />
              </svg>
              <p
                id="footerWord"
                className="absolute inset-x-0 bottom-0 whitespace-nowrap text-center font-display text-8xl font-light leading-none tracking-[-0.04em] sm:text-9xl lg:text-[12rem]"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,.14)", color: "rgba(255,255,255,.06)" }}
              >
                {footer.wordmark}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex items-center gap-5">
              <a href="#top" aria-label="Veloc Media home" data-magnetic data-cursor="Top" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 font-display text-2xl font-light transition hover:border-acid hover:text-acid">V</a>
              <p className="text-sm text-white/50">© {new Date().getFullYear()} Veloc Media · A StateShift Ventures company</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {footer.socials.map((social) => (
                <SocialIcon
                  key={social.platform}
                  label={social.platform}
                  href={social.url}
                  path={SOCIAL_PATHS[social.platform] || ""}
                />
              ))}
            </div>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/50" aria-label="Legal">
              <a href="#" className="transition hover:text-white">Privacy</a><span className="text-white/25">/</span>
              <a href="#" className="transition hover:text-white">Terms</a><span className="text-white/25">/</span>
              <a href="#" className="transition hover:text-white">Accessibility</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** A `null` (or empty) href marks a CTA that opens the shared booking modal. */
function FooterCol({
  title,
  links,
  onBookCall,
}: {
  title: string;
  links: { label: string; href: string | null }[];
  onBookCall: () => void;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-4 font-display text-[10px] uppercase tracking-[0.22em]">
        <span className="h-1 w-1 rounded-full bg-acid" />
        {title}
      </h3>
      <nav className="mt-7 flex flex-col gap-4 text-base text-white/55" aria-label={title}>
        {links.map((l) =>
          l.href ? (
            <a key={l.label} href={l.href} className="w-fit transition hover:text-white">
              {l.label}
            </a>
          ) : (
            <button key={l.label} type="button" onClick={onBookCall} className="w-fit text-left transition hover:text-white">
              {l.label}
            </button>
          )
        )}
      </nav>
    </div>
  );
}

function SocialIcon({ label, href, path }: { label: string; href: string; path: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href || "#"}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-magnetic
      data-cursor={label}
      className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-white/25 text-white/70 transition-colors duration-500 hover:border-acid hover:text-ink"
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-acid transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-[15px] w-[15px]" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

type Review = { quote: string; initials: string; name: string; role: string };

function ReviewRow({ speed, reviews }: { speed: string; reviews: Review[] }) {
  return (
    <div className="marquee edge-fade flex w-max will-change-transform" data-marquee data-speed={speed} data-velocity>
      {[0, 1].map((pass) => (
        <div key={pass} aria-hidden={pass === 1} className="flex gap-5 pr-5">
          {reviews.map((r) => (
            <blockquote key={r.name} className="flex w-[86vw] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm sm:w-[26rem]">
              <p className="text-base leading-7 text-neutral-700">&ldquo;{r.quote}&rdquo;</p>
              <footer className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-medium text-white">{r.initials}</div>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="font-display text-[10px] uppercase tracking-[0.18em] text-neutral-400">{r.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      ))}
    </div>
  );
}

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";