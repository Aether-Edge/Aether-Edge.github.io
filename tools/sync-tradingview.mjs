/* ============================================================
   AetherEdge — TradingView catalog sync (v3)
   ------------------------------------------------------------
   公開プロフィール（#published-scripts）から全スクリプトを取得し、
   data/scripts-data.js を安全マージします。

   v3の変更点:
     - ロケールを en-US に固定（boost等のaria-labelが英語で安定）
     - ブースト取得を多段フォールバックに（class/aria-label/title/
       data-name + 数値テキスト + ラベル内数値、EN/JA両対応）
     - 取得できたブースト>0が0件のときは、先頭カードのHTMLを
       自動でログ出力して原因診断できるようにした（AE_DEBUG=1で常時）

   保持されるフィールド（slugで紐付く限り手動編集が消えない）:
     cat / ja / en / tags / color / featured / needsReview
   自動更新されるフィールド:
     code / boosts / url / slug / type / totalPublished / updated
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
const DEBUG = !!process.env.AE_DEBUG;

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
    const debugCards = [];
    const anchors = Array.from(document.querySelectorAll('a[href*="/script/"]'));

    const digits = (s) => {
      const m = (s || '').replace(/,/g, '').match(/\d+/);
      return m ? parseInt(m[0], 10) : null;
    };

    for (const a of anchors) {
      const href = a.getAttribute('href') || '';
      const m = href.match(/\/script\/([A-Za-z0-9]+)(?:-|\/|$)/);
      if (!m) continue;
      const slug = m[1];

      // climb to a card-sized container
      let card = a;
      for (let i = 0; i < 8 && card.parentElement; i++) {
        card = card.parentElement;
        if ((card.innerText || '').length > 30) break;
      }

      const img = a.querySelector('img') || card.querySelector('img');
      let title =
        (a.textContent || '').trim() ||
        (img && (img.getAttribute('alt') || '').trim()) ||
        '';
      title = title.replace(/^AetherEdge\s*[-–—:]\s*/i, '').trim();

      const text = (card.innerText || '');
      const lower = text.toLowerCase();

      /* ---- boosts: multi-strategy ---- */
      let boosts = null;

      // 1) explicit boost-ish element (EN + JA), number from its labels or text
      const boostEl = card.querySelector(
        '[aria-label*="boost" i],[title*="boost" i],[data-name*="boost" i],' +
        '[class*="boost" i],[aria-label*="ブースト"],[title*="ブースト"]'
      );
      if (boostEl) {
        boosts =
          digits(boostEl.getAttribute('aria-label')) ??
          digits(boostEl.getAttribute('title')) ??
          digits((boostEl.closest('button, a, div') || boostEl).textContent);
      }

      // 2) any button/anchor labelled boost (EN/JA) -> its number
      if (boosts === null) {
        for (const b of card.querySelectorAll('button, a, span, div')) {
          const lbl =
            (b.getAttribute('aria-label') || '') + ' ' + (b.getAttribute('title') || '');
          if (/boost|ブースト/i.test(lbl)) {
            boosts = digits(lbl) ?? digits(b.textContent);
            if (boosts !== null) break;
          }
        }
      }

      // 3) rocket/boost svg use href -> nearest number
      if (boosts === null) {
        const use = card.querySelector('use[*|href*="boost" i], use[href*="boost" i]');
        if (use) {
          const host = use.closest('button, a, div, span');
          if (host) boosts = digits(host.textContent);
        }
      }

      if (boosts === null) boosts = 0;

      const typeRaw = /strategy|ストラテジー/.test(lower)
        ? 'strategy'
        : /library|ライブラリ/.test(lower)
          ? 'library'
          : 'indicator';

      const prev = seen.get(slug);
      const better =
        !prev ||
        (title && !prev.title) ||
        boosts > (prev ? prev.boosts : 0);
      if (better) {
        seen.set(slug, {
          slug,
          title: title || (prev && prev.title) || '',
          boosts: Math.max(boosts, prev ? prev.boosts : 0),
          typeRaw,
          url: 'https://www.tradingview.com/script/' + slug + '/'
        });
      }

      if (debugCards.length < 3) debugCards.push((card.outerHTML || '').slice(0, 2200));
    }

    return { items: Array.from(seen.values()), debug: debugCards };
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
      prev.code = item.title || prev.code;
      prev.type = item.typeRaw;
      prev.access = 'open';
      prev.boosts = item.boosts;
      prev.slug = item.slug;
      prev.url = item.url;
      if (!prev.color) prev.color = COLOR_CYCLE[colorIdx % COLOR_CYCLE.length];
      result.push(fixedOrder(prev));
      updated += 1;
    } else {
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
  console.log('▶ AetherEdge catalog sync (v3)');
  const { text, data } = readData();
  console.log('  existing entries:', data.scripts.length);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    locale: 'en-US',
    viewport: { width: 1440, height: 1000 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36'
  });

  try {
    await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    await autoLoadAll(page);

    const { items: scraped, debug } = await extractScripts(page);
    const withBoost = scraped.filter((s) => s.boosts > 0).length;
    console.log('  scraped scripts:', scraped.length, '| with boosts>0:', withBoost);

    if (scraped.length === 0) {
      console.error('✗ 0 scripts scraped — DOMセレクタが変わった可能性があります。');
      process.exitCode = 1;
      return;
    }

    if (withBoost === 0 || DEBUG) {
      console.log('⚠ boost診断: 先頭カードのHTMLを出力します（セレクタ調整用）');
      debug.forEach((h, i) => console.log(`\n────── CARD #${i} ──────\n${h}\n`));
    }

    const { updated, added, newOnes } = merge(data, scraped);
    writeData(text, data);

    console.log('✓ merged:', updated, 'updated /', added, 'new');
    console.log('  total now:', data.scripts.length);
    const top = [...data.scripts].sort((a, b) => (b.boosts || 0) - (a.boosts || 0)).slice(0, 5);
    console.log('  top boosts:', top.map((s) => `${s.code}=${s.boosts}`).join(', '));
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
