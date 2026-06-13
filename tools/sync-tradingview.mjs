/* ============================================================
   AetherEdge — TradingView catalog sync
   ============================================================ */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'scripts-data.js');
const PROFILE_URL = 'https://www.tradingview.com/u/AetherEdge/#published-scripts';
const COLOR_CYCLE = ['cyan', 'emerald', 'purple', 'magenta'];
const MAX_SCROLL_ROUNDS = 80;

function readData() {
  const text = readFileSync(DATA_FILE, 'utf8');
  const m = text.match(/\/\*__DATA_START__\*\/([\s\S]*?)\/\*__DATA_END__\*\//);
  if (!m) throw new Error('DATA markers not found in ' + DATA_FILE);
  return { text, data: JSON.parse(m[1]) };
}

function writeData(originalText, data) {
  const json = JSON.stringify(data, null, 2);
  const next = originalText.replace(
    /\/\*__DATA_START__\*\/[\s\S]*?\/\*__DATA_END__\*\//,
    '/*__DATA_START__*/' + json + '/*__DATA_END__*/'
  );
  writeFileSync(DATA_FILE, next, 'utf8');
}

async function autoLoadAll(page) {
  let stable = 0;
  let lastCount = 0;
  for (let round = 0; round < MAX_SCROLL_ROUNDS; round++) {
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(700);
    const btn = page.locator('button, a').filter({ hasText: /もっと見る|さらに表示|Load more|Show more/i }).first();
    try {
      if (await btn.isVisible({ timeout: 300 })) {
        await btn.click({ timeout: 1500 });
        await page.waitForTimeout(900);
      }
    } catch { }
    const count = await page.locator('a[href*="/script/"]').count();
    if (count === lastCount) {
      stable += 1;
      if (stable >= 4) break;
    } else {
      stable = 0;
      lastCount = count;
    }
  }
  return lastCount;
}

async function extractScripts(page) {
  return page.evaluate(() => {
    const seen = new Map();
    const anchors = Array.from(document.querySelectorAll('a[href*="/script/"]'));
    for (const a of anchors) {
      const href = a.getAttribute('href') || '';
      const m = href.match(/\/script\/([A-Za-z0-9]+)(?:-|\/|$)/);
      if (!m) continue;
      const slug = m[1];
      let card = a;
      for (let i = 0; i < 6 && card.parentElement; i++) {
        card = card.parentElement;
        if ((card.innerText || '').length > 30) break;
      }
      const img = a.querySelector('img') || card.querySelector('img');
      const title = (a.textContent || '').trim() || (img && (img.getAttribute('alt') || '').trim()) || '';
      const text = (card.innerText || '').toLowerCase();
      let boosts = 0;
      const boostEl = card.querySelector('[data-name*="boost" i], [class*="boost" i], [aria-label*="boost" i], [title*="boost" i]');
      if (boostEl) {
        const n = (boostEl.textContent || '').replace(/[^\d]/g, '');
        if (n) boosts = parseInt(n, 10);
      }
      const typeRaw = /strategy|ストラテジー/.test(text) ? 'strategy' : /library|ライブラリ/.test(text) ? 'library' : 'indicator';
      let accessRaw = 'open';
      if (/invite[\s-]?only|招待制|招待専用/.test(text)) accessRaw = 'invite';
      else if (/protected|保護/.test(text)) accessRaw = 'protected';
      const prev = seen.get(slug);
      if (!prev || (title && !prev.title)) {
        seen.set(slug, { slug, title, boosts: Math.max(boosts, prev ? prev.boosts : 0), typeRaw, accessRaw, url: 'https://www.tradingview.com/script/' + slug + '/' });
      }
    }
    return Array.from(seen.values());
  });
}

function normTitle(s) {
  return String(s || '').toLowerCase().replace(/^aetheredge\s*[-–—:]\s*/i, '').replace(/\s+/g, ' ').trim();
}

function titleToCodeName(title) {
  const stripped = title.replace(/^AetherEdge\s*[-–—:]\s*/i, '').trim();
  const ae = stripped.match(/\bAE-[A-Za-z0-9+]+(?:\s(?:Lite|Pro\+?|Mini|Max))?/);
  if (ae) {
    const code = ae[0];
    const name = stripped.replace(ae[0], '').replace(/^[\s\-–—:]+/, '').trim();
    return { code, name };
  }
  return { code: stripped.slice(0, 28), name: stripped.length > 28 ? stripped : '' };
}

function fixedOrder(entry) {
  const o = {};
  for (const k of ['code', 'name', 'type', 'cat', 'access', 'color', 'tags', 'boosts', 'slug', 'url', 'featured', 'needsReview', 'ja', 'en']) {
    if (entry[k] !== undefined) o[k] = entry[k];
  }
  return o;
}

function merge(existing, scraped) {
  const bySlug = new Map();
  const byTitle = new Map();
  for (const s of existing.scripts) {
    if (s.slug) bySlug.set(s.slug, s);
    byTitle.set(normTitle((s.code || '') + ' ' + (s.name || '')), s);
    if (s.name) byTitle.set(normTitle(s.name), s);
  }
  let updated = 0;
  const added = [];
  for (const item of scraped) {
    if (item.typeRaw === 'library') continue;
    let target = bySlug.get(item.slug) || byTitle.get(normTitle(item.title));
    if (target) {
      target.boosts = item.boosts;
      target.slug = item.slug;
      target.url = item.url;
      target.access = item.accessRaw === 'open' && target.access ? target.access : item.accessRaw;
      if (item.typeRaw !== 'indicator' || !target.type) target.type = item.typeRaw;
      updated += 1;
    } else {
      const { code, name } = titleToCodeName(item.title || item.slug);
      const entry = { code, name, type: item.typeRaw === 'strategy' ? 'strategy' : 'indicator', cat: '', access: item.accessRaw, color: COLOR_CYCLE[(existing.scripts.length + added.length) % COLOR_CYCLE.length], tags: [], boosts: item.boosts, slug: item.slug, url: item.url, featured: false, needsReview: true, ja: '', en: '' };
      existing.scripts.push(entry);
      added.push(entry);
    }
  }
  existing.scripts = existing.scripts.map(fixedOrder);
  existing.totalPublished = Math.max(scraped.filter(s => s.typeRaw !== 'library').length, existing.scripts.length);
  existing.updated = new Date().toISOString();
  return { updated, added };
}

async function main() {
  console.log('▶ AetherEdge catalog sync');
  const { text, data } = readData();
  console.log('  existing entries:', data.scripts.length);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    locale: 'ja-JP',
    viewport: { width: 1440, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
  });
  try {
    await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    await autoLoadAll(page);
    const scraped = await extractScripts(page);
    console.log('  scraped scripts:', scraped.length);
    if (scraped.length === 0) {
      console.error('✗ 0 scripts scraped — DOMセレクタが変わった可能性があります。');
      process.exitCode = 1;
      return;
    }
    const { updated, added } = merge(data, scraped);
    writeData(text, data);
    console.log('✓ merged:', updated, 'updated /', added.length, 'new');
    if (added.length) {
      console.log('── 新規スクリプト（cat と ja/en 説明文の追加が必要）──');
      for (const a of added) console.log('  •', a.code, '(' + a.url + ')');
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('✗ sync failed:', err.message);
  process.exitCode = 1;
});
