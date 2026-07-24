/* ============================================================
   AetherEdge — Script Catalog Data
   このファイルは tools/sync-tradingview.mjs により自動更新されます。
   ============================================================ */
window.AE_DATA = /*__DATA_START__*/{
  "updated": "2026-07-24T08:28:37.007Z",
  "totalPublished": 108,
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
      "boosts": 6,
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
      "boosts": 4,
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
      "boosts": 4,
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
      "boosts": 5,
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
      "boosts": 6,
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
      "boosts": 5,
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
      "boosts": 1,
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
      "boosts": 5,
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
      "boosts": 15,
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
      "boosts": 610,
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
      "type": "library",
      "cat": "utility",
      "access": "open",
      "color": "purple",
      "tags": [
        "markov",
        "library",
        "anomaly"
      ],
      "boosts": 7,
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
      "boosts": 38,
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
      "boosts": 13,
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
      "boosts": 5,
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
      "boosts": 9,
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
      "boosts": 3,
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
      "boosts": 491,
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
      "boosts": 3,
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
      "boosts": 10,
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
      "boosts": 16,
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
      "boosts": 28,
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
      "boosts": 24,
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
      "boosts": 12,
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
      "boosts": 48,
      "slug": "HquVbrsO",
      "url": "https://www.tradingview.com/script/HquVbrsO/",
      "featured": false,
      "needsReview": false,
      "ja": "ガウス過程回帰で価格の予測帯（バンド）を描画する。",
      "en": "Draws predictive price bands using Gaussian process regression."
    },
    {
      "code": "Hidden Markov Regime",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "hmm",
        "regime",
        "probability",
        "gaussian"
      ],
      "boosts": 31,
      "slug": "9fBuHHkN",
      "url": "https://www.tradingview.com/script/9fBuHHkN/",
      "featured": false,
      "needsReview": false,
      "ja": "3状態HMMの前向きアルゴリズムでBull/Bear/Rangeの確率を推定し、オンラインEMでガウス分布パラメータを自動更新する。",
      "en": "Infers Bull/Bear/Range probabilities via a 3-state HMM forward algorithm with online EM learning of per-state Gaussian emission parameters."
    },
    {
      "code": "Bayesian Changepoint Shift",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "cyan",
      "tags": [
        "bayesian",
        "changepoint",
        "regime"
      ],
      "boosts": 6,
      "slug": "LTu6zkQ5",
      "url": "https://www.tradingview.com/script/LTu6zkQ5/",
      "featured": false,
      "needsReview": false,
      "ja": "ベイズ的変化点検出でレジーム転換を捉える。",
      "en": "Detects regime shifts using Bayesian changepoint detection."
    },
    {
      "code": "Wavelet Multi-Resolution",
      "name": "",
      "type": "indicator",
      "cat": "mtf",
      "access": "open",
      "color": "purple",
      "tags": [
        "wavelet",
        "multi-resolution",
        "decomposition"
      ],
      "boosts": 7,
      "slug": "tpwjfK1P",
      "url": "https://www.tradingview.com/script/tpwjfK1P/",
      "featured": false,
      "needsReview": false,
      "ja": "ウェーブレット変換で価格を複数解像度に分解して分析する。",
      "en": "Decomposes price into multiple resolutions via wavelet analysis."
    },
    {
      "code": "Autoencoder Anomaly",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "cyan",
      "tags": [
        "autoencoder",
        "anomaly-detection",
        "online-learning",
        "reconstruction-error"
      ],
      "boosts": 11,
      "slug": "psorYWV3",
      "url": "https://www.tradingview.com/script/psorYWV3/",
      "featured": false,
      "needsReview": false,
      "ja": "線形オートエンコーダで6次元特徴ベクトルを再構成し、誤差をσスコア化して市場の異常を検出する。",
      "en": "Linear autoencoder compresses a 6-feature bar state vector and flags bars with high reconstruction error as anomalies via a sigma score."
    },
    {
      "code": "Multi-Armed Bandit",
      "name": "",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "purple",
      "tags": [
        "bayesian",
        "multi-armed-bandit",
        "adaptive",
        "multi-factor"
      ],
      "boosts": 1,
      "slug": "WbBroPO3",
      "url": "https://www.tradingview.com/script/WbBroPO3/",
      "featured": false,
      "needsReview": false,
      "ja": "5つのサブシグナルをベイズBeta事後分布とThompson SamplingまたはUCBで動的に重み付けするバンディット戦略。",
      "en": "Dynamically weights five sub-signals using online Bayesian Beta posteriors updated with a forgetting factor, via Thompson Sampling or UCB allocation."
    },
    {
      "code": "Bayesian Changepoint Detection",
      "name": "Bayesian Changepoint Detection",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "bayesian",
        "changepoint",
        "regime-detection",
        "probabilistic"
      ],
      "boosts": 5,
      "slug": "HxBDk9yC",
      "url": "https://www.tradingview.com/script/HxBDk9yC/",
      "featured": false,
      "needsReview": false,
      "ja": "ベイズ逐次更新でランレング事後分布を維持し、構造的変化点の確率をリアルタイムに推定する。",
      "en": "Implements Adams & MacKay BOCPD to recursively estimate run-length posteriors and output continuous changepoint probability per bar."
    },
    {
      "code": "Principal Component Analysis",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "pca",
        "correlation",
        "eigenvalue",
        "systemic-risk"
      ],
      "boosts": 1,
      "slug": "glhV5HTd",
      "url": "https://www.tradingview.com/script/glhV5HTd/",
      "featured": false,
      "needsReview": false,
      "ja": "バスケット資産の相関行列にローリングPCAを適用し、吸収比率（λ₁/N）と上位2主成分を算出する。",
      "en": "Applies rolling PCA to a basket's correlation matrix via power iteration, computing the absorption ratio (λ₁/N) and top two eigenvectors to measure systemic correlation concentration."
    },
    {
      "code": "Spectral Cycle Engine",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "dft",
        "cycles",
        "spectrogram",
        "fourier"
      ],
      "boosts": 34,
      "slug": "FJu1N0Pe",
      "url": "https://www.tradingview.com/script/FJu1N0Pe/",
      "featured": false,
      "needsReview": false,
      "ja": "DFTで価格の支配的サイクルを検出し、フーリエ再構成で将来波形を投影する。",
      "en": "Applies a rolling DFT to linearly-detrended price to extract dominant cycles, reconstruct a filtered waveform, and project it forward as a Fourier forecast."
    },
    {
      "code": "Kalman State Filter",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "purple",
      "tags": [
        "kalman",
        "adaptive",
        "uncertainty",
        "trend"
      ],
      "boosts": 7,
      "slug": "aIi6k14x",
      "url": "https://www.tradingview.com/script/aIi6k14x/",
      "featured": false,
      "needsReview": false,
      "ja": "カルマンフィルタで価格の水準と速度を推定し、不確実性コーンを前方投影する。",
      "en": "Two-state Kalman filter estimating price level and velocity with adaptive noise and a forward-projected uncertainty cone."
    },
    {
      "code": "Gaussian Mixture Regimes",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "cyan",
      "tags": [
        "gaussian-mixture",
        "online-em",
        "soft-probability",
        "volatility"
      ],
      "boosts": 6,
      "slug": "DS6facyY",
      "url": "https://www.tradingview.com/script/DS6facyY/",
      "featured": false,
      "needsReview": false,
      "ja": "オンラインEMとGaussian混合モデルでモメンタム×ボラティリティの分布からK個のレジームを逐次推定する。",
      "en": "Fits a K-component Gaussian mixture to the joint momentum-volatility distribution each bar via online EM with a forgetting factor, outputting soft regime probabilities."
    },
    {
      "code": "Q-Learning Regime Agent",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "q-learning",
        "regime",
        "reinforcement-learning",
        "signal"
      ],
      "boosts": 7,
      "slug": "j6hnLjfP",
      "url": "https://www.tradingview.com/script/j6hnLjfP/",
      "featured": false,
      "needsReview": false,
      "ja": "トレンド・モメンタム・ボラティリティで27状態に離散化し、表形式Qラーニングでロング・ショート・フラットを学習するエージェント。",
      "en": "Tabular Q-learning agent discretizes price action into 27 Trend×Momentum×Volatility regimes and learns a Long/Flat/Short policy via TD(0) updates each bar."
    },
    {
      "code": "Echo State Network",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "echo state network",
        "reservoir",
        "forecast"
      ],
      "boosts": 15,
      "slug": "r6yBrWvn",
      "url": "https://www.tradingview.com/script/r6yBrWvn/",
      "featured": false,
      "needsReview": false,
      "ja": "エコーステートネットワーク（リザバー計算）で系列を予測する。",
      "en": "Forecasts price sequences with an echo state (reservoir computing) network."
    },
    {
      "code": "Triaxial Consensus Strategy",
      "name": "",
      "type": "strategy",
      "cat": "multi-factor",
      "access": "open",
      "color": "purple",
      "tags": [
        "consensus",
        "multi-factor",
        "ensemble"
      ],
      "boosts": 279,
      "slug": "DZ81TJie",
      "url": "https://www.tradingview.com/script/DZ81TJie/",
      "featured": false,
      "needsReview": false,
      "ja": "3軸の合議で売買判断するマルチファクター戦略。",
      "en": "Multi-factor strategy trading on a three-axis consensus."
    },
    {
      "code": "Triaxial Consensus Signals",
      "name": "",
      "type": "strategy",
      "cat": "multi-factor",
      "access": "open",
      "color": "cyan",
      "tags": [
        "consensus",
        "signals",
        "ensemble"
      ],
      "boosts": 18,
      "slug": "XWsPoosv",
      "url": "https://www.tradingview.com/script/XWsPoosv/",
      "featured": false,
      "needsReview": false,
      "ja": "3軸合議によるシグナルを出力するマルチファクター戦略。",
      "en": "Multi-factor strategy emitting signals from a three-axis consensus."
    },
    {
      "code": "Consensus Council",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "ensemble",
        "voting",
        "consensus"
      ],
      "boosts": 15,
      "slug": "mOnZQiRJ",
      "url": "https://www.tradingview.com/script/mOnZQiRJ/",
      "featured": false,
      "needsReview": false,
      "ja": "複数モデルの合議（投票）で総合シグナルを出す。",
      "en": "Aggregates multiple models by voting into a combined signal."
    },
    {
      "code": "Personal WinRate Coach",
      "name": "Personal WinRate Coach",
      "type": "indicator",
      "cat": "risk",
      "access": "open",
      "color": "emerald",
      "tags": [
        "SELF-COACH",
        "REGIME"
      ],
      "boosts": 84,
      "slug": "qjPbh7py",
      "url": "https://www.tradingview.com/script/qjPbh7py/",
      "featured": false,
      "ja": "自分のトレード結果を記録し、勝ちやすいレジームを学習してHUDで助言するセルフコーチング・ツール。",
      "en": "Logs your trade outcomes, learns which regimes you win in, and coaches you in the HUD."
    },
    {
      "code": "Mini Multi-Agent Consensus",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "cyan",
      "tags": [
        "multi-agent",
        "consensus",
        "signal"
      ],
      "boosts": 18,
      "slug": "RUjkjw2x",
      "url": "https://www.tradingview.com/script/RUjkjw2x/",
      "featured": false,
      "needsReview": false,
      "ja": "小型のマルチエージェント合議で方向性を判定する。",
      "en": "Lightweight multi-agent consensus that judges directional bias."
    },
    {
      "code": "Adaptive Volume Surge Detector",
      "name": "Adaptive Volume Surge Detector",
      "type": "indicator",
      "cat": "volume",
      "access": "open",
      "color": "purple",
      "tags": [
        "volume",
        "z-score",
        "logistic-regression",
        "signal-filter"
      ],
      "boosts": 7,
      "slug": "dcNqtPeI",
      "url": "https://www.tradingview.com/script/dcNqtPeI/",
      "featured": false,
      "needsReview": false,
      "ja": "ボリュームzスコア急増を検出し、オンラインロジスティック回帰で実シグナルとノイズを分類する。",
      "en": "Detects volume surges via z-score and classifies real vs. noise using online logistic regression with delayed ATR-continuation labels."
    },
    {
      "code": "Pattern Probability Scanner",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "cyan",
      "tags": [
        "pattern",
        "probability",
        "scanner"
      ],
      "boosts": 346,
      "slug": "srmaIJLG",
      "url": "https://www.tradingview.com/script/srmaIJLG/",
      "featured": false,
      "needsReview": false,
      "ja": "チャートパターンの出現確率を統計的にスキャンする。",
      "en": "Scans chart patterns and estimates their statistical probability."
    },
    {
      "code": "RL Momentum Filter",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "macd",
        "momentum",
        "adaptive-filter",
        "signal"
      ],
      "boosts": 22,
      "slug": "Ri3VZ3lS",
      "url": "https://www.tradingview.com/script/Ri3VZ3lS/",
      "featured": false,
      "needsReview": false,
      "ja": "MACDとモメンタムのゼロクロスをRL値関数で重み付けし、両者一致時のみシグナルを出力する。",
      "en": "Weights MACD histogram and Momentum zero-cross signals via an online Q-value table updated from ATR-scaled price outcomes, emitting labels only on agreement."
    },
    {
      "code": "Self-Evolving S/R",
      "name": "",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "cyan",
      "tags": [
        "support resistance",
        "adaptive",
        "levels"
      ],
      "boosts": 26,
      "slug": "SHEsL83I",
      "url": "https://www.tradingview.com/script/SHEsL83I/",
      "featured": false,
      "needsReview": false,
      "ja": "価格構造に合わせて自動更新する支持/抵抗ライン。",
      "en": "Support/resistance levels that self-update with evolving price structure."
    },
    {
      "code": "OneButton Trend Master",
      "name": "",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "ema",
        "knn",
        "regime",
        "signal"
      ],
      "boosts": 27,
      "slug": "iMUZhIc3",
      "url": "https://www.tradingview.com/script/iMUZhIc3/",
      "featured": false,
      "needsReview": false,
      "ja": "EMAスタックとKNN（k=7、過去250本）の一致でbuy/sell/waitを背景色で表示。",
      "en": "Classifies trend regime as buy, sell, or wait by requiring agreement between a 3-EMA stack and a 7-nearest-neighbor vote over 250-bar history."
    },
    {
      "code": "Adaptive Smart RSI",
      "name": "",
      "type": "indicator",
      "cat": "oscillator",
      "access": "open",
      "color": "cyan",
      "tags": [
        "rsi",
        "oscillator",
        "adaptive"
      ],
      "boosts": 46,
      "slug": "KAaTOG7D",
      "url": "https://www.tradingview.com/script/KAaTOG7D/",
      "featured": false,
      "needsReview": false,
      "ja": "相場に応じて感度を調整する適応型RSIオシレーター。",
      "en": "Adaptive RSI oscillator that adjusts sensitivity to market conditions."
    },
    {
      "code": "Hypercube Heatmap (Horizon Field)",
      "name": "Hypercube Heatmap (Horizon Field)",
      "type": "indicator",
      "cat": "volume",
      "access": "open",
      "color": "purple",
      "tags": [
        "heatmap",
        "price-level",
        "attention-weighting",
        "multi-feature"
      ],
      "boosts": 16,
      "slug": "lmZhqXEO",
      "url": "https://www.tradingview.com/script/lmZhqXEO/",
      "featured": false,
      "needsReview": false,
      "ja": "5特徴量のソフトマックス加重和を価格帯ごとの水平エネルギーバンドとして描画するヒートマップ。",
      "en": "Plots horizontal price-level energy bands using softmax-weighted combination of momentum, volatility, volume, trend, and RSI, with Bayesian dispersion-based uncertainty shading."
    },
    {
      "code": "Adaptive Liquidation Heatmap",
      "name": "",
      "type": "indicator",
      "cat": "risk",
      "access": "open",
      "color": "cyan",
      "tags": [
        "liquidation",
        "volume",
        "leverage",
        "heatmap"
      ],
      "boosts": 153,
      "slug": "2WzPEzZ4",
      "url": "https://www.tradingview.com/script/2WzPEzZ4/",
      "featured": false,
      "needsReview": false,
      "ja": "価格・出来高からレバレッジ別清算価格帯を推定し、減衰重み付きで描画するインジケーター。",
      "en": "Estimates leveraged liquidation price bands for 5×–100× tiers using volume-weighted back-calculation with adaptive per-tier reliability scoring."
    },
    {
      "code": "Contrastive Similarity Engine",
      "name": "Contrastive Similarity Engine",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "purple",
      "tags": [
        "similarity",
        "knn",
        "pattern"
      ],
      "boosts": 14,
      "slug": "bnyetf49",
      "url": "https://www.tradingview.com/script/bnyetf49/",
      "featured": false,
      "needsReview": false,
      "ja": "過去の類似局面を対照学習で探し将来挙動を推定する。",
      "en": "Finds analogous historical states via contrastive similarity to infer likely moves."
    },
    {
      "code": "Generative Flow Synthesizer",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "generative",
        "path-simulation",
        "uncertainty",
        "ewma"
      ],
      "boosts": 6,
      "slug": "vb4Mne7r",
      "url": "https://www.tradingview.com/script/vb4Mne7r/",
      "featured": false,
      "needsReview": false,
      "ja": "VAEの数学構造を参考に、EWMAで推定した潜在分布から複数の将来価格パスをサンプリングするインジケーター。",
      "en": "Generates multiple future price paths via VAE-inspired latent sampling (z = μ + σ·ε) with EWMA-adapted drift and volatility."
    },
    {
      "code": "PULSE Adaptive Signal Intelligence",
      "name": "PULSE Adaptive Signal Intelligence",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "signal",
        "adaptive",
        "engine"
      ],
      "boosts": 22,
      "slug": "D4M8vV79",
      "url": "https://www.tradingview.com/script/D4M8vV79/",
      "featured": false,
      "needsReview": false,
      "ja": "適応的にシグナルを生成する総合シグナルエンジン。",
      "en": "Adaptive signal engine that generates combined entry/exit signals."
    },
    {
      "code": "STRUCTURA Adaptive Price-Action Intelligence",
      "name": "STRUCTURA Adaptive Price-Action Intelligence",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "cyan",
      "tags": [
        "smc",
        "order blocks",
        "fvg",
        "online learning"
      ],
      "boosts": 368,
      "slug": "kbDertHP",
      "url": "https://www.tradingview.com/script/kbDertHP/",
      "featured": false,
      "needsReview": false,
      "ja": "BOS/CHoCH・オーダーブロック・FVGをオンライン学習で信頼度スコア付きで表示するSMCインジケーター。",
      "en": "Detects BOS, CHoCH, order blocks, and fair value gaps from confirmed swings, with online-learned confidence scores per zone type."
    },
    {
      "code": "APEX Swing Engine",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "swing",
        "signals",
        "engine"
      ],
      "boosts": 520,
      "slug": "1ro4FL1E",
      "url": "https://www.tradingview.com/script/1ro4FL1E/",
      "featured": false,
      "needsReview": false,
      "ja": "スイングトレード向けのシグナルを生成するエンジン。",
      "en": "Signal engine geared toward swing-trading setups."
    },
    {
      "code": "NEXUS Consensus Engine",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "cyan",
      "tags": [
        "consensus",
        "cusum",
        "entropy",
        "multi-mechanism"
      ],
      "boosts": 13,
      "slug": "vUFqFhTp",
      "url": "https://www.tradingview.com/script/vUFqFhTp/",
      "featured": false,
      "needsReview": false,
      "ja": "6つの独立メカニズムの多数決でBUY/SELLシグナルを生成するコンセンサスエンジン。",
      "en": "Fires BUY/SELL only when a weighted majority of six mechanisms agree, with conformal prediction and permutation-entropy gates as vetoes."
    },
    {
      "code": "Quantum-Inspired Entanglement Detector",
      "name": "Quantum-Inspired Entanglement Detector",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "quantum-inspired",
        "correlation",
        "regime"
      ],
      "boosts": 7,
      "slug": "SVede4m1",
      "url": "https://www.tradingview.com/script/SVede4m1/",
      "featured": false,
      "needsReview": false,
      "ja": "量子着想の手法で系列間の結合（相関構造）の変化を検出する。",
      "en": "Detects shifts in cross-series coupling using a quantum-inspired method."
    },
    {
      "code": "Evolutionary Strategy Genome",
      "name": "",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "genetic-algorithm",
        "adaptive",
        "multi-factor",
        "meta-learning"
      ],
      "boosts": 26,
      "slug": "uyl8TCov",
      "url": "https://www.tradingview.com/script/uyl8TCov/",
      "featured": false,
      "needsReview": false,
      "ja": "遺伝的アルゴリズムで5つの指標遺伝子の重みを世代ごとに進化させ、最良ゲノムのシグナルを提案する。",
      "en": "Runs a genetic algorithm over a population of strategy genomes encoding weights for five indicator genes, evolving the best-fit strategy each generation."
    },
    {
      "code": "Causal Inference Filter",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "purple",
      "tags": [
        "causal inference",
        "filter",
        "statistics"
      ],
      "boosts": 9,
      "slug": "TuSQjlk8",
      "url": "https://www.tradingview.com/script/TuSQjlk8/",
      "featured": false,
      "needsReview": false,
      "ja": "因果推論でノイズを除去し有意な動きだけを抽出するフィルター。",
      "en": "Filters out noise using causal inference to surface meaningful moves."
    },
    {
      "code": "Portfolio Regime Hedge Optimizer",
      "name": "Portfolio Regime Hedge Optimizer",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "cyan",
      "tags": [
        "correlation",
        "hedge",
        "multi-asset",
        "regime"
      ],
      "boosts": 3,
      "slug": "zsfH83bf",
      "url": "https://www.tradingview.com/script/zsfH83bf/",
      "featured": false,
      "needsReview": false,
      "ja": "最大2つの相関資産との転がり相関を分類し、ヘッジシグナルを生成するマルチアセット体制指標。",
      "en": "Classifies rolling correlation between a main asset and up to two correlated instruments as coupled, decoupled, or inverse, then issues hedge and diversification signals."
    },
    {
      "code": "Hierarchical Temporal Memory Inspired",
      "name": "Hierarchical Temporal Memory Inspired",
      "type": "indicator",
      "cat": "regime",
      "access": "open",
      "color": "purple",
      "tags": [
        "htm",
        "anomaly",
        "sequence"
      ],
      "boosts": 1,
      "slug": "sBoZwZa4",
      "url": "https://www.tradingview.com/script/sBoZwZa4/",
      "featured": false,
      "needsReview": false,
      "ja": "HTM着想の逐次学習で系列の異常・レジーム変化を検出する。",
      "en": "HTM-inspired sequence learning that detects anomalies and regime change."
    },
    {
      "code": "Sentiment-Proxy Correlation Mapper",
      "name": "Sentiment-Proxy Correlation Mapper",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "cyan",
      "tags": [
        "sentiment",
        "correlation",
        "mapping"
      ],
      "boosts": 118,
      "slug": "5ZcJCljV",
      "url": "https://www.tradingview.com/script/5ZcJCljV/",
      "featured": false,
      "needsReview": false,
      "ja": "センチメント代理指標との相関を可視化するマッパー。",
      "en": "Maps correlations against a sentiment-proxy series."
    },
    {
      "code": "Fractal Geometry + Diffusion Predictor",
      "name": "Fractal Geometry + Diffusion Predictor",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "purple",
      "tags": [
        "fractal",
        "diffusion",
        "forecast"
      ],
      "boosts": 7,
      "slug": "gVlgzy4u",
      "url": "https://www.tradingview.com/script/gVlgzy4u/",
      "featured": false,
      "needsReview": false,
      "ja": "フラクタル幾何と拡散モデルで価格経路を予測する。",
      "en": "Predicts price paths using fractal geometry and a diffusion model."
    },
    {
      "code": "Multi-Agent RL Consensus Engine",
      "name": "Multi-Agent RL Consensus Engine",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "reinforcement learning",
        "multi-agent",
        "ensemble"
      ],
      "boosts": 20,
      "slug": "4JKr9kyr",
      "url": "https://www.tradingview.com/script/4JKr9kyr/",
      "featured": false,
      "needsReview": false,
      "ja": "複数の強化学習エージェントの合議で売買する適応型AI戦略。",
      "en": "Adaptive AI strategy trading on a consensus of reinforcement-learning agents."
    },
    {
      "code": "Transformer-Inspired Attention Bias",
      "name": "Transformer-Inspired Attention Bias",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "transformer",
        "attention",
        "bias"
      ],
      "boosts": 8,
      "slug": "Mgb1RIwX",
      "url": "https://www.tradingview.com/script/Mgb1RIwX/",
      "featured": false,
      "needsReview": false,
      "ja": "Transformer着想のアテンションで方向バイアスを推定する。",
      "en": "Estimates directional bias using transformer-inspired attention."
    },
    {
      "code": "Bayesian Neural Market Microstructure",
      "name": "Bayesian Neural Market Microstructure",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "bayesian",
        "forecast",
        "uncertainty",
        "microstructure"
      ],
      "boosts": 10,
      "slug": "F6phg3kx",
      "url": "https://www.tradingview.com/script/F6phg3kx/",
      "featured": false,
      "needsReview": false,
      "ja": "重み摂動サンプリングにより次の価格変動の平均予測と不確実性分布を出力するベイズNNインジケーター。",
      "en": "Generates a mean price forecast and uncertainty bands via weight-perturbation sampling using volume delta, spread, and liquidity proxies as inputs."
    },
    {
      "code": "Self-Evolving RL Dashboard Lite",
      "name": "Self-Evolving RL Dashboard Lite",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "dashboard",
        "reinforcement learning",
        "signals"
      ],
      "boosts": 23,
      "slug": "lqSuqj6n",
      "url": "https://www.tradingview.com/script/lqSuqj6n/",
      "featured": false,
      "needsReview": false,
      "ja": "強化学習ベースの指標を集約する軽量ダッシュボード。",
      "en": "Lightweight dashboard aggregating reinforcement-learning indicators."
    },
    {
      "code": "KNN-Augmented RL Hybrid",
      "name": "",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "cyan",
      "tags": [
        "knn",
        "reinforcement learning",
        "hybrid"
      ],
      "boosts": 7,
      "slug": "c3iMNWNl",
      "url": "https://www.tradingview.com/script/c3iMNWNl/",
      "featured": false,
      "needsReview": false,
      "ja": "KNNと強化学習を組み合わせたハイブリッド予測指標。",
      "en": "Hybrid indicator combining KNN with reinforcement learning."
    },
    {
      "code": "Q-Learning Trendline Drawer",
      "name": "",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "purple",
      "tags": [
        "trendline",
        "q-learning",
        "reinforcement-learning",
        "auto-draw"
      ],
      "boosts": 31,
      "slug": "0potdaSN",
      "url": "https://www.tradingview.com/script/0potdaSN/",
      "featured": false,
      "needsReview": false,
      "ja": "Q学習のベルマン更新で状態を離散化し、サポート・レジスタンスラインを自動描画する。",
      "en": "Tabular Q-learning agent auto-draws support and resistance trendlines; line width, color, and opacity reflect learned Q-values."
    },
    {
      "code": "RainbowDQN Multi-Component",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "cyan",
      "tags": [
        "reinforcement-learning",
        "dqn",
        "signal",
        "multi-component"
      ],
      "boosts": 2,
      "slug": "deHznKCB",
      "url": "https://www.tradingview.com/script/deHznKCB/",
      "featured": false,
      "needsReview": false,
      "ja": "Double・Dueling・優先リプレイの3要素を統合し、単一の方向シグナル矢印を出力するRainbow DQN指標。",
      "en": "Combines Double, Dueling, and Prioritized Replay DQN components into a single directional arrow using composite reward learning."
    },
    {
      "code": "A2C Advantage Critic",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "reinforcement-learning",
        "actor-critic",
        "neural-network",
        "signal-filter"
      ],
      "boosts": 4,
      "slug": "1mRJjXuC",
      "url": "https://www.tradingview.com/script/1mRJjXuC/",
      "featured": false,
      "needsReview": false,
      "ja": "A2C強化学習でアドバンテージA=R+γV(s′)−V(s)が閾値を超えた時のみ売買矢印を出力する指標。",
      "en": "A2C reinforcement learning agent firing directional signals only when |advantage A = R + γV(s′) − V(s)| clears a user-defined gate."
    },
    {
      "code": "PPO Policy Optimizer",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "cyan",
      "tags": [
        "reinforcement learning",
        "ppo",
        "actor-critic",
        "policy gradient"
      ],
      "boosts": 3,
      "slug": "unc8uhcT",
      "url": "https://www.tradingview.com/script/unc8uhcT/",
      "featured": false,
      "needsReview": false,
      "ja": "PPOクリッピングで方策更新を制限し、LONG/SHORT/FLATの確率分布を出力するActor-Criticエージェント。",
      "en": "Actor-Critic agent using PPO clipped objective to output a softmax probability distribution over LONG, SHORT, and FLAT actions."
    },
    {
      "code": "DuelingDQN Breakout Hunter",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "dqn",
        "breakout",
        "reinforcement learning"
      ],
      "boosts": 6,
      "slug": "NeydJUre",
      "url": "https://www.tradingview.com/script/NeydJUre/",
      "featured": false,
      "needsReview": false,
      "ja": "Dueling DQNでブレイクアウトを検出するシグナル指標。",
      "en": "Detects breakouts using a Dueling DQN signal model."
    },
    {
      "code": "AetherEdge Hybrid Quantum-Inspired Predictor",
      "name": "AetherEdge Hybrid Quantum-Inspired Predictor",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "quantum-inspired",
        "predictor",
        "ai"
      ],
      "boosts": 61,
      "slug": "HAy0GeWp",
      "url": "https://www.tradingview.com/script/HAy0GeWp/",
      "featured": false,
      "needsReview": false,
      "ja": "量子着想の予測を組み込んだ適応型AI戦略。",
      "en": "Adaptive AI strategy built on a quantum-inspired predictor."
    },
    {
      "code": "AetherEdge Volatility Regime GAN Simulator",
      "name": "AetherEdge Volatility Regime GAN Simulator",
      "type": "strategy",
      "cat": "volatility",
      "access": "open",
      "color": "purple",
      "tags": [
        "gan",
        "volatility",
        "regime"
      ],
      "boosts": 15,
      "slug": "8AxyBq74",
      "url": "https://www.tradingview.com/script/8AxyBq74/",
      "featured": false,
      "needsReview": false,
      "ja": "GANでボラティリティ・レジームをシミュレートする戦略。",
      "en": "Strategy simulating volatility regimes with a GAN."
    },
    {
      "code": "AetherEdge Multi-Feature Neural Divergence Hunter",
      "name": "AetherEdge Multi-Feature Neural Divergence Hunter",
      "type": "strategy",
      "cat": "momentum",
      "access": "open",
      "color": "cyan",
      "tags": [
        "divergence",
        "neural",
        "momentum"
      ],
      "boosts": 275,
      "slug": "T6EZVEr1",
      "url": "https://www.tradingview.com/script/T6EZVEr1/",
      "featured": false,
      "needsReview": false,
      "ja": "ニューラルで多特徴のダイバージェンスを検出するモメンタム戦略。",
      "en": "Momentum strategy hunting multi-feature divergences with a neural model."
    },
    {
      "code": "AetherEdge RL Signal Optimizer",
      "name": "AetherEdge RL Signal Optimizer",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "purple",
      "tags": [
        "reinforcement-learning",
        "q-learning",
        "adaptive",
        "multi-factor"
      ],
      "boosts": 6,
      "slug": "fC9rkMGH",
      "url": "https://www.tradingview.com/script/fC9rkMGH/",
      "featured": false,
      "needsReview": false,
      "ja": "18状態×3行動のQテーブルをTD(0)法で更新し、ε-greeedyポリシーとMFE/MAE統計でTP/SLを動的調整するストラテジー。",
      "en": "Q-learning agent with an 18-state × 3-action table, ε-greedy decay, and quantile-derived TP/SL from MFE/MAE trade history."
    },
    {
      "code": "AetherEdge SMC AI Confidence Engine",
      "name": "AetherEdge SMC AI Confidence Engine",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "cyan",
      "tags": [
        "smc",
        "confidence",
        "ai"
      ],
      "boosts": 24,
      "slug": "enLmyhYu",
      "url": "https://www.tradingview.com/script/enLmyhYu/",
      "featured": false,
      "needsReview": false,
      "ja": "スマートマネー構造の信頼度をAIで評価するエンジン。",
      "en": "Scores smart-money structure confidence using AI."
    },
    {
      "code": "AetherEdge Adaptive LSTM-inspired Forecaster",
      "name": "AetherEdge Adaptive LSTM-inspired Forecaster",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "purple",
      "tags": [
        "lstm",
        "forecast",
        "ai"
      ],
      "boosts": 36,
      "slug": "j7jW6SCI",
      "url": "https://www.tradingview.com/script/j7jW6SCI/",
      "featured": false,
      "needsReview": false,
      "ja": "LSTM着想の予測で売買する適応型AI戦略。",
      "en": "Adaptive AI strategy trading on an LSTM-inspired forecaster."
    },
    {
      "code": "AetherEdge KNN Regime Classifier",
      "name": "AetherEdge KNN Regime Classifier",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "knn",
        "regime-detection",
        "machine-learning",
        "multi-factor"
      ],
      "boosts": 6,
      "slug": "nLqX6lQy",
      "url": "https://www.tradingview.com/script/nLqX6lQy/",
      "featured": false,
      "needsReview": false,
      "ja": "k-NNで最大2,000パターンを記憶し、8次元特徴量から5種の相場レジームをリアルタイムに多数決分類する。",
      "en": "Implements k-NN with up to 2,000 stored patterns and an 8-feature vector to classify bars into five market regimes via majority or distance-weighted voting."
    },
    {
      "code": "AetherEdge NeuraNet Trend Predictor",
      "name": "AetherEdge NeuraNet Trend Predictor",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "purple",
      "tags": [
        "neural",
        "trend",
        "forecast"
      ],
      "boosts": 15,
      "slug": "Jv7VkxlB",
      "url": "https://www.tradingview.com/script/Jv7VkxlB/",
      "featured": false,
      "needsReview": false,
      "ja": "ニューラルネットでトレンド方向を予測する。",
      "en": "Predicts trend direction with a neural network."
    },
    {
      "code": "All-in-One Dashboard",
      "name": "",
      "type": "strategy",
      "cat": "multi-factor",
      "access": "open",
      "color": "cyan",
      "tags": [
        "dashboard",
        "multi-factor",
        "overview"
      ],
      "boosts": 19,
      "slug": "laG128wU",
      "url": "https://www.tradingview.com/script/laG128wU/",
      "featured": false,
      "needsReview": false,
      "ja": "主要指標を一画面に集約するオールインワン・ダッシュボード。",
      "en": "All-in-one dashboard consolidating key indicators in one view."
    },
    {
      "code": "Liquidity Sweep & Raid Detector",
      "name": "Liquidity Sweep & Raid Detector",
      "type": "strategy",
      "cat": "swing",
      "access": "open",
      "color": "purple",
      "tags": [
        "smart-money",
        "liquidity",
        "stop-hunt",
        "structure"
      ],
      "boosts": 431,
      "slug": "1tgtnjBR",
      "url": "https://www.tradingview.com/script/1tgtnjBR/",
      "featured": false,
      "needsReview": false,
      "ja": "ATRフィルタードピボットでリクイディティスイープと構造破壊を検出するSMC分析ツール。",
      "en": "Detects liquidity sweeps and equal highs/lows via ATR-filtered pivots with three confirmation modes and break-of-structure signals."
    },
    {
      "code": "WaveTrend Oscillator Enhanced",
      "name": "WaveTrend Oscillator Enhanced",
      "type": "strategy",
      "cat": "momentum",
      "access": "open",
      "color": "cyan",
      "tags": [
        "wavetrend",
        "oscillator",
        "momentum"
      ],
      "boosts": 33,
      "slug": "jxd86tft",
      "url": "https://www.tradingview.com/script/jxd86tft/",
      "featured": false,
      "needsReview": false,
      "ja": "改良版WaveTrendオシレーターを用いたモメンタム戦略。",
      "en": "Momentum strategy using an enhanced WaveTrend oscillator."
    },
    {
      "code": "SuperTrend Multi-Factor",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "supertrend",
        "confluence",
        "atr",
        "ema"
      ],
      "boosts": 260,
      "slug": "FHHAvW1O",
      "url": "https://www.tradingview.com/script/FHHAvW1O/",
      "featured": false,
      "needsReview": false,
      "ja": "SuperTrend・EMA・出来高の3要素スコアで売買シグナルを生成し、ATRベースのSL/TPを自動算出する。",
      "en": "Combines SuperTrend direction, EMA filter, and volume threshold into a 3-factor confluence score with ATR-derived SL/TP levels."
    },
    {
      "code": "Volume Profile Session Analyzer",
      "name": "Volume Profile Session Analyzer",
      "type": "indicator",
      "cat": "volume",
      "access": "open",
      "color": "cyan",
      "tags": [
        "VOLUME-PROFILE",
        "SESSION"
      ],
      "boosts": 9,
      "slug": "pt732MUy",
      "url": "https://www.tradingview.com/script/pt732MUy/",
      "featured": false,
      "ja": "セッション単位の出来高プロファイルを動的に構築・延長するアナライザー。",
      "en": "Builds and extends session-anchored volume profiles dynamically."
    },
    {
      "code": "Hull MA Ribbon + Momentum Filter",
      "name": "Hull MA Ribbon + Momentum Filter",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "cyan",
      "tags": [
        "hull ma",
        "ribbon",
        "momentum",
        "rsi+macd"
      ],
      "boosts": 22,
      "slug": "XLCu0n94",
      "url": "https://www.tradingview.com/script/XLCu0n94/",
      "featured": false,
      "needsReview": false,
      "ja": "6本のHMAリボンとRSI+MACDの複合スコアで7段階のモメンタム強度を色分け表示する。",
      "en": "Plots six Hull Moving Average lines as a ribbon colored by a composite RSI+MACD momentum score across seven strength tiers."
    },
    {
      "code": "Order Block + FVG Detector",
      "name": "",
      "type": "strategy",
      "cat": "swing",
      "access": "open",
      "color": "purple",
      "tags": [
        "order-block",
        "fvg",
        "smc",
        "market-structure"
      ],
      "boosts": 22,
      "slug": "FLI6Eyql",
      "url": "https://www.tradingview.com/script/FLI6Eyql/",
      "featured": false,
      "needsReview": false,
      "ja": "BOS起点のオーダーブロックとFVGゾーンを自動検出し、未緩和ゾーンを右側に延長表示するSMC可視化ツール。",
      "en": "Detects BOS-confirmed order blocks and 3-bar fair value gaps, tracks mitigation state, and displays active zones with configurable overlap entry mode."
    },
    {
      "code": "Smart RSI Divergence Hunter",
      "name": "",
      "type": "indicator",
      "cat": "oscillator",
      "access": "open",
      "color": "cyan",
      "tags": [
        "rsi",
        "divergence",
        "price-structure",
        "pivot"
      ],
      "boosts": 541,
      "slug": "mAd4iDWL",
      "url": "https://www.tradingview.com/script/mAd4iDWL/",
      "featured": false,
      "needsReview": false,
      "ja": "RSIの4種類のダイバージェンスを価格構造（HH/HL/LH/LL）およびOB/OSフィルターで検出する。",
      "en": "Detects all four RSI divergence types (regular/hidden bullish/bearish) confirmed by price structure labels and overbought/oversold zones."
    },
    {
      "code": "Volatility Squeeze Breaker",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "squeeze",
        "breakout",
        "volatility"
      ],
      "boosts": 25,
      "slug": "3tR3C2jE",
      "url": "https://www.tradingview.com/script/3tR3C2jE/",
      "featured": false,
      "needsReview": false,
      "ja": "ボラティリティのスクイーズ解放（ブレイク）を検出する。",
      "en": "Detects volatility squeeze releases (breakouts)."
    },
    {
      "code": "Multi-Timeframe Trend Scanner",
      "name": "Multi-Timeframe Trend Scanner",
      "type": "indicator",
      "cat": "mtf",
      "access": "open",
      "color": "cyan",
      "tags": [
        "mtf",
        "trend",
        "ema",
        "adx"
      ],
      "boosts": 178,
      "slug": "uxRRcTtQ",
      "url": "https://www.tradingview.com/script/uxRRcTtQ/",
      "featured": false,
      "needsReview": false,
      "ja": "4時間足でEMA構造・ADX・RSIを集計し、−2〜+2のトレンドスコアとコンセンサス値をテーブル表示するインジケーター。",
      "en": "Scans four user-defined timeframes using EMA structure, ADX strength, and RSI to output a consensus trend score from −2 to +2."
    },
    {
      "code": "AetherEdge Self-Evolving S/R Grid",
      "name": "AetherEdge Self-Evolving S/R Grid",
      "type": "strategy",
      "cat": "mean-reversion",
      "access": "open",
      "color": "purple",
      "tags": [
        "grid",
        "support resistance",
        "mean reversion"
      ],
      "boosts": 4,
      "slug": "xTOZxD7X",
      "url": "https://www.tradingview.com/script/xTOZxD7X/",
      "featured": false,
      "needsReview": false,
      "ja": "自己進化する支持抵抗グリッドで売買する平均回帰戦略。",
      "en": "Mean-reversion strategy trading a self-evolving support/resistance grid."
    },
    {
      "code": "AetherEdge Pattern Recognition Trendline",
      "name": "",
      "type": "library",
      "cat": "utility",
      "access": "open",
      "color": "magenta",
      "tags": [
        "trendline",
        "pattern",
        "library"
      ],
      "boosts": 11,
      "slug": "5QmKn0b2",
      "url": "https://www.tradingview.com/script/5QmKn0b2/",
      "featured": false,
      "needsReview": false,
      "ja": "トレンドライン/パターン認識を提供する再利用ライブラリ。",
      "en": "Reusable library for trendline and pattern recognition."
    },
    {
      "code": "AetherEdge Quantum-Inspired Breakout Scanner",
      "name": "AetherEdge Quantum-Inspired Breakout Scanner",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "cyan",
      "tags": [
        "knn",
        "breakout",
        "probability",
        "pattern-recognition"
      ],
      "boosts": 8,
      "slug": "dLjt3zl2",
      "url": "https://www.tradingview.com/script/dLjt3zl2/",
      "featured": false,
      "needsReview": false,
      "ja": "KNNと6次元特徴ベクトルで過去パターンを照合し、上昇・下降・横ばいの確率をソフトマックスで出力するブレイクアウト検知インジケーター。",
      "en": "Applies KNN lookup across a 6-dimensional feature vector (return, volatility, RSI, momentum, volume, trend) to output softmax Up/Down/Sideways probabilities with ATR-based break confirmation."
    },
    {
      "code": "AetherEdge Liquidity Void Detector",
      "name": "AetherEdge Liquidity Void Detector",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "purple",
      "tags": [
        "smc",
        "liquidity",
        "probability",
        "volume"
      ],
      "boosts": 31,
      "slug": "1qQUsW5r",
      "url": "https://www.tradingview.com/script/1qQUsW5r/",
      "featured": false,
      "needsReview": false,
      "ja": "ウィック反発とATRフィルターで流動性ボイドを検出し、4特徴量シグモイドで充填確率を算出するSMC系インジケーター。",
      "en": "Identifies liquidity voids via wick-rejection sweeps and ATR sizing, then scores each void's fill probability with a 4-feature weighted sigmoid."
    },
    {
      "code": "AetherEdge Regime-Aware Trend Channel",
      "name": "AetherEdge Regime-Aware Trend Channel",
      "type": "strategy",
      "cat": "trend-follow",
      "access": "open",
      "color": "cyan",
      "tags": [
        "regime",
        "trend channel",
        "trend following"
      ],
      "boosts": 49,
      "slug": "a8321Ea4",
      "url": "https://www.tradingview.com/script/a8321Ea4/",
      "featured": false,
      "needsReview": false,
      "ja": "レジームを考慮したトレンドチャネルで順張りする戦略。",
      "en": "Trend-following strategy using a regime-aware trend channel."
    },
    {
      "code": "AetherEdge Adaptive Fibonacci AI",
      "name": "AetherEdge Adaptive Fibonacci AI",
      "type": "indicator",
      "cat": "forecast",
      "access": "open",
      "color": "purple",
      "tags": [
        "fibonacci",
        "adaptive",
        "targets"
      ],
      "boosts": 24,
      "slug": "70PFrCUR",
      "url": "https://www.tradingview.com/script/70PFrCUR/",
      "featured": false,
      "needsReview": false,
      "ja": "AIで適応的にフィボナッチ水準を引き目標を示す。",
      "en": "Adaptively places Fibonacci levels and targets with AI."
    },
    {
      "code": "AetherEdge Neural Order Block Evolution",
      "name": "AetherEdge Neural Order Block Evolution",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "order block",
        "neural",
        "smc"
      ],
      "boosts": 26,
      "slug": "K75NxVvO",
      "url": "https://www.tradingview.com/script/K75NxVvO/",
      "featured": false,
      "needsReview": false,
      "ja": "ニューラルでオーダーブロックを進化的に捉える適応型AI戦略。",
      "en": "Adaptive AI strategy evolving order-block detection with a neural model."
    },
    {
      "code": "AetherEdge KNN Breakout Fortress",
      "name": "AetherEdge KNN Breakout Fortress",
      "type": "strategy",
      "cat": "breakout",
      "access": "open",
      "color": "purple",
      "tags": [
        "knn",
        "breakout"
      ],
      "boosts": 353,
      "slug": "14PzySpq",
      "url": "https://www.tradingview.com/script/14PzySpq/",
      "featured": false,
      "needsReview": false,
      "ja": "KNNでブレイクアウトを選別する順張り戦略。",
      "en": "Breakout strategy filtering entries with KNN."
    },
    {
      "code": "AetherEdge AI Dynamic Trendline Architect",
      "name": "AetherEdge AI Dynamic Trendline Architect",
      "type": "strategy",
      "cat": "trend-follow",
      "access": "open",
      "color": "cyan",
      "tags": [
        "trendline",
        "ai",
        "trend following"
      ],
      "boosts": 352,
      "slug": "E3Yv8XAJ",
      "url": "https://www.tradingview.com/script/E3Yv8XAJ/",
      "featured": false,
      "needsReview": false,
      "ja": "AIが動的にトレンドラインを引く順張り戦略。",
      "en": "Trend-following strategy that draws dynamic trendlines with AI."
    },
    {
      "code": "AetherEdge Hybrid AI Bias",
      "name": "",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "ai",
        "bias",
        "signal"
      ],
      "boosts": 19,
      "slug": "9vS4tTwV",
      "url": "https://www.tradingview.com/script/9vS4tTwV/",
      "featured": false,
      "needsReview": false,
      "ja": "複数手法のハイブリッドAIで方向バイアスを示す。",
      "en": "Shows directional bias from a hybrid AI of multiple methods."
    },
    {
      "code": "AetherEdge Reinforcement Filter MA",
      "name": "AetherEdge Reinforcement Filter MA",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "q-learning",
        "adaptive-ma",
        "volatility",
        "smoothing"
      ],
      "boosts": 6,
      "slug": "VXZQY3M4",
      "url": "https://www.tradingview.com/script/VXZQY3M4/",
      "featured": false,
      "needsReview": false,
      "ja": "Q学習で9状態×5アクションのQテーブルを更新し、平滑化係数を動的に切り替える移動平均戦略。",
      "en": "Moving average strategy that applies Q-learning across a 45-cell Q-table to dynamically select one of five smoothing coefficients based on volatility and trend-strength state."
    },
    {
      "code": "AetherEdge Cluster Probability Line",
      "name": "AetherEdge Cluster Probability Line",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "purple",
      "tags": [
        "k-means",
        "markov",
        "regime",
        "forecast"
      ],
      "boosts": 1,
      "slug": "cyVgZFWP",
      "url": "https://www.tradingview.com/script/cyVgZFWP/",
      "featured": false,
      "needsReview": false,
      "ja": "K-meansで3市場レジームに分類し、マルコフ遷移行列で次状態確率を推定して前方投影する。",
      "en": "Classifies price action into 3 regimes via K-means and estimates next-state probabilities using a Markov-style 3×3 transition matrix."
    },
    {
      "code": "AetherEdge Liquidity AI Sentinel",
      "name": "AetherEdge Liquidity AI Sentinel",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "cyan",
      "tags": [
        "knn",
        "liquidity sweep",
        "reversal",
        "stop hunt"
      ],
      "boosts": 6,
      "slug": "qZBuVb4Q",
      "url": "https://www.tradingview.com/script/qZBuVb4Q/",
      "featured": false,
      "needsReview": false,
      "ja": "KNNを用いてRSI・出来高・ATRの3次元特徴量からスイープ後の反転確率を算出するシグナル指標。",
      "en": "Detects swing-level liquidity sweeps and scores reversal probability via KNN over a stored library of up to 2000 labeled sweep patterns."
    },
    {
      "code": "AetherEdge AI Divergence Ghost",
      "name": "AetherEdge AI Divergence Ghost",
      "type": "indicator",
      "cat": "signal",
      "access": "open",
      "color": "purple",
      "tags": [
        "divergence",
        "multi-oscillator",
        "adaptive-weight",
        "signal"
      ],
      "boosts": 6,
      "slug": "E0nv7SCB",
      "url": "https://www.tradingview.com/script/E0nv7SCB/",
      "featured": false,
      "needsReview": false,
      "ja": "RSI・MACD等5指標をZスコア正規化し相関ベースの適応ウェイトでダイバージェンスを検出する。",
      "en": "Detects regular and hidden divergences by fusing five Z-score-normalized oscillators with correlation-based adaptive weights."
    },
    {
      "code": "AetherEdge Adaptive Super Neural",
      "name": "AetherEdge Adaptive Super Neural",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "cyan",
      "tags": [
        "supertrend",
        "adaptive",
        "atr",
        "epsilon-greedy"
      ],
      "boosts": 3,
      "slug": "14gCSPwL",
      "url": "https://www.tradingview.com/script/14gCSPwL/",
      "featured": false,
      "needsReview": false,
      "ja": "ATR期間×乗数の3×3グリッド（9候補）をε-greedy方式でリアルタイム選択するSuperTrend。",
      "en": "Runs 9 SuperTrend parameter combinations in parallel and selects the highest rolling-reward configuration via ε-greedy logic each bar."
    },
    {
      "code": "AetherEdge KNN Momentum Whisper",
      "name": "",
      "type": "library",
      "cat": "utility",
      "access": "open",
      "color": "emerald",
      "tags": [
        "knn",
        "momentum",
        "library"
      ],
      "boosts": 25,
      "slug": "Ovnj2IxQ",
      "url": "https://www.tradingview.com/script/Ovnj2IxQ/",
      "featured": false,
      "needsReview": false,
      "ja": "KNNによるモメンタム推定を提供する再利用ライブラリ。",
      "en": "Reusable library providing KNN-based momentum estimation."
    },
    {
      "code": "AetherEdge Neural Regime Switch",
      "name": "AetherEdge Neural Regime Switch",
      "type": "strategy",
      "cat": "ai",
      "access": "open",
      "color": "purple",
      "tags": [
        "regime",
        "neural",
        "adaptive"
      ],
      "boosts": 1,
      "slug": "w1QQluia",
      "url": "https://www.tradingview.com/script/w1QQluia/",
      "featured": false,
      "needsReview": false,
      "ja": "ニューラルでレジームを切り替える適応型AI戦略。",
      "en": "Adaptive AI strategy that switches behavior by neural-detected regime."
    },
    {
      "code": "AetherEdge AI Trend Pulse [KNN+NeuraLib]",
      "name": "AetherEdge AI Trend Pulse [KNN+NeuraLib]",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "cyan",
      "tags": [
        "knn",
        "trend",
        "neural"
      ],
      "boosts": 11,
      "slug": "4pdpfBfU",
      "url": "https://www.tradingview.com/script/4pdpfBfU/",
      "featured": false,
      "needsReview": false,
      "ja": "KNNとニューラルでトレンドの勢いを測る。",
      "en": "Gauges trend momentum using KNN and a neural library."
    }
  ]
}/*__DATA_END__*/;
