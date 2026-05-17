import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  HelpCircle,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  MessageCircle,
  Play,
  Sparkles,
  Star,
  Target,
  Users,
  Video,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';

type SyllabusItem = {
  label: string;
  title: string;
  summary: string;
};

type VideoItem = {
  title: string;
  description: string;
  duration: string;
  tag: string;
  href: string;
  embedId: string;
};

type PhotoItem = {
  title: string;
  caption: string;
  size: string;
  src: string;
};

const facebookGroupUrl = 'https://www.facebook.com/groups/3238547836318385';
const lineUrl = 'https://line.me/ti/p/jejH4FkQn-';
const emailUrl = 'mailto:castion2293@yahoo.com.tw';

const syllabus: SyllabusItem[] = [
  {
    label: 'Module 01',
    title: '為什麼一定要先用 Claude Code / Codex 桌面版',
    summary:
      '先解說為什麼要用 Claude Code / Codex 桌面版，而不是 n8n、網頁版或其他 Agent；同時帶你把需要的套件與環境設定一次裝好。新手只要先訂閱 20 美元的 ChatGPT / Claude 額度即可開始，我也會分享怎麼節省額度。',
  },
  {
    label: 'Module 02',
    title: 'Meta 三大 API 申請邏輯與帳號準備',
    summary:
      '三大 API 其實只要先學一個就夠，因為另外兩個申請流程大同小異；重點是你要先有 Facebook 帳號登入 Meta 開發者後台，並確認要串接的帳號都綁在這個 FB 底下。',
  },
  {
    label: 'Module 03',
    title: '測試自動發文與 Meta 權限設定',
    summary:
      '實際測試自動發文流程，並解說自動發文的權限該怎麼設定，哪些操作容易出問題，以及怎麼避免被 Meta 判定異常而封鎖。',
  },
  {
    label: 'Module 04',
    title: '用 Skill 隨時修改文案與排程',
    summary:
      '把發文文案與排程整理進 Skill，讓 AI 可以記住你的發文習慣，之後要改內容、改時間、改流程都能快速調整；Skill 也可以理解成強化 AI 的記憶，避免關掉對話框之後 AI 失憶。',
  },
];

const outcomes = [
  '從零開始完成桌面版 Claude Code / Codex 的安裝與基本操作，解決工具權限問題，不再只是網頁版 Chat 模式，而是真正能執行任務的 Agent。',
  '學會串接 Meta 三大 API，讓AI可跟真實社群互動',
  '做出自動發文流程，並可設定發布排程',
  '學會寫 skill，把常用任務整理成你自己的可重用工作流。',
];

const outcomeDemos = [
  {
    title: '桌面版 Agent',
    text: 'Claude Code / Codex 安裝與權限設定',
  },
  {
    title: 'Meta API 串接',
    text: '讓 AI 真正接上社群平台',
  },
  {
    title: '自動發文排程',
    text: '建立可重複執行的發布流程',
  },
  {
    title: 'Skill 工作流',
    text: '把常用任務封裝成可重用技能',
  },
] as const;

const audience = [
  {
    icon: <Users className="h-5 w-5" />,
    title: '老師與講師',
    description: '想提升備課效率、增加互動設計、把 AI 用進實際教學的人。',
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: '個人品牌經營者',
    description: '需要大量產出內容、課程說明頁、社群素材與銷售頁的人。',
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: '想系統學 AI 的實作者',
    description: '不想再停留在零散技巧，而是想建立完整方法與實戰作品的人。',
  },
];

const videos: VideoItem[] = [
  {
    title: 'Threads API 申請教學',
    description: '聚焦自動發文、留言回覆與 token 申請流程，適合放在首頁主打區當作實戰教學代表作。',
    duration: 'Day 6',
    tag: 'API 教學',
    href: 'https://www.youtube.com/watch?v=nTYrG7EuFHA',
    embedId: 'nTYrG7EuFHA',
  },
  {
    title: 'Zeabur Agent Skills 完整指南',
    description: '把 Coding Agent、伺服器管理與技能應用串在一起，能明確展現你在 AI 實作面的深度。',
    duration: 'Guide',
    tag: 'Agent 實戰',
    href: 'https://www.youtube.com/watch?v=GfU8e5-JURM',
    embedId: 'GfU8e5-JURM',
  },
  {
    title: '【只靠對話就能拍片？】Claude一鍵生成影片',
    description: '從對話到剪輯的一條龍流程，很適合補足內容創作與 AI 工作流的應用面向。',
    duration: 'Day 1',
    tag: '影音創作',
    href: 'https://www.youtube.com/watch?v=lq2M7HjH1mY',
    embedId: 'lq2M7HjH1mY',
  },
];

