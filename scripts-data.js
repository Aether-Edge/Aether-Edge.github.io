/* ============================================================
   AetherEdge — Script Catalog Data
   このファイルは tools/sync-tradingview.mjs により自動更新されます。
   ============================================================ */
window.AE_DATA = /*__DATA_START__*/{
  "updated": "2026-06-13T17:16:47.981Z",
  "totalPublished": 98,
  "scripts": [
    {
      "code": "Adaptive Trend Bandit",
      "name": "",
      "type": "indicator",
      "cat": "trend",
      "access": "open",
      "color": "cyan",
      "tags": [
        "K-MEANS",
        "UCB-BANDIT"
      ],
      "boosts": 0,
      "slug": "9tSQp67Y",
      "url": "https://www.tradingview.com/script/9tSQp67Y/",
      "featured": true,
      "ja": "ストリーミングk-meansでボラティリティをクラスタリングし、UCBバンディットがSuperTrend係数を適応選択。",
      "en": "Streaming k-means clusters volatility while a UCB bandit adaptively selects SuperTrend factors."
    },
    {
      "code": "Inefficiency Refill Model",
      "name": "",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "emerald",
      "tags": [
        "LIQUIDITY",
        "SURVIVAL"
      ],
      "boosts": 0,
      "slug": "6ApL5pgy",
      "url": "https://www.tradingview.com/script/6ApL5pgy/",
      "featured": false,
      "ja": "流動性ボイド（非効率）を検出し、学習型リフィル確率と生存時間モデルで「いつ埋まるか」を推定。",
      "en": "Detects liquidity voids and estimates refill probability and timing with a learned survival model."
    },
    {
      "code": "Adaptive MTF Fusion",
      "name": "",
      "type": "indicator",
      "cat": "mtf",
      "access": "open",
      "color": "purple",
      "tags": [
        "MTF",
        "ONLINE-ML"
      ],
      "boosts": 0,
      "slug": "AJmXcJOe",
      "url": "https://www.tradingview.com/script/AJmXcJOe/",
      "featured": false,
      "ja": "複数タイムフレームのモメンタムを融合。TF別の重みをオンライン学習で市場に適応させる。",
      "en": "Fuses momentum across timeframes; per-timeframe weights adapt through online learning."
    },
    {
      "code": "Order Block Quality",
      "name": "",
      "type": "indicator",
      "cat": "smc",
      "access": "open",
      "color": "cyan",
      "tags": [
        "ORDER-BLOCK",
        "SCREENER"
      ],
      "boosts": 0,
      "slug": "VkKnnX2M",
      "url": "https://www.tradingview.com/script/VkKnnX2M/",
      "featured": false,
      "ja": "オーダーブロックの品質をオンラインMLで採点。同一モデルの複数銘柄スクリーナーを同梱。",
      "en": "Scores order-block quality with online ML — and ships a multi-symbol screener built on the same model."
    },
    {
      "code": "Bayesian Level Probabilities",
      "name": "",
      "type": "indicator",
      "cat": "probability",
      "access": "open",
      "color": "emerald",
      "tags": [
        "BAYES",
        "LEVELS"
      ],
      "boosts": 0,
      "slug": "nxv2N5Wm",
      "url": "https://www.tradingview.com/script/nxv2N5Wm/",
      "featured": false,
      "ja": "統計的レベルの保持/ブレイクをBeta-Bernoulliベイズ推定。条件付き確率と信用区間を表示。",
      "en": "Beta-Bernoulli Bayesian estimates of level hold/break — conditional probabilities with credible intervals."
    },
    {
      "code": "Personal WinRate Coach",
      "name": "",
      "type": "indicator",
      "cat": "risk",
      "access": "open",
      "color": "emerald",
      "tags": [
        "SELF-COACH",
        "REGIME"
      ],
      "boosts": 0,
      "slug": "qjPbh7py",
      "url": "https://www.tradingview.com/script/qjPbh7py/",
      "featured": false,
      "ja": "自分のトレード結果を記録し、勝ちやすいレジームを学習してHUDで助言するセルフコーチング・ツール。",
      "en": "Logs your trade outcomes, learns which regimes you win in, and coaches you in the HUD."
    },
    {
      "code": "Volume Profile Session Analyzer",
      "name": "",
      "type": "indicator",
      "cat": "volume",
      "access": "open",
      "color": "cyan",
      "tags": [
        "VOLUME-PROFILE",
        "SESSION"
      ],
      "boosts": 0,
      "slug": "pt732MUy",
      "url": "https://www.tradingview.com/script/pt732MUy/",
      "featured": false,
      "ja": "セッション単位の出来高プロファイルを動的に構築・延長するアナライザー。",
      "en": "Builds and extends session-anchored volume profiles dynamically."
    },
    {
      "code": "TIDE | Flow + RL Oscillator",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 33,
      "slug": "kJ1yvvmI",
      "url": "https://www.tradingview.com/script/kJ1yvvmI/",
      "featured": true,
      "cat": "oscillator",
      "tags": [
        "FLOW",
        "RL"
      ],
      "color": "emerald",
      "ja": "マネーフロー枯渇をRLで検出するオープンソース版オシレーター。AE-TIDEの公開バージョン。",
      "en": "Open-source oscillator detecting money-flow exhaustion with RL. Public version of AE-TIDE."
    },
    {
      "code": "VECTOR | Conformal Forecast",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "M0KTXsDX",
      "url": "https://www.tradingview.com/script/M0KTXsDX/",
      "featured": true,
      "cat": "forecast",
      "tags": [
        "FORECAST",
        "CONFORMAL"
      ],
      "color": "cyan",
      "ja": "コンフォーマル較正による価格予測バンドのオープンソース版。AE-VECTORの公開バージョン。",
      "en": "Open-source conformal prediction band for price forecasting. Public version of AE-VECTOR."
    },
    {
      "code": "HELM | Regime + RL Manager",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "P07r06gT",
      "url": "https://www.tradingview.com/script/P07r06gT/",
      "featured": true,
      "cat": "risk",
      "tags": [
        "REGIME",
        "REINFORCE"
      ],
      "color": "purple",
      "ja": "レジーム分類とREINFORCEによる建玉管理のオープンソース版。AE-HELMの公開バージョン。",
      "en": "Open-source regime classification and REINFORCE position management. Public version of AE-HELM."
    },
    {
      "code": "KALMAN | State-Space Trend",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "1coOxasg",
      "url": "https://www.tradingview.com/script/1coOxasg/",
      "featured": true,
      "cat": "trend",
      "tags": [
        "KALMAN",
        "STATE-SPACE"
      ],
      "color": "cyan",
      "ja": "カルマンフィルタによるノイズ除去トレンドのオープンソース版。AE-KALMANの公開バージョン。",
      "en": "Open-source Kalman filter noise-separated trend. Public version of AE-KALMAN."
    },
    {
      "code": "STRATA | SMC + ML/RL",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "oxGH5tac",
      "url": "https://www.tradingview.com/script/oxGH5tac/",
      "featured": true,
      "cat": "smc",
      "tags": [
        "SMC",
        "ML/RL"
      ],
      "color": "magenta",
      "ja": "SMC構造検出にML/RLを統合したオープンソース版。AE-STRATAの公開バージョン。",
      "en": "Open-source SMC structure detection with ML/RL integration. Public version of AE-STRATA."
    },
    {
      "code": "Self-Attention Focus",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "hAUvPolk",
      "url": "https://www.tradingview.com/script/hAUvPolk/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "SELF-ATTENTION",
        "TRANSFORMER"
      ],
      "color": "cyan",
      "ja": "Transformer的自己注意機構でチャートの重要領域を自動フォーカスするシグナルインジケーター。",
      "en": "Self-attention mechanism focuses on important chart regions automatically, inspired by Transformer architecture."
    },
    {
      "code": "Particle Swarm Filter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "fBAL7mVM",
      "url": "https://www.tradingview.com/script/fBAL7mVM/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "PSO",
        "FILTER"
      ],
      "color": "purple",
      "ja": "粒子群最適化（PSO）アルゴリズムで動的にパラメータを調整するトレンドフィルター。",
      "en": "Trend filter that dynamically adjusts parameters using Particle Swarm Optimization."
    },
    {
      "code": "Gaussian Process Bands",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "HquVbrsO",
      "url": "https://www.tradingview.com/script/HquVbrsO/",
      "featured": false,
      "cat": "forecast",
      "tags": [
        "GAUSSIAN-PROCESS",
        "BANDS"
      ],
      "color": "cyan",
      "ja": "ガウス過程回帰による確率的予測バンド。信頼区間付きの価格レンジを動的に描画。",
      "en": "Probabilistic prediction bands via Gaussian Process Regression with dynamic confidence intervals."
    },
    {
      "code": "Hidden Markov Regime",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "9fBuHHkN",
      "url": "https://www.tradingview.com/script/9fBuHHkN/",
      "featured": false,
      "cat": "regime",
      "tags": [
        "HMM",
        "REGIME"
      ],
      "color": "purple",
      "ja": "隠れマルコフモデル（HMM）で市場レジームを確率的に分類し、状態遷移を可視化。",
      "en": "Hidden Markov Model probabilistically classifies market regimes and visualises state transitions."
    },
    {
      "code": "Bayesian Changepoint Shift",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "LTu6zkQ5",
      "url": "https://www.tradingview.com/script/LTu6zkQ5/",
      "featured": false,
      "cat": "regime",
      "tags": [
        "BAYESIAN",
        "CHANGEPOINT"
      ],
      "color": "cyan",
      "ja": "ベイズ変化点検出でトレンド・ボラティリティの構造変化をリアルタイムに検出。",
      "en": "Real-time structural break detection for trend and volatility using Bayesian changepoint analysis."
    },
    {
      "code": "Wavelet Multi-Resolution",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "tpwjfK1P",
      "url": "https://www.tradingview.com/script/tpwjfK1P/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "WAVELET",
        "MULTI-RES"
      ],
      "color": "purple",
      "ja": "ウェーブレット変換による多解像度分析で、複数スケールのサイクルとノイズを分離。",
      "en": "Multi-resolution wavelet analysis separating cycles and noise across multiple time scales."
    },
    {
      "code": "Autoencoder Anomaly",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "psorYWV3",
      "url": "https://www.tradingview.com/script/psorYWV3/",
      "featured": false,
      "cat": "regime",
      "tags": [
        "AUTOENCODER",
        "ANOMALY"
      ],
      "color": "cyan",
      "ja": "オートエンコーダの再構成誤差で市場異常を検知。通常パターンからの逸脱をスコアリング。",
      "en": "Detects market anomalies via autoencoder reconstruction error, scoring deviation from normal patterns."
    },
    {
      "code": "Multi-Armed Bandit",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "WbBroPO3",
      "url": "https://www.tradingview.com/script/WbBroPO3/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "BANDIT",
        "RL"
      ],
      "color": "purple",
      "ja": "多腕バンディットで複数の取引シグナルを探索・活用のバランスをとるRL戦略。",
      "en": "RL strategy balancing exploration and exploitation of multiple trading signals via multi-armed bandit."
    },
    {
      "code": "Bayesian Changepoint Detection",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "HxBDk9yC",
      "url": "https://www.tradingview.com/script/HxBDk9yC/",
      "featured": false,
      "cat": "mean-reversion",
      "tags": [
        "BAYESIAN",
        "CHANGEPOINT"
      ],
      "color": "cyan",
      "ja": "ベイズ変化点検出に基づく平均回帰戦略。レジーム転換点でのリバーサルを自動エントリー。",
      "en": "Mean-reversion strategy based on Bayesian changepoint detection, entering reversals at regime shifts."
    },
    {
      "code": "Principal Component Analysis",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "glhV5HTd",
      "url": "https://www.tradingview.com/script/glhV5HTd/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "PCA",
        "DIMENSIONALITY"
      ],
      "color": "purple",
      "ja": "主成分分析（PCA）で複数指標の主要成分を抽出し、ノイズを除去した複合シグナルを生成。",
      "en": "Extracts principal components from multiple indicators via PCA to generate a noise-filtered composite signal."
    },
    {
      "code": "Spectral Cycle Engine",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "FJu1N0Pe",
      "url": "https://www.tradingview.com/script/FJu1N0Pe/",
      "featured": false,
      "cat": "oscillator",
      "tags": [
        "SPECTRAL",
        "FFT"
      ],
      "color": "cyan",
      "ja": "スペクトル解析（FFT）で価格サイクルの周波数成分を分析し、優勢なサイクルを検出。",
      "en": "Analyses price cycle frequency components via FFT spectral analysis to detect dominant cycles."
    },
    {
      "code": "Kalman State Filter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "aIi6k14x",
      "url": "https://www.tradingview.com/script/aIi6k14x/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "KALMAN",
        "FILTER"
      ],
      "color": "purple",
      "ja": "カルマン状態推定フィルターによる価格ノイズ除去。スムーズなトレンドラインを動的に生成。",
      "en": "Kalman state-estimation filter removes price noise and dynamically generates smooth trend lines."
    },
    {
      "code": "Gaussian Mixture Regimes",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "DS6facyY",
      "url": "https://www.tradingview.com/script/DS6facyY/",
      "featured": false,
      "cat": "regime",
      "tags": [
        "GMM",
        "CLUSTERING"
      ],
      "color": "cyan",
      "ja": "ガウス混合モデル（GMM）で市場状態を複数クラスタに分類し、レジームを確率分布で表現。",
      "en": "Classifies market states into clusters via Gaussian Mixture Models, expressing regimes as probability distributions."
    },
    {
      "code": "Q-Learning Regime Agent",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "j6hnLjfP",
      "url": "https://www.tradingview.com/script/j6hnLjfP/",
      "featured": false,
      "cat": "regime",
      "tags": [
        "Q-LEARNING",
        "AGENT"
      ],
      "color": "purple",
      "ja": "Q学習エージェントがリアルタイムに市場レジームを分類し、最適な状態-行動マッピングを学習。",
      "en": "Q-learning agent classifies market regimes in real time, learning optimal state-action mappings online."
    },
    {
      "code": "Echo State Network",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "r6yBrWvn",
      "url": "https://www.tradingview.com/script/r6yBrWvn/",
      "featured": false,
      "cat": "forecast",
      "tags": [
        "ESN",
        "RESERVOIR"
      ],
      "color": "cyan",
      "ja": "エコー状態ネットワーク（リザーバーコンピューティング）による時系列予測。非線形ダイナミクスを捕捉。",
      "en": "Time-series forecasting via Echo State Network (reservoir computing), capturing nonlinear market dynamics."
    },
    {
      "code": "Triaxial Consensus Strategy",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "DZ81TJie",
      "url": "https://www.tradingview.com/script/DZ81TJie/",
      "featured": false,
      "cat": "multi-factor",
      "tags": [
        "CONSENSUS",
        "TRIAXIAL"
      ],
      "color": "purple",
      "ja": "3軸（トレンド・モメンタム・ボラティリティ）コンセンサスに基づくマルチファクター戦略。",
      "en": "Multi-factor strategy based on triaxial consensus across trend, momentum and volatility signals."
    },
    {
      "code": "Triaxial Consensus Signals",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "XWsPoosv",
      "url": "https://www.tradingview.com/script/XWsPoosv/",
      "featured": false,
      "cat": "multi-factor",
      "tags": [
        "CONSENSUS",
        "SIGNALS"
      ],
      "color": "cyan",
      "ja": "3軸コンセンサスシグナルの特化バージョン。エントリー・エグジット条件を詳細出力。",
      "en": "Signal-focused variant of triaxial consensus with detailed entry and exit condition outputs."
    },
    {
      "code": "Consensus Council",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "mOnZQiRJ",
      "url": "https://www.tradingview.com/script/mOnZQiRJ/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "COUNCIL",
        "ENSEMBLE"
      ],
      "color": "purple",
      "ja": "複数の独立したエキスパートが合議制でシグナルを出力するアンサンブル型シグナルエンジン。",
      "en": "Ensemble signal engine where multiple independent experts vote to produce consensus-based signals."
    },
    {
      "code": "Mini Multi-Agent Consensus",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "RUjkjw2x",
      "url": "https://www.tradingview.com/script/RUjkjw2x/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "MULTI-AGENT",
        "CONSENSUS"
      ],
      "color": "cyan",
      "ja": "軽量マルチエージェントコンセンサス。複数サブエージェントの多数決でシグナルを生成。",
      "en": "Lightweight multi-agent consensus system generating signals via majority vote among sub-agents."
    },
    {
      "code": "Adaptive Volume Surge Detector",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "dcNqtPeI",
      "url": "https://www.tradingview.com/script/dcNqtPeI/",
      "featured": false,
      "cat": "volume",
      "tags": [
        "VOLUME",
        "ADAPTIVE"
      ],
      "color": "purple",
      "ja": "出来高サージをアダプティブ閾値で検出する適応型出来高急増検出インジケーター。",
      "en": "Detects volume surges with adaptive thresholds for dynamic anomalous volume alerts."
    },
    {
      "code": "Pattern Probability Scanner",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "srmaIJLG",
      "url": "https://www.tradingview.com/script/srmaIJLG/",
      "featured": false,
      "cat": "probability",
      "tags": [
        "PATTERN",
        "PROBABILITY"
      ],
      "color": "cyan",
      "ja": "過去パターンとの類似度から将来の価格パターン発生確率をスキャンするスキャナー。",
      "en": "Probability scanner estimating future price pattern occurrence by similarity to historical patterns."
    },
    {
      "code": "RL Momentum Filter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "Ri3VZ3lS",
      "url": "https://www.tradingview.com/script/Ri3VZ3lS/",
      "featured": false,
      "cat": "oscillator",
      "tags": [
        "RL",
        "MOMENTUM"
      ],
      "color": "purple",
      "ja": "RLがモメンタムシグナルのフィルタリング閾値をオンラインで調整する適応型モメンタムフィルター。",
      "en": "Adaptive momentum filter where RL adjusts filtering thresholds for momentum signals online."
    },
    {
      "code": "Self-Evolving S/R",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "SHEsL83I",
      "url": "https://www.tradingview.com/script/SHEsL83I/",
      "featured": false,
      "cat": "smc",
      "tags": [
        "S/R",
        "ADAPTIVE"
      ],
      "color": "cyan",
      "ja": "市場の価格行動に合わせて自動進化するサポート・レジスタンスグリッド。機械学習で動的更新。",
      "en": "Support/resistance grid that self-evolves with price action, updated via machine learning."
    },
    {
      "code": "OneButton Trend Master",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "iMUZhIc3",
      "url": "https://www.tradingview.com/script/iMUZhIc3/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "TREND",
        "SIMPLIFIED"
      ],
      "color": "purple",
      "ja": "ワンボタン操作でトレンド方向を判定するシンプルなトレンドマスター。初心者向け設計。",
      "en": "Simple one-button trend direction indicator designed for beginner-friendly ease of use."
    },
    {
      "code": "Adaptive Smart RSI",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "KAaTOG7D",
      "url": "https://www.tradingview.com/script/KAaTOG7D/",
      "featured": false,
      "cat": "oscillator",
      "tags": [
        "RSI",
        "ADAPTIVE"
      ],
      "color": "cyan",
      "ja": "市場ボラティリティと相場環境に応じてパラメータを自動調整するアダプティブRSI。",
      "en": "RSI that automatically adjusts parameters to market volatility and regime conditions."
    },
    {
      "code": "Hypercube Heatmap (Horizon Field)",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "lmZhqXEO",
      "url": "https://www.tradingview.com/script/lmZhqXEO/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "HEATMAP",
        "HORIZON"
      ],
      "color": "purple",
      "ja": "多次元の価格・出来高・モメンタムデータをホライズンフィールドとしてヒートマップ可視化。",
      "en": "Visualises multi-dimensional price, volume and momentum data as a horizon-field heatmap."
    },
    {
      "code": "Adaptive Liquidation Heatmap",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "2WzPEzZ4",
      "url": "https://www.tradingview.com/script/2WzPEzZ4/",
      "featured": false,
      "cat": "volume",
      "tags": [
        "LIQUIDATION",
        "HEATMAP"
      ],
      "color": "cyan",
      "ja": "推定清算レベルをヒートマップで表示。価格が清算ゾーンに近づくとアラートを発火。",
      "en": "Displays estimated liquidation levels as a heatmap and alerts when price approaches liquidation zones."
    },
    {
      "code": "Contrastive Similarity Engine",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "bnyetf49",
      "url": "https://www.tradingview.com/script/bnyetf49/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "CONTRASTIVE",
        "SIMILARITY"
      ],
      "color": "purple",
      "ja": "対照学習で現在の価格パターンと過去の類似パターンを照合するコントラスティブ類似エンジン。",
      "en": "Engine matching current price patterns to historical patterns via contrastive learning similarity."
    },
    {
      "code": "Generative Flow Synthesizer",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "vb4Mne7r",
      "url": "https://www.tradingview.com/script/vb4Mne7r/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "GENERATIVE",
        "FLOW"
      ],
      "color": "cyan",
      "ja": "生成モデルで資金フローの潜在パターンを合成し、将来のフロー方向を推定する。",
      "en": "Synthesises latent money-flow patterns with a generative model to estimate future flow direction."
    },
    {
      "code": "PULSE Adaptive Signal Intelligence",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "D4M8vV79",
      "url": "https://www.tradingview.com/script/D4M8vV79/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "PULSE",
        "ADAPTIVE"
      ],
      "color": "purple",
      "ja": "複数シグナル源を適応的に統合するPULSEエンジン。市場状態に応じてシグナル重みを動的調整。",
      "en": "PULSE engine adaptively integrating multiple signal sources, dynamically adjusting weights to market state."
    },
    {
      "code": "STRUCTURA Adaptive Price-Action Intelligence",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "kbDertHP",
      "url": "https://www.tradingview.com/script/kbDertHP/",
      "featured": false,
      "cat": "smc",
      "tags": [
        "PRICE-ACTION",
        "ADAPTIVE"
      ],
      "color": "cyan",
      "ja": "SMC的な価格行動構造をML/AIで適応的に分析するSTRUCTURAエンジン。",
      "en": "STRUCTURA engine adaptively analysing SMC-like price action structures with ML/AI."
    },
    {
      "code": "APEX Swing Engine",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "1ro4FL1E",
      "url": "https://www.tradingview.com/script/1ro4FL1E/",
      "featured": false,
      "cat": "smc",
      "tags": [
        "SWING",
        "APEX"
      ],
      "color": "purple",
      "ja": "スウィングポイントを精密に検出し、主要なプライスアクション構造を自動マーキングするAPEXエンジン。",
      "en": "APEX engine precisely detecting swing points and auto-marking key price action structures."
    },
    {
      "code": "NEXUS Consensus Engine",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "vUFqFhTp",
      "url": "https://www.tradingview.com/script/vUFqFhTp/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "NEXUS",
        "CONSENSUS"
      ],
      "color": "cyan",
      "ja": "複数サブエンジンのアウトプットをNEXUSコンセンサスフレームワークで統合する多数決型シグナルエンジン。",
      "en": "NEXUS consensus framework integrating outputs from multiple sub-engines via majority vote."
    },
    {
      "code": "Quantum-Inspired Entanglement Detector",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "SVede4m1",
      "url": "https://www.tradingview.com/script/SVede4m1/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "QUANTUM",
        "CORRELATION"
      ],
      "color": "purple",
      "ja": "量子もつれ概念にインスパイアされた非線形相関検出器。市場間の隠れた依存関係を可視化。",
      "en": "Nonlinear correlation detector inspired by quantum entanglement, visualising hidden market dependencies."
    },
    {
      "code": "Evolutionary Strategy Genome",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "uyl8TCov",
      "url": "https://www.tradingview.com/script/uyl8TCov/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "EVOLUTIONARY",
        "GENOME"
      ],
      "color": "cyan",
      "ja": "遺伝的アルゴリズム（ゲノム進化）で戦略パラメータを自動最適化する進化型戦略。",
      "en": "Evolutionary strategy auto-optimising parameters via genetic algorithms (genome evolution)."
    },
    {
      "code": "Causal Inference Filter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "TuSQjlk8",
      "url": "https://www.tradingview.com/script/TuSQjlk8/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "CAUSAL",
        "INFERENCE"
      ],
      "color": "purple",
      "ja": "因果推論フレームワークで価格変動の真の原因変数を特定し、ノイズとシグナルを分離。",
      "en": "Identifies true causal drivers of price movement via causal inference, separating noise from signal."
    },
    {
      "code": "Portfolio Regime Hedge Optimizer",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "zsfH83bf",
      "url": "https://www.tradingview.com/script/zsfH83bf/",
      "featured": false,
      "cat": "risk",
      "tags": [
        "PORTFOLIO",
        "HEDGE"
      ],
      "color": "cyan",
      "ja": "レジームに応じたポートフォリオヘッジ比率を最適化するリスク管理インジケーター。",
      "en": "Risk management indicator optimising portfolio hedge ratios according to current market regime."
    },
    {
      "code": "Hierarchical Temporal Memory Inspired",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "sBoZwZa4",
      "url": "https://www.tradingview.com/script/sBoZwZa4/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "HTM",
        "TEMPORAL"
      ],
      "color": "purple",
      "ja": "階層型時間記憶（HTM）にインスパイアされた時系列パターン認識と予測インジケーター。",
      "en": "Sequence pattern recognition and forecasting inspired by Hierarchical Temporal Memory (HTM)."
    },
    {
      "code": "Sentiment-Proxy Correlation Mapper",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "5ZcJCljV",
      "url": "https://www.tradingview.com/script/5ZcJCljV/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "SENTIMENT",
        "CORRELATION"
      ],
      "color": "cyan",
      "ja": "センチメントプロキシと価格の相関を動的にマッピングするコリレーションマッパー。",
      "en": "Dynamic mapping of correlations between sentiment proxies and price movements."
    },
    {
      "code": "Fractal Geometry + Diffusion Predictor",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "gVlgzy4u",
      "url": "https://www.tradingview.com/script/gVlgzy4u/",
      "featured": false,
      "cat": "forecast",
      "tags": [
        "FRACTAL",
        "DIFFUSION"
      ],
      "color": "purple",
      "ja": "フラクタル幾何学と拡散過程モデルを組み合わせた価格予測インジケーター。長期記憶を捕捉。",
      "en": "Price predictor combining fractal geometry with diffusion process models to capture long-range memory."
    },
    {
      "code": "Multi-Agent RL Consensus Engine",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "4JKr9kyr",
      "url": "https://www.tradingview.com/script/4JKr9kyr/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "MULTI-AGENT",
        "RL"
      ],
      "color": "cyan",
      "ja": "複数のRLエージェントがコンセンサスを形成して売買判断を下すマルチエージェントRL戦略。",
      "en": "Multi-agent RL strategy where multiple agents form consensus for trading decisions."
    },
    {
      "code": "Transformer-Inspired Attention Bias",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "Mgb1RIwX",
      "url": "https://www.tradingview.com/script/Mgb1RIwX/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "TRANSFORMER",
        "ATTENTION"
      ],
      "color": "purple",
      "ja": "Transformerの注意機構にインスパイアされた価格バイアス検出器。重要な過去バーに注目を集中。",
      "en": "Price bias detector inspired by Transformer attention, focusing on historically significant bars."
    },
    {
      "code": "Bayesian Neural Market Microstructure",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "F6phg3kx",
      "url": "https://www.tradingview.com/script/F6phg3kx/",
      "featured": false,
      "cat": "probability",
      "tags": [
        "BAYESIAN",
        "MICROSTRUCTURE"
      ],
      "color": "cyan",
      "ja": "ベイズニューラルネットワークで市場マイクロ構造から確率を推定するインジケーター。",
      "en": "Bayesian neural network inferring probabilities from market microstructure (spread, order flow)."
    },
    {
      "code": "Self-Evolving RL Dashboard Lite",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "lqSuqj6n",
      "url": "https://www.tradingview.com/script/lqSuqj6n/",
      "featured": false,
      "cat": "risk",
      "tags": [
        "RL",
        "DASHBOARD"
      ],
      "color": "purple",
      "ja": "RLベースのリスク管理指標を一画面に集約したセルフエボルビング型ダッシュボードのLite版。",
      "en": "Lite dashboard aggregating RL-based risk metrics in one view, self-evolving to current conditions."
    },
    {
      "code": "KNN-Augmented RL Hybrid",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "c3iMNWNl",
      "url": "https://www.tradingview.com/script/c3iMNWNl/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "KNN",
        "RL"
      ],
      "color": "cyan",
      "ja": "k近傍法（KNN）と強化学習を組み合わせたハイブリッドシグナル生成器。",
      "en": "Hybrid signal generator combining k-nearest neighbours with RL for approximate state representation."
    },
    {
      "code": "Q-Learning Trendline Drawer",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "0potdaSN",
      "url": "https://www.tradingview.com/script/0potdaSN/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "Q-LEARNING",
        "TRENDLINE"
      ],
      "color": "purple",
      "ja": "Q学習エージェントがトレンドラインの最適な描画角度と水準を自律的に決定する。",
      "en": "Q-learning agent autonomously determines optimal trendline angles and levels."
    },
    {
      "code": "RainbowDQN Multi-Component",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "deHznKCB",
      "url": "https://www.tradingview.com/script/deHznKCB/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "RAINBOW-DQN",
        "MULTI"
      ],
      "color": "cyan",
      "ja": "Rainbow DQNの複数コンポーネントを組み合わせた高度な深層RLシグナル。",
      "en": "Advanced deep-RL signal combining multiple Rainbow DQN components (dueling, noisy, distributional)."
    },
    {
      "code": "A2C Advantage Critic",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "1mRJjXuC",
      "url": "https://www.tradingview.com/script/1mRJjXuC/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "A2C",
        "ACTOR-CRITIC"
      ],
      "color": "purple",
      "ja": "A2C（アドバンテージAC）アーキテクチャによる価値ベースのシグナル生成インジケーター。",
      "en": "Value-based signal indicator using A2C (Advantage Actor-Critic) architecture."
    },
    {
      "code": "PPO Policy Optimizer",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "unc8uhcT",
      "url": "https://www.tradingview.com/script/unc8uhcT/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "PPO",
        "POLICY"
      ],
      "color": "cyan",
      "ja": "PPO（近接方策最適化）によるポリシー勾配ベースのシグナル最適化インジケーター。",
      "en": "Policy-gradient signal optimiser using Proximal Policy Optimization (PPO)."
    },
    {
      "code": "DuelingDQN Breakout Hunter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "NeydJUre",
      "url": "https://www.tradingview.com/script/NeydJUre/",
      "featured": false,
      "cat": "probability",
      "tags": [
        "DUELING-DQN",
        "BREAKOUT"
      ],
      "color": "purple",
      "ja": "Dueling DQNでブレイクアウトの状態価値と行動価値を分離して成功確率を推定。",
      "en": "Dueling DQN separately estimating state-value and action-value for breakout success probability."
    },
    {
      "code": "Hybrid Quantum-Inspired Predictor",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "HAy0GeWp",
      "url": "https://www.tradingview.com/script/HAy0GeWp/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "QUANTUM",
        "PREDICTOR"
      ],
      "color": "cyan",
      "ja": "量子インスパイアード計算と古典的MLを組み合わせたハイブリッド予測型RL戦略。",
      "en": "Hybrid predictive RL strategy combining quantum-inspired computation with classical ML."
    },
    {
      "code": "Volatility Regime GAN Simulator",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "8AxyBq74",
      "url": "https://www.tradingview.com/script/8AxyBq74/",
      "featured": false,
      "cat": "volatility",
      "tags": [
        "GAN",
        "VOLATILITY"
      ],
      "color": "purple",
      "ja": "GANシミュレーターでボラティリティレジームを生成し、現相場との一致度を評価するRL戦略。",
      "en": "RL strategy generating volatility regime scenarios via GAN simulation and comparing against live market."
    },
    {
      "code": "Multi-Feature Neural Divergence Hunter",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "T6EZVEr1",
      "url": "https://www.tradingview.com/script/T6EZVEr1/",
      "featured": false,
      "cat": "momentum",
      "tags": [
        "NEURAL",
        "DIVERGENCE"
      ],
      "color": "cyan",
      "ja": "ニューラルネットワークで複数フィーチャーのダイバージェンスを同時検出するモメンタム型戦略。",
      "en": "Momentum strategy detecting multi-feature divergences simultaneously with a neural network."
    },
    {
      "code": "RL Signal Optimizer",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "fC9rkMGH",
      "url": "https://www.tradingview.com/script/fC9rkMGH/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "RL",
        "OPTIMIZER"
      ],
      "color": "purple",
      "ja": "RLでシグナルの品質・タイミング・フィルタリングをリアルタイム最適化するRL戦略。",
      "en": "RL strategy optimising signal quality, timing and filtering in real time."
    },
    {
      "code": "SMC AI Confidence Engine",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "enLmyhYu",
      "url": "https://www.tradingview.com/script/enLmyhYu/",
      "featured": false,
      "cat": "smc",
      "tags": [
        "SMC",
        "AI-CONFIDENCE"
      ],
      "color": "cyan",
      "ja": "SMCの構造分析（オーダーブロック・FVG・スウィング）にAI信頼度スコアを付与するエンジン。",
      "en": "Engine assigning AI confidence scores to SMC structural analysis (order blocks, FVGs, swings)."
    },
    {
      "code": "Adaptive LSTM-inspired Forecaster",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "j7jW6SCI",
      "url": "https://www.tradingview.com/script/j7jW6SCI/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "LSTM",
        "FORECASTER"
      ],
      "color": "purple",
      "ja": "LSTMにインスパイアされたシーケンシャルな価格予測型RL戦略。長期時系列依存を捕捉。",
      "en": "Sequential price-forecasting RL strategy inspired by LSTM, capturing long-range temporal dependencies."
    },
    {
      "code": "KNN Regime Classifier",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "nLqX6lQy",
      "url": "https://www.tradingview.com/script/nLqX6lQy/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "KNN",
        "REGIME"
      ],
      "color": "cyan",
      "ja": "KNNで市場レジームを分類し、レジームに最適化したパラメータセットを選択するRL戦略。",
      "en": "RL strategy classifying market regimes via KNN and selecting regime-optimised parameter sets."
    },
    {
      "code": "NeuraNet Trend Predictor",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "Jv7VkxlB",
      "url": "https://www.tradingview.com/script/Jv7VkxlB/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "NEURANET",
        "TREND"
      ],
      "color": "purple",
      "ja": "NeuraLibフレームワークベースのニューラルネットワーク型トレンド予測インジケーター。",
      "en": "Neural network trend predictor built on the NeuraLib framework."
    },
    {
      "code": "All-in-One Dashboard",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "laG128wU",
      "url": "https://www.tradingview.com/script/laG128wU/",
      "featured": false,
      "cat": "multi-factor",
      "tags": [
        "DASHBOARD",
        "ALL-IN-ONE"
      ],
      "color": "cyan",
      "ja": "複数のシグナル・レジーム・リスク指標を1画面に集約したオールインワンダッシュボード戦略。",
      "en": "All-in-one dashboard strategy aggregating multiple signals, regime and risk metrics in one view."
    },
    {
      "code": "Liquidity Sweep & Raid Detector",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "1tgtnjBR",
      "url": "https://www.tradingview.com/script/1tgtnjBR/",
      "featured": false,
      "cat": "breakout",
      "tags": [
        "LIQUIDITY",
        "SWEEP"
      ],
      "color": "purple",
      "ja": "流動性スウィープとレイドを検出してブレイクアウトエントリーを狙うSMC型戦略。",
      "en": "SMC-based strategy detecting liquidity sweeps and raids to enter breakout moves."
    },
    {
      "code": "WaveTrend Oscillator Enhanced",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "jxd86tft",
      "url": "https://www.tradingview.com/script/jxd86tft/",
      "featured": false,
      "cat": "momentum",
      "tags": [
        "WAVETREND",
        "ENHANCED"
      ],
      "color": "cyan",
      "ja": "WaveTrendオシレーターを拡張したモメンタム戦略。トレンドフィルターと動的閾値を追加。",
      "en": "Enhanced WaveTrend oscillator strategy with added trend filter and dynamic thresholds."
    },
    {
      "code": "SuperTrend Multi-Factor",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "FHHAvW1O",
      "url": "https://www.tradingview.com/script/FHHAvW1O/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "SUPERTREND",
        "MULTI-FACTOR"
      ],
      "color": "purple",
      "ja": "ATR・ボラティリティ・レジームなど複数ファクターでSuperTrendのパラメータを適応選択。",
      "en": "Indicator adaptively selecting SuperTrend parameters using multiple factors: ATR, volatility, regime."
    },
    {
      "code": "Hull MA Ribbon + Momentum Filter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "XLCu0n94",
      "url": "https://www.tradingview.com/script/XLCu0n94/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "HULL-MA",
        "MOMENTUM"
      ],
      "color": "cyan",
      "ja": "Hull MAリボンにモメンタムフィルターを組み合わせたクロスシグナル型トレンドインジケーター。",
      "en": "Hull MA ribbon combined with a momentum filter for cross-signal-based trend indication."
    },
    {
      "code": "Order Block + FVG Detector",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "FLI6Eyql",
      "url": "https://www.tradingview.com/script/FLI6Eyql/",
      "featured": false,
      "cat": "breakout",
      "tags": [
        "ORDER-BLOCK",
        "FVG"
      ],
      "color": "purple",
      "ja": "オーダーブロックとFVGの合流点でブレイクアウトエントリーするSMC型戦略。",
      "en": "SMC strategy entering breakouts at the confluence of order blocks and Fair Value Gaps."
    },
    {
      "code": "Smart RSI Divergence Hunter",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "mAd4iDWL",
      "url": "https://www.tradingview.com/script/mAd4iDWL/",
      "featured": false,
      "cat": "oscillator",
      "tags": [
        "RSI",
        "DIVERGENCE"
      ],
      "color": "cyan",
      "ja": "スマートアルゴリズムでRSIダイバージェンスを自動検出。複数種類を同時スキャン。",
      "en": "Smart algorithm auto-detecting RSI divergences, simultaneously scanning for multiple divergence types."
    },
    {
      "code": "Volatility Squeeze Breaker",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "3tR3C2jE",
      "url": "https://www.tradingview.com/script/3tR3C2jE/",
      "featured": false,
      "cat": "oscillator",
      "tags": [
        "VOLATILITY",
        "SQUEEZE"
      ],
      "color": "purple",
      "ja": "ボラティリティの収縮（スクイーズ）を検出し、ブレイク方向と強度を予測するオシレーター。",
      "en": "Oscillator detecting volatility squeezes and predicting breakout direction and strength."
    },
    {
      "code": "Multi-Timeframe Trend Scanner",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "uxRRcTtQ",
      "url": "https://www.tradingview.com/script/uxRRcTtQ/",
      "featured": false,
      "cat": "mtf",
      "tags": [
        "MTF",
        "SCANNER"
      ],
      "color": "cyan",
      "ja": "複数タイムフレームのトレンド方向を一覧スキャンし、整合性（アライメント）を自動評価。",
      "en": "Scans trend direction across multiple timeframes and auto-evaluates alignment consistency."
    },
    {
      "code": "Self-Evolving S/R Grid",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "xTOZxD7X",
      "url": "https://www.tradingview.com/script/xTOZxD7X/",
      "featured": false,
      "cat": "mean-reversion",
      "tags": [
        "S/R-GRID",
        "ADAPTIVE"
      ],
      "color": "purple",
      "ja": "自己進化するS/Rグリッドを活用した平均回帰型RL戦略。グリッドは市場構造に合わせて動的更新。",
      "en": "Mean-reversion RL strategy using a self-evolving S/R grid that dynamically updates to market structure."
    },
    {
      "code": "Quantum-Inspired Breakout Scanner",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "dLjt3zl2",
      "url": "https://www.tradingview.com/script/dLjt3zl2/",
      "featured": false,
      "cat": "probability",
      "tags": [
        "QUANTUM",
        "BREAKOUT"
      ],
      "color": "cyan",
      "ja": "量子インスパイアードアルゴリズムでブレイクアウト成功確率をスキャンするスキャナー。",
      "en": "Probability scanner for breakout success using quantum-inspired algorithms."
    },
    {
      "code": "Liquidity Void Detector",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "1qQUsW5r",
      "url": "https://www.tradingview.com/script/1qQUsW5r/",
      "featured": false,
      "cat": "smc",
      "tags": [
        "LIQUIDITY",
        "VOID"
      ],
      "color": "purple",
      "ja": "流動性ボイドを高精度検出し、リフィルシナリオを可視化するSMC型インジケーター。",
      "en": "SMC indicator precisely detecting liquidity voids and visualising refill scenarios."
    },
    {
      "code": "Regime-Aware Trend Channel",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "a8321Ea4",
      "url": "https://www.tradingview.com/script/a8321Ea4/",
      "featured": false,
      "cat": "trend-follow",
      "tags": [
        "REGIME",
        "CHANNEL"
      ],
      "color": "cyan",
      "ja": "現在のレジームを認識しながら動的なトレンドチャンネルを描画するレジーム対応型戦略。",
      "en": "Trend-following strategy drawing dynamic trend channels while recognising the current market regime."
    },
    {
      "code": "Adaptive Fibonacci AI",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "70PFrCUR",
      "url": "https://www.tradingview.com/script/70PFrCUR/",
      "featured": false,
      "cat": "forecast",
      "tags": [
        "FIBONACCI",
        "AI"
      ],
      "color": "purple",
      "ja": "AIが市場構造に応じてフィボナッチ水準を動的調整するアダプティブフィボナッチインジケーター。",
      "en": "Adaptive Fibonacci indicator where AI dynamically adjusts levels to match market structure."
    },
    {
      "code": "Neural Order Block Evolution",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "K75NxVvO",
      "url": "https://www.tradingview.com/script/K75NxVvO/",
      "featured": false,
      "cat": "breakout",
      "tags": [
        "NEURAL",
        "ORDER-BLOCK"
      ],
      "color": "cyan",
      "ja": "ニューラルネットワークでオーダーブロック品質を評価し、最適なブレイクアウトエントリーを選択。",
      "en": "Strategy using a neural network to evaluate order block quality and select optimal breakout entries."
    },
    {
      "code": "KNN Breakout Fortress",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "14PzySpq",
      "url": "https://www.tradingview.com/script/14PzySpq/",
      "featured": false,
      "cat": "breakout",
      "tags": [
        "KNN",
        "FORTRESS"
      ],
      "color": "purple",
      "ja": "KNNで過去の類似ブレイクアウトを参照しエントリー優位性を評価する堅牢なブレイクアウト戦略。",
      "en": "Robust breakout strategy evaluating edge by referencing similar historical breakouts via KNN."
    },
    {
      "code": "AI Dynamic Trendline Architect",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "E3Yv8XAJ",
      "url": "https://www.tradingview.com/script/E3Yv8XAJ/",
      "featured": false,
      "cat": "trend-follow",
      "tags": [
        "AI",
        "TRENDLINE"
      ],
      "color": "cyan",
      "ja": "AIが市場構造を分析してトレンドラインを動的に作成・管理するトレンドライン型戦略。",
      "en": "Trend-following strategy where AI dynamically creates and manages trendlines from market structure."
    },
    {
      "code": "Hybrid AI Bias",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "9vS4tTwV",
      "url": "https://www.tradingview.com/script/9vS4tTwV/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "AI",
        "BIAS"
      ],
      "color": "purple",
      "ja": "AIが複数の市場バイアスを統合評価し、方向性バイアスシグナルを出力するハイブリッドインジケーター。",
      "en": "Hybrid indicator where AI integrates multiple market biases (bullish/bearish) to output a directional bias signal."
    },
    {
      "code": "Reinforcement Filter MA",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "VXZQY3M4",
      "url": "https://www.tradingview.com/script/VXZQY3M4/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "REINFORCE",
        "MA"
      ],
      "color": "cyan",
      "ja": "REINFORCEアルゴリズムで移動平均フィルターのパラメータをオンライン最適化するRL型MA戦略。",
      "en": "RL MA strategy optimising moving average filter parameters online via the REINFORCE algorithm."
    },
    {
      "code": "Cluster Probability Line",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "cyVgZFWP",
      "url": "https://www.tradingview.com/script/cyVgZFWP/",
      "featured": false,
      "cat": "probability",
      "tags": [
        "CLUSTER",
        "PROBABILITY"
      ],
      "color": "purple",
      "ja": "クラスタリングで価格密集帯を識別し、各クラスターの確率ラインを描画するインジケーター。",
      "en": "Identifies price cluster zones via clustering and plots probability lines for each cluster."
    },
    {
      "code": "Liquidity AI Sentinel",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "qZBuVb4Q",
      "url": "https://www.tradingview.com/script/qZBuVb4Q/",
      "featured": false,
      "cat": "smc",
      "tags": [
        "LIQUIDITY",
        "AI-SENTINEL"
      ],
      "color": "cyan",
      "ja": "AIが流動性のシフト・スウィープ・インバランスを監視するセンチネル型流動性モニタリング。",
      "en": "AI-powered sentinel monitoring liquidity shifts, sweeps and imbalances continuously."
    },
    {
      "code": "AI Divergence Ghost",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "E0nv7SCB",
      "url": "https://www.tradingview.com/script/E0nv7SCB/",
      "featured": false,
      "cat": "oscillator",
      "tags": [
        "AI",
        "DIVERGENCE"
      ],
      "color": "purple",
      "ja": "AIが複数オシレーターのダイバージェンスを「幽霊シグナル」として検出・評価するインジケーター。",
      "en": "AI detects and scores divergences across multiple oscillators as invisible ghost signals."
    },
    {
      "code": "Adaptive Super Neural",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "14gCSPwL",
      "url": "https://www.tradingview.com/script/14gCSPwL/",
      "featured": false,
      "cat": "signal",
      "tags": [
        "NEURAL",
        "ADAPTIVE"
      ],
      "color": "cyan",
      "ja": "NeuraLibベースの適応型スーパーニューラルネットワーク。複数の市場入力を統合し包括的シグナルを生成。",
      "en": "Adaptive super neural network based on NeuraLib integrating multiple market inputs for comprehensive signals."
    },
    {
      "code": "Neural Regime Switch",
      "name": "",
      "type": "strategy",
      "access": "open",
      "boosts": 0,
      "slug": "w1QQluia",
      "url": "https://www.tradingview.com/script/w1QQluia/",
      "featured": false,
      "cat": "ai",
      "tags": [
        "NEURAL",
        "REGIME-SWITCH"
      ],
      "color": "purple",
      "ja": "ニューラルネットワークがレジーム転換を検出し、最適な戦略パラメータセットへ自動切替するRL戦略。",
      "en": "Neural network detects regime shifts and auto-switches to the optimal strategy parameter set."
    },
    {
      "code": "AI Trend Pulse [KNN+NeuraLib]",
      "name": "",
      "type": "indicator",
      "access": "open",
      "boosts": 0,
      "slug": "4pdpfBfU",
      "url": "https://www.tradingview.com/script/4pdpfBfU/",
      "featured": false,
      "cat": "trend",
      "tags": [
        "KNN",
        "NEURALIB"
      ],
      "color": "cyan",
      "ja": "KNNとNeuraLibを組み合わせたAIトレンドパルスインジケーター。トレンド強度と方向をリアルタイム評価。",
      "en": "AI Trend Pulse combining KNN and NeuraLib to evaluate trend strength and direction in real time."
    }
  ]
}/*__DATA_END__*/;
