// NOTE: the landing page is currently hand-edited in app/page.tsx, so the
// landingPage schema is intentionally NOT registered here. To put the homepage
// back on the CMS, re-add the import and the array entry below, restore the
// Studio list item in sanity/structure.ts, and wire app/page.tsx to
// landingPageQuery (both the schema and the query are still in the repo).
import workCategory from "./workCategory";
import caseStudy from "./caseStudy";
import testimonial from "./testimonial";
import caseStudiesPage from "./caseStudiesPage";
import aboutPage from "./aboutPage";

export const schemaTypes = [workCategory, caseStudy, testimonial, caseStudiesPage, aboutPage];
