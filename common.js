/* ============================================================
   AetherEdge — Neon / Cyberpunk core styles
   ============================================================ */
:root {
  --cyan:    #00D4FF;
  --emerald: #00FF9F;
  --magenta: #FF00FF;
  --purple:  #9D00FF;
}

html { scroll-padding-top: 5.5rem; }
body { background: #0A0A0A; }

::selection { background: rgba(0, 212, 255, .35); color: #fff; }

::-webkit-scrollbar { width: 9px; height: 8px; }
::-webkit-scrollbar-track { background: #0A0A0A; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--cyan), var(--purple));
  border-radius: 4px;
}

/* ------------------------------------------------------------
   Neon text
   ------------------------------------------------------------ */
.neon-text {
  text-shadow:
    0 0 6px  var(--ng),
    0 0 18px var(--ng),
    0 0 42px var(--ng);
}
.ng-cyan    { --ng: rgba(0, 212, 255, .80);  color: #aef0ff; }
.ng-emerald { --ng: rgba(0, 255, 159, .80);  color: #b8ffe4; }
.ng-magenta { --ng: rgba(255, 0, 255, .75);  color: #ffc2ff; }
.ng-purple  { --ng: rgba(157, 0, 255, .80);  color: #ddb8ff; }

.grad-text {
  background: linear-gradient(92deg, var(--cyan) 0%, var(--emerald) 48%, var(--purple) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter:
    drop-shadow(0 0 10px rgba(0, 212, 255, .45))
    drop-shadow(0 0 34px rgba(157, 0, 255, .30));
}

/* ------------------------------------------------------------
   Neon button
   ------------------------------------------------------------ */
.neon-button {
  --c: var(--cyan);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .55rem;
  padding: .95rem 2.4rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--c);
  border: 1px solid var(--c);
  background: color-mix(in srgb, var(--c) 8%, transparent);
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  box-shadow:
    0 0 10px color-mix(in srgb, var(--c) 55%, transparent),
    0 0 30px color-mix(in srgb, var(--c) 28%, transparent),
    0 0 60px color-mix(in srgb, var(--c) 12%, transparent),
    inset 0 0 14px color-mix(in srgb, var(--c) 16%, transparent);
  transition: all .3s ease;
  overflow: hidden;
  cursor: pointer;
}
.neon-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 32%, rgba(255, 255, 255, .28) 50%, transparent 68%);
  transform: translateX(-130%);
  transition: transform .65s ease;
}
.neon-button:hover::before { transform: translateX(130%); }
.neon-button:hover,
.neon-button:focus-visible {
  color: #ffffff;
  background: color-mix(in srgb, var(--c) 18%, transparent);
  box-shadow:
    0 0 14px color-mix(in srgb, var(--c) 90%, transparent),
    0 0 44px color-mix(in srgb, var(--c) 50%, transparent),
    0 0 96px color-mix(in srgb, var(--c) 26%, transparent),
    inset 0 0 22px color-mix(in srgb, var(--c) 30%, transparent);
  transform: translateY(-2px);
}
.neon-button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.nb-cyan    { --c: var(--cyan); }
.nb-emerald { --c: var(--emerald); }
.nb-magenta { --c: var(--magenta); }
.nb-purple  { --c: var(--purple); }

/* ------------------------------------------------------------
   Neon card
   ------------------------------------------------------------ */
.neon-card {
  --c: var(--cyan);
  position: relative;
  background: linear-gradient(165deg, rgba(17, 17, 26, .92) 0%, rgba(10, 10, 14, .94) 100%);
  border: 1px solid color-mix(in srgb, var(--c) 26%, transparent);
  box-shadow:
    0 0 12px color-mix(in srgb, var(--c) 12%, transparent),
    inset 0 0 26px color-mix(in srgb, var(--c) 5%, transparent);
  backdrop-filter: blur(6px);
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
}
.neon-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--c) 70%, transparent);
  box-shadow:
    0 0 14px color-mix(in srgb, var(--c) 40%, transparent),
    0 0 44px color-mix(in srgb, var(--c) 20%, transparent),
    0 0 92px color-mix(in srgb, var(--c) 10%, transparent),
    inset 0 0 32px color-mix(in srgb, var(--c) 9%, transparent);
}
.nc-cyan    { --c: var(--cyan); }
.nc-emerald { --c: var(--emerald); }
.nc-magenta { --c: var(--magenta); }
.nc-purple  { --c: var(--purple); }

.neon-card .corner {
  position: absolute;
  width: 14px; height: 14px;
  border-color: color-mix(in srgb, var(--c) 85%, transparent);
  border-style: solid;
  border-width: 0;
  opacity: .9;
  transition: all .35s ease;
}
.neon-card .corner.tl { top: -1px; left: -1px;  border-top-width: 2px; border-left-width: 2px; }
.neon-card .corner.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
.neon-card .corner.bl { bottom: -1px; left: -1px;  border-bottom-width: 2px; border-left-width: 2px; }
.neon-card .corner.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }
.neon-card:hover .corner { width: 22px; height: 22px; }

