import { getCollection } from 'astro:content';

// 全站搜尋索引：header 搜尋框用（標題/描述/標籤）
export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.unlisted);
  const items = posts.map((p) => ({
    t: p.data.title,
    d: p.data.description,
    g: (p.data.tags ?? []).join(' '),
    u: `/blog/${p.id}/`,
  }));
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
