// ═══════════════════════════════════════════════════════════════════
// SCRIPTORIUM READER ENGINE — Read & Download Full Books
// Inject into NT, OT, and Ethiopian Canon pages
// ═══════════════════════════════════════════════════════════════════

// ── Cross-Reference & Audio State ──
var crossRefsLoaded = {};
var currentAudio = null;

(function(window) {

// ── BIBLE TEXT via bible-api.com (WEB default) ─────────────────────
// Fetch entire book chapter list then stream chapters
const BOOK_CHAPTERS = {
  // NT
  'Matthew':27,'Mark':16,'Luke':24,'John':21,'Acts':28,
  'Romans':16,'1 Corinthians':16,'2 Corinthians':13,'Galatians':6,
  'Ephesians':6,'Philippians':4,'Colossians':4,'1 Thessalonians':5,
  '2 Thessalonians':3,'1 Timothy':6,'2 Timothy':4,'Titus':3,
  'Philemon':1,'Hebrews':13,'James':5,'1 Peter':5,'2 Peter':3,
  '1 John':5,'2 John':1,'3 John':1,'Jude':1,'Revelation':22,
  // OT
  'Genesis':50,'Exodus':40,'Leviticus':27,'Numbers':36,'Deuteronomy':34,
  'Joshua':24,'Judges':21,'Ruth':4,'1 Samuel':31,'2 Samuel':24,
  '1 Kings':22,'2 Kings':25,'1 Chronicles':29,'2 Chronicles':36,
  'Ezra':10,'Nehemiah':13,'Esther':10,'Job':42,'Psalms':150,
  'Proverbs':31,'Ecclesiastes':12,'Song of Solomon':8,'Isaiah':66,
  'Jeremiah':52,'Lamentations':5,'Ezekiel':48,'Daniel':12,
  'Hosea':14,'Joel':3,'Amos':9,'Obadiah':1,'Jonah':4,'Micah':7,
  'Nahum':3,'Habakkuk':3,'Zephaniah':3,'Haggai':2,'Zechariah':14,'Malachi':4,
  // Ethiopian Canon — Sacred-Texts / public domain sources
  '1 Enoch':108,'Jubilees':50,'Tobit':14,'Judith':16,
  '1 Maccabees':16,'2 Maccabees':15,'3 Maccabees':7,'4 Maccabees':18,
  'Sirach':51,'Wisdom of Solomon':19,'Baruch':6,
  'Prayer of Manasseh':1,'1 Esdras':9,'2 Esdras':16,
  'Enoch (Slavonic)':68,'Jubilees (Ethiopic)':50
};

// Ethiopian canon uses Sacred-Texts public domain
const ETHIOPIAN_SOURCES = {
  '1 Enoch': 'https://www.sacred-texts.com/bib/boe/',
  'Jubilees': 'https://www.sacred-texts.com/bib/jub/',
  'Tobit': null, // use bible-api
  'Judith': null,
  '1 Maccabees': null,
  '2 Maccabees': null,
  'Sirach': null,
  'Wisdom of Solomon': null,
  'Baruch': null
};

// Translation (web, bbe, darby, kjv)
const TRANSLATIONS = [
  { id:'web', label:'WEB', desc:'World English Bible' },
  { id:'kjv', label:'KJV', desc:'King James Version' },
  { id:'bbe', label:'BBE', desc:'Bible in Basic English' },
  { id:'darby', label:'Darby', desc:'Darby Translation' },
  { id:'niv', label:'NIV', desc:'New International Version (via api.bible)' }
];
let TRANSLATION = 'web';

// Scripture API (optional — for NIV, ESV, KJV, requires free key from scripture.api.bible)
let USE_SCRIPTURE_API = false;
let SCRIPTURE_API_KEY = '';
const SCRIPTURE_BASE = 'https://api.scripture.api.bible/v1';
const NIV_BIBLE_ID = '78a9f6124f344018-01';

// API base
const API = 'https://bible-api.com/';

// Fetch API config from backend — overrides key if SCRIPTURE_API_KEY is set on server
(function initConfig() {
  fetch('/api/config', { signal: AbortSignal.timeout(3000) })
    .then(function(r) { return r.json(); })
    .then(function(cfg) {
      if (cfg.USE_SCRIPTURE_API && cfg.SCRIPTURE_API_KEY) {
        USE_SCRIPTURE_API = true;
        SCRIPTURE_API_KEY = cfg.SCRIPTURE_API_KEY;
      }
    })
    .catch(function() { /* fallback to bible-api.com */ });
  if (typeof window.ScrReader !== 'undefined' && window.ScrReader.initTranslationSelector) {
    setTimeout(window.ScrReader.initTranslationSelector, 100);
  }
})();

// ── STATE ──────────────────────────────────────────────────────────
let currentBook = '';
let currentChapter = 1;
let totalChapters = 1;
let chapterCache = {};
let isLoading = false;

// ── INJECT STYLES ──────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('scr-reader-styles')) return;
  const s = document.createElement('link');
  s.id = 'scr-reader-styles';
  s.rel = 'stylesheet';
  s.href = '/assets/css/reader.css';
  document.head.appendChild(s);
}

// ── INJECT MODAL HTML ──────────────────────────────────────────────
function injectModal() {
  if (document.getElementById('scr-reader-modal')) return;
  const m = document.createElement('div');
  m.id = 'scr-reader-modal';
  m.innerHTML = `
    <div class="scr-reader-shell">
      <div class="scr-reader-header">
        <div class="scr-reader-title-row">
          <div class="scr-reader-book-name" id="scr-book-name">—</div>
          <div style="display:flex;gap:6px;align-items:center">
            <select class="scr-trans-select" id="scrTransSelect" onchange="ScrReader.setTranslation(this.value)" title="Translation version"></select>
            <button class="scr-xref-btn" id="scrNotesToggle" onclick="ScrReader.toggleNotes()" title="Church Father commentary">&#128218; NOTES</button>
            <button class="scr-xref-btn" id="scrXrefToggle" onclick="ScrReader.toggleCrossRefs()" title="Cross-references">🔗 CROSS REFS</button>
            <button class="scr-audio-btn" id="scrAudioToggle" onclick="ScrReader.toggleAudio()" title="Audio Bible">🔊 AUDIO</button>
            <button class="scr-reader-close" onclick="ScrReader.close()">[ × ] CLOSE</button>
          </div>
        </div>
        <div class="scr-chapter-tabs" id="scr-chapter-tabs"></div>
      </div>
      <div class="scr-reader-body">
        <div class="scr-reading-area" id="scr-reading-area">
          <div class="scr-loading">UNSEALING THE SCROLL...</div>
        </div>
        <div class="scr-xref-panel" id="scrXrefPanel">
          <div class="scr-xref-title">CROSS REFERENCES</div>
          <div class="scr-xref-content" id="scrXrefContent">
            <div class="scr-xref-placeholder">Open a chapter to see cross-references</div>
          </div>
        </div>
        <div class="scr-pat-panel" id="scrPatPanel">
          <div class="scr-pat-title">CHURCH FATHERS &amp; RECOVERY MINISTERS</div>
          <div class="scr-pat-content" id="scrPatContent">
            <div class="scr-pat-placeholder">Open a book to see commentary</div>
          </div>
        </div>
      </div>
      <div class="scr-reader-footer">
        <button class="scr-nav-btn" id="scr-prev" onclick="ScrReader.prevChapter()">← PREVIOUS</button>
        <div style="text-align:center">
          <div class="scr-progress" id="scr-progress-label">Chapter 1</div>
          <div class="scr-progress-bar"><div class="scr-progress-fill" id="scr-progress-fill" style="width:0%"></div></div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="scr-download-btn" onclick="ScrReader.downloadChapter()" title="Download current chapter">
            ⬇ CHAPTER
          </button>
          <button class="scr-download-btn" onclick="ScrReader.downloadBook()" title="Download full book as text">
            ⬇ FULL BOOK
          </button>
          <button class="scr-nav-btn" id="scr-next" onclick="ScrReader.nextChapter()">NEXT →</button>
        </div>
      </div>
      <div class="scr-audio-bar" id="scrAudioBar">
        <div class="scr-audio-info"><span id="scrAudioLabel">Audio Bible</span></div>
        <audio id="scrAudioPlayer" controls preload="none">
          <p>Your browser does not support audio playback.</p>
        </audio>
        <button class="scr-audio-close" id="scrAudioClose" onclick="ScrReader.toggleAudio()">&times;</button>
      </div>
    </div>`;
  document.body.appendChild(m);

  // Close on backdrop click
  m.addEventListener('click', function(e) {
    if (e.target === m) ScrReader.close();
  });
  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('scr-reader-modal').classList.contains('open')) return;
    if (e.key === 'Escape') ScrReader.close();
    if (e.key === 'ArrowRight') ScrReader.nextChapter();
    if (e.key === 'ArrowLeft') ScrReader.prevChapter();
  });
}