/* ------------------------------------------------------------
   Badges & chips
   ------------------------------------------------------------ */
.neon-badge {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  padding: .22rem .7rem;
  font-size: .62rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: #ffd5ff;
  border: 1px solid rgba(255, 0, 255, .65);
  background: rgba(255, 0, 255, .08);
  box-shadow: 0 0 8px rgba(255, 0, 255, .45), inset 0 0 8px rgba(255, 0, 255, .12);
}
.neon-badge--free {
  color: #c8ffe9;
  border-color: rgba(0, 255, 159, .65);
  background: rgba(0, 255, 159, .08);
  box-shadow: 0 0 8px rgba(0, 255, 159, .45), inset 0 0 8px rgba(0, 255, 159, .12);
}
.neon-badge--open {
  color: #aef0ff;
  border-color: rgba(0, 212, 255, .65);
  background: rgba(0, 212, 255, .08);
  box-shadow: 0 0 8px rgba(0, 212, 255, .45), inset 0 0 8px rgba(0, 212, 255, .12);
}

.tag-chip {
  display: inline-block;
  padding: .14rem .55rem;
  font-size: .6rem;
  letter-spacing: .14em;
  color: rgba(174, 240, 255, .85);
  border: 1px solid rgba(0, 212, 255, .28);
  background: rgba(0, 212, 255, .05);
}

/* Rank badge (popularity view) */
.rank-badge {
  position: absolute;
  top: 1rem; left: 1rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 800;
  font-size: .8rem;
  letter-spacing: .08em;
  padding: .18rem .6rem;
  color: #aef0ff;
  border: 1px solid rgba(0, 212, 255, .5);
  background: rgba(0, 212, 255, .08);
  box-shadow: 0 0 10px rgba(0, 212, 255, .35);
}
.rank-badge.top {
  color: #0A0A0A;
  background: linear-gradient(90deg, var(--cyan), var(--emerald));
  border-color: transparent;
  box-shadow: 0 0 14px rgba(0, 255, 159, .7), 0 0 34px rgba(0, 212, 255, .4);
}

