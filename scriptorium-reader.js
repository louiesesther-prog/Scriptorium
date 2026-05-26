// ═══════════════════════════════════════════════════════════════════
// SCRIPTORIUM READER ENGINE — Read & Download Full Books
// Inject into NT, OT, and Ethiopian Canon pages
// ═══════════════════════════════════════════════════════════════════

(function(window) {

// ── PUBLIC DOMAIN BIBLE TEXT (KJV) via bible-api.com ──────────────
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

// API base
const API = 'https://bible-api.com/';

// ── STATE ──────────────────────────────────────────────────────────
let currentBook = '';
let currentChapter = 1;
let totalChapters = 1;
let chapterCache = {};
let isLoading = false;

// ── INJECT STYLES ──────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('scr-reader-styles')) return;
  const s = document.createElement('style');
  s.id = 'scr-reader-styles';
  s.textContent = `
/* ── READER MODAL ── */
#scr-reader-modal {
  position:fixed;inset:0;z-index:9000;
  background:rgba(0,0,0,0.94);backdrop-filter:blur(12px);
  display:none;flex-direction:column;
  font-family:'Cormorant Garamond',serif;
}
#scr-reader-modal.open { display:flex; }

.scr-reader-shell {
  display:flex;flex-direction:column;
  width:100%;max-width:860px;
  margin:0 auto;height:100vh;
  overflow:hidden;
}

/* HEADER */
.scr-reader-header {
  flex-shrink:0;
  padding:22px 32px 0;
  border-bottom:1px solid rgba(212,175,55,0.12);
  background:linear-gradient(180deg,#0a0906 0%,transparent 100%);
}
.scr-reader-title-row {
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:16px;
}
.scr-reader-book-name {
  font-family:'Cinzel',serif;
  font-size:1.1rem;letter-spacing:4px;
  color:#d4af37;
}
.scr-reader-close {
  background:none;border:1px solid rgba(212,175,55,0.2);
  color:rgba(212,175,55,0.5);padding:6px 14px;
  font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:3px;
  cursor:pointer;transition:0.25s;
}
.scr-reader-close:hover { border-color:#d4af37;color:#d4af37; }

/* CHAPTER NAV TABS */
.scr-chapter-tabs {
  display:flex;gap:0;overflow-x:auto;
  scrollbar-width:none;padding-bottom:0;
}
.scr-chapter-tabs::-webkit-scrollbar { display:none; }
.scr-tab {
  flex-shrink:0;
  padding:8px 13px;
  font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:1px;
  color:rgba(212,175,55,0.4);
  border:none;border-bottom:2px solid transparent;
  background:none;cursor:pointer;transition:0.2s;white-space:nowrap;
}
.scr-tab:hover { color:rgba(212,175,55,0.75); }
.scr-tab.active {
  color:#d4af37;
  border-bottom-color:#d4af37;
}

/* READING AREA */
.scr-reading-area {
  flex:1;overflow-y:auto;
  padding:40px 48px 60px;
  scrollbar-width:thin;
  scrollbar-color:rgba(212,175,55,0.15) transparent;
}
.scr-reading-area::-webkit-scrollbar { width:3px; }
.scr-reading-area::-webkit-scrollbar-thumb { background:rgba(212,175,55,0.15); }

.scr-chapter-heading {
  font-family:'Cinzel',serif;
  font-size:0.7rem;letter-spacing:5px;
  color:rgba(212,175,55,0.4);
  margin-bottom:28px;
  border-bottom:1px solid rgba(212,175,55,0.08);
  padding-bottom:14px;
}

.scr-verse {
  display:flex;gap:16px;
  margin-bottom:14px;
  line-height:1.9;
}
.scr-verse-num {
  flex-shrink:0;
  font-family:'Cinzel',serif;
  font-size:0.62rem;letter-spacing:1px;
  color:rgba(212,175,55,0.35);
  min-width:26px;
  padding-top:3px;
}
.scr-verse-text {
  font-size:1.12rem;
  color:rgba(255,255,255,0.82);
  flex:1;
}

/* Loading / Error */
.scr-loading {
  text-align:center;padding:80px 20px;
  font-family:'Cinzel',serif;font-size:0.7rem;
  letter-spacing:4px;color:rgba(212,175,55,0.3);
  animation:scr-pulse 1.5s ease infinite;
}
@keyframes scr-pulse { 0%,100%{opacity:0.3}50%{opacity:0.8} }
.scr-error {
  text-align:center;padding:60px 20px;
  font-family:'Cormorant Garamond',serif;font-style:italic;
  color:rgba(255,100,100,0.5);font-size:1rem;line-height:1.8;
}
.scr-offline-text {
  font-family:'Cormorant Garamond',serif;
  font-size:1.08rem;line-height:1.9;
  color:rgba(255,255,255,0.72);
  white-space:pre-wrap;
}

/* FOOTER NAV */
.scr-reader-footer {
  flex-shrink:0;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 32px;
  border-top:1px solid rgba(212,175,55,0.1);
  background:#060504;
}
.scr-nav-btn {
  background:rgba(212,175,55,0.04);
  border:1px solid rgba(212,175,55,0.2);
  color:rgba(212,175,55,0.7);
  padding:9px 22px;
  font-family:'Cinzel',serif;font-size:0.62rem;letter-spacing:2px;
  cursor:pointer;transition:0.25s;
}
.scr-nav-btn:hover:not(:disabled) { background:rgba(212,175,55,0.1);color:#d4af37;border-color:#d4af37; }
.scr-nav-btn:disabled { opacity:0.25;cursor:not-allowed; }

.scr-progress {
  font-family:'Cinzel',serif;font-size:0.62rem;letter-spacing:3px;
  color:rgba(212,175,55,0.4);text-align:center;
}
.scr-progress-bar {
  height:1px;width:120px;background:rgba(212,175,55,0.1);
  margin:5px auto 0;
}
.scr-progress-fill {
  height:100%;background:#d4af37;transition:width 0.3s;
}

.scr-download-btn {
  background:rgba(212,175,55,0.08);
  border:1px solid rgba(212,175,55,0.3);
  color:#d4af37;
  padding:9px 18px;
  font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:2px;
  cursor:pointer;transition:0.25s;display:flex;align-items:center;gap:7px;
}
.scr-download-btn:hover { background:rgba(212,175,55,0.14);border-color:#d4af37; }

/* READ BUTTON on cards */
.scr-read-btn {
  display:inline-block;
  padding:8px 16px;
  font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:2px;
  border:1px solid rgba(212,175,55,0.3);
  color:rgba(212,175,55,0.8);
  background:transparent;cursor:pointer;transition:0.25s;
  margin-top:6px;
}
.scr-read-btn:hover { background:rgba(212,175,55,0.08);color:#d4af37;border-color:#d4af37; }

@media(max-width:640px){
  .scr-reading-area { padding:24px 20px 48px; }
  .scr-reader-header { padding:16px 16px 0; }
  .scr-reader-footer { padding:12px 16px; }
  .scr-reader-book-name { font-size:0.85rem;letter-spacing:2px; }
}
`;
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
          <button class="scr-reader-close" onclick="ScrReader.close()">[ × ] CLOSE</button>
        </div>
        <div class="scr-chapter-tabs" id="scr-chapter-tabs"></div>
      </div>
      <div class="scr-reading-area" id="scr-reading-area">
        <div class="scr-loading">UNSEALING THE SCROLL...</div>
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

// ── FETCH CHAPTER TEXT ─────────────────────────────────────────────
function fetchChapter(book, chapter, callback) {
  const key = book + '|' + chapter;
  if (chapterCache[key]) { callback(null, chapterCache[key]); return; }

  // Normalise book name for API
  const apiBook = book.replace(/ /g, '+');
  const url = API + apiBook + '+' + chapter + '?translation=kjv&verse_numbers=true';

  fetch(url)
    .then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function(data) {
      chapterCache[key] = data;
      callback(null, data);
    })
    .catch(function(err) {
      callback(err, null);
    });
}

// ── RENDER CHAPTER ─────────────────────────────────────────────────
function renderChapter(data) {
  const area = document.getElementById('scr-reading-area');
  if (!area) return;

  if (!data || !data.verses || data.verses.length === 0) {
    area.innerHTML = `<div class="scr-error">
      This scroll is not yet available through the digital API.<br><br>
      <a href="https://www.biblegateway.com/passage/?search=${encodeURIComponent(currentBook + '+' + currentChapter)}&version=KJV"
         target="_blank" rel="noopener"
         style="color:rgba(212,175,55,0.6);font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:2px;">
        READ ON BIBLE GATEWAY →
      </a>
    </div>`;
    return;
  }

  let html = `<div class="scr-chapter-heading">${currentBook.toUpperCase()} · CHAPTER ${currentChapter}</div>`;
  data.verses.forEach(function(v) {
    html += `<div class="scr-verse">
      <span class="scr-verse-num">${v.verse}</span>
      <span class="scr-verse-text">${v.text}</span>
    </div>`;
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

  fetchChapter(currentBook, currentChapter, function(err, data) {
    isLoading = false;
    if (err || !data) {
      // Fallback: Ethiopian or apocryphal — link to external
      const srcUrl = ETHIOPIAN_SOURCES[currentBook];
      const area2 = document.getElementById('scr-reading-area');
      if (area2) {
        area2.innerHTML = `<div class="scr-error">
          <strong style="color:rgba(212,175,55,0.7);font-family:'Cinzel',serif;letter-spacing:2px;">${currentBook.toUpperCase()}</strong><br><br>
          This text is not available via the live API for Chapter ${currentChapter}.<br><br>
          ${srcUrl
            ? `<a href="${srcUrl}" target="_blank" rel="noopener" style="color:rgba(212,175,55,0.6);font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:2px;">READ FULL TEXT ON SACRED-TEXTS.COM →</a>`
            : `<a href="https://www.biblegateway.com/passage/?search=${encodeURIComponent(currentBook + '+' + currentChapter)}&version=KJV" target="_blank" rel="noopener" style="color:rgba(212,175,55,0.6);font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:2px;">READ ON BIBLE GATEWAY →</a>`
          }<br><br>
          <a href="${generateDownloadUrl()}" style="color:rgba(200,200,200,0.4);font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:2px;" onclick="ScrReader.downloadBook();return false;">⬇ DOWNLOAD AVAILABLE TEXT</a>
        </div>`;
      }
    } else {
      renderChapter(data);
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

// ── PUBLIC API ─────────────────────────────────────────────────────
window.ScrReader = {
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
    chapterCache = {};

    const modal = document.getElementById('scr-reader-modal');
    const nameEl = document.getElementById('scr-book-name');
    if (!modal || !nameEl) return;

    nameEl.textContent = bookName.toUpperCase();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    buildTabs(totalChapters);
    loadChapter();
  },

  close: function() {
    const modal = document.getElementById('scr-reader-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  },

  goToChapter: function(ch) {
    if (ch < 1 || ch > totalChapters) return;
    currentChapter = ch;
    loadChapter();
  },

  nextChapter: function() {
    if (currentChapter < totalChapters) {
      currentChapter++;
      loadChapter();
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
  BOOK_CHAPTERS: BOOK_CHAPTERS
};

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
