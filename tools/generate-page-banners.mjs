import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const background = (
  await readFile(new URL('../src/assets/blog-banner/background.png', import.meta.url))
).toString('base64');
const instructor = (
  await readFile(new URL('../src/assets/blog-banner/instructor-transparent.png', import.meta.url))
).toString('base64');

const pages = [
  {
    file: 'home',
    badge: '官方網站',
    title: ['AI 新手教學', '從工具到自動化'],
    subtitle: '把複雜工作流程，簡化成對話',
    cards: ['Agent 安裝', 'API 串接', '自動發文', 'AI 圖文'],
  },
  {
    file: 'about',
    badge: '講師介紹',
    title: ['關於 AI 講師', 'Alex Wang'],
    subtitle: '從 AI 自學到全職接案',
    cards: ['AI 講師', '接案工程師', '社群版主', 'Tooka 作者'],
  },
  {
    file: 'blog',
    badge: '文章總覽',
    title: ['AI 新手部落格', '常見問題全解答'],
    subtitle: '每篇文章，解決一個真實問題',
    cards: ['工具選擇', 'API 申請', '自動發文', '工作流程'],
  },
  {
    file: 'one-on-one',
    badge: '教學服務',
    title: ['AI 一對一', '私人教學'],
    subtitle: '在你的電腦上，手把手做成功',
    cards: ['雙北實體', '線上教學', '手把手做', '客製進度'],
  },
  {
    file: 'faq',
    badge: '問題總整理',
    title: ['AI 新手', '常見問題總整理'],
    subtitle: '從真實社群提問找到答案',
    cards: ['課程費用', '工具選擇', 'API 申請', '自動發文'],
  },
];

const icons = [
  '<rect x="49" y="54" width="60" height="42" rx="5" fill="none" stroke="#1657c8" stroke-width="4"/><path d="M59 67h40M59 80h27" stroke="#1657c8" stroke-width="4" stroke-linecap="round"/>',
  '<path d="M52 91v-31l56-18v38M52 91h56M65 91V68h29v23" fill="none" stroke="#1657c8" stroke-width="4" stroke-linejoin="round"/>',
  '<path d="M50 78l18 18 40-46M50 56h22M50 67h14" fill="none" stroke="#1657c8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  '<circle cx="79" cy="73" r="28" fill="none" stroke="#1657c8" stroke-width="4"/><path d="M79 45v56M51 73h56M60 54l38 38M98 54L60 92" fill="none" stroke="#1657c8" stroke-width="4" stroke-linecap="round"/>',
];

function renderCard(label, index) {
  return `
    <g transform="translate(${54 + index * 170} 440)">
      <rect width="158" height="160" rx="18" fill="#fff" fill-opacity=".96" stroke="#75aef4" stroke-width="2"/>
      <circle cx="79" cy="30" r="18" fill="#1657c8"/>
      <text x="79" y="38" fill="#fff" font-size="20" text-anchor="middle">${index + 1}</text>
      ${icons[index]}
      <text x="79" y="137" fill="#0b1b4d" font-size="20" text-anchor="middle">${label}</text>
    </g>`;
}

function renderBanner(page) {
  return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <image href="data:image/png;base64,${background}" width="1200" height="630"/>
    <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
      <rect x="54" y="34" width="315" height="62" rx="18" fill="#fff" fill-opacity=".94" stroke="#1657c8" stroke-width="3"/>
      <text x="78" y="75" fill="#1657c8" font-size="28">新手學 AI｜${page.badge}</text>
      <text x="54" y="184" fill="#1657c8" font-size="64">${page.title[0]}</text>
      <text x="54" y="260" fill="#0b1b4d" font-size="64">${page.title[1]}</text>
      <rect x="54" y="286" width="545" height="58" rx="14" fill="#1657c8"/>
      <text x="78" y="325" fill="#fff" font-size="26">${page.subtitle}</text>
      ${page.cards.map(renderCard).join('')}
      <rect x="1108" y="28" width="68" height="68" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
      <text x="1142" y="75" fill="#1657c8" font-size="36" text-anchor="middle">AI</text>
    </g>
    <image href="data:image/png;base64,${instructor}" x="590" y="-65" width="700" height="700"/>
    <g font-family="'WenQuanYi Zen Hei', sans-serif" font-weight="700">
      <rect x="1022" y="183" width="150" height="52" rx="16" fill="#fff" fill-opacity=".95" stroke="#1657c8" stroke-width="3"/>
      <text x="1097" y="217" fill="#1657c8" font-size="21" text-anchor="middle">講師：Alex</text>
    </g>
  </svg>`;
}

const outputDir = fileURLToPath(new URL('../public/images/pages/', import.meta.url));
await mkdir(outputDir, { recursive: true });

for (const page of pages) {
  await sharp(Buffer.from(renderBanner(page)))
    .png()
    .toFile(`${outputDir}/${page.file}.png`);
  console.log(`Generated public/images/pages/${page.file}.png (1200×630)`);
}