// ── BUILD CHAPTER TABS ─────────────────────────────────────────────
function buildTabs(n) {
  const tabs = document.getElementById('scr-chapter-tabs');
  if (!tabs) return;
  tabs.innerHTML = '';
  for (let i = 1; i <= n; i++) {
    const btn = document.createElement('button');
    btn.className = 'scr-tab' + (i === currentChapter ? ' active' : '');
    btn.textContent = i;
    btn.onclick = (function(ch){ return function(){ ScrReader.goToChapter(ch); }; })(i);
    tabs.appendChild(btn);
  }
}

function updateTabs() {
  const tabs = document.getElementById('scr-chapter-tabs');
  if (!tabs) return;
  tabs.querySelectorAll('.scr-tab').forEach(function(t, i) {
    t.classList.toggle('active', i + 1 === currentChapter);
  });
  // Scroll active tab into view
  const active = tabs.querySelector('.scr-tab.active');
  if (active) active.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}

// Global persistent chapter cache (not cleared per book)
var globalChapterCache = {};

// ── IndexedDB Offline Chapter Cache ───────────────────────────────
var chapterDB = null;
var CHAPTER_DB_NAME = 'scriptorium-chapters';
var CHAPTER_DB_VERSION = 1;

function openChapterDB(callback) {
  if (chapterDB) { callback(null, chapterDB); return; }
  if (!window.indexedDB) { callback(null, null); return; }
  var req = indexedDB.open(CHAPTER_DB_NAME, CHAPTER_DB_VERSION);
  req.onupgradeneeded = function(e) {
    var db = e.target.result;
    if (!db.objectStoreNames.contains('chapters')) {
      db.createObjectStore('chapters', { keyPath: 'key' });
    }
  };
  req.onsuccess = function(e) {
    chapterDB = e.target.result;
    callback(null, chapterDB);
  };
  req.onerror = function() { callback(null, null); };
}

function getCachedChapter(book, chapter, callback) {
  openChapterDB(function(err, db) {
    if (err || !db) { callback(null, null); return; }
    var tx = db.transaction('chapters', 'readonly');
    var store = tx.objectStore('chapters');
    var req = store.get(book + '|' + chapter);
    req.onsuccess = function() {
      callback(null, req.result ? req.result.data : null);
    };
    req.onerror = function() { callback(null, null); };
  });
}

function setCachedChapter(book, chapter, data) {
  openChapterDB(function(err, db) {
    if (err || !db) return;
    try {
      var tx = db.transaction('chapters', 'readwrite');
      var store = tx.objectStore('chapters');
      store.put({ key: book + '|' + chapter, data: data, cachedAt: Date.now() });
    } catch(e) { /* IndexedDB may be unavailable */ }
  });
}

