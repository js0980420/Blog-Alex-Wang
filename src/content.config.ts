import { defineCollection, z } from 'astro:content';
import { marked } from 'marked';

// 文章來源：Directus CMS（cms.aixwang.dev）
// 在後台新增/修改文章後，觸發重新建置即可更新網站
const DIRECTUS_URL = 'https://cms.aixwang.dev';

const blog = defineCollection({
  loader: {
    name: 'directus-articles',
    load: async ({ store, parseData, generateDigest }) => {
      const fields = 'slug,title,description,body,pub_date,updated_date,tags,faqs,featured';
      const res = await fetch(
        `${DIRECTUS_URL}/items/articles?filter[status][_eq]=published&limit=-1&fields=${fields}`,
      );
      if (!res.ok) throw new Error(`Directus 文章抓取失敗：HTTP ${res.status}`);
      const { data } = (await res.json()) as { data: Record<string, any>[] };

      store.clear();
      for (const a of data) {
        const entry = await parseData({
          id: a.slug,
          data: {
            title: a.title,
            description: a.description ?? '',
            pubDate: a.pub_date,
            updatedDate: a.updated_date ?? undefined,
            tags: a.tags ?? [],
            faqs: a.faqs ?? [],
            featured: !!a.featured,
          },
        });
        store.set({
          id: a.slug,
          data: entry,
          rendered: { html: marked.parse(a.body ?? '', { async: false }) },
          digest: generateDigest(a),
        });
      }
    },
  },
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
    // 精選文章：部落格列表置頂顯示
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
