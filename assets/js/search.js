(function() {
'use strict';

var SearchUI = {
  overlay: null,
  input: null,
  resultsEl: null,
  filterEl: null,
  debounceTimer: null,

  init: function() {
    this.inject();
    this.addSearchButton();
    this.bindKeyboard();
  },

  inject: function() {
    if (document.getElementById('scrSearchOverlay')) return;
    var s = document.createElement('div');
    s.id = 'scrSearchOverlay';
    s.className = 'scr-search-overlay';
    s.innerHTML =
      '<div class="scr-search-backdrop"></div>' +
      '<div class="scr-search-panel">' +
        '<div class="scr-search-header">' +
          '<span class="scr-search-title">SEARCH THE SCRIPTURES</span>' +
          '<button class="scr-search-close" id="scrSearchClose">&times;</button>' +
        '</div>' +
        '<div class="scr-search-controls">' +
          '<input type="text" class="scr-search-input" id="scrSearchInput" placeholder="Search verses..." autofocus>' +
          '<select class="scr-search-filter" id="scrSearchFilter">' +
            '<option value="">All Testaments</option>' +
            '<option value="ot">Old Testament</option>' +
            '<option value="nt">New Testament</option>' +
            '<option value="ethiopian">Ethiopian Canon</option>' +
          '</select>' +
        '</div>' +
        '<div class="scr-search-results" id="scrSearchResults">' +
          '<div class="scr-search-empty">Begin typing to search across all scriptures</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(s);

    this.overlay = s;
    this.input = document.getElementById('scrSearchInput');
    this.resultsEl = document.getElementById('scrSearchResults');
    this.filterEl = document.getElementById('scrSearchFilter');

    var self = this;
    document.getElementById('scrSearchClose').addEventListener('click', function() { self.close(); });
    this.overlay.querySelector('.scr-search-backdrop').addEventListener('click', function() { self.close(); });

    this.input.addEventListener('input', function() {
      clearTimeout(self.debounceTimer);
      self.debounceTimer = setTimeout(function() { self.search(); }, 300);
    });

    this.filterEl.addEventListener('change', function() {
      if (self.input.value.trim().length >= 2) self.search();
    });

    this.input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        clearTimeout(self.debounceTimer);
        self.search();
      }
      if (e.key === 'Escape') self.close();
    });
  },

  addSearchButton: function() {
    var sidebar = document.querySelector('.sidebar-nav');
    if (!sidebar) return;
    var btn = document.createElement('button');
    btn.id = 'scrSearchBtn';
    btn.className = 'scr-search-btn';
    btn.title = 'Search the Scriptures';
    btn.innerHTML = '&#128269;';
    btn.addEventListener('click', function() { SearchUI.open(); });
    sidebar.appendChild(btn);
  },

  bindKeyboard: function() {
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        SearchUI.open();
      }
      if (e.key === 'Escape' && SearchUI.overlay && SearchUI.overlay.classList.contains('open')) {
        SearchUI.close();
      }
    });
  },

  open: function() {
    if (!this.overlay) this.inject();
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() { SearchUI.input.focus(); }, 100);
  },

  close: function() {
    if (this.overlay) this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  search: function() {
    var q = this.input.value.trim();
    var testament = this.filterEl.value;
    if (q.length < 2) {
      this.resultsEl.innerHTML = '<div class="scr-search-empty">Type at least 2 characters to search</div>';
      return;
    }

    this.resultsEl.innerHTML = '<div class="scr-search-loading">Searching...</div>';

    var url = '/api/search?q=' + encodeURIComponent(q) + '&limit=50';
    if (testament) url += '&testament=' + testament;

    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var results = data.results || [];
        if (results.length === 0) {
          SearchUI.resultsEl.innerHTML = '<div class="scr-search-empty">No results found for "' + window.escHtml(q) + '"</div>';
          return;
        }
        var html = '<div class="scr-search-count">' + results.length + ' result' + (results.length === 1 ? '' : 's') + ' for "' + window.escHtml(q) + '"</div>';
        results.forEach(function(r) {
          var ref = r.book + ' ' + r.chapter + ':' + r.verse;
          var era = r.era || '';
          var eraClass = era === 'nt' ? 'nt' : (era === 'ot' ? 'ot' : 'dc');
          html += '<div class="scr-search-result" data-book="' + r.bookId + '" data-chapter="' + r.chapter + '" data-verse="' + r.verse + '" onclick="SearchUI.openResult(\'' + r.book.replace(/'/g, "\\'") + '\', ' + r.chapter + ')">' +
            '<div class="scr-result-ref ' + eraClass + '">' + ref + '</div>' +
            '<div class="scr-result-text">' + r.text.substring(0, 200) + '</div>' +
          '</div>';
        });
        SearchUI.resultsEl.innerHTML = html;
      })
      .catch(function() {
        SearchUI.resultsEl.innerHTML = '<div class="scr-search-empty">Search failed. Try again.</div>';
      });
  },

  openResult: function(book, chapter) {
    this.close();
    if (window.ScrReader && window.ScrReader.open) {
      window.ScrReader.open(book);
      if (chapter > 1) {
        setTimeout(function() { window.ScrReader.goToChapter(chapter); }, 500);
      }
    }
  }
};

window.ScriptoriumSearch = SearchUI;

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { SearchUI.init(); });
} else {
  SearchUI.init();
}

})();
