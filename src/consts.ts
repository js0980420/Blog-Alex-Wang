// 全站共用的品牌與聯絡資訊：改這裡就能同步更新所有頁面與 JSON-LD
export const SITE = {
  title: 'AI新手教學',
  titleEn: 'AI Beginner Blog',
  url: 'https://aixwang.dev',
  description:
    'Alex 是台灣的 AI 應用講師與全職接案工程師。教 AI Agent 工具使用、做自動發文、AI 生圖模板、對話式拍片——把工作流程簡化成對話就能完成。提供付費一對一私人教學（雙北實體／線上）與企業、社群公開演講。',
  locale: 'zh-TW',
};

export const AUTHOR = {
  id: `${SITE.url}/about#person`,
  name: 'Alex',
  jobTitle: 'AI 應用講師 / 全職接案工程師',
  description:
    '全職接案工程師、21 萬人 OpenClaw 中文社群版主。AI Agent 工具使用、做自動發文、AI 生圖模板、對話式拍片教學——盡可能把工作流程簡化成對話就能完成，只需第一次使用前的安裝、串接成本，一次性教學，受用好幾次。',
  knowsAbout: [
    'AI Agent 工具',
    'Claude Code',
    'Codex',
    'AI 生圖模板',
    'Tooka',
    'Meta API',
    '對話式拍片',
    'HyperFrames',
  ],
  email: 'castion2293@yahoo.com.tw',
};

export const LINKS = {
  facebookGroup: 'https://www.facebook.com/groups/3238547836318385',
  threads: 'https://www.threads.com/@alex_wang.ai',
  youtube: 'https://www.youtube.com/channel/UCQUY_h3ic_oPmuoRJrLvE3g',
  line: 'https://line.me/ti/p/jejH4FkQn-',
  email: 'mailto:castion2293@yahoo.com.tw',
};

export const NAV = [
  { href: '/', label: '首頁' },
  { href: '/blog/', label: '部落格' },
  { href: '/services/one-on-one/', label: '一對一教學' },
  { href: '/services/speaking/', label: '演講邀約' },
  { href: '/about/', label: '關於講師' },
];

import instructorImage from './assets/instructor-shirt.jpg';

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
  image: new URL(instructorImage.src, SITE.url).href,
  sameAs: [LINKS.facebookGroup, LINKS.threads, LINKS.youtube],
};
