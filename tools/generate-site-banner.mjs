import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const background = (
  await readFile(new URL('../src/assets/blog-banner/background.png', import.meta.url))
).toString('base64');
const instructor = (
  await readFile(new URL('../src/assets/blog-banner/instructor-transparent.png', import.meta.url))
).toString('base64');

// 全站預設 og 圖。版型比照 generate-page-banners.mjs（2026-07 定案）：無卡片；
// 主標一句話大字（依長度自動縮放）、副標小字藍條；
// 徽章、主標、副標、講師臉部、講師卡集中於中央 4:3 安全區（x=180–1020）；
// 人物固定 x=585 y=-65 w=700、講師卡固定 x=800 y=296。
// 輸出走 Astro 資產雜湊網址，內容變更即自動失效社群快取，不需版本號。
const page = {
  badge: '官方網站',
  title: 'AI 新手教學',
  subtitle: '把複雜工作流程，簡化成對話',
};

function units(text) {
  return [...text].reduce((w, ch) => {
    if (ch === ' ') return w + 0.3;
    return w + (/[⺀-鿿豈-﫿＀-￯]/.test(ch) ? 1 : 0.55);
  }, 0);
}

const TITLE_MAX_WIDTH = 525;
const badgeText = `新手學 AI｜${page.badge}`;
const badgeWidth = Math.round(48 + units(badgeText) * 28);
const titleSize = Math.min(84, Math.floor(TITLE_MAX_WIDTH / units(page.title)));
const subtitleWidth = Math.round(48 + units(page.subtitle) * 24);

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${background}" width="1200" height="630"/>
  <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
    <rect x="180" y="150" width="${badgeWidth}" height="62" rx="18" fill="#fff" fill-opacity=".94" stroke="#1657c8" stroke-width="3"/>
    <text x="204" y="191" fill="#1657c8" font-size="28">${badgeText}</text>
    <rect x="${180 + badgeWidth + 20}" y="147" width="68" height="68" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
    <text x="${180 + badgeWidth + 54}" y="194" fill="#1657c8" font-size="36" text-anchor="middle">AI</text>
    <text x="180" y="330" fill="#1657c8" font-size="${titleSize}">${page.title}</text>
    <rect x="180" y="368" width="${subtitleWidth}" height="50" rx="14" fill="#1657c8"/>
    <text x="204" y="402" fill="#fff" font-size="24">${page.subtitle}</text>
  </g>
  <image href="data:image/png;base64,${instructor}" x="585" y="-65" width="700" height="700"/>
  <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
    <rect x="800" y="296" width="150" height="52" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
    <text x="875" y="330" fill="#1657c8" font-size="21" text-anchor="middle">講師：Alex</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(fileURLToPath(new URL('../src/assets/banner-v2.png', import.meta.url)));

console.log('Generated src/assets/banner-v2.png (1200×630)');
