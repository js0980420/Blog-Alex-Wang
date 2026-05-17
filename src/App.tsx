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
import { useState } from 'react';

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
};

type PhotoItem = {
  title: string;
  caption: string;
  size: string;
  src: string;
};

const facebookGroupUrl = 'https://www.facebook.com/groups/3238547836318385';
const lineUrl = 'https://line.me/ti/p/kdhrBKYuFZ';
const emailUrl = 'mailto:castion2293@yahoo.com.tw';

const syllabus: SyllabusItem[] = [
  {
    label: 'Module 01',
    title: 'AI 基礎觀念與教學定位',
    summary: '先釐清 AI 真正適合做什麼，建立你自己的教學與工作使用範圍。',
  },
  {
    label: 'Module 02',
    title: 'Prompt 結構與任務拆解',
    summary: '把模糊需求拆成可執行步驟，讓 AI 回答穩定、可控、能重複。',
  },
  {
    label: 'Module 03',
    title: '教材、簡報與內容快速生成',
    summary: '加速教案、講義、投影片、社群內容與教學活動設計。',
  },
  {
    label: 'Module 04',
    title: '自動化流程與資料整理',
    summary: '把表單、筆記、教材與常用工具串起來，減少重複性工作。',
  },
  {
    label: 'Module 05',
    title: 'AI Agent 與知識庫應用',
    summary: '建立能讀懂你資料、配合你邏輯、持續優化的 AI 助理。',
  },
  {
    label: 'Module 06',
    title: '實戰專題與成果輸出',
    summary: '把前面學到的工具與方法整合成一個真正可展示、可上線的成果。',
  },
];

const outcomes = [
  '建立一套你自己的 AI 教學與工作流，不再只是臨時問 AI。',
  '學會設計可重用的 Prompt 模板與課堂任務模板。',
  '把 AI 真的用進備課、授課、內容製作與行政流程。',
  '完成一個能對外展示的專題成果或課程應用案例。',
];

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
    title: '美業 AI 預約客服',
    description: '把產業情境、客服流程與 AI 回覆設計講清楚，適合放在成果示範區。',
    duration: 'Demo',
    tag: '案例示範',
    href: 'https://www.youtube.com/watch?v=0H-liCZC5pE',
  },
  {
    title: '補教業 AI 助手',
    description: '適合展示你如何把 AI 放進教育現場與教學工作流，和這個頁面主題很接近。',
    duration: 'Demo',
    tag: '教育應用',
    href: 'https://www.youtube.com/watch?v=JJgLGLOxh_8',
  },
  {
    title: '龍蝦 OpenClaw 客服',
    description: '可作為自動化與 AI Agent 展示內容，補足你在系統設計面的可信度。',
    duration: 'Demo',
    tag: 'AI Agent',
    href: 'https://www.youtube.com/watch?v=Rk_4xCbHD6Q',
  },
];

const photos: PhotoItem[] = [
  {
    title: '新手學AI課程第一堂',
    caption: '課程開課現場。',
    size: 'lg:col-span-2 lg:row-span-2 min-h-[320px]',
    src: '/images/新手學AI課程第一堂.png',
  },
  {
    title: '教學-珊珊',
    caption: '一對一實體教學現場。',
    size: 'min-h-[240px]',
    src: '/images/教學-珊珊.jpg',
  },
  {
    title: '半身白襯衫',
    caption: '個人品牌照。',
    size: 'min-h-[240px]',
    src: '/images/半身白襯衫.jpg',
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
    question: '沒有技術背景可以上嗎？',
    answer:
      '可以。這門課重點是讓你把 AI 用進真實工作，不是要求你具備工程背景。整體內容會從思路、操作到應用逐步帶入。',
  },
  {
    question: '如果我已經用過 ChatGPT，還適合嗎？',
    answer:
      '適合。這門課不是只教基本操作，而是幫你把零散使用經驗整理成能長期重複使用的工作方法。',
  },
  {
    question: '這門課偏理論還是偏實作？',
    answer:
      '偏實作。每個模組都會搭配情境案例、模板和應用設計，最後會收斂成實戰成果。',
  },
  {
    question: '上完之後能帶走什麼？',
    answer:
      '你會帶走一套 AI 工作流、可重用的指令模板，以及至少一個能直接應用在教學或工作中的成果。',
  },
];

