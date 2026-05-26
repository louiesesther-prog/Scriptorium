(function() {
  'use strict';

  (function migrate() {
    var USER_KEY = 'scriptorium_user';
    if (localStorage.getItem(USER_KEY)) return;
    var a, s;
    try { a = JSON.parse(localStorage.getItem('activeScribe')); } catch(e) {}
    try { s = JSON.parse(localStorage.getItem('scribeData')); } catch(e) {}
    if (!a && !s) return;
    localStorage.setItem(USER_KEY, JSON.stringify({
      _v: 1,
      name: (a && a.name) || (s && s.name) || '',
      gender: (a && a.gender) || 'male',
      rank: (s && s.rank) || 'INITIATE',
      totalCharacters: (s && s.totalCharacters) || 0,
      dailyChars: (s && s.dailyChars) || 0,
      dailyDate: (s && s.dailyDate) || '',
      streak: (s && s.streak) || 0,
      knowledgeLevel: (a && a.knowledgeLevel) || '1',
      userId: (a && a.userId) || '',
      lastActive: Date.now(),
      versesCompleted: (s && s.versesCompleted) || 0,
      ntVerses: (s && s.ntVerses) || 0
    }));
  })();

  function computeRank(total) {
    if (total >= 1000000) return 'PRIME SCRIBE';
    if (total >= 500000) return 'MASTER SCRIBE';
    if (total >= 100000) return 'EXALTED SCRIBE';
    if (total >= 50000) return 'VENERATED SCRIBE';
    if (total >= 10000) return 'DEDICATED SCRIBE';
    if (total >= 5000) return 'FAITHFUL SCRIBE';
    if (total >= 1000) return 'APPRENTICE SCRIBE';
    return 'INITIATE';
  }

  function getUser() {
    try { return JSON.parse(localStorage.getItem('scriptorium_user') || 'null'); } catch(e) { return null; }
  }

  var SIDEBAR_HTML =
    '<aside class="museum-sidebar" id="sidebar">' +
      '<div class="sidebar-logo">' +
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:26px;height:26px;">' +
          '<path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="rgba(212,175,55,0.4)" stroke-width="0.5"/>' +
          '<path d="M12 2L3 7H21L12 2Z" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.3)" stroke-width="0.5"/>' +
          '<path d="M3 7V17L12 22V7" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" stroke-width="0.5"/>' +
          '<path d="M21 7V17L12 22V7" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.25)" stroke-width="0.5"/>' +
          '<line x1="12" y1="7" x2="12" y2="22" stroke="rgba(212,175,55,0.15)" stroke-width="0.3"/>' +
          '<line x1="3" y1="12" x2="21" y2="12" stroke="rgba(212,175,55,0.1)" stroke-width="0.3"/>' +
        '</svg>' +
      '</div>' +
      '<div class="streak-flame" id="streakFlame">' +
        '<svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:22px;">' +
          '<path d="M12 2C12 2 5 9 5 16C5 22 8 26 12 30C16 26 19 22 19 16C19 9 12 2 12 2Z" fill="rgba(212,175,55,0.4)"/>' +
          '<path d="M12 6C12 6 17 11.5 17 16C17 20 14.5 23.5 12 27C9.5 23.5 7 20 7 16C7 11.5 12 6 12 6Z" fill="rgba(212,175,55,0.7)" opacity="0.8"/>' +
        '</svg>' +
        '<div class="streak-counter" id="streakCounter"></div>' +
        '<div class="streak-tooltip">' +
          '<div class="streak-tooltip-title">DAILY STREAK</div>' +
          '<div class="streak-tooltip-days" id="streakDays">0</div>' +
          '<div class="streak-tooltip-sub" id="streakStatus">No active streak</div>' +
        '</div>' +
      '</div>' +
      '<nav class="sidebar-nav" id="sidebarNav">' +
        '<a href="scriptorium.html" class="nav-link" title="THE THRESHOLD">&#8984;</a>' +
        '<a href="covenant-map.html" class="nav-link" title="COVENANT MAP">&#128506;</a>' +
        '<a href="MAP.html" class="nav-link" title="BIBLICAL NAVIGATOR">&#129517;</a>' +
        '<a href="archive.html" class="nav-link" title="THE ARCHIVE">&#128214;</a>' +
        '<div class="nav-divider"></div>' +
        '<a href="genealogy.html" class="nav-link" title="GENEALOGY">&#9812;</a>' +
        '<a href="tabernacle.html" class="nav-link" title="TABERNACLE">&#127963;</a>' +
        '<a href="onomasticon.html" class="nav-link" title="ONOMASTICON">&#128209;</a>' +
        '<a href="ethiopian-canon.html" class="nav-link" title="TEWAHEDO ARCHIVE">&#9766;</a>' +
        '<a href="prophetic-mesh.html" class="nav-link" title="PROPHETIC MESH">&#9733;</a>' +
        '<a href="sanctum-3d.html" class="nav-link" title="3D SANCTUM">&#128750;</a>' +
        '<a href="scribes-chamber.html" class="nav-link" title="SCRIBES CHAMBER">&#128218;</a>' +
        '<a href="comparison-mode.html" class="nav-link" title="COMPARISON MODE">&#128100;</a>' +
        '<div class="nav-divider"></div>' +
        '<a href="settings.html" class="nav-link" title="RESTORATION ROOM">&#9881;</a>' +
        '<a href="register.html" class="nav-link" title="SCRIBE INDUCTION">&#128220;</a>' +
        '<a href="login.html" class="nav-link" id="loginNavLink" title="SIGN IN">&#128273;</a>' +
        '<div class="nav-divider"></div>' +
        '<a href="#" class="nav-link" id="signOutBtn" title="SIGN OUT" style="display:none;">&#128682;</a>' +
        '<a href="#" class="nav-link" id="typologyToggleBtn" title="TYPOLOGY" style="display:none;">&#10018;</a>' +
      '</nav>' +
      '<div class="sidebar-rank" id="sidebarRank">INITIATE<br><span style="opacity:0.5;font-size:0.75em;">0 chars</span></div>' +
    '</aside>';

  var STREAK_CSS =
    '.streak-flame{position:relative;display:flex;flex-direction:column;align-items:center;padding:10px 0;cursor:pointer;flex-shrink:0}' +
    '.streak-counter{font-size:0.55rem;color:rgba(212,175,55,0.7);font-family:"Cinzel",serif;margin-top:4px;letter-spacing:1px}' +
    '.streak-tooltip{position:absolute;left:calc(100% + 12px);top:50%;transform:translateY(-50%);background:#111;border:1px solid rgba(212,175,55,0.2);border-radius:4px;padding:8px 12px;pointer-events:none;opacity:0;transition:opacity 0.2s ease;z-index:9999;white-space:nowrap;min-width:140px}' +
    '.streak-flame:hover .streak-tooltip{opacity:1}' +
    '.streak-tooltip-title{font-family:"Cinzel",serif;font-size:0.45rem;letter-spacing:2px;color:#d4af37;margin-bottom:3px}' +
    '.streak-tooltip-days{font-family:"Cinzel",serif;font-size:1rem;color:#fff}' +
    '.streak-tooltip-sub{font-family:"Cormorant Garamond",serif;font-size:0.6rem;color:rgba(255,255,255,0.25);font-style:italic}';

  function injectSidebar() {
    var container = document.getElementById('sidebarContainer');
    if (!container) return;
    container.innerHTML = SIDEBAR_HTML;

    if (!document.getElementById('sidebarStreakStyle')) {
      var style = document.createElement('style');
      style.id = 'sidebarStreakStyle';
      style.textContent = STREAK_CSS;
      document.head.appendChild(style);
    }

    markActiveLink();
    updateRank();
    updateStreak();
    wireAuthState();
    wireTypology();
  }

  function markActiveLink() {
    var page = location.pathname.split('/').pop() || 'scriptorium.html';
    var links = document.querySelectorAll('#sidebarContainer .nav-link[href]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href === page) { links[i].classList.add('active'); break; }
    }
  }

  function updateRank() {
    var el = document.getElementById('sidebarRank');
    if (!el) return;
    var user = getUser();
    if (user) {
      var rank = user.rank || computeRank(user.totalCharacters || 0);
      var chars = (user.totalCharacters || 0).toLocaleString();
      el.innerHTML = rank + '<br><span style="opacity:0.5;font-size:0.75em;">' + chars + ' chars</span>';
    }
  }

  function updateStreak() {
    var user = getUser();
    if (!user) return;
    var streak = user.streak || 0;
    var counter = document.getElementById('streakCounter');
    var days = document.getElementById('streakDays');
    var status = document.getElementById('streakStatus');
    if (counter) counter.textContent = streak;
    if (days) days.textContent = streak;
    if (status) {
      if (streak === 0) status.textContent = 'No active streak';
      else if (streak < 7) status.textContent = streak + ' day' + (streak === 1 ? '' : 's');
      else if (streak < 30) status.textContent = 'C E L E S T I A L';
      else if (streak < 90) status.textContent = 'G U A R D I A N';
      else status.textContent = 'M A S T E R   S C R I B E';
    }
  }

  function wireAuthState() {
    var user = getUser();
    var loginLink = document.getElementById('loginNavLink');
    var signOutBtn = document.getElementById('signOutBtn');
    if (!loginLink) return;
    if (user && localStorage.getItem('scriptorium_session')) {
      loginLink.style.display = 'none';
      if (signOutBtn) {
        signOutBtn.style.display = '';
        signOutBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.Scriptorium && Scriptorium.logout) {
            Scriptorium.logout(true);
          } else {
            localStorage.removeItem('scriptorium_session');
            window.location.href = 'login.html';
          }
        });
      }
    }
  }

  function wireTypology() {
    var btn = document.getElementById('typologyToggleBtn');
    if (!btn) return;
    if (typeof toggleTypology === 'function') {
      btn.style.display = '';
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTypology();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSidebar);
  } else {
    injectSidebar();
  }

  window.__updateSidebarRank = function() { updateRank(); updateStreak(); };
  window.__getUnifiedUser = getUser;
})();
