/* ============================================================
   AetherEdge — Script Catalog Data
   このファイルは tools/sync-tradingview.mjs により自動更新されます。
   ============================================================ */
window.AE_DATA = /*__DATA_START__*/{
  "updated": "2026-10-09T12:42:13.435Z",
  "totalPublished": 48,
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
      "boosts": 9,
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
      "boosts": 5,
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
      "boosts": 6,
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
      "boosts": 10,
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
      "boosts": 7,
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
      "boosts": 3,
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
      "boosts": 6,
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
      "boosts": 24,
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
      "boosts": 641,
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
      "boosts": 11,
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
      "boosts": 41,
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
      "boosts": 17,
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
      "boosts": 14,
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
      "boosts": 14,
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
      "boosts": 524,
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
      "boosts": 5,
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
      "boosts": 11,
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
      "boosts": 24,
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
      "boosts": 35,
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
      "boosts": 28,
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
      "boosts": 14,
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
      "boosts": 57,
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
      "boosts": 45,
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
      "boosts": 25,
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
      "boosts": 11,
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
      "boosts": 14,
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
      "type": "indicator",
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
      "type": "indicator",
      "cat": "ai",
      "access": "open",
      "color": "cyan",
      "tags": [
        "bayesian",
        "changepoint",
        "regime-detection",
        "probabilistic"
      ],
      "boosts": 36,
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
      "boosts": 2,
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
      "boosts": 59,
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
      "boosts": 9,
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
      "boosts": 9,
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
      "boosts": 9,
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
      "boosts": 22,
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
      "boosts": 286,
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
      "type": "indicator",
      "cat": "multi-factor",
      "access": "open",
      "color": "cyan",
      "tags": [
        "consensus",
        "signals",
        "ensemble"
      ],
      "boosts": 19,
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
      "boosts": 94,
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
      "boosts": 20,
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
      "boosts": 9,
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
      "boosts": 367,
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
      "boosts": 25,
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
      "boosts": 31,
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
      "boosts": 31,
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
      "boosts": 49,
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
      "boosts": 17,
      "slug": "lmZhqXEO",
      "url": "https://www.tradingview.com/script/lmZhqXEO/",
      "featured": false,
      "needsReview": false,
      "ja": "5特徴量のソフトマックス加重和を価格帯ごとの水平エネルギーバンドとして描画するヒートマップ。",
      "en": "Plots horizontal price-level energy bands using softmax-weighted combination of momentum, volatility, volume, trend, and RSI, with Bayesian dispersion-based uncertainty shading."
    }
  ]
}/*__DATA_END__*/;
