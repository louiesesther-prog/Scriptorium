const http = require('http');
const { performance, PerformanceObserver } = require('perf_hooks');

// ═══════════════════════════════════════════
//  PART 1 — API ENDPOINT BENCHMARKS
// ═══════════════════════════════════════════

const PORT = 5002;
const API = `http://localhost:${PORT}`;
const app = require('../scriptorium-api/app');

function get(path, token) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: 'localhost', port: PORT, path, method: 'GET', timeout: 10000 };
    if (token) opts.headers = { 'Authorization': 'Bearer ' + token };
    const start = performance.now();
    http.get(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data, time: performance.now() - start }));
    }).on('error', reject);
  });
}

function post(path, body, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const opts = {
      hostname: 'localhost', port: PORT, path, method: 'POST', timeout: 10000,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    };
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    const start = performance.now();
    const req = http.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d, time: performance.now() - start }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function percentiles(arr, pcts) {
  const s = arr.slice().sort((a, b) => a - b);
  return pcts.map(p => s[Math.floor((p / 100) * s.length)]);
}

async function bench(label, fn, iterations) {
  const times = [];
  for (let i = 0; i < iterations; i++) {
    const r = await fn();
    times.push(r.time);
  }
  const [p50, p90, p99] = percentiles(times, [50, 90, 99]);
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  console.log(`  ${label}: avg=${avg.toFixed(1)}ms p50=${p50.toFixed(1)} p90=${p90.toFixed(1)} p99=${p99.toFixed(1)} min=${min.toFixed(1)} max=${max.toFixed(1)} (${iterations} reqs)`);
  return times;
}

async function runAPIBenchmarks() {
  const N = 50;
  console.log(`\n  [API Benchmarks — ${N} requests each]\n`);

  // 1. OT list
  await bench('GET /api/ot', () => get('/api/ot'), N);

  // 2. OT chapter (Genesis 1)
  await bench('GET /api/ot/genesis/1', () => get('/api/ot/genesis/1'), N);

  // 3. NT chapter (John 3)
  await bench('GET /api/nt/john/3', () => get('/api/nt/john/3'), N);

  // 4. Search
  await bench('GET /api/search?q=faith', () => get('/api/search?q=faith&limit=5'), N);

  // 5. Ethiopian canon
  await bench('GET /api/ethiopian', () => get('/api/ethiopian'), N);

  // 6. Registration + Auth
  const uid = 'perf_' + Date.now();
  const regResult = await post('/api/auth/register', { userId: uid, name: 'Perf Tester', email: uid + '@perf.test', password: 'test1234' });
  const token = JSON.parse(regResult.body).token;

  // 7. Auth/me (warm)
  await bench('GET /api/auth/me', () => get('/api/auth/me', token), N);

  // 8. Auth/me (cold — no token)
  await bench('GET /api/auth/me [401]', () => get('/api/auth/me'), N);

  // 9. Login
  await bench('POST /api/auth/login', () => post('/api/auth/login', { userId: uid, password: 'test1234' }), N);

  console.log('');
}

// ═══════════════════════════════════════════
//  PART 2 — FRONTEND EXECUTION TIMING
// ═══════════════════════════════════════════

