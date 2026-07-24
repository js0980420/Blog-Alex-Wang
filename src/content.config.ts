import { defineCollection, z } from 'astro:content';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { marked } from 'marked';

// 標題加上錨點 id（保留中文），供文章目錄與搜尋結果「跳至某段」使用
function slugifyHeading(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugifyHeading(text)}">${text}</h${depth}>\n`;
    },
    // 引用區塊預設會有「複製」按鈕（提示詞用）；說明性質的引用在 markdown 開頭
    // 加 [!note] 標記，這裡會拿掉標記文字並標成 data-no-copy，前端就不加按鈕
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      const marker = body.match(/^<p>\s*\[!(?:note|備註|說明)\]\s*/i);
      if (marker) return `<blockquote data-no-copy>${body.replace(marker[0], '<p>')}</blockquote>\n`;
      return `<blockquote>${body}</blockquote>\n`;
    },
  },
});

// 文章來源：Directus CMS（cms.aixwang.dev）
// 在後台新增/修改文章後，觸發重新建置即可更新網站
const DIRECTUS_URL = 'https://cms.aixwang.dev';

const blog = defineCollection({
  loader: {
    name: 'directus-articles',
    load: async ({ store, parseData, generateDigest }) => {
      const fields = 'id,slug,title,description,body,pub_date,updated_date,tags,faqs,featured,status';
      // unlisted＝不公開文章：有網址就能看，但不進列表/RSS/sitemap/搜尋，頁面加 noindex
      const res = await fetch(
        `${DIRECTUS_URL}/items/articles?filter[status][_in]=published,unlisted&limit=-1&fields=${fields}`,
      );
      if (!res.ok) throw new Error(`Directus 文章抓取失敗：HTTP ${res.status}`);
      const { data } = (await res.json()) as { data: Record<string, any>[] };

      store.clear();

      for (const a of data) {
        const entry = await parseData({
          id: a.slug,
          data: {
            cmsId: a.id,
            title: a.title,
            description: a.description ?? '',
            pubDate: a.pub_date,
            updatedDate: a.updated_date ?? undefined,
            tags: a.tags ?? [],
            faqs: a.faqs ?? [],
            featured: !!a.featured,
            unlisted: a.status === 'unlisted',
          },
        });
        store.set({
          id: a.slug,
          data: entry,
          rendered: { html: marked.parse(a.body ?? '', { async: false }) },
          digest: generateDigest(a),
        });
      }

      // ─── 本地預覽注入（開發用，local-preview/ 不存在時自動跳過）───
      // 放在 Directus 之後，確保同 slug 的本地草稿能覆蓋 CMS 舊內容。
      try {
        const previewDir = fileURLToPath(new URL('../local-preview/', import.meta.url));
        if (existsSync(previewDir)) {
          for (const file of readdirSync(previewDir).filter((f) => f.endsWith('.md'))) {
            const raw = readFileSync(previewDir + file, 'utf-8');
            const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
            if (!m) continue;
            const fm = yaml.load(m[1]) as Record<string, any>;
            const body = raw.slice(m[0].length);
            const slug = file.replace(/\.md$/, '');
            const entry = await parseData({
              id: slug,
              data: {
                title: fm.title,
                description: fm.description ?? '',
                pubDate: fm.pubDate,
                updatedDate: fm.updatedDate ?? undefined,
                tags: fm.tags ?? [],
                faqs: fm.faqs ?? [],
                featured: !!fm.featured,
                unlisted: true,
              },
            });
            store.set({
              id: slug,
              data: entry,
              rendered: { html: marked.parse(body, { async: false }) },
              digest: generateDigest(raw),
            });
          }
        }
      } catch (e) {
        console.warn('本地預覽注入略過：', e);
      }
      // ─── 本地預覽注入結束 ───
    },
  },
  schema: z.object({
    // CMS 流水號：同日文章用它當第二排序鍵（越大越新）
    cmsId: z.number().optional(),
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
    // 不公開文章：僅網址可達，不出現在任何列表與索引
    unlisted: z.boolean().default(false),
  }),
});

export const collections = { blog };
