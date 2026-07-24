# 新文章橫幅工作流

每篇 Directus 已發布文章都使用一張人工確認過的靜態社群預覽圖。正式圖片網址為：

```text
https://aixwang.dev/images/blog/<slug>.png
```

網站不在 build 時自動設計橫幅。新增文章時，橫幅是發布流程的一部分。

## 鎖定規格

- 輸出格式：PNG
- 尺寸：1200×630（1.91:1）
- 檔名：`<Directus slug>.png`
- 正式目錄：`public/images/blog/`
- 背景：`src/assets/blog-banner/background.png`
- 人物：`src/assets/blog-banner/instructor-transparent.png`
- 主要版型參考：
  - `public/images/blog/threads-api-tutorial.png`
  - `public/images/blog/instagram-api-tutorial.png`

人物必須直接使用透明 PNG 原圖合成，只能等比例縮放與定位，不得交給生圖模型重畫、修臉或補衣服。
文字和卡片必須用程式渲染，不得讓生圖模型畫中文字。

## 版面規則（2026-07 改版：無卡片、安全區集中）

1. **無重點式卡片**——分享預覽被平台裁切時卡片會被切壞，已全面移除。
2. 內容集中於中央 4:3 安全區（x=180 起，文字欄寬 510）：
   - 第一列：「新手學 AI｜文章分類」徽章＋「AI」小方塊。
   - 主標題：優先兩行、最長三行，字級依長度自動縮放；spec 可用 `\n` 指定斷行。
   - 標題下方一行小字藍底白字副標。
3. 人物與講師卡與頁面圖一致：人物等效 `x=585 y=-65 w=700`，
   「講師：Alex」卡固定 `x=800 y=296` 浮於人物胸前。
4. 所有重點內容在中央 4:3 裁切下必須完整，縮小預覽時仍可辨識。

## 新文章製作步驟

1. 在 Directus 確定文章最終 `slug`、標題、description 與主要重點。
2. （建議）在 `tools/banner-copy.json` 為該 slug 指定文案：
   - `badge`：短分類名稱。
   - `title`：兩行以內的橫幅主標題，可用 `\n` 指定斷行位置。
   - `subtitle`：一句藍底白字副標。
   - `steps`：3–4 個步驟卡文字。
   沒有指定時，會自動從文章標題、description 與第一個 tag 推導（字級自動縮放）。
3. 自動生成草稿：

   ```bash
   npm run generate:banners                       # 為所有缺圖文章生成
   npm run generate:banners -- --slug <slug> --force  # 重生指定單篇
   ```

   腳本會用鎖定背景 + 程式排版文字 + 透明人物原圖（只等比縮放）合成
   1200×630 PNG，直接輸出到 `public/images/blog/<slug>.png`。
4. 人工修圖定稿：直接用任何工具編輯同名 PNG 覆蓋即可；改文案就更新
   `banner-copy.json` 後重新生成。需要新背景時才使用生圖模型，且 prompt 必須要求：
   - 無人物、無文字、字母、數字、Logo 或文字狀圖案。
   - 白色與淡藍色 AI 教育風格；左側留文字空間、右側留人物空間。
5. 人工檢查：
   - 人臉、髮型和衣服與透明原圖完全一致。
   - 中文無錯字。
   - 圖片沒有被拉伸。
   - 卡片寬高、數字、圖案、文字和間距一致。
   - 檔名與 Directus slug 完全一致。
6. 在文章設為 published 或部署前執行：

   ```bash
   npm run check:banners
   npm run build
   ```

7. 正式發布並確認文章網址與封面皆回傳 HTTP 200 後：
   - 從 `https://aixwang.dev/images/blog/<slug>.png` 下載正式封面。
   - 儲存到 Windows 的 `C:\Users\js098\Downloads\<slug>.png`。
   - 將圖片本身複製到 Windows 剪貼簿，方便直接貼到 Threads、Facebook 或其他社群。
   - 完成回報需同時註明下載位置與剪貼簿是否成功。

## 驗證機制

`npm run check:banners` 會讀取 Directus 所有 published 文章，逐篇檢查：

- 同 slug 的 PNG 是否存在。
- PNG 是否真的是 1200×630。

`npm run build` 和 `npm run deploy` 都會先執行這項檢查。缺圖或尺寸錯誤時必須修正圖片，
不可用全站預設橫幅掩蓋問題。

## 頁面／演講／全站分享圖（非文章）

由三支生成器程式產生，版型規則寫死在程式裡，改版直接改生成器重跑：

- `tools/generate-page-banners.mjs`：首頁、關於、部落格、FAQ、一對一共 5 張，
  輸出 `public/images/pages/<name>-v<N>.png`。
- `tools/generate-speaking-banner.mjs`：演講頁，輸出 `public/images/services/speaking-v<N>.png`。
- `tools/generate-site-banner.mjs`：全站預設 og 圖，輸出 `src/assets/banner-v2.png`
  （走 Astro 資產雜湊網址，內容變更自動失效社群快取，不需版本號）。

### 版型與裁切安全區（三支生成器統一遵守，2026-07 定案）

平台會把 1.91:1 分享圖自行裁成 4:3 或 1:1（LINE 縮圖、X 的 2:1 也裁邊），因此：

- **無卡片**。內容只有：徽章＋AI 方塊、一句話大字主標、小字副標藍條、人物、講師卡。
- **中央 4:3 範圍（x=180–1020）必須容納全部內容**（徽章、完整主標、副標、講師臉部、講師卡）。
- 主標一律**單行**，字級依文字長度自動縮放（可用寬度 525px，上限 84px），不硬拆兩行。
- 副標小字（24px），藍條寬度依文字長度計算；徽章寬度同樣依文字自動計算。
- 人物固定 `x=585 y=-65 w=700`、講師卡固定 `x=800 y=296`——這兩個位置已定案，不再調整。
- 改版後用中央 4:3（x=180 寬 840）與中央 1:1（x=285 寬 630）裁切模擬驗證。

### 版本號工作流

版本號單一來源：`src/data/banner-version.json`（`pages`／`speaking` 分開計版）。
改版流程：JSON 數字 +1 → 重跑對應生成器 → commit。頁面 og 引用透過
`consts.ts` 的 `pageBannerUrl()`／`speakingBannerUrl()` 自動跟上，
舊檔保留給已分享的連結，不需要去各平台偵錯工具手動重抓。

## SEO 與頁面設定

- `src/pages/blog/[...id].astro` 會將 `og:image` 和 `BlogPosting.image` 指向
  `/images/blog/<slug>.png`。
- 文章頁主圖、列表縮圖與多長寬比 schema 圖使用 WebP 衍生檔（`<slug>.webp`、`<slug>-thumb.webp`、
  `<slug>-16x9.webp`、`<slug>-4x3.webp`、`<slug>-1x1.webp`）。其中 schema 圖完整提供 Google
  建議的 16:9（1200×675）、4:3（840×630）與 1:1（630×630），由 `npm run optimize:banners`
  （`tools/optimize-blog-banners.mjs`）在 build／dev 前自動從 PNG 生成，不進 git、不需手動製作。
- RSS feed 位於 `/rss.xml`，會自動列出所有 published 文章與其橫幅。
- `src/layouts/Base.astro` 保留 `max-image-preview:large`。
- 非文章頁使用 `src/assets/banner-v2.png` 作為全站預設社群預覽圖。若全站定位更新，可執行
  `node tools/generate-site-banner.mjs` 重新產生；人物與文字仍必須遵守本文件的鎖定規則。
- 不要恢復 `/og/[slug].png.ts`、satori、resvg 或 build-time 自動設計橫幅。
