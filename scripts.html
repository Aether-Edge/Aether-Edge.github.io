# AetherEdge Official Site

量子インスパイアード × AI × 強化学習の Pine Script™ ブランド **AetherEdge** の公式サイト。
非営利・スクリプト紹介特化。サイバーパンク調・日英バイリンガル・リアルタイム市況付き。

## 構成

```
├── index.html              メインページ（ヒーロー / 特集スクリプト / Market teaser / About）
├── scripts.html            全スクリプトカタログ（カテゴリー別 / 人気ランキング / 検索）
├── market.html             Market Pulse（チャート / ニュース / 経済指標 / FX / ヒートマップ）
├── assets/
│   ├── style.css           共有ネオンCSS
│   ├── common.js           i18n・カタログ描画・TVウィジェット・量子粒子
│   ├── logo.jpg / bg.jpg   ブランド画像
├── data/
│   └── scripts-data.js     ★スクリプトカタログ（自動同期対象）
├── tools/
│   └── sync-tradingview.mjs  TradingView同期スクレイパー（Playwright）
└── .github/workflows/sync.yml  6時間ごとの自動同期（GitHub Actions）
```

## デプロイ（GitHub Pages）

1. このフォルダを GitHub リポジトリとして push
2. リポジトリの **Settings → Pages → Source: Deploy from a branch → main / (root)**
3. 数分で `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます
4. 公開URLが決まったら `index.html` の OGP メタ（`★EDIT`）を実URLに差し替え

## 自動同期（スクリプト一覧・ブースト数）

`tools/sync-tradingview.mjs` が TradingView プロフィールから
**全公開スクリプトのタイトル / URL / ブースト数 / 種別 / アクセス形態** を取得し、
`data/scripts-data.js` にマージします。

- **自動更新**: boosts / url / slug / access / type / totalPublished / updated
- **手動編集が保持される**: cat / ja / en / tags / color / featured / code / name
- 新規スクリプトは `needsReview: true` で追加され、カテゴリーと説明文の付与待ちになります

### ローカル / Claude Code での初回実行

```bash
npm install
npx playwright install chromium
npm run sync
```

Claude Code なら、このリポジトリを開いて次のように頼むだけです:

> `npm run sync` を実行して。新規スクリプトが出たら、各TradingViewページの
> 説明文を読んで `data/scripts-data.js` の cat（common.js の10カテゴリーから1つ）、
> ja/en の短い説明文、tags を設定し、needsReview を外して。

### GitHub Actions（完全自動化）

`.github/workflows/sync.yml` が **6時間ごと**に同期を実行し、変更があれば自動コミットします。
GitHub Pages は main への push で自動再デプロイされるため、
**新スクリプトの公開やブースト数の変化が自動でサイトに反映**されます。
（手動実行: Actions タブ → Sync TradingView catalog → Run workflow）

### セレクタが壊れたら

TradingView の DOM 変更で取得が 0 件になった場合、Claude Code に:

> tools/sync-tradingview.mjs の extractScripts を実際のDOMに合わせて修正して。
> プロフィールは https://www.tradingview.com/u/AetherEdge/#published-scripts

## 編集ポイント（コード内を「★EDIT」で検索）

| 箇所 | 内容 |
|---|---|
| index/scripts/market.html | Blog・note のURL、連絡先メール |
| index.html | OGP の og:url / og:image（デプロイ後） |
| data/scripts-data.js | スクリプトの手動追加・featured フラグ・カテゴリー |

## カテゴリー体系（各10種）

- **Indicators**: トレンド分析 / オシレーター / 予測・ターゲット / シグナルエンジン / 確率・統計 / レジーム・異常検知 / SMC / 出来高分析 / マルチTF / リスク・トレード管理
- **Strategies**: 適応型AI・RL / トレンドフォロー / 平均回帰 / ブレイクアウト / モメンタム / ボラティリティ / マルチファクター / スイング / スキャルピング / セッション

カテゴリーは**各スクリプトのコード（主機能アルゴリズム）に基づいて1つだけ**付与します。

## 免責

本サイトおよび全スクリプトは教育・情報提供を目的としており、投資助言ではありません。
