import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { basename } from 'node:path';

const blogDirectory = new URL('./src/content/blog/', import.meta.url);
const blogLastModified = new Map(
  readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = readFileSync(new URL(file, blogDirectory), 'utf8');
      const updatedDate = source.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      const pubDate = source.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      return [`/blog/${basename(file, '.md')}/`, updatedDate ?? pubDate];
    }),
);

export default defineConfig({
  site: 'https://aixwang.dev',
  // 預設全站仍是靜態預渲染；adapter 讓之後的 API 路由（如 /api/chat）能跑在 Cloudflare Workers
  adapter: cloudflare(),
  integrations: [
    sitemap({
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
