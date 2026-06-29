(function() {
'use strict';

var Features = {
  init: function() {
    this.initTheme();
    this.initFontSize();
    this.initBookmarkSync();
    this.initDailyVerse();
    this.initReadingLog();
    this.initSidebarFeatures();
    this.initTypology();
  },

  // ── Auth helpers ──
  getToken: function() {
    if (window.Scriptorium && window.Scriptorium.getToken) return window.Scriptorium.getToken();
    try { return localStorage.getItem('scriptorium_token'); } catch(e) { return null; }
  },

  isLoggedIn: function() {
    return !!this.getToken();
  },

  api: function(method, path, body) {
    var token = this.getToken();
    var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
    if (body && method !== 'GET') opts.body = JSON.stringify(body);
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    return fetch(path, opts).then(function(r) { return r.json().catch(function() { return {}; }); });
  },

  // ── Dark/Light Theme ──
  initTheme: function() {
    var saved = localStorage.getItem('scriptorium_theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  },

  toggleTheme: function() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    if (current === 'light') {
      html.removeAttribute('data-theme');
      localStorage.setItem('scriptorium_theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('scriptorium_theme', 'light');
    }
  },

  // ── Font Size ──
  initFontSize: function() {
    var saved = localStorage.getItem('scriptorium_font_size');
    if (!saved) saved = '100';
    document.documentElement.style.fontSize = saved + '%';
  },

  setFontSize: function(dir) {
    var current = parseInt(localStorage.getItem('scriptorium_font_size') || '100');
    var next = Math.max(70, Math.min(150, current + dir * 10));
    document.documentElement.style.fontSize = next + '%';
    localStorage.setItem('scriptorium_font_size', String(next));
    var label = document.getElementById('fontSizeLabel');
    if (label) label.textContent = next + '%';
  },

  // ── Bookmark Sync (deferred — non-blocking) ──
  initBookmarkSync: function() {
    if (!this.isLoggedIn()) return;
    var self = this;
    setTimeout(function() {
      var local = self.getLocalBookmarks();
      if (local.length === 0) return;
      self.api('GET', '/api/bookmarks').then(function(server) {
        if (!server || !server.bookmarks) return;
        var serverKeys = {};
        server.bookmarks.forEach(function(b) { serverKeys[b.bookId + ':' + b.chapter + ':' + b.verse] = true; });
        local.forEach(function(b) {
          if (!serverKeys[b.bookId + ':' + b.chapter + ':' + b.verse]) {
            self.api('POST', '/api/bookmarks', {
              bookId: b.bookId, bookName: b.bookName, chapter: b.chapter, verse: b.verse, text: b.text, color: b.color || '#d4af37', note: b.note || ''
            });
          }
        });
      });
    }, 0);
  },

  getLocalBookmarks: function() {
    try { return JSON.parse(localStorage.getItem('scriptorium_bookmarks') || '[]'); } catch(e) { return []; }
  },

  saveLocalBookmarks: function(bookmarks) {
    try { localStorage.setItem('scriptorium_bookmarks', JSON.stringify(bookmarks)); } catch(e) {}
  },

  syncBookmarkToggle: function(bookId, bookName, chapter, verse, text) {
    if (!this.isLoggedIn()) {
      // Local only
      var bookmarks = this.getLocalBookmarks();
      var idx = bookmarks.findIndex(function(b) { return b.bookId === bookId && b.chapter === chapter && b.verse === verse; });
      if (idx >= 0) { bookmarks.splice(idx, 1); this.saveLocalBookmarks(bookmarks); return false; }
      bookmarks.push({ id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4), bookId: bookId, bookName: bookName || bookId, chapter: chapter, verse: verse, text: (text || '').substring(0, 200), timestamp: Date.now() });
      this.saveLocalBookmarks(bookmarks);
      return true;
    }
    // Server sync
    var self = this;
    return this.api('GET', '/api/bookmarks').then(function(resp) {
      if (!resp || !resp.bookmarks) return;
      var existing = resp.bookmarks.find(function(b) { return b.bookId === bookId && b.chapter === chapter && b.verse === verse; });
      if (existing) {
        return self.api('DELETE', '/api/bookmarks/' + existing.id).then(function() { return false; });
      }
      return self.api('POST', '/api/bookmarks', { bookId: bookId, bookName: bookName || bookId, chapter: chapter, verse: verse, text: (text || '').substring(0, 200) }).then(function() { return true; });
    });
  },

  isBookmarked: function(bookId, chapter, verse) {
    var bookmarks = this.getLocalBookmarks();
    if (bookmarks.some(function(b) { return b.bookId === bookId && b.chapter === chapter && b.verse === verse; })) return true;
    if (!this.isLoggedIn()) return false;
    // We don't block on server check — caller should handle async
    return false;
  },

  // ── Daily Verse ──
  initDailyVerse: function() {
    var container = document.getElementById('dailyVerseWidget');
    if (!container) return;
    this.api('GET', '/api/daily-verse').then(function(v) {
      if (!v || !v.ref) return;
      container.innerHTML = '<p class="verse-text">"' + v.text + '"</p><p class="verse-ref">— ' + v.ref + '</p>';
    });
  },

  // ── Reading Log ──
  initReadingLog: function() {
    // Called by reader when a chapter is loaded
    window.activeReadingContext = null;
    var self = this;
    window.logChapterRead = function(bookId, chapter) {
      if (!self.isLoggedIn()) return;
      self.api('POST', '/api/reading/log', { bookId: bookId, chapter: chapter });
    };
  },

  // ── Reading Streak Calendar ──
  loadStreakCalendar: function(containerId) {
    var container = document.getElementById(containerId);
    if (!container || !this.isLoggedIn()) return;
    var self = this;
    this.api('GET', '/api/reading/history?days=365').then(function(data) {
      if (!data || !data.history) return;

      // Build lookup: date -> count
      var lookup = {};
      (data.history || []).forEach(function(h) { lookup[h.date] = h.count; });

      // Generate last 12 weeks of days
      var html = '<div class="streak-calendar">';
      var today = new Date();
      var monthLabels = {};
      for (var i = 83; i >= 0; i--) {
        var d = new Date(today.getTime() - i * 86400000);
        var dateStr = d.toISOString().split('T')[0];
        var count = lookup[dateStr] || 0;
        var level = count > 0 ? Math.min(5, count) : 0;
        html += '<div class="streak-day level-' + level + '" title="' + dateStr + ': ' + count + ' chapters"></div>';
        // Month label every ~4 weeks
        var monthKey = d.getFullYear() + '-' + (d.getMonth() + 1);
        if (!monthLabels[monthKey] && d.getDate() <= 7) {
          monthLabels[monthKey] = true;
        }
      }
      html += '</div>';
      var label = 'CURRENT STREAK: ' + (data.streak || 0) + ' DAYS';
      if (data.withinGrace) label += ' — held in grace (' + (data.graceDays || 0) + ' day' + ((data.graceDays || 0) === 1 ? '' : 's') + ')';
      html += '<div class="streak-label">' + label + '</div>';
      container.innerHTML = html;
    });
  },

  // ── Sidebar Enhancements ──
  initSidebarFeatures: function() {
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    var nav = sidebar.querySelector('.sidebar-nav');
    if (!nav) return;

    // Theme toggle (skip if already present)
    if (!document.getElementById('themeToggle')) {
      var themeBtn = document.createElement('button');
      themeBtn.className = 'theme-toggle';
      themeBtn.id = 'themeToggle';
      themeBtn.title = 'Toggle light/dark theme';
      themeBtn.innerHTML = '&#9790;';
      themeBtn.addEventListener('click', function() { Features.toggleTheme(); });
      nav.appendChild(themeBtn);
    }

    // Font size controls (skip if already present)
    if (!document.getElementById('fontSizeControls')) {
      var fontSizeDiv = document.createElement('div');
      fontSizeDiv.className = 'font-size-controls';
      fontSizeDiv.id = 'fontSizeControls';
      fontSizeDiv.innerHTML = '<button class="font-size-btn" id="fontSizeDown" title="Decrease font size">A-</button>' +
        '<span class="font-size-label" id="fontSizeLabel">100%</span>' +
        '<button class="font-size-btn" id="fontSizeUp" title="Increase font size">A+</button>';
      nav.appendChild(fontSizeDiv);
      document.getElementById('fontSizeDown').addEventListener('click', function() { Features.setFontSize(-1); });
      document.getElementById('fontSizeUp').addEventListener('click', function() { Features.setFontSize(1); });
    }

    // Daily verse widget (skip if already present)
    if (!document.getElementById('dailyVerseWidget')) {
      var verseWidget = document.createElement('div');
      verseWidget.id = 'dailyVerseWidget';
      verseWidget.className = 'daily-verse-widget';
      nav.appendChild(verseWidget);
    }

    // Typology overlay button (skip if already present)
    if (!document.getElementById('tyToggleBtn')) {
      var tyBtn = document.createElement('button');
      tyBtn.className = 'scr-ty-btn';
      tyBtn.id = 'tyToggleBtn';
      tyBtn.title = 'Typological Threads — OT types & NT fulfillments';
      tyBtn.innerHTML = '&#9763;';
      tyBtn.addEventListener('click', function() { Features.toggleTypologyOverlay(); });
      nav.appendChild(tyBtn);
    }
  },

  // ── Typology Overlay ──
  tyOverlayEl: null,

  toggleTypologyOverlay: function(category) {
    if (this.tyOverlayEl && this.tyOverlayEl.classList.contains('open')) {
      this.closeTypologyOverlay();
      return;
    }
    this.openTypologyOverlay(category);
  },

  openTypologyOverlay: function(category) {
    var self = this;
    if (!this.tyOverlayEl) {
      var overlay = document.createElement('div');
      overlay.className = 'scr-ty-overlay';
      overlay.id = 'scrTypologyOverlay';
      overlay.innerHTML =
        '<div class="scr-ty-backdrop"></div>' +
        '<div class="scr-ty-panel">' +
          '<div class="scr-ty-header">' +
            '<span class="scr-ty-title">TYPOLOGICAL THREADS</span>' +
            '<button class="scr-ty-close" id="tyCloseBtn">&times;</button>' +
          '</div>' +
          '<div class="scr-ty-body" id="tyBody"></div>' +
        '</div>';
      document.body.appendChild(overlay);
      overlay.querySelector('.scr-ty-backdrop').addEventListener('click', function() { self.closeTypologyOverlay(); });
      overlay.querySelector('#tyCloseBtn').addEventListener('click', function() { self.closeTypologyOverlay(); });
      this.tyOverlayEl = overlay;
    }
    // Populate body using the render function from scriptorium-core.js
    var body = document.getElementById('tyBody');
    if (window.renderTypologyThreads) {
      window.renderTypologyThreads('tyBody', category || '');
    } else {
      body.innerHTML = '<p style="text-align:center;color:rgba(212,175,55,0.5);padding:30px;font-style:italic;">Typology data not loaded.</p>';
    }
    this.tyOverlayEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!localStorage.getItem('typology_viewed')) {
      localStorage.setItem('typology_viewed', 'true');
      if (window.ScriptoriumCore) setTimeout(function() { ScriptoriumCore.checkAchievements(); }, 300);
    }
  },

  closeTypologyOverlay: function() {
    if (this.tyOverlayEl) {
      this.tyOverlayEl.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  initTypology: function() {
    var self = this;
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && self.tyOverlayEl && self.tyOverlayEl.classList.contains('open')) {
        self.closeTypologyOverlay();
      }
    });
  }
};

// ── Book name/abbreviation → API slug map ──
var BOOK_SLUGS = (function() {
  var m = {};
  function add() {
    var slug = arguments[0];
    for (var i = 1; i < arguments.length; i++) m[arguments[i].toLowerCase()] = slug;
  }
  add('genesis','Genesis','Gen','Ge');
  add('exodus','Exodus','Exod','Ex','Exo');
  add('leviticus','Leviticus','Lev','Le');
  add('numbers','Numbers','Num','Nu');
  add('deuteronomy','Deuteronomy','Deut','De','Dt');
  add('joshua','Joshua','Josh','Jos');
  add('judges','Judges','Judg','Jdg');
  add('ruth','Ruth','Rth','Ru');
  add('1 samuel','1 Samuel','1 Sam','1Sa','I Sam','I Samuel');
  add('2 samuel','2 Samuel','2 Sam','2Sa','II Sam','II Samuel');
  add('1 kings','1 Kings','1 Kgs','1Ki','I Kgs','I Kings');
  add('2 kings','2 Kings','2 Kgs','2Ki','II Kgs','II Kings');
  add('1 chronicles','1 Chronicles','1 Chr','1Ch','I Chr','I Chronicles');
  add('2 chronicles','2 Chronicles','2 Chr','2Ch','II Chr','II Chronicles');
  add('ezra','Ezra','Ezr');
  add('nehemiah','Nehemiah','Neh');
  add('esther','Esther','Est','Esth');
  add('job','Job');
  add('psalms','Psalms','Psalm','Ps','Psa');
  add('proverbs','Proverbs','Prov','Pr','Pro');
  add('ecclesiastes','Ecclesiastes','Eccl','Ecc','Ec','Qoh');
  add('song of solomon','Song of Solomon','Song','Song of Songs','SoS','SOS');
  add('isaiah','Isaiah','Isa');
  add('jeremiah','Jeremiah','Jer','Je');
  add('lamentations','Lamentations','Lam','La');
  add('ezekiel','Ezekiel','Ezek','Eze');
  add('daniel','Daniel','Dan','Da');
  add('hosea','Hosea','Hos');
  add('joel','Joel','Joe','Jl');
  add('amos','Amos');
  add('obadiah','Obadiah','Obad');
  add('jonah','Jonah','Jon');
  add('micah','Micah','Mic');
  add('nahum','Nahum','Nah');
  add('habakkuk','Habakkuk','Hab');
  add('zephaniah','Zephaniah','Zeph','Zep');
  add('haggai','Haggai','Hag');
  add('zechariah','Zechariah','Zech','Zec');
  add('malachi','Malachi','Mal');
  add('matthew','Matthew','Matt','Mt');
  add('mark','Mark','Mk');
  add('luke','Luke','Lk');
  add('john','John','Jn','Jhn');
  add('acts','Acts','Ac');
  add('romans','Romans','Rom','Ro');
  add('1 corinthians','1 Corinthians','1 Cor','1Co','I Cor','I Corinthians');
  add('2 corinthians','2 Corinthians','2 Cor','2Co','II Cor','II Corinthians');
  add('galatians','Galatians','Gal','Ga');
  add('ephesians','Ephesians','Eph','Ep');
  add('philippians','Philippians','Phil','Php');
  add('colossians','Colossians','Col');
  add('1 thessalonians','1 Thessalonians','1 Thess','1Th','I Thess','I Thessalonians');
  add('2 thessalonians','2 Thessalonians','2 Thess','2Th','II Thess','II Thessalonians');
  add('1 timothy','1 Timothy','1 Tim','1Ti','I Tim','I Timothy');
  add('2 timothy','2 Timothy','2 Tim','2Ti','II Tim','II Timothy');
  add('titus','Titus','Tit');
  add('philemon','Philemon','Philem','Phlm');
  add('hebrews','Hebrews','Heb');
  add('james','James','Jas','Ja');
  add('1 peter','1 Peter','1 Pet','1Pe','I Pet','I Peter');
  add('2 peter','2 Peter','2 Pet','2Pe','II Pet','II Peter');
  add('1 john','1 John','1 Jn','1Jo','I Jn','I John');
  add('2 john','2 John','2 Jn','2Jo','II Jn','II John');
  add('3 john','3 John','3 Jn','3Jo','III Jn','III John');
  add('jude','Jude');
  add('revelation','Revelation','Rev','Re');
  return m;
})();

// Build regex pattern from book names (longest first)
var BOOK_PATTERN = (function() {
  var names = Object.keys(BOOK_SLUGS).sort(function(a,b) { return b.length - a.length; });
  // Escape regex special chars and join
  var escaped = names.map(function(n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
  return '(' + escaped.join('|') + ')';
})();
var REF_REGEX = new RegExp('\\b' + BOOK_PATTERN + '\\s+(\\d+)(?:[:.]\\s*(\\d+))?\\b', 'gi');

function linkifyNode(node) {
  if (node.nodeType === 3) {
    var text = node.nodeValue;
    var match;
    REF_REGEX.lastIndex = 0;
    if (!REF_REGEX.test(text)) return;
    REF_REGEX.lastIndex = 0;
    var fragment = document.createDocumentFragment();
    var lastIdx = 0;
    while ((match = REF_REGEX.exec(text)) !== null) {
      // Skip matches inside HTML tags or existing links
      var before = text.substring(0, match.index);
      if (/<[^>]*$/.test(before)) continue;
      // Add text before match
      if (match.index > lastIdx) fragment.appendChild(document.createTextNode(text.substring(lastIdx, match.index)));
      var bookName = match[1];
      var chapter = parseInt(match[2]);
      var verse = match[3] ? parseInt(match[3]) : 1;
      var slug = BOOK_SLUGS[bookName.toLowerCase()];
      if (slug) {
        var a = document.createElement('a');
        a.className = 'scr-ref-link';
        a.textContent = match[0];
        a.href = '#';
        a.addEventListener('click', (function(s, c, v) {
          return function(e) {
            e.preventDefault();
            if (window.showVerseQuickLook) window.showVerseQuickLook(s, c, v);
          };
        })(slug, chapter, verse));
        fragment.appendChild(a);
      } else {
        fragment.appendChild(document.createTextNode(match[0]));
      }
      lastIdx = match.index + match[0].length;
    }
    if (lastIdx < text.length) fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
    node.parentNode.replaceChild(fragment, node);
  } else if (node.nodeType === 1 && !/^(script|style|a|textarea|input|select|option)$/i.test(node.tagName)) {
    var child = node.firstChild;
    while (child) {
      var next = child.nextSibling;
      linkifyNode(child);
      child = next;
    }
  }
}

Features.linkifyReferences = function(container) {
  linkifyNode(container || document.body);
};

// ── Override init to include linkification ──
var origInit = Features.init;
Features.init = function() {
  origInit.call(this);
  // Linkify on DOMContentLoaded and on dynamic content changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { Features.linkifyReferences(); });
  } else {
    Features.linkifyReferences();
  }
  // MutationObserver for dynamically added content
  var observer = new MutationObserver(function(muts) {
    for (var i = 0; i < muts.length; i++) {
      var added = muts[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        if (added[j].nodeType === 1) linkifyNode(added[j]);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

window.ScriptoriumFeatures = Features;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { Features.init(); });
} else {
  Features.init();
}
})();