const photos: PhotoItem[] = [
  {
    title: '一對一實體課紀錄',
    caption: '一對一實體教學現場。',
    size: 'lg:col-span-1 min-h-[240px]',
    src: '/images/教學-珊珊.jpg',
  },
  {
    title: 'Mixerbox講課紀錄',
    caption: '講座合作紀錄。',
    size: 'lg:col-span-2 min-h-[220px]',
    src: '/images/Mixerbox講課紀錄.jpeg',
  },
];

const faqs = [
  {
    question: '課前須要準備什麼？',
    answer:
      '除了教學費用，還需要付費訂閱 AI。初學者只要先準備一個月 20 美元的額度就夠了，另外也要確認你有可用的 Facebook 帳號，能拿來登入 Meta 開發者後台並綁定其他要串接的帳號。',
  },
  {
    question: '沒有技術背景可以上嗎？',
    answer:
      '可以。這門課用意在於把原本複雜的技術門檻，優化成只要對話就能完成的工作流，任何人只要會操作電腦就能上。',
  },
  {
    question: '為什麼不用網頁版或免費 AI？',
    answer:
      '因為網頁版沒有 Agent 權限，也沒辦法做環境設定、填入申請完的 Meta API Key，更不能直接寫自動發文腳本，基本上只適合拿來問問題。免費 AI 的穩定度和能力也通常不如 Claude 或 Codex，很容易一直出錯，花掉的時間可能遠超過 20 美元。要把免費 AI 用好，往往需要已經很熟 Prompt 的資深工程師，並不適合新手。',
  },
  {
    question: '可以約線上教學嗎？',
    answer:
      '可以，可以用 Google Meet 或 Discord，只要能分享螢幕畫面，就可以約線上教學。',
  },
];

const stats = [
  ['長頁式課程頁', '把你的定位、內容、影片與信任感一次講清楚'],
  ['影片導流區', '用公開內容先建立專業感，降低報名前的不確定'],
  ['新手也能上手', '從安裝、串接到自動化流程，照著做就能真正完成一次'],
];

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' as const },
};

function SectionTitle({
  eyebrow,
  title,
  description,
  fullWidth = false,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <motion.div {...sectionReveal} className={fullWidth ? 'max-w-7xl' : 'max-w-3xl'}>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-stone-50 md:text-5xl">
        {title}
      </h2>
      <div className={`mt-5 text-base leading-7 text-stone-300/80 md:text-lg ${fullWidth ? 'max-w-7xl' : 'max-w-2xl'}`}>
        {description}
      </div>
    </motion.div>
  );
}

