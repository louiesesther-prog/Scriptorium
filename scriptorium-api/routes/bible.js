const path = require('path');
const fs = require('fs');
const { getDailyVerse } = require('../daily-verse');
const { getCrossReferences } = require('../cross-references');
const { getWordStudy } = require('../word-study');
const audioBible = require('../audio-bible');
const logger = require('../logger');

module.exports = function registerBibleRoutes(app, ctx) {
  var BIBLE_DIR = ctx.BIBLE_DIR, DOCS_DIR = ctx.DOCS_DIR;
  var BOOK_INDEX = ctx.BOOK_INDEX, TESTAMENTS = ctx.TESTAMENTS;
  var getBookData = ctx.getBookData;

  function registerTestamentRoutes(era, opts) {
    opts = opts || {};
    var label = opts.label || (era === 'ot' ? 'Old Testament' : 'New Testament');
    var base = '/api/' + (opts.base || era);
    var docDir = opts.docDir || era;

    app.get(base, (req, res) => {
      var books = (TESTAMENTS[era] || []).map(function(slug) {
        return { id: BOOK_INDEX[slug].fileId, title: BOOK_INDEX[slug].title };
      });
      res.json({ testament: label, canonCount: opts.canonCount !== undefined ? opts.canonCount : (era === 'ot' ? 39 : era === 'nt' ? 27 : books.length), availableRecords: books.length, books });
    });

    app.get(base + '/:book', (req, res) => {
      var slug = req.params.book.toLowerCase().trim();
      var meta = BOOK_INDEX[slug];
      if (!meta) return res.status(404).json({ error: '\'' + req.params.book + '\' not found in ' + label + '.' });
      res.json({ bookId: meta.fileId, title: meta.title, writer: meta.writer, totalChapters: meta.totalChapters, downloadLink: base + '/' + slug + '/download' });
    });

    app.get(base + '/:book/:chapter', (req, res) => {
      var slug = req.params.book.toLowerCase().trim();
      var chapter = parseInt(req.params.chapter);
      var meta = BOOK_INDEX[slug];
      if (!meta) return res.status(404).json({ error: '\'' + req.params.book + '\' not found.' });
      try {
        var data = getBookData(meta.fileId);
        if (!data) return res.status(500).json({ error: 'Failed to read book data.' });
        var ch = data.chapters.find(function(c) { return parseInt(c.number) === chapter; });
        if (!ch) return res.status(404).json({ error: 'Chapter ' + chapter + ' not found in ' + meta.title + '.' });
        res.json({ book: meta.title, chapter: chapter, verses: ch.verses.map(function(text, i) { return { verse: i + 1, text: text }; }) });
      } catch (e) {
        logger.error({ err: e.message }, 'Failed to read chapter');
        res.status(500).json({ error: 'Failed to read chapter.' });
      }
    });

    app.get(base + '/:book/download', (req, res) => {
      var slug = req.params.book.toLowerCase().trim();
      var meta = BOOK_INDEX[slug];
      if (!meta) return res.status(404).json({ error: '\'' + req.params.book + '\' not found.' });
      var pdfPath = path.join(DOCS_DIR, docDir, slug + '.pdf');
      if (!fs.existsSync(pdfPath)) return res.status(404).json({ error: 'PDF for ' + meta.title + ' is unavailable.' });
      res.download(pdfPath, meta.fileId + '_Scriptorium.pdf');
    });
  }

  registerTestamentRoutes('ot');
  registerTestamentRoutes('nt');
  registerTestamentRoutes('ethiopian', { label: 'Ethiopian Orthodox Tewahedo Canon (Unique Books)', docDir: 'ethiopian' });

  app.get('/api/verse/:bookId/:chapter/:verse', (req, res) => {
    const slug = req.params.bookId.toLowerCase().trim();
    const chapter = parseInt(req.params.chapter);
    const verse = parseInt(req.params.verse);
    const meta = BOOK_INDEX[slug];
    if (!meta) return res.status(404).json({ error: `'${req.params.bookId}' not found.` });
    try {
      const data = getBookData(meta.fileId);
      if (!data) return res.status(500).json({ error: 'Failed to read book data.' });
      const ch = data.chapters.find(c => parseInt(c.number) === chapter);
      if (!ch) return res.status(404).json({ error: `Chapter ${chapter} not found in ${meta.title}.` });
      const v = ch.verses[verse - 1];
      if (!v) return res.status(404).json({ error: `Verse ${verse} not found in ${meta.title} ${chapter}.` });
      res.json({ book: meta.title, bookId: meta.fileId, chapter, verse, text: v, writer: meta.writer, era: meta.era });
    } catch (e) {
      logger.error({ err: e.message }, 'Failed to read verse');
      res.status(500).json({ error: 'Failed to read verse.' });
    }
  });

  var searchCache = null;
  function ensureSearchCache() {
    if (searchCache) return;
    searchCache = [];
    try {
      const files = fs.readdirSync(BIBLE_DIR).filter(f => f.endsWith('.json'));
      for (let fi = 0; fi < files.length; fi++) {
        const fileId = path.basename(files[fi], '.json');
        const slug = fileId.toLowerCase();
        const meta = BOOK_INDEX[slug];
        if (!meta) continue;
        const data = getBookData(fileId);
        if (!data) continue;
        for (let c = 0; c < (data.chapters || []).length; c++) {
          const ch = data.chapters[c];
          for (let v = 0; v < (ch.verses || []).length; v++) {
            searchCache.push({
              bookId: fileId, book: meta.title, chapter: parseInt(ch.number), verse: v + 1,
              text: ch.verses[v], textLc: ch.verses[v].toLowerCase(),
              era: meta.era, deuterocanonical: meta.deuterocanonical
            });
          }
        }
      }
    } catch (e) {
      logger.error({ err: e.message }, 'Failed to build search cache');
    }
  }

  app.get('/api/search', (req, res) => {
    try {
      const q = (req.query.q || '').toLowerCase().trim();
      if (!q || q.length < 2) return res.json({ query: q, totalResults: 0, results: [] });
      const limit = Math.max(1, Math.min(parseInt(req.query.limit) || 50, 200));
      const testament = (req.query.testament || '').toLowerCase();
      ensureSearchCache();
      const results = [];
      for (let i = 0; i < searchCache.length && results.length < limit; i++) {
        const entry = searchCache[i];
        if (testament === 'ot' && entry.era !== 'ot') continue;
        if (testament === 'nt' && entry.era !== 'nt') continue;
        if (testament === 'ethiopian' && !entry.deuterocanonical) continue;
        if (entry.textLc.includes(q)) {
          results.push({ book: entry.book, bookId: entry.bookId, chapter: entry.chapter, verse: entry.verse, text: entry.text.substring(0, 300), era: entry.era });
        }
      }
      res.json({ query: q, totalResults: results.length, testament: testament || 'all', results });
    } catch(e) {
      logger.error({ err: e.message }, 'Search failed');
      res.status(500).json({ error: 'Search failed.' });
    }
  });

  app.get('/api/daily-verse', async (req, res) => {
    try {
      res.json(getDailyVerse());
    } catch(e) {
      logger.error({ err: e.message }, 'Error fetching daily verse');
      res.status(500).json({ error: 'Error fetching daily verse.' });
    }
  });

  app.get('/api/cross-references/:book/:chapter', async (req, res) => {
    try {
      var book = req.params.book.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
      var chapter = parseInt(req.params.chapter);
      if (!chapter || chapter < 1) return res.status(400).json({ error: 'Invalid chapter' });
      var refs = getCrossReferences(book, chapter);
      var extraRefs = [];
      for (var i = 1; i <= 3; i++) {
        if (chapter - i >= 1) extraRefs = extraRefs.concat(getCrossReferences(book, chapter - i));
      }
      var combined = refs.concat(extraRefs);
      var seen = {};
      combined = combined.filter(function(r) { var k = r.ref; if (seen[k]) return false; seen[k] = true; return true; });
      res.json({ book: book, chapter: chapter, crossReferences: combined, total: combined.length });
    } catch(e) {
      logger.error({ err: e.message }, 'Error fetching cross-references');
      res.status(500).json({ error: 'Error fetching cross-references.' });
    }
  });

  app.get('/api/word-study/:word', function(req, res) {
    try {
      var result = getWordStudy(req.params.word);
      if (!result) return res.status(404).json({ error: 'Word not found.' });
      res.json(result);
    } catch(e) {
      logger.error({ err: e.message }, 'Error looking up word');
      res.status(500).json({ error: 'Error looking up word.' });
    }
  });

  app.get('/api/audio/:book/:chapter', async (req, res) => {
    try {
      var book = req.params.book.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
      var chapter = parseInt(req.params.chapter);
      if (!chapter || chapter < 1) return res.status(400).json({ error: 'Invalid chapter' });
      var audio = await audioBible.getAudioForChapter(book, chapter);
      res.json(audio);
    } catch(e) {
      logger.error({ err: e.message }, 'Error fetching audio');
      res.status(500).json({ error: 'Error fetching audio.' });
    }
  });
};
