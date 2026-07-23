import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { statSync } from 'node:fs';
import path from 'node:path';
import { SITE } from '../consts';

// RSS feed：加速 Google 發現新文章，enclosure 附上各篇橫幅
export const prerender = true;

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('blog')).sort(
    (a, b) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf() ||
      (b.data.cmsId ?? 0) - (a.data.cmsId ?? 0),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      enclosure: {
        url: `${SITE.url}/images/blog/${post.id}.png`,
        length: statSync(path.resolve(`public/images/blog/${post.id}.png`)).size,
        type: 'image/png',
      },
    })),
  });
};