// ── FETCH CHAPTER TEXT ─────────────────────────────────────────────
function fetchChapter(book, chapter, callback) {
  const key = book + '|' + chapter;
  if (globalChapterCache[key]) { callback(null, globalChapterCache[key]); return; }
  if (chapterCache[key]) { callback(null, chapterCache[key]); return; }

  // Check IndexedDB before network
  getCachedChapter(book, chapter, function(err, cached) {
    if (cached) {
      globalChapterCache[key] = cached;
      chapterCache[key] = cached;
      callback(null, cached);
      return;
    }
    fetchChapterFromNetwork(book, chapter, key, callback);
  });
}

function fetchChapterFromNetwork(book, chapter, key, callback) {

  var controller = new AbortController();
  var timeout = setTimeout(function() { controller.abort(); }, 8000);

  if (USE_SCRIPTURE_API && SCRIPTURE_API_KEY) {
    const bookId = book.replace(/ /g, '').toLowerCase();
    const url = SCRIPTURE_BASE + '/bibles/' + NIV_BIBLE_ID + '/chapters/' + bookId + '.' + chapter + '/verses';
    fetch(url, { headers: { 'api-key': SCRIPTURE_API_KEY }, signal: controller.signal })
      .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function(json) {
        clearTimeout(timeout);
        const verses = (json.data || []).map(function(v) {
          return { verse: parseInt(v.id.split('.')[2]), text: v.content };
        });
        const data = { verses: verses };
        globalChapterCache[key] = data;
        chapterCache[key] = data;
        setCachedChapter(book, chapter, data);
        callback(null, data);
      })
      .catch(function(err) { clearTimeout(timeout); callback(err, null); });
    return;
  }

  // Try translations in order: current → kjv → bbe
  var fallbackTranslations = [TRANSLATION, 'kjv', 'bbe'];
  var tried = 0;

  function tryFallback() {
    if (tried >= fallbackTranslations.length) {
      callback(new Error('All translations failed'), null);
      return;
    }
    var trans = fallbackTranslations[tried];
    const apiBook = book.replace(/ /g, '+');
    const url = API + apiBook + '+' + chapter + '?translation=' + trans + '&verse_numbers=true';

    fetch(url, { signal: controller.signal })
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        clearTimeout(timeout);
        globalChapterCache[key] = data;
        chapterCache[key] = data;
        setCachedChapter(book, chapter, data);
        callback(null, data);
      })
      .catch(function() {
        tried++;
        tryFallback();
      });
  }

  tryFallback();
}

// ── FOOTNOTE POPOVER ──────────────────────────────────────────────
function toggleFnPopover(marker) {
  var open = marker.classList.contains('active');
  document.querySelectorAll('.scr-fn-marker.active').forEach(function(m) {
    m.classList.remove('active');
    var pop = m.nextElementSibling;
    while (pop && !pop.classList.contains('scr-fn-popover')) pop = pop.nextElementSibling;
    if (pop) pop.classList.remove('open');
  });
  if (!open) {
    marker.classList.add('active');
    var pop = marker.nextElementSibling;
    while (pop && !pop.classList.contains('scr-fn-popover')) pop = pop.nextElementSibling;
    if (pop) pop.classList.toggle('open');
  }
}

document.addEventListener('click', function(e) {
  var fnMarker = e.target.closest('.scr-fn-marker');
  if (fnMarker) { toggleFnPopover(fnMarker); return; }
  var inPopover = e.target.closest('.scr-fn-popover');
  if (inPopover) return;
  document.querySelectorAll('.scr-fn-marker.active').forEach(function(m) {
    m.classList.remove('active');
    var pop = m.nextElementSibling;
    while (pop && !pop.classList.contains('scr-fn-popover')) pop = pop.nextElementSibling;
    if (pop) pop.classList.remove('open');
  });
  // Open word study on word click
  var wordEl = e.target.closest('.scr-word');
  if (wordEl) {
    if (e.target.closest('.scr-word-panel')) return;
    openWordStudy(wordEl);
    return;
  }
  var inWordPanel = e.target.closest('.scr-word-panel');
  if (inWordPanel) return;
  document.querySelectorAll('.scr-word-panel').forEach(function(p) { p.remove(); });
  document.querySelectorAll('.scr-word.active').forEach(function(w) { w.classList.remove('active'); });

  // Open study popover on verse text click
  var verseText = e.target.closest('.scr-verse-text');
  if (verseText) {
    openStudyPopover(verseText);
    return;
  }
  var inStudy = e.target.closest('.scr-study-popover');
  if (inStudy) return;
  document.querySelectorAll('.scr-study-popover.open').forEach(function(p) { p.classList.remove('open'); });
  document.querySelectorAll('.scr-verse-text.active').forEach(function(v) { v.classList.remove('active'); });
});

// ── TRANSLATION SELECTOR ──
function initTranslationSelector() {
  var sel = document.getElementById('scrTransSelect');
  if (!sel) return;
  sel.innerHTML = '';
  var saved = localStorage.getItem('scriptorium_translation') || TRANSLATION;
  TRANSLATIONS.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t.id; opt.textContent = t.label;
    if (t.id === saved) opt.selected = true;
    sel.appendChild(opt);
  });
  TRANSLATION = saved;
}

if (!window.ScrReader) window.ScrReader = {};
window.ScrReader.setTranslation = function(id) {
  if (!id || id === TRANSLATION) return;
  TRANSLATION = id;
  try { localStorage.setItem('scriptorium_translation', id); } catch(e) {}
  if (currentBook && currentChapter) loadChapter();
};

window.ScrReader.openCrossRef = function(ref) {
  var parts = ref.split(' ');
  var book = parts.slice(0, -1).join(' ');
  var chapVerse = parts[parts.length - 1];
  var chap = parseInt(chapVerse.split(':')[0], 10);
  if (book && chap) {
    currentBook = book; currentChapter = chap;
    loadChapter();
  }
};

