import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// 自動生成文章橫幅「草稿」：遵循 docs/blog-banner-workflow.md 的鎖定版型，
// 底圖 + 程式排版文字 + 人物去背原圖合成，輸出 public/images/blog/<slug>.png，
// 之後由人工修圖定稿（可直接覆蓋同名檔案）。
//
// 用法：
//   npm run generate:banners                # 為所有缺圖的 published 文章生成草稿
//   npm run generate:banners -- --slug xxx  # 指定單篇（已存在時需加 --force）
//   npm run generate:banners -- --out-dir /tmp/preview  # 輸出到別處預覽
//
// 文案來源：tools/banner-copy.json 有指定就用指定的（badge/title/subtitle/steps），
// 沒有就從 Directus 欄位推導（badge=第一個 tag、title=文章標題、subtitle=描述句首）。

const DIRECTUS_URL = 'https://cms.aixwang.dev';
const WIDTH = 1200;
const HEIGHT = 630;
const BANNER_DIR = path.resolve('public/images/blog');
const ASSET_DIR = path.resolve('src/assets/blog-banner');
const FONT_PATH = path.resolve('tools/fonts/NotoSansTC-Bold.otf');
const FONT_URL =
  'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF/TC/NotoSansTC-Bold.otf';

const BLUE = '#1657c8';
const TITLE_BLUE = '#12409f';
const DARK = '#0b1b4d';

const args = process.argv.slice(2);
const getFlag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : (args[i + 1] ?? true);
};
const onlySlug = getFlag('--slug');
const force = args.includes('--force');
const outDir = getFlag('--out-dir') ? path.resolve(getFlag('--out-dir')) : BANNER_DIR;

async function exists(p) {
  return stat(p).then(() => true).catch(() => false);
}

// 字型只在本機生成時需要，缺檔時自動下載（約 5.6MB，不進 git）
async function loadFont() {
  if (!(await exists(FONT_PATH))) {
    console.log('下載 Noto Sans TC Bold 字型…');
    const res = await fetch(FONT_URL);
    if (!res.ok) throw new Error(`字型下載失敗：HTTP ${res.status}`);
    await mkdir(path.dirname(FONT_PATH), { recursive: true });
    await writeFile(FONT_PATH, Buffer.from(await res.arrayBuffer()));
  }
  return readFile(FONT_PATH);
}

// 沒有 banner-copy.json 指定時，從描述取一句當副標；
// 以排版寬度截斷（約 14 個全形字寬），保證藍底副標只佔一行
function deriveSubtitle(description) {
  if (!description) return '';
  let cut = description.split(/[。！？!?：:，,]/)[0].trim();
  if (measureUnits(cut) <= 14.5) return cut;
  while (cut.length > 0 && measureUnits(cut) > 13.5) cut = cut.slice(0, -1);
  return `${cut.trimEnd()}…`;
}

// 估算文字寬（CJK／全形 1、拉丁字約 0.55），優先排兩行；標題太長就退而求三行大字。
// 標題含 \n（人工指定斷行）時，改成讓最寬的那行單行放得下。
function measureUnits(text) {
  return [...text].reduce(
    (w, ch) => w + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/.test(ch) ? 1 : 0.55),
    0,
  );
}

function titleFontSize(title, maxWidth = 660) {
  const manualLines = title.split('\n');
  if (manualLines.length > 1) {
    const widest = Math.max(...manualLines.map(measureUnits));
    for (const size of [84, 76, 68, 60, 54, 48]) {
      if (widest * size <= maxWidth * 0.96) return size;
    }
    return 44;
  }
  const units = measureUnits(title);
  const fits = (size, lines) => units * size <= maxWidth * lines * 0.96;
  for (const size of [84, 76, 68, 60, 54]) if (fits(size, 2)) return size;
  for (const size of [54, 50, 46]) if (fits(size, 3)) return size;
  return 42;
}

