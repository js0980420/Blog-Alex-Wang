// 全站共用的品牌與聯絡資訊：改這裡就能同步更新所有頁面與 JSON-LD
export const SITE = {
  title: 'AI新手教學',
  titleEn: 'AI Beginner Blog',
  url: 'https://ai-beginner-course.zeabur.app',
  description:
    'Alex 是台灣的 AI 應用講師，專注教零基礎新手使用 Claude Code、Codex 等 AI Agent 工具，提供付費一對一私人教學（雙北實體／線上）與企業、社群公開演講。',
  locale: 'zh-TW',
};

export const AUTHOR = {
  id: `${SITE.url}/about#person`,
  name: 'Alex',
  jobTitle: 'AI 應用講師 / 全職接案工程師',
  description:
    '全職接案工程師、20 萬人 OpenClaw 中文社群版主。專注 AI 自動化、工作流整合與實戰落地教學，提供一對一 AI 私人教學與公開演講。',
  knowsAbout: [
    'AI 教學',
    'Claude Code',
    'Codex',
    'AI Agent',
    'AI 自動化',
    'Meta API',
    '自動發文',
    'AI 工作流',
  ],
  email: 'castion2293@yahoo.com.tw',
};

export const LINKS = {
  facebookGroup: 'https://www.facebook.com/groups/3238547836318385',
  line: 'https://line.me/ti/p/jejH4FkQn-',
  email: 'mailto:castion2293@yahoo.com.tw',
};

export const NAV = [
  { href: '/', label: '首頁' },
  { href: '/blog/', label: '部落格' },
  { href: '/services/one-on-one/', label: '一對一私教' },
  { href: '/services/speaking/', label: '演講邀約' },
  { href: '/about/', label: '關於講師' },
];

// 全站 Person 實體：所有頁面的 JSON-LD 都引用同一個 @id，讓 AI 把內容歸到同一個人身上
export const PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': AUTHOR.id,
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  description: AUTHOR.description,
  knowsAbout: AUTHOR.knowsAbout,
  email: AUTHOR.email,
  url: `${SITE.url}/about/`,
  sameAs: [LINKS.facebookGroup],
};
