# AetherEdge Backtest Engine v0.9.0

Pine Script™ サブセット対応・ブラウザ完結型バックテスター。GitHub Pages でそのまま動作します。

## デプロイ

リポジトリのルートに以下2ファイルを置くだけです(`style.css` は既存のものを利用)。

```
aether-edge.github.io/
├── backtester.html   ← 新規
├── ae-engine.js      ← 新規
└── style.css         ← 既存
```

既存ページのナビに `<a href="backtester.html">Backtester</a>` を追記してください。
ローカル確認は `python -m http.server` 等のHTTP経由で(`file://` 直開きではWorker/最適化が動きません)。

## 機能

計算はすべてブラウザ内(Web Worker)で実行され、コードもデータも外部に送信されません。

- Binance Spot / USDT-M Futures / Binance.US から最大10万本の分足〜週足を取得、または任意CSVをインポート
- Pineサブセットのパース→実行、input.* の自動フォーム化
- 詳細メトリクス: PF・勝率・最大DD・シャープ・ソルティノ・カルマー・CAGR・SQN・期待値・MAE/MFE・市場滞在率・月次ヒートマップ等
- **グリッドサーチ最適化**(TV内蔵テスターに無い機能)+ 目的関数選択、結果ソート、ワンクリック適用
- **IS/OOS分割検証**(過剰最適化の簡易チェック)
- 約定規則の明示指定: 同一バーSL/TP競合の保守的/楽観的解決
- トレード一覧CSVエクスポート、資産曲線 vs Buy&Hold、価格チャート+約定マーカー+plot()描画

## 対応Pineサブセット (v1)

- 構文: `strategy()` 宣言、`var`、`:=`、`if/else`、`for`、三項演算子、ユーザー関数 `=>`、タプル分解、履歴参照 `[]`、行継続
- `ta.*`: sma ema rma wma vwma hma rsi macd atr tr stoch cci mfi obv bb bbw kc vwap stdev variance dev change mom roc cum highest lowest highestbars lowestbars crossover crossunder cross rising falling barssince valuewhen linreg pivothigh pivotlow supertrend correlation median percentrank
- `math.*` 一式 / `nz` `na` `fixnan` / v4無印エイリアス(sma等)
- `strategy.*`: entry order close close_all exit(stop/limit/profit/loss/trail_price/trail_points/trail_offset/qty_percent) cancel cancel_all、position_size equity netprofit openprofit 等
- `input.*`: int float bool string source (minval/maxval/step/options)
- `plot()` はチャートに描画。label/line/box/table/alert系は無視(エラーにしない)

**未対応(明示エラー)**: `request.security`、`array.*`/`matrix.*`/`map.*`、`switch`、`while`、`type`/`method`、`import`

## 約定モデル仕様

1. シグナルはバー確定時評価、成行は次バー始値約定(TV標準)。設定で当バー終値も選択可
2. stop/limit はギャップ考慮(始値が条件を満たせば始値約定)
3. 同一バーでSL/TP両到達 → 保守的(SL優先)/楽観的(TP優先)を明示指定
4. スリッページは成行・ストップ系のみ、リミットは指値約定
5. ema/rma のウォームアップはPineリファレンス擬似コード(SMAシード)準拠
6. ポジション解消時に未約定ブラケットは取消(TV同様)

## 検証

`node test_engine.js` — 82項目: 指標値のリファレンス実装照合、約定・手数料・スリッページ・リバース・ピラミッディング・トレーリングの手計算一致、プリセット3種のE2E、最適化。全パス。
性能目安: 5,000本 ≒ 15–45ms、最適化は バー数×組合せ数 に比例。

## ロードマップ (Pro版の柱)

1. **バーマグニファイア**: 下位足(1m)遅延取得による同一バー内SL/TP順序の実解決 — TVではPremium限定機能
2. ウォークフォワード分析(アンカー/ローリング)・モンテカルロ(取引順シャッフル/リサンプリング)
3. `request.security` マルチTF対応、arrays対応
4. 遺伝的アルゴリズム最適化(グリッドの上位互換)
5. 収益化: Cloudflare Workers(無料枠)でライセンスキー検証 + Gumroad/Lemon Squeezy/Stripe Payment Links で販売。無料版=全機能・本数制限あり / Pro=無制限+上記機能、が定石
6. 戦略保存・共有リンク(URLハッシュにコード圧縮)

## 法務・免責

- Pine Script™/TradingView は TradingView, Inc. の商標。非提携である旨をページ内に明記済み。「互換」を謳う際は商標を製品名に含めない(例:「Pine Script™対応」はOK、「PineScript Pro」という製品名はNG)
- BinanceデータはPublic APIの利用規約に従うこと(再配布・商用利用の条件に注意。Pro版で当方サーバー経由配信する場合は要確認)
- シミュレーション結果は将来の成果を保証しない・投資助言でない旨の免責を維持すること
