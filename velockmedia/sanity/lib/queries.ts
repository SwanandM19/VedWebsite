export const workCategoriesQuery = `*[_type == "workCategory"] | order(order asc){
  name,
  "slug": slug.current,
  blurb,
  count,
  image
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc){
  title,
  "slug": slug.current,
  client,
  "category": category->name,
  year,
  summary,
  image
}`;

export const caseStudySlugsQuery = `*[_type == "caseStudy"]{ "slug": slug.current }`;

export const caseStudiesFullQuery = `*[_type == "caseStudy"] | order(order asc){
  title,
  "slug": slug.current,
  client,
  "category": category->name,
  year,
  summary,
  image,
  challenge,
  solution,
  results
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  quote,
  name,
  role
}`;

export const caseStudiesPageQuery = `*[_type == "caseStudiesPage"][0]{
  eyebrow,
  heading,
  intro,
  metrics
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  missionEyebrow,
  missionHeading,
  missionBody,
  processSteps,
  founderName,
  founderRole,
  founderBio,
  founderPhoto,
  principles
}`;

// Landing page singleton. Images stay as raw image objects so `imageUrl()` can
// size them per slot; the hero video is resolved to a plain CDN URL here since
// it is used as-is.
export const landingPageQuery = `*[_type == "landingPage"][0]{
  heroEyebrow, heroHeading, heroBody, heroPrimaryCta, heroSecondaryCta, heroCaption,
  "heroVideoAssetUrl": heroVideo.asset->url,
  heroVideoUrl,
  heroPoster,
  ticker,

  servicesEyebrow, servicesHeading, servicesIntro,
  services[]{ number, kicker, meta, title, copy, ctaLabel, image, featured },

  audiencesEyebrow, audiencesHeading, audiencesIntro, audienceChips,
  audienceSlides[]{ caption, alt, image },
  audiencesOutroHeading, audiencesOutroCta,

  whyEyebrow, whyHeading, whyLinkLabel,
  whyItems[]{ eyebrow, title, body, alt, image },

  proofEyebrow, proofHeading, proofParagraphs,
  proofStats[]{ value, label },
  proofPanelTitle,
  proofSteps[]{ title, copy },

  reviewsEyebrow, reviewsHeading, reviewsIntro, reviewsEmptyNote,

  faqEyebrow, faqHeading, faqIntro, faqCtaLabel,
  faqs[]{ q, a },

  manifestoEyebrow, manifestoText,

  apertureEyebrow, apertureTitle, apertureCopy, apertureCtaLabel, apertureBackdrop, apertureChips,
  apertureOpenEyebrow, apertureOpenTitle, apertureOpenCopy,

  statementKicker, statementLines, statementPrimaryCta, statementSecondaryCta,

  footerColumns[]{ title, links[]{ label, href } },
  footerCtaHeading, footerCtaBody, footerWordmark,
  socialLinks[]{ platform, url }
}`;
