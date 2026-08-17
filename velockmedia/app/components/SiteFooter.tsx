import Link from "next/link";
import { Sparkle, ArrowRight } from "lucide-react";
import BookCallButton from "./BookCallButton";

// `href: null` marks a CTA that opens the shared book-a-call modal instead of
// navigating.
type FooterLink = { label: string; href: string | null };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Athlete recruitment media", href: "/#services" },
      { label: "Event media operations", href: "/#services" },
      { label: "League & team media", href: "/#services" },
      { label: "Ongoing partnerships", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Veloc", href: "/about" },
      { label: "How we work", href: "/about#process" },
      { label: "Our standard", href: "/about#principles" },
      { label: "The founder", href: "/about#founder" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Our work", href: "/work" },
      { label: "Case studies", href: "/case-studies" },
      { label: "FAQ", href: "/#faq" },
      { label: "Book a discovery call", href: null },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden bg-ink text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 72% 60%, rgba(255,255,255,.03), transparent 32%), radial-gradient(circle at 10% 90%, rgba(255,255,255,.02), transparent 26%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
        <div className="flex items-center gap-5">
          <span className="h-px flex-1 bg-white/20" />
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25">
            <Sparkle className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-3 lg:gap-x-20">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="flex items-center gap-4 font-display text-[13px] uppercase tracking-[0.18em]">
                <span className="h-1 w-1 rounded-full bg-acid" />
                {col.title}
              </h3>
              <nav className="mt-7 flex flex-col gap-4 text-base text-white/55" aria-label={col.title}>
                {col.links.map((l) =>
                  l.href === null ? (
                    <BookCallButton key={l.label} className="w-fit text-left transition hover:text-white">
                      {l.label}
                    </BookCallButton>
                  ) : (
                    <Link key={l.label} href={l.href} className="w-fit transition hover:text-white">
                      {l.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>

        <div className="relative grid min-h-72 overflow-hidden pb-10 pt-6 lg:grid-cols-[0.9fr_1.5fr] lg:items-end">
          <div className="relative z-10 max-w-md">
            <h2 className="font-display text-3xl leading-tight tracking-normal sm:text-4xl">
              Let&apos;s talk about your media.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/55">
              Tell us about your organization, project, event or season. We&apos;ll take a look and work out whether Veloc
              is the right fit.
            </p>
            <BookCallButton className="mt-7 inline-flex h-14 w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-white/25 bg-white/[0.03] px-5 text-base text-white transition-colors hover:border-acid">
              Book a discovery call
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </BookCallButton>
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
            <Link href="/" aria-label="Veloc Media home" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 font-display text-2xl font-light transition hover:border-acid hover:text-acid">
              V
            </Link>
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Veloc Media · A StateShift Ventures company
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/50" aria-label="Legal">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <span className="text-white/25">/</span>
            <a href="#" className="transition hover:text-white">Terms</a>
            <span className="text-white/25">/</span>
            <a href="#" className="transition hover:text-white">Accessibility</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