const stats = [
  ['長頁式課程頁', '把你的定位、內容、影片與信任感一次講清楚'],
  ['影片導流區', '用公開內容先建立專業感，降低報名前的不確定'],
  ['社群承接', '把網站訪客導到 FB 社團，持續經營後續轉化'],
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
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div {...sectionReveal} className="max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-stone-50 md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300/80 md:text-lg">
        {description}
      </p>
    </motion.div>
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
            <a href="#videos" className="transition hover:text-white">YT 影片</a>
            <a href="#syllabus" className="transition hover:text-white">課程大綱</a>
            <a href="#gallery" className="transition hover:text-white">講課照片</a>
            <a href="#community" className="transition hover:text-white">FB 社團</a>
            <a href="#faq" className="transition hover:text-white">Q&A</a>
          </div>
          <a
            href={facebookGroupUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-300/20"
          >
            加入社群
          </a>
        </div>
      </div>

      <main id="top">
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(244,114,182,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]" />
          <div className="absolute left-[-8%] top-24 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl" />
          <div className="absolute bottom-8 right-[-6%] h-80 w-80 rounded-full bg-rose-500/12 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-stone-200/90">
                <Star className="h-4 w-4 text-amber-300" />
                以實戰、內容與社群經營串起來的課程頁
              </div>

              <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-stone-50 md:text-7xl lg:text-[5.4rem] lg:leading-[0.95]">
                用網站把你的課程、
                <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  影片、社群與教學現場一起講清楚
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300/78 md:text-xl">
                不只是一頁課綱，而是一個能同時展示你專業、放大內容信任感、並把訪客導向報名與社群的長頁式課程網站。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#videos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-100 px-6 py-3.5 text-base font-semibold text-stone-950 transition hover:bg-white"
                >
                  看影片展示區
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={facebookGroupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-base font-semibold text-stone-100 transition hover:bg-white/10"
                >
                  進 FB 社團
                  <Facebook className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map(([title, text]) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                    <div className="text-lg font-semibold text-stone-50">{title}</div>
                    <p className="mt-2 text-sm leading-6 text-stone-300/72">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/10 bg-[#1b1712] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                <div className="rounded-[1.5rem] border border-white/8 bg-gradient-to-br from-[#2b2319] via-[#191510] to-[#120f0b] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-amber-200/70">Course Snapshot</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold text-stone-50">AI 教學與工作流實戰班</h3>
                    </div>
                    <div className="rounded-2xl border border-amber-300/20 bg-amber-300/12 p-3 text-amber-200">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {[
                      ['課程形式', '直播授課 + 模板講義 + 課後應用任務'],
                      ['網站重點', '課程內容、YT 影片、講課現場、FB 社群整合呈現'],
                      ['轉化方向', '先用內容建立信任，再導到社群與報名行動'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                        <div className="text-xs uppercase tracking-[0.24em] text-stone-400">{label}</div>
                        <div className="mt-2 text-base font-medium leading-7 text-stone-100">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-stone-950/50 p-4">
                      <div className="flex items-center gap-2 text-sm text-stone-300">
                        <Clock3 className="h-4 w-4 text-amber-300" />
                        內容節奏
                      </div>
                      <p className="mt-2 text-xl font-semibold text-stone-50">先相信，再報名</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-stone-950/50 p-4">
                      <div className="flex items-center gap-2 text-sm text-stone-300">
                        <Target className="h-4 w-4 text-amber-300" />
                        頁面目的
                      </div>
                      <p className="mt-2 text-xl font-semibold text-stone-50">內容展示 + 招生承接</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-6 rounded-3xl border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-md">
                <div className="text-xs uppercase tracking-[0.24em] text-stone-400">Bonus</div>
                <p className="mt-1 text-sm font-medium text-stone-100">可直接替換成你的 YT 連結與講課照片</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="overview" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Overview"
              title="這頁的角色不是只有介紹，而是替你放大信任感。"
              description="參考長頁式銷售頁邏輯，先說明定位與成果，再用影片、照片與社群承接，把網站變成一個真正能持續招生的入口。"
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
                {[
                  {
                    icon: <Video className="h-6 w-6" />,
                    title: '用影片建立信任',
                    text: '先讓訪客看到你的講課風格與專業節奏，比單靠文字更容易轉化。',
                  },
                  {
                    icon: <ImageIcon className="h-6 w-6" />,
                    title: '用照片補現場感',
                    text: '講課照片能快速補足真實感，讓網站不只像簡介，而像一個品牌現場。',
                  },
                  {
                    icon: <Facebook className="h-6 w-6" />,
                    title: '把流量導入社群',
                    text: '對還沒準備報名的人，先導到社團，後續才有機會長期互動與轉化。',
                  },
                  {
                    icon: <Target className="h-6 w-6" />,
                    title: '保留銷售頁節奏',
                    text: '仍然維持課程介紹、課綱、講師、FAQ 的說服順序，不會失焦。',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-[#1a1611] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/12 text-amber-200">
                      {item.icon}
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-stone-50">{item.title}</h3>
                    <p className="mt-3 leading-7 text-stone-300/78">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="videos" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="YouTube"
              title="影片精選"
              description="子代理幫我從舊建置內容裡找到了 3 支可直接使用的 YouTube 影片。先把它們接進頁面，之後你再替換成最新代表作即可。"
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div
                {...sectionReveal}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#18130f]"
              >
                <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(251,191,36,0.12),rgba(18,15,11,0.05)),linear-gradient(135deg,#342719,#17120d)] p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-200">
                      <Play className="h-3.5 w-3.5 text-amber-300" />
                      Featured Video
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=JJgLGLOxh_8"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300 transition hover:border-amber-300/20 hover:text-stone-100"
                    >
                      前往 YouTube
                    </a>
                  </div>

                  <div className="mt-10">
                    <h3 className="font-display text-4xl font-semibold text-stone-50 md:text-5xl">
                      補教業 AI 助手
                      <span className="block text-stone-300/82">先用真實案例把你的專業感打出來</span>
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300/80">
                      這支影片最適合放在首頁主打區，因為它同時連到教育情境、AI 應用與你這頁課程主題。後續你如果有更強的品牌影片，再直接把 embed 與連結換掉即可。
                    </p>
                  </div>
                </div>

                <div className="aspect-video w-full bg-black">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/JJgLGLOxh_8"
                    title="補教業 AI 助手"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 p-8">
                  <a
                    href="https://www.youtube.com/watch?v=JJgLGLOxh_8"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
                  >
                    <Play className="h-4 w-4" />
                    觀看主打影片
                  </a>
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    LINE 詢問課程
                  </a>
                  <span className="text-sm text-stone-400">這一區現在已接上真實影片，不再只是展示框</span>
                </div>
              </motion.div>

              <div className="grid gap-5">
                {videos.map((video, index) => (
                  <motion.a
                    key={video.title}
                    {...sectionReveal}
                    transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
                    href={video.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 transition hover:border-amber-300/20 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-300">
                        <Video className="h-3.5 w-3.5 text-amber-300" />
                        {video.tag}
                      </div>
                      <span className="text-sm text-stone-400">{video.duration}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-stone-50">{video.title}</h3>
                    <p className="mt-3 leading-7 text-stone-300/76">{video.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-200">
                      查看影片位置
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </motion.a>
                ))}
              </div>
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
                <div className="flex aspect-[4/5] items-end rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(251,191,36,0.22),rgba(190,24,93,0.18)),linear-gradient(135deg,#3b2a17,#17120d)] p-7">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-200">
                      <Star className="h-3.5 w-3.5 text-amber-300" />
                      Lead Instructor
                    </div>
                    <h3 className="mt-4 font-display text-4xl font-semibold text-stone-50">你的名字 / 品牌名稱</h3>
                    <p className="mt-3 max-w-sm leading-7 text-stone-200/76">
                      這裡適合放你最核心的定位，例如 AI 教學講師、顧問、內容創作者，或你希望市場記住的身分。
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...sectionReveal} className="grid gap-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
                  <h3 className="font-display text-2xl font-semibold text-stone-50">建議放進來的講師資訊</h3>
                  <div className="mt-6 grid gap-4">
                    {[
                      '授課年資、企業內訓、公開演講或校園合作經歷',
                      '你最擅長的教學主題，例如 AI 教學應用、內容工作流、自動化流程',
                      '具代表性的授課成果、學員回饋或實作案例',
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
                    ['專業可信', '讓訪客快速知道你為什麼值得被聽見'],
                    ['教學可感', '和影片、照片區搭配後，會更有真實感'],
                    ['品牌一致', '個人風格、內容主題與招生動線會更完整'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[1.6rem] border border-white/10 bg-[#17130f] p-6">
                      <div className="text-lg font-semibold text-stone-50">{title}</div>
                      <p className="mt-3 text-sm leading-6 text-stone-300/72">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="gallery" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Gallery"
              title="講課照片"
              description="這一區專門補足現場感。現在先用展示框排版，你之後只要把每格換成真實照片，就能快速成為高完成度品牌頁。"
            />

            <div className="mt-14 grid auto-rows-fr gap-5 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.title}
                  {...sectionReveal}
                  transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
                  className={`rounded-[1.9rem] border border-white/10 bg-[#19140f] p-5 overflow-hidden ${photo.size}`}
                >
                  <div className="relative h-full min-h-[180px] rounded-[1.5rem] overflow-hidden group">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent" />
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
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Who It's For"
              title="這門課適合誰"
              description="課程內容仍然維持清楚的目標對象設定，讓不同來源的訪客能快速判斷這是不是適合自己的課。"
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {audience.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...sectionReveal}
                  transition={{ ...sectionReveal.transition, delay: index * 0.06 }}
                  className="rounded-[1.9rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/12 text-amber-200">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-stone-50">{item.title}</h3>
                  <p className="mt-3 leading-7 text-stone-300/78">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Community"
              title="FB 社團承接"
              description="對還在觀望的人，不一定要立刻成交。把他先帶進社團，你就多了一個後續持續接觸、建立熟悉感與轉化的場域。"
            />

            <motion.div
              {...sectionReveal}
              className="mt-14 overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(24,119,242,0.18),rgba(18,15,11,0.12),rgba(255,255,255,0.04))] p-8 md:p-12"
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-200">
                    <Facebook className="h-3.5 w-3.5 text-[#6da8ff]" />
                    Facebook Group
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-stone-50 md:text-5xl">
                    把網站流量
                    <span className="block text-stone-300/86">自然接到你的社群裡</span>
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-stone-200/82 md:text-lg">
                    這裡已先接上你原本頁面裡出現過的 Facebook 社團連結。之後如果你要改成粉專、Line 社群或報名頁，也可以直接換掉。
                  </p>
                  <div className="mt-8">
                    <a
                      href={facebookGroupUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1667d8]"
                    >
                      <Facebook className="h-4 w-4" />
                      前往 Facebook 社團
                    </a>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    '放社團價值主張，例如：教學資源、直播通知、案例分享、講義下載。',
                    '放社團數據，例如成員數、互動率、每週固定內容節奏。',
                    '放一兩張社團截圖或活動照片，承接會更自然。',
                  ].map((item) => (
                    <div key={item} className="rounded-[1.5rem] border border-white/10 bg-[#120f0b]/45 p-5 text-stone-200/84">
                      <div className="flex gap-3">
                        <div className="mt-0.5 text-amber-200">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="leading-7">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Q&A"
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
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
                    >
                      <MessageCircle className="h-4 w-4" />
                      LINE 詢問
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
      </main>
    </div>
  );
}

export default App;
