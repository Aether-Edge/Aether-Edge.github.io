/* ============================================================
   AetherEdge Backtest Engine  v0.9.0
   Pine Script(TM) v5/v6 subset interpreter + broker emulator.
   Pure JS - runs in browser main thread, Web Worker, or Node.
   Pine Script is a trademark of TradingView, Inc.
   This project is not affiliated with TradingView.
   ============================================================ */
(function (global) {
'use strict';

const VERSION = '0.9.0';
const NA = NaN;
const isNa = (v) => v === undefined || v === null || (typeof v === 'number' && isNaN(v));
const T = (v) => v === true ? true : (typeof v === 'number' ? (!isNaN(v) && v !== 0) : false);

/* ============================================================
   1. LEXER
   ============================================================ */
const KEYWORDS = new Set(['if','else','for','to','by','while','break','continue','var','varip','and','or','not','true','false','switch','import','export','method','type']);
const TYPEWORDS = new Set(['float','int','bool','string','color','label','line','box','table','array','matrix','map']);
const CONT_END_RE = /(,|\+|\-|\*|\/|%|\?|:|\(|\[|:=|==|!=|<=|>=|<|>|=|\band\b|\bor\b|\bnot\b)\s*$/;
const ARROW_END_RE = /=>\s*$/;   // trailing '=>' introduces an indented function body, never a wrapped line
const CONT_START_RE = /^(\?|:|\)|\]|,|==|!=|<=|>=|\+|\*|\/|%|and\b|or\b)/;

function stripComment(line) {
  let q = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) { if (ch === q && line[i-1] !== '\\') q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; continue; }
    if (ch === '/' && line[i+1] === '/') return line.slice(0, i);
  }
  return line;
}
function indentOf(line) {
  let n = 0;
  for (const ch of line) { if (ch === ' ') n++; else if (ch === '\t') n += 4; else break; }
  return n;
}
function parenDelta(s) {
  let d = 0, q = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) { if (ch === q && s[i-1] !== '\\') q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; continue; }
    if (ch === '(' || ch === '[') d++;
    else if (ch === ')' || ch === ']') d--;
  }
  return d;
}

/** merge physical lines into logical lines: [{indent, text, lineNo}] */
function toLogicalLines(code) {
  const phys = code.split(/\r?\n/);
  const out = [];
  let cur = null, depth = 0;
  for (let i = 0; i < phys.length; i++) {
    const raw = phys[i];
    const s = stripComment(raw);
    if (!cur && s.trim() === '') continue;
    if (!cur) { cur = { indent: indentOf(raw), text: s, lineNo: i + 1 }; depth = 0; }
    else cur.text += ' ' + s.trim();
    depth += parenDelta(s);
    if (depth > 0) continue;
    const trimmed = s.replace(/\s+$/, '');
    if (!ARROW_END_RE.test(trimmed) && CONT_END_RE.test(trimmed)) continue;
    // peek next non-empty physical line
    let j = i + 1, nxt = null;
    while (j < phys.length) { const t2 = stripComment(phys[j]); if (t2.trim() !== '') { nxt = { ind: indentOf(phys[j]), txt: t2.trim() }; break; } j++; }
    if (nxt && nxt.ind > cur.indent && CONT_START_RE.test(nxt.txt)) continue;
    out.push(cur); cur = null; depth = 0;
  }
  if (cur) out.push(cur);
  return out;
}

const TOKEN_RE = /\s*(?:(\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)|(:=|==|!=|<=|>=|=>|[-+*/%?:,()\[\]=<>]))/y;

function tokenizeLine(text, lineNo) {
  const toks = [];
  TOKEN_RE.lastIndex = 0;
  let m;
  let idx = 0;
  while (idx < text.length) {
    TOKEN_RE.lastIndex = idx;
    m = TOKEN_RE.exec(text);
    if (!m) {
      const rest = text.slice(idx).trim();
      if (rest === '') break;
      throw pineErr(lineNo, `解析できない文字があります: "${rest.slice(0, 12)}"`);
    }
    idx = TOKEN_RE.lastIndex;
    if (m[1] !== undefined) toks.push({ t: 'num', v: parseFloat(m[1]), line: lineNo });
    else if (m[2] !== undefined) toks.push({ t: 'str', v: m[2].slice(1, -1).replace(/\\(.)/g, '$1'), line: lineNo });
    else if (m[3] !== undefined) {
      const id = m[3];
      if (id === 'true' || id === 'false') toks.push({ t: 'bool', v: id === 'true', line: lineNo });
      else if (KEYWORDS.has(id) && !id.includes('.')) toks.push({ t: 'kw', v: id, line: lineNo });
      else toks.push({ t: 'id', v: id, line: lineNo });
    }
    else toks.push({ t: 'op', v: m[4], line: lineNo });
  }
  return toks;
}

function pineErr(line, msg) { const e = new Error(msg); e.pineLine = line; return e; }

/* ============================================================
   2. PARSER
   ============================================================ */
let NODE_ID = 0;
function nd(k, line, props) { return Object.assign({ k, id: ++NODE_ID, line }, props); }

const UNSUPPORTED = {
  'switch': 'switch式 (v2で対応予定)', 'while': 'whileループ (v2で対応予定)',
  'import': 'import (ライブラリ未対応)', 'export': 'export', 'method': 'メソッド定義', 'type': 'ユーザー定義型',
};

class Parser {
  constructor(code) {
    NODE_ID = 0;
    this.lines = toLogicalLines(code).map(L => ({ ...L, toks: tokenizeLine(L.text, L.lineNo) })).filter(L => L.toks.length);
    this.pos = 0;
    this.histNames = new Set();   // identifiers used with [] history
    this.sideEffectFns = /^(strategy\.|plot|plotshape|plotchar|plotarrow|bgcolor|barcolor|fill$|alert|label\.|line\.|box\.|table\.|log\.)/;
  }
  parse() {
    const body = this.parseBlock(this.lines.length ? this.lines[0].indent : 0);
    if (this.pos < this.lines.length) throw pineErr(this.lines[this.pos].lineNo, 'インデントが不正です');
    return { k: 'program', body };
  }
  peekLine() { return this.lines[this.pos]; }
  parseBlock(L) {
    const stmts = [];
    while (this.pos < this.lines.length && this.lines[this.pos].indent >= L) {
      if (this.lines[this.pos].indent > L) throw pineErr(this.lines[this.pos].lineNo, '予期しないインデントです');
      stmts.push(this.parseStmt());
    }
    return stmts;
  }
  parseStmt() {
    const line = this.lines[this.pos];
    const toks = line.toks;
    const t0 = toks[0];
    // control keywords
    if (t0.t === 'kw') {
      if (UNSUPPORTED[t0.v]) throw pineErr(line.lineNo, `${UNSUPPORTED[t0.v]} は現在未対応です`);
      if (t0.v === 'if') return this.parseIf();
      if (t0.v === 'for') return this.parseFor();
      if (t0.v === 'break' || t0.v === 'continue') { this.pos++; return nd(t0.v, line.lineNo, {}); }
      if (t0.v === 'else') throw pineErr(line.lineNo, '対応する if のない else です');
      if (t0.v === 'var' || t0.v === 'varip') return this.parseDecl(true);
    }
    // tuple destructure  [a, b] = expr
    if (t0.t === 'op' && t0.v === '[') return this.parseTupleAssign();
    // function definition  name(params) =>
    if (t0.t === 'id' && toks[1] && toks[1].t === 'op' && toks[1].v === '(') {
      const close = this.findMatch(toks, 1);
      if (close >= 0 && toks[close + 1] && toks[close + 1].v === '=>') return this.parseFnDef(close);
    }
    // typed / plain declaration or reassignment
    if (t0.t === 'id') {
      // optional type prefix
      let i = 0;
      if (TYPEWORDS.has(t0.v) && toks[1] && toks[1].t === 'id' && toks[2] && toks[2].v === '=') i = 1;
      const name = toks[i];
      const nx = toks[i + 1];
      if (nx && nx.t === 'op' && nx.v === '=' ) {
        this.pos++;
        const expr = this.exprFrom(toks.slice(i + 2), line.lineNo);
        return nd('decl', line.lineNo, { name: name.v, expr, varKind: 'series' });
      }
      if (nx && nx.t === 'op' && nx.v === ':=') {
        this.pos++;
        const expr = this.exprFrom(toks.slice(i + 2), line.lineNo);
        return nd('assign', line.lineNo, { name: name.v, expr });
      }
    }
    // expression statement
    this.pos++;
    const expr = this.exprFrom(toks, line.lineNo);
    return nd('exprstmt', line.lineNo, { expr });
  }
  parseDecl(isVar) {
    const line = this.lines[this.pos];
    const toks = line.toks;
    let i = 1;
    if (toks[i] && toks[i].t === 'id' && TYPEWORDS.has(toks[i].v) && toks[i+1] && toks[i+1].t === 'id') i++;
    const name = toks[i];
    if (!name || name.t !== 'id') throw pineErr(line.lineNo, 'var の後に変数名が必要です');
    if (!toks[i+1] || toks[i+1].v !== '=') throw pineErr(line.lineNo, 'var 宣言には = が必要です');
    this.pos++;
    const expr = this.exprFrom(toks.slice(i + 2), line.lineNo);
    return nd('decl', line.lineNo, { name: name.v, expr, varKind: 'var' });
  }
  parseTupleAssign() {
    const line = this.lines[this.pos];
    const toks = line.toks;
    const close = this.findMatch(toks, 0);
    if (close < 0 || !toks[close+1] || toks[close+1].v !== '=') throw pineErr(line.lineNo, 'タプル代入の構文が不正です');
    const names = [];
    for (let i = 1; i < close; i++) {
      if (toks[i].t === 'id') names.push(toks[i].v);
      else if (toks[i].v !== ',') throw pineErr(line.lineNo, 'タプル代入には変数名のみ指定できます');
    }
    this.pos++;
    const expr = this.exprFrom(toks.slice(close + 2), line.lineNo);
    return nd('tupledecl', line.lineNo, { names, expr });
  }
  parseFnDef(closeIdx) {
    const line = this.lines[this.pos];
    const toks = line.toks;
    const name = toks[0].v;
    const params = [];
    let i = 2;
    while (i < closeIdx) {
      const p = toks[i];
      if (p.t === 'id') {
        let def;
        if (toks[i+1] && toks[i+1].v === '=') {
          let j = i + 2, d = 0; const seg = [];
          while (j < closeIdx && !(d === 0 && toks[j].v === ',')) { if (toks[j].v==='('||toks[j].v==='[') d++; if (toks[j].v===')'||toks[j].v===']') d--; seg.push(toks[j]); j++; }
          def = this.exprFrom(seg, line.lineNo); i = j;
        }
        params.push({ name: p.v, def });
      }
      i++;
    }
    const after = toks.slice(closeIdx + 2);
    this.pos++;
    let body;
    if (after.length) body = { expr: this.exprFrom(after, line.lineNo) };
    else {
      const nl = this.peekLine();
      if (!nl || nl.indent <= line.indent) throw pineErr(line.lineNo, '関数本体がありません');
      body = { block: this.parseBlock(nl.indent) };
    }
    return nd('fndef', line.lineNo, { name, params, body });
  }
  parseIf() {
    const line = this.lines[this.pos];
    const cond = this.exprFrom(line.toks.slice(1), line.lineNo);
    this.pos++;
    const nl = this.peekLine();
    if (!nl || nl.indent <= line.indent) throw pineErr(line.lineNo, 'if ブロックの本体がありません');
    const thenB = this.parseBlock(nl.indent);
    let elseB = null;
    const el = this.peekLine();
    if (el && el.indent === line.indent && el.toks[0].t === 'kw' && el.toks[0].v === 'else') {
      if (el.toks[1] && el.toks[1].t === 'kw' && el.toks[1].v === 'if') {
        // rewrite 'else if ...' as else { if ... }
        el.toks = el.toks.slice(1);
        elseB = [this.parseIf()];
      } else {
        this.pos++;
        const bl = this.peekLine();
        if (!bl || bl.indent <= line.indent) throw pineErr(el.lineNo, 'else ブロックの本体がありません');
        elseB = this.parseBlock(bl.indent);
      }
    }
    return nd('if', line.lineNo, { cond, thenB, elseB });
  }
  parseFor() {
    const line = this.lines[this.pos];
    const toks = line.toks;
    if (!toks[1] || toks[1].t !== 'id' || !toks[2] || toks[2].v !== '=') throw pineErr(line.lineNo, 'for i = a to b の形式が必要です');
    const name = toks[1].v;
    let toIdx = -1, byIdx = -1, d = 0;
    for (let i = 3; i < toks.length; i++) {
      if (toks[i].v==='('||toks[i].v==='[') d++;
      if (toks[i].v===')'||toks[i].v===']') d--;
      if (d === 0 && toks[i].t === 'kw' && toks[i].v === 'to' && toIdx < 0) toIdx = i;
      if (d === 0 && toks[i].t === 'kw' && toks[i].v === 'by') byIdx = i;
    }
    if (toIdx < 0) throw pineErr(line.lineNo, 'for 文に to がありません');
    const fromE = this.exprFrom(toks.slice(3, toIdx), line.lineNo);
    const toE = this.exprFrom(toks.slice(toIdx + 1, byIdx > 0 ? byIdx : undefined), line.lineNo);
    const byE = byIdx > 0 ? this.exprFrom(toks.slice(byIdx + 1), line.lineNo) : null;
    this.pos++;
    const nl = this.peekLine();
    if (!nl || nl.indent <= line.indent) throw pineErr(line.lineNo, 'for ブロックの本体がありません');
    const body = this.parseBlock(nl.indent);
    return nd('for', line.lineNo, { name, fromE, toE, byE, body });
  }
  findMatch(toks, openIdx) {
    let d = 0;
    for (let i = openIdx; i < toks.length; i++) {
      if (toks[i].t === 'op' && (toks[i].v === '(' || toks[i].v === '[')) d++;
      else if (toks[i].t === 'op' && (toks[i].v === ')' || toks[i].v === ']')) { d--; if (d === 0) return i; }
    }
    return -1;
  }
  /* ---- expression parsing (Pratt) ---- */
  exprFrom(toks, lineNo) {
    if (!toks.length) throw pineErr(lineNo, '式がありません');
    const st = { toks, i: 0, lineNo };
    const e = this.pTernary(st);
    if (st.i < toks.length) throw pineErr(lineNo, `式の末尾に余分なトークンがあります: "${String(toks[st.i].v)}"`);
    return e;
  }
  pk(st) { return st.toks[st.i]; }
  eat(st, v) {
    const t = st.toks[st.i];
    if (!t || (v !== undefined && t.v !== v)) throw pineErr(st.lineNo, `"${v}" が必要です`);
    st.i++; return t;
  }
  pTernary(st) {
    const c = this.pOr(st);
    const t = this.pk(st);
    if (t && t.t === 'op' && t.v === '?') {
      st.i++;
      const a = this.pTernary(st);
      this.eat(st, ':');
      const b = this.pTernary(st);
      return nd('ternary', c.line || st.lineNo, { c, a, b, lazy: this.hasSideEffect(a) || this.hasSideEffect(b) });
    }
    return c;
  }
  pOr(st) { let l = this.pAnd(st); while (this.pk(st) && this.pk(st).t === 'kw' && this.pk(st).v === 'or') { st.i++; const r = this.pAnd(st); l = nd('bin', st.lineNo, { op: 'or', l, r }); } return l; }
  pAnd(st) { let l = this.pEq(st); while (this.pk(st) && this.pk(st).t === 'kw' && this.pk(st).v === 'and') { st.i++; const r = this.pEq(st); l = nd('bin', st.lineNo, { op: 'and', l, r }); } return l; }
  pEq(st) { let l = this.pRel(st); while (this.pk(st) && this.pk(st).t === 'op' && (this.pk(st).v === '==' || this.pk(st).v === '!=')) { const op = this.pk(st).v; st.i++; const r = this.pRel(st); l = nd('bin', st.lineNo, { op, l, r }); } return l; }
  pRel(st) { let l = this.pAdd(st); while (this.pk(st) && ['<','>','<=','>='].includes(this.pk(st).v) && this.pk(st).t === 'op') { const op = this.pk(st).v; st.i++; const r = this.pAdd(st); l = nd('bin', st.lineNo, { op, l, r }); } return l; }
  pAdd(st) { let l = this.pMul(st); while (this.pk(st) && (this.pk(st).v === '+' || this.pk(st).v === '-') && this.pk(st).t === 'op') { const op = this.pk(st).v; st.i++; const r = this.pMul(st); l = nd('bin', st.lineNo, { op, l, r }); } return l; }
  pMul(st) { let l = this.pUnary(st); while (this.pk(st) && ['*','/','%'].includes(this.pk(st).v) && this.pk(st).t === 'op') { const op = this.pk(st).v; st.i++; const r = this.pUnary(st); l = nd('bin', st.lineNo, { op, l, r }); } return l; }
  pUnary(st) {
    const t = this.pk(st);
    if (t && ((t.t === 'kw' && t.v === 'not') || (t.t === 'op' && (t.v === '-' || t.v === '+')))) {
      st.i++;
      const e = this.pUnary(st);
      if (t.v === '+') return e;
      return nd('un', t.line, { op: t.v, e });
    }
    return this.pPostfix(st);
  }
  pPostfix(st) {
    let e = this.pAtom(st);
    for (;;) {
      const t = this.pk(st);
      if (t && t.t === 'op' && t.v === '[') {
        st.i++;
        const n = this.pTernary(st);
        this.eat(st, ']');
        if (e.k === 'ident') this.histNames.add(e.name);
        e = nd('hist', t.line, { base: e, n });
      } else break;
    }
    return e;
  }
  pAtom(st) {
    const t = this.pk(st);
    if (!t) throw pineErr(st.lineNo, '式が途中で終わっています');
    if (t.t === 'num') { st.i++; return nd('num', t.line, { v: t.v }); }
    if (t.t === 'str') { st.i++; return nd('str', t.line, { v: t.v }); }
    if (t.t === 'bool') { st.i++; return nd('bool', t.line, { v: t.v }); }
    if (t.t === 'op' && t.v === '(') { st.i++; const e = this.pTernary(st); this.eat(st, ')'); return e; }
    if (t.t === 'op' && t.v === '[') {  // tuple literal
      st.i++;
      const els = [];
      while (this.pk(st) && this.pk(st).v !== ']') { els.push(this.pTernary(st)); if (this.pk(st) && this.pk(st).v === ',') st.i++; }
      this.eat(st, ']');
      return nd('tuple', t.line, { els });
    }
    if (t.t === 'kw' && UNSUPPORTED[t.v]) throw pineErr(t.line, `${UNSUPPORTED[t.v]} は現在未対応です`);
    if (t.t === 'kw' && t.v === 'if') throw pineErr(t.line, 'if式は未対応です。三項演算子 cond ? a : b を使ってください');
    if (t.t === 'id') {
      st.i++;
      const nx = this.pk(st);
      if (nx && nx.t === 'op' && nx.v === '(') {
        st.i++;
        const args = [], kwargs = {};
        while (this.pk(st) && this.pk(st).v !== ')') {
          const a = this.pk(st), b = st.toks[st.i + 1];
          if (a.t === 'id' && b && b.t === 'op' && b.v === '=') {
            st.i += 2;
            kwargs[a.v] = this.pTernary(st);
          } else args.push(this.pTernary(st));
          if (this.pk(st) && this.pk(st).v === ',') st.i++;
        }
        this.eat(st, ')');
        return nd('call', t.line, { callee: t.v, args, kwargs });
      }
      return nd('ident', t.line, { name: t.v });
    }
    throw pineErr(t.line, `予期しないトークン: "${String(t.v)}"`);
  }
  hasSideEffect(node) {
    let found = false;
    walk(node, n => { if (n.k === 'call' && this.sideEffectFns.test(n.callee)) found = true; });
    return found;
  }
}

