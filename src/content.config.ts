import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    coverImage: z.string(),
    coverAlt: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
    author: z.string(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { articles };
