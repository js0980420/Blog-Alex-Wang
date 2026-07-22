// 全站 FAQ 單一來源：每題只定義一次，各頁面挑選需要的題目組合。
// 改答案只需要改這裡，首頁與服務頁（含 JSON-LD FAQPage）會同步更新。
export interface Faq {
  question: string;
  answer: string;
}

const prep: Faq = {
  question: '課前需要準備什麼？',
  answer:
    '除了教學費用，還需要付費訂閱 AI。初學者只要先準備一個月 20 美元的額度就夠了。如果你要學的是自動發文或留言、私訊，才需要另外確認你有可用的 Facebook 帳號，能拿來登入 Meta 開發者後台並綁定其他要串接的帳號。',
};

const noTechBackground: Faq = {
  question: '沒有技術背景可以上嗎？',
  answer:
    '可以。這門課用意在於把原本複雜的技術門檻，優化成只要對話就能完成的工作流，任何人只要會操作電腦就能上。',
};

const onlineClass: Faq = {
  question: '可以約線上教學嗎？',
  answer:
    '可以，用 Google Meet 或 Discord，只要能分享螢幕畫面就可以上課；實體課則約雙北的咖啡廳。',
};

const whyNotFreeAi: Faq = {
  question: '為什麼不用網頁版或免費 AI？',
  answer:
    '因為網頁版沒有 Agent 權限，也沒辦法做環境設定、填入申請完的 Meta API Key，更不能直接寫自動發文腳本，基本上只適合拿來問問題。免費 AI 的穩定度和能力也通常不如 Claude 或 Codex，很容易一直出錯，花掉的時間可能遠超過 20 美元。',
};

const claudeOrCodex: Faq = {
  question: 'Claude、Codex 預算只夠選一個的話選哪個？',
  answer:
    '我會推薦 Codex。因為 5.5 更新後，額度比 Claude 多很多，而且也可以拿來當龍蝦或 Hermes 的飼料，不用太擔心被封號。',
};

const booking: Faq = {
  question: '怎麼預約或詢問費用？',
  answer:
    '直接加 LINE 免費諮詢，說明你的目標（例如想自動發文、想學 AI 拍片），我會建議適合的堂數與報價。',
};

export const HOME_FAQS: Faq[] = [prep, noTechBackground, whyNotFreeAi, onlineClass, claudeOrCodex];

export const ONE_ON_ONE_FAQS: Faq[] = [onlineClass, prep, noTechBackground, booking];
