import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudiesPage",
  title: "Case Studies Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Case Studies" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 2 }),
    defineField({
      name: "metrics",
      title: "Metrics strip",
      description: "Only verified figures. Never estimate — leave the bracketed placeholder in place until the real number is known.",
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
  ],
  preview: {
    prepare: () => ({ title: "Case Studies Page" }),
  },
});
