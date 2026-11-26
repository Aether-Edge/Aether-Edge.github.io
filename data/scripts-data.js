/* ============================================================
   AetherEdge — Script Catalog Data
   このファイルは tools/sync-tradingview.mjs により自動更新されます。
   ============================================================ */
window.AE_DATA = /*__DATA_START__*/{
  "updated": "2026-11-26T07:08:34.965Z",
  "totalPublished": 24,
  "scripts": [
    {
      "code": "Market Scanner",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "cyan",
      "tags": [
        "scanner",
        "screener",
        "signals"
      ],
      "boosts": 13,
      "slug": "uIXZXUhk",
      "url": "https://www.tradingview.com/script/uIXZXUhk/",
      "featured": false,
      "needsReview": false,
      "ja": "複数銘柄を一括スキャンし条件に合致したものを抽出するスクリーナー。",
      "en": "Scans multiple symbols at once and surfaces those meeting your conditions."
    },
    {
      "code": "Adaptive Anchored VWAP",
      "name": "",
      "type": "indicator",
      "cat": "volume",
      "access": "open",
      "color": "emerald",
      "tags": [
        "vwap",
        "volume",
        "adaptive"
      ],
      "boosts": 10,
      "slug": "fRCrxRLG",
      "url": "https://www.tradingview.com/script/fRCrxRLG/",
      "featured": false,
      "needsReview": false,
      "ja": "アンカー起点からの出来高加重平均を相場に応じて適応させるVWAP。",
      "en": "Anchored VWAP that adapts its parameters to current market conditions."
    },
    {
      "code": "Seasonality",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "purple",
      "tags": [
        "seasonality",
        "empirical-bayes",
        "t-stat",
        "statistics"
      ],
      "boosts": 5,
      "slug": "3Br0G8Y8",
      "url": "https://www.tradingview.com/script/3Br0G8Y8/",
      "featured": false,
      "needsReview": false,
      "ja": "時間帯・曜日・月ごとのリターンをt統計量と経験的ベイズ縮小で検定するシーズナリティ指標。",
      "en": "Computes mean return, win-rate, and t-stat per hour/weekday/month bucket, applying empirical-Bayes shrinkage to penalize low-sample estimates."
    },
    {
      "code": "Adaptive Risk Engine",
      "name": "",
      "type": "indicator",
      "cat": "risk",
      "access": "open",
      "color": "magenta",
      "tags": [
        "kelly criterion",
        "position sizing",
        "atr",
        "online learning"
      ],
      "boosts": 10,
      "slug": "Zxp8c8KY",
      "url": "https://www.tradingview.com/script/Zxp8c8KY/",
      "featured": false,
      "needsReview": false,
      "ja": "オンライン学習でP(win)を推定し、フラクショナルケリー基準でポジションサイズを算出するリスク管理ツール。",
      "en": "Estimates win probability via online logistic regression and sizes positions using fractional Kelly criterion with ATR-based stops and loss-streak throttling."
    },
    {
      "code": "Pattern Edge Learner",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "cyan",
      "tags": [
        "kernel regression",
        "candlestick",
        "pattern",
        "non-parametric"
      ],
      "boosts": 13,
      "slug": "Zc7zhbEn",
      "url": "https://www.tradingview.com/script/Zc7zhbEn/",
      "featured": false,
      "needsReview": false,
      "ja": "ATR正規化シグネチャとカーネル回帰で過去類似パターンの上昇確率と期待値を推定する。",
      "en": "Encodes recent bars as ATR-normalized shape signatures and estimates forward up-probability via Nadaraya-Watson kernel regression over historical analogues."
    },
    {
      "code": "Mean-Reversion Bands",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "emerald",
      "tags": [
        "mean-reversion",
        "probability",
        "bands",
        "regime-adaptive"
      ],
      "boosts": 10,
      "slug": "LImygeiq",
      "url": "https://www.tradingview.com/script/LImygeiq/",
      "featured": false,
      "needsReview": false,
      "ja": "バンドタッチ時の平均回帰確率をオンライン・ロジスティック回帰と三重バリア法で推定し、UCBしきい値をレジーム別に調整する。",
      "en": "Estimates mean-reversion probability at band touches via online logistic regression with triple-barrier labeling and UCB-adaptive per-regime thresholds."
    },
    {
      "code": "Intermarket Correlation",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "purple",
      "tags": [
        "correlation",
        "intermarket",
        "regression",
        "forecast"
      ],
      "boosts": 4,
      "slug": "PrUMOHgf",
      "url": "https://www.tradingview.com/script/PrUMOHgf/",
      "featured": false,
      "needsReview": false,
      "ja": "6参照市場との相関・ベータを算出し、オンライン線形回帰で翌バーリターンを予測する。",
      "en": "Computes rolling correlation and beta against six reference markets and fits an online linear regression to forecast next-bar return with a conformal prediction band."
    },
    {
      "code": "Volatility Forecast",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "magenta",
      "tags": [
        "volatility",
        "ewma",
        "conformal",
        "regime"
      ],
      "boosts": 8,
      "slug": "L1KM5jMe",
      "url": "https://www.tradingview.com/script/L1KM5jMe/",
      "featured": false,
      "needsReview": false,
      "ja": "適応的EWMAでボラティリティを予測し、コンフォーマル校正済みの期待レンジとポジションサイズ倍率を出力する。",
      "en": "Adaptive EWMA variance model forecasts next-bar and N-bar volatility via a conformal-calibrated price envelope, regime labels, and vol-targeted position sizing."
    },
    {
      "code": "Adaptive Volume Profile",
      "name": "",
      "type": "indicator",
      "cat": "volume",
      "access": "open",
      "color": "cyan",
      "tags": [
        "volume-profile",
        "logistic-regression",
        "breakout",
        "ucb-bandit"
      ],
      "boosts": 27,
      "slug": "HiRgqVon",
      "url": "https://www.tradingview.com/script/HiRgqVon/",
      "featured": false,
      "needsReview": false,
      "ja": "POC・VAH・VALを算出し、オンラインロジスティック回帰でバリューエリア端のブレイク受容確率を推定する。",
      "en": "Builds a volume profile (POC, VAH, VAL) and estimates breakout acceptance probability at value-area edges via online logistic regression with a UCB-tuned threshold."
    },
    {
      "code": "Smart Money Flow",
      "name": "",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "cyan",
      "tags": [
        "smc",
        "order flow",
        "smart money"
      ],
      "boosts": 665,
      "slug": "jkgBMcNr",
      "url": "https://www.tradingview.com/script/jkgBMcNr/",
      "featured": false,
      "needsReview": false,
      "ja": "スマートマネーの資金フローを可視化し方向性の偏りを示す。",
      "en": "Visualizes smart-money order flow to reveal directional bias."
    },
    {
      "code": "Flow Anomaly Markov",
      "name": "",
      "type": "indicator",
      "cat": "utility",
      "access": "open",
      "color": "purple",
      "tags": [
        "markov",
        "library",
        "anomaly"
      ],
      "boosts": 14,
      "slug": "cEvBEkmc",
      "url": "https://www.tradingview.com/script/cEvBEkmc/",
      "featured": false,
      "needsReview": false,
      "ja": "マルコフ連鎖でフローの異常を検出する再利用可能なライブラリ。",
      "en": "Reusable library detecting order-flow anomalies via Markov chains."
    },
    {
      "code": "TIDE | Flow + RL Oscillator",
      "name": "",
      "type": "indicator",
      "cat": "oscillator",
      "access": "open",
      "color": "purple",
      "tags": [
        "oscillator",
        "reinforcement learning",
        "flow"
      ],
      "boosts": 45,
      "slug": "kJ1yvvmI",
      "url": "https://www.tradingview.com/script/kJ1yvvmI/",
      "featured": false,
      "needsReview": false,
      "ja": "フロー分析と強化学習を組み合わせた適応型オシレーター。",
      "en": "Adaptive oscillator combining order-flow analysis with reinforcement learning."
    },
    {
      "code": "Bayesian Level Probabilities",
      "name": "Bayesian Level Probabilities",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "emerald",
      "tags": [
        "BAYES",
        "LEVELS"
      ],
      "boosts": 21,
      "slug": "nxv2N5Wm",
      "url": "https://www.tradingview.com/script/nxv2N5Wm/",
      "featured": false,
      "ja": "統計的レベルの保持/ブレイクをBeta-Bernoulliベイズ推定。条件付き確率と信用区間を表示。",
      "en": "Beta-Bernoulli Bayesian estimates of level hold/break — conditional probabilities with credible intervals."
    },
    {
      "code": "Order Block Quality",
      "name": "Order Block Quality",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "cyan",
      "tags": [
        "ORDER-BLOCK",
        "SCREENER"
      ],
      "boosts": 17,
      "slug": "VkKnnX2M",
      "url": "https://www.tradingview.com/script/VkKnnX2M/",
      "featured": false,
      "ja": "オーダーブロックの品質をオンラインMLで採点。同一モデルの複数銘柄スクリーナーを同梱。",
      "en": "Scores order-block quality with online ML — and ships a multi-symbol screener built on the same model."
    },
    {
      "code": "Adaptive MTF Fusion",
      "name": "Adaptive MTF Fusion",
      "type": "indicator",
      "cat": "mtf",
      "access": "open",
      "color": "purple",
      "tags": [
        "MTF",
        "ONLINE-ML"
      ],
      "boosts": 17,
      "slug": "AJmXcJOe",
      "url": "https://www.tradingview.com/script/AJmXcJOe/",
      "featured": false,
      "ja": "複数タイムフレームのモメンタムを融合。TF別の重みをオンライン学習で市場に適応させる。",
      "en": "Fuses momentum across timeframes; per-timeframe weights adapt through online learning."
    },
    {
      "code": "Inefficiency Refill Model",
      "name": "Inefficiency Refill Model",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "emerald",
      "tags": [
        "LIQUIDITY",
        "SURVIVAL"
      ],
      "boosts": 6,
      "slug": "6ApL5pgy",
      "url": "https://www.tradingview.com/script/6ApL5pgy/",
      "featured": false,
      "ja": "流動性ボイド（非効率）を検出し、学習型リフィル確率と生存時間モデルで「いつ埋まるか」を推定。",
      "en": "Detects liquidity voids and estimates refill probability and timing with a learned survival model."
    },
    {
      "code": "Adaptive Trend Bandit",
      "name": "Adaptive Trend Bandit",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "cyan",
      "tags": [
        "K-MEANS",
        "UCB-BANDIT"
      ],
      "boosts": 539,
      "slug": "9tSQp67Y",
      "url": "https://www.tradingview.com/script/9tSQp67Y/",
      "featured": true,
      "ja": "ストリーミングk-meansでボラティリティをクラスタリングし、UCBバンディットがSuperTrend係数を適応選択。",
      "en": "Streaming k-means clusters volatility while a UCB bandit adaptively selects SuperTrend factors."
    },
    {
      "code": "VECTOR | Conformal Forecast",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "conformal prediction",
        "regression",
        "prediction interval",
        "atr-normalized"
      ],
      "boosts": 8,
      "slug": "M0KTXsDX",
      "url": "https://www.tradingview.com/script/M0KTXsDX/",
      "featured": false,
      "needsReview": false,
      "ja": "オンライン線形回帰とコンフォーマル予測でHバー先の価格変動幅を推定する。",
      "en": "Projects an H-bar price target via online SGD linear regression with a conformal prediction interval calibrated to ~1−α empirical coverage."
    },
    {
      "code": "HELM | Regime + RL Manager",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "regime",
        "reinforcement learning",
        "trade management",
        "position sizing"
      ],
      "boosts": 14,
      "slug": "P07r06gT",
      "url": "https://www.tradingview.com/script/P07r06gT/",
      "featured": false,
      "needsReview": false,
      "ja": "ロジスティック回帰でトレンド/レンジを分類し、REINFORCEエージェントがエクスポージャーを管理する。",
      "en": "Online logistic classifier labels trend vs range regimes; a REINFORCE policy-gradient agent manages target exposure across five discrete levels."
    },
    {
      "code": "KALMAN | State-Space Trend",
      "name": "",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "cyan",
      "tags": [
        "kalman",
        "trend",
        "adaptive",
        "forecast"
      ],
      "boosts": 31,
      "slug": "1coOxasg",
      "url": "https://www.tradingview.com/script/1coOxasg/",
      "featured": false,
      "needsReview": false,
      "ja": "2状態カルマンフィルタで価格のレベルと速度を再帰的に推定するトレンド指標。",
      "en": "Two-state Kalman filter recursively estimates price level and velocity with ATR-scaled, innovation-adaptive noise tuning."
    },
    {
      "code": "STRATA | SMC + ML/RL",
      "name": "",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "purple",
      "tags": [
        "smc",
        "machine-learning",
        "reinforcement-learning",
        "probability"
      ],
      "boosts": 43,
      "slug": "oxGH5tac",
      "url": "https://www.tradingview.com/script/oxGH5tac/",
      "featured": false,
      "needsReview": false,
      "ja": "SMC構造（OB・FVG・BOS/CHoCH）にオンラインML確率とRL行動提案を重ねたオーバーレイ指標。",
      "en": "Overlay combining SMC elements (order blocks, FVGs, BOS/CHoCH, liquidity) with online ML probability and reinforcement learning action signals."
    },
    {
      "code": "Self-Attention Focus",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "self-attention",
        "transformer",
        "forecast",
        "machine-learning"
      ],
      "boosts": 31,
      "slug": "hAUvPolk",
      "url": "https://www.tradingview.com/script/hAUvPolk/",
      "featured": false,
      "needsReview": false,
      "ja": "過去バーとの類似度をself-attentionで計算し、加重平均で価格予測を行うインジケーター。",
      "en": "Applies transformer self-attention (query-key dot product, softmax normalization) over a 4-D feature vector to forecast price from analogous past bars."
    },
    {
      "code": "Particle Swarm Filter",
      "name": "",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "purple",
      "tags": [
        "particle-filter",
        "monte-carlo",
        "uncertainty",
        "trend"
      ],
      "boosts": 17,
      "slug": "fBAL7mVM",
      "url": "https://www.tradingview.com/script/fBAL7mVM/",
      "featured": false,
      "needsReview": false,
      "ja": "逐次モンテカルロ粒子フィルターで隠れトレンド状態を推定するインジケーター。",
      "en": "Estimates hidden trend state via a particle filter (sequential Monte Carlo) with a damped constant-velocity model and ATR-scaled noise."
    },
    {
      "code": "Gaussian Process Bands",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "gaussian process",
        "bands",
        "regression"
      ],
      "boosts": 64,
      "slug": "HquVbrsO",
      "url": "https://www.tradingview.com/script/HquVbrsO/",
      "featured": false,
      "needsReview": false,
      "ja": "ガウス過程回帰で価格の予測帯（バンド）を描画する。",
      "en": "Draws predictive price bands using Gaussian process regression."
    }
  ]
}/*__DATA_END__*/;
