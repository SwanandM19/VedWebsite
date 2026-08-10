import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "missionEyebrow", title: "Mission eyebrow", type: "string", initialValue: "Our Mission" }),
    defineField({ name: "missionHeading", title: "Mission heading", type: "string" }),
    defineField({ name: "missionBody", title: "Mission body", type: "text", rows: 3 }),

    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 2 },
          ],
        },
      ],
      validation: (r) => r.max(6),
    }),

    defineField({ name: "founderName", title: "Founder name", type: "string" }),
    defineField({ name: "founderRole", title: "Founder role", type: "string" }),
    defineField({ name: "founderBio", title: "Founder bio", type: "text", rows: 4 }),
    defineField({
      name: "founderPhoto",
      title: "Founder photo",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "principles",
      title: "Company principles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: ["Compass", "Gauge", "Handshake", "ShieldCheck", "Sparkle", "Focus"],
              },
            },
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 2 },
          ],
        },
      ],
      validation: (r) => r.max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