// ── WORD STUDY ──
function openWordStudy(el) {
  try { localStorage.setItem('achiev_word_study_used', 'true'); if (typeof ScriptoriumCore !== 'undefined') ScriptoriumCore.checkAchievements(); } catch(e) {}
  document.querySelectorAll('.scr-word-panel').forEach(function(p) { p.remove(); });
  document.querySelectorAll('.scr-word.active').forEach(function(w) { w.classList.remove('active'); });
  el.classList.add('active');
  var word = el.getAttribute('data-word');
  if (!word || word.length < 2) return;
  var panel = document.createElement('div');
  panel.className = 'scr-word-panel';
  panel.innerHTML = '<div class="sp-loading" style="font-style:italic;color:rgba(255,255,255,0.3);font-size:0.7rem;">SEARCHING THE ARCHIVES...</div>';
  el.parentNode.appendChild(panel);
  fetch('/api/word-study/' + encodeURIComponent(word))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data) { panel.innerHTML = '<div class="sp-head" style="border-bottom:none;">' + window.escHtml(word) + '</div><div class="sp-loading" style="font-style:italic;color:rgba(255,255,255,0.2);font-size:0.7rem;">No additional data for this word.</div>'; return; }
      var html = '<div class="sp-head">' + window.escHtml(word) + '</div>';
      html += '<div class="sp-row"><span class="sp-label">FREQUENCY</span><span class="sp-value">' + window.escHtml(data.frequency) + 'x in Scripture</span></div>';
      if (data.strong) html += '<div class="sp-row"><span class="sp-label">STRONG\'S</span><span class="sp-value">' + window.escHtml(data.strong) + '</span></div>';
      if (data.greek) html += '<div class="sp-row"><span class="sp-label">GREEK</span><span class="sp-value">' + window.escHtml(data.greek) + '</span></div>';
      if (data.hebrew) html += '<div class="sp-row"><span class="sp-label">HEBREW</span><span class="sp-value">' + window.escHtml(data.hebrew) + '</span></div>';
      if (data.definition) html += '<div class="sp-row" style="flex-direction:column;align-items:flex-start;gap:4px;"><span class="sp-label">DEFINITION</span><span class="sp-value" style="line-height:1.5;">' + window.escHtml(data.definition) + '</span></div>';
      if (data.baseForm) html += '<div class="sp-row"><span class="sp-label" style="font-size:0.5rem;">BASE FORM</span><span class="sp-value" style="font-style:italic;">' + window.escHtml(data.baseForm) + '</span></div>';
      panel.innerHTML = html;
    })
    .catch(function() {
      panel.innerHTML = '<div class="sp-head" style="border-bottom:none;">' + window.escHtml(word) + '</div><div class="sp-loading" style="font-style:italic;color:rgba(255,255,255,0.2);font-size:0.7rem;">Study data unavailable.</div>';
    });
}

// ── STUDY POPOVER ──
function openStudyPopover(el) {
  // Close all other study popovers
  document.querySelectorAll('.scr-study-popover.open').forEach(function(p) { p.classList.remove('open'); });
  document.querySelectorAll('.scr-verse-text.active').forEach(function(v) { v.classList.remove('active'); });

  var verseDiv = el.closest('.scr-verse');
  if (!verseDiv) return;
  var numSpan = verseDiv.querySelector('.scr-verse-num');
  var verseNum = numSpan ? parseInt(numSpan.textContent, 10) : 0;
  if (!verseNum) return;

  // Close if already open on this verse
  var existing = verseDiv.querySelector('.scr-study-popover');
  if (existing && existing.classList.contains('open')) {
    existing.classList.remove('open');
    el.classList.remove('active');
    return;
  }

  el.classList.add('active');
  var pop = document.createElement('div');
  pop.className = 'scr-study-popover open';
  pop.innerHTML = '<div class="sp-head">' + currentBook + ' ' + currentChapter + ':' + verseNum + '</div><div class="sp-loading" style="font-style:italic;color:rgba(255,255,255,0.3);font-size:0.7rem;">Loading study resources...</div>';
  verseDiv.appendChild(pop);

  // Load cross-references for this chapter
  var xrefLoaded = false;
  var bookKey = currentBook.toLowerCase().replace(/ /g,'-').replace(/[^a-z0-9-]/g,'');
  fetch('/api/cross-references/' + encodeURIComponent(bookKey) + '/' + currentChapter)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var xrefs = data.crossReferences || [];
      var verseRefs = xrefs.filter(function(x) {
        var parts = x.ref ? x.ref.split(' ') : [];
        var last = parts[parts.length - 1] || '';
        var v = parseInt(last.split(':')[1], 10);
        return v === verseNum;
      });
      xrefLoaded = true;
      updateStudyPopover(pop, verseNum, xrefs, verseRefs);
    })
    .catch(function() {
      xrefLoaded = true;
      updateStudyPopover(pop, verseNum, [], []);
    });

  // Set timeout in case fetch hangs
  setTimeout(function() {
    if (!xrefLoaded) updateStudyPopover(pop, verseNum, [], []);
  }, 3000);
}

