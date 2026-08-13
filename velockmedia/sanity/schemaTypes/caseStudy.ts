import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", title: "Client", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "workCategory" }],
    }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "challenge", title: "The challenge", type: "text", rows: 4 }),
    defineField({ name: "solution", title: "The objective & approach", type: "text", rows: 4 }),
    defineField({
      name: "results",
      title: "Results",
      description: "Only real, measurable outcomes the client has confirmed. Leave empty rather than estimating — the section is hidden when empty.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "client", media: "image" },
  },
});
