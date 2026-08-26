// 建立按鈕點擊明細 collection；每次 GA4 button_click 同步新增一筆，
// Directus 可依 button_id 分組或直接查看 collection 項目數統計點擊次數。
const CMS = 'https://cms.aixwang.dev';
const COLLECTION = 'button_clicks';
const apply = process.argv.slice(2).includes('--apply');
const token = process.env.DIRECTUS_TOKEN;

if (apply && !token) throw new Error('要 --apply 必須設定 DIRECTUS_TOKEN。');

const FIELDS = [
  { field: 'date_created', type: 'timestamp', meta: { special: ['date-created'], interface: 'datetime', display: 'datetime', display_options: { relative: false, format: 'short', use24: true }, readonly: true, width: 'half', note: '按鈕點擊時間。' } },
  { field: 'button_id', type: 'string', schema: { is_nullable: false }, meta: { interface: 'input', readonly: true, width: 'half', note: 'data-ga-button 的穩定代號，可依此分組計算點擊次數。' } },
  { field: 'button_label', type: 'string', meta: { interface: 'input', readonly: true, width: 'half', note: '點擊當下的按鈕文字，不包含表單輸入內容。' } },
  { field: 'button_location', type: 'string', meta: { interface: 'input', readonly: true, width: 'half' } },
  { field: 'button_action', type: 'string', meta: { interface: 'input', readonly: true, width: 'half' } },
  { field: 'page_path', type: 'string', meta: { interface: 'input', readonly: true, width: 'half' } },
  { field: 'site_host', type: 'string', meta: { interface: 'input', readonly: true, width: 'half' } },
  { field: 'destination_url', type: 'text', meta: { interface: 'input-multiline', readonly: true, width: 'full' } },
];

const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
async function request(path, init = {}) {
  const response = await fetch(`${CMS}${path}`, { ...init, headers: { ...headers, ...(init.headers ?? {}) } });
  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}：${text.slice(0, 300)}`);
  return text ? JSON.parse(text).data : null;
}

const exists = await fetch(`${CMS}/collections/${COLLECTION}`, { headers }).then((response) => response.ok);
console.log(`${apply ? '套用' : '預覽'}：${COLLECTION}（${FIELDS.length} 個資料欄位）`);
if (!apply) {
  console.log(JSON.stringify({ collection: COLLECTION, fields: FIELDS }, null, 2));
  process.exit(0);
}

if (!exists) {
  await request('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: COLLECTION,
      meta: { icon: 'ads_click', note: '網站 button_click 點擊明細；不記錄 Email、搜尋文字、IP 或 Cookie。' },
      schema: {},
      fields: FIELDS,
    }),
  });
  console.log('已建立 button_clicks collection 與欄位。');
} else {
  const existing = new Set((await request(`/fields/${COLLECTION}`)).map((field) => field.field));
  for (const field of FIELDS) {
    if (existing.has(field.field)) continue;
    await request(`/fields/${COLLECTION}`, { method: 'POST', body: JSON.stringify(field) });
    console.log(`已補上欄位 ${field.field}。`);
  }
  console.log('collection 已存在，欄位檢查完成。');
}