/* Type tabs (INDICATORS / STRATEGIES) */
.type-tab {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  font-size: .78rem;
  padding: .6rem 1.4rem;
  color: rgba(174, 240, 255, .55);
  border: 1px solid rgba(0, 212, 255, .25);
  background: rgba(0, 212, 255, .03);
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: all .25s ease;
  cursor: pointer;
}
.type-tab:hover { color: #fff; border-color: rgba(0, 212, 255, .6); }
.type-tab.active {
  color: #0A0A0A;
  background: linear-gradient(90deg, var(--cyan), var(--emerald));
  border-color: transparent;
  box-shadow: 0 0 14px rgba(0, 212, 255, .6), 0 0 40px rgba(0, 255, 159, .3);
  text-shadow: none;
}

/* View tabs (By Category / Popularity) */
.view-tab {
  font-family: 'JetBrains Mono', monospace;
  font-size: .68rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  padding: .45rem .15rem;
  color: rgba(200, 230, 255, .55);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  transition: all .25s ease;
  cursor: pointer;
}
.view-tab:hover { color: #fff; }
.view-tab.active {
  color: #eaffff;
  border-bottom-color: var(--emerald);
  text-shadow: 0 0 8px rgba(0, 255, 159, .7);
}

/* Category chips */
.cat-chip {
  white-space: nowrap;
  font-size: .66rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding: .42rem .9rem;
  color: rgba(200, 230, 255, .7);
  border: 1px solid rgba(0, 212, 255, .22);
  background: rgba(0, 212, 255, .04);
  transition: all .25s ease;
  cursor: pointer;
}
.cat-chip:hover { color: #fff; border-color: rgba(0, 212, 255, .6); box-shadow: 0 0 10px rgba(0, 212, 255, .3); }
.cat-chip.active {
  color: #eaffff;
  border-color: var(--cyan);
  background: rgba(0, 212, 255, .12);
  box-shadow: 0 0 10px rgba(0, 212, 255, .55), inset 0 0 10px rgba(0, 212, 255, .15);
  text-shadow: 0 0 8px rgba(0, 212, 255, .8);
}
.cat-chip .cnt { color: rgba(0, 255, 159, .85); margin-left: .35rem; }

/* Search input */
.neon-input {
  width: 100%;
  background: rgba(10, 10, 16, .8);
  border: 1px solid rgba(0, 212, 255, .3);
  color: #d8f6ff;
  font-family: 'JetBrains Mono', monospace;
  font-size: .78rem;
  letter-spacing: .08em;
  padding: .6rem 1rem .6rem 2.3rem;
  box-shadow: inset 0 0 14px rgba(0, 212, 255, .07);
  transition: all .25s ease;
}
.neon-input::placeholder { color: rgba(140, 180, 200, .45); }
.neon-input:focus {
  outline: none;
  border-color: rgba(0, 212, 255, .8);
  box-shadow: 0 0 14px rgba(0, 212, 255, .35), inset 0 0 14px rgba(0, 212, 255, .1);
}

/* Grid card entrance */
.grid-card { animation: card-in .5s ease both; }
@keyframes card-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}

/* ------------------------------------------------------------
   Glitch effect (hero headline)
   ------------------------------------------------------------ */
.glitch { animation: glitch-skew 7s infinite steps(1); }
@keyframes glitch-skew {
  0%, 89%, 100% { transform: none; filter: none; }
  90% { transform: translateX(3px) skewX(2deg);  filter: drop-shadow(-3px 0 rgba(255,0,255,.8)) drop-shadow(3px 0 rgba(0,212,255,.8)); }
  92% { transform: translateX(-3px) skewX(-1deg); filter: drop-shadow(3px 0 rgba(255,0,255,.8)) drop-shadow(-3px 0 rgba(0,255,159,.8)); }
  94% { transform: translateX(1px); filter: drop-shadow(-2px 0 rgba(0,212,255,.8)); }
}

/* ------------------------------------------------------------
   Scanlines
   ------------------------------------------------------------ */
.scanlines {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, .018) 0 1px,
    transparent 1px 3px
  );
  mix-blend-mode: overlay;
}
.scanlines::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  height: 140px;
  top: -20%;
  background: linear-gradient(to bottom, transparent, rgba(0, 212, 255, .05), transparent);
  animation: scan-move 9s linear infinite;
}
@keyframes scan-move {
  0%   { top: -20%; }
  100% { top: 115%; }
}

/* ------------------------------------------------------------
   Hero logo
   ------------------------------------------------------------ */