function OutcomeDemoSvg({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
        <rect x="34" y="40" width="118" height="88" rx="12" fill="#23180F" stroke="rgba(251,191,36,0.28)" />
        <rect x="48" y="56" width="54" height="10" rx="5" fill="#FBBF24" fillOpacity="0.9" />
        <rect x="48" y="76" width="90" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.16" />
        <rect x="48" y="90" width="78" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.12" />
        <rect x="172" y="52" width="112" height="20" rx="10" fill="#0D1F12" stroke="#06C755" strokeOpacity="0.45" />
        <circle cx="188" cy="62" r="5" fill="#06C755" />
        <path d="M203 62H255" stroke="#E7FBEF" strokeOpacity="0.78" strokeWidth="8" strokeLinecap="round" />
        <rect x="172" y="86" width="112" height="20" rx="10" fill="#1E1711" />
        <path d="M188 96H234" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
        <path d="M118 134C146 118 171 110 200 110" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 8" />
        <circle cx="204" cy="110" r="6" fill="#F59E0B" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
        <circle cx="80" cy="94" r="24" fill="#1877F2" fillOpacity="0.2" stroke="#1877F2" strokeOpacity="0.6" />
        <path d="M76 78H86V86H82V94H86V102H82V118H72V102H68V94H72V88C72 81.5 75.5 78 82 78H76Z" fill="#8FC0FF" />
        <circle cx="160" cy="64" r="18" fill="#F97316" fillOpacity="0.18" stroke="#FB923C" strokeOpacity="0.55" />
        <circle cx="160" cy="64" r="7" fill="#FDBA74" />
        <circle cx="238" cy="112" r="22" fill="#06C755" fillOpacity="0.14" stroke="#06C755" strokeOpacity="0.5" />
        <path d="M226 112H250" stroke="#C8F7D8" strokeWidth="6" strokeLinecap="round" />
        <path d="M238 100V124" stroke="#C8F7D8" strokeWidth="6" strokeLinecap="round" />
        <path d="M102 90C119 81 132 74 143 69" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M177 73C195 83 210 93 219 102" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="144" cy="69" r="4.5" fill="#FBBF24" />
        <circle cx="219" cy="102" r="4.5" fill="#FBBF24" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
        <rect x="42" y="48" width="86" height="78" rx="14" fill="#221811" stroke="rgba(255,255,255,0.08)" />
        <rect x="58" y="66" width="54" height="10" rx="5" fill="#FBBF24" />
        <rect x="58" y="84" width="32" height="24" rx="8" fill="#FFFFFF" fillOpacity="0.1" />
        <rect x="94" y="84" width="18" height="24" rx="8" fill="#FFFFFF" fillOpacity="0.18" />
        <rect x="150" y="56" width="128" height="24" rx="12" fill="#0D1F12" stroke="#06C755" strokeOpacity="0.4" />
        <path d="M168 68H220" stroke="#E7FBEF" strokeWidth="8" strokeLinecap="round" />
        <circle cx="246" cy="68" r="8" fill="#06C755" />
        <rect x="150" y="94" width="128" height="24" rx="12" fill="#23180F" stroke="rgba(251,191,36,0.28)" />
        <path d="M168 106H236" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
        <path d="M112 120C142 132 166 134 190 126" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="7 7" />
        <path d="M190 126L181 120" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M190 126L183 135" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
      <rect x="40" y="52" width="104" height="86" rx="14" fill="#23180F" stroke="rgba(251,191,36,0.28)" />
      <path d="M58 78H126" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 98H110" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 118H96" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="8" strokeLinecap="round" />
      <rect x="174" y="54" width="102" height="22" rx="11" fill="#0D1F12" stroke="#06C755" strokeOpacity="0.35" />
      <path d="M192 65H244" stroke="#E7FBEF" strokeWidth="8" strokeLinecap="round" />
      <rect x="174" y="87" width="102" height="22" rx="11" fill="#1B1410" />
      <path d="M192 98H228" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      <rect x="174" y="120" width="102" height="22" rx="11" fill="#1B1410" />
      <path d="M192 131H252" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      <path d="M144 95H170" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 7" />
      <path d="M144 116H170" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 7" />
    </svg>
  );
}

function OutcomeDemoVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-5 px-6 py-7">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.1rem] bg-white p-2 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
          <img
            src="/images/claude code logo.png"
            alt="Claude Code"
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.1rem] bg-white p-2 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
          <img
            src="/images/codex.png"
            alt="Codex"
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-5 px-6 py-7">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.1rem] bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
          <img
            src="/images/Facebook-Brand-Asset-Pack/Facebook Brand Asset Pack/Logo/Primary Logo/Facebook_Logo_Primary.png"
            alt="Facebook"
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.1rem] bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
          <img
            src="/images/IG_brand_asset_pack_2023/01 Static Glyph/01 Gradient Glyph/Instagram_Glyph_Gradient.png"
            alt="Instagram"
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.1rem] bg-[#111] shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
          <div className="h-10 w-10 overflow-hidden rounded-[0.9rem]">
            <img
              src="/images/threads.png"
              alt="Threads"
              className="h-full w-full scale-[1.9] object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return <OutcomeDemoSvg index={index} />;
}