function updateStudyPopover(pop, verseNum, allXrefs, verseXrefs) {
  var html = '<div class="sp-head">' + currentBook + ' ' + currentChapter + ':' + verseNum + '</div>';

  // Cross-references for this specific verse
  if (verseXrefs.length > 0) {
    html += '<div class="sp-row"><span class="sp-label">REFS</span><div class="sp-value">';
    verseXrefs.slice(0, 4).forEach(function(x) {
      html += '<div class="sp-xref-item" onclick="event.stopPropagation();ScrReader.openCrossRef(\'' + x.ref.replace(/'/g,"\\'") + '\')">' + x.ref + ' — ' + (x.text ? x.text.slice(0, 80) : '') + '</div>';
    });
    html += '</div></div>';
  }

  // Actions
  html += '<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;">';
  html += '<span class="sp-action" onclick="event.stopPropagation();window.showVerseQuickLook(\'' + currentBook.replace(/'/g,"\\'") + '\',' + currentChapter + ',' + verseNum + ')">QUICK LOOK</span>';
  html += '<span class="sp-action" onclick="event.stopPropagation();var p=document.getElementById(\'scrXrefPanel\');if(p){void ScrReader.toggleCrossRefs()}">ALL CROSS REFS</span>';
  html += '<span class="sp-action" onclick="event.stopPropagation();var p=document.getElementById(\'scrPatPanel\');if(p){void ScrReader.toggleNotes()}">FATHERS</span>';
  html += '</div>';

  pop.innerHTML = html;
}

window.ScrReader.initTranslationSelector = initTranslationSelector;

// ── PATRISTIC COMMENTARY LOADER ───────────────────────────────────
function loadPatristic(book) {
  try { localStorage.setItem('achiev_patristic_opened', 'true'); if (typeof ScriptoriumCore !== 'undefined') ScriptoriumCore.checkAchievements(); } catch(e) {}
  var pat = (typeof window.PATRISTIC_COMMENTARY !== 'undefined') ? window.PATRISTIC_COMMENTARY : null;
  var panel = document.getElementById('scrPatContent');
  if (!panel) return;
  if (!pat) {
    panel.innerHTML = '<div class="scr-pat-placeholder">Patristic commentary data not loaded.</div>';
    return;
  }
  var entries = pat[book] || pat[book.toUpperCase()];
  if (!entries) {
    panel.innerHTML = '<div class="scr-pat-placeholder">No Church Father commentary available for ' + window.escHtml(book) + '.</div>';
    return;
  }
  var html = '';
  entries.forEach(function(e) {
    html += '<div class="scr-pat-item">' +
      '<div class="scr-pat-father">' + e.father + '</div>' +
      '<div class="scr-pat-source">' + e.source + '</div>' +
      '<div class="scr-pat-text">' + e.text + '</div>' +
      '</div>';
  });
  panel.innerHTML = html;
}

// ── RENDER CHAPTER ─────────────────────────────────────────────────
function renderChapter(data) {
  const area = document.getElementById('scr-reading-area');
  if (!area) return;

  if (!data || !data.verses || data.verses.length === 0) {
    var bgUrl2 = 'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(currentBook + '+' + currentChapter) + '&version=KJV';
    area.innerHTML = `<div class="scr-error">
      <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-bottom:16px;">This chapter has no text available through the API. Try a different translation or open in Bible Gateway.</div>
      <button onclick="window.open('${bgUrl2.replace(/'/g,"\\'")}','_blank','width=800,height=600,scrollbars=yes')" style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.15);color:#d4af37;padding:8px 18px;border-radius:2px;font-family:'Cinzel',serif;font-size:0.55rem;letter-spacing:2px;cursor:pointer;transition:0.2s;">READ ON BIBLE GATEWAY</button>
    </div>`;
    return;
  }

  var fnMap = null;
  if (typeof window.RV_FOOTNOTES !== 'undefined') {
    var bookKey = currentBook.toUpperCase().replace(/ /g,'_');
    var bookNotes = window.RV_FOOTNOTES[bookKey] || window.RV_FOOTNOTES[currentBook.toUpperCase()];
    fnMap = bookNotes ? bookNotes[String(currentChapter)] : null;
  }

  let html = `<div class="scr-chapter-heading">${currentBook.toUpperCase()} · CHAPTER ${currentChapter}</div>`;
  data.verses.forEach(function(v) {
    html += `<div class="scr-verse">`;
    html += `<span class="scr-verse-num">${v.verse}</span>`;
    var wordHtml = v.text.replace(/[<>]/g,'').split(/(\s+)/).map(function(w) {
      var trimmed = w.replace(/[^a-zA-Z'-]/g,'');
      return trimmed ? '<span class="scr-word" data-word="' + trimmed.toLowerCase() + '">' + w + '</span>' : w;
    }).join('');
    html += `<span class="scr-verse-text">${wordHtml}</span>`;

    if (fnMap) {
      var matches = fnMap.filter(function(n) {
        var vPart = n.verse.split(':')[1];
        return parseInt(vPart, 10) === v.verse;
      });
      if (matches.length > 0) {
        var fnData = matches.map(function(m) {
          return { cat: m.cat, text: m.text };
        });
        html += `<span class="scr-fn-marker" data-fn='${encodeURIComponent(JSON.stringify(fnData))}'>\u00b6</span>`;
        html += `<div class="scr-fn-popover">` +
          fnData.map(function(f) {
            return '<span class="fn-cat">' + f.cat + '</span><div class="fn-text">' + f.text + '</div>';
          }).join('') +
          `</div>`;
      }
    }

    html += `</div>`;
  });
  area.innerHTML = html;
  area.scrollTop = 0;
}

// ── UPDATE PROGRESS ────────────────────────────────────────────────
function updateProgress() {
  const label = document.getElementById('scr-progress-label');
  const fill  = document.getElementById('scr-progress-fill');
  const prev  = document.getElementById('scr-prev');
  const next  = document.getElementById('scr-next');
  if (label) label.textContent = 'Chapter ' + currentChapter + ' / ' + totalChapters;
  if (fill)  fill.style.width = ((currentChapter / totalChapters) * 100) + '%';
  if (prev)  prev.disabled = (currentChapter <= 1);
  if (next)  next.disabled = (currentChapter >= totalChapters);
  updateTabs();
}

// ── LOAD CHAPTER ───────────────────────────────────────────────────
function loadChapter() {
  if (isLoading) return;
  isLoading = true;
  const area = document.getElementById('scr-reading-area');
  if (area) area.innerHTML = '<div class="scr-loading">UNSEALING THE SCROLL...</div>';

  // Clear previous cross-refs for this chapter
  clearCrossRefs();

  // Auto-load cross-refs if panel is open
  var xrefPanel = document.getElementById('scrXrefPanel');
  if (xrefPanel && xrefPanel.classList.contains('open')) {
    loadCrossRefs(currentBook, currentChapter);
  }

  // Auto-load audio if bar is open
  var audioBar = document.getElementById('scrAudioBar');
  if (audioBar && audioBar.classList.contains('open')) {
    loadAudio(currentBook, currentChapter);
  }

  fetchChapter(currentBook, currentChapter, function(err, data) {
    isLoading = false;
    if (err || !data) {
      // Fallback: Ethiopian or apocryphal — link to external
      const srcUrl = ETHIOPIAN_SOURCES[currentBook];
      const area2 = document.getElementById('scr-reading-area');
      if (area2) {
        var bgUrl = 'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(currentBook + '+' + currentChapter) + '&version=KJV';
        area2.innerHTML = `<div class="scr-error">
          <strong style="color:rgba(212,175,55,0.7);font-family:'Cinzel',serif;letter-spacing:2px;">${currentBook.toUpperCase()} ${currentChapter}</strong><br><br>
          <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-bottom:16px;">This chapter is not available through the primary API. Try a different translation from the toolbar, or open in Bible Gateway.</div>
          <button onclick="window.open('${bgUrl.replace(/'/g,"\\'")}','_blank','width=800,height=600,scrollbars=yes')" style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.15);color:#d4af37;padding:8px 18px;border-radius:2px;font-family:'Cinzel',serif;font-size:0.55rem;letter-spacing:2px;cursor:pointer;transition:0.2s;">READ ON BIBLE GATEWAY</button>
          <div style="margin-top:14px;font-size:0.5rem;color:rgba(255,255,255,0.12);font-family:'Cinzel',serif;letter-spacing:1px;">
            <a href="${bgUrl}" target="_blank" rel="noopener" style="color:rgba(212,175,55,0.2);">open in new tab</a>
          </div>
        </div>`;
      }
    } else {
      renderChapter(data);
      autoDetectProgress();
    }
    updateProgress();
  });
}

function generateDownloadUrl() { return '#'; }

// ── DOWNLOAD CHAPTER ───────────────────────────────────────────────
function downloadChapter() {
  const key = currentBook + '|' + currentChapter;
  const data = chapterCache[key];
  let text = currentBook.toUpperCase() + ' — CHAPTER ' + currentChapter + '\n';
  text += 'Scriptorium · Recovery Version (KJV public domain)\n';
  text += '═'.repeat(50) + '\n\n';

  if (data && data.verses) {
    data.verses.forEach(function(v) {
      text += v.verse + '  ' + v.text.trim() + '\n';
    });
  } else {
    text += '(Chapter text not cached — please open the chapter first)\n';
  }

  downloadText(text, currentBook.replace(/ /g,'_') + '_Ch' + currentChapter + '.txt');
}

// ── DOWNLOAD FULL BOOK (all cached chapters + fetch missing) ───────
function downloadBook() {
  const btn = document.querySelector('.scr-download-btn[onclick*="downloadBook"]');
  if (btn) { btn.textContent = '⌛ GATHERING...'; btn.disabled = true; }

  const promises = [];
  for (let ch = 1; ch <= totalChapters; ch++) {
    const key = currentBook + '|' + ch;
    if (!chapterCache[key]) {
      promises.push(new Promise(function(resolve) {
        fetchChapter(currentBook, ch, function(err, data) {
          resolve(data);
        });
      }));
    }
  }

  Promise.all(promises).then(function() {
    let text = currentBook.toUpperCase() + '\n';
    text += 'Scriptorium · KJV Public Domain Text\n';
    text += 'Downloaded: ' + new Date().toLocaleDateString() + '\n';
    text += '═'.repeat(60) + '\n\n';

    for (let ch = 1; ch <= totalChapters; ch++) {
      const key = currentBook + '|' + ch;
      const data = chapterCache[key];
      text += '\nCHAPTER ' + ch + '\n' + '─'.repeat(40) + '\n';
      if (data && data.verses) {
        data.verses.forEach(function(v) {
          text += v.verse + '  ' + v.text.trim() + '\n';
        });
      }
    }

    downloadText(text, currentBook.replace(/ /g,'_') + '_Full.txt');
    if (btn) { btn.textContent = '⬇ FULL BOOK'; btn.disabled = false; }
  });
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 1000);
}

// ── INJECT READ BUTTONS ON CARDS ───────────────────────────────────
function injectReadButtons() {
  // NT / OT gallery cards — data-book="Matthew|28"
  document.querySelectorAll('[data-book]').forEach(function(card) {
    const raw = card.getAttribute('data-book') || '';
    const parts = raw.split('|');
    const bookName = parts[0];
    if (!bookName || !BOOK_CHAPTERS[bookName]) return;
    if (card.querySelector('.scr-read-btn')) return; // already added

    const btn = document.createElement('button');
    btn.className = 'scr-read-btn';
    btn.textContent = '📖 READ FULL BOOK';
    btn.setAttribute('onclick', 'ScrReader.open("' + bookName.replace(/'/g, "\\'") + '")');
    // Insert before last button or at end
    const lastBtn = card.querySelector('.examine-btn') || card.querySelector('.excavate-btn');
    if (lastBtn && lastBtn.parentNode) {
      lastBtn.parentNode.insertBefore(btn, lastBtn.nextSibling);
    } else {
      card.appendChild(btn);
    }
  });

  // Ethiopian Canon — cards with data-book-id or .book-card
  document.querySelectorAll('.book-card[data-book-id], .codex-book[data-name]').forEach(function(card) {
    const bookName = card.getAttribute('data-book-id') || card.getAttribute('data-name');
    if (!bookName) return;
    if (card.querySelector('.scr-read-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'scr-read-btn';
    btn.textContent = '📖 READ FULL BOOK';
    btn.setAttribute('onclick', 'ScrReader.open("' + bookName.replace(/'/g, "\\'") + '")');
    card.appendChild(btn);
  });
}

// ── AUTO-DETECT PROGRESS ───────────────────────────────────────────
function autoDetectProgress() {
  var token = null;
	try { token = Scriptorium.getToken(); } catch(e) {}
  if (!token || !currentBook || !currentChapter) return;
  var book = currentBook;
  var ch = currentChapter;
  var base = window.SCRIPTORIUM_API || '/api';
  // Check both plans and challenges in parallel
  var headers = { 'Authorization': 'Bearer ' + token };
  Promise.all([
    fetch(base + '/plans/my/progress', { headers: headers }).then(function(r) { return r.json(); }).catch(function() { return {}; }),
    fetch(base + '/challenges/my/progress', { headers: headers }).then(function(r) { return r.json(); }).catch(function() { return {}; })
  ]).then(function(results) {
    var planData = results[0];
    var chalData = results[1];
    var planSubs = planData.subscriptions || [];
    var chalSubs = chalData.subscriptions || [];
    // Check plans
    for (var i = 0; i < planSubs.length; i++) {
      var s = planSubs[i];
      if (s.completedAt) continue;
      var reading = s.currentReading || '';
      if (matchesReading(reading, book, ch)) {
        fetch(base + '/plans/complete-day', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ planId: s.planId })
        }).then(function(r) { return r.json(); }).then(function(d) {
          if (!d.error && d.subscription) {
            showScrNotif('Plan day auto-completed');
            if (d.subscription.completedAt) {
              try {
                var completed = JSON.parse(localStorage.getItem('scriptorium_completed_plans') || '[]');
                if (completed.indexOf(s.planId) < 0) {
                  completed.push(s.planId);
                  localStorage.setItem('scriptorium_completed_plans', JSON.stringify(completed));
                  localStorage.setItem('scriptorium_completed_plan_' + s.planId, 'true');
                  if (typeof ScriptoriumCore !== 'undefined' && ScriptoriumCore.checkAchievements) {
                    ScriptoriumCore.checkAchievements();
                  }
                }
              } catch(e) {}
            }
          }
        }).catch(function(){});
        break;
      }
    }
    // Check challenges
    for (var j = 0; j < chalSubs.length; j++) {
      var s2 = chalSubs[j];
      if (s2.completedAt) continue;
      var reading2 = s2.currentReading || '';
      if (matchesReading(reading2, book, ch)) {
        fetch(base + '/challenges/complete-day', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ challengeId: s2.challengeId })
        }).then(function(r) { return r.json(); }).then(function(d) {
          if (!d.error && d.subscription) showScrNotif('Challenge day auto-completed');
        }).catch(function(){});
        break;
      }
    }
  }).catch(function(){});
}
function matchesReading(reading, book, chapter) {
  if (!reading) return false;
  var m = reading.match(/^(.+?)\s+(\d+)(?:\s*-\s*(\d+))?$/);
  if (!m) return false;
  var rBook = m[1];
  var rStart = parseInt(m[2], 10);
  var rEnd = m[3] ? parseInt(m[3], 10) : rStart;
  if (rBook.toLowerCase() !== book.toLowerCase()) return false;
  return chapter >= rStart && chapter <= rEnd;
}
function showScrNotif(msg) {
  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:20px;right:20px;background:rgba(10,10,10,0.95);border:1px solid rgba(212,175,55,0.15);color:rgba(255,255,255,0.5);padding:12px 20px;font-family:\'Cormorant Garamond\',serif;font-size:0.75rem;z-index:99999;border-radius:3px;animation:fadeIn 0.4s ease;max-width:320px;';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function() { el.style.opacity = '0'; el.style.transition = 'opacity 0.4s'; setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 400); }, 3500);
}

