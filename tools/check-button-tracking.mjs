import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function findAstroFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return findAstroFiles(path);
      return entry.isFile() && entry.name.endsWith('.astro') ? [path] : [];
    })
    .sort();
}

const files = findAstroFiles('src');

const errors = [];
let trackedControls = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const lineAt = (index) => source.slice(0, index).split('\n').length;

  for (const match of source.matchAll(/<button\b[\s\S]*?>/g)) {
    const tag = match[0];
    // type=submit 由帶 data-ga-submit 的 form 統一記錄成功送出，避免按鈕 click
    // 與 form submit 重複計數；其餘按鈕都必須有自己的穩定代號。
    if (/type=["']submit["']/.test(tag)) continue;
    if (!tag.includes('data-ga-button')) {
      errors.push(`${file}:${lineAt(match.index)} 非 submit 按鈕缺少 data-ga-button`);
    }
  }

  for (const match of source.matchAll(/<(?:button|a)\b[^>]*\bdata-ga-button\b[^>]*>/g)) {
    trackedControls += 1;
    for (const attribute of ['data-ga-label', 'data-ga-location', 'data-ga-action']) {
      if (!match[0].includes(attribute)) {
        errors.push(`${file}:${lineAt(match.index)} data-ga-button 缺少 ${attribute}`);
      }
    }
    const literalId = match[0].match(/data-ga-button=["']([^"']+)["']/)?.[1];
    if (literalId && (!/^[a-zA-Z][a-zA-Z0-9_]{0,35}$/.test(literalId))) {
      errors.push(`${file}:${lineAt(match.index)} data-ga-button 必須是 36 字元內的英數底線代號，確保 btn_<id> 符合 GA4 事件名稱限制`);
    }
  }
}

if (errors.length > 0) {
  console.error(`按鈕統計檢查失敗（${errors.length} 項）：`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`按鈕統計檢查通過：${trackedControls} 個控制項皆有 GA4／CMS 所需標記。`);
