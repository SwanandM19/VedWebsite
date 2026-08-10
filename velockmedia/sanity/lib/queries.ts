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
