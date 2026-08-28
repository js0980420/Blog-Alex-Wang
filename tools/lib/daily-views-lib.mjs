import { classifyPath } from './page-views-lib.mjs';
import { normalizeGa4Path } from './ga4-views-lib.mjs';

export function parseGa4DailyRows(response) {
  return (response?.rows ?? []).map((row) => ({
    date: row?.dimensionValues?.[0]?.value ?? '',
    path: row?.dimensionValues?.[1]?.value ?? '',
    views: Number(row?.metricValues?.[0]?.value ?? 0),
    active_users: Number(row?.metricValues?.[1]?.value ?? 0),
    total_users: Number(row?.metricValues?.[2]?.value ?? 0),
  }));
}

export function parseGa4DailyUserRows(response) {
  return (response?.rows ?? []).map((row) => ({
    date: row?.dimensionValues?.[0]?.value ?? '',
    active_users: Number(row?.metricValues?.[0]?.value ?? 0),
    total_users: Number(row?.metricValues?.[1]?.value ?? 0),
  }));
}

export function parseGa4AudienceMetrics(response) {
  const byRange = new Map(
    (response?.rows ?? []).map((row) => [
      row?.dimensionValues?.[0]?.value ?? '',
      {
        total_users: Number(row?.metricValues?.[0]?.value ?? 0),
        active_users: Number(row?.metricValues?.[1]?.value ?? 0),
      },
    ]),
  );

  return {
    key: 'site',
    total_users: byRange.get('since_launch')?.total_users ?? 0,
    active_users_30d: byRange.get('last_30_days')?.active_users ?? 0,
    active_users_today: byRange.get('today')?.active_users ?? 0,
  };
}

const KNOWN_DEVICE_CATEGORIES = new Map([
  ['desktop', 'desktop_users'],
  ['mobile', 'mobile_users'],
  ['tablet', 'tablet_users'],
]);

// 回應維度順序是 [deviceCategory, dateRange]（GA4 把多組具名日期區間的隱含 dateRange 維度
// 附加在明確指定的維度之後，不是排在最前面——這是拿真實 GA4 Property 實測過的順序，不是猜的）。
// 指標順序照請求的 [totalUsers, activeUsers]，since_launch 對應 total_users 系列（累積、跟
// audience_metrics.total_users 同區間同指標），last_30_days 對應 *_30d 系列（跟
// audience_metrics.active_users_30d 同區間同指標）。
export function parseGa4DeviceMetrics(response) {
  const result = {
    desktop_users: 0, mobile_users: 0, tablet_users: 0, other_users: 0,
    desktop_users_30d: 0, mobile_users_30d: 0, tablet_users_30d: 0, other_users_30d: 0,
  };
  for (const row of response?.rows ?? []) {
    const category = (row?.dimensionValues?.[0]?.value ?? '').toLowerCase();
    const range = row?.dimensionValues?.[1]?.value ?? '';
    const totalUsers = Number(row?.metricValues?.[0]?.value ?? 0);
    const activeUsers = Number(row?.metricValues?.[1]?.value ?? 0);
    const field = KNOWN_DEVICE_CATEGORIES.get(category);
    if (range === 'since_launch') {
      if (field) result[field] += totalUsers;
      else result.other_users += totalUsers;
    } else if (range === 'last_30_days') {
      if (field) result[`${field}_30d`] += activeUsers;
      else result.other_users_30d += activeUsers;
    }
  }
  return result;
}

function formatGaDate(raw) {
  if (!/^\d{8}$/.test(raw)) return null;
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

export function buildDailyViewRows({ gaRows, dailyUserRows = [], articleTitles = new Map(), startDate, endDate, syncedAt }) {
  const byDate = new Map();
  const usersByDate = new Map(
    dailyUserRows
      .map((row) => [formatGaDate(row.date), row])
      .filter(([date]) => date),
  );
  for (const row of gaRows ?? []) {
    const date = formatGaDate(row.date);
    const path = normalizeGa4Path(row.path);
    if (!date || !path) continue;
    const classification = classifyPath(path, articleTitles);
    if (!classification.is_current || !['頁面', '文章'].includes(classification.content_type)) continue;
    const bucket = byDate.get(date) ?? { total_views: 0, page_views: 0, article_views: 0 };
    const views = Number(row.views ?? 0);
    bucket.total_views += views;
    if (classification.content_type === '文章') bucket.article_views += views;
    else bucket.page_views += views;
    byDate.set(date, bucket);
  }

  const rows = [];
  const cursor = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  while (cursor <= end) {
    const date = cursor.toISOString().slice(0, 10);
    const users = usersByDate.get(date);
    rows.push({
      date,
      ...(byDate.get(date) ?? { total_views: 0, page_views: 0, article_views: 0 }),
      active_users: Number(users?.active_users ?? 0),
      total_users: Number(users?.total_users ?? 0),
      views_synced_at: syncedAt,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return rows;
}

export function buildDailyContentViewRows({ gaRows, articleTitles = new Map(), syncedAt }) {
  const byContentAndDate = new Map();

  for (const row of gaRows ?? []) {
    const date = formatGaDate(row.date);
    const path = normalizeGa4Path(row.path);
    if (!date || !path) continue;

    const classification = classifyPath(path, articleTitles);
    if (!classification.is_current || !['頁面', '文章'].includes(classification.content_type)) continue;

    const views = Number(row.views ?? 0);
    if (!Number.isFinite(views) || views <= 0) continue;

    const recordKey = `${date}:${path}`;
    const existing = byContentAndDate.get(recordKey);
    if (existing) {
      existing.views += views;
      existing.active_users += Number(row.active_users ?? 0);
      existing.total_users += Number(row.total_users ?? 0);
      continue;
    }

    byContentAndDate.set(recordKey, {
      record_key: recordKey,
      date,
      content_type: classification.content_type,
      name: classification.name,
      path,
      views,
      active_users: Number(row.active_users ?? 0),
      total_users: Number(row.total_users ?? 0),
      views_synced_at: syncedAt,
    });
  }

  return [...byContentAndDate.values()].sort(
    (a, b) => b.date.localeCompare(a.date) || b.views - a.views || a.path.localeCompare(b.path),
  );
}
