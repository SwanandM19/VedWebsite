
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PLACEHOLDER_IMAGES, PLACEHOLDER_HERO_VIDEO } from "./components/placeholders";
import { resolveVideo } from "./components/video-utils";
import {
  Menu,
  ArrowDownRight,
  Play,
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Sparkle,
} from "lucide-react";
import { useBookCall } from "./components/BookCallProvider";
import VideoLightbox from "./components/VideoLightbox";

/**
 * Veloc Media — Sports Media Operations. Homepage.
 *
 * All copy lives in the EDITABLE CONTENT block below and inline in the JSX,
 * so it can be changed by hand without touching the CMS. Imagery is in
 * app/components/placeholders.ts.
 *
 * Animated with GSAP + Lenis. The section ids (#hero, #lineup, #gallery,
 * #stories, #process, #reviews, #faq, #support) and the data-* attributes are
 * read by the scroll effects in the effect hook — keep them stable when editing.
 *
 * CONTENT RULE: no client, statistic, review or outcome may be claimed unless
 * verified. Unverified values ship as bracketed placeholders ("[X]+").
 */

// Icon paths for the footer social links. Only the platforms actually linked
// below need an entry here.
const SOCIAL_PATHS: Record<string, string> = {
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
};


// ======================================================================
// EDITABLE CONTENT
// Everything on this page is plain text right here in the file. Change a
// string, add or delete an item in one of these arrays, and the page updates.
// Imagery lives in app/components/placeholders.ts.
// ======================================================================

const HERO_VIDEO_SRC = PLACEHOLDER_HERO_VIDEO; // [ADD REAL VELOC SHOWREEL]
const HERO_POSTER = PLACEHOLDER_IMAGES.hero;

const TICKER = [
  "Recruitment media",
  "Event recap films",
  "Match highlights",
  "Athlete showcase reels",
  "Season recaps",
  "Ongoing media partnerships",
];

// Service cards. Add or remove an entry and the stack adapts.
// `featured: true` renders the card on the dark ink background.
const SERVICES = [
  {
    number: "01",
    kicker: "Colleges · academies · recruiting programs",
    meta: "Service 01",
    title: "Athlete Recruitment Media",
    copy: "Recruitment highlight videos, player showcases, position-specific reels, season highlights and full recruitment media packages — built to communicate an athlete's ability clearly.",
    ctaLabel: "Discuss a recruitment project",
    image: PLACEHOLDER_IMAGES.studioA,
    featured: false,
  },
  {
    number: "02",
    kicker: "Fitness · combat sports · tournaments",
    meta: "Service 02",
    title: "Event Media Operations",
    copy: "Event recap films, competitor highlights, hype and promotional edits, social clips, sponsor deliverables and awards edits. An event shouldn't end when the final whistle does.",
    ctaLabel: "Discuss an event",
    image: PLACEHOLDER_IMAGES.studioB,
    featured: false,
  },
  {
    number: "03",
    kicker: "Leagues · clubs · teams · academies",
    meta: "Service 03",
    title: "Sports",
    copy: "Match and game highlights, scoreboard-integrated content, player highlights, weekly match content and season recaps — produced to the same standard in week one and week twenty.",
    ctaLabel: "Discuss your season",
    image: PLACEHOLDER_IMAGES.kit,
    featured: false,
  },
];

// The pinned sideways-scrolling reels in the "See our work in motion"
// gallery. `video` accepts either a YouTube URL (regular or Shorts) or a
// direct hosted file — resolveVideo() in ./components/video-utils figures out
// which. Add a new entry by copying one of these; order sets scroll order.
const WORK_VIDEOS: { caption: string; alt: string; video: string }[] = [
  {
    caption: "BMX Event Highlight Reel",
    alt: "BMX event highlight reel",
    video: "https://youtube.com/shorts/xs4YR9nUxCw?feature=share",
  },
  {
    caption: "Hoka Marathon Recap",
    alt: "Hoka marathon recap hype edit",
    video: "https://youtube.com/shorts/JfxxtEtF3DQ?feature=share",
  },
  {
    caption: "Soccer Recruitment Tape",
    alt: "Soccer recruitment tape",
    video: "https://youtu.be/Pb99qRZGscU",
  },
  {
    caption: "CrossFit Event Recap",
    alt: "CrossFit event recap video",
    video: "https://res.cloudinary.com/fhboztke/video/upload/v1786992531/Nick_Crossfit_low_filesize.mp4",
  },
  {
    caption: "Wrestling Event Hype Video",
    alt: "Wrestling event hype video",
    video: "https://youtu.be/bSB59r7525A",
  },
  {
    caption: "Basketball Athlete Mixtape",
    alt: "Basketball athlete mixtape",
    video: "https://youtube.com/shorts/OtIkn0FIfu0?feature=share",
  },
];

const AUDIENCE_CHIPS = ["Recruitment programs", "Event organizers", "sports", "Ongoing partners"];

