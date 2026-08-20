// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { ArrowLeft, ArrowUpRight } from "lucide-react";
// import SiteHeader from "../../components/SiteHeader";
// import SiteFooter from "../../components/SiteFooter";
// import BookCallButton from "../../components/BookCallButton";
// import { CASE_STUDIES as FALLBACK_CASE_STUDIES, type CaseStudy } from "../data";
// import { sanityFetch } from "../../../sanity/lib/client";
// import { imageUrl } from "../../../sanity/lib/image";
// import { caseStudiesFullQuery } from "../../../sanity/lib/queries";
// import type { SanityImageSource } from "@sanity/image-url";
// import { resolveVideo } from "../../components/video-utils";

// type SanityCaseStudy = Omit<CaseStudy, "image"> & { image?: SanityImageSource };

// async function getCaseStudies(): Promise<(CaseStudy | SanityCaseStudy)[]> {
//   const fetched = await sanityFetch<SanityCaseStudy[]>(caseStudiesFullQuery);
//   return fetched && fetched.length > 0 ? fetched : FALLBACK_CASE_STUDIES;
// }

// export async function generateStaticParams() {
//   const caseStudies = await getCaseStudies();
//   return caseStudies.map((cs) => ({ slug: cs.slug }));
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params;
//   const caseStudies = await getCaseStudies();
//   const cs = caseStudies.find((c) => c.slug === slug);
//   if (!cs) return {};
//   return { title: `${cs.client} — Case Study`, description: cs.summary };
// }

// export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const caseStudies = await getCaseStudies();
//   const index = caseStudies.findIndex((c) => c.slug === slug);
//   if (index === -1) notFound();

//   const cs = caseStudies[index];
//   // With a single published case study there is no "next" to link to.
//   const next = caseStudies.length > 1 ? caseStudies[(index + 1) % caseStudies.length] : null;
//   const image = typeof cs.image === "string" ? cs.image : imageUrl(cs.image, 1800);
//   const video = resolveVideo(cs.video);
//   const vertical = video?.kind === "youtube" && video.vertical;

//   return (
//     <div className="bg-white font-sans text-neutral-900 antialiased">
//       <SiteHeader />

//       <main>
//         <section className="mx-auto max-w-4xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-10">
//           <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900">
//             <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> All case studies
//           </Link>
//           <p className="font-display mt-8 text-[14px] uppercase tracking-[0.2em] text-acid">
//             {cs.category} · {cs.year}
//           </p>
//           <h1 className="font-display mt-5 text-5xl font-medium leading-tight tracking-normal sm:text-6xl">{cs.title}</h1>
//           <p className="mt-6 text-base leading-7 text-neutral-500">{cs.summary}</p>
//           <p className="mt-4 text-sm uppercase tracking-[0.18em] text-neutral-400">Client — {cs.client}</p>
//         </section>

//         <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
//           {video ? (
//             <div className={`overflow-hidden rounded-2xl bg-black ${vertical ? "mx-auto aspect-[9/16] max-w-sm" : "aspect-[16/9]"}`}>
//               {video.kind === "youtube" ? (
//                 <iframe
//                   src={`${video.embedUrl}?rel=0&modestbranding=1`}
//                   title={cs.title}
//                   className="h-full w-full"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   allowFullScreen
//                 />
//               ) : (
//                 <video src={video.url} controls playsInline className="h-full w-full object-cover" />
//               )}
//             </div>
//           ) : (
//             <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
//               <img src={image} alt={cs.title} className="h-full w-full object-cover" />
//             </div>
//           )}
//         </section>

//         <section className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10">
//           <div>
//             <h2 className="font-display text-3xl font-medium leading-tight tracking-normal">The challenge</h2>
//             <p className="mt-4 text-base leading-7 text-neutral-500">{cs.challenge}</p>
//           </div>
//           <div>
//             <h2 className="font-display text-3xl font-medium leading-tight tracking-normal">The objective &amp; approach</h2>
//             <p className="mt-4 text-base leading-7 text-neutral-500">{cs.solution}</p>
//           </div>
//         </section>

//         {/* Outcomes render only when verified figures exist for this project. */}
//         {cs.results && cs.results.length > 0 && (
//         <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8 lg:px-10">
//           <div className="grid grid-cols-3 gap-6 rounded-2xl bg-neutral-50 px-6 py-10 text-center sm:px-10">
//             {cs.results.map((r) => (
//               <div key={r.label}>
//                 <p className="font-display text-3xl font-medium tracking-normal sm:text-4xl">{r.value}</p>
//                 <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">{r.label}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//         )}

//         {next && (
//         <section className="border-t border-neutral-200">
//           <Link
//             href={`/case-studies/${next.slug}`}
//             className="group mx-auto flex max-w-4xl items-center justify-between gap-6 px-5 py-10 sm:px-8 lg:px-10"
//           >
//             <div>
//               <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">Next case study</p>
//               <p className="font-display mt-2 text-2xl font-medium tracking-normal">{next.title}</p>
//             </div>
//             <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-300 transition group-hover:text-acid" strokeWidth={1.5} />
//           </Link>
//         </section>
//         )}

