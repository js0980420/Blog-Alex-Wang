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
  // 別名：讓 Google 知識圖譜與 AI 搜尋把不同稱呼認成同一個人
  alternateName: ['王士麟', 'Alex Wang', '艾克斯王', 'aixwang'],
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
  email: 'js0980420@gmail.com',
};

export const LINKS = {
  facebookGroup: 'https://www.facebook.com/groups/3238547836318385',
  threads: 'https://www.threads.com/@alex_wang.ai',
  instagram: 'https://www.instagram.com/alex_wang.ai/',
  youtube: 'https://www.youtube.com/channel/UCQUY_h3ic_oPmuoRJrLvE3g',
  github: 'https://github.com/js0980420',
  line: 'https://line.me/ti/p/jejH4FkQn-',
  email: 'mailto:js0980420@gmail.com',
};

export const NAV = [
  { href: '/', label: '首頁' },
  { href: '/blog/', label: '部落格' },
  { href: '/services/one-on-one/', label: '一對一教學' },
  { href: '/services/speaking/', label: '演講邀約' },
  { href: '/faq/', label: '常見問題' },
  { href: '/about/', label: '關於講師' },
];

import BANNER_VERSION from './data/banner-version.json';

// 頁面分享圖網址（含版本號）：版本來源是 src/data/banner-version.json，
// 升版改那裡的數字並重跑生成器即可，頁面引用自動跟上
export function pageBannerUrl(name: string): string {
  return `${SITE.url}/images/pages/${name}-v${BANNER_VERSION.pages}.png`;
}

export function speakingBannerUrl(): string {
  return `${SITE.url}/images/services/speaking-v${BANNER_VERSION.speaking}.png`;
}

// 產生 BreadcrumbList JSON-LD；最後一項是當前頁、不帶 item
export function breadcrumbSchema(items: { name: string; item?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.item ? { item: crumb.item } : {}),
    })),
  };
}

// 全站 Person 實體：所有頁面的 JSON-LD 都引用同一個 @id，讓 AI 把內容歸到同一個人身上
export const PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': AUTHOR.id,
  name: AUTHOR.name,
  alternateName: AUTHOR.alternateName,
  jobTitle: AUTHOR.jobTitle,
  description: AUTHOR.description,
  knowsAbout: AUTHOR.knowsAbout,
  email: AUTHOR.email,
  url: `${SITE.url}/about/`,
  image: [
    `${SITE.url}/images/profile/alex-16x9.webp`,
    `${SITE.url}/images/profile/alex-4x3.webp`,
    `${SITE.url}/images/profile/alex-1x1.webp`,
  ],
  sameAs: [LINKS.facebookGroup, LINKS.threads, LINKS.instagram, LINKS.youtube, LINKS.github],
};