// "Why Veloc" editorial cards.
const WHY_ITEMS = [
  {
    eyebrow: "Sports understanding",
    title: "We know what we're watching",
    body: "We don't treat sports footage like generic footage. The context, the pace, the competition and the purpose behind the content all change how it should be cut.",
    alt: "Sports media operations",
    image: PLACEHOLDER_IMAGES.onLocation,
  },
  {
    eyebrow: "Purpose before production",
    title: "The objective decides the edit",
    body: "Before anything gets cut, we establish what the content has to accomplish. A recruitment reel and an event hype film are not the same job.",
    alt: "Planning the objective before the edit",
    image: PLACEHOLDER_IMAGES.fieldA,
  },
  {
    eyebrow: "Reliability & systems",
    title: "Repeatable, not heroic",
    body: "Professional execution, clear communication and delivering when we said we would are the product. We build workflows, so quality never depends on one person having a good week.",
    alt: "Repeatable post-production workflow",
    image: PLACEHOLDER_IMAGES.fieldB,
  },
  {
    eyebrow: "Long-term partnership",
    title: "A media team, not a vendor",
    body: "We want to be the team you rely on across a season and beyond — not the editor you hire for one video and re-brief every time.",
    alt: "Long-term media partnership",
    image: PLACEHOLDER_IMAGES.fieldC,
  },
];

// The three pillars of how Veloc works. Each one animates in as the rail
// behind them draws across the section on scroll.
const PROCESS_PILLARS = [
  {
    number: "01",
    title: "Understand",
    lead: "Before anything gets cut, we learn what we are actually looking at.",
    points: [
      "The sport, the event and the athlete",
      "What the content has to accomplish",
      "Who is going to watch it, and where",
    ],
  },
  {
    number: "02",
    title: "Execute",
    lead: "Our team runs the post-production against that plan, not around it.",
    points: [
      "Edit, grade, graphics and sound",
      "The right story, structure and pacing",
      "Quality control before it reaches you",
    ],
  },
  {
    number: "03",
    title: "Deliver",
    lead: "Finished assets, organized so your team can actually use them.",
    points: [
      "Platform-ready cuts and aspect ratios",
      "Clear and consistent file naming",
      "Reliable and on-time delivery",
    ],
  },
];

// Verified client reviews. Add a new one by copying an object below — quote,
// name, role (what the project was) and initials for the avatar.
const TESTIMONIALS: { quote: string; name: string; role: string; initials: string }[] = [
  {
    quote:
      "Veloc listened and was able to execute the video to fit our needs. Definitely recommend for anyone that is interested in a recruiting video.",
    name: "Sabrina D.",
    role: "Soccer Recruitment Video",
    initials: "SD",
  },
  {
    quote:
      "It was seamless working with Chris. He knows what he wants. A great client to work with. Looking forward to working together again!!",
    name: "Chris P.",
    role: "Basketball Athlete Season Highlights",
    initials: "CP",
  },
  {
    quote:
      "I highly recommend hiring them for all of your video needs! They made an athlete highlight video for my son and we were so happy with it. They took videos that I had that weren't the best quality and made an amazing video. They are extremely talented and an excellent communicator. I look forward to hiring them again for future videos and am going to recommend him for friends and family. Do not hesitate... hire him!!",
    name: "Elizabeth B.",
    role: "Athlete Highlight Video",
    initials: "EB",
  },
  {
    quote:
      "They were truly so kind and wonderful to work with. Professional, communicative, and incredibly helpful throughout the project. Followed instructions carefully, delivered exactly what I needed, and made the entire process feel smooth and stress-free. I really appreciated his responsiveness, positive attitude, and thoughtful approach. I'd absolutely work with them again and would gladly recommend to others.",
    name: "Hannah L.",
    role: "Game Footage Review",
    initials: "HL",
  },
  {
    quote: "Veloc perfectly captured the events emotions and energy into the content. Loved it!!",
    name: "Nick R.",
    role: "CrossFit Event Recap Highlight",
    initials: "NR",
  },
  {
    quote:
      "Veloc was great to work with! I sent them a drive link with a ton of hockey video clips, some music and photos. They were able to navigate through all the files and put together a highly detailed recruiting profile video for my son. The quality exceeded my expectations and I will definitely hire Veloc again in the future for edits.",
    name: "Liam D.",
    role: "Hockey Recruitment Video",
    initials: "LD",
  },
  {
    quote: "Dope work! Will be working again in the future.",
    name: "Sy M.",
    role: "Basketball League Hype Reels",
    initials: "SM",
  },
  {
    quote:
      "Veloc saw my vision and put it to life. Being a videographer, working with Veloc makes everything easier. I just shoot and they take care of everything else.",
    name: "Clara B.",
    role: "Media Operations for a Videographer",
    initials: "CB",
  },
  {
    quote: "Veloc was great to work with and delivered all deliverables on time and to a high standard.",
    name: "Ash J.",
    role: "Cinematic Wrestling Event Recaps & Hype Reels",
    initials: "AJ",
  },
];

