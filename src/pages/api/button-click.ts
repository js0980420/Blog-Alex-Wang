import type { APIRoute } from 'astro';
import { SERVICE_SITE, SITE } from '../../consts';

export const prerender = false;

const CMS = 'https://cms.aixwang.dev';
const BUTTON_ID_PATTERN = /^[a-z0-9][a-z0-9_:-]{0,99}$/;
const recentRequests = new Map<string, number[]>();

function empty(status = 204) {
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength) : '';
}

function isAllowedOrigin(origin: string | null) {
  if (origin === SITE.url || origin === SERVICE_SITE.url || origin === 'https://www.aixwang.dev') return true;
  if (!import.meta.env.DEV || !origin) return false;
  try {
    return ['localhost', '127.0.0.1'].includes(new URL(origin).hostname);
  } catch {
    return false;
  }
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - 60_000;
  const attempts = (recentRequests.get(ip) || []).filter((time) => time > windowStart);
  attempts.push(now);
  recentRequests.set(ip, attempts);
  if (recentRequests.size > 5_000) recentRequests.clear();
  return attempts.length > 120;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAllowedOrigin(request.headers.get('origin'))) return empty(403);
  if (Number(request.headers.get('content-length') || 0) > 4_096) return empty(413);
  if (isRateLimited(request.headers.get('cf-connecting-ip') || 'unknown')) return empty(429);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return empty(400);
  }

  const buttonId = clean(payload.button_id, 100);
  if (!BUTTON_ID_PATTERN.test(buttonId)) return empty(400);

  const runtimeEnv = (locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env;
  const directusToken = runtimeEnv?.DIRECTUS_TOKEN || import.meta.env.DIRECTUS_TOKEN;
  if (!directusToken) {
    console.error('Button click CMS tracking skipped: DIRECTUS_TOKEN is missing.');
    return empty(503);
  }

  const cmsResponse = await fetch(`${CMS}/items/button_clicks`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${directusToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      button_id: buttonId,
      button_label: clean(payload.button_label, 100),
      button_location: clean(payload.button_location, 100),
      button_action: clean(payload.button_action, 50),
      destination_url: clean(payload.destination_url, 500),
      page_path: clean(payload.page_path, 300),
      site_host: new URL(request.url).hostname,
    }),
  });

  if (!cmsResponse.ok) {
    console.error('Button click CMS tracking failed', cmsResponse.status, await cmsResponse.text());
    return empty(502);
  }

  return empty();
};

export const ALL: APIRoute = () => empty(405);
