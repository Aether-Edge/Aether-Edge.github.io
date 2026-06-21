/* ============================================================
   AetherEdge — Description enrichment (LLM)
   ------------------------------------------------------------
   data/scripts-data.js のうち「説明文が空（needsReview / ja・en・cat が空）」
   のスクリプトについて、TradingViewの説明文を読み取り、Claude API で
   cat（カテゴリーID）/ ja / en / tags を生成して書き戻します。

   必要な環境変数:
     ANTHROPIC_API_KEY  … GitHub Secrets に登録（無い場合は何もせず終了）
   任意:
     AE_MODEL           … 既定 'claude-haiku-4-5-20251001'
     AE_ENRICH_LIMIT    … 1回で処理する最大件数（既定 全件）

   ブランドのトーン: real math / honest scope / no hype。
   ============================================================ */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'scripts-data.js');
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.AE_MODEL || 'claude-haiku-4-5-20251001';
const LIMIT = process.env.AE_ENRICH_LIMIT ? parseInt(process.env.AE_ENRICH_LIMIT, 10) : Infinity;

const CATS = {
  indicator: ['trend','oscillator','forecast','signal','probability','regime','smc','volume','mtf','risk'],
  strategy:  ['ai','trend-follow','mean-reversion','breakout','momentum','volatility','multi-factor','swing','scalping','session']
};

function readData() {
  const text = readFileSync(DATA_FILE, 'utf8');
  const m = text.match(/\/\*__DATA_START__\*\/([\s\S]*?)\/\*__DATA_END__\*\//);
  if (!m) throw new Error('DATA markers not found');
  return { text, data: JSON.parse(m[1]) };
}
function writeData(text, data) {
  const json = JSON.stringify(data, null, 2);
  writeFileSync(DATA_FILE,
    text.replace(/\/\*__DATA_START__\*\/[\s\S]*?\/\*__DATA_END__\*\//,
      '/*__DATA_START__*/' + json + '/*__DATA_END__*/'), 'utf8');
}

function needs(s) {
  return s.needsReview === true || !s.cat || !s.ja || !s.en;
}

async function fetchDescription(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1200);
    return await page.evaluate(() => {
      const pick = (sel, attr) => {
        const el = document.querySelector(sel);
        return el ? (attr ? el.getAttribute(attr) : el.textContent) : '';
      };
      const meta = pick('meta[name="description"]', 'content') ||
                   pick('meta[property="og:description"]', 'content') || '';
      const h1 = (pick('h1') || '').trim();
      // 説明文っぽい最大テキストブロック
      let body = '';
      const cands = Array.from(document.querySelectorAll('article, [class*="description" i], [class*="text" i]'));
      for (const c of cands) {
        const t = (c.innerText || '').trim();
        if (t.length > body.length) body = t;
      }
      return (h1 + '\n' + meta + '\n' + body).slice(0, 2000).trim();
    });
  } catch {
    return '';
  }
}

async function classify(script, desc) {
  const type = script.type === 'strategy' ? 'strategy' : 'indicator';
  const allowed = CATS[type];
  const system =
    'You categorize and describe TradingView Pine Script ' + type + 's for the brand AetherEdge. ' +
    'Voice: real math, honest scope, no hype, no marketing fluff. Be specific and factual. ' +
    'Return ONLY a JSON object, no prose.';
  const user =
    'Title: ' + (script.code || '') + '\n' +
    'Type: ' + type + '\n' +
    'Source text (may be partial):\n"""\n' + (desc || '(none)') + '\n"""\n\n' +
    'Return JSON with exactly these keys:\n' +
    '- "cat": one id from this list that best fits: ' + JSON.stringify(allowed) + '\n' +
    '- "ja": one short factual Japanese sentence (<=70 chars), no hype\n' +
    '- "en": one short factual English sentence (<=120 chars), no hype\n' +
    '- "tags": array of 2-4 short lowercase tags';

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 400,
      system,
      messages: [{ role: 'user', content: user }]
    })
  });
  if (!res.ok) throw new Error('API ' + res.status + ' ' + (await res.text()).slice(0, 200));
  const j = await res.json();
  const txt = (j.content || []).map((b) => b.text || '').join('');
  const m = txt.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('no JSON in model output');
  const out = JSON.parse(m[0]);
  if (!allowed.includes(out.cat)) out.cat = allowed[0]; // 安全側
  if (!Array.isArray(out.tags)) out.tags = [];
  return out;
}

async function main() {
  if (!API_KEY) {
    console.log('ℹ ANTHROPIC_API_KEY 未設定 — エンリッチをスキップします。');
    return;
  }
  const { text, data } = readData();
  const targets = data.scripts.filter(needs).slice(0, LIMIT);
  console.log('▶ enrich対象:', targets.length, '/', data.scripts.length);
  if (targets.length === 0) return;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ locale: 'en-US', viewport: { width: 1280, height: 900 } });

  let ok = 0, fail = 0, n = 0;
  try {
    for (const s of targets) {
      n += 1;
      try {
        const desc = await fetchDescription(page, s.url);
        const out = await classify(s, desc);
        s.cat = out.cat;
        s.ja = String(out.ja || '').trim();
        s.en = String(out.en || '').trim();
        if (out.tags.length) s.tags = out.tags.map((t) => String(t).toLowerCase().slice(0, 24)).slice(0, 4);
        if (s.ja && s.en && s.cat) s.needsReview = false;
        ok += 1;
        console.log(`  [${n}/${targets.length}] ✓ ${s.code} → ${s.cat} | ${s.ja}`);
        if (n % 10 === 0) writeData(text, data); // 途中保存
      } catch (e) {
        fail += 1;
        console.log(`  [${n}/${targets.length}] ✗ ${s.code}: ${e.message}`);
      }
    }
  } finally {
    await browser.close();
  }
  writeData(text, data);
  console.log(`✓ enrich完了: ${ok} 成功 / ${fail} 失敗`);
}

main().catch((e) => { console.error('✗ enrich failed:', e.message); process.exitCode = 1; });
