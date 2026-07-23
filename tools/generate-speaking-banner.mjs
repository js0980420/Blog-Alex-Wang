import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const background = (
  await readFile(new URL('../src/assets/blog-banner/background.png', import.meta.url))
).toString('base64');
const instructor = (
  await readFile(new URL('../src/assets/blog-banner/instructor-transparent.png', import.meta.url))
).toString('base64');

const cards = [
  ['企業內訓', '<rect x="48" y="53" width="62" height="43" rx="5" fill="none" stroke="#1657c8" stroke-width="4"/><path d="M58 66h42M58 78h30" stroke="#1657c8" stroke-width="4" stroke-linecap="round"/>'],
  ['社群講座', '<path d="M50 91v-30l58-19v38M50 91h58M64 91V67h30v24" fill="none" stroke="#1657c8" stroke-width="4" stroke-linejoin="round"/>'],
  ['實作工作坊', '<path d="M53 76l18 18 37-43M53 55h20M53 65h13" fill="none" stroke="#1657c8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'],
  ['客製化主題', '<path d="M79 48v51M53 74h52M61 56l36 36M97 56L61 92" fill="none" stroke="#1657c8" stroke-width="4" stroke-linecap="round"/><circle cx="79" cy="74" r="29" fill="none" stroke="#1657c8" stroke-width="4"/>'],
];

const cardSvg = cards
  .map(
    ([label, icon], index) => `
      <g transform="translate(${54 + index * 170} 440)">
        <rect width="158" height="160" rx="18" fill="#fff" fill-opacity=".96" stroke="#75aef4" stroke-width="2"/>
        <circle cx="79" cy="30" r="18" fill="#1657c8"/>
        <text x="79" y="38" fill="#fff" font-size="20" text-anchor="middle">${index + 1}</text>
        ${icon}
        <text x="79" y="137" fill="#0b1b4d" font-size="21" text-anchor="middle">${label}</text>
      </g>`,
  )
  .join('');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${background}" width="1200" height="630"/>

  <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
    <rect x="54" y="34" width="320" height="62" rx="18" fill="#fff" fill-opacity=".94" stroke="#1657c8" stroke-width="3"/>
    <text x="78" y="75" fill="#1657c8" font-size="28">新手學 AI｜演講邀約</text>

    <text x="54" y="184" fill="#1657c8" font-size="68">AI 演講與</text>
    <text x="54" y="260" fill="#0b1b4d" font-size="68">企業內訓</text>

    <rect x="54" y="286" width="520" height="58" rx="14" fill="#1657c8"/>
    <text x="78" y="325" fill="#fff" font-size="27">從概念到現場實作</text>

    ${cardSvg}

    <rect x="1074" y="28" width="68" height="68" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
    <text x="1108" y="75" fill="#1657c8" font-size="36" text-anchor="middle">AI</text>
  </g>

  <!-- 人物縮小並往內收，保留 LINE／社群縮圖裁切安全區 -->
  <image href="data:image/png;base64,${instructor}" x="600" y="10" width="620" height="620"/>

  <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
    <rect x="950" y="183" width="180" height="52" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
    <text x="1040" y="217" fill="#1657c8" font-size="21" text-anchor="middle">講師：Alex</text>
  </g>
</svg>`;

const { speaking: VERSION } = JSON.parse(
  await readFile(new URL('../src/data/banner-version.json', import.meta.url), 'utf8'),
);
const output = fileURLToPath(
  new URL(`../public/images/services/speaking-v${VERSION}.png`, import.meta.url),
);
await mkdir(fileURLToPath(new URL('../public/images/services/', import.meta.url)), {
  recursive: true,
});
await sharp(Buffer.from(svg)).png().toFile(output);

console.log(`Generated public/images/services/speaking-v${VERSION}.png (1200×630)`);