function walk(node, fn) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach(x => walk(x, fn)); return; }
  if (node.k) fn(node);
  for (const key of Object.keys(node)) {
    if (key === 'k' || key === 'id' || key === 'line') continue;
    const v = node[key];
    if (v && typeof v === 'object') walk(v, fn);
  }
}

/* ---- static literal evaluation (for decl / inputs) ---- */
const CONSTS = {
  'strategy.long': 'long', 'strategy.short': 'short',
  'strategy.fixed': 'fixed', 'strategy.cash': 'cash', 'strategy.percent_of_equity': 'percent_of_equity',
  'strategy.commission.percent': 'percent', 'strategy.commission.cash_per_contract': 'cash_per_contract', 'strategy.commission.cash_per_order': 'cash_per_order',
  'strategy.direction.all': 'all', 'strategy.direction.long': 'long', 'strategy.direction.short': 'short',
  'math.pi': Math.PI, 'math.e': Math.E, 'math.phi': 1.618033988749895, 'math.rphi': 0.6180339887498949,
  'barmerge.gaps_off': 'gaps_off', 'barmerge.lookahead_off': 'lookahead_off', 'barmerge.lookahead_on': 'lookahead_on',
  'display.all': 'all', 'display.none': 'none',
  'shape.triangleup':'triangleup','shape.triangledown':'triangledown','shape.circle':'circle','shape.cross':'cross','shape.xcross':'xcross','shape.labelup':'labelup','shape.labeldown':'labeldown','shape.arrowup':'arrowup','shape.arrowdown':'arrowdown','shape.square':'square','shape.diamond':'diamond','shape.flag':'flag',
  'location.abovebar':'abovebar','location.belowbar':'belowbar','location.top':'top','location.bottom':'bottom','location.absolute':'absolute',
  'size.tiny':'tiny','size.small':'small','size.normal':'normal','size.large':'large','size.huge':'huge','size.auto':'auto',
  'plot.style_line':'line','plot.style_histogram':'histogram','plot.style_columns':'columns','plot.style_area':'area','plot.style_circles':'circles','plot.style_cross':'cross','plot.style_stepline':'stepline',
  'format.price':'price','format.percent':'percent','format.volume':'volume',
  'xloc.bar_index':'bar_index','xloc.bar_time':'bar_time','extend.none':'none','extend.right':'right','extend.left':'left','extend.both':'both',
};
const PINE_COLORS = {
  'color.aqua': '#00BCD4', 'color.black': '#363A45', 'color.blue': '#2196F3', 'color.fuchsia': '#E040FB',
  'color.gray': '#787B86', 'color.green': '#4CAF50', 'color.lime': '#00E676', 'color.maroon': '#880E4F',
  'color.navy': '#311B92', 'color.olive': '#808000', 'color.orange': '#FF9800', 'color.purple': '#9C27B0',
  'color.red': '#F23645', 'color.silver': '#B2B5BE', 'color.teal': '#089981', 'color.white': '#FFFFFF',
  'color.yellow': '#FDD835', 'color.cyan': '#00D4FF',
};

function staticEval(node) {
  if (!node) return undefined;
  switch (node.k) {
    case 'num': case 'str': case 'bool': return node.v;
    case 'ident':
      if (node.name === 'na') return NA;
      if (node.name in CONSTS) return CONSTS[node.name];
      if (node.name in PINE_COLORS) return PINE_COLORS[node.name];
      return undefined;
    case 'un': { const v = staticEval(node.e); if (typeof v === 'number') return node.op === '-' ? -v : v; if (typeof v === 'boolean' && node.op === 'not') return !v; return undefined; }
    case 'bin': { const l = staticEval(node.l), r = staticEval(node.r);
      if (typeof l === 'number' && typeof r === 'number') { switch(node.op){case '+':return l+r;case '-':return l-r;case '*':return l*r;case '/':return l/r;} }
      return undefined; }
    case 'call': if (node.callee === 'color.new' || node.callee === 'color.rgb') return staticEval(node.args[0]);
      return undefined;
  }
  return undefined;
}

/* ---- extract declaration + inputs from AST ---- */
function extractMeta(ast) {
  const decl = { title: 'Strategy', overlay: true, kind: 'strategy',
    initial_capital: 100000, pyramiding: 0, default_qty_type: 'fixed', default_qty_value: 1,
    commission_type: 'percent', commission_value: 0, slippage: 0, process_orders_on_close: false, calc_on_order_fills: false };
  const inputs = [];
  const seen = new Map();
  for (const s of ast.body) {
    if (s.k === 'exprstmt' && s.expr.k === 'call' && (s.expr.callee === 'strategy' || s.expr.callee === 'indicator' || s.expr.callee === 'study')) {
      const c = s.expr;
      decl.kind = c.callee === 'strategy' ? 'strategy' : 'indicator';
      if (c.args[0]) decl.title = staticEval(c.args[0]) ?? decl.title;
      for (const [k, v] of Object.entries(c.kwargs)) {
        const sv = staticEval(v);
        if (sv !== undefined) decl[k] = sv;
      }
    }
  }
  walk(ast, n => {
    if (n.k !== 'call' || !n.callee.startsWith('input')) return;
    const type = n.callee === 'input' ? null : n.callee.slice(6); // int/float/bool/string/source/timeframe/...
    const g = (name, idx) => n.kwargs[name] !== undefined ? staticEval(n.kwargs[name]) : (n.args[idx] !== undefined ? staticEval(n.args[idx]) : undefined);
    let defval = n.kwargs.defval !== undefined ? staticEval(n.kwargs.defval) : (n.args[0] !== undefined ? staticEval(n.args[0]) : undefined);
    if ((type === 'source' || type === null) && n.args[0] && n.args[0].k === 'ident' && defval === undefined) defval = n.args[0].name;
    const title = g('title', 1);
    let ty = type;
    if (!ty) ty = typeof defval === 'boolean' ? 'bool' : typeof defval === 'string' ? 'string' : (Number.isInteger(defval) ? 'int' : 'float');
    if (ty === 'timeframe' || ty === 'symbol' || ty === 'session' || ty === 'text_area') ty = 'string';
    if (ty === 'price') ty = 'float';
    let key = title || `param_${inputs.length + 1}`;
    if (seen.has(key)) { key = key + '_' + (seen.get(key) + 1); }
    seen.set(title || key, (seen.get(title || key) || 0) + 1);
    n._inputKey = key;
    const spec = { key, title: title || key, type: ty, defval,
      minval: g('minval'), maxval: g('maxval'), step: g('step'), options: undefined, line: n.line };
    if (n.kwargs.options && n.kwargs.options.k === 'tuple') spec.options = n.kwargs.options.els.map(staticEval);
    inputs.push(spec);
  });
  return { decl, inputs };
}

