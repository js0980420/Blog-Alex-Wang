import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// 從正式橫幅 public/images/blog/<slug>.png 衍生頁面用的最佳化圖：
// - <slug>.webp        1200×630 文章頁主圖（PNG 太重，會拖慢 LCP）
// - <slug>-thumb.webp   640×336 列表縮圖
// - <slug>-4x3.webp     840×630 } Google 文章富摘要建議的多長寬比 schema image，
// - <slug>-1x1.webp     630×630 } 靠右裁切保留講師人物
// build 與 dev 前自動執行；衍生圖不進 git（見 .gitignore）。

const BANNER_DIR = path.resolve('public/images/blog');
const VARIANTS = [
  { suffix: '.webp', width: 1200, height: 630, position: 'centre' },
  { suffix: '-thumb.webp', width: 640, height: 336, position: 'centre' },
  { suffix: '-4x3.webp', width: 840, height: 630, position: 'right' },
  { suffix: '-1x1.webp', width: 630, height: 630, position: 'right' },
];

await mkdir(BANNER_DIR, { recursive: true });
const files = (await readdir(BANNER_DIR)).filter((f) => f.endsWith('.png'));
let generated = 0;

for (const file of files) {
  const slug = file.replace(/\.png$/, '');
  const source = path.join(BANNER_DIR, file);
  const sourceMtime = (await stat(source)).mtimeMs;

  for (const variant of VARIANTS) {
    const output = path.join(BANNER_DIR, `${slug}${variant.suffix}`);
    const fresh = await stat(output)
      .then((s) => s.mtimeMs >= sourceMtime)
      .catch(() => false);
    if (fresh) continue;

    await sharp(source)
      .resize({
        width: variant.width,
        height: variant.height,
        fit: 'cover',
        position: variant.position,
      })
      .webp({ quality: 82 })
      .toFile(output);
    generated += 1;
  }
}

console.log(`橫幅衍生圖：${files.length} 篇來源，本次生成 ${generated} 張（其餘為最新快取）。`);
