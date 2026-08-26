import type { APIRoute } from 'astro';
import { LINKS, SERVICE_SITE } from '../../consts';
import {
  TOOL_QUIZ_RECOMMENDATIONS,
  isToolQuizKey,
  type ToolQuizKey,
} from '../../data/toolQuiz';

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recentRequests = new Map<string, number[]>();

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] || character);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000;
  const attempts = (recentRequests.get(ip) || []).filter((time) => time > windowStart);
  attempts.push(now);
  recentRequests.set(ip, attempts);
  return attempts.length > 5;
}

function recommendationRows(primary: ToolQuizKey, secondary: ToolQuizKey[]) {
  const keys = [...new Set<ToolQuizKey>(['codex', primary, ...secondary])];
  return keys.map((key, index) => {
    const item = TOOL_QUIZ_RECOMMENDATIONS[key];
    return {
      ...item,
      label: index === 0 ? '所有需求的共同第一步' : index === 1 ? '最符合目前需求' : '其他需求會用到',
    };
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4096) return json({ message: '送出的資料太大。' }, 413);

  const origin = request.headers.get('origin');
  let originAllowed = origin === SERVICE_SITE.url;
  if (import.meta.env.DEV && origin) {
    try {
      const originUrl = new URL(origin);
      originAllowed = ['localhost', '127.0.0.1'].includes(originUrl.hostname);
    } catch {
      originAllowed = false;
    }
  }
  if (!originAllowed) return json({ message: '無法驗證請求來源。' }, 403);

  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  if (isRateLimited(ip)) return json({ message: '寄送次數過多，請稍後再試。' }, 429);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ message: '資料格式不正確。' }, 400);
  }

  // 隱藏欄位有值代表大多是機器人；回成功避免對方反覆重送，但不寄信。
  if (payload.website) return json({ ok: true }, 200);

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return json({ message: '請輸入有效的 Email。' }, 400);
  if (!isToolQuizKey(payload.primary)) return json({ message: '測驗結果不完整，請重新測驗。' }, 400);

  const primary = payload.primary;
  const secondary = Array.isArray(payload.secondary)
    ? [...new Set(payload.secondary.filter(isToolQuizKey))].filter((key) => key !== primary).slice(0, 4)
    : [];
  const rows = recommendationRows(primary, secondary);

  const runtimeEnv = (locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env;
  const resendApiKey = runtimeEnv?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
  const from = runtimeEnv?.QUIZ_EMAIL_FROM || import.meta.env.QUIZ_EMAIL_FROM;
  if (!resendApiKey || !from) return json({ message: '寄信服務目前尚未啟用，請先使用 LINE 聯絡。' }, 503);

  const text = [
    '你的 30 秒 AI 工具測驗結果',
    '',
    ...rows.flatMap((item) => [item.label, item.title, item.description, `${item.linkLabel}：${item.link}`, '']),
    `想進一步確認，可以加 LINE：${LINKS.line}`,
  ].join('\n');
  const htmlRows = rows.map((item) => `
    <section style="margin:0 0 24px;padding:20px;border:1px solid #d6d0c7">
      <p style="margin:0 0 6px;color:#7a2e3b;font-size:12px">${escapeHtml(item.label)}</p>
      <h2 style="margin:0 0 10px;font-size:20px">${escapeHtml(item.title)}</h2>
      <p style="margin:0 0 14px;line-height:1.7;color:#3f3f47">${escapeHtml(item.description)}</p>
      <a href="${escapeHtml(item.link)}" style="color:#7a2e3b">${escapeHtml(item.linkLabel)} →</a>
    </section>`).join('');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `你的 AI 工具建議：${TOOL_QUIZ_RECOMMENDATIONS[primary].title}`,
      text,
      html: `<main style="max-width:640px;margin:auto;padding:28px 20px;font-family:system-ui,sans-serif;color:#16161a"><h1 style="font-size:26px">你的 30 秒 AI 工具測驗結果</h1>${htmlRows}<p style="line-height:1.7">想進一步確認？<a href="${LINKS.line}" style="color:#7a2e3b">加 LINE 詢問</a></p></main>`,
    }),
  });

  if (!resendResponse.ok) {
    console.error('Tool quiz email failed', resendResponse.status, await resendResponse.text());
    return json({ message: '寄送暫時失敗，請稍後再試或改用 LINE。' }, 502);
  }

  return json({ ok: true }, 200);
};

export const ALL: APIRoute = () => json({ message: 'Method Not Allowed' }, 405);