function parseCode(code) {
  const errors = [];
  let ast = null, decl = null, inputs = [];
  try {
    const p = new Parser(code);
    ast = p.parse();
    ast.histNames = Array.from(p.histNames);
    const meta = extractMeta(ast);
    decl = meta.decl; inputs = meta.inputs;
  } catch (e) {
    errors.push({ line: e.pineLine || 0, message: e.message || String(e) });
  }
  return { ast, decl, inputs, errors };
}

/* ============================================================
   3. STREAMING STATE HELPERS
   ============================================================ */
class Win {
  constructor(len) { this.len = len; this.a = new Float64Array(len); this.i = 0; this.n = 0; this.naC = 0; this.sum = 0; this.sq = 0; }
  push(v) {
    if (this.n === this.len) { const old = this.a[this.i]; if (isNaN(old)) this.naC--; else { this.sum -= old; this.sq -= old * old; } } else this.n++;
    this.a[this.i] = v; if (isNaN(v)) this.naC++; else { this.sum += v; this.sq += v * v; }
    this.i = (this.i + 1) % this.len;
  }
  get full() { return this.n === this.len && this.naC === 0; }
  mean() { return this.full ? this.sum / this.len : NA; }
  each(fn) { for (let k = 0; k < this.n; k++) { const idx = (this.i - this.n + k + this.len * 2) % this.len; fn(this.a[idx], k); } }
  at(back) { if (back >= this.n) return NA; const idx = (this.i - 1 - back + this.len * 2) % this.len; return this.a[idx]; }
}
class MaxDeque {
  constructor(len, isMax) { this.len = len; this.isMax = isMax; this.q = []; this.seq = 0; this.count = 0; }
  push(v) {
    const s = this.seq++;
    this.count = Math.min(this.count + 1, this.len);
    if (!isNaN(v)) {
      while (this.q.length && (this.isMax ? this.q[this.q.length-1].v <= v : this.q[this.q.length-1].v >= v)) this.q.pop();
      this.q.push({ v, s });
    }
    while (this.q.length && this.q[0].s <= s - this.len) this.q.shift();
  }
  get val() { return (this.count >= this.len && this.q.length) ? this.q[0].v : (this.q.length && this.seq >= this.len ? this.q[0].v : NA); }
  get idxBack() { return this.q.length ? (this.seq - 1 - this.q[0].s) : NA; }
}
function mkSMA(len) { const w = new Win(len); return { push(v) { w.push(v); return w.mean(); }, w }; }
function mkEMA(len) {
  const seedW = new Win(len); let val = NA, seeded = false; const alpha = 2 / (len + 1);
  return { push(v) {
    if (isNa(v)) return val;
    if (!seeded) { seedW.push(v); const m = seedW.mean(); if (!isNa(m)) { val = m; seeded = true; } return val; }
    val = alpha * v + (1 - alpha) * val; return val;
  } };
}
function mkRMA(len) {
  const seedW = new Win(len); let val = NA, seeded = false; const alpha = 1 / len;
  return { push(v) {
    if (isNa(v)) return val;
    if (!seeded) { seedW.push(v); const m = seedW.mean(); if (!isNa(m)) { val = m; seeded = true; } return val; }
    val = alpha * v + (1 - alpha) * val; return val;
  } };
}

/* ============================================================
   4. RUNTIME
   ============================================================ */
const BREAK = { brk: true }, CONTINUE = { cont: true };

class Scope {
  constructor(parent) { this.m = new Map(); this.parent = parent; }
  lookup(name) { let s = this; while (s) { if (s.m.has(name)) return s.m.get(name); s = s.parent; } return undefined; }
}

class Runtime {
  constructor(parsed, data, settings) {
    this.ast = parsed.ast;
    this.decl = parsed.decl;
    this.inputSpecs = parsed.inputs;
    this.data = data;
    this.N = data.c.length;
    this.set = settings;
    this.inputs = settings.inputs || {};
    this.state = new Map();          // per-callsite streaming state
    this.globals = new Scope(null);
    this.funcs = new Map();
    this.histNames = new Set(this.ast.histNames || []);
    this.plots = new Map();
    this.warnings = new Set();
    this.bar = 0;
    this.ctx = '';
    this.depth = 0;
    this.broker = new Broker(this);
    this.mintick = settings.mintick || estimateMintick(data.c);
    this.barsPerYear = settings.barsPerYear || estimateBPY(data.t);
    // register function defs up-front
    for (const s of this.ast.body) if (s.k === 'fndef') this.funcs.set(s.name, s);
  }
  st(key, init) { let v = this.state.get(key); if (v === undefined) { v = init(); this.state.set(key, v); } return v; }
  nodeKey(node) { return this.ctx + '#' + node.id; }

  run() {
    const N = this.N;
    for (let i = 0; i < N; i++) {
      this.bar = i;
      this.broker.onBarOpen(i);
      this.execBlock(this.ast.body, this.globals);
      this.broker.onBarClose(i);
    }
    return this.broker.finish();
  }

  execBlock(stmts, scope) {
    let last = NA;
    for (const s of stmts) last = this.execStmt(s, scope);
    return last;
  }
  execStmt(s, scope) {
    switch (s.k) {
      case 'fndef': return NA;
      case 'decl': {
        let slot = scope.m.get(s.name);
        if (s.varKind === 'var') {
          if (!slot) { slot = { v: NA, kind: 'var', init: false }; scope.m.set(s.name, slot); }
          if (!slot.init) { slot.v = this.evalE(s.expr, scope); slot.init = true; this.snap(s, slot); }
          else this.snap(s, slot);
          return slot.v;
        }
        if (!slot || slot.declId !== s.id) { slot = { v: NA, kind: 'series', declId: s.id }; scope.m.set(s.name, slot); }
        slot.v = this.evalE(s.expr, scope);
        this.snap(s, slot);
        return slot.v;
      }
      case 'tupledecl': {
        const v = this.evalE(s.expr, scope);
        const arr = Array.isArray(v) ? v : [v];
        s.names.forEach((nm, ix) => {
          let slot = scope.m.get(nm);
          if (!slot) { slot = { v: NA, kind: 'series', declId: s.id + '_' + ix }; scope.m.set(nm, slot); }
          slot.v = arr[ix] !== undefined ? arr[ix] : NA;
          if (this.histNames.has(nm)) {
            const buf = this.st('vbuf:' + s.id + ':' + ix + ':' + this.ctx, () => new Array(this.N));
            buf[this.bar] = slot.v; slot.buf = buf;
          }
        });
        return v;
      }
      case 'assign': {
        const slot = scope.lookup(s.name);
        if (!slot) throw pineErr(s.line, `未宣言の変数への代入: ${s.name}`);
        slot.v = this.evalE(s.expr, scope);
        if (slot.buf) slot.buf[this.bar] = slot.v;
        return slot.v;
      }
      case 'exprstmt': return this.evalE(s.expr, scope);
      case 'if': {
        if (T(this.evalE(s.cond, scope))) return this.execBlock(s.thenB, new Scope(scope));
        else if (s.elseB) return this.execBlock(s.elseB, new Scope(scope));
        return NA;
      }
      case 'for': {
        const from = this.evalE(s.fromE, scope), to = this.evalE(s.toE, scope);
        let by = s.byE ? this.evalE(s.byE, scope) : (from <= to ? 1 : -1);
        if (by === 0 || isNa(by) || isNa(from) || isNa(to)) return NA;
        let last = NA, guard = 0;
        const sc = new Scope(scope);
        const slot = { v: from, kind: 'series' }; sc.m.set(s.name, slot);
        for (let x = from; by > 0 ? x <= to : x >= to; x += by) {
          slot.v = x;
          try { last = this.execBlock(s.body, new Scope(sc)); }
          catch (e) { if (e === BREAK) break; if (e === CONTINUE) continue; throw e; }
          if (++guard > 100000) { this.warnings.add(`${s.line}行目: forループが100000回で打ち切られました`); break; }
        }
        return last;
      }
      case 'break': throw BREAK;
      case 'continue': throw CONTINUE;
    }
    return NA;
  }

  snap(declNode, slot) {
    if (!this.histNames.has(declNode.name)) return;
    if (!slot.buf) slot.buf = this.st('vbuf:' + declNode.id + ':' + this.ctx, () => new Array(this.N));
    slot.buf[this.bar] = slot.v;
  }

  /* ---- expression evaluation ---- */
  evalE(n, scope) {
    switch (n.k) {
      case 'num': case 'str': case 'bool': return n.v;
      case 'tuple': return n.els.map(e => this.evalE(e, scope));
      case 'ident': return this.evalIdent(n, scope);
      case 'un': {
        const v = this.evalE(n.e, scope);
        if (n.op === '-') return -v;
        if (n.op === 'not') return !T(v);
        return v;
      }
      case 'bin': {
        const op = n.op;
        const l = this.evalE(n.l, scope);
        const r = this.evalE(n.r, scope);   // eager (Pine v5 semantics; keeps ta.* state consistent)
        switch (op) {
          case '+': return (typeof l === 'string' || typeof r === 'string') ? String(l) + String(r) : l + r;
          case '-': return l - r; case '*': return l * r; case '/': return l / r; case '%': return l % r;
          case '==': return isNa(l) && isNa(r) ? true : l === r;
          case '!=': return isNa(l) && isNa(r) ? false : l !== r;
          case '<': return l < r; case '>': return l > r; case '<=': return l <= r; case '>=': return l >= r;
          case 'and': return T(l) && T(r);
          case 'or': return T(l) || T(r);
        }
        return NA;
      }
      case 'ternary': {
        if (n.lazy) return T(this.evalE(n.c, scope)) ? this.evalE(n.a, scope) : this.evalE(n.b, scope);
        const c = T(this.evalE(n.c, scope));
        const a = this.evalE(n.a, scope), b = this.evalE(n.b, scope);
        return c ? a : b;
      }
      case 'hist': return this.evalHist(n, scope);
      case 'call': return this.evalCall(n, scope);
    }
    return NA;
  }

  builtinSeries(name, i) {
    const d = this.data;
    switch (name) {
      case 'open': return d.o[i]; case 'high': return d.h[i]; case 'low': return d.l[i];
      case 'close': return d.c[i]; case 'volume': return d.v[i];
      case 'hl2': return (d.h[i] + d.l[i]) / 2;
      case 'hlc3': return (d.h[i] + d.l[i] + d.c[i]) / 3;
      case 'ohlc4': return (d.o[i] + d.h[i] + d.l[i] + d.c[i]) / 4;
      case 'hlcc4': return (d.h[i] + d.l[i] + d.c[i] + d.c[i]) / 4;
      case 'time': return d.t[i];
    }
    return undefined;
  }

  evalIdent(n, scope) {
    const name = n.name;
    const slot = scope.lookup(name);
    if (slot) return slot.v;
    const bs = this.builtinSeries(name, this.bar);
    if (bs !== undefined) return bs;
    if (name === 'na') return NA;
    if (name === 'bar_index') return this.bar;
    if (name === 'last_bar_index') return this.N - 1;
    if (name === 'barstate.islast') return this.bar === this.N - 1;
    if (name === 'barstate.isconfirmed' || name === 'barstate.ishistory') return true;
    if (name === 'barstate.isrealtime' || name === 'barstate.isfirst' ) return name === 'barstate.isfirst' ? this.bar === 0 : false;
    if (name in CONSTS) return CONSTS[name];
    if (name in PINE_COLORS) return PINE_COLORS[name];
    if (name.startsWith('strategy.')) { const v = this.broker.getter(name); if (v !== undefined) return v; }
    if (name === 'syminfo.mintick') return this.mintick;
    if (name === 'syminfo.ticker' || name === 'syminfo.tickerid') return this.set.symbol || 'SYM';
    if (name === 'syminfo.pointvalue') return 1;
    if (name === 'timeframe.period') return this.set.timeframe || '';
    if (name === 'timeframe.multiplier') return parseFloat(this.set.timeframe) || 1;
    if (name === 'timenow') return this.data.t[this.N - 1];
    const dt = new Date(this.data.t[this.bar]);
    switch (name) {
      case 'year': return dt.getUTCFullYear();
      case 'month': return dt.getUTCMonth() + 1;
      case 'dayofmonth': return dt.getUTCDate();
      case 'dayofweek': return dt.getUTCDay() + 1;   // Pine: Sunday=1
      case 'hour': return dt.getUTCHours();
      case 'minute': return dt.getUTCMinutes();
      case 'second': return dt.getUTCSeconds();
    }
    throw pineErr(n.line, `未定義の識別子: ${name}`);
  }

  evalHist(n, scope) {
    const off = this.evalE(n.n, scope);
    if (isNa(off) || off < 0) return NA;
    const k = Math.floor(off);
    // built-in series: direct array access
    if (n.base.k === 'ident') {
      const name = n.base.name;
      if (!scope.lookup(name)) {
        const idx = this.bar - k;
        if (this.builtinSeries(name, 0) !== undefined || ['time'].includes(name)) {
          return idx < 0 ? NA : this.builtinSeries(name, idx);
        }
        if (name === 'bar_index') return idx < 0 ? NA : idx;
      } else {
        const slot = scope.lookup(name);
        if (slot.buf) {
          if (k === 0) return slot.v;
          const idx = this.bar - k;
          const v = idx >= 0 ? slot.buf[idx] : undefined;
          return v === undefined ? NA : v;
        }
        // param or non-tracked local: fall through to node-buffer
      }
    }
    // generic: node ring buffer
    const cur = this.evalE(n.base, scope);
    const buf = this.st('hbuf:' + this.nodeKey(n), () => new Array(this.N));
    buf[this.bar] = cur;
    if (k === 0) return cur;
    const idx = this.bar - k;
    const v = idx >= 0 ? buf[idx] : undefined;
    return v === undefined ? NA : v;
  }

