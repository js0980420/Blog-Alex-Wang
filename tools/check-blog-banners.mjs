import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIRECTUS_URL = 'https://cms.aixwang.dev';
const BANNER_DIR = path.resolve('public/images/blog');
const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 630;
const PNG_SIGNATURE = '89504e470d0a1a0a';

const response = await fetch(
  `${DIRECTUS_URL}/items/articles?filter[status][_eq]=published&limit=-1&fields=slug`,
);

if (!response.ok) {
  throw new Error(`Directus 文章清單抓取失敗：HTTP ${response.status}`);
}

const payload = await response.json();
const slugs = payload.data.map((article) => article.slug).sort();
const filenames = new Set(await readdir(BANNER_DIR));
const errors = [];

for (const slug of slugs) {
  const filename = `${slug}.png`;
  if (!filenames.has(filename)) {
    errors.push(`缺少圖片：public/images/blog/${filename}`);
    continue;
  }

  const buffer = await readFile(path.join(BANNER_DIR, filename));
  const isPng = buffer.subarray(0, 8).toString('hex') === PNG_SIGNATURE;
  if (!isPng || buffer.length < 24) {
    errors.push(`格式錯誤：${filename} 不是有效 PNG`);
    continue;
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    errors.push(`尺寸錯誤：${filename} 是 ${width}×${height}，必須為 1200×630`);
  }
}

if (errors.length > 0) {
  console.error(`文章橫幅檢查失敗（${errors.length} 項）：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`文章橫幅檢查通過：${slugs.length} 篇 published 文章皆有 1200×630 PNG。`);
}
