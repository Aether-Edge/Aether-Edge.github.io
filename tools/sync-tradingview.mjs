/* ============================================================
   AetherEdge — TradingView catalog sync (v2)
   ------------------------------------------------------------
   公開プロフィール（#published-scripts）から全スクリプトを取得し、
   data/scripts-data.js を安全マージします。

   ◆ v2の重要な設計（重複を作らない）:
     - スクレイプ結果（slug付き）を「唯一の正」とする
     - 既存データとの照合は slug のみで行う（タイトル照合は廃止）
       → 過去の手動エントリと重複しない
     - 全スクリプトは access="open"（このプロフィールは全て公開ソース）
     - slug を持たない既存エントリ（手動の古いデータ）は破棄する
       → これにより 106本/Invite-Only の復活を防ぐ

   保持されるフィールド（手動編集が消えない、slugで紐付く限り）:
     cat / ja / en / tags / color / featured
   自動更新されるフィールド:
     code / boosts / url / slug / type / totalPublished / updated

   使い方:
     npm install
     npx playwright install chromium
     npm run sync
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

/* ---------- data file io ---------- */

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

/* ---------- scrape ---------- */

async function autoLoadAll(page) {
  let stable = 0;
  let lastCount = 0;
  for (let round = 0; round < MAX_SCROLL_ROUNDS; round++) {
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(700);
    const btn = page
      .locator('button, a')
      .filter({ hasText: /もっと見る|さらに表示|Load more|Show more/i })
      .first();
    try {
      if (await btn.isVisible({ timeout: 300 })) {
        await btn.click({ timeout: 1500 });
        await page.waitForTimeout(900);
      }
    } catch { /* 無限スクロール型 */ }
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
      let title =
        (a.textContent || '').trim() ||
        (img && (img.getAttribute('alt') || '').trim()) ||
        '';
      // 「AetherEdge - 」接頭辞を除去
      title = title.replace(/^AetherEdge\s*[-–—:]\s*/i, '').trim();

      const text = (card.innerText || '').toLowerCase();

      let boosts = 0;
      const boostEl = card.querySelector(
        '[data-name*="boost" i], [class*="boost" i], [aria-label*="boost" i], [title*="boost" i]'
      );
      if (boostEl) {
        const n = (boostEl.textContent || '').replace(/[^\d]/g, '');
        if (n) boosts = parseInt(n, 10);
      }

      const typeRaw = /strategy|ストラテジー/.test(text)
        ? 'strategy'
        : /library|ライブラリ/.test(text)
          ? 'library'
          : 'indicator';

      const prev = seen.get(slug);
      if (!prev || (title && !prev.title)) {
        seen.set(slug, {
          slug,
          title,
          boosts: Math.max(boosts, prev ? prev.boosts : 0),
          typeRaw,
          url: 'https://www.tradingview.com/script/' + slug + '/'
        });
      }
    }
    return Array.from(seen.values());
  });
}

/* ---------- merge (slug照合のみ) ---------- */

function fixedOrder(entry) {
  const o = {};
  for (const k of ['code', 'name', 'type', 'cat', 'access', 'color', 'tags',
                   'boosts', 'slug', 'url', 'featured', 'needsReview', 'ja', 'en']) {
    if (entry[k] !== undefined) o[k] = entry[k];
  }
  return o;
}

function merge(existing, scraped) {
  // 既存データを slug => entry のMapにするだけのIndex（slugなしは捨てる）
  const bySlug = new Map();
  for (const s of existing.scripts) {
    if (s.slug) bySlug.set(s.slug, s);
  }

  const result = [];
  let updated = 0;
  let added = 0;
  let colorIdx = 0;
  const newOnes = [];

  for (const item of scraped) {
    if (item.typeRaw === 'library') continue; // ライブラリは対象外

    const prev = bySlug.get(item.slug);
    if (prev) {
      // 既存: 手動編集(cat/ja/en/tags/color/featured)を保持、機械項目を更新
      prev.code = item.title || prev.code;
      prev.type = item.typeRaw;
      prev.access = 'open';        // このプロフィールは全て公開ソース
      prev.boosts = item.boosts;
      prev.slug = item.slug;
      prev.url = item.url;
      if (!prev.color) prev.color = COLOR_CYCLE[colorIdx % COLOR_CYCLE.length];
      result.push(fixedOrder(prev));
      updated += 1;
    } else {
      // 新規: cat/ja/en は空でneedsReview
      const entry = {
        code: item.title || item.slug,
        name: '',
        type: item.typeRaw === 'strategy' ? 'strategy' : 'indicator',
        cat: '',
        access: 'open',
        color: COLOR_CYCLE[colorIdx % COLOR_CYCLE.length],
        tags: [],
        boosts: item.boosts,
        slug: item.slug,
        url: item.url,
        featured: false,
        needsReview: true,
        ja: '',
        en: ''
      };
      result.push(fixedOrder(entry));
      added += 1;
      newOnes.push(entry);
    }
    colorIdx += 1;
  }

  existing.scripts = result;
  existing.totalPublished = result.length;
  existing.updated = new Date().toISOString();
  return { updated, added, newOnes };
}

/* ---------- main ---------- */

async function main() {
  console.log('▶ AetherEdge catalog sync (v2)');
  const { text, data } = readData();
  console.log('  existing entries:', data.scripts.length);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    locale: 'ja-JP',
    viewport: { width: 1440, height: 1000 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36'
  });

  try {
    await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    await autoLoadAll(page);
    const scraped = await extractScripts(page);
    console.log('  scraped scripts:', scraped.length);

    if (scraped.length === 0) {
      console.error('✗ 0 scripts scraped — DOMセレクタが変わった可能性があります。');
      console.error('  Claude Code に extractScripts の修正を依頼してください。');
      process.exitCode = 1;
      return;
    }

    const { updated, added, newOnes } = merge(data, scraped);
    writeData(text, data);

    console.log('✓ merged:', updated, 'updated /', added, 'new');
    console.log('  total now:', data.scripts.length);
    if (newOnes.length) {
      console.log('── 新規スクリプト（cat と ja/en 説明文の追加が必要）──');
      for (const a of newOnes) console.log('  •', a.code, '(' + a.url + ')');
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('✗ sync failed:', err.message);
  process.exitCode = 1;
});