  evalCall(n, scope) {
    const callee = n.callee;
    // user function
    const fn = this.funcs.get(callee);
    if (fn) {
      if (++this.depth > 60) { this.depth--; throw pineErr(n.line, '関数の再帰が深すぎます'); }
      const args = n.args.map(a => this.evalE(a, scope));
      const sc = new Scope(this.globals);
      fn.params.forEach((p, ix) => {
        let v = args[ix];
        if (v === undefined && n.kwargs[p.name]) v = this.evalE(n.kwargs[p.name], scope);
        if (v === undefined && p.def) v = this.evalE(p.def, scope);
        sc.m.set(p.name, { v: v === undefined ? NA : v, kind: 'param' });
      });
      const prevCtx = this.ctx;
      this.ctx = prevCtx + '/' + n.id;
      let ret;
      try {
        ret = fn.body.expr ? this.evalE(fn.body.expr, sc) : this.execBlock(fn.body.block, sc);
      } finally { this.ctx = prevCtx; this.depth--; }
      return ret;
    }
    const impl = BUILTINS[callee];
    if (impl) return impl(this, n, scope);
    if (NOOP_RE.test(callee)) { n.args.forEach(a => this.evalE(a, scope)); for (const k in n.kwargs) this.evalE(n.kwargs[k], scope); return NA; }
    if (callee.startsWith('request.')) throw pineErr(n.line, 'request.security 等のマルチシンボル/マルチTF機能は v1 未対応です(ロードマップ参照)');
    if (callee.startsWith('array.') || callee.startsWith('matrix.') || callee.startsWith('map.')) throw pineErr(n.line, `${callee.split('.')[0]}.* は v1 未対応です(ロードマップ参照)`);
    throw pineErr(n.line, `未対応の関数: ${callee}`);
  }

  arg(n, scope, idx, name, def) {
    if (n.kwargs[name] !== undefined) return this.evalE(n.kwargs[name], scope);
    if (n.args[idx] !== undefined) return this.evalE(n.args[idx], scope);
    return def;
  }
}

const NOOP_RE = /^(hline|bgcolor|barcolor|fill|alertcondition|alert|plotchar|plotarrow|plotcandle|plotbar|label\.|line\.|box\.|table\.|polyline\.|log\.|runtime\.error$|max_bars_back)/;

/* ============================================================
   5. BUILT-IN FUNCTIONS
   ============================================================ */
const BUILTINS = {};
const B = (names, fn) => names.split(' ').forEach(nm => BUILTINS[nm] = fn);

/* --- declaration / inputs / plots --- */
B('strategy indicator study', () => NA);
B('input input.int input.float input.bool input.string input.source input.timeframe input.symbol input.session input.price input.color input.time input.text_area', (rt, n, scope) => {
  const key = n._inputKey;
  let v = key !== undefined && rt.inputs[key] !== undefined ? rt.inputs[key] : undefined;
  if (v === undefined) {
    v = n.kwargs.defval !== undefined ? staticEval(n.kwargs.defval) : (n.args[0] !== undefined ? staticEval(n.args[0]) : undefined);
    if (v === undefined && n.args[0] && n.args[0].k === 'ident') v = n.args[0].name;
  }
  if ((n.callee === 'input.source' || (typeof v === 'string' && rt.builtinSeries(v, 0) !== undefined))
      && typeof v === 'string' && rt.builtinSeries(v, 0) !== undefined) return rt.builtinSeries(v, rt.bar);
  return v === undefined ? NA : v;
});
B('plot', (rt, n, scope) => {
  const v = rt.arg(n, scope, 0, 'series', NA);
  let p = rt.plots.get(n.id);
  if (!p) {
    const title = n.kwargs.title ? staticEval(n.kwargs.title) : (n.args[1] ? staticEval(n.args[1]) : null);
    const color = n.kwargs.color ? staticEval(n.kwargs.color) : (n.args[2] ? staticEval(n.args[2]) : null);
    const style = n.kwargs.style ? staticEval(n.kwargs.style) : 'line';
    p = { title: title || `plot ${rt.plots.size + 1}`, color: typeof color === 'string' ? color : null, style, data: new Float64Array(rt.N).fill(NA) };
    rt.plots.set(n.id, p);
  }
  p.data[rt.bar] = typeof v === 'number' ? v : NA;
  // evaluate remaining args for state consistency
  for (const k in n.kwargs) if (k !== 'title' && k !== 'series') rt.evalE(n.kwargs[k], scope);
  return NA;
});
B('plotshape', (rt, n, scope) => { rt.arg(n, scope, 0, 'series', NA); return NA; });

/* --- na / casting --- */
B('na', (rt, n, s) => isNa(rt.arg(n, s, 0, 'source', NA)));
B('nz', (rt, n, s) => { const v = rt.arg(n, s, 0, 'source', NA); const r = rt.arg(n, s, 1, 'replacement', 0); return isNa(v) ? r : v; });
B('fixnan', (rt, n, s) => { const v = rt.arg(n, s, 0, 'source', NA); const st = rt.st('fx:' + rt.nodeKey(n), () => ({ last: NA })); if (!isNa(v)) st.last = v; return st.last; });
B('int math.int', (rt, n, s) => { const v = rt.arg(n, s, 0, 'x', NA); return isNa(v) ? NA : Math.trunc(v); });
B('float', (rt, n, s) => rt.arg(n, s, 0, 'x', NA));
B('bool', (rt, n, s) => T(rt.arg(n, s, 0, 'x', NA)));
B('str.tostring', (rt, n, s) => { const v = rt.arg(n, s, 0, 'value', NA); return typeof v === 'number' ? (Number.isInteger(v) ? String(v) : v.toFixed(8).replace(/0+$/, '').replace(/\.$/, '')) : String(v); });
B('str.tonumber', (rt, n, s) => { const v = parseFloat(rt.arg(n, s, 0, 'string', '')); return isNaN(v) ? NA : v; });
B('color.new color.rgb color.from_gradient', (rt, n, s) => { const v = rt.arg(n, s, 0, 'color', '#00D4FF'); return typeof v === 'string' ? v : '#00D4FF'; });
B('timestamp', (rt, n, s) => { const y = rt.arg(n,s,0,'year',1970), mo = rt.arg(n,s,1,'month',1), d = rt.arg(n,s,2,'day',1), h = rt.arg(n,s,3,'hour',0), mi = rt.arg(n,s,4,'minute',0); return Date.UTC(y, mo-1, d, h, mi); });
B('time_fn hour minute second dayofweek dayofmonth month year', (rt, n, s) => {
  const t = rt.arg(n, s, 0, 'time', rt.data.t[rt.bar]); const dt = new Date(t);
  switch (n.callee) { case 'hour': return dt.getUTCHours(); case 'minute': return dt.getUTCMinutes(); case 'second': return dt.getUTCSeconds();
    case 'dayofweek': return dt.getUTCDay() + 1; case 'dayofmonth': return dt.getUTCDate(); case 'month': return dt.getUTCMonth() + 1; case 'year': return dt.getUTCFullYear(); }
  return NA;
});
B('timeframe.in_seconds', (rt) => (rt.set.tfMs || 60000) / 1000);