// ── Cross-Reference & Audio Functions ──

function clearCrossRefs() {
  crossRefsLoaded = {};
  var panel = document.getElementById('scrXrefContent');
  if (panel) panel.innerHTML = '<div class="scr-xref-placeholder">Open a chapter to see cross-references</div>';
}

function loadCrossRefs(book, chapter) {
  try { localStorage.setItem('achiev_xref_used', 'true'); if (typeof ScriptoriumCore !== 'undefined') ScriptoriumCore.checkAchievements(); } catch(e) {}
  var panel = document.getElementById('scrXrefContent');
  var btn = document.getElementById('scrXrefToggle');
  if (!panel) return;
  var key = book + '|' + chapter;
  if (crossRefsLoaded[key]) return;
  crossRefsLoaded[key] = true;
  panel.innerHTML = '<div class="scr-xref-placeholder">Loading cross-references...</div>';
  var bk = book.toLowerCase().replace(/\s+/g, '-');
  fetch('/api/cross-references/' + bk + '/' + chapter)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || !data.crossReferences || data.crossReferences.length === 0) {
        panel.innerHTML = '<div class="scr-xref-placeholder">No cross-references found for this chapter</div>';
        return;
      }
      var html = '';
      data.crossReferences.forEach(function(r) {
        var typeLabel = r.type.replace(/-/g, ' ');
        var parts = r.ref.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
        html += '<div class="scr-xref-item">' +
          '<div class="scr-xref-type">' + typeLabel + '</div>' +
          '<div class="scr-xref-ref" onclick="ScrReader.openCrossRef(\'' + r.ref.replace(/'/g, "\\'") + '\')">' + r.ref + '</div>' +
          '<div class="scr-xref-text">"' + (r.text || '').substring(0, 120) + '"</div>' +
        '</div>';
      });
      panel.innerHTML = html;
      // Auto-open if not already open
      if (btn && !btn.classList.contains('active')) {
        document.getElementById('scrXrefPanel').classList.add('open');
        btn.classList.add('active');
      }
    })
    .catch(function() {
      panel.innerHTML = '<div class="scr-xref-placeholder">Failed to load cross-references</div>';
    });
}

