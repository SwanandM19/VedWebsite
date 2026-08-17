import type { Metadata } from "next";
import { Manrope, League_Gothic } from "next/font/google";
import "./globals.css";
import BookCallProvider from "./components/BookCallProvider";

// Self-hosted by next/font (no requests to fonts.googleapis.com).
// Manrope carries body copy; League Gothic is the display face used by every
// `font-display` heading and eyebrow.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// League Gothic ships a single weight (400) with a width axis.
const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velocmedia.com";

const DESCRIPTION =
  "Veloc Media provides reliable media operations for sports organizations, including recruitment media, event content, league content and ongoing media partnerships.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Veloc Media | Sports Media Operations",
    template: "%s | Veloc Media",
  },
  description: DESCRIPTION,
  applicationName: "Veloc Media",
  openGraph: {
    title: "Veloc Media | Sports Media Operations",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Veloc Media",
    type: "website",
    locale: "en_US",
    // [ADD OG IMAGE] — add a 1200×630 share image to /public and reference it
    // here once brand artwork is finalised.
  },
  twitter: {
    card: "summary_large_image",
    title: "Veloc Media | Sports Media Operations",
    description: DESCRIPTION,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${leagueGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Only facts that are verifiably true of the company belong here. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Veloc Media",
              alternateName: "Veloc",
              url: SITE_URL,
              description: DESCRIPTION,
              parentOrganization: { "@type": "Organization", name: "StateShift Ventures" },
            }),
          }}
        />
        <BookCallProvider>{children}</BookCallProvider>
      </body>
    </html>
  );
}
