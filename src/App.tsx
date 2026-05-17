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
    title: 'Claude Code / Codex 安裝與 AI 工作流起手式',
    summary: '從桌面版 Claude Code、Codex 安裝開始，帶到 Meta 三大 API 串接、自動發文，以及用 skill 組出可重複使用的工作流。',
  },
  {
    label: 'Module 02',
    title: 'Prompt 結構與任務拆解',
    summary: '把新手最容易卡住的需求拆清楚，讓 AI 回答更穩定，也更容易串進日常工作。',
  },
  {
    label: 'Module 03',
    title: '教材、簡報與內容快速生成',
    summary: '用 AI 快速產出講義、投影片、社群貼文與教學素材，降低備課與內容製作時間。',
  },
  {
    label: 'Module 04',
    title: '自動化流程與資料整理',
    summary: '把筆記、文件、表單與社群內容串起來，從手動操作進階到可重複執行的流程。',
  },
  {
    label: 'Module 05',
    title: 'AI Agent 與 Skill 實作',
    summary: '學會把常做的事情包成 skill，讓 AI 不只是聊天工具，而是真正能接手任務的助手。',
  },
  {
    label: 'Module 06',
    title: '實戰專題與成果輸出',
    summary: '把前面學到的 API、發文流程與 skill 整合成一套能展示、能交付、也能實際使用的成果。',
  },
];

const outcomes = [
  '從零開始完成 Claude Code / Codex 的安裝與基本操作，不再卡在環境設定。',
  '學會串接 Meta 三大 API，理解 AI 如何接進真實社群工作流。',
  '做出自動發文流程，讓 AI 從對話工具升級成可執行助手。',
  '學會寫 skill，把常用任務整理成你自己的可重用工作流。',
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
    title: '教學-珊珊',
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
<section id="overview" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Course Overview"
              title="課程介紹"
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
                <div className="relative flex aspect-[4/5] items-end rounded-[1.5rem] overflow-hidden bg-stone-950/50">
                  <img
                    src="/images/新手學AI課程第一堂.png"
                    alt="新手學AI課程第一堂"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent" />
                  <div className="relative z-10 p-7">
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

<section id="videos" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Teaching Content"
              title="教學影片"
              description="三支教學影片都直接放上預覽，讓訪客一進來就能看內容。主打教學影片固定放在最左邊。"
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

</main>
    </div>
  );
}

export default App;