function loadAudio(book, chapter) {
  var audioEl = document.getElementById('scrAudioPlayer');
  var labelEl = document.getElementById('scrAudioLabel');
  if (!audioEl) return;
  // Pause current audio
  audioEl.pause();
  audioEl.removeAttribute('src');
  audioEl.load();
  if (labelEl) labelEl.textContent = book + ' ' + chapter;
  var bk = book.toLowerCase().replace(/\s+/g, '-');
  fetch('/api/audio/' + bk + '/' + chapter)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data || !data.available) {
        if (labelEl) labelEl.textContent = 'Audio unavailable for ' + book + ' ' + chapter;
        return;
      }
      audioEl.src = data.url;
      audioEl.load();
      audioEl.play().catch(function() {});
    })
    .catch(function() {
      if (labelEl) labelEl.textContent = 'Audio source error';
    });
}

// ── PUBLIC API ─────────────────────────────────────────────────────
var readerApi = {
  open: function(bookName) {
    if (!BOOK_CHAPTERS[bookName]) {
      // Try to guess
      for (const key in BOOK_CHAPTERS) {
        if (key.toLowerCase() === bookName.toLowerCase()) {
          bookName = key; break;
        }
      }
    }
    currentBook = bookName;
    currentChapter = 1;
    totalChapters = BOOK_CHAPTERS[bookName] || 1;
    chapterCache = {}; // only clear local cache, globalChapterCache persists

    const modal = document.getElementById('scr-reader-modal');
    const nameEl = document.getElementById('scr-book-name');
    if (!modal || !nameEl) return;

    nameEl.textContent = bookName.toUpperCase();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    buildTabs(totalChapters);
    loadChapter();
    // Load patristic panel if already open
    var patPanel = document.getElementById('scrPatPanel');
    if (patPanel && patPanel.classList.contains('open')) {
      loadPatristic(currentBook);
    }
  },

  close: function() {
    const modal = document.getElementById('scr-reader-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
    // Close footnote popovers
    document.querySelectorAll('.scr-fn-marker.active').forEach(function(m) {
      m.classList.remove('active');
      var pop = m.nextElementSibling;
      while (pop && !pop.classList.contains('scr-fn-popover')) pop = pop.nextElementSibling;
      if (pop) pop.classList.remove('open');
    });
  },

  goToChapter: function(ch) {
    if (ch < 1 || ch > totalChapters) return;
    currentChapter = ch;
    loadChapter();
    // Book completion detection
    if (currentChapter >= totalChapters && currentBook) {
      try { localStorage.setItem('achiev_bookworm_' + currentBook.replace(/[^a-zA-Z0-9]/g, '_'), 'true'); localStorage.setItem('achiev_bookworm', 'true'); if (typeof ScriptoriumCore !== 'undefined') ScriptoriumCore.checkAchievements(); } catch(e) {}
    }
  },

  nextChapter: function() {
    if (currentChapter < totalChapters) {
      currentChapter++;
      loadChapter();
      // Book completion detection
      if (currentChapter >= totalChapters && currentBook) {
        try { localStorage.setItem('achiev_bookworm_' + currentBook.replace(/[^a-zA-Z0-9]/g, '_'), 'true'); localStorage.setItem('achiev_bookworm', 'true'); if (typeof ScriptoriumCore !== 'undefined') ScriptoriumCore.checkAchievements(); } catch(e) {}
      }
    }
  },

  prevChapter: function() {
    if (currentChapter > 1) {
      currentChapter--;
      loadChapter();
    }
  },

  downloadChapter: downloadChapter,
  downloadBook: downloadBook,

  toggleCrossRefs: function() {
    var panel = document.getElementById('scrXrefPanel');
    var btn = document.getElementById('scrXrefToggle');
    if (!panel) return;
    panel.classList.toggle('open');
    if (btn) btn.classList.toggle('active');
    if (panel.classList.contains('open') && currentBook) {
      loadCrossRefs(currentBook, currentChapter);
    }
  },

  toggleNotes: function() {
    var panel = document.getElementById('scrPatPanel');
    var btn = document.getElementById('scrNotesToggle');
    if (!panel) return;
    panel.classList.toggle('open');
    if (btn) btn.classList.toggle('active');
    if (panel.classList.contains('open') && currentBook) {
      loadPatristic(currentBook);
    }
  },

  toggleAudio: function() {
    var bar = document.getElementById('scrAudioBar');
    var btn = document.getElementById('scrAudioToggle');
    if (!bar) return;
    bar.classList.toggle('open');
    if (btn) btn.classList.toggle('active');
    if (bar.classList.contains('open') && currentBook && currentChapter) {
      loadAudio(currentBook, currentChapter);
    } else if (!bar.classList.contains('open')) {
      var audio = document.getElementById('scrAudioPlayer');
      if (audio) { audio.pause(); audio.removeAttribute('src'); audio.load(); }
    }
  },

  openCrossRef: function(ref) {
    // Parse "Book Chapter:Verse" or "Book Chapter"
    var parts = ref.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
    if (!parts) return;
    var book = parts[1].trim();
    var chapter = parseInt(parts[2]);
    // Try to normalize book name
    var matched = null;
    for (var key in window.ScrReader.BOOK_CHAPTERS) {
      if (key.toLowerCase() === book.toLowerCase()) { matched = key; break; }
    }
    if (matched) {
      window.ScrReader.open(matched);
      if (chapter > 1) {
        setTimeout(function() { window.ScrReader.goToChapter(chapter); }, 500);
      }
    }
  },

  BOOK_CHAPTERS: BOOK_CHAPTERS
};

// Attach to core.js stub (replays queued calls) or set directly
if (window.ScrReader && window.ScrReader._queue) {
  window.ScrReader._real = readerApi;
} else {
  window.ScrReader = readerApi;
}

// ── INIT ───────────────────────────────────────────────────────────
function init() {
  injectStyles();
  injectModal();
  // Inject read buttons after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(injectReadButtons, 400);
    });
  } else {
    setTimeout(injectReadButtons, 400);
  }
  // Also re-inject when cards render (for dynamically rendered galleries)
  setTimeout(injectReadButtons, 1200);
  setTimeout(injectReadButtons, 2500);
}

init();

})(window);
