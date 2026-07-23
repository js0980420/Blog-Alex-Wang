import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// ProfilePage 的 image 必須代表本人，不能使用帶文案的社群橫幅。
// 從真實講師照片產生 Google ProfilePage 建議的 16:9、4:3、1:1 高解析版本。
const source = path.resolve('src/assets/instructor-shirt.jpg');
const outputDir = path.resolve('public/images/profile');
const variants = [
  { file: 'alex-16x9.webp', width: 1200, height: 675 },
  { file: 'alex-4x3.webp', width: 840, height: 630 },
  { file: 'alex-1x1.webp', width: 630, height: 630 },
];

await mkdir(outputDir, { recursive: true });
const sourceMtime = (await stat(source)).mtimeMs;
let generated = 0;

for (const variant of variants) {
  const output = path.join(outputDir, variant.file);
  const fresh = await stat(output)
    .then((s) => s.mtimeMs >= sourceMtime)
    .catch(() => false);
  if (fresh) continue;

  await sharp(source)
    .resize({
      width: variant.width,
      height: variant.height,
      fit: 'cover',
      position: 'attention',
    })
    .webp({ quality: 84 })
    .toFile(output);
  generated += 1;
}

console.log(`講師個人照衍生圖：本次生成 ${generated} 張（其餘為最新快取）。`);
