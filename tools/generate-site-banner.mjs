import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const background = (
  await readFile(new URL('../src/assets/blog-banner/background.png', import.meta.url))
).toString('base64');
const instructor = (
  await readFile(new URL('../src/assets/blog-banner/instructor-transparent.png', import.meta.url))
).toString('base64');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${background}" width="1200" height="630"/>

  <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
    <rect x="54" y="34" width="285" height="62" rx="18" fill="#fff" fill-opacity=".94" stroke="#1657c8" stroke-width="3"/>
    <text x="78" y="75" fill="#1657c8" font-size="28">新手學 AI｜官方網站</text>

    <text x="54" y="186" fill="#1657c8" font-size="76">AI 新手教學</text>
    <text x="54" y="258" fill="#0b1b4d" font-size="58">從工具到自動化</text>

    <rect x="54" y="286" width="545" height="58" rx="14" fill="#1657c8"/>
    <text x="78" y="325" fill="#fff" font-size="27">把複雜工作流程，簡化成對話</text>

    <g transform="translate(54 440)">
      <g>
        <rect width="158" height="160" rx="18" fill="#fff" fill-opacity=".95" stroke="#75aef4" stroke-width="2"/>
        <circle cx="79" cy="30" r="18" fill="#1657c8"/>
        <text x="79" y="38" fill="#fff" font-size="20" text-anchor="middle">1</text>
        <rect x="54" y="58" width="50" height="35" rx="5" fill="none" stroke="#1657c8" stroke-width="4"/>
        <path d="M64 103h30M79 93v10" fill="none" stroke="#1657c8" stroke-width="4" stroke-linecap="round"/>
        <text x="79" y="137" fill="#0b1b4d" font-size="21" text-anchor="middle">AI Agent</text>
      </g>
      <g transform="translate(170)">
        <rect width="158" height="160" rx="18" fill="#fff" fill-opacity=".95" stroke="#75aef4" stroke-width="2"/>
        <circle cx="79" cy="30" r="18" fill="#1657c8"/>
        <text x="79" y="38" fill="#fff" font-size="20" text-anchor="middle">2</text>
        <path d="M48 62l62-21-20 63-15-25-27-17zM75 79l35-38" fill="none" stroke="#1657c8" stroke-width="4" stroke-linejoin="round"/>
        <text x="79" y="137" fill="#0b1b4d" font-size="21" text-anchor="middle">自動發文</text>
      </g>
      <g transform="translate(340)">
        <rect width="158" height="160" rx="18" fill="#fff" fill-opacity=".95" stroke="#75aef4" stroke-width="2"/>
        <circle cx="79" cy="30" r="18" fill="#1657c8"/>
        <text x="79" y="38" fill="#fff" font-size="20" text-anchor="middle">3</text>
        <rect x="48" y="52" width="62" height="48" rx="6" fill="none" stroke="#1657c8" stroke-width="4"/>
        <circle cx="65" cy="68" r="5" fill="#1657c8"/>
        <path d="M52 94l17-17 11 10 9-8 17 15" fill="none" stroke="#1657c8" stroke-width="4" stroke-linejoin="round"/>
        <text x="79" y="137" fill="#0b1b4d" font-size="21" text-anchor="middle">AI 圖文</text>
      </g>
      <g transform="translate(510)">
        <rect width="158" height="160" rx="18" fill="#fff" fill-opacity=".95" stroke="#75aef4" stroke-width="2"/>
        <circle cx="79" cy="30" r="18" fill="#1657c8"/>
        <text x="79" y="38" fill="#fff" font-size="20" text-anchor="middle">4</text>
        <circle cx="79" cy="67" r="13" fill="none" stroke="#1657c8" stroke-width="4"/>
        <path d="M52 104c3-18 51-18 54 0" fill="none" stroke="#1657c8" stroke-width="4" stroke-linecap="round"/>
        <text x="79" y="137" fill="#0b1b4d" font-size="21" text-anchor="middle">一對一教學</text>
      </g>
    </g>

    <rect x="1108" y="28" width="68" height="68" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
    <text x="1142" y="75" fill="#1657c8" font-size="36" text-anchor="middle">AI</text>
  </g>

  <image href="data:image/png;base64,${instructor}" x="590" y="-65" width="700" height="700"/>

  <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
    <rect x="1022" y="183" width="150" height="52" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
    <text x="1097" y="217" fill="#1657c8" font-size="21" text-anchor="middle">講師：Alex</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(fileURLToPath(new URL('../src/assets/banner-v2.png', import.meta.url)));

console.log('Generated src/assets/banner-v2.png (1200×630)');
