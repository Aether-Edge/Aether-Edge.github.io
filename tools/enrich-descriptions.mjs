/* ============================================================
   AetherEdge — Description enrichment (LLM)
   ------------------------------------------------------------
   data/scripts-data.js のうち説明文が空のスクリプトについて、
   TradingViewの説明文を読み取り、LLMで cat / ja / en / tags を
   生成して書き戻します。

   APIキー（どちらか1つで動作）:
     POE_API_KEY        … Poe（OpenAI互換, 既定）。GitHub Secrets に登録
     ANTHROPIC_API_KEY  … Anthropic ネイティブ（任意のフォールバック）
   任意:
     AE_MODEL           … 既定: Poe='Claude-Sonnet-4.6' / Anthropic='claude-haiku-4-5-20251001'
     AE_ENRICH_LIMIT    … 1回で処理する最大件数（既定 全件）
   ブランドのトーン: real math / honest scope / no hype。
   ============================================================ */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'scripts-data.js');

const POE_KEY = process.env.POE_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.AE_MODEL || (POE_KEY ? 'Claude-Sonnet-4.6' : 'claude-haiku-4-5-20251001');
const LIMIT = process.env.AE_ENRICH_LIMIT ? parseInt(process.env.AE_ENRICH_LIMIT, 10) : Infinity;

const CATS = {
  indicator: ['trend','oscillator','forecast','signal','probability','regime','smc','volume','mtf','risk'],
  strategy:  ['ai','trend-follow','mean-reversion','breakout','momentum','volatility','multi-factor','swing','scalping','session'],
  library:   ['utility']
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

function isCatType(t) { return t === 'indicator' || t === 'strategy' || t === 'library'; }
function needs(s) {
  return s.needsReview === true || !s.ja || !s.en || !s.cat;
}

async function callLLM(system, user) {
  if (POE_KEY) {
    const res = await fetch('https://api.poe.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + POE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1200,
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
      })
    });
    if (!res.ok) throw new Error('Poe ' + res.status + ' ' + (await res.text()).slice(0, 200));
    const j = await res.json();
    return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
  }
  if (ANTHROPIC_KEY) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL, max_tokens: 1200, system,
        messages: [{ role: 'user', content: user }]
      })
    });
    if (!res.ok) throw new Error('Anthropic ' + res.status + ' ' + (await res.text()).slice(0, 200));
    const j = await res.json();
    return (j.content || []).map((b) => b.text || '').join('');
  }
  throw new Error('no API key');
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
      let body = '';
      const cands = Array.from(document.querySelectorAll('article, [class*="description" i], [class*="text" i]'));
      for (const c of cands) {
        const tx = (c.innerText || '').trim();
        if (tx.length > body.length) body = tx;
      }
      return (h1 + '\n' + meta + '\n' + body).slice(0, 2000).trim();
    });
  } catch {
    return '';
  }
}

async function classify(script, desc) {
  const type = script.type;
  const useCat = isCatType(type);
  const allowed = useCat ? CATS[type] : null;
  const system =
    'You categorize and describe TradingView Pine Script ' + type + 's for the brand AetherEdge. ' +
    'Voice: real math, honest scope, no hype, no marketing fluff. Be specific and factual. ' +
    'Return ONLY a JSON object, no prose.';
  let user =
    'Title: ' + (script.code || '') + '\n' +
    'Type: ' + type + '\n' +
    'Source text (may be partial):\n"""\n' + (desc || '(none)') + '\n"""\n\n' +
    'Return JSON with these keys:\n';
  if (useCat) user += '- "cat": one id from this list that best fits: ' + JSON.stringify(allowed) + '\n';
  user +=
    '- "ja": one short factual Japanese sentence (<=70 chars), no hype\n' +
    '- "en": one short factual English sentence (<=120 chars), no hype\n' +
    '- "tags": array of 2-4 short lowercase tags';

  let txt = (await callLLM(system, user)) || '';
  txt = txt.replace(/```json/gi, '').replace(/```/g, '').trim();
  const m = txt.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('no JSON in model output | raw="' + txt.slice(0, 160).replace(/\n/g, ' ') + '"');
  const out = JSON.parse(m[0]);
  if (useCat) {
    if (type === 'library') out.cat = 'utility';
    else if (!allowed.includes(out.cat)) out.cat = allowed[0];
  } else {
    out.cat = '';
  }
  if (!Array.isArray(out.tags)) out.tags = [];
  return out;
}

async function main() {
  if (!POE_KEY && !ANTHROPIC_KEY) {
    console.log('ℹ APIキー未設定（POE_API_KEY / ANTHROPIC_API_KEY）— エンリッチをスキップします。');
    return;
  }
  console.log('▶ enrich provider:', POE_KEY ? 'Poe' : 'Anthropic', '| model:', MODEL);
  const { text, data } = readData();
  const targets = data.scripts.filter(needs).slice(0, LIMIT);
  console.log('  enrich対象:', targets.length, '/', data.scripts.length);
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
        s.ja = String(out.ja || '').trim();
        s.en = String(out.en || '').trim();
        if (isCatType(s.type) && out.cat) s.cat = out.cat;
        if (out.tags.length) s.tags = out.tags.map((tt) => String(tt).toLowerCase().slice(0, 24)).slice(0, 4);
        const done = s.ja && s.en && s.cat;
        if (done) s.needsReview = false;
        ok += 1;
        console.log(`  [${n}/${targets.length}] ✓ ${s.code} → ${s.cat || s.type} | ${s.ja}`);
        if (n % 10 === 0) writeData(text, data);
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