const FAQS = [
  {
    q: "What types of sports organizations do you work with?",
    a: "Three groups: recruitment organizations (colleges, athletic departments, academies, recruiting programs, teams and coaches), event organizers (fitness competitions, boxing and MMA promotions, tournaments and multi-sport events), and leagues, clubs and teams producing content across a season.",
  },
  {
    q: "What kind of media do you produce?",
    a: "Recruitment and athlete showcase videos, event recap films and hype edits, match and player highlights, scoreboard-integrated content, season recaps, social-ready cuts and sponsor deliverables.",
  },
  {
    q: "Can you work with footage we already have?",
    a: "Yes — that is the core of what we do. We are a post-production operation. Send us what your team, your venue or your broadcast partner captured and we take it from there.",
  },
  {
    q: "Can you support us through a full season?",
    a: "Yes. Ongoing media partnerships are a deliberate part of how we work: monthly or seasonal support, recurring event coverage and dedicated creative capacity, so the standard holds from the first fixture to the last.",
  },
  {
    q: "How does the process work?",
    a: "Understand, plan, produce, review, deliver. We start by learning the sport, the organization and the objective, agree what needs to be created, execute the post-production, run it through quality control and your feedback, then deliver organized final assets. For ongoing clients, that loop becomes a repeatable operation.",
  },
  {
    q: "How do we get started?",
    a: "Book a discovery call. Tell us about your organization, your event or your season, and we'll work out together whether Veloc is the right fit.",
  },
];