/* --- math --- */
B('math.abs', (rt, n, s) => Math.abs(rt.arg(n, s, 0, 'number', NA)));
B('math.sign', (rt, n, s) => Math.sign(rt.arg(n, s, 0, 'number', NA)));
B('math.sqrt', (rt, n, s) => Math.sqrt(rt.arg(n, s, 0, 'number', NA)));
B('math.pow', (rt, n, s) => Math.pow(rt.arg(n, s, 0, 'base', NA), rt.arg(n, s, 1, 'exponent', NA)));
B('math.exp', (rt, n, s) => Math.exp(rt.arg(n, s, 0, 'number', NA)));
B('math.log', (rt, n, s) => Math.log(rt.arg(n, s, 0, 'number', NA)));
B('math.log10', (rt, n, s) => Math.log10(rt.arg(n, s, 0, 'number', NA)));
B('math.floor', (rt, n, s) => Math.floor(rt.arg(n, s, 0, 'number', NA)));
B('math.ceil', (rt, n, s) => Math.ceil(rt.arg(n, s, 0, 'number', NA)));
B('math.round', (rt, n, s) => { const v = rt.arg(n, s, 0, 'number', NA), p = rt.arg(n, s, 1, 'precision', 0); const m = Math.pow(10, p); return Math.round(v * m) / m; });
B('math.round_to_mintick', (rt, n, s) => { const v = rt.arg(n, s, 0, 'number', NA); return Math.round(v / rt.mintick) * rt.mintick; });
B('math.max', (rt, n, s) => Math.max(...n.args.map(a => rt.evalE(a, s))));
B('math.min', (rt, n, s) => Math.min(...n.args.map(a => rt.evalE(a, s))));
B('math.avg', (rt, n, s) => { const vs = n.args.map(a => rt.evalE(a, s)); return vs.reduce((a, b) => a + b, 0) / vs.length; });
B('math.sin', (rt, n, s) => Math.sin(rt.arg(n, s, 0, 'angle', NA)));
B('math.cos', (rt, n, s) => Math.cos(rt.arg(n, s, 0, 'angle', NA)));
B('math.tan', (rt, n, s) => Math.tan(rt.arg(n, s, 0, 'angle', NA)));
B('math.atan', (rt, n, s) => Math.atan(rt.arg(n, s, 0, 'angle', NA)));
B('math.asin', (rt, n, s) => Math.asin(rt.arg(n, s, 0, 'angle', NA)));
B('math.acos', (rt, n, s) => Math.acos(rt.arg(n, s, 0, 'angle', NA)));
B('math.sum', (rt, n, s) => {
  const v = rt.arg(n, s, 0, 'source', NA), len = rt.arg(n, s, 1, 'length', 1) | 0;
  const w = rt.st('msum:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  return w.full ? w.sum : NA;
});
B('math.todegrees', (rt, n, s) => rt.arg(n, s, 0, 'radians', NA) * 180 / Math.PI);
B('math.toradians', (rt, n, s) => rt.arg(n, s, 0, 'degrees', NA) * Math.PI / 180);

/* --- ta: moving averages & core --- */
function taSrcLen(rt, n, s, defLen) {
  const src = rt.arg(n, s, 0, 'source', NA);
  const len = Math.max(1, rt.arg(n, s, 1, 'length', defLen) | 0);
  return [src, len];
}
B('ta.sma', (rt, n, s) => { const [v, len] = taSrcLen(rt, n, s, 14); const w = rt.st('sma:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v); return w.mean(); });
B('ta.ema', (rt, n, s) => { const [v, len] = taSrcLen(rt, n, s, 14); return rt.st('ema:' + rt.nodeKey(n) + ':' + len, () => mkEMA(len)).push(v); });
B('ta.rma', (rt, n, s) => { const [v, len] = taSrcLen(rt, n, s, 14); return rt.st('rma:' + rt.nodeKey(n) + ':' + len, () => mkRMA(len)).push(v); });
B('ta.wma', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 14);
  const w = rt.st('wma:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  if (!w.full) return NA;
  let num = 0; w.each((x, k) => { num += x * (k + 1); });
  return num / (len * (len + 1) / 2);
});
B('ta.vwma', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 14);
  const vol = rt.data.v[rt.bar];
  const wa = rt.st('vwma_a:' + rt.nodeKey(n) + ':' + len, () => new Win(len));
  const wb = rt.st('vwma_b:' + rt.nodeKey(n) + ':' + len, () => new Win(len));
  wa.push(v * vol); wb.push(vol);
  return (wa.full && wb.full && wb.sum !== 0) ? wa.sum / wb.sum : NA;
});
B('ta.hma', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 14);
  const key = rt.nodeKey(n) + ':' + len;
  const w1 = rt.st('hma1:' + key, () => new Win(Math.max(1, Math.floor(len / 2))));
  const w2 = rt.st('hma2:' + key, () => new Win(len));
  const w3 = rt.st('hma3:' + key, () => new Win(Math.max(1, Math.round(Math.sqrt(len)))));
  const wmaOf = (w) => { if (!w.full) return NA; let num = 0; w.each((x, k) => num += x * (k + 1)); return num / (w.len * (w.len + 1) / 2); };
  w1.push(v); w2.push(v);
  const a = wmaOf(w1), b = wmaOf(w2);
  const raw = 2 * a - b;
  w3.push(raw);
  return wmaOf(w3);
});
B('ta.change', (rt, n, s) => {
  const v = rt.arg(n, s, 0, 'source', NA); const len = Math.max(1, rt.arg(n, s, 1, 'length', 1) | 0);
  const w = rt.st('chg:' + rt.nodeKey(n) + ':' + len, () => new Win(len + 1)); w.push(v);
  const past = w.at(len); return isNa(past) || isNa(v) ? NA : v - past;
});
B('ta.mom', (rt, n, s) => BUILTINS['ta.change'](rt, n, s));
B('ta.roc', (rt, n, s) => {
  const v = rt.arg(n, s, 0, 'source', NA); const len = Math.max(1, rt.arg(n, s, 1, 'length', 1) | 0);
  const w = rt.st('roc:' + rt.nodeKey(n) + ':' + len, () => new Win(len + 1)); w.push(v);
  const past = w.at(len); return isNa(past) || past === 0 ? NA : 100 * (v - past) / past;
});
B('ta.cum', (rt, n, s) => { const v = rt.arg(n, s, 0, 'source', NA); const st = rt.st('cum:' + rt.nodeKey(n), () => ({ c: 0 })); if (!isNa(v)) st.c += v; return st.c; });
B('ta.stdev', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 20);
  const biased = rt.arg(n, s, 2, 'biased', true);
  const w = rt.st('sd:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  if (!w.full) return NA;
  const mean = w.sum / len;
  const va = Math.max(0, w.sq / len - mean * mean);
  return T(biased) ? Math.sqrt(va) : Math.sqrt(va * len / (len - 1));
});
B('ta.variance', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 20);
  const w = rt.st('var:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  if (!w.full) return NA;
  const mean = w.sum / len;
  return Math.max(0, w.sq / len - mean * mean);
});
B('ta.dev', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 20);
  const w = rt.st('dev:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  if (!w.full) return NA;
  const mean = w.sum / len; let d = 0; w.each(x => d += Math.abs(x - mean));
  return d / len;
});
B('ta.highest', (rt, n, s) => {
  let src, len;
  if (n.args.length >= 2 || (n.kwargs.source !== undefined)) { src = rt.arg(n, s, 0, 'source', NA); len = rt.arg(n, s, 1, 'length', 10) | 0; }
  else { src = rt.data.h[rt.bar]; len = rt.arg(n, s, 0, 'length', 10) | 0; }
  const d = rt.st('hh:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, true)); d.push(src); return d.val;
});
B('ta.lowest', (rt, n, s) => {
  let src, len;
  if (n.args.length >= 2 || (n.kwargs.source !== undefined)) { src = rt.arg(n, s, 0, 'source', NA); len = rt.arg(n, s, 1, 'length', 10) | 0; }
  else { src = rt.data.l[rt.bar]; len = rt.arg(n, s, 0, 'length', 10) | 0; }
  const d = rt.st('ll:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, false)); d.push(src); return d.val;
});
B('ta.highestbars', (rt, n, s) => {
  let src, len;
  if (n.args.length >= 2) { src = rt.arg(n, s, 0, 'source', NA); len = rt.arg(n, s, 1, 'length', 10) | 0; }
  else { src = rt.data.h[rt.bar]; len = rt.arg(n, s, 0, 'length', 10) | 0; }
  const d = rt.st('hhb:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, true)); d.push(src);
  return isNa(d.val) ? NA : -d.idxBack;
});
B('ta.lowestbars', (rt, n, s) => {
  let src, len;
  if (n.args.length >= 2) { src = rt.arg(n, s, 0, 'source', NA); len = rt.arg(n, s, 1, 'length', 10) | 0; }
  else { src = rt.data.l[rt.bar]; len = rt.arg(n, s, 0, 'length', 10) | 0; }
  const d = rt.st('llb:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, false)); d.push(src);
  return isNa(d.val) ? NA : -d.idxBack;
});
B('ta.crossover', (rt, n, s) => {
  const a = rt.arg(n, s, 0, 'source1', NA), b = rt.arg(n, s, 1, 'source2', NA);
  const st = rt.st('xo:' + rt.nodeKey(n), () => ({ pa: NA, pb: NA }));
  const r = !isNa(a) && !isNa(b) && !isNa(st.pa) && !isNa(st.pb) && a > b && st.pa <= st.pb;
  st.pa = a; st.pb = b; return r;
});
B('ta.crossunder', (rt, n, s) => {
  const a = rt.arg(n, s, 0, 'source1', NA), b = rt.arg(n, s, 1, 'source2', NA);
  const st = rt.st('xu:' + rt.nodeKey(n), () => ({ pa: NA, pb: NA }));
  const r = !isNa(a) && !isNa(b) && !isNa(st.pa) && !isNa(st.pb) && a < b && st.pa >= st.pb;
  st.pa = a; st.pb = b; return r;
});
B('ta.cross', (rt, n, s) => {
  const a = rt.arg(n, s, 0, 'source1', NA), b = rt.arg(n, s, 1, 'source2', NA);
  const st = rt.st('x:' + rt.nodeKey(n), () => ({ pa: NA, pb: NA }));
  const r = !isNa(a) && !isNa(b) && !isNa(st.pa) && !isNa(st.pb) && ((a > b && st.pa <= st.pb) || (a < b && st.pa >= st.pb));
  st.pa = a; st.pb = b; return r;
});
B('ta.rising', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 1);
  const w = rt.st('ris:' + rt.nodeKey(n) + ':' + len, () => new Win(len + 1)); w.push(v);
  if (w.n < len + 1 || w.naC > 0) return false;
  for (let k = 0; k < len; k++) if (!(w.at(k) > w.at(k + 1))) return false;
  return true;
});
B('ta.falling', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 1);
  const w = rt.st('fal:' + rt.nodeKey(n) + ':' + len, () => new Win(len + 1)); w.push(v);
  if (w.n < len + 1 || w.naC > 0) return false;
  for (let k = 0; k < len; k++) if (!(w.at(k) < w.at(k + 1))) return false;
  return true;
});
B('ta.barssince', (rt, n, s) => {
  const c = T(rt.arg(n, s, 0, 'condition', false));
  const st = rt.st('bs:' + rt.nodeKey(n), () => ({ n: NA }));
  if (c) st.n = 0; else if (!isNa(st.n)) st.n++;
  return st.n;
});
B('ta.valuewhen', (rt, n, s) => {
  const c = T(rt.arg(n, s, 0, 'condition', false));
  const src = rt.arg(n, s, 1, 'source', NA);
  const occ = rt.arg(n, s, 2, 'occurrence', 0) | 0;
  const st = rt.st('vw:' + rt.nodeKey(n), () => ({ vals: [] }));
  if (c) { st.vals.unshift(src); if (st.vals.length > occ + 2) st.vals.pop(); }
  return st.vals[occ] !== undefined ? st.vals[occ] : NA;
});
/* --- ta: oscillators --- */
B('ta.rsi', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 14);
  const st = rt.st('rsi:' + rt.nodeKey(n) + ':' + len, () => ({ up: mkRMA(len), dn: mkRMA(len), prev: NA }));
  if (isNa(v)) return NA;
  if (isNa(st.prev)) { st.prev = v; return NA; }
  const ch = v - st.prev; st.prev = v;
  const u = st.up.push(Math.max(ch, 0)), d = st.dn.push(Math.max(-ch, 0));
  if (isNa(u) || isNa(d)) return NA;
  if (d === 0) return u === 0 ? 50 : 100;
  return 100 - 100 / (1 + u / d);
});
B('ta.tr', (rt, n, s) => {
  const handleNa = n.args[0] !== undefined ? T(rt.evalE(n.args[0], s)) : true;
  const i = rt.bar, d = rt.data;
  if (i === 0) return handleNa ? d.h[0] - d.l[0] : NA;
  const pc = d.c[i - 1];
  return Math.max(d.h[i] - d.l[i], Math.abs(d.h[i] - pc), Math.abs(d.l[i] - pc));
});
B('ta.atr', (rt, n, s) => {
  const len = Math.max(1, rt.arg(n, s, 0, 'length', 14) | 0);
  const st = rt.st('atr:' + rt.nodeKey(n) + ':' + len, () => mkRMA(len));
  const i = rt.bar, d = rt.data;
  const tr = i === 0 ? d.h[0] - d.l[0] : Math.max(d.h[i] - d.l[i], Math.abs(d.h[i] - d.c[i-1]), Math.abs(d.l[i] - d.c[i-1]));
  return st.push(tr);
});
B('ta.macd', (rt, n, s) => {
  const src = rt.arg(n, s, 0, 'source', NA);
  const f = Math.max(1, rt.arg(n, s, 1, 'fastlen', 12) | 0);
  const sl = Math.max(1, rt.arg(n, s, 2, 'slowlen', 26) | 0);
  const sg = Math.max(1, rt.arg(n, s, 3, 'siglen', 9) | 0);
  const st = rt.st('macd:' + rt.nodeKey(n) + `:${f}:${sl}:${sg}`, () => ({ f: mkEMA(f), s: mkEMA(sl), sig: mkEMA(sg) }));
  const line = st.f.push(src) - st.s.push(src);
  const sig = st.sig.push(line);
  return [line, sig, line - sig];
});
B('ta.stoch', (rt, n, s) => {
  const src = rt.arg(n, s, 0, 'source', rt.data.c[rt.bar]);
  const hi = rt.arg(n, s, 1, 'high', rt.data.h[rt.bar]);
  const lo = rt.arg(n, s, 2, 'low', rt.data.l[rt.bar]);
  const len = Math.max(1, rt.arg(n, s, 3, 'length', 14) | 0);
  const dh = rt.st('sth:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, true));
  const dl = rt.st('stl:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, false));
  dh.push(hi); dl.push(lo);
  const hh = dh.val, ll = dl.val;
  if (isNa(hh) || isNa(ll) || hh === ll) return NA;
  return 100 * (src - ll) / (hh - ll);
});
B('ta.cci', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 20);
  const w = rt.st('cci:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  if (!w.full) return NA;
  const mean = w.sum / len; let dev = 0; w.each(x => dev += Math.abs(x - mean));
  dev /= len;
  return dev === 0 ? 0 : (v - mean) / (0.015 * dev);
});
B('ta.wpr', (rt, n, s) => {
  const len = Math.max(1, rt.arg(n, s, 0, 'length', 14) | 0);
  const dh = rt.st('wprh:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, true));
  const dl = rt.st('wprl:' + rt.nodeKey(n) + ':' + len, () => new MaxDeque(len, false));
  dh.push(rt.data.h[rt.bar]); dl.push(rt.data.l[rt.bar]);
  const hh = dh.val, ll = dl.val;
  if (isNa(hh) || isNa(ll) || hh === ll) return NA;
  return (hh - rt.data.c[rt.bar]) / (hh - ll) * -100;
});
B('ta.mfi', (rt, n, s) => {
  const src = rt.arg(n, s, 0, 'series', (rt.data.h[rt.bar] + rt.data.l[rt.bar] + rt.data.c[rt.bar]) / 3);
  const len = Math.max(1, rt.arg(n, s, 1, 'length', 14) | 0);
  const st = rt.st('mfi:' + rt.nodeKey(n) + ':' + len, () => ({ pos: new Win(len), neg: new Win(len), prev: NA }));
  const mf = src * rt.data.v[rt.bar];
  if (isNa(st.prev)) { st.prev = src; st.pos.push(NA); st.neg.push(NA); return NA; }
  st.pos.push(src > st.prev ? mf : 0);
  st.neg.push(src < st.prev ? mf : 0);
  st.prev = src;
  if (!st.pos.full || !st.neg.full) return NA;
  if (st.neg.sum === 0) return 100;
  return 100 - 100 / (1 + st.pos.sum / st.neg.sum);
});
B('ta.obv', (rt, n, s) => {
  const st = rt.st('obv:' + rt.nodeKey(n), () => ({ c: 0, prev: NA }));
  const cl = rt.data.c[rt.bar], v = rt.data.v[rt.bar];
  if (!isNa(st.prev)) st.c += Math.sign(cl - st.prev) * (isNa(v) ? 0 : v);
  st.prev = cl;
  return st.c;
});
B('ta.bb', (rt, n, s) => {
  const src = rt.arg(n, s, 0, 'series', NA);
  const len = Math.max(1, rt.arg(n, s, 1, 'length', 20) | 0);
  const mult = rt.arg(n, s, 2, 'mult', 2);
  const w = rt.st('bb:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(src);
  if (!w.full) return [NA, NA, NA];
  const mean = w.sum / len;
  const sd = Math.sqrt(Math.max(0, w.sq / len - mean * mean));
  return [mean, mean + mult * sd, mean - mult * sd];
});
B('ta.bbw', (rt, n, s) => { const [m, u, l] = BUILTINS['ta.bb'](rt, n, s); return isNa(m) || m === 0 ? NA : (u - l) / m; });
B('ta.kc', (rt, n, s) => {
  const src = rt.arg(n, s, 0, 'series', NA);
  const len = Math.max(1, rt.arg(n, s, 1, 'length', 20) | 0);
  const mult = rt.arg(n, s, 2, 'mult', 2);
  const st = rt.st('kc:' + rt.nodeKey(n) + ':' + len, () => ({ ema: mkEMA(len), atr: mkRMA(len) }));
  const i = rt.bar, d = rt.data;
  const tr = i === 0 ? d.h[0] - d.l[0] : Math.max(d.h[i] - d.l[i], Math.abs(d.h[i] - d.c[i-1]), Math.abs(d.l[i] - d.c[i-1]));
  const basis = st.ema.push(src), range = st.atr.push(tr);
  return [basis, basis + range * mult, basis - range * mult];
});
B('ta.vwap', (rt, n, s) => {
  const src = n.args.length ? rt.arg(n, s, 0, 'source', NA) : (rt.data.h[rt.bar] + rt.data.l[rt.bar] + rt.data.c[rt.bar]) / 3;
  const st = rt.st('vwap:' + rt.nodeKey(n), () => ({ day: -1, pv: 0, vv: 0 }));
  const day = Math.floor(rt.data.t[rt.bar] / 86400000);
  if (day !== st.day) { st.day = day; st.pv = 0; st.vv = 0; }
  const vol = rt.data.v[rt.bar];
  if (!isNa(src) && !isNa(vol)) { st.pv += src * vol; st.vv += vol; }
  return st.vv === 0 ? NA : st.pv / st.vv;
});
B('ta.linreg', (rt, n, s) => {
  const src = rt.arg(n, s, 0, 'source', NA);
  const len = Math.max(2, rt.arg(n, s, 1, 'length', 14) | 0);
  const off = rt.arg(n, s, 2, 'offset', 0);
  const w = rt.st('lr:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(src);
  if (!w.full) return NA;
  let sx = 0, sy = 0, sxy = 0, sx2 = 0;
  w.each((y, x) => { sx += x; sy += y; sxy += x * y; sx2 += x * x; });
  const slope = (len * sxy - sx * sy) / (len * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / len;
  return intercept + slope * (len - 1 - off);
});
B('ta.pivothigh', (rt, n, s) => {
  let src, left, right;
  if (n.args.length >= 3) { src = rt.arg(n, s, 0, 'source', NA); left = rt.arg(n, s, 1, 'leftbars', 5) | 0; right = rt.arg(n, s, 2, 'rightbars', 5) | 0; }
  else { src = rt.data.h[rt.bar]; left = rt.arg(n, s, 0, 'leftbars', 5) | 0; right = rt.arg(n, s, 1, 'rightbars', 5) | 0; }
  const size = left + right + 1;
  const w = rt.st('ph:' + rt.nodeKey(n) + ':' + size, () => new Win(size)); w.push(src);
  if (w.n < size) return NA;
  const cand = w.at(right);
  for (let k = 0; k < size; k++) { if (k === right) continue; if (!(w.at(k) < cand)) return NA; }
  return cand;
});
B('ta.pivotlow', (rt, n, s) => {
  let src, left, right;
  if (n.args.length >= 3) { src = rt.arg(n, s, 0, 'source', NA); left = rt.arg(n, s, 1, 'leftbars', 5) | 0; right = rt.arg(n, s, 2, 'rightbars', 5) | 0; }
  else { src = rt.data.l[rt.bar]; left = rt.arg(n, s, 0, 'leftbars', 5) | 0; right = rt.arg(n, s, 1, 'rightbars', 5) | 0; }
  const size = left + right + 1;
  const w = rt.st('pl:' + rt.nodeKey(n) + ':' + size, () => new Win(size)); w.push(src);
  if (w.n < size) return NA;
  const cand = w.at(right);
  for (let k = 0; k < size; k++) { if (k === right) continue; if (!(w.at(k) > cand)) return NA; }
  return cand;
});
B('ta.supertrend', (rt, n, s) => {
  const factor = rt.arg(n, s, 0, 'factor', 3);
  const atrLen = Math.max(1, rt.arg(n, s, 1, 'atrPeriod', 10) | 0);
  const st = rt.st('spt:' + rt.nodeKey(n) + ':' + atrLen, () => ({ atr: mkRMA(atrLen), up: NA, lo: NA, dir: 1, stv: NA, prevC: NA, prevAtrNa: true }));
  const i = rt.bar, d = rt.data;
  const tr = i === 0 ? d.h[0] - d.l[0] : Math.max(d.h[i] - d.l[i], Math.abs(d.h[i] - d.c[i-1]), Math.abs(d.l[i] - d.c[i-1]));
  const atr = st.atr.push(tr);
  const hl2 = (d.h[i] + d.l[i]) / 2;
  if (isNa(atr)) { st.prevC = d.c[i]; return [NA, NA]; }
  let up = hl2 + factor * atr;
  let lo = hl2 - factor * atr;
  const pc = st.prevC;
  if (!isNa(st.lo)) lo = (lo > st.lo || pc < st.lo) ? lo : st.lo;
  if (!isNa(st.up)) up = (up < st.up || pc > st.up) ? up : st.up;
  let dir;
  if (st.prevAtrNa) dir = 1;
  else if (st.stv === st.up) dir = d.c[i] > up ? -1 : 1;
  else dir = d.c[i] < lo ? 1 : -1;
  const stv = dir === -1 ? lo : up;
  st.up = up; st.lo = lo; st.dir = dir; st.stv = stv; st.prevC = d.c[i]; st.prevAtrNa = false;
  return [stv, dir];
});
B('ta.percentrank', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 20);
  const w = rt.st('pr:' + rt.nodeKey(n) + ':' + (len + 1), () => new Win(len + 1)); w.push(v);
  if (w.n < len + 1 || w.naC > 0) return NA;
  let cnt = 0; for (let k = 1; k <= len; k++) if (w.at(k) <= v) cnt++;
  return cnt / len * 100;
});
B('ta.median', (rt, n, s) => {
  const [v, len] = taSrcLen(rt, n, s, 14);
  const w = rt.st('med:' + rt.nodeKey(n) + ':' + len, () => new Win(len)); w.push(v);
  if (!w.full) return NA;
  const arr = []; w.each(x => arr.push(x)); arr.sort((a, b) => a - b);
  const m = len >> 1;
  return len % 2 ? arr[m] : (arr[m - 1] + arr[m]) / 2;
});
B('ta.correlation', (rt, n, s) => {
  const a = rt.arg(n, s, 0, 'source1', NA), b = rt.arg(n, s, 1, 'source2', NA);
  const len = Math.max(2, rt.arg(n, s, 2, 'length', 20) | 0);
  const st = rt.st('cor:' + rt.nodeKey(n) + ':' + len, () => ({ wa: new Win(len), wb: new Win(len), wab: new Win(len) }));
  st.wa.push(a); st.wb.push(b); st.wab.push(a * b);
  if (!st.wa.full || !st.wb.full) return NA;
  const ma = st.wa.sum / len, mb = st.wb.sum / len;
  const cov = st.wab.sum / len - ma * mb;
  const va = st.wa.sq / len - ma * ma, vb = st.wb.sq / len - mb * mb;
  const d = Math.sqrt(Math.max(0, va) * Math.max(0, vb));
  return d === 0 ? NA : cov / d;
});

/* --- strategy.* functions --- */
B('strategy.entry', (rt, n, s) => {
  const id = rt.arg(n, s, 0, 'id', 'entry');
  const dirRaw = rt.arg(n, s, 1, 'direction', 'long');
  const qty = rt.arg(n, s, 2, 'qty', NA);
  const limit = rt.arg(n, s, 3, 'limit', NA);
  const stop = rt.arg(n, s, 4, 'stop', NA);
  const comment = rt.arg(n, s, 7, 'comment', '');
  rt.broker.placeEntry({ id: String(id), dir: dirRaw === 'short' ? -1 : 1, qty, limit, stop, comment, raw: false, bar: rt.bar });
  return NA;
});
B('strategy.order', (rt, n, s) => {
  const id = rt.arg(n, s, 0, 'id', 'order');
  const dirRaw = rt.arg(n, s, 1, 'direction', 'long');
  const qty = rt.arg(n, s, 2, 'qty', NA);
  const limit = rt.arg(n, s, 3, 'limit', NA);
  const stop = rt.arg(n, s, 4, 'stop', NA);
  const comment = rt.arg(n, s, 7, 'comment', '');
  rt.broker.placeEntry({ id: String(id), dir: dirRaw === 'short' ? -1 : 1, qty, limit, stop, comment, raw: true, bar: rt.bar });
  return NA;
});
B('strategy.close', (rt, n, s) => {
  const id = rt.arg(n, s, 0, 'id', '');
  const comment = rt.arg(n, s, 1, 'comment', '');
  const qtyPct = rt.arg(n, s, -1, 'qty_percent', 100);
  const qty = rt.arg(n, s, -1, 'qty', NA);
  rt.broker.placeClose({ id: String(id), comment, qty, qtyPct });
  return NA;
});
B('strategy.close_all', (rt, n, s) => { rt.broker.placeClose({ id: null, comment: rt.arg(n, s, 0, 'comment', '') , qty: NA, qtyPct: 100}); return NA; });
B('strategy.exit', (rt, n, s) => {
  const id = rt.arg(n, s, 0, 'id', 'exit');
  const from = rt.arg(n, s, 1, 'from_entry', '');
  const qty = rt.arg(n, s, 2, 'qty', NA);
  const qtyPct = rt.arg(n, s, 3, 'qty_percent', 100);
  const profit = rt.arg(n, s, 4, 'profit', NA);
  const limit = rt.arg(n, s, 5, 'limit', NA);
  const loss = rt.arg(n, s, 6, 'loss', NA);
  const stop = rt.arg(n, s, 7, 'stop', NA);
  const trailPrice = rt.arg(n, s, 8, 'trail_price', NA);
  const trailPoints = rt.arg(n, s, 9, 'trail_points', NA);
  const trailOffset = rt.arg(n, s, 10, 'trail_offset', NA);
  const comment = rt.arg(n, s, -1, 'comment', '');
  rt.broker.placeExit({ id: String(id), from: String(from), qty, qtyPct, profit, limit, loss, stop, trailPrice, trailPoints, trailOffset, comment });
  return NA;
});
B('strategy.cancel', (rt, n, s) => { rt.broker.cancel(String(rt.arg(n, s, 0, 'id', ''))); return NA; });
B('strategy.cancel_all', (rt) => { rt.broker.cancelAll(); return NA; });
B('strategy.closedtrades.profit', (rt, n, s) => { const i = rt.arg(n, s, 0, 'trade_num', 0) | 0; const t = rt.broker.closed[i]; return t ? t.pnl : NA; });
B('strategy.closedtrades.entry_price', (rt, n, s) => { const i = rt.arg(n, s, 0, 'trade_num', 0) | 0; const t = rt.broker.closed[i]; return t ? t.entryPrice : NA; });
B('strategy.closedtrades.exit_price', (rt, n, s) => { const i = rt.arg(n, s, 0, 'trade_num', 0) | 0; const t = rt.broker.closed[i]; return t ? t.exitPrice : NA; });

/* --- Pine v4 aliases (no ta./math. prefix) + risk noops --- */
['sma','ema','rma','wma','vwma','hma','rsi','atr','tr','macd','stoch','cci','mfi','obv','change','mom','roc','stdev','dev','variance','highest','lowest','highestbars','lowestbars','crossover','crossunder','cross','rising','falling','barssince','valuewhen','vwap','linreg','pivothigh','pivotlow','cum','bb','bbw','kc','wpr','supertrend','correlation','median','percentrank']
  .forEach(nm => { const impl = BUILTINS['ta.' + nm]; if (impl) BUILTINS[nm] = impl; });
['abs','max','min','pow','sqrt','exp','log','log10','floor','ceil','round','sign','avg','sin','cos','tan','sum']
  .forEach(nm => { const impl = BUILTINS['math.' + nm]; if (impl) BUILTINS[nm] = impl; });
B('strategy.risk.max_drawdown strategy.risk.max_intraday_loss strategy.risk.allow_entry_in strategy.risk.max_position_size strategy.risk.max_cons_loss_days', (rt, n, s) => {
  n.args.forEach(a => rt.evalE(a, s));
  rt.warnings.add('strategy.risk.* は v1 未対応のため無視されました');
  return NA;
});

/* ============================================================
   6. BROKER (order execution / position tracking)
   ============================================================ */
class Broker {
  constructor(rt) {
    this.rt = rt;
    const st = rt.set, decl = rt.decl;
    this.initial = num(st.initialCapital, decl.initial_capital, 100000);
    this.qtyType = st.qtyType || decl.default_qty_type || 'fixed';
    this.qtyValue = num(st.qtyValue, decl.default_qty_value, 1);
    this.commType = st.commType || decl.commission_type || 'percent';
    this.commValue = num(st.commValue, decl.commission_value, 0);
    this.slippage = num(st.slippage, decl.slippage, 0);
    this.pyramiding = Math.max(1, num(st.pyramiding, decl.pyramiding, 0) || 1);
    this.procOnClose = st.procOnClose !== undefined ? st.procOnClose : !!decl.process_orders_on_close;
    this.ambiguity = st.ambiguity || 'conservative';   // conservative | optimistic
    this.realized = 0;
    this.commPaid = 0;
    this.open = [];          // open trades
    this.closed = [];
    this.pendingMarket = []; // market orders to fill next open
    this.pendingEntry = new Map();  // stop/limit entry orders by id
    this.exits = new Map();  // exit brackets by exit id
    this.markers = [];
    this.equity = new Float64Array(rt.N);
    this.posSeries = new Int8Array(rt.N);
    this.tradeSeq = 0;
    this.maxOpenPnl = 0;
  }
  getter(name) {
    switch (name) {
      case 'strategy.position_size': return this.posQty();
      case 'strategy.position_avg_price': return this.avgPrice();
      case 'strategy.equity': return this.initial + this.realized + this.openPnl(this.rt.data.c[this.rt.bar]);
      case 'strategy.initial_capital': return this.initial;
      case 'strategy.opentrades': return this.open.length;
      case 'strategy.closedtrades': return this.closed.length;
      case 'strategy.netprofit': return this.realized;
      case 'strategy.openprofit': return this.openPnl(this.rt.data.c[this.rt.bar]);
      case 'strategy.grossprofit': return this.closed.reduce((a, t) => a + Math.max(t.pnl, 0), 0);
      case 'strategy.grossloss': return Math.abs(this.closed.reduce((a, t) => a + Math.min(t.pnl, 0), 0));
      case 'strategy.wintrades': return this.closed.filter(t => t.pnl > 0).length;
      case 'strategy.losstrades': return this.closed.filter(t => t.pnl < 0).length;
      case 'strategy.eventrades': return this.closed.filter(t => t.pnl === 0).length;
      case 'strategy.max_drawdown': return this._maxDD || 0;
    }
    return undefined;
  }
  posQty() { return this.open.reduce((a, t) => a + t.dir * t.qty, 0); }
  avgPrice() {
    if (!this.open.length) return NA;
    let q = 0, pq = 0;
    for (const t of this.open) { q += t.qty; pq += t.qty * t.entryPrice; }
    return q === 0 ? NA : pq / q;
  }
  openPnl(px) { return this.open.reduce((a, t) => a + t.dir * t.qty * (px - t.entryPrice), 0); }
  equityNow(px) { return this.initial + this.realized + this.openPnl(px); }

  commission(px, qty) {
    if (this.commType === 'percent') return px * qty * this.commValue / 100;
    if (this.commType === 'cash_per_contract') return qty * this.commValue;
    if (this.commType === 'cash_per_order') return this.commValue;
    return 0;
  }
  slip(px, dir) { return px + dir * this.slippage * this.rt.mintick; }

  resolveQty(ordQty, px) {
    if (!isNa(ordQty)) return ordQty;
    if (this.qtyType === 'fixed') return this.qtyValue;
    if (this.qtyType === 'cash') return this.qtyValue / px;
    if (this.qtyType === 'percent_of_equity') return Math.max(0, this.equityNow(px)) * this.qtyValue / 100 / px;
    return 1;
  }

  /* ---- order placement (called during script execution) ---- */
  placeEntry(o) {
    if (this.rt.decl.kind !== 'strategy') return;
    if (isNa(o.limit) && isNa(o.stop)) {
      this.pendingMarket = this.pendingMarket.filter(x => !(x.kind === 'entry' && x.id === o.id));
      this.pendingMarket.push({ kind: 'entry', ...o });
    } else {
      this.pendingEntry.set(o.id, o);
    }
    if (this.procOnClose) this.fillMarketOrders(this.rt.bar, this.rt.data.c[this.rt.bar], true);
  }
  placeClose(o) {
    if (this.rt.decl.kind !== 'strategy') return;
    this.pendingMarket.push({ kind: 'close', ...o });
    if (this.procOnClose) this.fillMarketOrders(this.rt.bar, this.rt.data.c[this.rt.bar], true);
  }
  placeExit(o) { if (this.rt.decl.kind === 'strategy') this.exits.set(o.id, { ...o, states: this.exits.get(o.id)?.states || new Map() }); }
  cancel(id) { this.pendingEntry.delete(id); this.exits.delete(id); this.pendingMarket = this.pendingMarket.filter(x => x.id !== id); }
  cancelAll() { this.pendingEntry.clear(); this.exits.clear(); this.pendingMarket = this.pendingMarket.filter(x => x.kind !== 'entry'); }

  /* ---- bar lifecycle ---- */
  onBarOpen(i) {
    if (i === 0) return;
    const d = this.rt.data;
    this.fillMarketOrders(i, d.o[i], false);
    this.processEntryStopLimit(i);
    this.processExits(i);
  }
  onBarClose(i) {
    const d = this.rt.data;
    // update MAE/MFE
    for (const t of this.open) {
      const adverse = t.dir > 0 ? (t.entryPrice - d.l[i]) : (d.h[i] - t.entryPrice);
      const favor = t.dir > 0 ? (d.h[i] - t.entryPrice) : (t.entryPrice - d.l[i]);
      t.mae = Math.max(t.mae, adverse / t.entryPrice * 100);
      t.mfe = Math.max(t.mfe, favor / t.entryPrice * 100);
      t.bars++;
    }
    this.equity[i] = this.equityNow(d.c[i]);
    this.posSeries[i] = Math.sign(this.posQty());
  }

  fillMarketOrders(i, px, onClose) {
    if (!this.pendingMarket.length) return;
    const orders = this.pendingMarket;
    this.pendingMarket = [];
    for (const o of orders) {
      if (o.kind === 'entry') this.fillEntry(o, i, this.slip(px, o.dir), onClose ? 'close' : 'open');
      else this.doClose(o, i, px);
    }
  }
  fillEntry(o, i, px, when) {
    const pos = this.posQty();
    // reversal: entry (non-raw) in opposite direction closes everything first
    if (!o.raw && pos !== 0 && Math.sign(pos) !== o.dir) this.closeAllAt(i, px, 'リバース', o.id);
    if (!o.raw) {
      const sameDir = this.open.filter(t => t.dir === o.dir).length;
      if (sameDir >= this.pyramiding) return;   // pyramiding cap
    }
    const qty = this.resolveQty(o.qty, px);
    if (!(qty > 0)) return;
    if (o.raw && this.posQty() !== 0 && Math.sign(this.posQty()) !== o.dir) {
      // strategy.order nets FIFO against existing position
      let rem = qty;
      while (rem > 0 && this.open.length && this.open[0].dir !== o.dir) {
        const t = this.open[0];
        const closeQty = Math.min(rem, t.qty);
        this.closeTradePartial(t, closeQty, i, px, 'order-net', o.id);
        rem -= closeQty;
        if (t.qty <= 1e-12) this.open.shift();
      }
      if (rem <= 1e-12) return;
      this.openTrade(o.id, o.dir, rem, px, i, o.comment);
      return;
    }
    this.openTrade(o.id, o.dir, qty, px, i, o.comment);
  }
  openTrade(id, dir, qty, px, i, comment) {
    const comm = this.commission(px, qty);
    this.realized -= comm; this.commPaid += comm;
    this.open.push({ seq: ++this.tradeSeq, id, dir, qty, entryPrice: px, entryBar: i, entryTime: this.rt.data.t[i], entryComm: comm, mae: 0, mfe: 0, bars: 0, comment: comment || '' });
    this.markers.push({ time: this.rt.data.t[i], bar: i, dir, type: 'entry', id, px });
  }
  closeTradePartial(t, qty, i, px, reason, refId) {
    const comm = this.commission(px, qty);
    const pnl = t.dir * qty * (px - t.entryPrice) - comm - t.entryComm * (qty / t.qty);
    this.realized += t.dir * qty * (px - t.entryPrice) - comm;
    this.commPaid += comm;
    this.closed.push({
      id: t.id, exitId: refId || reason, dir: t.dir, qty,
      entryPrice: t.entryPrice, exitPrice: px,
      entryBar: t.entryBar, exitBar: i,
      entryTime: t.entryTime, exitTime: this.rt.data.t[i],
      pnl, pnlPct: t.dir * (px - t.entryPrice) / t.entryPrice * 100,
      commission: comm + t.entryComm * (qty / t.qty),
      mae: t.mae, mfe: t.mfe, bars: t.bars, reason, comment: t.comment,
    });
    t.entryComm *= (1 - qty / t.qty);
    t.qty -= qty;
    this.markers.push({ time: this.rt.data.t[i], bar: i, dir: -t.dir, type: 'exit', id: t.id, px, reason });
  }
  closeAllAt(i, px, reason, refId) {
    for (const t of this.open) this.closeTradePartial(t, t.qty, i, px, reason, refId);
    this.open = this.open.filter(t => t.qty > 1e-12);
    if (!this.open.length) this.clearExitStates();
  }
  doClose(o, i, px) {
    const targets = this.open.filter(t => o.id === null || o.id === '' || t.id === o.id);
    for (const t of targets) {
      let q = t.qty;
      if (!isNa(o.qty)) q = Math.min(o.qty, t.qty);
      else if (o.qtyPct < 100) q = t.qty * o.qtyPct / 100;
      const fillPx = this.slip(px, -t.dir);
      this.closeTradePartial(t, q, i, fillPx, 'close', o.id || 'close_all');
    }
    this.open = this.open.filter(t => t.qty > 1e-12);
    if (!this.open.length) this.clearExitStates();
  }
  clearExitStates() { this.exits.clear(); }   // position flat -> brackets cancelled (TV-like)

  processEntryStopLimit(i) {
    if (!this.pendingEntry.size) return;
    const d = this.rt.data;
    const o = d.o[i], h = d.h[i], l = d.l[i];
    for (const [id, ord] of Array.from(this.pendingEntry)) {
      let px = NA;
      if (!isNa(ord.limit) && !isNa(ord.stop)) { continue; } // stop-limit not supported yet
      if (!isNa(ord.limit)) {
        // buy limit: fill when price <= limit ; sell limit: price >= limit
        if (ord.dir > 0) { if (o <= ord.limit) px = o; else if (l <= ord.limit) px = ord.limit; }
        else { if (o >= ord.limit) px = o; else if (h >= ord.limit) px = ord.limit; }
        if (!isNa(px)) { this.pendingEntry.delete(id); this.fillEntry(ord, i, px, 'limit'); }
      } else if (!isNa(ord.stop)) {
        if (ord.dir > 0) { if (o >= ord.stop) px = o; else if (h >= ord.stop) px = ord.stop; }
        else { if (o <= ord.stop) px = o; else if (l <= ord.stop) px = ord.stop; }
        if (!isNa(px)) { this.pendingEntry.delete(id); this.fillEntry(ord, i, this.slip(px, ord.dir), 'stop'); }
      }
    }
  }

  processExits(i) {
    if (!this.exits.size || !this.open.length) return;
    const d = this.rt.data;
    const o = d.o[i], h = d.h[i], l = d.l[i];
    const mint = this.rt.mintick;
    for (const [exId, ex] of Array.from(this.exits)) {
      const targets = this.open.filter(t => !ex.from || ex.from === '' || t.id === ex.from);
      for (const t of targets) {
        const dir = t.dir;
        let stopPx = !isNa(ex.stop) ? ex.stop : (!isNa(ex.loss) ? t.entryPrice - dir * ex.loss * mint : NA);
        let limitPx = !isNa(ex.limit) ? ex.limit : (!isNa(ex.profit) ? t.entryPrice + dir * ex.profit * mint : NA);
        // trailing
        let st = ex.states.get(t.seq);
        if (!st) { st = { active: false, trailStop: NA }; ex.states.set(t.seq, st); }
        const hasTrail = !isNa(ex.trailPrice) || !isNa(ex.trailPoints);
        if (hasTrail) {
          const act = !isNa(ex.trailPrice) ? ex.trailPrice : t.entryPrice + dir * ex.trailPoints * mint;
          const offs = !isNa(ex.trailOffset) ? ex.trailOffset : 0;
          const trigger = () => {
            if (isNa(st.trailStop)) return NA;
            if (dir > 0) { if (o <= st.trailStop) return o; if (l <= st.trailStop) return st.trailStop; }
            else { if (o >= st.trailStop) return o; if (h >= st.trailStop) return st.trailStop; }
            return NA;
          };
          const update = () => {
            if (!st.active && (dir > 0 ? h >= act : l <= act)) st.active = true;
            if (st.active) {
              const ext = dir > 0 ? h : l;
              const ns = ext - dir * offs * mint;
              st.trailStop = isNa(st.trailStop) ? ns : (dir > 0 ? Math.max(st.trailStop, ns) : Math.min(st.trailStop, ns));
            }
          };
          if (this.ambiguity === 'optimistic') { update(); }
          const tpx = trigger();
          if (this.ambiguity === 'conservative') update();
          if (!isNa(tpx)) {
            const effStop = isNa(stopPx) ? tpx : (dir > 0 ? Math.max(stopPx, tpx) : Math.min(stopPx, tpx));
            stopPx = effStop;
          } else if (!isNa(st.trailStop) && !isNa(stopPx)) {
            stopPx = dir > 0 ? Math.max(stopPx, st.trailStop) : Math.min(stopPx, st.trailStop);
          } else if (!isNa(st.trailStop) && isNa(stopPx) && this.ambiguity === 'optimistic') {
            // trail may still trigger this bar after update
            const tpx2 = trigger();
            if (!isNa(tpx2)) stopPx = tpx2;
          }
        }
        // evaluate stop / limit hits
        let stopFill = NA, limitFill = NA;
        if (!isNa(stopPx)) {
          if (dir > 0) { if (o <= stopPx) stopFill = o; else if (l <= stopPx) stopFill = stopPx; }
          else { if (o >= stopPx) stopFill = o; else if (h >= stopPx) stopFill = stopPx; }
        }
        if (!isNa(limitPx)) {
          if (dir > 0) { if (o >= limitPx) limitFill = o; else if (h >= limitPx) limitFill = limitPx; }
          else { if (o <= limitPx) limitFill = o; else if (l <= limitPx) limitFill = limitPx; }
        }
        if (isNa(stopFill) && isNa(limitFill)) continue;
        let px, reason;
        if (!isNa(stopFill) && !isNa(limitFill)) {
          if (this.ambiguity === 'conservative') { px = stopFill; reason = 'SL'; }
          else { px = limitFill; reason = 'TP'; }
        } else if (!isNa(stopFill)) { px = stopFill; reason = 'SL'; }
        else { px = limitFill; reason = 'TP'; }
        if (reason === 'SL') px = this.slip(px, -dir);
        let q = t.qty;
        if (!isNa(ex.qty)) q = Math.min(ex.qty, t.qty);
        else if (ex.qtyPct < 100) q = t.qty * ex.qtyPct / 100;
        this.closeTradePartial(t, q, i, px, reason, exId);
      }
      this.open = this.open.filter(t => t.qty > 1e-12);
    }
    if (!this.open.length) this.clearExitStates();
  }

  finish() {
    const rt = this.rt;
    const d = rt.data;
    const N = rt.N;
    // represent still-open trades
    const openList = this.open.map(t => ({
      id: t.id, exitId: '', dir: t.dir, qty: t.qty,
      entryPrice: t.entryPrice, exitPrice: NA, entryBar: t.entryBar, exitBar: NA,
      entryTime: t.entryTime, exitTime: NA,
      pnl: t.dir * t.qty * (d.c[N-1] - t.entryPrice), pnlPct: t.dir * (d.c[N-1] - t.entryPrice) / t.entryPrice * 100,
      commission: t.entryComm, mae: t.mae, mfe: t.mfe, bars: t.bars, reason: 'OPEN', comment: t.comment,
    }));
    return { equity: this.equity, posSeries: this.posSeries, closed: this.closed, openList, markers: this.markers, commPaid: this.commPaid, initial: this.initial };
  }
}

function num(...vals) { for (const v of vals) if (v !== undefined && v !== null && v !== '' && !isNaN(v)) return Number(v); return 0; }
function estimateMintick(closes) {
  let p = closes[Math.floor(closes.length / 2)] || 1;
  if (p >= 10000) return 0.1;
  if (p >= 1000) return 0.01;
  if (p >= 10) return 0.001;
  if (p >= 0.1) return 0.0001;
  return 0.00000001;
}
function estimateBPY(times) {
  if (times.length < 2) return 365;
  const dts = [];
  for (let i = 1; i < Math.min(times.length, 200); i++) dts.push(times[i] - times[i-1]);
  dts.sort((a, b) => a - b);
  const dt = dts[Math.floor(dts.length / 2)] || 86400000;
  return 365 * 86400000 / dt;
}

/* ============================================================
   7. METRICS
   ============================================================ */
function computeMetrics(equity, times, closed, initial, barsPerYear, posSeries, rangeStart, rangeEnd) {
  const a = rangeStart || 0, b = rangeEnd || equity.length;
  const N = b - a;
  const eq0 = a === 0 ? initial : equity[a - 1];
  const eqEnd = equity[b - 1];
  const trades = closed.filter(t => t.exitBar >= a && t.exitBar < b);
  const m = {};
  m.initial = initial;
  m.finalEquity = eqEnd;
  m.netProfit = eqEnd - eq0;
  m.netProfitPct = eq0 !== 0 ? m.netProfit / eq0 * 100 : NA;
  let gw = 0, gl = 0, wins = 0, losses = 0, sumPnl = 0, sumPnl2 = 0;
  let maxW = 0, maxL = 0, cw = 0, cl = 0, mcw = 0, mcl = 0, sumBars = 0, sumMae = 0, sumMfe = 0, comm = 0;
  for (const t of trades) {
    sumPnl += t.pnl; sumPnl2 += t.pnl * t.pnl; sumBars += t.bars; sumMae += t.mae; sumMfe += t.mfe; comm += t.commission;
    if (t.pnl > 0) { gw += t.pnl; wins++; cw++; cl = 0; maxW = Math.max(maxW, t.pnl); }
    else { gl += -t.pnl; losses++; cl++; cw = 0; maxL = Math.min(maxL, t.pnl); }
    mcw = Math.max(mcw, cw); mcl = Math.max(mcl, cl);
  }
  const n = trades.length;
  m.trades = n; m.winTrades = wins; m.lossTrades = losses;
  m.winRate = n ? wins / n * 100 : NA;
  m.grossProfit = gw; m.grossLoss = gl;
  m.pf = gl > 0 ? gw / gl : (gw > 0 ? Infinity : NA);
  m.avgTrade = n ? sumPnl / n : NA;
  m.avgWin = wins ? gw / wins : NA;
  m.avgLoss = losses ? gl / losses : NA;
  m.payoff = (m.avgWin && m.avgLoss) ? m.avgWin / m.avgLoss : NA;
  m.expectancy = n ? sumPnl / n : NA;
  m.largestWin = maxW; m.largestLoss = maxL;
  m.maxConsecWins = mcw; m.maxConsecLosses = mcl;
  m.avgBars = n ? sumBars / n : NA;
  m.avgMAE = n ? sumMae / n : NA;
  m.avgMFE = n ? sumMfe / n : NA;
  m.commission = comm;
  const meanPnl = n ? sumPnl / n : 0;
  const sdPnl = n > 1 ? Math.sqrt(Math.max(0, sumPnl2 / n - meanPnl * meanPnl)) : 0;
  m.sqn = (n > 1 && sdPnl > 0) ? Math.sqrt(n) * meanPnl / sdPnl : NA;
  // equity-based stats
  let peak = eq0, maxDD = 0, maxDDPct = 0, maxRunup = 0, trough = eq0;
  let sumR = 0, sumR2 = 0, nR = 0, sumDn2 = 0, nDn = 0;
  let exposure = 0;
  let prev = eq0;
  for (let i = a; i < b; i++) {
    const e = equity[i];
    if (e > peak) peak = e;
    if (e < trough) trough = e;
    const dd = peak - e;
    if (dd > maxDD) { maxDD = dd; maxDDPct = peak > 0 ? dd / peak * 100 : 0; }
    maxRunup = Math.max(maxRunup, e - trough);
    if (prev > 0) {
      const r = e / prev - 1;
      sumR += r; sumR2 += r * r; nR++;
      if (r < 0) { sumDn2 += r * r; nDn++; }
    }
    if (posSeries && posSeries[i] !== 0) exposure++;
    prev = e;
  }
  m.maxDD = maxDD; m.maxDDPct = maxDDPct; m.maxRunup = maxRunup;
  m.exposurePct = N ? exposure / N * 100 : NA;
  const meanR = nR ? sumR / nR : 0;
  const sdR = nR > 1 ? Math.sqrt(Math.max(0, sumR2 / nR - meanR * meanR)) : 0;
  m.volAnnPct = sdR * Math.sqrt(barsPerYear) * 100;
  m.sharpe = sdR > 0 ? meanR / sdR * Math.sqrt(barsPerYear) : NA;
  const sdDn = nR ? Math.sqrt(sumDn2 / nR) : 0;
  m.sortino = sdDn > 0 ? meanR / sdDn * Math.sqrt(barsPerYear) : NA;
  const years = N / barsPerYear;
  m.cagr = (eq0 > 0 && eqEnd > 0 && years > 0) ? (Math.pow(eqEnd / eq0, 1 / years) - 1) * 100 : NA;
  m.calmar = (!isNa(m.cagr) && maxDDPct > 0) ? m.cagr / maxDDPct : NA;
  return m;
}

function monthlyReturns(equity, times, initial) {
  const rows = new Map();  // year -> [12 monthly returns %]
  let prevKey = null, monthStart = initial;
  for (let i = 0; i < equity.length; i++) {
    const dt = new Date(times[i]);
    const y = dt.getUTCFullYear(), mo = dt.getUTCMonth();
    const key = y + '-' + mo;
    if (key !== prevKey) {
      monthStart = i === 0 ? initial : equity[i - 1];
      prevKey = key;
    }
    if (!rows.has(y)) rows.set(y, new Array(12).fill(null));
    if (monthStart > 0) rows.get(y)[mo] = (equity[i] / monthStart - 1) * 100;
  }
  return Array.from(rows.entries()).map(([y, ms]) => ({ year: y, months: ms }));
}

/* ============================================================
   8. TOP-LEVEL API
   ============================================================ */
function runBacktest(parsed, data, settings) {
  const t0 = Date.now();
  const rt = new Runtime(parsed, data, settings || {});
  const res = rt.run();
  const N = rt.N;
  const splitIdx = settings && settings.splitPct ? Math.floor(N * settings.splitPct / 100) : 0;
  const metrics = computeMetrics(res.equity, data.t, res.closed, res.initial, rt.barsPerYear, res.posSeries, 0, N);
  metrics.buyHoldPct = data.c[0] > 0 ? (data.c[N-1] / data.c[0] - 1) * 100 : NA;
  metrics.elapsedMs = Date.now() - t0;
  let isM = null, oosM = null;
  if (splitIdx > 10 && splitIdx < N - 10) {
    isM = computeMetrics(res.equity, data.t, res.closed, res.initial, rt.barsPerYear, res.posSeries, 0, splitIdx);
    oosM = computeMetrics(res.equity, data.t, res.closed, res.initial, rt.barsPerYear, res.posSeries, splitIdx, N);
  }
  const plots = [];
  for (const p of rt.plots.values()) plots.push({ title: p.title, color: p.color, style: p.style, data: p.data });
  return {
    metrics, isMetrics: isM, oosMetrics: oosM, splitIdx,
    trades: res.closed.concat(res.openList),
    equity: res.equity, markers: res.markers, plots,
    monthly: monthlyReturns(res.equity, data.t, res.initial),
    warnings: Array.from(rt.warnings),
    mintick: rt.mintick, barsPerYear: rt.barsPerYear,
    overlay: rt.decl.overlay !== false,
  };
}

function* gridCombos(specs) {
  // specs: [{key, from, to, step}]
  const dims = specs.map(s => {
    const vals = [];
    const step = s.step || 1;
    for (let v = s.from; v <= s.to + 1e-9; v += step) vals.push(Math.round(v * 1e9) / 1e9);
    return vals;
  });
  const idx = new Array(specs.length).fill(0);
  const total = dims.reduce((a, d) => a * d.length, 1);
  for (let c = 0; c < total; c++) {
    const combo = {};
    specs.forEach((s, i) => combo[s.key] = dims[i][idx[i]]);
    yield combo;
    for (let i = 0; i < idx.length; i++) { idx[i]++; if (idx[i] < dims[i].length) break; idx[i] = 0; }
  }
}
function countCombos(specs) {
  return specs.reduce((a, s) => a * Math.max(1, Math.floor((s.to - s.from) / (s.step || 1) + 1e-9) + 1), 1);
}

async function optimize(parsed, data, baseSettings, grid, opts, onProgress, shouldStop) {
  const total = countCombos(grid);
  const rows = [];
  let done = 0;
  const t0 = Date.now();
  let lastPost = 0;
  for (const combo of gridCombos(grid)) {
    if (shouldStop && shouldStop()) break;
    const settings = { ...baseSettings, inputs: { ...baseSettings.inputs, ...combo }, splitPct: opts.splitPct || 0 };
    let row;
    try {
      const r = runBacktest(parsed, data, settings);
      row = { params: combo, np: r.metrics.netProfitPct, pf: r.metrics.pf, dd: r.metrics.maxDDPct,
        sharpe: r.metrics.sharpe, sqn: r.metrics.sqn, trades: r.metrics.trades, winRate: r.metrics.winRate,
        isNp: r.isMetrics ? r.isMetrics.netProfitPct : null, oosNp: r.oosMetrics ? r.oosMetrics.netProfitPct : null,
        oosDd: r.oosMetrics ? r.oosMetrics.maxDDPct : null };
    } catch (e) {
      row = { params: combo, error: e.message };
    }
    rows.push(row);
    done++;
    const now = Date.now();
    if (onProgress && (now - lastPost > 200 || done === total)) {
      lastPost = now;
      onProgress({ done, total, elapsedMs: now - t0 });
      await new Promise(r => setTimeout(r, 0));   // let cancel messages through
    }
  }
  return { rows, total, done, elapsedMs: Date.now() - t0 };
}

/* ============================================================
   9. EXPORTS + WORKER GLUE
   ============================================================ */
const AE = { VERSION, parseCode, runBacktest, optimize, computeMetrics, monthlyReturns, countCombos, PINE_COLORS, estimateMintick };
global.AE = AE;

if (typeof importScripts === 'function' && typeof document === 'undefined') {
  let cancelled = false;
  self.onmessage = async (e) => {
    const m = e.data;
    try {
      if (m.cmd === 'cancel') { cancelled = true; return; }
      if (m.cmd === 'run') {
        const parsed = parseCode(m.code);
        if (parsed.errors.length) { self.postMessage({ type: 'runResult', ok: false, errors: parsed.errors }); return; }
        const res = runBacktest(parsed, m.data, m.settings);
        self.postMessage({ type: 'runResult', ok: true, result: res, decl: parsed.decl, inputs: parsed.inputs });
      }
      if (m.cmd === 'optimize') {
        cancelled = false;
        const parsed = parseCode(m.code);
        if (parsed.errors.length) { self.postMessage({ type: 'optResult', ok: false, errors: parsed.errors }); return; }
        const out = await optimize(parsed, m.data, m.settings, m.grid, m.opts || {},
          (p) => self.postMessage({ type: 'prog', ...p }), () => cancelled);
        self.postMessage({ type: 'optResult', ok: true, ...out });
      }
    } catch (err) {
      self.postMessage({ type: m.cmd === 'optimize' ? 'optResult' : 'runResult', ok: false,
        errors: [{ line: err.pineLine || 0, message: err.message || String(err) }] });
    }
  };
}
})(typeof self !== 'undefined' ? self : globalThis);
/* end of ae-engine.js */
