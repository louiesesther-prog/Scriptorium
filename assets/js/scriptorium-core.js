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
