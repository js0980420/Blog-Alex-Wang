import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  MessageSquare, 
  Database, 
  Workflow, 
  BarChart3, 
  Users, 
  Zap, 
  ChevronRight, 
  PlayCircle, 
  Mail, 
  MessageCircle,
  Server,
  Code2,
  Cpu,
  Network,
  ChevronDown,
  Lightbulb,
  BrainCircuit,
  Cloud,
  Layers,
  Box,
  X,
  Terminal,
  BookOpen,
  FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LobsterLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Tail */}
    <path d="M12 22C9.5 22 7.5 20.5 6.5 18.5L8.5 15H15.5L17.5 18.5C16.5 20.5 14.5 22 12 22Z" />
    {/* Body */}
    <rect x="8.5" y="7" width="7" height="9" rx="3.5" />
    {/* Left Claw */}
    <path d="M8.5 8.5C4 10 1 5 2.5 2.5C4 0 7.5 1.5 8.5 5C9 6.5 9 7.5 8.5 8.5Z" />
    {/* Right Claw */}
    <path d="M15.5 8.5C20 10 23 5 21.5 2.5C20 0 16.5 1.5 15.5 5C15 6.5 15 7.5 15.5 8.5Z" />
    {/* Antennae */}
    <path d="M10 7C10 3 6.5 1.5 3.5 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M14 7C14 3 17.5 1.5 20.5 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Legs */}
    <path d="M8.5 11H3.5M8.5 13.5H4.5M15.5 11H20.5M15.5 13.5H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// --- Components ---

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

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
          <LobsterLogo className="w-7 h-7 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">AI Automation</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#services" className="hover:text-white transition-colors">服務項目</a>
        <a href="#use-cases" className="hover:text-white transition-colors">應用案例</a>
        <a href="#tech-stack" className="hover:text-white transition-colors">技術架構</a>
        <a href="#tutorials" className="hover:text-white transition-colors text-red-400 font-bold">教學文章</a>
        <a href="#faq" className="hover:text-white transition-colors">常見問題</a>
      </div>
      <a 
        href="#contact" 
        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
      >
        聯絡我們
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Enterprise AI Solutions
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
      >
        AI CRM 與企業 <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
          自動化解決方案
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        讓 CRM、LINE、客服全面 AI 化 <br className="hidden md:block" />
        打造真正可運作的 AI Agent 自動化系統
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a 
          href="#contact" 
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-lg transition-colors flex items-center justify-center gap-2"
        >
          立即諮詢 <ChevronRight className="w-5 h-5" />
        </a>
        <a 
          href="#services" 
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg transition-colors flex items-center justify-center gap-2"
        >
          查看方案
        </a>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: "CRM AI 自動化",
      description: "導入 OpenClaw 進行 CRM 自動化，提升客戶關係管理效率。",
      features: ["AI 客戶分析", "AI 任務自動化", "AI workflow", "AI 客戶回覆", "AI 客戶資料整理", "AI CRM automation"]
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-red-500" />,
      title: "LINE 自動化服務",
      description: "打造專屬 LINE 官方帳號，結合 AI Agent 提供全天候智能服務。",
      features: ["LINE Official Account 建置", "LINE LIFF 應用", "LINE + OpenClaw AI Agent", "LINE 自動客服", "LINE AI 回覆", "LINE CRM 整合"]
    },
    {
      icon: <Database className="w-8 h-8 text-red-500" />,
      title: "RAG 智能客服",
      description: "基於企業內部資料庫的精準 AI 客服，與 n8n 不同，知識庫可隨時調整，AI 回覆更準確。",
      features: ["可動態更新知識庫", "PDF 文件知識庫", "文件資料庫", "向量資料庫", "AI 自學習", "多語言客服", "LINE 客服整合"]
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-red-500" />,
      title: "AI 顧問諮詢",
      description: "專為企業量身打造的 AI 導入藍圖。從業務流程健檢、痛點分析到技術選型，提供專業且具體的可行性評估，協助您以最低風險實現數位轉型。",
      features: ["業務流程健檢", "AI 導入可行性評估", "技術選型建議", "數位轉型藍圖規劃", "PoC 概念驗證", "企業內部 AI 培訓"]
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="我們的服務" 
          subtitle="為企業量身打造的 AI 自動化解決方案" 
        />
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900 transition-colors relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const cases = [
    { icon: <Bot />, title: "AI 客服", desc: "24/7 智能回覆，解決常見問題" },
    { icon: <Users />, title: "AI CRM", desc: "自動化客戶標籤與跟進提醒" },
    { icon: <BarChart3 />, title: "AI 客戶分析", desc: "深度洞察客戶行為與需求" },
    { icon: <MessageCircle />, title: "AI LINE客服", desc: "無縫整合 LINE 生態系" },
    { icon: <Workflow />, title: "AI 自動工作流程", desc: "串接多個系統，自動化日常任務" },
  ];

  return (
    <section id="use-cases" className="py-32 bg-zinc-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="AI 自動化應用案例" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-zinc-950 border border-white/5 flex items-start gap-4 hover:border-red-500/30 transition-colors"
            >
              <div className="p-3 rounded-xl bg-white/5 text-red-400">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const tech = [
    { name: "React / Vue", icon: <Code2 />, category: "Frontend" },
    { name: "Tailwind CSS", icon: <Layers />, category: "Styling" },
    { name: "Node.js / Python", icon: <Server />, category: "Backend" },
    { name: "PHP Laravel", icon: <Server />, category: "Backend" },
    { name: "LLM (OpenAI/Claude)", icon: <BrainCircuit />, category: "AI Models" },
    { name: "OpenClaw / n8n", icon: <Cpu />, category: "Automation Engine" },
    { name: "AI Agent", icon: <Bot />, category: "Workflow" },
    { name: "MySQL / PostgreSQL", icon: <Database />, category: "Database" },
    { name: "Pinecone / Qdrant", icon: <Network />, category: "Vector DB (RAG)" },
    { name: "Redis", icon: <Database />, category: "Cache" },
    { name: "LINE API / LIFF", icon: <MessageSquare />, category: "Integration" },
    { name: "AWS / GCP", icon: <Cloud />, category: "Infrastructure" },
    { name: "Docker", icon: <Box />, category: "Deployment" },
  ];

  return (
    <section id="tech-stack" className="py-16 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading title="技術架構" subtitle="採用現代化、高擴展性的技術堆疊" />
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {tech.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-4 rounded-full bg-zinc-900 border border-white/10"
            >
              <div className="text-red-500 [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-6 md:[&>svg]:h-6">{item.icon}</div>
              <div>
                <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider font-semibold leading-tight">{item.category}</div>
                <div className="text-xs md:text-base font-medium leading-tight">{item.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const studies = [
    { 
      title: "知名電商平台：客服自動化", 
      desc: "導入 AI Agent 處理退換貨與常見問題，降低 70% 人工客服成本，並將平均回覆時間從 2 小時縮短至 3 分鐘。" 
    },
    { 
      title: "連鎖餐飲品牌：LINE 智能服務", 
      desc: "結合 LIFF 與 AI Agent，打造流暢的線上點餐與客製化諮詢體驗，會員綁定率與回購率雙雙提升 40%。" 
    },
    { 
      title: "跨國製造業：RAG 內部知識庫", 
      desc: "導入企業內部 SOP 與機台維修手冊，打造專屬的高精準度問答系統，工程師查閱資料時間減少 80%。" 
    },
    { 
      title: "房地產代銷：CRM 潛客自動化", 
      desc: "自動化客戶分眾、意向評分與行銷推播，精準鎖定高潛力買家，看屋轉換率與成交率顯著提升 25%。" 
    },
    { 
      title: "法律顧問公司：AI 審閱助理", 
      desc: "透過 AI 顧問導入藍圖，建置專屬合約審查助理，自動標註風險條款，大幅減少律師 50% 的初步審閱時間。" 
    },
    { 
      title: "線上教育平台：24/7 學習助教", 
      desc: "整合龐大課程內容與 RAG 技術，提供學生全天候的課業解答與個人化學習建議，課程完課率成長 15%。" 
    },
  ];

  return (
    <section className="py-32 bg-zinc-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="客戶案例" subtitle="看看各行各業如何透過 AI 自動化實現業務增長" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-950 border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors" />
              <h3 className="text-xl font-bold mb-4 relative z-10 leading-snug">{study.title}</h3>
              <p className="text-zinc-400 relative z-10 leading-relaxed text-sm">{study.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Tutorials = () => {
  const [activeDoc, setActiveDoc] = useState<{title: string, content: string} | null>(null);

  const docs = [
    {
      id: 'self-healing',
      title: '雙機自癒系統',
      desc: '使用 Tailscale 搭配腳本，實現兩台機器互相監測與修復的高可用性部署。',
      icon: <Terminal className="w-8 h-8" />,
      file: '/docs/self-healing-system.md'
    }
  ];

  const openDoc = async (doc: any) => {
    try {
      const res = await fetch(doc.file);
      const text = await res.text();
      setActiveDoc({ title: doc.title, content: text });
    } catch (e) {
      console.error(e);
      setActiveDoc({ title: 'Error', content: '無法載入教學文件' });
    }
  };

  return (
    <section id="tutorials" className="py-32 relative border-y border-white/5 bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="技術教學指南" subtitle="深入了解系統架構與進階部署技巧，輕鬆掌握自動化！" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {docs.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => openDoc(doc)}
              className="p-8 rounded-3xl bg-zinc-950 border border-white/10 hover:border-red-500/50 hover:bg-zinc-900/80 transition-all cursor-pointer group shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all shadow-lg shadow-red-500/10">
                {doc.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{doc.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{doc.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-red-500 group-hover:text-red-400 ml-auto w-fit">
                閱讀文件 <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveDoc(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-bold">{activeDoc.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveDoc(null)}
                  className="p-2 rounded-full hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-10 overflow-y-auto text-zinc-300 max-h-[calc(90vh-73px)]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-xl border border-white/10 !my-6 !bg-[#1E1E1E] text-sm"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded text-sm font-mono mx-1" {...props}>
                          {children}
                        </code>
                      )
                    },
                    h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white tracking-tight" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white border-b border-white/10 pb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-4 text-white" {...props} />,
                    p: ({node, ...props}) => <p className="leading-relaxed mb-6 text-base md:text-lg text-zinc-400" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2 text-zinc-400 pl-4" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 space-y-2 text-zinc-400 pl-4" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-red-500 bg-red-500/10 p-4 md:p-6 rounded-r-xl my-6 text-zinc-300 italic shadow-inner" {...props} />,
                  }}
                >
                  {activeDoc.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const DemoVideo = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: '0H-liCZC5pE',
      title: '美業AI預約客服',
      desc: '展示 AI Agent 如何自動處理預約與客服諮詢',
      cover: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'JJgLGLOxh_8',
      title: '補教業AI助手',
      desc: '展示 AI Agent 如何協助補教業處理學生問答與行政',
      cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'Rk_4xCbHD6Q',
      title: '龍蝦 Openclaw 客服',
      desc: '展示 OpenClaw 自動化引擎如何處理客服流程',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Homarus_americanus_230756670.jpg'
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionHeading title="AI 自動化系統 Demo" subtitle="點擊觀看實際運作畫面" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {videos.map((video, idx) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="cursor-pointer group relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-red-900/10 aspect-video"
              onClick={() => setActiveVideo(video.id)}
            >
              {/* Cover Image */}
              <img 
                src={video.cover} 
                alt={`${video.title} 封面圖`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-zinc-950/60 group-hover:bg-zinc-950/40 transition-colors duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/90 text-white flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-red-500/30 mb-4 backdrop-blur-sm">
                  <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 ml-1" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg mb-2">{video.title}</h3>
                  <p className="text-sm sm:text-base text-zinc-200 drop-shadow-md">{video.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-red-500 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} 
                title="AI 自動化系統 Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "什麼是 AI CRM？", a: "AI CRM 是將人工智慧技術融入客戶關係管理系統，能自動分析客戶行為、預測需求，並自動化執行跟進任務，大幅提升業務效率。" },
    { q: "OpenClaw 是什麼？", a: "OpenClaw 是一個強大的自動化引擎，專為構建 AI Agent 工作流程而設計，能無縫串接各種 API 與服務。" },
    { q: "RAG 客服如何運作？", a: "RAG (Retrieval-Augmented Generation) 結合了檢索系統與生成式 AI。它會先從您的企業文件庫中找出相關資訊，再交由 AI 整理成自然流暢的回答，確保內容準確且不產生幻覺。" },
    { q: "AI 客服可以整合 LINE 嗎？", a: "可以的！我們提供完整的 LINE 官方帳號整合方案，包含自動回覆、LIFF 應用以及與 CRM 系統的資料同步。" },
    { q: "知識庫如何更新？", a: "我們的系統支援動態更新，您可以隨時上傳新的 PDF 或文件，向量資料庫會自動重新建立索引，AI 即可立即根據最新資訊進行回覆。" },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-zinc-900/30 border-y border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading title="常見問題" />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-950"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform", openIndex === index && "rotate-180")} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-32 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
      >
        準備好升級您的企業系統了嗎？
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-zinc-400 mb-12"
      >
        立即導入 AI 自動化，釋放團隊潛力，專注於更高價值的業務。
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <a 
          href="https://line.me/ti/p/kdhrBKYuFZ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-medium text-lg transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#06C755]/20"
        >
          <MessageCircle className="w-6 h-6" /> LINE 免費諮詢
        </a>
        <a 
          href="mailto:castion2293@yahoo.com.tw" 
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-lg transition-colors flex items-center justify-center gap-3"
        >
          <Mail className="w-6 h-6" /> Email 聯絡
        </a>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-white/5 text-center text-zinc-500 text-sm">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <LobsterLogo className="w-7 h-7 text-red-500" />
        <span className="font-semibold text-zinc-300">AI Automation</span>
      </div>
      <p>© {new Date().getFullYear()} AI Automation. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-red-500/30">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <UseCases />
        <TechStack />
        <CaseStudies />
        <Tutorials />
        <DemoVideo />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
