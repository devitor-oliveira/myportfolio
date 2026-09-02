import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    topic: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    type: z.enum(["personal", "professional", "open-source", "freelance"]),
    title: z.string(),
    description: z.string(),
    year: z.coerce.date(),
    // update: z.coerce.date().optional(),
    liveURL: z.string().optional(),
    repositoryURL: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, projects };
