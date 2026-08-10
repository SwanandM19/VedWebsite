import { defineField, defineType } from "sanity";

export default defineType({
  name: "workCategory",
  title: "Work Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "blurb", title: "Blurb", type: "string" }),
    defineField({ name: "count", title: "Project count label", type: "string", description: "e.g. \"12 projects\"" }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "blurb", media: "image" },
  },
});