function InstructorDemoSvg({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
        <rect x="44" y="48" width="104" height="78" rx="16" fill="#23180F" stroke="rgba(251,191,36,0.28)" />
        <path d="M66 72H126" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
        <path d="M66 92H114" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="8" strokeLinecap="round" />
        <path d="M66 112H100" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="8" strokeLinecap="round" />
        <rect x="176" y="52" width="104" height="26" rx="13" fill="#0F1822" stroke="#60A5FA" strokeOpacity="0.4" />
        <path d="M194 65H246" stroke="#DBEAFE" strokeWidth="8" strokeLinecap="round" />
        <rect x="176" y="90" width="104" height="26" rx="13" fill="#0D1F12" stroke="#06C755" strokeOpacity="0.38" />
        <path d="M194 103H232" stroke="#DCFCE7" strokeWidth="8" strokeLinecap="round" />
        <path d="M148 88H176" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 7" />
        <path d="M148 101H176" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 7" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
        <circle cx="90" cy="94" r="32" fill="#1D4ED8" fillOpacity="0.18" stroke="#3B82F6" strokeOpacity="0.5" />
        <circle cx="90" cy="84" r="12" fill="#BFDBFE" />
        <path d="M68 116C74 103 83 98 90 98C97 98 106 103 112 116" stroke="#BFDBFE" strokeWidth="7" strokeLinecap="round" />
        <rect x="156" y="52" width="120" height="26" rx="13" fill="#1E1711" />
        <path d="M176 65H250" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="8" strokeLinecap="round" />
        <rect x="156" y="90" width="120" height="26" rx="13" fill="#0D1F12" stroke="#06C755" strokeOpacity="0.38" />
        <path d="M176 103H224" stroke="#DCFCE7" strokeWidth="8" strokeLinecap="round" />
        <circle cx="252" cy="103" r="8" fill="#06C755" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="24" width="284" height="142" rx="18" fill="#15100C" stroke="rgba(255,255,255,0.12)" />
      <rect x="40" y="50" width="92" height="92" rx="20" fill="#221811" stroke="rgba(251,191,36,0.28)" />
      <path d="M64 77H108" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
      <path d="M64 97H96" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      <path d="M64 117H108" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="8" strokeLinecap="round" />
      <circle cx="216" cy="72" r="20" fill="#F97316" fillOpacity="0.16" stroke="#FB923C" strokeOpacity="0.45" />
      <path d="M206 72H226" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" />
      <path d="M216 62V82" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" />
      <rect x="172" y="102" width="88" height="24" rx="12" fill="#0F1822" stroke="#60A5FA" strokeOpacity="0.38" />
      <path d="M188 114H244" stroke="#DBEAFE" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#120f0b] text-stone-100">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#120f0b]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 shadow-[0_10px_40px_rgba(251,146,60,0.22)]">
              <Lightbulb className="h-5 w-5 text-stone-950" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold tracking-tight">AI新手教學</div>
              <div className="text-xs uppercase tracking-[0.18em] text-stone-400">AI Beginner Course</div>
            </div>
          </a>
          <div className="hidden items-center gap-7 text-sm text-stone-300 lg:flex">
            <a href="#overview" className="transition hover:text-white">課程介紹</a>
            <a href="#syllabus" className="transition hover:text-white">課程大綱</a>
            <a href="#instructor" className="transition hover:text-white">講師介紹</a>
            <a href="#videos" className="transition hover:text-white">教學影片</a>
            <a href="#faq" className="transition hover:text-white">Q&A</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={lineUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#06c755]/40 bg-[#06c755] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#05b84d]"
            >
              免費諮詢
            </a>
            <a
              href={facebookGroupUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#1877F2]/35 bg-[#1877F2]/14 px-4 py-2 text-sm font-medium text-[#cfe0ff] transition hover:bg-[#1877F2]/22 hover:text-white"
            >
              FB 社團
            </a>
          </div>
        </div>
      </div>

      <main id="top">
        <section className="px-6 pt-28 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              {...sectionReveal}
              className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-white"
            >
              <div className="relative">
                <img
                  src="/images/新手學AI橫幅.png"
                  alt="新手學AI課程第一堂"
                  className="block h-auto w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

<section id="overview" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Course Overview"
              title="課程介紹"
              fullWidth
              description={
                <>
                  <p>
                    這是學習一切 AI 自動化的基礎。無論你後續要學 AI 客服、AI 自動拍片、AI
                    爬蟲，都需要先安裝桌面版 AI，取得 Agent 的工具權限，而不只是停留在網頁版對話；也要先設定好環境變數，讓 AI 可以跟第三方平台互動。
                  </p>
                  <p className="mt-4">
                    如果你不想花錢，可以先跳到教學影片看免費教學；但因為還是很多人會卡關，所以我也提供手把手的一對一教學，可以約雙北咖啡廳上實體課。
                  </p>
                </>
              }
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <motion.div {...sectionReveal} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
                <div className="flex items-center gap-3 text-amber-200">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">學員能得到</span>
                </div>
                <div className="mt-6 space-y-4">
                  {outcomes.map((item) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-white/8 bg-stone-950/35 p-4">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-300">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="leading-7 text-stone-200/88">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...sectionReveal} className="grid gap-6 sm:grid-cols-2">
                {outcomeDemos.map((item, index) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-[#1a1611] p-5">
                    <div className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_42%),linear-gradient(180deg,#1f1812,#120f0b)]">
                      <OutcomeDemoVisual index={index} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-stone-50">{item.title}</h3>
                    <p className="mt-3 leading-7 text-stone-300/78">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

<section id="syllabus" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Syllabus"
              title="課程大綱"
              description="保留銷售頁該有的說服結構，讓來自影片與社群的人，能進一步理解課程內容與學習成果。"
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {syllabus.map((item, index) => (
                <motion.article
                  key={item.label}
                  {...sectionReveal}
                  transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
                  className="group rounded-[1.9rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.26em] text-amber-200/72">{item.label}</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-stone-50">{item.title}</h3>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-3 text-stone-200 transition group-hover:border-amber-300/20 group-hover:text-amber-200">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-5 max-w-xl leading-7 text-stone-300/80">{item.summary}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

<section id="instructor" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Instructor"
              title="講師介紹"
              description="講師區現在保留了個人品牌型版位，適合放你的經歷、授課主題、合作單位與代表案例。"
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <motion.div {...sectionReveal} className="rounded-[2rem] border border-white/10 bg-[#1a1510] p-8">
                <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[1.5rem] bg-stone-950/50">
                  <img
                    src="/images/半身白襯衫.jpg"
                    alt="講師形象照"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/38 to-transparent" />
                  <div className="relative z-10 p-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-200">
                      <Star className="h-3.5 w-3.5 text-amber-300" />
                      Lead Instructor
                    </div>
                    <h3 className="mt-4 font-display text-4xl font-semibold text-stone-50">Alex</h3>
                    <p className="mt-3 max-w-sm leading-7 text-stone-200/76">
                      全職接案工程師、20 萬人 OpenClaw 中文社群版主，專注在 AI 自動化、工作流整合與實戰落地教學。
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...sectionReveal} className="grid gap-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
                  <h3 className="font-display text-2xl font-semibold text-stone-50">講師經歷與合作內容</h3>
                  <div className="mt-6 grid gap-4">
                    {[
                      '接案作品包括 Line LIFF 網頁、AI 客服、CRM 後台管理系統等實際商業專案。',
                      '一鍵拍片開源專案 HyperFrames 的協作者，打造從腳本、剪輯、字幕、真人配音、音樂、封面圖、多平台自動發佈都能透過對話完成，大幅降低拍片的時間成本和技術門檻。',
                      'Zeabur 的合作夥伴，並提供 OpenClaw、Hermes 的救援服務。',
                    ].map((item) => (
                      <div key={item} className="flex gap-4 rounded-2xl border border-white/8 bg-stone-950/35 p-4">
                        <div className="mt-0.5 text-amber-200">
                          <Check className="h-5 w-5" />
                        </div>
                        <p className="leading-7 text-stone-200/84">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    ['全職接案工程師', ''],
                    ['自動拍片 AI 教學', ''],
                    ['OpenClaw / Hermes 救援', ''],
                  ].map(([title, text], index) => (
                    <div key={title} className="rounded-[1.6rem] border border-white/10 bg-[#17130f] p-6">
                      <div className="overflow-hidden rounded-[1.2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_42%),linear-gradient(180deg,#1f1812,#120f0b)]">
                        <InstructorDemoSvg index={index} />
                      </div>
                      <div className="mt-5 text-lg font-semibold text-stone-50">{title}</div>
                      {text ? <p className="mt-3 text-sm leading-6 text-stone-300/72">{text}</p> : null}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-10">
              <SectionTitle
                eyebrow="Records"
                title="講課紀錄"
                description="平常有接一對一實體教學、線上教學，也會參與講座授課。"
              />

              <div className="mt-10 grid auto-rows-fr gap-5 lg:grid-cols-3">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.title}
                    {...sectionReveal}
                    transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
                    className={`rounded-[1.9rem] border border-white/10 bg-[#19140f] p-5 overflow-hidden ${photo.size}`}
                  >
                    <div className="relative h-full min-h-[180px] rounded-[1.5rem] overflow-hidden group bg-stone-950/50 flex items-center justify-center">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="h-full w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-200 backdrop-blur-sm">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-stone-50">{photo.title}</h3>
                          <p className="mt-3 max-w-md leading-7 text-stone-300/78">{photo.caption}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

<section id="videos" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Teaching Content"
              title="教學影片"
              description="如果你不想花錢，可在此看免費教學，或是課後用來複習。"
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {videos.map((video, index) => (
                <motion.article
                  key={video.title}
                  {...sectionReveal}
                  transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
                  className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#18130f]"
                >
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.embedId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <div className="flex flex-1 flex-col border-t border-white/8 bg-[linear-gradient(180deg,rgba(251,191,36,0.12),rgba(18,15,11,0.05)),linear-gradient(135deg,#342719,#17120d)] p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-300">
                        <Video className="h-3.5 w-3.5 text-amber-300" />
                        {video.tag}
                      </div>
                      <span className="text-sm text-stone-400">{video.duration}</span>
                    </div>

                    <div className="mt-4 min-h-[4.5rem]">
                      <h3 className="font-display text-2xl font-semibold text-stone-50">{video.title}</h3>
                    </div>
                    <div className="min-h-[6.5rem]">
                      <p className="leading-7 text-stone-300/76">{video.description}</p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                      <a
                        href={video.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
                      >
                        <Play className="h-4 w-4" />
                        觀看影片
                      </a>
                      <span className="text-sm text-stone-400">
                        {index === 0 ? '主打教學影片' : '精選教學內容'}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

<section id="faq" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="FAQ"
              title="常見問題"
              description="最後保留 FAQ，處理觀望者的疑問，讓整個銷售頁的收斂段更完整。"
            />

            <div className="mt-12 space-y-4">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={item.question}
                    {...sectionReveal}
                    transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
                    className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-300/12 text-amber-200">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-medium text-stone-100">{item.question}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/8 px-6 pb-6 pt-5 text-base leading-7 text-stone-300/80">
                        {item.answer}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/*
        <section id="enroll" className="px-6 pb-24 pt-10">
          <div className="mx-auto max-w-6xl">
            <motion.div
              {...sectionReveal}
              className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(251,191,36,0.15),rgba(244,114,182,0.12),rgba(255,255,255,0.04))] p-8 md:p-12"
            >
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-200">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Ready to Customize
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-stone-50 md:text-5xl">
                    這頁現在已經適合拿來換成你的真實內容
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-stone-200/82 md:text-lg">
                    我已經把長頁式課程銷售邏輯重構成偏個人品牌版本，並接上了現有可用的 YouTube、LINE 與 Email 資訊。現在最值得補上的就是你的講課照片與真實講師資料。
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={lineUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#06c755]/40 bg-[#06c755] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(6,199,85,0.28)] transition hover:bg-[#05b84d]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      免費諮詢
                    </a>
                    <a
                      href={emailUrl}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/10"
                    >
                      <Mail className="h-4 w-4" />
                      Email 聯絡
                    </a>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/12 bg-[#120f0b]/55 p-6">
                  <div className="text-sm uppercase tracking-[0.24em] text-stone-400">接下來建議補這些</div>
                  <div className="mt-5 space-y-3">
                    {[
                      '補上真正的 Facebook 社團或粉專連結，如果你要以社群承接流量',
                      '3 到 6 張高品質講課照片或活動現場照',
                      '講師姓名、頭銜、合作單位、學員回饋與報名連結',
                    ].map((item) => (
                      <div key={item} className="flex gap-3 text-stone-200/84">
                        <div className="mt-0.5 text-amber-200">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="leading-7">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        */}

</main>
    </div>
  );
}

export default App;
