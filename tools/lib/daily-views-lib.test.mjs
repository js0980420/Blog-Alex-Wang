import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDailyContentViewRows, buildDailyViewRows, parseGa4AudienceMetrics, parseGa4DailyRows, parseGa4DailyUserRows, parseGa4DeviceMetrics } from './daily-views-lib.mjs';

test('parseGa4DailyRows 讀取日期、路徑、觀看與使用者指標', () => {
  assert.deepEqual(parseGa4DailyRows({ rows: [{ dimensionValues: [{ value: '20260816' }, { value: '/' }], metricValues: [{ value: '3' }, { value: '2' }, { value: '2' }] }] }), [{ date: '20260816', path: '/', views: 3, active_users: 2, total_users: 2 }]);
});

test('parseGa4DailyUserRows 讀取不重複加總的全站每日使用者', () => {
  assert.deepEqual(parseGa4DailyUserRows({ rows: [{ dimensionValues: [{ value: '20260816' }], metricValues: [{ value: '5' }, { value: '6' }] }] }), [{ date: '20260816', active_users: 5, total_users: 6 }]);
});

test('parseGa4AudienceMetrics 將三個日期區間轉成置頂數字', () => {
  const response = {
    rows: [
      { dimensionValues: [{ value: 'today' }], metricValues: [{ value: '3' }, { value: '2' }] },
      { dimensionValues: [{ value: 'since_launch' }], metricValues: [{ value: '120' }, { value: '115' }] },
      { dimensionValues: [{ value: 'last_30_days' }], metricValues: [{ value: '80' }, { value: '72' }] },
    ],
  };
  assert.deepEqual(parseGa4AudienceMetrics(response), {
    key: 'site', total_users: 120, active_users_30d: 72, active_users_today: 2,
  });
});

test('parseGa4AudienceMetrics 沒有資料時回傳 0', () => {
  assert.deepEqual(parseGa4AudienceMetrics({}), {
    key: 'site', total_users: 0, active_users_30d: 0, active_users_today: 0,
  });
});

test('parseGa4DeviceMetrics 依裝置類別與日期區間拆分使用者，大小寫不分', () => {
  const response = {
    rows: [
      { dimensionValues: [{ value: 'desktop' }, { value: 'since_launch' }], metricValues: [{ value: '170' }, { value: '170' }] },
      { dimensionValues: [{ value: 'Mobile' }, { value: 'since_launch' }], metricValues: [{ value: '105' }, { value: '105' }] },
      { dimensionValues: [{ value: 'tablet' }, { value: 'since_launch' }], metricValues: [{ value: '1' }, { value: '1' }] },
      { dimensionValues: [{ value: 'desktop' }, { value: 'last_30_days' }], metricValues: [{ value: '124' }, { value: '124' }] },
      { dimensionValues: [{ value: 'mobile' }, { value: 'last_30_days' }], metricValues: [{ value: '73' }, { value: '72' }] },
      { dimensionValues: [{ value: 'tablet' }, { value: 'last_30_days' }], metricValues: [{ value: '0' }, { value: '0' }] },
    ],
  };
  assert.deepEqual(parseGa4DeviceMetrics(response), {
    desktop_users: 170, mobile_users: 105, tablet_users: 1, other_users: 0,
    desktop_users_30d: 124, mobile_users_30d: 72, tablet_users_30d: 0, other_users_30d: 0,
  });
});

test('parseGa4DeviceMetrics 未知裝置類別歸入 other_users／other_users_30d，不會靜默丟資料', () => {
  const response = {
    rows: [
      { dimensionValues: [{ value: 'desktop' }, { value: 'since_launch' }], metricValues: [{ value: '10' }, { value: '10' }] },
      { dimensionValues: [{ value: 'smart tv' }, { value: 'since_launch' }], metricValues: [{ value: '2' }, { value: '2' }] },
      { dimensionValues: [{ value: '(not set)' }, { value: 'since_launch' }], metricValues: [{ value: '1' }, { value: '1' }] },
      { dimensionValues: [{ value: 'smart tv' }, { value: 'last_30_days' }], metricValues: [{ value: '1' }, { value: '1' }] },
    ],
  };
  assert.deepEqual(parseGa4DeviceMetrics(response), {
    desktop_users: 10, mobile_users: 0, tablet_users: 0, other_users: 3,
    desktop_users_30d: 0, mobile_users_30d: 0, tablet_users_30d: 0, other_users_30d: 1,
  });
});

test('parseGa4DeviceMetrics 沒有資料時全部回傳 0', () => {
  assert.deepEqual(parseGa4DeviceMetrics({}), {
    desktop_users: 0, mobile_users: 0, tablet_users: 0, other_users: 0,
    desktop_users_30d: 0, mobile_users_30d: 0, tablet_users_30d: 0, other_users_30d: 0,
  });
});

test('buildDailyViewRows 分開文章與頁面、排除舊站並補零日期', () => {
  const rows = buildDailyViewRows({
    gaRows: [
      { date: '20260814', path: '/', views: 3 },
      { date: '20260814', path: '/blog/hello/', views: 2 },
      { date: '20260814', path: '/star-jobs-website/', views: 99 },
    ],
    dailyUserRows: [{ date: '20260814', active_users: 4, total_users: 5 }],
    articleTitles: new Map([['hello', '哈囉']]),
    startDate: '2026-08-14', endDate: '2026-08-15', syncedAt: '2026-08-16T00:00:00Z',
  });
  assert.deepEqual(rows.map(({ views_synced_at, ...row }) => row), [
    { date: '2026-08-14', total_views: 5, page_views: 3, article_views: 2, active_users: 4, total_users: 5 },
    { date: '2026-08-15', total_views: 0, page_views: 0, article_views: 0, active_users: 0, total_users: 0 },
  ]);
});

test('buildDailyContentViewRows 為每篇文章與頁面建立每日明細並合併路徑變形', () => {
  const rows = buildDailyContentViewRows({
    gaRows: [
      { date: '20260816', path: '/blog/hello', views: 2, active_users: 1, total_users: 1 },
      { date: '20260816', path: '/blog/hello/?utm_source=threads', views: 3, active_users: 2, total_users: 2 },
      { date: '20260816', path: '/', views: 4, active_users: 3, total_users: 4 },
      { date: '20260815', path: '/about/', views: 1, active_users: 1, total_users: 1 },
      { date: '20260816', path: '/star-jobs-website/', views: 99 },
      { date: 'invalid', path: '/', views: 7 },
      { date: '20260816', path: '/faq/', views: 0 },
    ],
    articleTitles: new Map([['hello', '哈囉文章']]),
    syncedAt: '2026-08-16T12:00:00Z',
  });

  assert.deepEqual(rows, [
    {
      record_key: '2026-08-16:/blog/hello/', date: '2026-08-16', content_type: '文章',
      name: '哈囉文章', path: '/blog/hello/', views: 5, active_users: 3, total_users: 3, views_synced_at: '2026-08-16T12:00:00Z',
    },
    {
      record_key: '2026-08-16:/', date: '2026-08-16', content_type: '頁面',
      name: '首頁', path: '/', views: 4, active_users: 3, total_users: 4, views_synced_at: '2026-08-16T12:00:00Z',
    },
    {
      record_key: '2026-08-15:/about/', date: '2026-08-15', content_type: '頁面',
      name: '關於我', path: '/about/', views: 1, active_users: 1, total_users: 1, views_synced_at: '2026-08-16T12:00:00Z',
    },
  ]);
});