function buildLayer(copy, fontData) {
  const stepCards = (copy.steps ?? []).slice(0, 4).map((label, i) => ({
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        backgroundColor: '#ffffff',
        border: `2px solid #dbeafe`,
        borderRadius: 22,
        padding: '22px 18px',
        width: 158,
        boxShadow: '0 8px 24px rgba(30,64,175,0.08)',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 999,
              backgroundColor: BLUE,
              color: '#ffffff',
              fontSize: 26,
            },
            children: String(i + 1),
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: 24,
              lineHeight: 1.3,
              color: DARK,
              textAlign: 'center',
            },
            children: label,
          },
        },
      ],
    },
  }));

  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        position: 'relative',
        fontFamily: 'Noto Sans TC',
      },
      children: [
        // 左欄流式排版：徽章→標題→副標→卡片，依內容高度自動往下排，不會互相重疊
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 54,
              top: 40,
              width: 660,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 24,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    backgroundColor: '#ffffff',
                    border: `3px solid ${BLUE}`,
                    borderRadius: 999,
                    padding: '10px 30px',
                    fontSize: 30,
                    color: BLUE,
                  },
                  children: `新手學 AI｜${copy.badge}`,
                },
              },
              // 主標題：spec 可用 \n 指定斷行；字級自動縮放（優先兩行、最長三行）
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: 660,
                    fontSize: titleFontSize(copy.title),
                    lineHeight: 1.22,
                    color: TITLE_BLUE,
                  },
                  children: copy.title.split('\n').map((line) => ({
                    type: 'div',
                    props: { style: { display: 'flex' }, children: line },
                  })),
                },
              },
              copy.subtitle
                ? {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        backgroundColor: BLUE,
                        borderRadius: 14,
                        padding: '12px 28px',
                        fontSize: 38,
                        color: '#ffffff',
                      },
                      children: copy.subtitle,
                    },
                  }
                : null,
              stepCards.length > 0
                ? {
                    type: 'div',
                    props: {
                      style: { display: 'flex', gap: 16 },
                      children: stepCards,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // 右上 AI 小方塊
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 690,
              top: 52,
              display: 'flex',
              backgroundColor: '#ffffff',
              border: '2px solid #c9dcf5',
              borderRadius: 16,
              padding: '8px 20px',
              fontSize: 32,
              color: TITLE_BLUE,
            },
            children: 'AI',
          },
        },
        // 講師卡（在人物圖層之下，人物會壓住右緣）
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 596,
              top: 424,
              display: 'flex',
              backgroundColor: '#ffffff',
              border: '2px solid #dbeafe',
              borderRadius: 24,
              padding: '20px 34px',
              fontSize: 34,
              color: TITLE_BLUE,
              boxShadow: '0 8px 24px rgba(30,64,175,0.08)',
            },
            children: '講師：Alex',
          },
        },
      ].filter(Boolean),
    },
  };
}

async function generate(article, fontData, background, instructor) {
  const copySpec = specs[article.slug] ?? {};
  const copy = {
    badge: copySpec.badge ?? article.tags?.[0] ?? 'AI 新手',
    title: copySpec.title ?? article.title,
    subtitle: copySpec.subtitle ?? deriveSubtitle(article.description),
    steps: copySpec.steps ?? [],
  };

  const svg = await satori(buildLayer(copy, fontData), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [{ name: 'Noto Sans TC', data: fontData, weight: 700, style: 'normal' }],
  });

  const textLayer = await sharp(Buffer.from(svg)).png().toBuffer();
  const output = path.join(outDir, `${article.slug}.png`);

  await sharp(background)
    .composite([
      { input: textLayer, left: 0, top: 0 },
      { input: instructor, left: WIDTH - 520, top: HEIGHT - 560 },
    ])
    .png()
    .toFile(output);

  console.log(`✓ ${path.relative(process.cwd(), output)}（badge=${copy.badge}）`);
}

// ---- 主流程 ----
const [fontData, specs] = await Promise.all([
  loadFont(),
  readFile(path.resolve('tools/banner-copy.json'), 'utf8')
    .then(JSON.parse)
    .catch(() => ({})),
]);

for (const asset of ['background.png', 'instructor-transparent.png']) {
  if (!(await exists(path.join(ASSET_DIR, asset)))) {
    throw new Error(`缺少素材 src/assets/blog-banner/${asset}（只留本機，見 .gitignore）`);
  }
}

const background = await sharp(path.join(ASSET_DIR, 'background.png'))
  .resize(WIDTH, HEIGHT)
  .toBuffer();
// 人物只能等比縮放後直接貼上（防失真），不得重繪
const instructor = await sharp(path.join(ASSET_DIR, 'instructor-transparent.png'))
  .resize({ height: 560 })
  .toBuffer();

const res = await fetch(
  `${DIRECTUS_URL}/items/articles?filter[status][_eq]=published&limit=-1&fields=slug,title,description,tags`,
);
if (!res.ok) throw new Error(`Directus 文章抓取失敗：HTTP ${res.status}`);
let { data: articles } = await res.json();

if (onlySlug) {
  articles = articles.filter((a) => a.slug === onlySlug);
  if (articles.length === 0) throw new Error(`找不到 published 文章：${onlySlug}`);
}

await mkdir(outDir, { recursive: true });
let generated = 0;
for (const article of articles) {
  const target = path.join(outDir, `${article.slug}.png`);
  if (!force && (await exists(target))) continue;
  await generate(article, fontData, background, instructor);
  generated += 1;
}

console.log(
  generated > 0
    ? `完成：生成 ${generated} 張草稿。請人工檢查／修圖後再 commit，並執行 npm run check:banners。`
    : '所有 published 文章都已有橫幅，未生成任何草稿（指定單篇請用 --slug <slug> --force）。',
);
