import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    // 標題直接用「使用者會問 AI 的問題句」
    title: z.string(),
    // 40–80 字直接回答問題：這段就是 AI Overview 最可能抽取的答案
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // 文末 FAQ，會輸出成 FAQPage JSON-LD
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
  }),
});

export const collections = { blog };
