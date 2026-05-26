(function() {
  'use strict';
  var ScriptoriumCore = {
    init: function() {
      this.setupTransitionCurtain();
      this.setupKeyboardNav();
    },
    setupTransitionCurtain: function() {
      var overlay = document.querySelector('.transition-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        overlay.innerHTML = '<div class="transition-flame-container"><div class="flickering-glow"></div><div class="ink-glyph-reveal">SCRIPTORIUM</div></div>';
        document.body.appendChild(overlay);
      }
      document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])').forEach(function(link) {
        if (link.href.indexOf(location.hostname) > -1 || link.href.indexOf('/') === -1) {
          link.addEventListener('click', function(e) {
            if (link.href.indexOf('scriptorium') === -1 && link.href.indexOf(location.hostname) === -1) return;
            overlay.classList.add('active');
            setTimeout(function() { window.location.href = link.href; }, 900);
            e.preventDefault();
          });
        }
      });
    },
    setupKeyboardNav: function() {
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          var overlays = document.querySelectorAll('.transition-overlay.active, .excavation-overlay.active, .artifact-panel.active');
          overlays.forEach(function(o) { o.classList.remove('active'); });
        }
      });
    }
  };
  window.ScriptoriumCore = ScriptoriumCore;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { ScriptoriumCore.init(); });
  } else {
    ScriptoriumCore.init();
  }
})();

/* ═══════════════════════════════════════
   SCRIPTORIUM GLOBAL READER CONTROLLER
   Shared across ot-gallery, nt-gallery,
   and ethiopian-canon pages.
   ═══════════════════════════════════════ */
window.activeBookContext = { id: '', era: '', downloadUrl: '' };

window.launchScriptoriumReader = function(bookId, era, fileId) {
  var formattedId = bookId.toUpperCase().trim();
  activeBookContext.id = formattedId;
  activeBookContext.era = era;
  var fileSlug = (fileId || bookId).toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  var documentPath = 'assets/docs/' + era + '/' + fileSlug + '.pdf';
  activeBookContext.downloadUrl = documentPath;
  var titleEl = document.getElementById('readerBookTitle');
  var subtextEl = document.getElementById('readerSubtext');
  var dlAction = document.getElementById('readerDownloadAction');
  if (titleEl) titleEl.innerText = formattedId;
  if (subtextEl) subtextEl.innerText = 'Illuminated Compendium \u2014 ' + era.toUpperCase() + ' Canonical Selection';
  if (dlAction) {
    dlAction.href = documentPath;
    dlAction.setAttribute('download', formattedId + '_Scriptorium_Archive.pdf');
  }
  setReaderDisplay('text');
  loadInteractiveText(formattedId, era);
  var modal = document.getElementById('scriptoriumReaderModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('active');
  }
};

window.loadInteractiveText = function(bookId, era) {
  var container = document.getElementById('readerTextDisplay');
  if (!container) return;
  container.innerHTML = '<p style="text-align:center;color:rgba(212,175,55,0.6);">Fetching ancient script records...</p>';
  fetch('assets/data/bible-text/' + bookId + '.json')
    .then(function(r) { if (!r.ok) throw new Error('Not found'); return r.json(); })
    .then(function(data) {
      var html = '';
      if (data.chapters) {
        data.chapters.forEach(function(ch) {
          html += '<h3 style="color:#d4af37;font-family:Cinzel,serif;margin-top:20px;border-bottom:1px solid rgba(212,175,55,0.1);">CHAPTER ' + ch.number + '</h3><p>';
          if (ch.verses) {
            ch.verses.forEach(function(v, i) {
              html += '<sup style="color:#d4af37;font-size:0.75rem;margin-right:4px;">' + (i + 1) + '</sup>' + v + ' ';
            });
          }
          html += '</p>';
        });
      }
      container.innerHTML = html || '<p style="text-align:center;color:rgba(255,255,255,0.4);">Text content unavailable.</p>';
    })
    .catch(function() {
      container.innerHTML = '<div style="text-align:center;padding:20px;font-family:Cormorant Garamond,serif;"><p style="font-style:italic;color:rgba(255,255,255,0.6);">Interactive text transcription under preservation.</p><p style="font-size:1rem;color:rgba(255,255,255,0.4);">Click the <strong>"Archival Print"</strong> tab above to preview the complete unabridged book pages via the embedded reader stream.</p></div>';
    });
};

window.setReaderDisplay = function(mode) {
  var textTab = document.getElementById('tabTextMode');
  var pdfTab = document.getElementById('tabPdfMode');
  var textDiv = document.getElementById('readerTextDisplay');
  var pdfDiv = document.getElementById('readerPdfDisplay');
  var iframe = document.getElementById('readerDocumentFrame');
  if (!textTab || !pdfTab) return;
  if (mode === 'text') {
    textTab.style.background = 'rgba(212,175,55,0.15)';
    textTab.style.borderColor = '#d4af37';
    pdfTab.style.background = 'transparent';
    pdfTab.style.borderColor = 'rgba(212,175,55,0.3)';
    if (textDiv) textDiv.style.display = 'block';
    if (pdfDiv) pdfDiv.style.display = 'none';
  } else {
    pdfTab.style.background = 'rgba(212,175,55,0.15)';
    pdfTab.style.borderColor = '#d4af37';
    textTab.style.background = 'transparent';
    textTab.style.borderColor = 'rgba(212,175,55,0.3)';
    if (pdfDiv) pdfDiv.style.display = 'block';
    if (textDiv) textDiv.style.display = 'none';
    if (iframe && activeBookContext.downloadUrl) {
      iframe.src = activeBookContext.downloadUrl;
    }
  }
};

window.closeScriptoriumReader = function() {
  var modal = document.getElementById('scriptoriumReaderModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
  var iframe = document.getElementById('readerDocumentFrame');
  if (iframe) iframe.src = '';
};
