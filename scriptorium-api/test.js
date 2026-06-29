const assert = require('assert');
const http = require('http');
const app = require('./app');

let server;
const PORT = 5001;

function get(path, token) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: 'localhost', port: PORT, path, method: 'GET' };
    if (token) opts.headers = { 'Authorization': 'Bearer ' + token };
    http.get(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    }).on('error', reject);
  });
}

function post(path, body, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const opts = {
      hostname: 'localhost', port: PORT, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    };
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    const req = http.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(d) }); }
        catch (e) { resolve({ status: res.statusCode, body: d }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runTests() {
  let passed = 0, failed = 0;

  function test(name, fn) {
    return fn().then(() => { passed++; console.log('  ✓ ' + name); })
      .catch(err => { failed++; console.log('  ✗ ' + name + ': ' + err.message); });
  }

  console.log('\n═══ SCRIPTORIUM API TESTS ═══\n');

  // OT API
  await test('GET /api/ot returns 39 books', async () => {
    const r = await get('/api/ot');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.availableRecords, 39);
    assert.strictEqual(r.body.testament, 'Old Testament');
  });

  await test('GET /api/ot/genesis returns metadata', async () => {
    const r = await get('/api/ot/genesis');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.totalChapters > 0);
    assert.strictEqual(r.body.bookId, 'GENESIS');
  });

  await test('GET /api/ot/genesis/1 returns verses', async () => {
    const r = await get('/api/ot/genesis/1');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.verses.length >= 1);
    assert.strictEqual(r.body.verses[0].verse, 1);
  });

  await test('GET /api/ot/psalms/23 returns Psalm 23', async () => {
    const r = await get('/api/ot/psalms/23');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.verses.some(v => v.text.toLowerCase().includes('shepherd')));
  });

  await test('GET /api/ot/nonexistent returns 404', async () => {
    const r = await get('/api/ot/nonexistent_book_xyz');
    assert.strictEqual(r.status, 404);
  });

  // NT API
  await test('GET /api/nt returns 27 books', async () => {
    const r = await get('/api/nt');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.availableRecords, 27);
    assert.strictEqual(r.body.testament, 'New Testament');
  });

  await test('GET /api/nt/john/3 returns John 3:16', async () => {
    const r = await get('/api/nt/john/3');
    assert.strictEqual(r.status, 200);
    const v16 = r.body.verses.find(v => v.verse === 16);
    assert.ok(v16, 'John 3:16 not found');
    assert.ok(v16.text.toLowerCase().includes('god'));
  });

  await test('GET /api/nt/matthew/5 returns Sermon on the Mount', async () => {
    const r = await get('/api/nt/matthew/5');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.verses.some(v => v.text.toLowerCase().includes('blessed')));
  });

  // Ethiopian API
  await test('GET /api/ethiopian returns unique books', async () => {
    const r = await get('/api/ethiopian');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.books.length > 0);
    assert.ok(r.body.books.some(b => b.id.includes('ENOCH')));
  });

  // Search API
  await test('GET /api/search?q=faith returns results', async () => {
    const r = await get('/api/search?q=faith&limit=5');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.results.length > 0);
    assert.ok(r.body.results[0].text.toLowerCase().includes('faith'));
  });

  await test('GET /api/search with short query returns empty', async () => {
    const r = await get('/api/search?q=a');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.totalResults, 0);
  });

  await test('GET /api/search?testament=ot filters correctly', async () => {
    const r = await get('/api/search?q=jesus&testament=ot');
    assert.strictEqual(r.status, 200);
    r.body.results.forEach(res => {
      assert.ok(res.era === 'ot' || res.era === undefined);
    });
  });

  await test('GET /api/search?testament=nt filters correctly', async () => {
    const r = await get('/api/search?q=jesus&testament=nt');
    assert.strictEqual(r.status, 200);
    r.body.results.forEach(res => {
      assert.strictEqual(res.era, 'nt');
    });
  });

  await test('GET /api/ethiopian/enoch returns metadata', async () => {
    const r = await get('/api/ethiopian/enoch');
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.totalChapters >= 0);
    assert.strictEqual(r.body.title.toLowerCase().includes('enoch'), true);
  });

  // Auth API
  const testUid = 'tscribe_' + Date.now();
  const testPw = 'TestPass123!';

  await test('POST /api/auth/register creates a scribe', async () => {
    const r = await post('/api/auth/register', { name: 'Test Scribe', userId: testUid, email: testUid + '@test.com', password: testPw });
    assert.strictEqual(r.status, 201);
    assert.ok(r.body.token);
    assert.strictEqual(r.body.scribe.name, 'Test Scribe');
  });

  await test('POST /api/auth/register with duplicate userId returns 409', async () => {
    const r = await post('/api/auth/register', { name: 'Other', userId: testUid, email: 'other@test.com', password: testPw });
    assert.strictEqual(r.status, 409);
  });

  await test('POST /api/auth/register with missing fields returns 400', async () => {
    const r = await post('/api/auth/register', { userId: 'incomplete' });
    assert.strictEqual(r.status, 400);
  });

  let authToken, scribeUserId;

  await test('POST /api/auth/login returns token', async () => {
    const r = await post('/api/auth/login', { userId: testUid, password: testPw });
    assert.strictEqual(r.status, 200);
    assert.ok(r.body.token);
    authToken = r.body.token;
    scribeUserId = r.body.scribe.userId;
  });

  await test('POST /api/auth/login with wrong password returns 401', async () => {
    const r = await post('/api/auth/login', { userId: testUid, password: 'wrong' });
    assert.strictEqual(r.status, 401);
  });

  await test('GET /api/auth/me returns scribe with valid token', async () => {
    const r = await get('/api/auth/me', authToken);
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.scribe.userId, scribeUserId);
    assert.strictEqual(r.body.scribe.name, 'Test Scribe');
  });

  await test('GET /api/auth/me without token returns 401', async () => {
    const r = await get('/api/auth/me');
    assert.strictEqual(r.status, 401);
  });

  // Summary
  console.log(`\n═══ ${passed + failed} tests, ${passed} passed, ${failed} failed ═══\n`);
  process.exit(failed > 0 ? 1 : 0);
}

server = app.listen(PORT, () => {
  console.log(`Test server on port ${PORT}`);
  runTests().catch(err => {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  });
});
