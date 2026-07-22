import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aixwang.dev',
  // 預設全站仍是靜態預渲染；adapter 讓之後的 API 路由（如 /api/chat）能跑在 Cloudflare Workers
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
