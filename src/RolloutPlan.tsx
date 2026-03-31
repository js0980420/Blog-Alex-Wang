import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Target, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Zap,
  Building,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Layers,
  Calendar,
  CreditCard,
  Rocket
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        AI Implementation Plan
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
      >
        AI 落地師 <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
          企業導入計畫書
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        協助企業從「學會 AI」走向「真正落地」<br className="hidden md:block" />
        透過第一線協作與系統建置，完成數位轉型
      </motion.p>
    </div>
  </section>
);

const BackgroundAndRole = () => (
  <section className="py-24 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <Target className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-3xl font-bold mb-6">計畫背景：<br/><span className="text-zinc-400">學會了，然後呢？</span></h3>
          <p className="text-zinc-400 leading-relaxed space-y-4 text-lg">
            近年來 AI 技術快速發展，許多企業安排了教育訓練，卻常面臨「學會 AI 卻無法真正落地」的問題。缺乏技術建立自動化流程、導入方向不清楚、效率低落。
            <br /><br />
            若僅依賴內部員工，常會面臨離職技術斷層及交接困難。透過我們的專業團隊全程負責，企業完全無需擔心內部人員異動造成的維護問題。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
            <Briefcase className="w-7 h-7 text-red-500" />
          </div>
          <h3 className="text-3xl font-bold mb-6">什麼是 AI 落地師？</h3>
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-lg text-zinc-300 leading-relaxed font-medium mb-4">
              AI Implementation Specialist
            </p>
            <p className="text-zinc-400 leading-relaxed text-lg">
              專門負責將 AI 技術真正導入企業流程的專業角色。不同於講師或顧問，我們會<strong className="text-white">實際進駐企業</strong>，直接協助建置系統、建立自動化流程並整合系統，使 AI 能夠真正運作。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ServiceModel = () => {
  const points = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "精準挖掘痛點",
      desc: "直接參與日常作業，深入體會瑣碎細節與真實痛點，發現會議中被忽略的流程瓶頸。"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "提出創新方案",
      desc: "透過現場觀察，提出未曾想到的 AI 應用方式，確保解決方案真正貼合實務。"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "極致溝通效率",
      desc: "相較於傳統大拜拜開會，進駐服務能即時解決技術疑難與調整，縮短決策路徑。"
    }
  ];

  return (
    <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="深度進駐與現場協作" subtitle="服務包含流程分析、應用規劃、系統建置、自動化與員工培訓" />
        
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((pt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-950 border border-white/5 hover:border-red-500/30 hover:bg-zinc-900 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6">
                {pt.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{pt.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{pt.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueSection = () => {
  const values = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "避免無謂試錯與彎路",
      desc: "內部員工缺乏經驗易陷「試錯期」，耗費人力且可能選錯工具。我們直接給予正確框架。"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "確保系統健壯與資安",
      desc: "防範技術債與資安風險。我們提供成熟的開發框架，確保系統穩定且符合安全規範。"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "高效投資報酬率 (ROI)",
      desc: "藉由專業經驗確保系統「精準上線」，縮短回收期，讓企業在轉型賽道搶佔先機。"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="降低隱形成本與專業避險" subtitle="為什麼選擇專業 AI 落地師而不是內部自行摸索？" />
        <div className="grid lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-white/10"
            >
              <div className="text-red-500 mb-6">{v.icon}</div>
              <h4 className="text-xl font-bold mb-4">{v.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TargetAudience = () => {
  const targets = [
    { icon: <TrendingUp />, label: "成長型企業" },
    { icon: <Users />, label: "人力不足企業" },
    { icon: <ShoppingCart />, label: "電商/零售業" },
    { icon: <GraduationCap />, label: "教育產業" },
    { icon: <HeartPulse />, label: "醫療照護" },
    { icon: <Layers />, label: "大量文件處理" },
  ];

  return (
    <section className="py-24 bg-zinc-900/30 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-12">適合導入的企業類型</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {targets.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-zinc-950 border border-white/10 hover:border-red-500/50 transition-colors"
            >
              <div className="text-red-400 [&>svg]:w-5 [&>svg]:h-5">{t.icon}</div>
              <span className="font-medium text-zinc-200">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cases = () => {
  const cases = [
    {
      title: "AI 智慧客服系統",
      tag: "省時提效",
      desc: "導入後自動處理約 70% 基礎諮詢，客服人員專注複雜問題，大幅提升效率與降低人力成本。"
    },
    {
      title: "AI 文件審核自動化",
      tag: "律師/金融",
      desc: "建置文件識別與比對系統，自動提取條款並偵測法律風險，節省 80% 人工審閱時間。"
    },
    {
      title: "AI 行銷與內容生成",
      tag: "跨境電商",
      desc: "自動根據產品生成多國語言文案及社群貼文，維持品牌一致性，降低 60% 外包翻譯支出。"
    },
    {
      title: "AI 數據整合決策",
      tag: "連鎖零售",
      desc: "整合銷售數據建立自動預警預測，降低 15% 庫存積壓，實現數據驅動經營。"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="實際導入案例" subtitle="看看我們如何改變這些企業的運作模式" />
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-950 border border-white/5 relative group hover:border-red-500/30"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold mb-4">
                {c.tag}
              </div>
              <h4 className="text-xl font-bold mb-4">{c.title}</h4>
              <p className="text-zinc-400 leading-relaxed text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapAndPricing = () => {
  return (
    <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="合作與彈性導入方案" subtitle="專為各規模企業設計的模組化與分期模式" />
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Building className="w-6 h-6 text-red-500" /> 合作模式
            </h3>
            <ul className="space-y-4">
              <li className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                <strong className="text-white block mb-1">一次性專案導入</strong>
                <span className="text-zinc-400 text-sm">明確目標與範圍的專案開發與落地。</span>
              </li>
              <li className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                <strong className="text-white block mb-1">AI 團隊進駐</strong>
                <span className="text-zinc-400 text-sm">月或季點合作，貼身調整流程。</span>
              </li>
              <li className="bg-zinc-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
                <strong className="text-white block mb-1">長期合作</strong>
                <span className="text-zinc-400 text-sm">持續優化系統與技術支援。</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-red-500" /> 分期導入模式
            </h3>
            <ul className="space-y-4">
              <li className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                <strong className="text-white flex items-center gap-2 mb-1"><Rocket className="w-4 h-4 text-red-400"/> 高速導入</strong>
                <span className="text-zinc-400 text-sm">1~3 個月內快速上線主核心功能。</span>
              </li>
              <li className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                <strong className="text-white flex items-center gap-2 mb-1"><Target className="w-4 h-4 text-red-400"/> 標準導入</strong>
                <span className="text-zinc-400 text-sm">3~6 個月，涵蓋全面訓練與流程重塑。</span>
              </li>
              <li className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                <strong className="text-white flex items-center gap-2 mb-1"><TrendingUp className="w-4 h-4 text-red-400"/> 彈性導入</strong>
                <span className="text-zinc-400 text-sm">每月少量進駐，6~12 個月無壓力分階轉型。中小企友善，可搭分期付款降低初期門檻。</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-white">模組化開發與優先開發機制</h3>
            <p className="text-zinc-400 leading-relaxed font-medium mb-4">
              AI 客服 / AI CRM / AI 文件處理 / AI 行銷
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              我們依據：「工作量最大的流程」、「最易導入的流程」、「極大化 ROI」三大指標，決定企業最應優先開發的模組，確保立竿見影。
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-red-600/20 to-zinc-900 border border-red-500/20">
            <h3 className="text-xl font-bold mb-4 text-white">逐步擴展，最終形成 AI 驅動</h3>
            <p className="text-zinc-300 leading-relaxed font-medium mb-4">
              第一年: 基礎自動化 → 第二年: AI 數據系統 → 第三年: 決策預測系統
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              任何規模企業都能透過「彈性進駐、分期導入、模組開發」完成數位轉型。讓我們協助您從「學習 AI」到「AI 落地運作」。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default function RolloutPlan() {
  return (
    <div className="bg-zinc-950 text-zinc-50 font-sans selection:bg-red-500/30">
      <Hero />
      <BackgroundAndRole />
      <ServiceModel />
      <ValueSection />
      <TargetAudience />
      <Cases />
      <RoadmapAndPricing />
      
      <section className="py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">準備好開始您的 AI 落地計畫了嗎？</h2>
          <a href="https://line.me/ti/p/kdhrBKYuFZ" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-lg transition-colors">
            安排免費線上諮詢
          </a>
        </motion.div>
      </section>
    </div>
  );
}