//         <section className="relative overflow-hidden bg-ink text-white">
//           <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
//             <h2 className="font-display text-4xl font-medium leading-tight tracking-normal sm:text-5xl">Working on something similar?</h2>
//             <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
//               Tell us about your organization and what you are trying to achieve. We work out what the content needs to do
//               before we talk about how to make it.
//             </p>
//             <BookCallButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white">
//               Book a discovery call <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
//             </BookCallButton>
//           </div>
//         </section>
//       </main>

//       <SiteFooter />
//     </div>
//   );
// }


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import BookCallButton from "../../components/BookCallButton";
import { CASE_STUDIES as FALLBACK_CASE_STUDIES, type CaseStudy } from "../data";
import { sanityFetch } from "../../../sanity/lib/client";
import { imageUrl } from "../../../sanity/lib/image";
import { caseStudiesFullQuery } from "../../../sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";
import { resolveVideo } from "../../components/video-utils";

type SanityCaseStudy = Omit<CaseStudy, "image"> & {
  image?: SanityImageSource;
};

async function getCaseStudies(): Promise<(CaseStudy | SanityCaseStudy)[]> {
  const fetched = await sanityFetch<SanityCaseStudy[]>(caseStudiesFullQuery);
  return fetched && fetched.length > 0 ? fetched : FALLBACK_CASE_STUDIES;
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudies = await getCaseStudies();
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) return {};

  return {
    title: `${cs.title} — Case Study`,
    description: cs.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudies = await getCaseStudies();
  const index = caseStudies.findIndex((c) => c.slug === slug);

  if (index === -1) notFound();

  const cs = caseStudies[index];

  const next =
    caseStudies.length > 1
      ? caseStudies[(index + 1) % caseStudies.length]
      : null;

  const image =
    typeof cs.image === "string"
      ? cs.image
      : imageUrl(cs.image, 1800);

  const video = resolveVideo(cs.video);
  const vertical = video?.kind === "youtube" && video.vertical;

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      <SiteHeader />

      <main>
        {/* ==================== HERO ==================== */}
        <section className="mx-auto max-w-4xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            All case studies
          </Link>

          <p className="font-display mt-8 text-[14px] uppercase tracking-[0.2em] text-acid">
            {cs.category}
          </p>

          <h1 className="font-display mt-5 text-5xl font-medium leading-tight tracking-normal sm:text-6xl">
            {cs.title}
          </h1>

          <p className="mt-6 text-base leading-7 text-neutral-500">
            {cs.summary}
          </p>
        </section>

        {/* ==================== MEDIA ==================== */}
        <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          {video ? (
            <div
              className={`overflow-hidden rounded-2xl bg-black ${
                vertical
                  ? "mx-auto aspect-[9/16] max-w-sm"
                  : "aspect-[16/9]"
              }`}
            >
              {video.kind === "youtube" ? (
                <iframe
                  src={`${video.embedUrl}?rel=0&modestbranding=1`}
                  title={cs.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.url}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ) : (
            <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={image}
                alt={cs.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </section>

        {/* ==================== CHALLENGE / APPROACH ==================== */}
        <section className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10">
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-normal">
              The challenge
            </h2>

            <p className="mt-4 text-base leading-7 text-neutral-500">
              {cs.challenge}
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-normal">
              The objective &amp; approach
            </h2>

            <p className="mt-4 text-base leading-7 text-neutral-500">
              {cs.solution}
            </p>
          </div>
        </section>

        {/* ==================== OUTCOMES ==================== */}
        {cs.results && cs.results.length > 0 && (
          <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8 lg:px-10">
            <div className="grid grid-cols-3 gap-6 rounded-2xl bg-neutral-50 px-6 py-10 text-center sm:px-10">
              {cs.results.map((r) => (
                <div key={r.label}>
                  <p className="font-display text-3xl font-medium tracking-normal sm:text-4xl">
                    {r.value}
                  </p>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== NEXT CASE STUDY ==================== */}
        {next && (
          <section className="border-t border-neutral-200">
            <Link
              href={`/case-studies/${next.slug}`}
              className="group mx-auto flex max-w-4xl items-center justify-between gap-6 px-5 py-10 sm:px-8 lg:px-10"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                  Next case study
                </p>

                <p className="font-display mt-2 text-2xl font-medium tracking-normal">
                  {next.title}
                </p>
              </div>

              <ArrowUpRight
                className="h-6 w-6 shrink-0 text-neutral-300 transition group-hover:text-acid"
                strokeWidth={1.5}
              />
            </Link>
          </section>
        )}

        {/* ==================== CTA ==================== */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10">
            <h2 className="font-display text-4xl font-medium leading-tight tracking-normal sm:text-5xl">
              Working on something similar?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/60">
              Tell us about your organization and what you are trying to
              achieve. We work out what the content needs to do before we talk
              about how to make it.
            </p>

            <BookCallButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-white">
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </BookCallButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}