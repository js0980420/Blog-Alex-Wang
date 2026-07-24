import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directusResponse = await fetch(
  'https://cms.aixwang.dev/items/articles?filter[status][_in]=published,unlisted&limit=-1&fields=slug,updated_date,pub_date,status',
);
if (!directusResponse.ok) throw new Error(`Directus Sitemap 日期抓取失敗：HTTP ${directusResponse.status}`);
const { data: directusArticles } = await directusResponse.json();
const blogLastModified = new Map(
  directusArticles.map((article) => [
    `/blog/${article.slug}/`,
    article.updated_date ?? article.pub_date,
  ]),
);
// unlisted 文章：頁面照常產出（有網址可看），但不列入 sitemap
const unlistedPaths = new Set(
  directusArticles
    .filter((article) => article.status === 'unlisted')
    .map((article) => `/blog/${article.slug}/`),
);
// local-preview/ 的本地預覽文章一律視為 unlisted（正常情況不會進正式建置）
const previewDir = new URL('./local-preview/', import.meta.url);
if (existsSync(previewDir)) {
  for (const f of readdirSync(fileURLToPath(previewDir))) {
    if (f.endsWith('.md')) unlistedPaths.add(`/blog/${f.replace(/\.md$/, '')}/`);
  }
}

export default defineConfig({
  site: 'https://aixwang.dev',
  redirects: {
    '/blog/meta-api-application/': '/blog/threads-api-tutorial/',
  },
  // 預設全站仍是靜態預渲染；adapter 讓之後的 API 路由（如 /api/chat）能跑在 Cloudflare Workers
  adapter: cloudflare(),
  integrations: [
    sitemap({
      filter: (page) => !unlistedPaths.has(new URL(page).pathname),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = blogLastModified.get(pathname);

        return lastmod ? { ...item, lastmod: new Date(`${lastmod}T00:00:00Z`) } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