function runFrontendTiming() {
  console.log('  [Frontend Load Timing]\n');

  const files = [
    'assets/js/api.js',
    'assets/js/auth.js',
    'assets/js/lectionary.js',
    'assets/js/scriptorium-core.js',
    'assets/js/sidebar.js',
    'scriptorium.html',
  ];

  function makeCtx() {
    const store = {};
    return {
      window: globalThis,
      document: { createElement: () => ({}), getElementById: () => null, addEventListener: () => {} },
      localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; }, clear: () => { for (let k in store) delete store[k]; } },
      sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      navigator: { serviceWorker: undefined, userAgent: 'node' },
      location: { pathname: '/', hostname: 'localhost' },
      fetch: () => Promise.resolve({ json: () => Promise.resolve({}), ok: true }),
      console: { log: () => {}, warn: () => {}, error: () => {} },
      setTimeout: setTimeout, clearTimeout: clearTimeout,
      requestAnimationFrame: fn => setTimeout(fn, 16),
      AbortController: AbortController,
      AudioContext: class { constructor() {}; close() {} },
      CustomEvent: class CustomEvent { constructor(type, opts) { this.type = type; this.detail = opts && opts.detail; } },
    };
  }

  const fs = require('fs');
  const path = require('path');
  const ROOT = path.resolve(__dirname, '..');

  for (const file of files) {
    const abs = path.join(ROOT, file);
    if (!fs.existsSync(abs)) { console.log(`  [SKIP] ${file} — not found`); continue; }

    const code = fs.readFileSync(abs, 'utf8');
    const fn = new Function('window', 'document', 'localStorage', 'sessionStorage', 'navigator', 'location', 'fetch', 'console', 'setTimeout', 'clearTimeout', 'requestAnimationFrame', 'AbortController', 'AudioContext', 'CustomEvent', code);

    const ctx = makeCtx();
    const start = performance.now();

    let threw = false;
    try { fn(
      ctx.window, ctx.document, ctx.localStorage, ctx.sessionStorage,
      ctx.navigator, ctx.location, ctx.fetch, ctx.console,
      ctx.setTimeout, ctx.clearTimeout, ctx.requestAnimationFrame,
      ctx.AbortController, ctx.AudioContext, ctx.CustomEvent
    ); } catch (e) { threw = true; console.log(`  [ERR]  ${file} — ${e.message}`); }

    const elapsed = performance.now() - start;
    console.log(`  ${threw ? '[ERR]' : '[OK]'}  ${file} — ${elapsed.toFixed(1)}ms`);
  }

  // Scriptorium.html inline script timing
  console.log('');
  const htmlPath = path.join(ROOT, 'scriptorium.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const inlineScripts = [];
    const re = /<script>([\s\S]*?)<\/script>/g;
    let m;
    while ((m = re.exec(html)) !== null) inlineScripts.push(m[1]);

    for (let i = 0; i < inlineScripts.length; i++) {
      const snippet = inlineScripts[i];
      if (snippet.length < 20) continue;
      const ctx = makeCtx();
      // Pre-set lectionary for pericope test
      ctx.window.ScriptoriumLectionary = { getTodayReadings: () => ({ label: 'Test', readings: [{ book: 'Genesis', chapter: 1, type: 'OT', testament: 'ot' }] }) };
      ctx.document.getElementById = (id) => {
        if (id === 'dailyPericope') return { innerHTML: '' };
        if (id === 'pericopeLabel') return { textContent: '' };
        if (id === 'pericopeReadings') return { innerHTML: '', appendChild: () => {} };
        if (id === 'narthex-transition-curtain') return { style: {}, querySelector: () => ({ style: {}, classList: { add: () => {} } }) };
        return null;
      };
      ctx.document.addEventListener = () => {};
      ctx.document.createElement = (tag) => tag === 'a' ? { className: '', href: '', innerHTML: '', addEventListener: () => {} } : {};
      const start = performance.now();
      let err = null;
      try { new Function('window', 'document', 'localStorage', 'sessionStorage', 'setTimeout', snippet)(ctx.window, ctx.document, ctx.localStorage, ctx.sessionStorage, ctx.setTimeout); } catch (e) { err = e.message; }
      const elapsed = performance.now() - start;
      console.log(`  ${err ? '[ERR]' : '[OK]'}  scriptorium.html inline[${i}] — ${elapsed.toFixed(1)}ms${err ? ' (' + err + ')' : ''}`);
    }
  }

  // Cache miss simulation
  console.log('');
  const coldFiles = ['assets/js/scriptorium-core.js', 'assets/js/lectionary.js', 'assets/js/auth.js', 'assets/js/api.js'];
  let totalCold = 0;
  for (const f of coldFiles) {
    const abs = path.join(ROOT, f);
    if (!fs.existsSync(abs)) continue;
    // Simulate cold parse by reading fresh
    const code = fs.readFileSync(abs, 'utf8');
    const start = performance.now();
    try { new Function('window', 'document', 'console', code)(makeCtx().window, makeCtx().document, makeCtx().console); } catch(e) {}
    totalCold += performance.now() - start;
  }
  console.log(`  Total cold parse (4 core JS): ${totalCold.toFixed(1)}ms`);
}

// ═══════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════

async function main() {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'perf-bench-secret';
  console.log('═══════════════════════════════════════════');
  console.log('  SCRIPTORIUM PERFORMANCE BENCHMARKS');
  console.log('═══════════════════════════════════════════');

  const server = app.listen(PORT, async () => {
    try {
      await runAPIBenchmarks();
      runFrontendTiming();
      console.log('═══════════════════════════════════════════\n');
    } catch (e) {
      console.error('Benchmark error:', e.message);
    }
    server.close(() => process.exit(0));
  });
}

main();
