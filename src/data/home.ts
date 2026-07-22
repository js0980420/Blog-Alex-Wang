// 首頁區塊文案：課程大綱、學習成果、適合對象、教學影片
export const SYLLABUS = [
  {
    label: 'Module 01',
    title: '為什麼一定要先用 Claude Code / Codex 桌面版',
    summary:
      '先解說為什麼要用 Claude Code / Codex 桌面版，而不是 n8n、網頁版或其他 Agent；同時帶你把需要的套件與環境設定一次裝好。新手只要先訂閱 20 美元的 ChatGPT / Claude 額度即可開始，我也會分享怎麼節省額度。',
    href: '/blog/why-desktop-claude-code-codex/',
  },
  {
    label: 'Module 02',
    title: 'Meta 三大 API 申請邏輯與帳號準備',
    summary:
      '三大 API 其實只要先學一個就夠，因為另外兩個申請流程大同小異；重點是你要先有 Facebook 帳號登入 Meta 開發者後台，並確認要串接的帳號都綁在這個 FB 底下。',
    href: '/blog/meta-api-application/',
  },
  {
    label: 'Module 03',
    title: '測試自動發文與 Meta 權限設定',
    summary:
      '實際測試自動發文流程，並解說自動發文的權限該怎麼設定，哪些操作容易出問題，以及怎麼避免被 Meta 判定異常而封鎖。',
    href: '/blog/auto-posting-permissions/',
  },
  {
    label: 'Module 04',
    title: '用 Skill 隨時修改文案與排程',
    summary:
      '把發文文案與排程整理進 Skill，讓 AI 可以記住你的發文習慣，之後要改內容、改時間、改流程都能快速調整；Skill 也可以理解成強化 AI 的記憶，避免關掉對話框之後 AI 失憶。',
    href: '/blog/what-is-ai-skill/',
  },
];

export const OUTCOMES = [
  '從零開始完成桌面版 Claude Code / Codex 的安裝與基本操作，解決工具權限問題，不再只是網頁版 Chat 模式，而是真正能執行任務的 Agent。',
  '學會串接 Meta 三大 API，讓 AI 可跟真實社群互動。',
  '做出自動發文流程，並可設定發布排程。',
  '學會寫 Skill，把常用任務整理成你自己的可重用工作流。',
];

export const AUDIENCE = [
  { title: '老師與講師', description: '想提升備課效率、增加互動設計、把 AI 用進實際教學的人。' },
  {
    title: '個人品牌經營者',
    description: '需要大量產出內容、課程說明頁、社群素材與銷售頁的人。',
  },
  {
    title: '想系統學 AI 的實作者',
    description: '不想再停留在零散技巧，而是想建立完整方法與實戰作品的人。',
  },
];

export const VIDEOS = [
  {
    title: 'Threads API 申請教學',
    description: '聚焦自動發文、留言回覆與 token 申請流程的實戰教學代表作。',
    tag: 'API 教學',
    embedId: 'nTYrG7EuFHA',
  },
  {
    title: 'Zeabur Agent Skills 完整指南',
    description: '把 Coding Agent、伺服器管理與技能應用串在一起的完整指南。',
    tag: 'Agent 實戰',
    embedId: 'GfU8e5-JURM',
  },
  {
    title: '【只靠對話就能拍片？】Claude 一鍵生成影片',
    description: '從對話到剪輯的一條龍流程，展示內容創作與 AI 工作流的應用。',
    tag: '影音創作',
    embedId: 'lq2M7HjH1mY',
  },
];