// Footer link columns. `href: null` opens the booking modal instead of navigating.
const FOOTER_COLUMNS: { title: string; links: { label: string; href: string | null }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Athlete recruitment media", href: "#lineup" },
      { label: "Event media operations", href: "#lineup" },
      { label: "League & team media", href: "#lineup" },
      { label: "Ongoing partnerships", href: "#lineup" },
    ],
  },
  {
    title: "Organizations",
    links: [
      { label: "Recruitment programs", href: "#gallery" },
      { label: "Event organizers", href: "#gallery" },
      { label: "Leagues & teams", href: "#gallery" },
      { label: "Why Veloc", href: "#stories" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Our work", href: "/work" },
      { label: "Case studies", href: "/case-studies" },
      { label: "How we work", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Veloc", href: "/about" },
      { label: "How we work", href: "/about#process" },
      { label: "Our standard", href: "/about#principles" },
      { label: "Book a discovery call", href: null },
    ],
  },
];

const SOCIALS = [
  { platform: "Instagram", url: "https://www.instagram.com/velocmedia?igsh=engyZnc5ZWFmcTI4&igsi=engyZnc5ZWFmcTI4" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/velocmedia" },
];

export default function HomePage() {
  const { openBookCall } = useBookCall();
  // Slide clicked in the pinned track — drives the full-screen video player.
  const [activeVideo, setActiveVideo] = useState<{ src: string; caption: string } | null>(null);
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
      // First arrival only. Coming back to the homepage (or clicking the
      // logo) goes straight to the hero.
      const PRELOAD_KEY = "veloc:preloaded";

      function hasPreloaded() {
        try {
          return window.sessionStorage.getItem(PRELOAD_KEY) === "1";
        } catch {
          // Private browsing can throw on sessionStorage access.
          return false;
        }
      }

      function markPreloaded() {
        try {
          window.sessionStorage.setItem(PRELOAD_KEY, "1");
        } catch {
          /* ignore */
        }
      }

      /** Drops the preloader out of the way and reveals the hero directly. */
      function skipPreload() {
        if (preloaderRef.current) preloaderRef.current.style.display = "none";
        if (plPanelRef.current) plPanelRef.current.style.display = "none";
        revealHero();
      }

      function preload() {
        const num = root!.querySelector("#plNum") as HTMLElement;
        const fill = root!.querySelector("#plFill") as HTMLElement;
        const word = root!.querySelector("#plWord") as HTMLElement;
        const pre = preloaderRef.current;
        const panel = plPanelRef.current;
        if (!pre || !panel) return;
        const phases = ["Loading", "Syncing footage", "Checking audio", "Ready"];
        const counter = { v: 0 };

        markPreloaded();

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
        const darkSections = root!.querySelectorAll("#hero, #gallery, #process, #support");
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

        // The header stays visible for the whole page — it only compacts into
        // its pill form once past the hero. No hide-on-scroll.
        gsap.set(header, { y: 0 });

        ScrollTrigger.create({
          start: "top -80",
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
      // 10b · process — rail draws with scroll, pillars build in sequence
      // ---------------------------------------------------------------
      function processSection() {
        const section = root!.querySelector<HTMLElement>("#process");
        if (!section) return;

        // The rail is scrubbed, so it tracks the scroll position exactly
        // rather than running on its own clock.
        ["#processRail", "#processRailMobile"].forEach((sel, i) => {
          const rail = root!.querySelector<HTMLElement>(sel);
          if (!rail) return;
          gsap.fromTo(
            rail,
            { scaleX: i === 0 ? 0 : 1, scaleY: i === 0 ? 1 : 0 },
            {
              scaleX: 1,
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top 62%", end: "bottom 78%", scrub: 0.6 },
            }
          );
        });

        root!.querySelectorAll<HTMLElement>("[data-pillar]").forEach((pillar, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: pillar, start: "top 82%" } });

          tl.fromTo(
            pillar.querySelector("[data-pillar-dot]"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
            0
          )
            .fromTo(
              pillar.querySelector("[data-pillar-num]"),
              { yPercent: 40, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1.1, ease: EASE },
              0.05
            )
            .fromTo(
              pillar.querySelectorAll("h3, p"),
              { y: 34, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.0, ease: EASE, stagger: 0.08 },
              0.12
            )
            .fromTo(
              pillar.querySelectorAll("[data-pillar-point]"),
              { x: -16, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: EASE, stagger: 0.09 },
              0.3
            );

          // Slight parallax drift on the big numeral, so the columns do not
          // move as one flat block.
          gsap.to(pillar.querySelector("[data-pillar-num]"), {
            yPercent: -18 - i * 4,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
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
          // Scale/lift only — no brightness dip, so the card underneath keeps
          // its true colour as the next one slides over it.
          gsap.to(card.firstElementChild, {
            scale: 0.9,
            yPercent: -4,
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

        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const input = form.querySelector("input") as HTMLInputElement;
          const button = form.querySelector("button") as HTMLButtonElement | null;

          if (!input.value || !input.checkValidity()) {
            gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.35)" });
            return;
          }

          const email = input.value.trim();
          if (button) button.disabled = true;
          input.disabled = true;
          gsap.to(msg, { opacity: 0, duration: 0.2 });

          try {
            const res = await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");

            input.value = "";
            input.placeholder = "Thanks — you are on the list";
            msg.textContent = "Thanks. We have your email.";
            msg.classList.remove("text-red-400");
            msg.classList.add("text-acid");
          } catch (err) {
            msg.textContent = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            msg.classList.remove("text-acid");
            msg.classList.add("text-red-400");
            gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.35)" });
          } finally {
            if (button) button.disabled = false;
            input.disabled = false;
            gsap.to(msg, { opacity: 1, duration: 0.4 });
          }
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
          counters();
          processSection();
          stack();
          initMenu();
          initFAQ();
          initForm();
          watchResize();
          marquees();
          horizontal();
          footer();
          progress();
          grain();
          ScrollTrigger.refresh();
          if (hasPreloaded()) skipPreload();
          else preload();
        }, 30);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-white font-sans text-neutral-900 antialiased selection:bg-acid selection:text-ink">
      {/* ============ PRELOADER ============ */}
      <div id="preloader" ref={preloaderRef} className="fixed inset-0 z-[200] grid place-items-center bg-ink">
        <div className="w-full px-6 text-white">
          <div className="mx-auto flex max-w-[420px] items-end justify-between pb-5">
            <span id="plWord" className="font-display text-[14px] uppercase tracking-[0.24em] text-white/50">
              Loading
            </span>
            <span className="font-display text-[14px] tabular-nums tracking-[0.2em] text-white/80">
              <span id="plNum">0</span>%
            </span>
          </div>
          <div className="pl-bar mx-auto">
            <span id="plFill" />
          </div>
          <div className="mx-auto mt-6 max-w-[420px] overflow-hidden">
            <p className="font-display text-[13px] uppercase tracking-[0.24em] text-white/25">Veloc Media — Sports Media Operations</p>
          </div>
        </div>
      </div>
      <div ref={plPanelRef} className="pl-panel fixed inset-0 z-[199] origin-top bg-ink" />

      <VideoLightbox
        src={activeVideo?.src ?? null}
        caption={activeVideo?.caption}
        onClose={() => setActiveVideo(null)}
      />

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
              className="h-12 w-auto object-contain"
            />
          </a>

          <div id="navLinks" className="hidden items-center gap-1 md:flex">

            <Link
              href="/case-studies"
              className="font-display rounded-full px-4 py-2 text-[18px] uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
            >
              Case Studies
            </Link>

            <Link
              href="/about"
              className="font-display rounded-full px-4 py-2 text-[18px] uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
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
              className="nav-cta font-display hidden overflow-hidden rounded-full bg-white px-5 py-2.5 text-[18px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-acid sm:inline-flex"
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
            <Link href="/case-studies" className="font-display rounded-xl px-4 py-3 text-xl uppercase tracking-[0.1em] hover:bg-white/10">Case Studies</Link>
            <Link href="/about" className="font-display rounded-xl px-4 py-3 text-xl uppercase tracking-[0.1em] hover:bg-white/10">About</Link>
            <button type="button" onClick={openBookCall} className="font-display mt-3 rounded-xl bg-acid px-4 py-3 text-center text-xl uppercase tracking-[0.1em] text-ink">Book a call</button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ============ 01 · HERO ============ */}
        <section id="hero" className="relative h-[100svh] overflow-hidden bg-ink">
          <div className="hero-media absolute inset-0 will-change-transform">
            {HERO_VIDEO_SRC ? (
              <video
                id="heroImg"
                src={HERO_VIDEO_SRC}
                poster={HERO_POSTER}
                muted
                playsInline
                preload="metadata"
                loop
                autoPlay
                aria-label="Veloc Media sports work showreel"
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img id="heroImg" src={HERO_POSTER} alt="" aria-hidden="true" className="absolute inset-0 h-[112%] w-full object-cover" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div id="heroVeil" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

          <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:items-center lg:px-10 lg:pb-0">
            <div id="heroCopy" className="max-w-2xl text-white">
              <p className="mb-6 flex items-center gap-3 font-display text-[14px] font-medium uppercase tracking-[0.2em] text-acid" data-hero-el>
                <span id="heroRule" className="h-px w-10 origin-left bg-acid" />
                Sports Media Operations
              </p>
              <h1 className="font-display max-w-2xl text-6xl font-medium leading-[1.15] tracking-normal sm:text-7xl lg:text-8xl" data-split="lines">
                Media operations for sports organizations.
              </h1>
              <p className="mt-8 max-w-lg text-base leading-7 text-white/65 sm:text-lg" data-hero-el>
                Professional media for events, leagues, teams and recruitment programs — delivered with the reliability
                and sports understanding your organization deserves.
              </p>
              <div className="mt-10 flex flex-wrap gap-3" data-hero-el>
                <button
                  type="button"
                  onClick={openBookCall}
                  data-magnetic
                  data-cursor="Talk"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-acid"
                >
                  Talk to Veloc
                  <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.5} />
                </button>
                <a href="#gallery" data-magnetic data-cursor="Play" className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur transition-colors hover:bg-white hover:text-ink">
                  See our work
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-7 left-5 hidden font-display text-[13px] uppercase tracking-[0.2em] text-white/40 sm:left-8 lg:left-10 lg:block" data-hero-el>
            Athletes · Events · Sports
          </div>
          <div className="absolute bottom-7 right-5 hidden items-center gap-3 text-white/55 sm:right-8 lg:right-10 lg:flex" data-hero-el>
            <span className="font-display text-[13px] uppercase tracking-[0.2em]">Scroll to explore</span>
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25">
              <ArrowDown id="scrollArrow" className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </section>

        {/* ============ 02 · TRUST BAR ============ */}
        <section className="relative z-10 overflow-hidden border-y border-neutral-200 bg-white py-5">
          <div
            className="marquee edge-fade flex w-max will-change-transform"
            data-marquee
            data-speed="-0.6"
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                aria-hidden={i === 1}
                className="flex items-center gap-10 pr-10 font-display text-[15px] uppercase tracking-[0.18em] text-neutral-400"
              >
                {[
                  "50+ Clients Served",
                  "10+ Sports Covered",
                  "3+ Years of Experience",
                  "500+ Projects Delivered",
                  "1000+ Hours of Footage Processed",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-10">
                    <span>
                      {item.split(" ").map((word, index) => {
                        const isStat = index === 0;

                        return (
                          <span
                            key={`${item}-${index}`}
                            className={isStat ? "text-neutral-900" : ""}
                          >
                            {word}{" "}
                          </span>
                        );
                      })}
                    </span>

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
            <p className="font-display text-[14px] uppercase tracking-[0.2em] text-neutral-400" data-reveal> What we do</p>
            <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <h2 className="font-display max-w-3xl text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl" data-split="lines">
                Three ways organizations work with us.
              </h2>

            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8 lg:px-10">
            {SERVICES.map((item, i) => {
              const last = i === SERVICES.length - 1;
              return (
                <article
                  key={item.title}
                  className={`stack-card sticky${last ? "" : " mb-6"}`}
                  style={{ top: `${12 + i * 2}vh` }}
                  data-stack-card
                >
                  <div
                    className={`group grid overflow-hidden rounded-[2rem] border lg:grid-cols-[1.45fr_0.55fr] ${item.featured ? "border-neutral-800 bg-ink text-white" : "border-neutral-200 bg-white"
                      }`}
                  >
                    <div className="relative overflow-hidden bg-neutral-100">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          data-parallax-img
                          src={item.image}
                          alt={item.title}
                          className="h-[22rem] w-full scale-110 object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.16] sm:h-[30rem] lg:h-[34rem]"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="h-[22rem] w-full bg-ink sm:h-[30rem] lg:h-[34rem]"
                          style={{ backgroundImage: "radial-gradient(circle at 25% 20%, rgba(255,105,0,.26), transparent 60%)" }}
                        />
                      )}
                      <span
                        className={`absolute left-6 top-6 rounded-full px-3 py-1.5 font-display text-[13px] uppercase tracking-[0.2em] backdrop-blur ${item.featured ? "bg-acid text-ink" : "bg-black/45 text-white"
                          }`}
                      >
                        {item.number}
                      </span>
                    </div>
                    <div className="flex min-h-80 flex-col justify-between p-6 sm:p-8">
                      <div
                        className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b pb-4 ${item.featured ? "border-white/15" : "border-neutral-200"
                          }`}
                      >
                        <span
                          className={`font-display text-[13px] uppercase tracking-[0.2em] ${item.featured ? "text-white/45" : "text-neutral-400"
                            }`}
                        >
                          {item.kicker}
                        </span>
                        <span
                          className={`shrink-0 font-display text-[13px] uppercase tracking-[0.2em] ${item.featured ? "text-white/45" : "text-neutral-400"
                            }`}
                        >
                          {item.meta}
                        </span>
                      </div>
                      <div className="py-8">
                        <h3 className="font-display text-3xl font-medium leading-tight tracking-normal">{item.title}</h3>
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

        {/* ============ 06 · WHO WE SERVE (pinned horizontal) ============
        <section id="gallery" className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-3xl px-5 pt-24 text-center sm:px-8 sm:pt-32">
            <p className="font-display text-[14px] uppercase tracking-[0.2em] text-white/40" data-reveal>(04) — Who we serve</p>
            <h2 className="font-display mt-5 text-5xl font-medium leading-tight tracking-normal sm:text-6xl" data-split="lines">
              Built for organizations, not one-off briefs.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/55" data-reveal>
              Three kinds of organizations bring us the majority of their media. If one of them describes you, we already
              understand most of the problem.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-2.5" data-stagger>
              {AUDIENCE_CHIPS.map((t) => (
                <span key={t} className="rounded-full border border-white/20 px-4 py-2 font-display text-[13px] uppercase tracking-[0.18em] text-white/70">{t}</span>
              ))}
            </div>
          </div>

          <div id="hScroll" className="relative mt-16 h-[100svh] pb-0">
            <div className="flex h-full items-center overflow-hidden">
              <div id="hTrack" className="flex w-max items-center gap-5 px-5 sm:gap-7 sm:px-[12vw]">
                {AUDIENCE_SLIDES.map((fig, i) => {
                  const tall = i % 2 === 1;
                  return (
                    <figure
                      key={`${fig.caption}-${i}`}
                      className={`relative w-[78vw] overflow-hidden rounded-2xl ${tall ? "sm:w-[26rem]" : "sm:w-[34rem]"}`}
                    >
                      {fig.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          data-parallax-img
                          src={fig.image}
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
                        <span className="font-display text-base">{fig.caption}</span>
                        <span className="font-display text-[13px] uppercase tracking-[0.2em] text-white/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
                <div className="flex w-[70vw] shrink-0 flex-col justify-center gap-5 pr-5 sm:w-[24rem]">
                  <p className="font-display text-3xl font-medium leading-[1.2] tracking-normal sm:text-4xl">
                    Not sure where you fit? Tell us what you&apos;re trying to achieve.
                  </p>
                  <button
                    type="button"
                    onClick={openBookCall}
                    data-magnetic
                    data-cursor="Talk"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-display text-[13px] uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink"
                  >
                    Start a conversation <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-5 bottom-8 mx-auto hidden max-w-7xl items-center gap-4 sm:flex sm:px-3">
              <span className="font-display text-[13px] uppercase tracking-[0.18em] text-white/40">Drag / scroll</span>
              <span className="relative h-px flex-1 bg-white/15">
                <span id="hBar" className="absolute inset-y-0 left-0 block w-0 bg-acid" />
              </span>
            </div>
          </div>
        </section> */}
        {/* ============ 06 · VIDEO PORTFOLIO (pinned horizontal) ============ */}
        <section id="gallery" className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-3xl px-5 pt-24 text-center sm:px-8 sm:pt-32">
            <p
              className="font-display text-[14px] uppercase tracking-[0.2em] text-white/40"
              data-reveal
            >
              Our work
            </p>

            <h2
              className="font-display mt-5 text-5xl font-medium leading-tight tracking-normal sm:text-6xl"
              data-split="lines"
            >
              See our work in motion.
            </h2>

            <p
              className="mt-6 text-base leading-7 text-white/55"
              data-reveal
            >
              A selection of films, event coverage and social content created for
              sports organizations.
            </p>

            <div
              className="mt-9 flex flex-wrap justify-center gap-2.5"
              data-stagger
            >
              {AUDIENCE_CHIPS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 px-4 py-2 font-display text-[13px] uppercase tracking-[0.18em] text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div id="hScroll" className="relative mt-16 h-[100svh] pb-0">
            <div className="flex h-full items-center overflow-hidden">
              <div
                id="hTrack"
                className="flex w-max items-center gap-5 px-5 sm:gap-7 sm:px-[12vw]"
              >
                {WORK_VIDEOS.map((fig, i) => {
                  const video = resolveVideo(fig.video);
                  const tall = video?.kind === "youtube" ? video.vertical : i % 2 === 1;
                  const sizeClasses = tall
                    ? "h-[56vh] sm:h-[32rem]"
                    : "h-[46vh] sm:h-[26rem]";

                  return (
                    <figure
                      key={`${fig.caption}-${i}`}
                      className={`group relative overflow-hidden rounded-2xl bg-black ${tall ? "w-[78vw] sm:w-[26rem]" : "w-[86vw] sm:w-[34rem]"
                        }`}
                    >
                      {/* PREVIEW — direct files loop silently in the background;
                          YouTube sources show their thumbnail until clicked, so
                          we are not autoplaying multiple embedded iframes at once. */}
                      {video?.kind === "file" ? (
                        <video
                          src={video.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${sizeClasses}`}
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={video?.kind === "youtube" ? video.thumbnail : ""}
                          alt={fig.alt}
                          className={`w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-[1.14] ${sizeClasses}`}
                        />
                      )}

                      {/* DARK GRADIENT */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* CLICK TARGET — opens the full-screen player. Covers the whole
                  slide, and sits above the gradient so the whole card is
                  clickable. */}
                      <button
                        type="button"
                        onClick={() => setActiveVideo({ src: fig.video, caption: fig.caption })}
                        data-cursor="Play"
                        aria-label={`Play ${fig.caption}`}
                        className="absolute inset-0 z-10 grid place-items-center focus:outline-none"
                      >
                        <span className="grid h-16 w-16 place-items-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
                          <Play className="ml-0.5 h-6 w-6" strokeWidth={1.5} />
                        </span>
                      </button>

                      {/* CAPTION */}
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-5">
                        <span className="font-display text-base">
                          {fig.caption}
                        </span>

                        <span className="font-display text-[13px] uppercase tracking-[0.2em] text-white/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}

                {/* FINAL CTA */}
                <div className="flex w-[70vw] shrink-0 flex-col justify-center gap-5 pr-5 sm:w-[24rem]">
                  <p className="font-display text-3xl font-medium leading-[1.2] tracking-normal sm:text-4xl">
                    Like what you see? Let&apos;s create something together.
                  </p>

                  <button
                    type="button"
                    onClick={openBookCall}
                    data-magnetic
                    data-cursor="Talk"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-display text-[13px] uppercase tracking-[0.18em] transition hover:bg-white hover:text-ink"
                  >
                    Start a conversation
                    <ArrowRight
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* SCROLL PROGRESS */}
            <div className="pointer-events-none absolute inset-x-5 bottom-8 mx-auto hidden max-w-7xl items-center gap-4 sm:flex sm:px-3">
              <span className="font-display text-[13px] uppercase tracking-[0.18em] text-white/40">
                Drag / scroll
              </span>

              <span className="relative h-px flex-1 bg-white/15">
                <span
                  id="hBar"
                  className="absolute inset-y-0 left-0 block w-0 bg-acid"
                />
              </span>
            </div>
          </div>
        </section>

        {/* ============ 08 · WHY VELOC ============ */}
        <section id="stories" className="overflow-hidden bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[14px] uppercase tracking-[0.2em] text-neutral-400" data-type> Why Veloc</p>
            <div className="font-display max-w-3xl text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl">
              <span className="block" data-type data-type-delay="0.45">
                A normal editor waits for a brief,
              </span>

              <span className="block" data-type data-type-delay="0.8">
                We start with the objective.
              </span>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {WHY_ITEMS.map((item, i) => {
                const offset = i % 2 === 1;
                const rounded = offset
                  ? i % 4 === 1
                    ? "rounded-[3.5rem] rounded-bl-2xl"
                    : "rounded-[3.5rem] rounded-tr-2xl"
                  : "rounded-[2rem]";
                return (
                  <article key={item.title} className={`group${offset ? " md:mt-24" : ""}`} data-story>
                    <div className={`overflow-hidden bg-neutral-100 ${rounded}`} data-clip>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          data-parallax-img
                          src={item.image}
                          alt={item.alt}
                          className="aspect-[4/3] w-full scale-110 object-cover grayscale transition-all duration-[1.2s] group-hover:scale-[1.16] group-hover:grayscale-0"
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
                        <p data-type className="font-display text-[13px] uppercase tracking-[0.2em] text-neutral-400">{item.eyebrow}</p>
                        <h3 data-split="lines" className="font-display mt-2 text-3xl font-medium leading-tight tracking-normal">{item.title}</h3>
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
        {/* ============ 04 · PROCESS ============ */}
        <section id="process" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 15%, rgba(255,105,0,.16), transparent 55%), radial-gradient(circle at 88% 85%, rgba(255,255,255,.05), transparent 50%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[14px] uppercase tracking-[0.2em] text-acid" data-reveal>
              How we work
            </p>
            <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <h2 className="font-display max-w-3xl text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl" data-split="lines">
                Understand. Execute. Deliver.
              </h2>
              <p className="max-w-sm text-base leading-7 text-white/55" data-reveal>
                The same three stages run behind every engagement, whether it is one recruitment reel or a full season of
                league content.
              </p>
            </div>

            {/* The rail: draws left-to-right on desktop, top-to-bottom on mobile,
                scrubbed against scroll position. */}
            <div className="relative mt-20">
              <div className="pointer-events-none absolute inset-x-0 top-[3.25rem] hidden h-px bg-white/12 lg:block">
                <span id="processRail" className="absolute inset-0 block origin-left bg-acid" />
              </div>
              <div className="pointer-events-none absolute bottom-0 left-[1.4rem] top-6 w-px bg-white/12 lg:hidden">
                <span id="processRailMobile" className="absolute inset-0 block origin-top bg-acid" />
              </div>

              <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
                {PROCESS_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="relative pl-14 lg:pl-0" data-pillar>
                    {/* Node on the rail */}
                    <span
                      data-pillar-dot
                      className="absolute left-[0.9rem] top-6 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-ink ring-1 ring-white/25 lg:left-0 lg:top-[3.25rem] lg:-translate-y-1/2 lg:translate-x-0"
                    >
                      <span className="h-2 w-2 rounded-full bg-acid" />
                    </span>

                    <span
                      data-pillar-num
                      aria-hidden="true"
                      className="font-display block text-7xl font-light leading-none text-white/10 sm:text-8xl"
                    >
                      {pillar.number}
                    </span>

                    <div className="lg:pt-12">
                      <h3 className="font-display mt-6 text-4xl font-medium leading-tight tracking-normal sm:text-5xl">{pillar.title}</h3>
                      <p className="mt-4 max-w-sm text-base leading-7 text-white/60">{pillar.lead}</p>

                      <ul className="mt-7 space-y-3 border-t border-white/12 pt-6 text-sm leading-6 text-white/55">
                        {pillar.points.map((point) => (
                          <li key={point} className="flex items-start gap-3" data-pillar-point>
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acid" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 flex flex-col items-start gap-5 border-t border-white/12 pt-10 sm:flex-row sm:items-center sm:justify-between" data-reveal>
              <p className="max-w-xl text-base leading-7 text-white/55">
                For ongoing partners, this stops being a project and becomes a media operation that runs every week.
              </p>
              <button
                type="button"
                onClick={openBookCall}
                data-magnetic
                data-cursor="Talk"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white"
              >
                Talk to Veloc <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </section>

        {/* ============ 09 · REVIEWS ============ */}
        <section id="reviews" className="overflow-hidden border-y border-neutral-200 bg-neutral-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-display text-[14px] uppercase tracking-[0.2em] text-neutral-400" data-reveal> Client reviews</p>
            <h2 className="font-display mt-5 max-w-3xl text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl" data-split="lines">
              What organizations say after working with us.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500" data-reveal>Verified reviews from the organizations whose media we handle.</p>
          </div>

          {TESTIMONIALS.length > 0 ? (
            <div className="mt-14">
              <ReviewRow speed="-0.5" reviews={TESTIMONIALS} />
            </div>
          ) : (
            /* Placeholder, not a quote. Add Testimonial documents in Sanity and
               the marquee above takes over automatically. */
            <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8 lg:px-10">
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center sm:px-12">
                <p className="font-display text-[14px] uppercase tracking-[0.2em] text-acid">[ADD REAL TESTIMONIALS]</p>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-500">
                  Verified client reviews go here. We publish reviews as they are approved rather than writing them
                  ourselves — ask us on a call and we will walk you through the feedback we have received so far.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ============ 10 · FAQ ============ */}
        <section id="faq" className="relative overflow-hidden bg-neutral-100 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-display text-[14px] uppercase tracking-[0.2em] text-neutral-400" data-reveal> Questions</p>
                <h2 className="font-display mt-5 max-w-xl text-5xl font-medium leading-[1.15] tracking-normal sm:text-6xl" data-split="lines">
                  What organizations usually ask us first.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600" data-reveal>
                  Who we work with, what we produce, and how an engagement actually runs.
                </p>
                <button type="button" onClick={openBookCall} data-magnetic data-cursor="Ask" className="mt-9 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white" data-reveal>
                  Ask us directly <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div ref={faqListRef} id="faqList" className="divide-y divide-neutral-300 border-y border-neutral-300">
                {FAQS.map((item, i) => (
                  <div key={item.q} className={`faq-item${i === 0 ? " is-open" : ""}`}>
                    <button type="button" className="faq-head flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left sm:py-7" aria-expanded={i === 0}>
                      <span className="font-display text-xl tracking-normal text-neutral-900 sm:text-2xl">{item.q}</span>
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
            {FOOTER_COLUMNS.map((col) => (
              <FooterCol key={col.title} title={col.title} links={col.links} onBookCall={openBookCall} />
            ))}
          </div>

          <div className="relative grid min-h-72 overflow-hidden pb-10 pt-6 lg:grid-cols-[0.9fr_1.5fr] lg:items-end">
            <div className="relative z-10 max-w-md">
              <h2 className="font-display text-3xl leading-tight tracking-normal sm:text-4xl" data-split="lines">
                Sports media notes, straight to your inbox.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/55" data-reveal>Occasional notes on recruitment, event and league media. No noise.</p>
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
              <p ref={subMsgRef} id="subMsg" className="mt-3 h-5 font-display text-[13px] uppercase tracking-[0.2em] text-acid opacity-0">
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
                className="absolute inset-x-0 bottom-0 whitespace-nowrap text-center font-display text-7xl font-light leading-none tracking-normal sm:text-8xl lg:text-9xl"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,.14)", color: "rgba(255,255,255,.06)" }}
              >
                VELOC
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
              {SOCIALS.map((social) => (
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
      <h3 className="flex items-center gap-4 font-display text-[13px] uppercase tracking-[0.18em]">
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
                  <p className="font-display text-[13px] uppercase tracking-[0.18em] text-neutral-400">{r.role}</p>
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