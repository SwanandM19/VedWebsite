"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X as XIcon } from "lucide-react";
import BookCallButton from "./BookCallButton";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <nav
  className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"
  aria-label="Main navigation"
>
  {/* Logo */}
  <Link
    href="/"
    className="flex items-center gap-3 text-neutral-900"
  >
    <img
      src="/FinalLogo.png"
      alt="Veloc Media"
      className="h-[38px] w-auto object-contain"
    />
  </Link>

  {/* Desktop Navigation */}
  <div className="hidden items-center gap-1 md:flex">
    {NAV_LINKS.map((link) => {
      const active =
        pathname === link.href ||
        pathname.startsWith(link.href + "/");

      return (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition ${
            active
              ? "text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {link.label}
        </Link>
      );
    })}
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-3">
    <BookCallButton
      className="hidden overflow-hidden rounded-full bg-ink px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-acid hover:text-ink sm:inline-flex"
    >
      Book a call
    </BookCallButton>

    {/* Mobile Menu Button */}
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 text-neutral-900 md:hidden"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      {open ? (
        <XIcon
          className="h-5 w-5"
          strokeWidth={1.5}
        />
      ) : (
        <Menu
          className="h-5 w-5"
          strokeWidth={1.5}
        />
      )}
    </button>
  </div>
</nav>

      {open && (
        <div className="mx-5 mb-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            ))}
            <BookCallButton
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-ink px-4 py-3 text-center text-sm font-medium text-white"
            >
              Book a call
            </BookCallButton>
          </div>
        </div>
      )}
    </header>
  );
}
