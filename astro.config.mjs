import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// TODO: 換成正式網域後記得同步更新 public/robots.txt 與 public/llms.txt
export default defineConfig({
  site: 'https://ai-beginner-course.zeabur.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
