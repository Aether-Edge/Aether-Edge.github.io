/* ============================================================
   AetherEdge — Script Catalog Data
   このファイルは tools/sync-tradingview.mjs により自動更新されます。
   ============================================================ */
window.AE_DATA = /*__DATA_START__*/{
  "updated": "2026-06-11T00:00:00Z",
  "totalPublished": 98,
  "scripts": [
    {
      "code": "AE-QUORUM", "name": "Ensemble Signal Engine", "type": "indicator", "cat": "signal",
      "access": "invite", "color": "cyan", "tags": ["ENSEMBLE", "CONFORMAL"], "boosts": 0,
      "slug": null, "url": null, "featured": true,
      "ja": "6つのTAエキスパートをレジーム別オンライン学習で統合するスタッキング型シグナルエンジン。コンフォーマル予測で較正済み確率と「待機」判定を出力。",
      "en": "Stacking ensemble that learns regime-dependent weights over six TA experts online. Conformal prediction yields calibrated probabilities — and an honest WAIT state."
    },
    {
      "code": "AE-TIDE", "name": "Flow Exhaustion Oscillator", "type": "indicator", "cat": "oscillator",
      "access": "invite", "color": "emerald", "tags": ["FLOW", "BAYES"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "マネーフロー枯渇のタイミングをRLで学習するオシレーター。ダイバージェンスにはベイズ信頼度スコアを付与。",
      "en": "Money-flow exhaustion oscillator with RL-learned timing. Divergences carry a Bayesian confidence score."
    },
    {
      "code": "AE-HELM", "name": "Regime + RL Position Manager", "type": "indicator", "cat": "risk",
      "access": "invite", "color": "purple", "tags": ["REGIME", "REINFORCE"], "boosts": 0,
      "slug": null, "url": null, "featured": true,
      "ja": "市場レジームをオンライン分類し、REINFORCE方策勾配でポジション戦略を学習する建玉マネージャ。",
      "en": "Classifies market regimes online and learns a position-management policy via REINFORCE."
    },
    {
      "code": "AE-VECTOR", "name": "Conformal Forecast Bands", "type": "indicator", "cat": "forecast",
      "access": "invite", "color": "magenta", "tags": ["FORECAST", "ONLINE-ML"], "boosts": 0,
      "slug": null, "url": null, "featured": true,
      "ja": "オンライン回帰で先行きを予測し、コンフォーマル較正されたターゲット帯を描画。統計的な被覆保証付き。",
      "en": "Online-regression price forecast with conformally calibrated target bands — statistically guaranteed coverage."
    },
    {
      "code": "AE-ATB", "name": "Adaptive Trend Bandit", "type": "indicator", "cat": "trend",
      "access": "invite", "color": "cyan", "tags": ["K-MEANS", "UCB-BANDIT"], "boosts": 0,
      "slug": null, "url": null, "featured": true,
      "ja": "ストリーミングk-meansでボラティリティをクラスタリングし、UCBバンディットがSuperTrend係数を適応選択。",
      "en": "Streaming k-means clusters volatility while a UCB bandit adaptively selects SuperTrend factors."
    },
    {
      "code": "AE-IRM", "name": "Inefficiency Refill Model", "type": "indicator", "cat": "smc",
      "access": "invite", "color": "emerald", "tags": ["LIQUIDITY", "SURVIVAL"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "流動性ボイド（非効率）を検出し、学習型リフィル確率と生存時間モデルで「いつ埋まるか」を推定。",
      "en": "Detects liquidity voids and estimates refill probability and timing with a learned survival model."
    },
    {
      "code": "AE-AMF", "name": "Adaptive MTF Fusion", "type": "indicator", "cat": "mtf",
      "access": "invite", "color": "purple", "tags": ["MTF", "ONLINE-ML"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "複数タイムフレームのモメンタムを融合。TF別の重みをオンライン学習で市場に適応させる。",
      "en": "Fuses momentum across timeframes; per-timeframe weights adapt through online learning."
    },
    {
      "code": "AE-FAM", "name": "Flow Anomaly Markov", "type": "indicator", "cat": "regime",
      "access": "invite", "color": "magenta", "tags": ["ANOMALY", "MARKOV"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "2Dマハラノビス距離で出来高×値動きの異常を検知し、条件付きマルコフ連鎖で次の状態遷移を確率予測。",
      "en": "2D Mahalanobis anomaly detection on flow × price, with a conditional Markov chain forecasting the next state transition."
    },
    {
      "code": "AE-OBQ", "name": "Order Block Quality", "type": "indicator", "cat": "smc",
      "access": "invite", "color": "cyan", "tags": ["ORDER-BLOCK", "SCREENER"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "オーダーブロックの品質をオンラインMLで採点。同一モデルの複数銘柄スクリーナーを同梱。",
      "en": "Scores order-block quality with online ML — and ships a multi-symbol screener built on the same model."
    },
    {
      "code": "AE-BLP", "name": "Bayesian Level Probabilities", "type": "indicator", "cat": "probability",
      "access": "invite", "color": "emerald", "tags": ["BAYES", "LEVELS"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "統計的レベルの保持/ブレイクをBeta-Bernoulliベイズ推定。条件付き確率と信用区間を表示。",
      "en": "Beta-Bernoulli Bayesian estimates of level hold/break — conditional probabilities with credible intervals."
    },
    {
      "code": "AE-KALMAN", "name": "Kalman State-Space Trend", "type": "indicator", "cat": "trend",
      "access": "invite", "color": "purple", "tags": ["KALMAN", "STATE-SPACE"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "カルマンフィルタによる状態空間トレンド推定。ノイズと真のトレンドを数学的に分離する。",
      "en": "State-space trend estimation via Kalman filtering — mathematically separating noise from trend."
    },
    {
      "code": "AE-STRATA", "name": "SMC × Machine Learning", "type": "indicator", "cat": "smc",
      "access": "invite", "color": "magenta", "tags": ["SMC", "ML/RL"], "boosts": 0,
      "slug": null, "url": null, "featured": true,
      "ja": "スマートマネー・コンセプト（SMC）の構造検出にML/RLレイヤーを統合した次世代SMCツール。",
      "en": "Next-gen Smart Money Concepts: structure detection fused with ML/RL layers."
    },
    {
      "code": "AE-BPE Lite", "name": "Breakout Probability Engine", "type": "indicator", "cat": "probability",
      "access": "free", "color": "emerald", "tags": ["BREAKOUT", "FREE"], "boosts": 0,
      "slug": null, "url": null, "featured": true,
      "ja": "ブレイクアウト成功確率エンジンの無料版。コア確率モデルをそのまま体験できるエントリーモデル。",
      "en": "Free tier of the Breakout Probability Engine — experience the core probability model at no cost."
    },
    {
      "code": "AE-BPE Pro", "name": "Breakout Probability Engine", "type": "indicator", "cat": "probability",
      "access": "invite", "color": "cyan", "tags": ["BREAKOUT", "PROBABILITY"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "学習型の成功確率推定と高度なフィルターを備えたフル機能版。",
      "en": "Full-featured tier with learned success-probability estimation and advanced filters."
    },
    {
      "code": "AE-BPE Pro+", "name": "Breakout Probability Engine", "type": "indicator", "cat": "probability",
      "access": "invite", "color": "purple", "tags": ["BREAKOUT", "FLAGSHIP"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "全機能＋上位フィルター/アラートを備えたフラッグシップ・ティア。",
      "en": "Flagship tier — every feature plus premium filters and alerts."
    },
    {
      "code": "AE-PWRC", "name": "Personal WinRate Coach", "type": "indicator", "cat": "risk",
      "access": "open", "color": "emerald", "tags": ["SELF-COACH", "REGIME"], "boosts": 0,
      "slug": "qjPbh7py", "url": "https://www.tradingview.com/script/qjPbh7py/", "featured": false,
      "ja": "自分のトレード結果を記録し、勝ちやすいレジームを学習してHUDで助言するセルフコーチング・ツール。",
      "en": "Logs your trade outcomes, learns which regimes you win in, and coaches you in the HUD."
    },
    {
      "code": "AE-VPSA", "name": "Volume Profile Session Analyzer", "type": "indicator", "cat": "volume",
      "access": "open", "color": "cyan", "tags": ["VOLUME-PROFILE", "SESSION"], "boosts": 0,
      "slug": "pt732MUy", "url": "https://www.tradingview.com/script/pt732MUy/", "featured": false,
      "ja": "セッション単位の出来高プロファイルを動的に構築・延長するアナライザー。",
      "en": "Builds and extends session-anchored volume profiles dynamically."
    },
    {
      "code": "NRO", "name": "Neuro-Regime Oracle", "type": "strategy", "cat": "ai",
      "access": "free", "color": "purple", "tags": ["DUELING-Q", "WALK-FORWARD"], "boosts": 0,
      "slug": null, "url": null, "featured": false,
      "ja": "予測コア／オーダーフロー／レジーム検出／Dueling-Q学習を9フェーズ統合した適応型AI戦略。ウォークフォワード検証付き。",
      "en": "A 9-phase adaptive AI strategy: forecasting core, order flow, regime detection and Dueling-Q learning — with walk-forward validation."
    }
  ]
}/*__DATA_END__*/;
