import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Case Studies Page")
        .child(S.document().schemaType("caseStudiesPage").documentId("caseStudiesPage")),
      S.divider(),
      S.documentTypeListItem("workCategory").title("Work Categories"),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);
