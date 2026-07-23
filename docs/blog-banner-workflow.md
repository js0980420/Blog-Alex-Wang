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

## 版面規則

1. 左上是「新手學 AI｜文章分類」徽章。
2. 左側是兩行以內的文章主標題；英文與中文可依實際寬度調整，但同系列圖片需維持一致視覺重量。
3. 標題下方放一行藍底白字副標題。
4. 左下放 3–4 張等寬、等高卡片：
   - 數字圓圈尺寸一致。
   - 圖案尺寸一致。
   - 卡片標題採相同基準字級與行距。
   - 長文字只能換行，不得單獨縮小數字或圖案。
5. 人物放右側；右上保留「AI」，人物區疊放「講師：Alex」。
6. 所有內容需留在社群平台安全範圍內，縮小預覽時仍可辨識。

## 新文章製作步驟

1. 在 Directus 確定文章最終 `slug`、標題、description 與主要重點。
2. 從文章內容整理：
   - 一個短分類名稱。
   - 兩行以內的橫幅主標題。
   - 一句副標題。
   - 3–4 個可快速理解的步驟或重點。
3. 預設沿用鎖定背景。只有明確需要新背景時才使用生圖模型，而且 prompt 必須要求：
   - 無人物。
   - 無文字、字母、數字、Logo 或文字狀圖案。
   - 白色與淡藍色 AI 教育風格。
   - 左側保留文字空間，右側保留人物空間。
4. 用程式將文字、卡片、數字、圖案與透明人物合成，輸出 1200×630 PNG。
5. 以文章 slug 命名並放入：

   ```text
   public/images/blog/<slug>.png
   ```

6. 人工檢查：
   - 人臉、髮型和衣服與透明原圖完全一致。
   - 中文無錯字。
   - 圖片沒有被拉伸。
   - 卡片寬高、數字、圖案、文字和間距一致。
   - 檔名與 Directus slug 完全一致。
7. 在文章設為 published 或部署前執行：

   ```bash
   npm run check:banners
   npm run build
   ```

## 驗證機制

`npm run check:banners` 會讀取 Directus 所有 published 文章，逐篇檢查：

- 同 slug 的 PNG 是否存在。
- PNG 是否真的是 1200×630。

`npm run build` 和 `npm run deploy` 都會先執行這項檢查。缺圖或尺寸錯誤時必須修正圖片，
不可用全站預設橫幅掩蓋問題。

## SEO 與頁面設定

- `src/pages/blog/[...id].astro` 會將 `og:image` 和 `BlogPosting.image` 指向
  `/images/blog/<slug>.png`。
- `src/layouts/Base.astro` 保留 `max-image-preview:large`。
- 不要恢復 `/og/[slug].png.ts`、satori、resvg 或 build-time 自動設計橫幅。