.hero-logo {
  mix-blend-mode: screen;
  -webkit-mask-image: radial-gradient(ellipse 72% 72% at 50% 50%, #000 58%, transparent 96%);
  mask-image: radial-gradient(ellipse 72% 72% at 50% 50%, #000 58%, transparent 96%);
  filter: drop-shadow(0 0 28px rgba(0, 212, 255, .35));
  animation: logo-float 7s ease-in-out infinite;
}
@keyframes logo-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}

/* ------------------------------------------------------------
   Nav
   ------------------------------------------------------------ */
#navbar { transition: background .3s ease, box-shadow .3s ease, border-color .3s ease; border-bottom: 1px solid transparent; }
#navbar.nav-scrolled {
  background: rgba(10, 10, 13, .82);
  backdrop-filter: blur(14px);
  border-bottom-color: rgba(0, 212, 255, .25);
  box-shadow: 0 4px 30px rgba(0, 212, 255, .10);
}
.nav-link {
  position: relative;
  letter-spacing: .18em;
  transition: color .25s ease, text-shadow .25s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: -6px;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, var(--cyan), var(--emerald));
  box-shadow: 0 0 8px rgba(0, 212, 255, .8);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .3s ease;
}
.nav-link:hover { color: #fff; text-shadow: 0 0 10px rgba(0, 212, 255, .9); }
.nav-link:hover::after { transform: scaleX(1); }

.lang-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: .68rem;
  letter-spacing: .18em;
  padding: .35rem .8rem;
  color: var(--emerald);
  border: 1px solid rgba(0, 255, 159, .5);
  background: rgba(0, 255, 159, .06);
  box-shadow: 0 0 8px rgba(0, 255, 159, .3);
  transition: all .25s ease;
  cursor: pointer;
}
.lang-btn:hover {
  color: #0A0A0A;
  background: var(--emerald);
  box-shadow: 0 0 16px rgba(0, 255, 159, .8);
}

#mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height .4s ease;
}
#mobile-menu.open { max-height: 32rem; }

/* ------------------------------------------------------------
   Scroll reveal / section chrome
   ------------------------------------------------------------ */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity .7s ease, transform .7s ease;
}
.reveal.in { opacity: 1; transform: none; }

.eyebrow {
  font-size: .72rem;
  letter-spacing: .3em;
  color: rgba(0, 212, 255, .85);
  text-shadow: 0 0 10px rgba(0, 212, 255, .6);
}
.eyebrow .caret { animation: caret-blink 1.1s steps(1) infinite; }
@keyframes caret-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

.neon-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, .8), rgba(157, 0, 255, .8), transparent);
  box-shadow: 0 0 12px rgba(0, 212, 255, .5);
}

.thumb {
  background-image:
    radial-gradient(ellipse at 50% 120%, color-mix(in srgb, var(--c) 14%, transparent), transparent 70%),
    linear-gradient(rgba(0, 212, 255, .06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, .06) 1px, transparent 1px);
  background-size: 100% 100%, 22px 22px, 22px 22px;
}
.spark { filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor); }
.neon-card:hover .spark { animation: spark-pulse 1.6s ease-in-out infinite; }
@keyframes spark-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .55; }
}

.terminal-body { font-size: .8rem; line-height: 1.9; }
.terminal-body .prompt { color: var(--emerald); text-shadow: 0 0 8px rgba(0, 255, 159, .7); }
.terminal-body .out    { color: rgba(174, 240, 255, .85); }
.type-caret {
  display: inline-block;
  width: .55em; height: 1.05em;
  margin-left: 2px;
  background: var(--emerald);
  box-shadow: 0 0 8px rgba(0, 255, 159, .9);
  vertical-align: text-bottom;
  animation: caret-blink 1s steps(1) infinite;
}

.status-dot {
  width: 8px; height: 8px;
  border-radius: 9999px;
  background: var(--emerald);
  box-shadow: 0 0 8px rgba(0, 255, 159, .9), 0 0 18px rgba(0, 255, 159, .5);
  animation: caret-blink 1.6s steps(1) infinite;
}

.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: .16;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .glitch, .hero-logo, .scanlines::after, .type-caret, .status-dot,
  .neon-card:hover .spark, .grid-card { animation: none !important; }
  .reveal { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}

/* Protected access badge (sync may detect 'Protected' scripts) */
.neon-badge--protected {
  color: #ddb8ff;
  border-color: rgba(157, 0, 255, .65);
  background: rgba(157, 0, 255, .08);
  box-shadow: 0 0 8px rgba(157, 0, 255, .45), inset 0 0 8px rgba(157, 0, 255, .12);
}
