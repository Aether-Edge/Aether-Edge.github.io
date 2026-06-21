/* ============================================================
   AetherEdge — shared site script (index / scripts / market)
   data/scripts-data.js を先に読み込むこと（window.AE_DATA）
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.AE_DATA || { updated: '', totalPublished: 0, scripts: [] };
  var SCRIPTS = DATA.scripts || [];
  var TV_PROFILE = 'https://jp.tradingview.com/u/AetherEdge/#published-scripts';

  /* ============================================================
     1. i18n dictionary
        {n}=公開総数 / {m}=未掲載数 / {updated}=最終同期日
     ============================================================ */
  var I18N = {
    ja: {
      "_title": "AetherEdge | Quantum Intelligence for Trading",
      "_title_scripts": "スクリプト一覧 | AetherEdge",
      "_title_market": "Market Pulse | AetherEdge",
      "hero_sub": "量子インスパイアード最適化 × ベイズ統計 × 強化学習。<br class=\"hidden sm:block\">AetherEdge は<span class=\"text-ae-cyan\" style=\"text-shadow:0 0 8px rgba(0,212,255,.6)\">本物の数学</span>だけで実装された Pine Script™ インジケーターを開発しています。<br class=\"hidden sm:block\">ブラックボックスなし。誇張なし。",
      "hero_cta1": "Scriptsを見る",
      "hero_cta2": "リアルタイム市況",
      "stat_scripts": "公開スクリプト {n}本",
      "stat_math": "Real Math Only",
      "stat_free": "Free & Invite-Only",
      "feat_sub": "代表的なエンジンを抜粋して紹介。全{n}本のカタログ（カテゴリー別／人気ランキング）は専用ページへ。",
      "feat_btn": "全スクリプトのカタログへ →",
      "tz_sub": "仮想通貨・株価指数・為替のリアルタイム相場とマーケットニュース。専用ページではチャート・経済指標カレンダー・ヒートマップも見られます。",
      "tz_btn": "Market Pulse を開く →",
      "scr_sub": "全{n}本のスクリプトを「カテゴリー別」と「人気ランキング」で紹介します——分類は各スクリプトのコード（アルゴリズム）に基づきます。",
      "sc_updated": "最終同期: {updated}",
      "tab_ind": "Indicators",
      "tab_str": "Strategies",
      "tab_lib": "Libraries",
      "view_cat": "カテゴリー別",
      "view_rank": "人気ランキング",
      "chip_all": "すべて",
      "search_ph": "スクリプトを検索…",
      "badge_invite": "Invite-Only",
      "badge_free": "Free",
      "badge_open": "Open-Source",
      "badge_protected": "Protected",
      "details": "Details →",
      "boosts": "Boosts",
      "no_results": "該当するスクリプトがありません。",
      "desc_tbd": "（説明文を準備中です）",
      "more_title": "+ さらに約{m}本",
      "more_sub": "自動同期がまだ取り込んでいないスクリプトは TradingView プロフィールでご覧いただけます。",
      "more_btn": "TradingViewで見る ↗",
      "scr_all_btn": "TradingView プロフィールを開く",
      "mk_sub": "仮想通貨・株価指数・為替のリアルタイム相場、マーケットニュース、経済指標カレンダー、ヒートマップ。TradingView ウィジェットにより自動更新され、言語切替にも連動します。",
      "mk_note": "相場データ・ニュースは TradingView 提供。表示には数秒かかる場合があります。",
      "ab_1": "カルマンフィルタ、ベイズ推論、k-means、バンディット、REINFORCE——すべて飾りではなく、Pine Script 上に数式どおり実装。アルゴリズムの中身は説明文で公開します。",
      "ab_2": "「quantum-inspired」は誇張ではなく設計思想の表記。何ができて何ができないかを明記し、未来を保証するような表現は使いません。",
      "ab_3": "外部サーバー依存なし。すべてチャート上で完結し、リペイント仕様も明示。学習はバー確定ベースで進むオンライン設計です。",
      "ab_4": "オンライン学習型の設計により、パラメータは市場と共に適応。公開後もアップデートを継続しています。",
      "cta_sub": "スクリプトはすべて TradingView 上で公開中——オープンソース・無料・招待制。<br class=\"sm:hidden\">フォローして新作リリースを見逃さないでください。",
      "cta_b1": "TradingViewでフォロー",
      "cta_b2": "Xでフォロー",
      "ft_tag": "Quantum Intelligence for Trading.<br>量子インスパイアード × AI × 強化学習による<br>Pine Script™ インジケーター開発。",
      "ft_contact": "Contact:",
      "ft_disclaimer": "本サイトおよび全スクリプトは教育・情報提供を目的としており、投資助言ではありません。過去のパフォーマンスは将来の結果を保証しません。投資判断はご自身の責任で行ってください。"
    },
    en: {
      "_title": "AetherEdge | Quantum Intelligence for Trading",
      "_title_scripts": "Script Catalog | AetherEdge",
      "_title_market": "Market Pulse | AetherEdge",
      "hero_sub": "Quantum-inspired optimization × Bayesian statistics × reinforcement learning.<br class=\"hidden sm:block\">AetherEdge builds Pine Script™ indicators implemented with <span class=\"text-ae-cyan\" style=\"text-shadow:0 0 8px rgba(0,212,255,.6)\">real math</span> only.<br class=\"hidden sm:block\">No black boxes. No hype.",
      "hero_cta1": "View Scripts",
      "hero_cta2": "Live Market Feed",
      "stat_scripts": "{n} Scripts Published",
      "stat_math": "Real Math Only",
      "stat_free": "Free & Invite-Only",
      "feat_sub": "A hand-picked selection of flagship engines. The full catalog of {n} scripts — by category and by popularity — lives on its own page.",
      "feat_btn": "Open the full catalog →",
      "tz_sub": "Live crypto, index and FX quotes plus market news. The dedicated page adds charts, an economic calendar and heatmaps.",
      "tz_btn": "Open Market Pulse →",
      "scr_sub": "All {n} scripts, presented by category and by popularity — categories are assigned from what each script's code actually does.",
      "sc_updated": "Last synced: {updated}",
      "tab_ind": "Indicators",
      "tab_str": "Strategies",
      "tab_lib": "Libraries",
      "view_cat": "By Category",
      "view_rank": "Popularity",
      "chip_all": "All",
      "search_ph": "Search scripts…",
      "badge_invite": "Invite-Only",
      "badge_free": "Free",
      "badge_open": "Open-Source",
      "badge_protected": "Protected",
      "details": "Details →",
      "boosts": "Boosts",
      "no_results": "No scripts match your filters.",
      "desc_tbd": "(Description coming soon)",
      "more_title": "+ ~{m} more",
      "more_sub": "Scripts not yet pulled in by auto-sync are available on the TradingView profile.",
      "more_btn": "View on TradingView ↗",
      "scr_all_btn": "Open the TradingView profile",
      "mk_sub": "Live crypto, index and FX quotes, market news, an economic calendar and heatmaps — continuously auto-updated via TradingView widgets and synced to the language toggle.",
      "mk_note": "Market data & news by TradingView. Widgets may take a few seconds to load.",
      "ab_1": "Kalman filters, Bayesian inference, k-means, bandits, REINFORCE — none of it is decoration. Every algorithm is implemented in Pine Script exactly as the math says, and documented in each script's description.",
      "ab_2": "\"Quantum-inspired\" is a design philosophy, not marketing. Every script states what it can and cannot do — no promises about the future.",
      "ab_3": "No external servers. Everything runs on-chart, repainting behavior is documented, and learning advances on confirmed bars.",
      "ab_4": "Online-learning designs adapt their parameters as markets evolve. Scripts keep receiving updates after release.",
      "cta_sub": "Every script is published on TradingView — open-source, free and invite-only.<br class=\"sm:hidden\">Follow to catch new releases.",
      "cta_b1": "Follow on TradingView",
      "cta_b2": "Follow on X",
      "ft_tag": "Quantum Intelligence for Trading.<br>Pine Script™ indicators powered by<br>quantum-inspired math, AI & reinforcement learning.",
      "ft_contact": "Contact:",
      "ft_disclaimer": "This site and all scripts are for educational and informational purposes only and do not constitute investment advice. Past performance does not guarantee future results. All trading decisions are your own responsibility."
    }
  };

  /* ============================================================
     2. Category taxonomy (10 per type)
     ============================================================ */
  var CATS = {
    indicator: [
      { id: 'trend',       ja: 'トレンド分析',           en: 'Trend Analysis' },
      { id: 'oscillator',  ja: 'オシレーター',           en: 'Oscillators' },
      { id: 'forecast',    ja: '予測・ターゲット',       en: 'Forecasting & Targets' },
      { id: 'signal',      ja: 'シグナルエンジン',       en: 'Signal Engines' },
      { id: 'probability', ja: '確率・統計',             en: 'Probability & Stats' },
      { id: 'regime',      ja: 'レジーム・異常検知',     en: 'Regime & Anomaly' },
      { id: 'smc',         ja: 'スマートマネー(SMC)',    en: 'Smart Money (SMC)' },
      { id: 'volume',      ja: '出来高分析',             en: 'Volume Analysis' },
      { id: 'mtf',         ja: 'マルチタイムフレーム',   en: 'Multi-Timeframe' },
      { id: 'risk',        ja: 'リスク・トレード管理',   en: 'Risk & Trade Mgmt' }
    ],
    strategy: [
      { id: 'ai',            ja: '適応型AI・RL',         en: 'Adaptive AI & RL' },
      { id: 'trend-follow',  ja: 'トレンドフォロー',     en: 'Trend Following' },
      { id: 'mean-reversion',ja: '平均回帰',             en: 'Mean Reversion' },
      { id: 'breakout',      ja: 'ブレイクアウト',       en: 'Breakout' },
      { id: 'momentum',      ja: 'モメンタム',           en: 'Momentum' },
      { id: 'volatility',    ja: 'ボラティリティ',       en: 'Volatility' },
      { id: 'multi-factor',  ja: 'マルチファクター',     en: 'Multi-Factor' },
      { id: 'swing',         ja: 'スイング',             en: 'Swing' },
      { id: 'scalping',      ja: 'スキャルピング',        en: 'Scalping' },
      { id: 'session',       ja: 'セッション・時間帯',   en: 'Session-Based' }
    ],
    library: []
  };

  /* ============================================================
     3. Sparkline SVG per category
     ============================================================ */
  var SPARKS = {
    trend:       '<path d="M4 48 C20 46, 28 30, 44 34 S 72 14, 92 22 S 132 40, 152 28 S 184 8, 196 14" stroke="currentColor" stroke-width="2" fill="none"/>',
    oscillator:  '<path d="M4 32 C 20 8, 36 8, 52 32 S 84 56, 100 32 S 132 8, 148 32 S 180 56, 196 32" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 32 L196 32" stroke="currentColor" stroke-width="1" opacity=".25" stroke-dasharray="4 5" fill="none"/>',
    forecast:    '<path d="M4 50 C40 48, 70 40, 110 30 S 170 16, 196 12" stroke="currentColor" stroke-width="2" fill="none"/><path d="M110 30 C 140 24, 170 8, 196 4" stroke="currentColor" stroke-width="1" opacity=".4" fill="none"/><path d="M110 30 C 140 30, 170 24, 196 22" stroke="currentColor" stroke-width="1" opacity=".4" fill="none"/>',
    signal:      '<path d="M4 44 C30 42, 50 26, 80 30 S 140 18, 196 16" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 52 C34 50, 64 40, 100 42 S 160 32, 196 28" stroke="currentColor" stroke-width="1.3" opacity=".5" fill="none"/><circle cx="148" cy="22" r="3.5" fill="currentColor" opacity=".9"/>',
    probability: '<rect x="14" y="38" width="9" height="16" fill="currentColor" opacity=".45"/><rect x="34" y="30" width="9" height="24" fill="currentColor" opacity=".6"/><rect x="54" y="22" width="9" height="32" fill="currentColor" opacity=".8"/><rect x="74" y="30" width="9" height="24" fill="currentColor" opacity=".6"/><rect x="94" y="40" width="9" height="14" fill="currentColor" opacity=".4"/><path d="M10 46 C 40 14, 70 14, 100 46 S 160 56, 196 30" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    regime:      '<path d="M4 44 L48 44 L48 24 L104 24 L104 38 L150 38 L150 14 L196 14" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="48" cy="24" r="3" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".8"/><circle cx="150" cy="14" r="3" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".8"/>',
    smc:         '<rect x="28" y="20" width="36" height="10" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity=".14"/><rect x="118" y="36" width="36" height="10" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity=".14"/><path d="M4 46 L40 40 L70 25 L96 34 L128 44 L160 30 L196 18" stroke="currentColor" stroke-width="2" fill="none"/>',
    volume:      '<rect x="12" y="40" width="10" height="14" fill="currentColor" opacity=".5"/><rect x="32" y="32" width="10" height="22" fill="currentColor" opacity=".7"/><rect x="52" y="20" width="10" height="34" fill="currentColor" opacity=".95"/><rect x="72" y="28" width="10" height="26" fill="currentColor" opacity=".7"/><rect x="92" y="36" width="10" height="18" fill="currentColor" opacity=".55"/><rect x="112" y="26" width="10" height="28" fill="currentColor" opacity=".75"/><rect x="132" y="34" width="10" height="20" fill="currentColor" opacity=".6"/><rect x="152" y="42" width="10" height="12" fill="currentColor" opacity=".45"/>',
    mtf:         '<path d="M4 46 C40 44, 80 36, 196 24" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="M4 38 C50 34, 100 26, 196 16" stroke="currentColor" stroke-width="1.4" opacity=".6" fill="none"/><path d="M4 30 C60 24, 120 16, 196 8" stroke="currentColor" stroke-width="1" opacity=".35" fill="none"/>',
    risk:        '<path d="M4 44 C24 40, 36 30, 56 32 C72 34, 80 44, 96 40 C120 34, 140 18, 196 12" stroke="currentColor" stroke-width="2" fill="none"/><path d="M56 32 L96 40" stroke="currentColor" stroke-width="1" opacity=".35" stroke-dasharray="3 4" fill="none"/><circle cx="96" cy="40" r="3" fill="currentColor" opacity=".8"/>',
    ai:          '<path d="M4 40 L34 30 L54 44 L84 18 L110 34 L140 12 L168 24 L196 10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="34" cy="30" r="2.5" fill="currentColor"/><circle cx="84" cy="18" r="2.5" fill="currentColor"/><circle cx="140" cy="12" r="2.5" fill="currentColor"/><circle cx="168" cy="24" r="2.5" fill="currentColor"/>',
    _default:    '<path d="M4 40 C40 36, 80 28, 196 18" stroke="currentColor" stroke-width="2" fill="none"/>'
  };

  /* ============================================================
     4. State + i18n helpers
     ============================================================ */
  var state = { lang: 'ja', type: 'indicator', view: 'cat', cat: 'all', q: '' };

  function fmt(str) {
    var m = Math.max((DATA.totalPublished || 0) - SCRIPTS.length, 0);
    var d = (DATA.updated || '').slice(0, 10);
    return String(str)
      .replace(/\{n\}/g, DATA.totalPublished || 0)
      .replace(/\{m\}/g, m)
      .replace(/\{updated\}/g, d);
  }

  function t(key) {
    var v = I18N[state.lang][key];
    return v === undefined ? key : fmt(v);
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    var titleKey = (document.body && document.body.getAttribute('data-title-key')) || '_title';
    document.title = t(titleKey);
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (I18N[state.lang][key] !== undefined) nodes[i].innerHTML = t(key);
    }
    var search = document.getElementById('script-search');
    if (search) search.setAttribute('placeholder', t('search_ph'));
    var label = state.lang === 'ja' ? 'EN' : '日本語';
    var lt = document.getElementById('lang-toggle');
    var ltm = document.getElementById('lang-toggle-m');
    if (lt) lt.textContent = label;
    if (ltm) ltm.textContent = label;
  }

  /* ============================================================
     5. Catalog rendering（featured / 全件 / ランキング）
     ============================================================ */
  function catLabel(type, catId) {
    var list = CATS[type] || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === catId) return list[i][state.lang];
    }
    return catId ? catId : '—';
  }

  function filteredScripts() {
    var q = state.q.toLowerCase();
    return SCRIPTS.filter(function (s) {
      if (s.type !== state.type) return false;
      if (state.view === 'cat' && state.cat !== 'all' && s.cat !== state.cat) return false;
      if (q) {
        var hay = ((s.code || '') + ' ' + (s.name || '') + ' ' + (s.ja || '') + ' ' + (s.en || '') + ' ' + (s.tags || []).join(' ')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function badgeHtml(access) {
    if (access === 'free') return '<span class="neon-badge neon-badge--free absolute top-4 right-4">' + t('badge_free') + '</span>';
    if (access === 'open') return '<span class="neon-badge neon-badge--open absolute top-4 right-4">' + t('badge_open') + '</span>';
    if (access === 'protected') return '<span class="neon-badge neon-badge--protected absolute top-4 right-4">' + t('badge_protected') + '</span>';
    return '<span class="neon-badge absolute top-4 right-4">' + t('badge_invite') + '</span>';
  }

  function cardHtml(s, rankIdx) {
    var spark = SPARKS[s.cat] || SPARKS._default;
    var desc = (state.lang === 'ja' ? s.ja : s.en) || t('desc_tbd');
    var url = s.url || TV_PROFILE;
    var color = s.color || 'cyan';
    var tagsHtml = '';
    var tags = s.tags || [];
    for (var i = 0; i < tags.length; i++) tagsHtml += '<span class="tag-chip">' + tags[i] + '</span>';
    var rankHtml = '';
    if (rankIdx >= 0) {
      rankHtml = '<span class="rank-badge' + (rankIdx < 3 ? ' top' : '') + '">#' + (rankIdx + 1) + '</span>';
    }
    var footLeft = rankIdx >= 0
      ? '<span class="text-[.66rem] tracking-[.14em] uppercase text-ae-emerald/85">▲ ' + (s.boosts || 0) + ' ' + t('boosts') + '</span>'
      : '<span class="text-[.62rem] tracking-[.18em] uppercase text-gray-500">' + catLabel(s.type, s.cat) + '</span>';
    return '' +
      '<article class="neon-card nc-' + color + ' grid-card p-6 flex flex-col">' +
        '<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>' +
        rankHtml +
        badgeHtml(s.access) +
        '<div class="thumb h-32 flex items-center justify-center mb-5 border border-white/10">' +
          '<svg class="spark text-ae-' + color + '" width="200" height="64" viewBox="0 0 200 64" fill="none" aria-hidden="true">' + spark + '</svg>' +
        '</div>' +
        '<h3 class="font-orbitron font-bold text-base tracking-wider text-white leading-tight">' + (s.code || '') + '</h3>' +
        '<p class="text-[.7rem] tracking-[.2em] uppercase text-ae-' + color + '/80 mt-1">' + (s.name || catLabel(s.type, s.cat)) + '</p>' +
        '<p class="text-[.8rem] leading-7 text-gray-400 mt-3 flex-1">' + desc + '</p>' +
        '<div class="flex flex-wrap gap-2 mt-4">' + tagsHtml + '</div>' +
        '<div class="flex items-end justify-between mt-5 pt-4 border-t border-white/10">' +
          footLeft +
          '<a href="' + url + '" target="_blank" rel="noopener" class="text-[.68rem] tracking-[.2em] uppercase text-gray-400 hover:text-ae-' + color + ' transition-colors">' + t('details') + '</a>' +
        '</div>' +
      '</article>';
  }

  function moreCardHtml() {
    return '' +
      '<article class="neon-card nc-purple grid-card p-6 flex flex-col items-center justify-center text-center min-h-[280px]">' +
        '<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>' +
        '<p class="font-orbitron font-extrabold text-2xl tracking-wider grad-text">' + t('more_title') + '</p>' +
        '<p class="text-[.78rem] leading-7 text-gray-400 mt-4 max-w-xs">' + t('more_sub') + '</p>' +
        '<a href="' + TV_PROFILE + '" target="_blank" rel="noopener" class="neon-button nb-purple mt-6 !text-[.72rem] !px-6 !py-2.5">' + t('more_btn') + '</a>' +
      '</article>';
  }

  function renderChips() {
    var wrap = document.getElementById('cat-chips');
    if (!wrap) return;
    if (state.view === 'rank') { wrap.innerHTML = ''; return; }
    var typeScripts = SCRIPTS.filter(function (s) { return s.type === state.type; });
    var html = '<button class="cat-chip' + (state.cat === 'all' ? ' active' : '') + '" data-cat="all" type="button">'
             + t('chip_all') + '<span class="cnt">' + typeScripts.length + '</span></button>';
    var list = CATS[state.type] || [];
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      var n = typeScripts.filter(function (s) { return s.cat === c.id; }).length;
      if (n === 0) continue;
      html += '<button class="cat-chip' + (state.cat === c.id ? ' active' : '') + '" data-cat="' + c.id + '" type="button">'
            + c[state.lang] + '<span class="cnt">' + n + '</span></button>';
    }
    wrap.innerHTML = html;
    var chips = wrap.querySelectorAll('.cat-chip');
    for (var k = 0; k < chips.length; k++) {
      chips[k].addEventListener('click', function () {
        state.cat = this.getAttribute('data-cat');
        renderChips();
        renderGrid();
      });
    }
  }

  function renderGrid() {
    var grid = document.getElementById('script-grid');
    if (!grid) return;
    var items = filteredScripts();
    var html = '';
    if (state.view === 'rank') {
      items = items.slice().sort(function (a, b) { return (b.boosts || 0) - (a.boosts || 0); });
      for (var r = 0; r < items.length; r++) html += cardHtml(items[r], r);
    } else {
      for (var i = 0; i < items.length; i++) html += cardHtml(items[i], -1);
    }
    if (items.length === 0) {
      html = '<p class="col-span-full text-center text-sm text-gray-500 py-10">' + t('no_results') + '</p>';
    } else if (state.view === 'cat' && state.cat === 'all' && !state.q &&
               (DATA.totalPublished || 0) > SCRIPTS.length) {
      html += moreCardHtml();
    }
    grid.innerHTML = html;
  }

  function renderFeatured() {
    var grid = document.getElementById('featured-grid');
    if (!grid) return;
    var items = SCRIPTS.filter(function (s) { return s.featured; });
    var html = '';
    for (var i = 0; i < items.length; i++) html += cardHtml(items[i], -1);
    grid.innerHTML = html;
  }

  function setType(type) {
    state.type = type;
    state.cat = 'all';
    var tabs = document.querySelectorAll('.type-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-type') === type);
    }
    renderChips();
    renderGrid();
  }

  function setView(view) {
    state.view = view;
    state.cat = 'all';
    var tabs = document.querySelectorAll('.view-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-view') === view);
    }
    renderChips();
    renderGrid();
  }

  function setLang(lang) {
    state.lang = lang;
    applyI18n();
    renderChips();
    renderGrid();
    renderFeatured();
    initWidgets();
  }

  /* ============================================================
     6. TradingView live widgets（存在するIDのみマウント）
     ============================================================ */
  function mountWidget(id, file, cfg) {
    var host = document.getElementById(id);
    if (!host) return;
    host.innerHTML = '<div class="tradingview-widget-container" style="height:100%"><div class="tradingview-widget-container__widget"></div></div>';
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://s3.tradingview.com/external-embedding/' + file;
    s.async = true;
    s.text = JSON.stringify(cfg);
    host.firstChild.appendChild(s);
  }

  function initWidgets() {
    var loc = state.lang === 'ja' ? 'ja' : 'en';

    mountWidget('tv-ticker', 'embed-widget-ticker-tape.js', {
      symbols: [
        { proName: 'BINANCE:BTCUSDT', title: 'BTC/USDT' },
        { proName: 'BINANCE:ETHUSDT', title: 'ETH/USDT' },
        { proName: 'SP:SPX',          title: 'S&P 500' },
        { proName: 'TVC:NI225',       title: 'Nikkei 225' },
        { proName: 'FX:USDJPY',       title: 'USD/JPY' },
        { proName: 'FX:EURUSD',       title: 'EUR/USD' },
        { proName: 'TVC:GOLD',        title: 'GOLD' },
        { proName: 'TVC:DXY',         title: 'DXY' }
      ],
      showSymbolLogo: true, isTransparent: true, displayMode: 'adaptive',
      colorTheme: 'dark', locale: loc
    });

    mountWidget('tv-chart', 'embed-widget-advanced-chart.js', {
      autosize: true,
      symbol: 'BINANCE:BTCUSDT',
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: loc,
      allow_symbol_change: true,
      hide_side_toolbar: true,
      support_host: 'https://www.tradingview.com'
    });

    mountWidget('tv-news', 'embed-widget-timeline.js', {
      feedMode: 'all_symbols', isTransparent: true, displayMode: 'regular',
      width: '100%', height: 560, colorTheme: 'dark', locale: loc
    });

    mountWidget('tv-news-teaser', 'embed-widget-timeline.js', {
      feedMode: 'all_symbols', isTransparent: true, displayMode: 'regular',
      width: '100%', height: 380, colorTheme: 'dark', locale: loc
    });

    mountWidget('tv-overview', 'embed-widget-market-overview.js', {
      colorTheme: 'dark', dateRange: '3M', showChart: true, isTransparent: true,
      showSymbolLogo: true, width: '100%', height: 560, locale: loc,
      tabs: [
        { title: loc === 'ja' ? '暗号資産' : 'Crypto',
          symbols: [
            { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
            { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
            { s: 'BINANCE:SOLUSDT', d: 'Solana' },
            { s: 'BINANCE:XRPUSDT', d: 'XRP' }
          ] },
        { title: loc === 'ja' ? '株価指数' : 'Indices',
          symbols: [
            { s: 'SP:SPX',     d: 'S&P 500' },
            { s: 'NASDAQ:NDX', d: 'Nasdaq 100' },
            { s: 'TVC:NI225',  d: 'Nikkei 225' },
            { s: 'TVC:DJI',    d: 'Dow 30' }
          ] },
        { title: loc === 'ja' ? '為替' : 'Forex',
          symbols: [
            { s: 'FX:USDJPY', d: 'USD/JPY' },
            { s: 'FX:EURUSD', d: 'EUR/USD' },
            { s: 'FX:GBPUSD', d: 'GBP/USD' },
            { s: 'FX:AUDJPY', d: 'AUD/JPY' }
          ] }
      ]
    });

    mountWidget('tv-calendar', 'embed-widget-events.js', {
      colorTheme: 'dark', isTransparent: true, width: '100%', height: 520,
      locale: loc, importanceFilter: '0,1'
    });

    mountWidget('tv-fx', 'embed-widget-forex-cross-rates.js', {
      colorTheme: 'dark', isTransparent: true, width: '100%', height: 520,
      locale: loc, currencies: ['USD', 'JPY', 'EUR', 'GBP', 'AUD', 'CHF', 'CAD']
    });

    mountWidget('tv-heat-crypto', 'embed-widget-crypto-coins-heatmap.js', {
      dataSource: 'Crypto', blockSize: 'market_cap_calc', blockColor: '24h_close_change|5',
      locale: loc, colorTheme: 'dark', isTransparent: true, hasTopBar: false,
      isDataSetEnabled: false, isZoomEnabled: true, hasSymbolTooltip: true,
      width: '100%', height: 500
    });

    mountWidget('tv-heat-stock', 'embed-widget-stock-heatmap.js', {
      dataSource: 'SPX500', blockSize: 'market_cap_basic', blockColor: 'change',
      grouping: 'sector', locale: loc, colorTheme: 'dark', isTransparent: true,
      hasTopBar: false, isZoomEnabled: true, width: '100%', height: 500
    });
  }

  /* ============================================================
     7. Quantum particle field
     ============================================================ */
  var canvas = document.getElementById('quantum-canvas');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canvas) {
    var ctx = canvas.getContext('2d');
    var TAU = Math.PI * 2;
    var PALETTE = [
      { r: 0,   g: 212, b: 255 },
      { r: 0,   g: 255, b: 159 },
      { r: 157, g: 0,   b: 255 },
      { r: 255, g: 0,   b: 255 }
    ];

    var W = 0, H = 0, DPR = 1;
    var particles = [];
    var LINK_DIST = 130;
    var MOUSE_DIST = 165;
    var mouse = { x: -9999, y: -9999, active: false };
    var running = true;
    var rafId = null;

    var rand = function (a, b) { return a + Math.random() * (b - a); };

    var pickColor = function () {
      var v = Math.random();
      if (v < 0.42) return PALETTE[0];
      if (v < 0.72) return PALETTE[1];
      if (v < 0.92) return PALETTE[2];
      return PALETTE[3];
    };

    var Particle = function (initial) { this.reset(initial); };

    Particle.prototype.reset = function (initial) {
      this.x = rand(0, W);
      this.y = rand(0, H);
      var speed = rand(0.06, 0.32);
      var angle = rand(0, TAU);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.r = rand(1, 2.2);
      this.c = pickColor();
      this.glow = 0;
      this.maxLife = rand(360, 840);
      this.life = initial ? rand(0, this.maxLife) : this.maxLife;
      this.alpha = 0;
    };

    Particle.prototype.step = function () {
      if (mouse.active) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          var d = Math.sqrt(d2) || 1;
          var f = (1 - d / MOUSE_DIST) * 0.032;
          this.vx += (dx / d) * f;
          this.vy += (dy / d) * f;
          this.glow = Math.min(1, this.glow + 0.07);
        } else {
          this.glow *= 0.94;
        }
      } else {
        this.glow *= 0.94;
      }

      var sp = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (sp > 0.85) {
        this.vx *= 0.85 / sp;
        this.vy *= 0.85 / sp;
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;

      this.life -= 1;
      if (this.life <= 0) this.reset(false);
      var lp = this.life / this.maxLife;
      this.alpha = Math.sin(Math.PI * lp);
    };

    Particle.prototype.draw = function () {
      var c = this.c;
      var a = this.alpha;
      var rr = this.r + this.glow * 1.6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, rr * 3, 0, TAU);
      ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (0.10 + 0.16 * this.glow) * a + ')';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, rr, 0, TAU);
      ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (0.55 + 0.45 * this.glow) * a + ')';
      ctx.fill();
    };

    var targetCount = function () {
      var base = (W * H) / 22000;
      return Math.max(26, Math.min(80, Math.round(base)));
    };

    var resizeField = function () {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      var n = targetCount();
      while (particles.length < n) particles.push(new Particle(true));
      if (particles.length > n) particles.length = n;
    };

    var drawLinks = function () {
      var i, j, p, q, dx, dy, d2, d, a;
      var max2 = LINK_DIST * LINK_DIST;
      ctx.lineWidth = 0.6;
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        for (j = i + 1; j < particles.length; j++) {
          q = particles[j];
          dx = p.x - q.x;
          dy = p.y - q.y;
          d2 = dx * dx + dy * dy;
          if (d2 < max2) {
            d = Math.sqrt(d2);
            a = (1 - d / LINK_DIST) * 0.30 * p.alpha * q.alpha;
            ctx.strokeStyle = 'rgba(' + p.c.r + ',' + p.c.g + ',' + p.c.b + ',' + a + ')';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          dx = p.x - mouse.x;
          dy = p.y - mouse.y;
          d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST) {
            d = Math.sqrt(d2);
            a = (1 - d / MOUSE_DIST) * 0.35 * p.alpha;
            ctx.strokeStyle = 'rgba(0,212,255,' + a + ')';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    var frame = function () {
      if (!running) { rafId = null; return; }
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) particles[i].step();
      drawLinks();
      for (var k = 0; k < particles.length; k++) particles[k].draw();
      rafId = window.requestAnimationFrame(frame);
    };

    var startLoop = function () {
      if (rafId === null && running) rafId = window.requestAnimationFrame(frame);
    };

    resizeField();
    window.addEventListener('resize', resizeField);

    if (reduceMotion) {
      for (var s0 = 0; s0 < particles.length; s0++) particles[s0].step();
      drawLinks();
      for (var s1 = 0; s1 < particles.length; s1++) particles[s1].draw();
    } else {
      window.addEventListener('pointermove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      }, { passive: true });
      window.addEventListener('pointerdown', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      }, { passive: true });
      document.documentElement.addEventListener('mouseleave', function () {
        mouse.active = false;
      });
      window.addEventListener('blur', function () { mouse.active = false; });

      document.addEventListener('visibilitychange', function () {
        running = !document.hidden;
        if (running) startLoop();
      });

      startLoop();
    }
  }

  /* ============================================================
     8. UI wiring（全要素null安全 / どのページでも動作）
     ============================================================ */
  var nav = document.getElementById('navbar');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    var mobileLinks = mobileMenu.querySelectorAll('a');
    for (var m = 0; m < mobileLinks.length; m++) {
      mobileLinks[m].addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    }
  }

  var typeTabs = document.querySelectorAll('.type-tab');
  for (var tIdx = 0; tIdx < typeTabs.length; tIdx++) {
    typeTabs[tIdx].addEventListener('click', function () {
      setType(this.getAttribute('data-type'));
    });
  }

  var viewTabs = document.querySelectorAll('.view-tab');
  for (var vIdx = 0; vIdx < viewTabs.length; vIdx++) {
    viewTabs[vIdx].addEventListener('click', function () {
      setView(this.getAttribute('data-view'));
    });
  }

  var searchEl = document.getElementById('script-search');
  if (searchEl) {
    searchEl.addEventListener('input', function () {
      state.q = this.value.trim();
      renderGrid();
    });
  }

  var toggleLang = function () { setLang(state.lang === 'ja' ? 'en' : 'ja'); };
  var lt = document.getElementById('lang-toggle');
  var ltm = document.getElementById('lang-toggle-m');
  if (lt) lt.addEventListener('click', toggleLang);
  if (ltm) ltm.addEventListener('click', toggleLang);

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Initial render ---------- */
  applyI18n();
  renderChips();
  renderGrid();
  renderFeatured();
  initWidgets();
})();
