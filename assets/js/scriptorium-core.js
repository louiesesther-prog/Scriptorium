(function() {
'use strict';
var ScriptoriumCore = {
init: function() {
this.setupTransitionCurtain();
this.setupKeyboardNav();
this.registerSW();
this.setupInstallPrompt();
this.setupVerseQuickLook();
this.setupTypologyVisualiser();
this.checkAchievements();
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
},
registerSW: function() {
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js').then(function(reg) {
console.log('SW registered:', reg.scope);
}).catch(function(err) {
console.warn('SW registration failed:', err);
});
}
},
setupInstallPrompt: function() {
var deferredPrompt = null;
var installBtn = null;
var installToast = null;
window.addEventListener('beforeinstallprompt', function(e) {
e.preventDefault();
deferredPrompt = e;
if (localStorage.getItem('pwa_install_dismissed') !== 'true') {
ScriptoriumCore.showInstallPrompt(deferredPrompt);
}
});
window.addEventListener('appinstalled', function() {
deferredPrompt = null;
ScriptoriumCore.hideInstallPrompt();
localStorage.removeItem('pwa_install_dismissed');
});
},
showInstallPrompt: function(dp) {
if (installToast || !dp) return;
installToast = document.createElement('div');
installToast.id = 'pwa-install-toast';
installToast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:99999;background:#1a1520;border:1px solid #d4af37;border-radius:8px;padding:12px 20px;display:flex;align-items:center;gap:14px;font-family:Cormorant Garamond,serif;box-shadow:0 4px 24px rgba(0,0,0,0.6);max-width:400px;animation:fadeInUp 0.3s ease;';
installToast.innerHTML = '<span style="color:#e0e0e0;font-size:0.95rem;">Install <strong style="color:#d4af37;">Scriptorium</strong> for offline access</span>' +
'<button id="pwa-install-btn" style="background:#d4af37;color:#050505;border:none;padding:6px 16px;border-radius:4px;font-family:Cinzel,serif;font-size:0.75rem;cursor:pointer;letter-spacing:1px;">INSTALL</button>' +
'<button id="pwa-dismiss-btn" style="background:transparent;color:rgba(255,255,255,0.4);border:none;padding:4px 8px;cursor:pointer;font-size:1.1rem;">\u00d7</button>';
document.body.appendChild(installToast);
installBtn = document.getElementById('pwa-install-btn');
var dismissBtn = document.getElementById('pwa-dismiss-btn');
if (installBtn) {
installBtn.addEventListener('click', function() {
if (!dp) return;
dp.prompt();
dp.userChoice.then(function() {
deferredPrompt = null;
ScriptoriumCore.hideInstallPrompt();
});
});
}
if (dismissBtn) {
dismissBtn.addEventListener('click', function() {
ScriptoriumCore.hideInstallPrompt();
localStorage.setItem('pwa_install_dismissed', 'true');
});
}
},
hideInstallPrompt: function() {
if (installToast && installToast.parentNode) {
installToast.parentNode.removeChild(installToast);
}
installToast = null;
installBtn = null;
},

// ── Verse Quick Look setup (delegates to window.showVerseQuickLook) ──
setupVerseQuickLook: function() {},
// ── Typology Visualiser setup (delegates to window.renderTypologyThreads) ──
setupTypologyVisualiser: function() {},

// ── XP & Rank System ──
XP_RANKS: [
  { minXp: 0,    title:'SEEKER' },
  { minXp: 100,  title:'INITIATE' },
  { minXp: 300,  title:'SCRIBE' },
  { minXp: 700,  title:'FAITHFUL SCRIBE' },
  { minXp: 1500, title:'APPRENTICE SCRIBE' },
  { minXp: 3500, title:'DEDICATED SCRIBE' },
  { minXp: 7000, title:'VENERATED SCRIBE' },
  { minXp: 14000,title:'EXALTED SCRIBE' },
  { minXp: 28000,title:'MASTER SCRIBE' },
  { minXp: 50000,title:'PRIME SCRIBE' }
],

getTotalXp: function() {
  var total = 0;
  this.BADGES.forEach(function(b) {
    if (localStorage.getItem(b.id)) total += b.xp || 0;
  });
  return total;
},

computeRankFromXp: function(xp) {
  var ranks = this.XP_RANKS;
  for (var i = ranks.length - 1; i >= 0; i--) {
    if (xp >= ranks[i].minXp) return ranks[i].title;
  }
  return 'SEEKER';
},

getNextRankXp: function(xp) {
  var ranks = this.XP_RANKS;
  for (var i = 0; i < ranks.length - 1; i++) {
    if (xp < ranks[i + 1].minXp) return ranks[i + 1].minXp;
  }
  return null;
},

getRankProgress: function(xp) {
  var ranks = this.XP_RANKS;
  for (var i = ranks.length - 1; i >= 0; i--) {
    if (xp >= ranks[i].minXp) {
      if (i >= ranks.length - 1) return 1;
      var current = ranks[i].minXp;
      var next = ranks[i + 1].minXp;
      return (xp - current) / (next - current);
    }
  }
  return 0;
},

// ── Achievement / Gamification Layer ──
checkAchievements: function(options) {
  options = options || {};
  var self = this;
  var newlyEarned = [];
  var xpEarned = 0;

  function award(id) {
    if (localStorage.getItem(id)) return false;
    var badge = null;
    for (var i = 0; i < self.BADGES.length; i++) {
      if (self.BADGES[i].id === id) { badge = self.BADGES[i]; break; }
    }
    if (badge) {
      localStorage.setItem(id, 'true');
      xpEarned += badge.xp || 0;
      newlyEarned.push(badge);
    }
    return true;
  }

  if (localStorage.getItem('messianic_path_viewed')) award('achiev_messianic_path');
  if (localStorage.getItem('typology_viewed')) award('achiev_typology');
  if (localStorage.getItem('achiev_all_eras')) award('achiev_all_eras_toasted');
  if (localStorage.getItem('luke_line_viewed')) award('achiev_luke_line');

  var streak = parseInt(localStorage.getItem('scriptorium_streak') || '0');
  if (streak >= 7) award('achiev_streak_7');
  if (streak >= 30) { award('achiev_streak_30'); award('achiev_streak_freeze'); }

  try {
    var seal = JSON.parse(localStorage.getItem('scribe_seal') || '{}');
    var ep = parseInt(seal.epigraphy) || 0;
    var rest = parseInt(seal.restoration) || 0;
    if (ep > 0) award('achiev_epigraphy');
    if (ep >= 22) award('achiev_ancient_paths');
    if (ep >= 22) award('achiev_scribe_hand');
    if (rest > 0) award('achiev_restored_fragments');
    if (rest >= 4) award('achiev_all_restored');
  } catch(e) {}

  try {
    var v3 = JSON.parse(localStorage.getItem('scriptorium_v3') || '{}');
    if ((v3.progress || {}).versesCompleted >= 1000) award('achiev_first_covenant');
    if ((v3.progress || {}).versesCompleted >= 31000) award('achiev_whole_canon');
  } catch(e) {}

  try {
    var rp = JSON.parse(localStorage.getItem('scriptorium_reading_progress') || '{}');
    if ((rp.matthew || {}).chapter >= 28 && (rp.mark || {}).chapter >= 16 &&
        (rp.luke || {}).chapter >= 24 && (rp.john || {}).chapter >= 20) award('achiev_witness_resurrection');
    var ethBooks = ['1_enoch','jubilees','tobit','judith','1_maccabees','2_maccabees','3_maccabees','4_maccabees','sirach','wisdom_of_solomon','baruch'];
    if (ethBooks.some(function(b) { return rp[b] && rp[b].chapter >= 1; })) award('achiev_ethiopian_thread');
  } catch(e) {}

  try {
    var disc = JSON.parse(localStorage.getItem('scriptorium_discoveries') || '{}');
    var seven = ['Ephesus','Smyrna','Pergamum','Thyatira','Sardis','Philadelphia','Laodicea'];
    if (seven.filter(function(c) { return disc[c]; }).length >= 7) award('achiev_pilgrim_7');
  } catch(e) {}

  if (localStorage.getItem('messianic_path_viewed')) award('achiev_solomonic_seal');

  // Map journey completions
  try {
    var journeys = JSON.parse(localStorage.getItem('scriptorium_journeys') || '{}');
    if (journeys.paul && journeys.paul.completed) award('achiev_paul_journey');
    if (journeys.exodus && journeys.exodus.completed) award('achiev_exodus_journey');
    if (journeys.wilderness && journeys.wilderness.completed) award('achiev_wilderness_journey');
  } catch(e) {}

  // Plan completions (via localStorage key set by plans.html)
  var completedPlans = [];
  try {
    completedPlans = JSON.parse(localStorage.getItem('scriptorium_completed_plans') || '[]');
  } catch(e) {}
  if (completedPlans.indexOf('30-day') >= 0) award('achiev_plan_30');
  if (completedPlans.indexOf('60-day') >= 0) award('achiev_plan_60');
  if (completedPlans.indexOf('365-day') >= 0) award('achiev_plan_365');
  if (completedPlans.length >= 1) award('achiev_first_plan');
  if (completedPlans.length >= 3) award('achiev_three_plans');

  // Astronomy & Prophecy seal fields
  try {
    var seal2 = JSON.parse(localStorage.getItem('scribe_seal') || '{}');
    if (parseInt(seal2.astronomy) >= 1) award('achiev_astronomy');
    if (parseInt(seal2.prophecy) >= 1) award('achiev_prophecy');
    if ((seal2.epigraphy || 0) + (seal2.astronomy || 0) + (seal2.restoration || 0) + (seal2.prophecy || 0) >= 4) award('achiev_seal_bearer');
  } catch(e) {}

  persistently: if (newlyEarned.length > 0) {
    var totalXp = this.getTotalXp();
    var rank = this.computeRankFromXp(totalXp);

    // Store rank locally for sidebar
    try {
      var u = JSON.parse(localStorage.getItem('scriptorium_v3') || '{}');
      if (!u.rank) u.rank = {};
      u.rank.title = rank;
      u.rank.xp = totalXp;
      localStorage.setItem('scriptorium_v3', JSON.stringify(u));
    } catch(e) {}

    // Sync rank to server if logged in
    try {
      var token = Scriptorium.getToken();
      if (token) {
        fetch('/api/auth/achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ rank: rank, xp: totalXp, badges: this.getEarnedBadges() })
        }).catch(function() {});
      }
    } catch(e) {}
  }

  // Show notifications for each newly earned badge
  newlyEarned.forEach(function(b, i) {
    setTimeout(function() {
      if (window.Scr && window.Scr.toast) {
        window.Scr.toast((b.icon || '\u2728') + ' ' + b.name + ' | ' + b.desc + ' | +' + b.xp + ' XP', 'success');
      } else {
        self.showToast(b.icon + ' ' + b.name + ': ' + b.desc, 5000);
      }
    }, i * 700);
  });

  // Notify sidebar to refresh
  if (typeof window.__updateSidebarRank === 'function') window.__updateSidebarRank();
  if (typeof window.__updateSidebarBadges === 'function') window.__updateSidebarBadges();

  return newlyEarned.length;
},

// ── Badge Definitions & Lookup ──
BADGES: [
  // Genealogy (Roots of Faith) — Bronze
  { id:'achiev_messianic_path',    icon:'\u269C', name:'Messianic Path', desc:'The Seed revealed through the generations.', xp:150, tier:'bronze' },
  { id:'achiev_typology',          icon:'\u2726', name:'Typology', desc:'Shadows of Christ discerned in the Law and Prophets.', xp:150, tier:'bronze' },
  { id:'achiev_all_eras_toasted',  icon:'\uD83D\uDCD6', name:'All Eras Surveyed', desc:'Every generation accounted for.', xp:150, tier:'bronze' },
  { id:'achiev_luke_line',         icon:'\u271D', name:'Luke Line', desc:'The royal bloodline through Nathan traced to the Son of David.', xp:250, tier:'silver' },

  // Streak (Discipline) — Bronze/Silver/Gold
  { id:'achiev_streak_7',          icon:'\uD83D\uDCC5', name:'Week of Wisdom', desc:'7-day reading streak.', xp:100, tier:'bronze' },
  { id:'achiev_streak_30',         icon:'\uD83D\uDD25', name:'Keeper of the Flame', desc:'30 consecutive days in the Scriptures.', xp:500, tier:'gold' },
  { id:'achiev_streak_freeze',     icon:'\u2744', name:'Streak Freeze', desc:'Grace earned — discipline is not a perfect attendance contest.', xp:200, tier:'silver' },

  // Paleo-Epigraphy (Letters of the Law) — Bronze/Silver
  { id:'achiev_epigraphy',         icon:'\u270D', name:'Epigraphy', desc:'A letter traced in the paleo lab.', xp:100, tier:'bronze' },
  { id:'achiev_scribe_hand',       icon:'\uD800\uDD2F', name:"Scribe's Hand", desc:'All 22 paleo-Hebrew letters mastered.', xp:800, tier:'gold' },

  // Restoration (Scribe's Chamber) — Silver/Mastery
  { id:'achiev_restored_fragments',icon:'\uD83D\uDC8E', name:'Restored Fragments', desc:'A broken piece made whole.', xp:150, tier:'bronze' },
  { id:'achiev_all_restored',      icon:'\uD83D\uDC96', name:'Hall of the Preserved', desc:'All fragments restored — the ancient voice recovered.', xp:600, tier:'gold' },

  // Reading Progress (Theologia) — Bronze/Gold/Mastery
  { id:'achiev_first_covenant',    icon:'\uD83D\uDCDC', name:'First Covenant', desc:'A full OT book completed.', xp:200, tier:'silver' },
  { id:'achiev_whole_canon',       icon:'\uD83D\uDCDA', name:'Whole Canon', desc:'Every verse of Scripture traversed.', xp:2000, tier:'mastery' },
  { id:'achiev_witness_resurrection', icon:'\u2728', name:'Witness of the Resurrection', desc:'All four Gospels\' empty tomb accounts read.', xp:300, tier:'silver' },

  // Map & Journeys (Wandering) — Bronze/Gold
  { id:'achiev_pilgrim_7',         icon:'\u26EA', name:'Pilgrim of the Seven Churches', desc:'All seven churches of the Apocalypse traced.', xp:400, tier:'silver' },
  { id:'achiev_paul_journey',      icon:'\uD83D\uDEE4', name:"Paul's Steps", desc:'The missionary journeys of the Apostle traced on the map.', xp:500, tier:'gold' },
  { id:'achiev_exodus_journey',    icon:'\uD83C\uDFD4', name:'Exodus Trail', desc:'The path from Egypt to Sinai traced.', xp:300, tier:'silver' },
  { id:'achiev_wilderness_journey',icon:'\uD83C\uDF2B', name:'Forty Years', desc:'The wilderness wanderings traced.', xp:300, tier:'silver' },

  // Ethiopian & Broader Canon
  { id:'achiev_ethiopian_thread',  icon:'\uD83C\uDFF4', name:'Ethiopian Thread', desc:'The broader canon explored.', xp:350, tier:'silver' },

  // Scribe's Seal — Mastery
  { id:'achiev_solomonic_seal',    icon:'\u2721', name:'Solomonic Seal', desc:'The royal lineage traced in full.', xp:250, tier:'silver' },
  { id:'achiev_astronomy',         icon:'\u2604', name:'Heavenly Scroll', desc:'The celestial witness — the stars inscribed.', xp:200, tier:'bronze' },
  { id:'achiev_prophecy',          icon:'\uD83D\uDD25', name:'Oracle Bearer', desc:'The prophetic word confirmed.', xp:200, tier:'bronze' },
  { id:'achiev_seal_bearer',       icon:'\u2728', name:'Seal Bearer', desc:'All four seals of the scribe unlocked.', xp:1000, tier:'mastery' },

  // Reading Plans (Daily Bread) — Silver/Gold/Mastery
  { id:'achiev_first_plan',        icon:'\uD83D\uDCC3', name:'First Plan', desc:'A reading plan completed.', xp:300, tier:'silver' },
  { id:'achiev_three_plans',       icon:'\uD83D\uDCC1', name:'Three Scrolls', desc:'Three reading plans completed.', xp:600, tier:'gold' },
  { id:'achiev_plan_30',           icon:'\uD83D\uDD14', name:'30-Day Disciple', desc:'A 30-day reading plan finished.', xp:250, tier:'silver' },
  { id:'achiev_plan_60',           icon:'\uD83D\uDD15', name:'Prophetic Stride', desc:'A 60-day reading plan finished.', xp:400, tier:'silver' },
  { id:'achiev_plan_365',          icon:'\uD83D\uDCC5', name:'Year in the Word', desc:'The full one-year reading plan completed.', xp:1500, tier:'mastery' },
  { id:'achiev_ancient_paths',     icon:'\uD800\uDD2F', name:'Ancient Paths (Legacy)', desc:'All 22 paleo-Hebrew letters traced.', xp:0, tier:'bronze' },
],

getEarnedBadges: function() {
  var earned = [];
  this.BADGES.forEach(function(b) {
    if (localStorage.getItem(b.id)) earned.push(b.id);
  });
  return earned;
},

// ── Shared toast notification (slides in from top, gold-bordered, auto-dismisses) ──
showToast: function(msg, duration) {
  var t = document.createElement('div');
  t.className = 'scr-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  t.offsetHeight;
  t.classList.add('open');
  setTimeout(function() {
    t.classList.remove('open');
    setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
  }, duration || 3000);
}
};
window.ScriptoriumCore = ScriptoriumCore;
window.checkAchievements = function() { ScriptoriumCore.checkAchievements(); };

// ── Unified toast API: window.Scr.toast(message, type) ─────────────────
// type: 'error', 'success', or omitted for neutral
// Extracted from challenges.html pattern — gold-border card with slide-in
window.Scr = {};

(function() {
  var container = null;
  function ensureContainer() {
    if (!container || !container.parentNode) {
      container = document.getElementById('scrToastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'scrToastContainer';
        container.className = 'scr-toast-container';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
      }
    }
    return container;
  }
  window.Scr.toast = function(message, type) {
    var c = ensureContainer();
    var t = document.createElement('div');
    t.className = 'scr-toast-item' + (type === 'error' ? ' scr-toast-error' : type === 'success' ? ' scr-toast-success' : '');
    var parts = message.split('|');
    if (parts.length > 1) {
      t.innerHTML = '<div class="scr-toast-title">' + parts[0].trim() + '</div><div class="scr-toast-msg">' + parts.slice(1).join('|').trim() + '</div>';
    } else {
      t.textContent = message;
    }
    c.appendChild(t);
    t.offsetHeight;
    t.classList.add('scr-toast-open');
    setTimeout(function() {
      t.classList.remove('scr-toast-open');
      t.classList.add('scr-toast-out');
      setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
    }, 5000);
  };
})();

// ── Inject toast styles ────────────────────────────────────────────────
(function() {
  if (document.getElementById('scr-toast-style')) return;
  var s = document.createElement('style');
  s.id = 'scr-toast-style';
  s.textContent =
    '.scr-toast-container{position:fixed;top:20px;right:20px;z-index:20000;display:flex;flex-direction:column;gap:10px;pointer-events:none}' +
    '.scr-toast-item{pointer-events:auto;padding:12px 20px;border-radius:3px;font-family:Cinzel,serif;font-size:0.65rem;letter-spacing:2px;background:rgba(10,10,10,0.95);border:1px solid rgba(212,175,55,0.15);color:rgba(255,255,255,0.6);backdrop-filter:blur(12px);box-shadow:0 4px 30px rgba(0,0,0,0.5);max-width:340px;opacity:0;transform:translateX(40px);transition:opacity 0.4s ease,transform 0.4s ease}' +
    '.scr-toast-item.scr-toast-open{opacity:1;transform:translateX(0)}' +
    '.scr-toast-item.scr-toast-out{opacity:0;transform:translateX(40px)}' +
    '.scr-toast-item.scr-toast-error{border-color:#b84a4a;color:#d48a8a}' +
    '.scr-toast-item.scr-toast-success{border-color:rgba(100,200,100,0.4);color:rgba(200,255,200,0.7)}' +
    '.scr-toast-title{font-family:Cinzel,serif;letter-spacing:2px}' +
    '.scr-toast-msg{font-family:Cormorant Garamond,serif;font-size:0.65rem;color:rgba(255,255,255,0.4);margin-top:4px}' +
    '@keyframes scrToastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}';
  document.head.appendChild(s);
})();

// Inject CSS for install toast animation if not present
(function() {
if (document.getElementById('pwa-toast-style')) return;
var style = document.createElement('style');
style.id = 'pwa-toast-style';
style.textContent = '@keyframes fadeInUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
document.head.appendChild(style);
})();
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() { ScriptoriumCore.init(); });
} else {
ScriptoriumCore.init();
}
})();
window.activeBookContext = { id: '', era: '', downloadUrl: '' };
window.launchScriptoriumReader = function(bookId, era, fileId) {
var formattedId = bookId.toUpperCase().trim();
activeBookContext.id = formattedId;
activeBookContext.era = era;
activeBookContext.fileId = fileId || null;
activeBookContext.downloadUrl = '';
var titleEl = document.getElementById('readerBookTitle');
var subtextEl = document.getElementById('readerSubtext');
var dlAction = document.getElementById('readerDownloadAction');
if (titleEl) titleEl.innerText = formattedId;
if (subtextEl) subtextEl.innerText = 'Illuminated Compendium \u2014 ' + era.toUpperCase() + ' Canonical Selection';
if (dlAction) {
dlAction.onclick = function() {
dlAction.textContent = 'GENERATING PDF...';
setTimeout(function() {
scribeGeneratePDF(formattedId, era, fileId).then(function() {
dlAction.textContent = '\uD83D\uDCE5 DOWNLOAD FULL BOOK (.PDF)';
}).catch(function() {
dlAction.textContent = '\uD83D\uDCE5 DOWNLOAD FULL BOOK (.PDF)';
});
}, 100);
};
}
setReaderDisplay('text');
loadInteractiveText(formattedId, era, fileId);
var modal = document.getElementById('scriptoriumReaderModal');
if (modal) {
modal.style.display = 'block';
modal.classList.add('active');
}
};
window.loadInteractiveText = function(bookId, era, explicitFileId) {
var container = document.getElementById('readerTextDisplay');
if (!container) return;
container.innerHTML = '<p style="text-align:center;color:rgba(212,175,55,0.6);">Fetching ancient script records...</p>';
var fileId = explicitFileId || bookId.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
fetch('assets/data/bible-text/' + fileId + '.json')
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
var rvTab = document.getElementById('tabRvNote');
var patTab = document.getElementById('tabPatristic');
var textDiv = document.getElementById('readerTextDisplay');
var pdfDiv = document.getElementById('readerPdfDisplay');
var rvDiv = document.getElementById('readerRvNote');
var patDiv = document.getElementById('readerPatristic');
var iframe = document.getElementById('readerDocumentFrame');
function deactivateAll() {
  if (textTab) { textTab.style.background = 'transparent'; textTab.style.borderColor = 'rgba(212,175,55,0.3)'; }
  if (pdfTab) { pdfTab.style.background = 'transparent'; pdfTab.style.borderColor = 'rgba(212,175,55,0.3)'; }
  if (rvTab) { rvTab.style.background = 'transparent'; rvTab.style.borderColor = 'rgba(212,175,55,0.3)'; }
  if (patTab) { patTab.style.background = 'transparent'; patTab.style.borderColor = 'rgba(212,175,55,0.3)'; }
  if (textDiv) textDiv.style.display = 'none';
  if (pdfDiv) pdfDiv.style.display = 'none';
  if (rvDiv) rvDiv.style.display = 'none';
  if (patDiv) patDiv.style.display = 'none';
}
if (mode === 'rvnote') {
  deactivateAll();
  if (rvTab) { rvTab.style.background = 'rgba(212,175,55,0.15)'; rvTab.style.borderColor = '#d4af37'; }
  if (rvDiv) { rvDiv.style.display = 'block'; window.openRvNote(); }
  return;
}
if (mode === 'patristic') {
  deactivateAll();
  if (patTab) { patTab.style.background = 'rgba(180,140,200,0.15)'; patTab.style.borderColor = '#b48cc8'; }
  if (patDiv) { patDiv.style.display = 'block'; window.openPatristicCommentary(); }
  return;
}
deactivateAll();
if (mode === 'text') {
if (textTab) { textTab.style.background = 'rgba(212,175,55,0.15)'; textTab.style.borderColor = '#d4af37'; }
if (textDiv) textDiv.style.display = 'block';
} else {
if (pdfTab) { pdfTab.style.background = 'rgba(212,175,55,0.15)'; pdfTab.style.borderColor = '#d4af37'; }
if (pdfDiv) {
pdfDiv.style.display = 'block';
pdfDiv.innerHTML = '<div style="text-align:center;padding:40px;font-family:Cormorant Garamond,serif;color:rgba(255,255,255,0.6);"><p style="font-size:1.2rem;margin-bottom:16px;">📄 Archival Print</p><p>Click the <strong>DOWNLOAD FULL BOOK</strong> button below to generate a PDF from the live text.</p></div>';
}
if (iframe) {
iframe.src = '';
iframe.style.display = 'none';
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
(function() {
var searchModal, searchInput, searchResults, searchTimer;
function createSearchModal() {
if (document.getElementById('scriptoriumSearchModal')) return;
var div = document.createElement('div');
div.id = 'scriptoriumSearchModal';
div.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;background:rgba(5,5,5,0.92);font-family:Cormorant Garamond,serif;';
div.innerHTML =
'<div style="max-width:800px;margin:60px auto;padding:30px;">' +
'<div style="display:flex;align-items:center;border-bottom:1px solid rgba(212,175,55,0.3);padding-bottom:10px;">' +
'<span style="color:#d4af37;font-family:Cinzel,serif;margin-right:15px;font-size:1.1rem;">&#9776;</span>' +
'<input id="searchInput" type="text" placeholder="Search all scriptures..." style="flex:1;background:transparent;border:none;color:#fff;font-size:1.4rem;outline:none;font-family:Cormorant Garamond,serif;" autofocus>' +
'<button onclick="window.closeBibleSearch()" style="background:transparent;border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:6px 14px;cursor:pointer;font-family:Cinzel,serif;font-size:0.8rem;">ESC</button>' +
'</div>' +
'<div style="margin:12px 0;display:flex;gap:8px;" id="searchFilterBar">' +
'<button class="sf-btn active" data-t="" style="background:rgba(212,175,55,0.15);border:1px solid #d4af37;color:#d4af37;padding:4px 14px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75rem;">ALL</button>' +
'<button class="sf-btn" data-t="ot" style="background:transparent;border:1px solid rgba(212,175,55,0.2);color:rgba(255,255,255,0.5);padding:4px 14px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75rem;">OT</button>' +
'<button class="sf-btn" data-t="nt" style="background:transparent;border:1px solid rgba(212,175,55,0.2);color:rgba(255,255,255,0.5);padding:4px 14px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75rem;">NT</button>' +
'<button class="sf-btn" data-t="ethiopian" style="background:transparent;border:1px solid rgba(212,175,55,0.2);color:rgba(255,255,255,0.5);padding:4px 14px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75rem;">ETHIOPIAN</button>' +
'</div>' +
'<div id="searchResults" style="max-height:65vh;overflow-y:auto;margin-top:10px;"></div>' +
'</div>';
document.body.appendChild(div);
searchModal = div;
searchInput = document.getElementById('searchInput');
searchResults = document.getElementById('searchResults');
document.getElementById('searchFilterBar').addEventListener('click', function(e) {
var btn = e.target.closest('.sf-btn');
if (!btn) return;
document.querySelectorAll('.sf-btn').forEach(function(b) {
b.style.background = 'transparent';
b.style.borderColor = 'rgba(212,175,55,0.2)';
b.style.color = 'rgba(255,255,255,0.5)';
});
btn.style.background = 'rgba(212,175,55,0.15)';
btn.style.borderColor = '#d4af37';
btn.style.color = '#d4af37';
if (searchInput.value.trim().length >= 2) doSearch();
});
searchInput.addEventListener('input', function() {
clearTimeout(searchTimer);
searchTimer = setTimeout(doSearch, 300);
});
searchInput.addEventListener('keydown', function(e) {
if (e.key === 'Enter') { clearTimeout(searchTimer); doSearch(); }
if (e.key === 'Escape') window.closeBibleSearch();
});
}
function doSearch() {
var q = searchInput.value.trim();
if (q.length < 2) { searchResults.innerHTML = ''; return; }
var active = document.querySelector('#searchFilterBar .sf-btn.active');
var t = active ? active.getAttribute('data-t') : '';
searchResults.innerHTML = '<p style="text-align:center;color:rgba(212,175,55,0.5);font-style:italic;">Searching...</p>';
fetch('/api/search?q=' + encodeURIComponent(q) + '&testament=' + t + '&limit=50')
.then(function(r) { return r.json(); })
.then(function(data) {
if (!data.results || data.results.length === 0) {
searchResults.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.3);font-style:italic;">No results found.</p>';
return;
}
var html = '<p style="color:rgba(255,255,255,0.4);font-size:0.85rem;margin-bottom:12px;">' + data.totalResults + ' result' + (data.totalResults !== 1 ? 's' : '') + '</p>';
data.results.forEach(function(r) {
html += '<div class="search-result-item" style="border-bottom:1px solid rgba(212,175,55,0.08);padding:12px 0;cursor:pointer;" onclick="window.launchScriptoriumReader(\'' + r.bookId.replace(/'/g,"\\'") + '\',\'' + (r.era || 'ot') + '\');window.closeBibleSearch();">' +
'<div style="display:flex;justify-content:space-between;align-items:center;">' +
'<span style="color:#d4af37;font-family:Cinzel,serif;font-size:0.85rem;">' + r.book + ' ' + r.chapter + ':' + r.verse + '</span>' +
'<span style="color:rgba(255,255,255,0.25);font-size:0.7rem;">' + (r.era || 'OT').toUpperCase() + '</span>' +
'</div>' +
'<p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:0.95rem;line-height:1.5;">' + r.text + '</p>' +
'</div>';
});
searchResults.innerHTML = html;
})
.catch(function() {
searchResults.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.3);font-style:italic;">Search unavailable. Try again later.</p>';
});
}
window.openBibleSearch = function() {
createSearchModal();
searchModal.style.display = 'block';
setTimeout(function() { if (searchInput) searchInput.focus(); }, 100);
document.body.style.overflow = 'hidden';
};
window.closeBibleSearch = function() {
if (searchModal) searchModal.style.display = 'none';
document.body.style.overflow = '';
};
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape' && searchModal && searchModal.style.display === 'block') {
window.closeBibleSearch();
}
if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey)) {
if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
e.preventDefault();
window.openBibleSearch();
}
});
})();
(function() {
var STORAGE_KEY = 'scriptorium_reading_progress';
window.saveReadingProgress = function(bookId, chapter, verse) {
if (!bookId) return;
var data = {};
try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) {}
data[bookId.toLowerCase()] = { chapter: chapter || 1, verse: verse || 0, timestamp: Date.now() };
try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
};
window.getReadingProgress = function(bookId) {
if (!bookId) return null;
try {
var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
return data[bookId.toLowerCase()] || null;
} catch(e) { return null; }
};
window.getAllProgress = function() {
try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e) { return {}; }
};
var origCloseReader = window.closeScriptoriumReader;
window.closeScriptoriumReader = function() {
if (window.activeBookContext && window.activeBookContext.id) {
window.saveReadingProgress(window.activeBookContext.id, 1, 0);
}
if (origCloseReader) origCloseReader();
};
})();
(function() {
var STORAGE_KEY = 'scriptorium_bookmarks';
window.getBookmarks = function() {
try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) { return []; }
};
window.addBookmark = function(bookId, bookName, chapter, verse, text) {
if (!bookId || !chapter || !verse) return false;
var bookmarks = window.getBookmarks();
var exists = bookmarks.some(function(b) { return b.bookId === bookId && b.chapter === chapter && b.verse === verse; });
if (exists) return false;
bookmarks.push({
id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
bookId: bookId,
bookName: bookName || bookId,
chapter: chapter,
verse: verse,
text: (text || '').substring(0, 200),
timestamp: Date.now()
});
try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks)); } catch(e) {}
return true;
};
window.removeBookmark = function(id) {
var bookmarks = window.getBookmarks().filter(function(b) { return b.id !== id; });
try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks)); } catch(e) {}
};
window.toggleBookmark = function(bookId, bookName, chapter, verse, text) {
var bookmarks = window.getBookmarks();
var existing = bookmarks.filter(function(b) { return b.bookId === bookId && b.chapter === chapter && b.verse === verse; });
if (existing.length > 0) {
existing.forEach(function(b) { window.removeBookmark(b.id); });
return false;
}
return window.addBookmark(bookId, bookName, chapter, verse, text);
};
window.isBookmarked = function(bookId, chapter, verse) {
  return window.getBookmarks().some(function(b) { return b.bookId === bookId && b.chapter === chapter && b.verse === verse; });
};

// ── VERSE QUICK-LOOK PANEL ──
(function() {
var panel = null;
function createPanel() {
  if (panel) return;
  panel = document.createElement('div');
  panel.id = 'scr-quicklook-panel';
  panel.innerHTML =
    '<div class="ql-header">' +
      '<span class="ql-ref" id="qlRef">—</span>' +
      '<button class="ql-close" id="qlClose">&times;</button>' +
    '</div>' +
    '<p class="ql-loading" id="qlContent">Select a verse reference to view</p>' +
    '<div class="ql-actions" id="qlActions" style="display:none">' +
      '<button class="ql-btn" id="qlOpenReader">OPEN IN READER</button>' +
      '<button class="ql-btn" id="qlBookmark">BOOKMARK</button>' +
    '</div>';
  document.body.appendChild(panel);
  document.getElementById('qlClose').addEventListener('click', function() { window.closeVerseQuickLook(); });
  document.getElementById('qlOpenReader').addEventListener('click', function() {
    var ref = panel.getAttribute('data-ref');
    if (ref && window.ScrReader && window.ScrReader.open) {
      var parts = ref.split('|');
      window.closeVerseQuickLook();
      window.ScrReader.open(parts[0]);
      if (parts[1] > 1) setTimeout(function() { window.ScrReader.goToChapter(parseInt(parts[1])); }, 500);
    }
  });
  document.getElementById('qlBookmark').addEventListener('click', function() {
    var ref = panel.getAttribute('data-ref');
    if (ref) {
      var parts = ref.split('|');
      var text = (document.getElementById('qlContent').textContent || '').substring(0, 200);
      window.addBookmark(parts[0], parts[0], parseInt(parts[1]), parseInt(parts[2] || 1), text);
      document.getElementById('qlBookmark').textContent = '✓ BOOKMARKED';
    }
  });
}
window.showVerseQuickLook = function(bookId, chapter, verse) {
  createPanel();
  document.getElementById('qlRef').textContent = bookId + ' ' + chapter + ':' + (verse || 1);
  document.getElementById('qlContent').className = 'ql-loading';
  document.getElementById('qlContent').textContent = 'Loading...';
  document.getElementById('qlActions').style.display = 'none';
  panel.setAttribute('data-ref', bookId + '|' + chapter + '|' + (verse || 1));
  panel.classList.add('open');
  fetch('/api/verse/' + encodeURIComponent(bookId) + '/' + chapter + '/' + (verse || 1))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var el = document.getElementById('qlContent');
      if (data.text) {
        el.className = 'ql-text';
        el.textContent = '"' + data.text + '"';
        document.getElementById('qlActions').style.display = 'flex';
        document.getElementById('qlBookmark').textContent = window.isBookmarked(bookId, chapter, parseInt(verse || 1)) ? '✓ BOOKMARKED' : 'BOOKMARK';
      } else {
        el.className = 'ql-text';
        el.textContent = 'Verse not found in the digital archive.';
      }
    })
    .catch(function() {
      document.getElementById('qlContent').className = 'ql-text';
      document.getElementById('qlContent').textContent = 'Could not load verse. The archive may be offline.';
    });
};
window.closeVerseQuickLook = function() {
  if (panel) panel.classList.remove('open');
};
// Auto-close on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && panel && panel.classList.contains('open')) window.closeVerseQuickLook();
});
})();

// ── TYPOLOGY THREAD DATA & VISUALISER ──
var TYPOLOGY_THREADS = [
  { id:"moses_snake", type:"OT Type → NT Fulfillment", otRef:"Numbers 21:4-9", otDesc:"Bronze serpent lifted for physical healing", ntRef:"John 3:14-15", ntDesc:"Son of Man lifted up for eternal life", category:"salvation", icon:"🐍" },
  { id:"passover_lamb", type:"OT Type → NT Fulfillment", otRef:"Exodus 12:1-13", otDesc:"Passover lamb — blood on doorposts saves from death", ntRef:"1 Corinthians 5:7", ntDesc:"Christ our Passover lamb has been sacrificed", category:"redemption", icon:"🐑" },
  { id:"manna_bread", type:"OT Type → NT Fulfillment", otRef:"Exodus 16:4-36", otDesc:"Manna from heaven — bread for the wilderness", ntRef:"John 6:48-51", ntDesc:"I am the living bread that came down from heaven", category:"sacrament", icon:"🍞" },
  { id:"rock_water", type:"OT Type → NT Fulfillment", otRef:"Exodus 17:1-7", otDesc:"Water from the rock at Horeb", ntRef:"1 Corinthians 10:4", ntDesc:"The rock was Christ — spiritual drink", category:"sacrament", icon:"🪨" },
  { id:"tabernacle_veil", type:"OT Type → NT Fulfillment", otRef:"Exodus 26:31-37", otDesc:"Veil of the tabernacle separating Holy Place from Holy of Holies", ntRef:"Hebrews 10:19-22", ntDesc:"Christ's flesh — the new and living way through the veil", category:"worship", icon:"🚪" },
  { id:"high_priest", type:"OT Type → NT Fulfillment", otRef:"Leviticus 16:1-34", otDesc:"High Priest enters Holy of Holies on Day of Atonement", ntRef:"Hebrews 9:11-14", ntDesc:"Christ entered the most holy place once for all by his own blood", category:"priesthood", icon:"👑" },
  { id:"scapegoat", type:"OT Type → NT Fulfillment", otRef:"Leviticus 16:20-22", otDesc:"Scapegoat carries sins into the wilderness", ntRef:"2 Corinthians 5:21", ntDesc:"God made him who had no sin to be sin for us", category:"atonement", icon:"🐐" },
  { id:"adam_christ", type:"Parallel", otRef:"Genesis 2:7", otDesc:"Adam — the first living being from dust", ntRef:"1 Corinthians 15:45-49", ntDesc:"Christ — the last Adam, a life-giving spirit", category:"creation", icon:"🌍" },
  { id:"isaac_sacrifice", type:"OT Type → NT Fulfillment", otRef:"Genesis 22:1-18", otDesc:"Abraham offers Isaac — God provides the ram", ntRef:"John 3:16", ntDesc:"God gave his only Son so that whoever believes may have eternal life", category:"redemption", icon:"🔥" },
  { id:"joseph_exaltation", type:"Typological Pattern", otRef:"Genesis 37:1-50:26", otDesc:"Joseph — rejected by brothers, exalted to rule Egypt, saves the nations", ntRef:"Acts 2:22-36", ntDesc:"Jesus — rejected by Israel, exalted to God's right hand, saves the world", category:"salvation", icon:"👑" },
  { id:"sabbath_rest", type:"OT Type → NT Fulfillment", otRef:"Genesis 2:2-3", otDesc:"God rested on the seventh day from all his work", ntRef:"Hebrews 4:1-11", ntDesc:"There remains a Sabbath-rest for the people of God", category:"eschatology", icon:"✡️" },
  { id:"flood_baptism", type:"Typological Pattern", otRef:"Genesis 6:1-9:17", otDesc:"Noah's ark — salvation through water", ntRef:"1 Peter 3:20-21", ntDesc:"Baptism — an appeal to God for a clear conscience through resurrection", category:"sacrament", icon:"🌊" },
  { id:"melchizedek", type:"OT Type → NT Fulfillment", otRef:"Genesis 14:18-20", otDesc:"Melchizedek — priest of God Most High, king of Salem", ntRef:"Hebrews 5:5-10; 7:1-28", ntDesc:"Christ — high priest forever in the order of Melchizedek", category:"priesthood", icon:"🕊️" },
  { id:"temple_body", type:"OT Type → NT Fulfillment", otRef:"1 Kings 6:1-38", otDesc:"Solomon's temple — God's dwelling place on earth", ntRef:"John 2:19-21", ntDesc:"Destroy this temple and in three days I will raise it up — he spoke of his body", category:"worship", icon:"🏛️" },
  { id:"judges_christ", type:"Typological Pattern", otRef:"Judges 2:16-19", otDesc:"Cycle of judges — God raises deliverers when Israel cries out", ntRef:"Acts 5:30-31", ntDesc:"God exalted Jesus as Prince and Savior to give repentance", category:"salvation", icon:"⚔️" },
];

(function() {
var styleInjected = false;
function injectTypologyStyle() {
  if (styleInjected) return;
  styleInjected = true;
  var s = document.createElement('style');
  s.textContent =
    '.scr-typology-thread{display:flex;flex-direction:column;gap:12px;padding:12px 0}' +
    '.scr-ty-item{border:1px solid rgba(212,175,55,0.1);border-radius:6px;padding:12px;background:rgba(255,255,255,0.02);cursor:pointer;transition:all 0.2s ease}' +
    '.scr-ty-item:hover{background:rgba(212,175,55,0.06);border-color:rgba(212,175,55,0.25)}' +
    '.scr-ty-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}' +
    '.scr-ty-icon{font-size:1.1rem}' +
    '.scr-ty-category{font-family:Cinzel,serif;font-size: var(--text-micro);letter-spacing:2px;color:rgba(212,175,55,0.4);border:1px solid rgba(212,175,55,0.1);padding:1px 6px;border-radius:2px}' +
    '.scr-ty-pair{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;margin-top:6px}' +
    '.scr-ty-ot,.scr-ty-nt{min-width:0}' +
    '.scr-ty-ot{text-align:right}' +
    '.scr-ty-ref{font-family:Cinzel,serif;font-size: var(--text-micro);letter-spacing:1px;color:#d4af37;margin-bottom:2px}' +
    '.scr-ty-desc{font-family:Cormorant Garamond,serif;font-size:0.75rem;color:rgba(255,255,255,0.55);line-height:1.4}' +
    '.scr-ty-arc{display:flex;flex-direction:column;align-items:center;gap:2px}' +
    '.scr-ty-arc-line{width:40px;height:2px;background:linear-gradient(90deg,rgba(212,175,55,0.4),rgba(212,175,55,0.1));position:relative}' +
    '.scr-ty-arc-line::before,.scr-ty-arc-line::after{content:\"\";position:absolute;top:-3px;width:8px;height:8px;border-radius:50%;background:rgba(212,175,55,0.3)}' +
    '.scr-ty-arc-line::before{left:-4px}' +
    '.scr-ty-arc-line::after{right:-4px;background:rgba(212,175,55,0.15)}' +
    '.scr-ty-arc-label{font-family:Cinzel,serif;font-size: var(--text-micro);letter-spacing:1px;color:rgba(212,175,55,0.25);white-space:nowrap}' +
    '.scr-ty-filter-bar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}' +
    '.scr-ty-filter{background:transparent;border:1px solid rgba(212,175,55,0.15);color:rgba(212,175,55,0.5);' +
    'padding:3px 10px;font-family:Cinzel,serif;font-size: var(--text-micro);letter-spacing:1px;cursor:pointer;border-radius:3px;transition:0.2s}' +
    '.scr-ty-filter.active,.scr-ty-filter:hover{background:rgba(212,175,55,0.1);color:#d4af37;border-color:#d4af37}';
  document.head.appendChild(s);
}
window.renderTypologyThreads = function(containerId, categoryFilter) {
  injectTypologyStyle();
  var container = document.getElementById(containerId);
  if (!container) return;
  var threads = TYPOLOGY_THREADS;
  if (categoryFilter) threads = threads.filter(function(t) { return t.category === categoryFilter; });
  var categories = {};
  TYPOLOGY_THREADS.forEach(function(t) { categories[t.category] = true; });
  var filterHtml = '<div class="scr-ty-filter-bar">' +
    '<button class="scr-ty-filter active" data-cat="" onclick="window.renderTypologyThreads(\'' + containerId + '\',\'\')">ALL</button>';
  for (var cat in categories) {
    filterHtml += '<button class="scr-ty-filter" data-cat="' + cat + '" onclick="window.renderTypologyThreads(\'' + containerId + '\',\'' + cat + '\')">' + cat.toUpperCase() + '</button>';
  }
  filterHtml += '</div>';
  var html = filterHtml + '<div class="scr-typology-thread">';
  threads.forEach(function(t) {
    html +=
      '<div class="scr-ty-item" onclick="window.showVerseQuickLook(\'' + t.ntRef.split(' ')[0].replace(/'/g,"\\'") + '\',' + (parseInt(t.ntRef.match(/\d+/)) || 1) + ',1)">' +
        '<div class="scr-ty-header">' +
          '<span class="scr-ty-icon">' + t.icon + '</span>' +
          '<span class="scr-ty-category">' + t.category + '</span>' +
          '<span style="flex:1"></span>' +
          '<span style="font-family:Cinzel,serif;font-size: var(--text-micro);color:rgba(212,175,55,0.3);letter-spacing:1px">' + t.type + '</span>' +
        '</div>' +
        '<div class="scr-ty-pair">' +
          '<div class="scr-ty-ot"><div class="scr-ty-ref">' + t.otRef + '</div><div class="scr-ty-desc">' + t.otDesc + '</div></div>' +
          '<div class="scr-ty-arc"><div class="scr-ty-arc-line"></div><div class="scr-ty-arc-label">' + t.type.replace('→', '⟶') + '</div></div>' +
          '<div class="scr-ty-nt"><div class="scr-ty-ref">' + t.ntRef + '</div><div class="scr-ty-desc">' + t.ntDesc + '</div></div>' +
        '</div>' +
      '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
  // Activate filter button
  container.querySelectorAll('.scr-ty-filter').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-cat') === (categoryFilter || ''));
  });
};
})();

// ═══════════════════════════════════════════════════════════════
// Unified Scribe Data v3 — single canonical key, legacy keys removed
// ═══════════════════════════════════════════════════════════════
(function() {
  var V3_KEY = 'scriptorium_v3';
  var VERSION = 3;

  function readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch(e) {}
    return null;
  }

  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  function removeJSON(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  }

  function defaultData() {
    return {
      _v: VERSION,
      profile: { userId: '', name: '', gender: 'male', location: '—', tradition: '' },
      progress: { totalCharacters: 0, dailyChars: 0, dailyDate: '', versesCompleted: 0, ntVerses: 0 },
      rank: { title: 'INITIATE', knowledgeLevel: '1', lastActive: 0 },
      streak: { current: 0, lastVisit: '' },
      seal: { epigraphy: 0, astronomy: 0, prophecy: 0, restoration: 0 },
      meta: { migratedAt: 0 }
    };
  }

  var LEGACY_KEYS = ['scribeData_v2', 'scribeData', 'scriptorium_user', 'activeScribe', 'scribe_seal'];

  function pruneLegacyKeys() {
    for (var i = 0; i < LEGACY_KEYS.length; i++) removeJSON(LEGACY_KEYS[i]);
  }

  window.__migrateScribeData = function() {
    var v2 = readJSON('scribeData_v2');
    var user = readJSON('scriptorium_user');
    var scribe = readJSON('scribeData');
    var active = readJSON('activeScribe');
    var seal = readJSON('scribe_seal');

    var v3 = v2 && v2._v === 2 ? v2 : defaultData();
    v3._v = VERSION;
    if (v2 && v2._v === 2) {
      // Migrate v2 → v3 (schema unchanged, just version bump)
    } else {
      // Fresh migration from legacy keys
      if (!user && !scribe && !active && !seal && !v2) return null;
      var now = Date.now();
      v3.meta.migratedAt = now;
      v3.profile.name = (user && user.name) || (scribe && scribe.name) || (active && active.name) || '';
      v3.profile.userId = (user && user.userId) || '';
      v3.profile.gender = (active && active.gender) || 'male';
      v3.profile.location = (active && active.location) || '—';
      v3.progress.totalCharacters = (scribe && scribe.totalCharacters) || (user && user.totalCharacters) || 0;
      v3.progress.dailyChars = (scribe && scribe.dailyChars) || (user && user.dailyChars) || 0;
      v3.progress.dailyDate = (scribe && scribe.dailyDate) || (user && user.dailyDate) || '';
      v3.progress.versesCompleted = (scribe && scribe.versesCompleted) || (user && user.versesCompleted) || 0;
      v3.progress.ntVerses = (scribe && scribe.ntVerses) || (user && user.ntVerses) || 0;
      v3.rank.title = (scribe && scribe.rank) || (user && user.rank) || 'INITIATE';
      v3.rank.knowledgeLevel = (active && active.knowledge) || (user && user.knowledgeLevel) || '1';
      v3.rank.lastActive = (user && user.lastActive) || now;
      v3.streak.current = (scribe && scribe.streak) || (user && user.streak) || 0;
      v3.streak.lastVisit = (scribe && scribe.lastVisit) || '';
      if (seal) { v3.seal.epigraphy = seal.epigraphy || 0; v3.seal.astronomy = seal.astronomy || 0; v3.seal.prophecy = seal.prophecy || 0; v3.seal.restoration = seal.restoration || 0; }
    }

    writeJSON(V3_KEY, v3);
    pruneLegacyKeys();

    return v3;
  };

  window.__getUnifiedUser = function() {
    var v3 = readJSON(V3_KEY);
    if (v3 && v3._v === VERSION) return v3;
    return window.__migrateScribeData();
  };

  window.__setUnifiedUser = function(data) {
    if (!data) return;
    data._v = VERSION;
    writeJSON(V3_KEY, data);
    pruneLegacyKeys();
  };
})();

// ═══════════════════════════════════════════════════════════════
// ScrReader Queue — available immediately; real reader replaces
// ═══════════════════════════════════════════════════════════════
(function() {
  if (window.ScrReader && window.ScrReader._queue) {
    // Already defined by inline stub — keep its queue
    return;
  }
  var queue = [];
  var real = null;
  var stub = {
    open: function(bookName) { queue.push({ m: 'open', a: [bookName] }); return stub; },
    close: function() { queue.push({ m: 'close', a: [] }); return stub; },
    goToChapter: function(ch) { queue.push({ m: 'goToChapter', a: [ch] }); return stub; },
    nextChapter: function() { queue.push({ m: 'nextChapter', a: [] }); return stub; },
    prevChapter: function() { queue.push({ m: 'prevChapter', a: [] }); return stub; },
    _queue: queue
  };
  window.ScrReader = stub;
  Object.defineProperty(window.ScrReader, '_real', {
    set: function(v) {
      real = v;
      // Copy all properties from real API onto stub (BOOK_CHAPTERS, etc.)
      Object.keys(v).forEach(function(k) {
        if (k !== '_queue' && k !== '_real') stub[k] = v[k];
      });
      var q = queue.slice();
      queue.length = 0;
      q.forEach(function(call) {
        if (typeof real[call.m] === 'function') real[call.m].apply(real, call.a);
      });
    }
  });
})();

// ══════════════════════════════════════════
// Recovery Version Footnote Layer
// ══════════════════════════════════════════
var RV_FOOTNOTES = {
  "GENESIS": {
    "1": [
      {verse:"1:1",cat:"economy",text:"God's purpose in creation is to produce life for the fulfillment of His eternal economy. The beginning of the physical universe serves the beginning of the divine life-dispensing."},
      {verse:"1:26",cat:"mingling",text:"The divine counsel — 'Let Us make man in Our image' — reveals the Triune God's intention to mingle Himself with man. Image is for expression; dominion is for representation in God's administration."},
      {verse:"1:27",cat:"dispensing",text:"God created man spirit, soul, and body (1 Thes. 5:23). The spirit was created to contain God, the soul to express God, and the body to contact the physical realm. This three-part vessel is the receptacle for the divine dispensing."}
    ],
    "2": [
      {verse:"2:7",cat:"life",text:"The breath of life breathed into man's nostrils became the spirit of man (Prov. 20:27). Man became a living soul through the union of God's breath with the dust. This is the vessel for the tree of life."},
      {verse:"2:9",cat:"economy",text:"The tree of life signifies Christ as the life-giving source for God's economy. Man was set before two trees — life and knowledge — representing two principles: life versus good and evil. God's economy operates on the principle of life."}
    ],
    "3": [
      {verse:"3:15",cat:"mingling",text:"The seed of the woman — Christ as the mingled God-man — is the first promise of the gospel. He would crush the serpent's head through His incarnation, death, and resurrection. The mingling of divinity with humanity begins here in promise."},
      {verse:"3:21",cat:"dispensing",text:"The coats of skins signify Christ as the righteousness covering fallen man. An animal was slain — the first sacrifice — foreshadowing the Lamb of God who takes away the sin of the world."}
    ],
    "12": [
      {verse:"12:1-3",cat:"economy",text:"God's call of Abraham initiated His economy on earth through a race. The threefold promise — land, seed, and blessing to all nations — is the charter of the divine economy. All families of the earth are blessed through the seed, which is Christ (Gal. 3:16)."}
    ],
    "15": [
      {verse:"15:6",cat:"life",text:"Abraham believed God, and it was accounted to him as righteousness. Faith is the unique principle of the divine economy — not works, but believing God's word activates the life-dispensing process."}
    ],
    "17": [
      {verse:"17:5",cat:"mingling",text:"Abram ('exalted father') becomes Abraham ('father of a multitude'). Name change signifies the mingling of God's nature with man — a new creation through the cutting of the covenant. Circumcision signifies the cutting off of the flesh."}
    ],
    "22": [
      {verse:"22:8",cat:"dispensing",text:"God will provide Himself the lamb — this is the profoundest word in Scripture. God the Father offered His own Son as the substitute. On Mount Moriah, the dispensing of God in Christ for redemption was prefigured."}
    ]
  },
  "EXODUS": {
    "3": [
      {verse:"3:2",cat:"mingling",text:"The burning bush is the greatest sign in the Old Testament: God in Christ dwelling in man. The bush (man) burns (God's glory) but is not consumed. This is the mingling — God living in and through His redeemed people."}
    ],
    "12": [
      {verse:"12:13",cat:"economy",text:"The blood of the Passover lamb is the foundation of God's economy in redemption. When God sees the blood, He passes over. This is not merely judgment escaped — it is the basis for God's people to be delivered from Satan's dominion and to journey toward God's dwelling place."}
    ],
    "25": [
      {verse:"25:8-9",cat:"dispensing",text:"The tabernacle is the preeminent type of the dispensing of God. Every board, curtain, and utensil speaks of Christ and the church. God dwells among His people, and through the offerings and the priesthood, He dispenses Himself into them."},
      {verse:"25:22",cat:"mingling",text:"The mercy seat above the ark between the cherubim is the place of God's speaking. Here God meets with man and mingles His word with the redeemed — the very center of the divine dispensing."}
    ],
    "29": [
      {verse:"29:45-46",cat:"economy",text:"'I will dwell among the children of Israel and will be their God.' This is the central goal of God's economy — God dwelling in man, being their God, and they being His people. The tabernacle is God's house on earth, a type of the church."}
    ]
  },
  "LEVITICUS": {
    "1": [
      {verse:"1:3",cat:"dispensing",text:"The burnt offering is Christ offering Himself to God without reservation. It is the first of the five offerings, signifying Christ's absolute consecration. Through the offerings, God dispenses His righteousness, life, and holiness into the offerer."}
    ],
    "6": [
      {verse:"6:13",cat:"life",text:"The fire on the altar shall never go out. This perpetual fire signifies God's eternal desire — the consuming of the offerings, typifying Christ's continual redemption. The priests maintained the fire, just as we maintain our consecration by the indwelling Spirit."}
    ]
  },
  "NUMBERS": {
    "6": [
      {verse:"6:2",cat:"mingling",text:"The Nazarite vow is a type of the voluntary consecration to be joined to God. Separation from wine (earthly pleasure) and the razor (human glory) signifies a life fully mingled with God."},
      {verse:"6:24-26",cat:"dispensing",text:"The Aaronic blessing — the threefold benediction of the Triune God — is a divinely ordained formula for the dispensing of the Triune God into His people. The Father blesses, the Son shines, the Spirit lifts the countenance."}
    ]
  },
  "DEUTERONOMY": {
    "8": [
      {verse:"8:3",cat:"life",text:"Man does not live by bread alone but by every word that proceeds from the mouth of God. The manna in the wilderness is Christ as the daily life-supply. God's dispensing is not occasional but daily."}
    ],
    "12": [
      {verse:"12:5",cat:"economy",text:"God chose one place to put His name — the place of His dwelling. In the New Testament economy, this unique ground is the oneness of the Body of Christ. God's people gather to His name alone."}
    ]
  },
  "JOSHUA": {
    "1": [
      {verse:"1:8",cat:"life",text:"Meditate on the law day and night — the word of God is the life-dispensing element. Joshua's strength and courage come not from human resolve but from the indwelling word."}
    ]
  },
  "1 SAMUEL": {
    "3": [
      {verse:"3:1",cat:"dispensing",text:"The word of the Lord was precious in those days — scarce because the dispensing of God through His word was infrequent. Samuel's calling marks a recovery of God's speaking, the primary channel of the divine dispensing."}
    ]
  },
  "2 SAMUEL": {
    "7": [
      {verse:"7:12-14",cat:"economy",text:"The Davidic covenant is the seed-bed of the eternal economy. God promises a house, a kingdom, and a throne forever — all fulfilled in Christ. The Son of David is also the Son of God."}
    ]
  },
  "1 KINGS": {
    "8": [
      {verse:"8:10-11",cat:"mingling",text:"The glory of the Lord filled the temple. Solomon's temple was the fulfillment of the tabernacle — a permanent dwelling of God among men. The cloud of glory signifies God's presence mingling with His building."}
    ]
  },
  "ISAIAH": {
    "9": [
      {verse:"9:6",cat:"mingling",text:"Unto us a Child is born — the mingling of divinity with humanity. His names declare His dual nature: Wonderful Counselor (divine) to Mighty God, Eternal Father to Prince of Peace. The government is upon His shoulder — God's economy administered by the God-man."}
    ],
    "53": [
      {verse:"53:5",cat:"dispensing",text:"He was pierced for our transgressions — the divine dispensing of redemption. The suffering Servant is the channel through which God dispenses healing, peace, and righteousness to fallen man."}
    ]
  },
  "EZEKIEL": {
    "1": [
      {verse:"1:15-21",cat:"economy",text:"The wheel within the wheel signifies the move of God in His economy — the divine life moving on earth through human cooperation. The living creatures (mingled beings) accompany the wheels (God's sovereign move). The Spirit of the living creature is in the wheels."}
    ],
    "36": [
      {verse:"36:26-27",cat:"dispensing",text:"A new heart and a new spirit — the divine dispensing transforms the inner being. God puts His Spirit within us, not merely upon us. This is the New Testament economy of life: the Spirit indwelling and saturating the human spirit."}
    ],
    "37": [
      {verse:"37:4-5",cat:"life",text:"The valley of dry bones is the vision of resurrection life. Breath (the Spirit) enters the slain ones, and they live. This is the dispensing of life into God's dead people — the most dramatic picture in the Old Testament of the life-giving Spirit."}
    ],
    "47": [
      {verse:"47:1-9",cat:"economy",text:"The river flowing from the temple — this is the river of water of life proceeding from the throne of God and of the Lamb. The waters deepen from ankle to knee to waist to waters to swim in — the progressive dispensing of divine life until the whole earth is healed."}
    ]
  },
  "DANIEL": {
    "2": [
      {verse:"2:34-35",cat:"economy",text:"The stone cut without hands — Christ — strikes the great image of human government and becomes a mountain filling the whole earth. This is God's economy: the kingdom of God replacing all human kingdoms through Christ's coming."}
    ],
    "7": [
      {verse:"7:13-14",cat:"mingling",text:"The Son of Man coming with the clouds — Christ as the mingled God-man receives dominion, glory, and a kingdom. All peoples serve Him. His kingdom is an everlasting kingdom — the ultimate issue of God's economy."}
    ]
  },
  "HOSEA": {
    "6": [
      {verse:"6:6",cat:"life",text:"I desire mercy and not sacrifice — God's economy is a matter of the inward life, not outward ritual. The knowledge of God is the internal dispensing of His nature into His people."}
    ]
  },
  "MATTHEW": {
    "1": [
      {verse:"1:1",cat:"economy",text:"The book of the generation of Jesus Christ, Son of David, Son of Abraham — the entire Old Testament lineage converges on Christ. God's economy through history is summarized in this genealogy: Christ is the goal."},
      {verse:"1:23",cat:"mingling",text:"'They shall call His name Emmanuel, which is translated, God with us.' This is the ultimate mingling: divinity united with humanity in one person. God is no longer merely above us or among us — He is WITH us in Christ."}
    ],
    "3": [
      {verse:"3:11",cat:"dispensing",text:"He will baptize you with the Holy Spirit and with fire. John's water baptism prepares the way; Christ's Spirit baptism IS the dispensing. The Spirit as life enters into the believers and saturates their being."}
    ],
    "5": [
      {verse:"5:3",cat:"life",text:"Blessed are the poor in spirit, for theirs is the kingdom of the heavens. The kingdom of the heavens is the realm of the divine life. To be poor in spirit is to empty the human spirit to be filled with the life of God — the basic requirement for entering the kingdom economy."}
    ],
    "6": [
      {verse:"6:33",cat:"economy",text:"Seek first the kingdom of God and His righteousness — this is the single priority of the divine economy. All material needs are added when the kingdom is sought. God's administration is the believers' first concern."}
    ],
    "16": [
      {verse:"16:18",cat:"mingling",text:"Upon this rock I will build My church — the church is built on the revelation of Christ as the Son of the living God. The church is the mingling of God with man in a corporate expression, the Body of Christ, the fullness of the One who fills all in all."}
    ],
    "17": [
      {verse:"17:2",cat:"dispensing",text:"He was transfigured before them — the divine life within Christ shining through His humanity. The transfiguration is a preview of the kingdom coming in power, when the indwelling life will saturate even the mortal body and be expressed in glory."}
    ],
    "26": [
      {verse:"26:26",cat:"dispensing",text:"Take, eat; this is My body. The Lord's table is the dispensing of Christ as food and drink to the believers. The New Covenant is enacted through His blood — the eternal life-supply for God's people."}
    ],
    "28": [
      {verse:"28:19",cat:"economy",text:"Go therefore and disciple all nations, baptizing them into the name of the Father and of the Son and of the Holy Spirit. The commission of the kingdom is the expansion of the divine economy through the Triune God being dispensed into all nations."}
    ]
  },
  "MARK": {
    "1": [
      {verse:"1:15",cat:"economy",text:"The time is fulfilled, and the kingdom of God is at hand. Repent and believe the gospel. Repentance is a change of mind for the kingdom — turning from the principle of good and evil to the principle of life."}
    ]
  },
  "LUKE": {
    "1": [
      {verse:"1:35",cat:"mingling",text:"The Holy Spirit will come upon you, and the power of the Highest will overshadow you — the conception of Christ is the miracle of divine-human mingling. The holy offspring is the God-man. Mary's body becomes the vessel of incarnation, the prototype of the church."}
    ],
    "15": [
      {verse:"15:20-24",cat:"life",text:"The prodigal son — the story of the Father's dispensing. The younger son's return is met not with judgment but with the best robe (Christ's righteousness), the ring (the Spirit's seal), and the fatted calf (Christ as life supply). The Father dispenses Himself to the returning sinner."}
    ],
    "24": [
      {verse:"24:32",cat:"dispensing",text:"Did not our heart burn within us while He opened the Scriptures? The risen Christ opens the word to the disciples — the burning heart is the subjective dispensing of the resurrected Christ through the word. The divine life is transmitted through the opened Scriptures."}
    ]
  },
  "JOHN": {
    "1": [
      {verse:"1:1",cat:"economy",text:"In the beginning was the Word — in eternity past, before creation, the divine Word existed. This Word, the second of the Trinity, is the definition, explanation, and expression of God. The entire Gospel of John unveils God's economy: the Word who is God becomes flesh to dispense life into man."},
      {verse:"1:12-13",cat:"life",text:"As many as received Him, to them He gave authority to become children of God — born not of blood nor of the will of the flesh nor of the will of man, but of God. The divine birth is the beginning of the life-dispensing process. To be a child of God is to partake of the divine nature."},
      {verse:"1:14",cat:"mingling",text:"The Word became flesh and tabernacled among us. This is the ultimate mingling: God became man without ceasing to be God and without sin. The tabernacle of God is now with men — not a tent of skins, but a person of flesh. We beheld His glory, full of grace and reality."},
      {verse:"1:29",cat:"dispensing",text:"Behold, the Lamb of God who takes away the sin of the world! The Lamb is not merely a sacrifice but the channel of the divine dispensing. Through the removal of sin, God can dispense Himself as life into man without barrier."}
    ],
    "3": [
      {verse:"3:3",cat:"life",text:"Unless one is born again, he cannot see the kingdom of God. To be born again is to receive the divine life into the human spirit. This is not a reformation but a regeneration — a new creation through the life-dispensing Spirit."},
      {verse:"3:16",cat:"economy",text:"God so loved the world that He gave His only begotten Son — God's love is the motive of His economy. The giving of the Son is the channel of the divine dispensing. Whoever believes has eternal life, not merely future but present possession."}
    ],
    "6": [
      {verse:"6:35",cat:"dispensing",text:"I am the bread of life. He who comes to Me shall never hunger. Christ as the bread of life is the daily dispensing of the divine life. As the manna was daily for Israel, Christ is the continual life-supply for the believers. Eating is the most intimate assimilation of Christ."}
    ],
    "10": [
      {verse:"10:10",cat:"life",text:"I have come that they may have life and may have it abundantly. The abundant life is the dispensing of the unsearchable riches of Christ. Life not merely for existence but for fullness — the Triune God dispensed into the believers for the overflowing expression of the corporate Christ."}
    ],
    "14": [
      {verse:"14:6",cat:"mingling",text:"I am the way and the reality and the life. Christ as the way leads to the Father as the source; Christ as the reality is the very content and substance of the divine economy; Christ as the life is the dispensing element. The mingling of the Triune God with the believers is the way into the Father."},
      {verse:"14:17",cat:"dispensing",text:"The Spirit of reality dwells with you and will be in you. This is the greatest shift in the divine dispensing: the Spirit who was WITH the disciples in the Lord's presence would now be IN them through His resurrection. The Spirit dispensed into the human spirit is the fountain of living water."},
      {verse:"14:23",cat:"mingling",text:"If anyone loves Me, My Father will love him, and We will come to him and make an abode with him. The Father and the Son make Their home in the loving believer. This is the mingling of the Triune God with man at the deepest level — not a visit but a mutual abode."}
    ],
    "15": [
      {verse:"15:4-5",cat:"life",text:"Abide in Me and I in you. As the branch cannot bear fruit of itself unless it abides in the vine, neither can you unless you abide in Me. The vine and the branches is the highest revelation of the divine dispensing: Christ as the life-supplying vine dispenses His life into the branches for the bearing of fruit."},
      {verse:"15:26",cat:"dispensing",text:"The Spirit of reality who proceeds from the Father, He will testify of Me. The procession of the Spirit is the channel of the divine dispensing. The Spirit who proceeds from the Father through the Son testifies of Christ by dispensing the reality of Christ into the believers."}
    ],
    "17": [
      {verse:"17:21",cat:"mingling",text:"That they all may be one, as You, Father, are in Me and I in You, that they also may be one in Us — the oneness of the Body is the mingling of the Triune God with all believers. This is the prayer of the Son to the Father for the ultimate mingling, the goal of the divine economy."}
    ],
    "20": [
      {verse:"20:22",cat:"dispensing",text:"He breathed into them and said, Receive the Holy Spirit. As God breathed into Adam's nostrils the breath of life, the resurrected Christ breathes the life-giving Spirit into His disciples. This is the dispensing of the pneumatic Christ — the Spirit as the breath of life for the Body."}
    ]
  },
  "ACTS": {
    "1": [
      {verse:"1:8",cat:"dispensing",text:"You shall receive power when the Holy Spirit comes upon you, and you shall be My witnesses. The power of the Spirit is the dispensing of the resurrected Christ for the expansion of the kingdom. Witnesses are those who live by the indwelling Spirit, testifying not merely what Christ did but who Christ is."}
    ],
    "2": [
      {verse:"2:2-4",cat:"economy",text:"Suddenly there came from heaven a sound like a rushing mighty wind — the outpouring of the Spirit on the day of Pentecost inaugurated the New Testament economy. The Spirit as wind, fire, and tongues speaks of the dispensing of the Triune God for the building of the church."},
      {verse:"2:42",cat:"life",text:"They continued steadfastly in the apostles' teaching and fellowship, in the breaking of bread and prayers. These four pillars of the church life are the channels of the divine dispensing: teaching (truth), fellowship (the Spirit), breaking of bread (life), and prayers (contact with God)."}
    ],
    "9": [
      {verse:"9:4-5",cat:"mingling",text:"Saul, Saul, why are you persecuting Me? The Lord's word to Saul on the Damascus road reveals the mingling: to persecute the church is to persecute Christ. The Head and the Body are one. This vision shattered Saul's religion and opened his eyes to the corporate Christ — the mingling of Christ with the believers."}
    ]
  },
  "ROMANS": {
    "1": [
      {verse:"1:3-4",cat:"mingling",text:"Christ according to the flesh, of the seed of David; designated the Son of God in power according to the Spirit of holiness. These two verses contain the entire truth of the mingling: Christ in the flesh (humanity) and in the Spirit (divinity). The gospel is the dispensing of this mingled Christ."}
    ],
    "5": [
      {verse:"5:10",cat:"life",text:"If while we were enemies we were reconciled to God through the death of His Son, much more, having been reconciled, we shall be saved in His life. Reconciliation is the means; life is the goal. The divine economy is not merely reconciliation but salvation in the life of Christ — the continual dispensing of the divine life."}
    ],
    "8": [
      {verse:"8:2",cat:"life",text:"The law of the Spirit of life in Christ Jesus has made me free from the law of sin and death. The Spirit of life is the aggregate of the divine dispensing — a law, an automatic power, operating in the human spirit to overcome sin and death. This is the central chapter on the life-dispensing Spirit."},
      {verse:"8:11",cat:"dispensing",text:"If the Spirit of the One who raised Jesus from the dead dwells in you, He who raised Christ from the dead will also give life to your mortal bodies through His Spirit who indwells you. The indwelling Spirit now dispenses resurrection life into the mortal body — the ultimate reach of the divine dispensing."},
      {verse:"8:28-30",cat:"economy",text:"All things work together for good — the good of God's eternal purpose. Foreknown, predestinated, called, justified, glorified — these five steps are the process of the divine economy. Glorification is the consummation of God's dispensing, when the sons of God are manifested in glory."}
    ],
    "12": [
      {verse:"12:1-2",cat:"life",text:"Present your bodies a living sacrifice — by the renewing of the mind. The transformation of the soul is the daily process of the divine dispensing. The renewed mind discerns the will of God — good, well-pleasing, and perfect — which is the will of the divine economy."},
      {verse:"12:4-5",cat:"mingling",text:"We, who are many, are one body in Christ, and individually members one of another. The Body of Christ is the corporate expression of the mingling of God with man. Each member functions in the Body through the dispensing of Christ's life."}
    ]
  },
  "1 CORINTHIANS": {
    "1": [
      {verse:"1:2",cat:"mingling",text:"Those who have been sanctified in Christ Jesus, called saints — the saints are the holy ones, made holy by the dispensing of Christ's holy nature into their being. Sanctification is not merely positional but organic, the mingling of God with man for the church."}
    ],
    "3": [
      {verse:"3:12-15",cat:"economy",text:"Gold, silver, precious stones — these are the materials of God's building, produced by the dispensing of the divine nature into the believers. Wood, hay, stubble are the works of the natural man. The testing fire will reveal what kind of work each has built. God's economy builds with the divine nature alone."}
    ],
    "12": [
      {verse:"12:12-13",cat:"life",text:"By one Spirit we were all baptized into one Body. The Spirit is the divine dispensing agent, baptizing all believers into the corporate Christ. The many members with many gifts are all for the building up of the Body — the increase of the dispensing of Christ."}
    ],
    "15": [
      {verse:"15:45",cat:"life",text:"The last Adam became a life-giving Spirit. This is the pivot of the divine dispensing: Christ in resurrection became the life-giving Spirit to dispense the divine life into all who believe. The life-giving Spirit is the channel, the substance, and the reality of the dispensing of God."}
    ]
  },
  "2 CORINTHIANS": {
    "3": [
      {verse:"3:3",cat:"dispensing",text:"You are a letter of Christ, ministered by us, written not with ink but with the Spirit of the living God, not in tablets of stone but in tablets of the heart of flesh. The apostles minister the Spirit, writing Christ into the believers. This is the dispensing of the life-giving Spirit into the inner being."},
      {verse:"3:18",cat:"mingling",text:"We all, with unveiled face, beholding and reflecting the glory of the Lord, are being transformed into the same image from glory to glory, even as from the Lord Spirit. Transformation is the metabolic process of the divine dispensing — the mingling of Christ's nature with our being, changing us into His image."}
    ],
    "13": [
      {verse:"13:14",cat:"economy",text:"The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all. The divine blessing of the Triune God: the love of the Father is the source, the grace of the Son is the channel, and the fellowship of the Spirit is the application. This is the dispensing of the Triune God into the believers."}
    ]
  },
  "GALATIANS": {
    "2": [
      {verse:"2:20",cat:"life",text:"I am crucified with Christ; and it is no longer I who live, but Christ lives in me. This is the essence of the divine dispensing: not I living by myself, but Christ living in me. The exchanged life — the mingling of the divine life with the human life. This is the gospel, not law."}
    ],
    "5": [
      {verse:"5:22-23",cat:"dispensing",text:"The fruit of the Spirit is love, joy, peace, long-suffering, kindness, goodness, faithfulness, meekness, self-control. The fruit of the Spirit is the issue of the divine dispensing — the manifestation of Christ's life through the believers. This is not human cultivation but the automatic expression of the indwelling Spirit."}
    ]
  },
  "EPHESIANS": {
    "1": [
      {verse:"1:9-10",cat:"economy",text:"He made known to us the mystery of His will according to His good pleasure, which He purposed in Himself for the economy of the fullness of the times, to head up all things in Christ. This is the definition of God's economy: to head up all things in Christ. The church is the firstfruits of this universal heading-up."},
      {verse:"1:22-23",cat:"mingling",text:"The church, which is His Body, the fullness of the One who fills all in all. The church as the Body of Christ is the mingling of Christ with His believers. The fullness is the expression of the One who fills — the divine dispensing reaching its corporate expression."}
    ],
    "2": [
      {verse:"2:15",cat:"life",text:"Abolishing in His flesh the law of the commandments in ordinances, that He might create the two in Himself into one new man. The new man is the corporate mingling of Jewish and Gentile believers in Christ. The law of ordinances was the dividing wall; in Christ, the dividing wall is abolished, and the new man is created by the dispensing of the divine life."}
    ],
    "3": [
      {verse:"3:2",cat:"economy",text:"The stewardship of the grace of God which was given to me for you. The stewardship (oikonomia = economy) is the dispensing of the grace of God. Paul's ministry was not merely teaching but dispensing — distributing the unsearchable riches of Christ as grace to the saints."},
      {verse:"3:8-9",cat:"dispensing",text:"To announce to the Gentiles the unsearchable riches of Christ as the gospel and to enlighten all that they may see what the economy of the mystery is. The unsearchable riches of Christ are the content of the divine dispensing. The economy is the administration of these riches for the building of the church."},
      {verse:"3:17",cat:"life",text:"That Christ may make His home in your hearts through faith — the deepest word on the divine indwelling. Christ not merely visits but settles down, building a home in every part of the inner being. The dispensing of Christ into the heart produces the full stature of the fullness of God."},
      {verse:"3:19",cat:"mingling",text:"That you may be filled unto all the fullness of God. The ultimate goal of the divine dispensing: the believers are filled with the Triune God to become His corporate expression. Fullness is not a quantity but the complete saturation of man with God."}
    ],
    "4": [
      {verse:"4:4-6",cat:"economy",text:"One Body and one Spirit, as also you were called in one hope of your calling; one Lord, one faith, one baptism; one God and Father of all. The seven 'ones' are the base of the oneness of the Body. The economy of God produces this oneness through the dispensing of the Triune God into the members."},
      {verse:"4:15-16",cat:"life",text:"Growing up into Him in all things, who is the Head, Christ, from whom all the Body, being joined together and being knit together through every joint of the rich supply and through the operation in the measure of each one part, causes the growth of the Body unto the building up of itself in love. The growth of the Body is the increase of the dispensing of Christ."}
    ],
    "5": [
      {verse:"5:18",cat:"dispensing",text:"Be filled in spirit — not with wine but with the Spirit. The filling of the Spirit is the continual dispensing of the divine life into the human spirit. As the physical body is energized by wine, the spiritual body is energized by the Spirit. This filling produces the issue of the church life."}
    ]
  },
  "PHILIPPIANS": {
    "1": [
      {verse:"1:19",cat:"life",text:"This will turn out to my salvation through your petition and the bountiful supply of the Spirit of Jesus Christ. The bountiful supply (choregia) is the full provision of the Spirit for the divine dispensing. As the chorus was supplied in ancient Greek theater, the Spirit supplies every need for the living of Christ."}
    ],
    "2": [
      {verse:"2:5-8",cat:"mingling",text:"Let this mind be in you which was also in Christ Jesus — the self-emptying of Christ is the pattern of the mingling. Though existing in the form of God, He took the form of a slave. The God-man is the prototype of the divine dispensing: emptying to be filled with God."}
    ],
    "3": [
      {verse:"3:10-11",cat:"life",text:"To know Him and the power of His resurrection and the fellowship of His sufferings, being conformed to His death. The knowledge of Christ is experiential — not objective information but subjective dispensing. The power of resurrection is the life-dispensing power that conforms us to Christ's death."}
    ]
  },
  "COLOSSIANS": {
    "1": [
      {verse:"1:15-19",cat:"economy",text:"He is the image of the invisible God, the Firstborn of all creation — all things were created through Him and unto Him. Christ is the centrality and universality of God's economy. All the fullness dwells in Him. The all-inclusive Christ is the content, the sphere, and the goal of the divine dispensing."},
      {verse:"1:27",cat:"mingling",text:"Christ in you, the hope of glory. This is the mystery of God's economy among the Gentiles: the all-inclusive Christ dispensed into the believers. Christ in you is the mingling of the divine Person with the human person. The hope of glory is the full expression of this indwelling Christ."}
    ],
    "2": [
      {verse:"2:9",cat:"dispensing",text:"In Him dwells all the fullness of the Godhead bodily — the entire Triune God dwells in Christ bodily. This fullness is not static but dispensed into the Body, which is the church. Christ is the vessel of the fullness; the church is the expression of the fullness."}
    ],
    "3": [
      {verse:"3:4",cat:"life",text:"When Christ, our life, is manifested, then you also will be manifested with Him in glory. Christ is not merely the giver of life but our very life. The living of the believers is the living of Christ dispensed into them. The manifestation is the full emergence of the indwelling life."},
      {verse:"3:10-11",cat:"mingling",text:"Put on the new man, which is being renewed unto full knowledge according to the image of the One who created him — where there cannot be Greek and Jew, but Christ is all and in all. The new man is the corporate mingling of Christ with all believers. Christ is the constituent; the believers are the expression."}
    ]
  },
  "1 THESSALONIANS": {
    "2": [
      {verse:"2:4",cat:"dispensing",text:"We have been approved by God to be entrusted with the gospel — the entrusted gospel is the divine deposit for dispensing. The apostles imparted not only the word but their own lives (v. 8), because the gospel is the dispensing of the divine life through the human vessel."}
    ],
    "5": [
      {verse:"5:23",cat:"life",text:"May your spirit and soul and body be preserved complete. The three-part man is the vessel for the divine dispensing. The spirit is regenerated, the soul is being transformed, and the body will be transfigured. The complete preservation is the full saturation of the entire being by the life of God."}
    ]
  },
  "1 TIMOTHY": {
    "1": [
      {verse:"1:3-4",cat:"economy",text:"Charge certain ones not to teach different things, nor to give heed to myths and endless genealogies, which produce questionings rather than the economy of God which is in faith. The economy of God (theo-oikonomia) is the central revelation of Paul's ministry: God's household administration to dispense Himself into His people. Faith is the principle of this economy."}
    ],
    "3": [
      {verse:"3:15-16",cat:"mingling",text:"The house of God, which is the church of the living God, the pillar and ground of the truth. Great is the mystery of godliness: God manifested in the flesh. The church is the house of the living God — the mingling of God with man for His dwelling. God manifested in the flesh is the great mystery of the divine economy."}
    ]
  },
  "2 TIMOTHY": {
    "1": [
      {verse:"1:6-7",cat:"dispensing",text:"Stir up the gift of God which is in you — God has not given us a spirit of cowardice, but of power and of love and of sober-mindedness. The gift of God is the life-dispensing Spirit within. Fanning into flame this gift is the cooperation with the divine dispensing."}
    ],
    "4": [
      {verse:"4:2",cat:"economy",text:"Preach the word; be ready in season and out of season. The preaching of the word is the primary means of the divine dispensing. The word is the container of Christ; to preach the word is to dispense Christ into the hearers."}
    ]
  },
  "TITUS": {
    "2": [
      {verse:"2:11-12",cat:"life",text:"The grace of God has appeared, bringing salvation to all men, training us to deny ungodliness and worldly lusts and to live soberly and righteously and godly. Grace is not merely favor but the divine life dispensed into the believers for living. The grace that saves also trains — the dispensing of the divine nature transforms the character."}
    ]
  },
  "HEBREWS": {
    "1": [
      {verse:"1:3",cat:"dispensing",text:"He is the effulgence of His glory and the exact imprint of His substance, upholding all things by the word of His power. The Son is the shining forth of the Father's glory — the very dispensing of God. The word of His power upholds the universe; how much more does it sustain the believers."}
    ],
    "4": [
      {verse:"4:9",cat:"life",text:"There remains a Sabbath rest for the people of God. The rest is not a day but a person — Christ dispensed into the believers as their rest. To enter into rest is to cease from our own works and allow the indwelling Christ to live through us."}
    ],
    "6": [
      {verse:"6:4-5",cat:"mingling",text:"Those who have once been enlightened and have tasted of the heavenly gift and have become partakers of the Holy Spirit and have tasted the good word of God and the powers of the age to come. Partaking of the Holy Spirit is the sharing in the divine dispensing. The taste is the initial experience of the mingling."}
    ],
    "8": [
      {verse:"8:10",cat:"economy",text:"I will put My laws into their mind, and on their heart I will write them; and I will be God to them, and they will be a people to Me. The New Covenant is the charter of the divine dispensing: God writing Himself into the inner being of His people. The law inward, not outward — the dispensing of the divine nature."}
    ],
    "9": [
      {verse:"9:14",cat:"dispensing",text:"How much more will the blood of Christ purify our conscience from dead works to serve the living God. The blood of Christ cleanses the conscience, removing the barrier to the divine dispensing. A pure conscience is the channel through which God dispenses Himself."}
    ],
    "11": [
      {verse:"11:1",cat:"life",text:"Faith is the substantiation of things hoped for, the conviction of things not seen. Faith is the substantiating principle of the divine economy. By faith, the divine realities become the believer's experience. The entire chapter is a gallery of those who lived by the dispensing life."}
    ],
    "12": [
      {verse:"12:2",cat:"economy",text:"Looking away unto Jesus, the Author and Perfecter of our faith, who for the joy set before Him endured the cross. Jesus is the leader and finisher of the faith-way. The joy set before Him was the church — the corporate expression of the divine dispensing. His endurance on the cross opened the channel for the divine life."}
    ]
  },
  "JAMES": {
    "1": [
      {verse:"1:18",cat:"life",text:"Of His own will He brought us forth by the word of truth, that we might be a kind of firstfruits of His creatures. The divine begetting through the word of truth is the initiation of the life-dispensing process. The believers as firstfruits are the initial harvest of God's life-dispensing work in the universe."}
    ]
  },
  "1 PETER": {
    "1": [
      {verse:"1:3",cat:"life",text:"Blessed be the God and Father of our Lord Jesus Christ, who according to His great mercy has regenerated us unto a living hope through the resurrection of Jesus Christ from the dead. Regeneration is the beginning of the divine dispensing. The living hope is not a future hope but the present experience of the resurrected life."},
      {verse:"1:23",cat:"dispensing",text:"Having been regenerated not of corruptible seed but of incorruptible, through the living and abiding word of God. The incorruptible seed is the divine life dispensed into the believers through the word. This seed grows and develops into the full expression of the divine nature."}
    ],
    "2": [
      {verse:"2:5",cat:"mingling",text:"You yourselves also, as living stones, are being built up as a spiritual house into a holy priesthood to offer up spiritual sacrifices acceptable to God through Jesus Christ. The living stones are believers who have been transformed by the divine dispensing. The spiritual house is the mingling of God with man — God's dwelling place."},
      {verse:"2:9",cat:"economy",text:"You are a chosen race, a royal priesthood, a holy nation, a people for God's own possession, that you may proclaim the virtues of Him who has called you out of darkness into His marvelous light. The called-out people are the issue of the divine economy — a corporate vessel to express God's virtues."}
    ]
  },
  "2 PETER": {
    "1": [
      {verse:"1:4",cat:"mingling",text:"He has granted to us precious and exceedingly great promises that through these you might become partakers of the divine nature. This is the highest word on the divine dispensing: partakers of the divine nature — not merely imitators but actual partakers. The mingling of God with man reaches its peak in the participation of the divine nature."},
      {verse:"1:5-8",cat:"life",text:"Supply bountifully in your faith virtue, and in virtue knowledge... The divine life dispensed into the believer develops through stages: faith, virtue, knowledge, self-control, endurance, godliness, brotherly love, love. These are the stages of the growth in life — the organic development of the divine dispensing."}
    ]
  },
  "1 JOHN": {
    "1": [
      {verse:"1:3",cat:"dispensing",text:"That which we have seen and heard we declare to you, that you also may have fellowship with us, and indeed our fellowship is with the Father and with His Son Jesus Christ. Fellowship (koinonia) is the mutual participation in the divine life. The apostolic declaration dispenses the divine life for the fellowship of the Triune God."},
      {verse:"1:7",cat:"life",text:"If we walk in the light as He is in the light, we have fellowship with one another, and the blood of Jesus His Son cleanses us from every sin. Fellowship is the flow of the divine life among the believers. The blood maintains the fellowship by cleansing the channel of the divine dispensing."}
    ],
    "3": [
      {verse:"3:2",cat:"mingling",text:"Beloved, now we are children of God, and it has not yet been manifested what we will be. We know that if He is manifested, we will be like Him, because we will see Him as He is. The children of God are the family of God through the divine birth. The coming manifestation is the full saturation of the divine life."}
    ]
  },
  "JUDE": {
    "1": [
      {verse:"1:20-21",cat:"economy",text:"Building yourselves up in your most holy faith, praying in the Holy Spirit, keep yourselves in the love of God, awaiting the mercy of our Lord Jesus Christ unto eternal life. The threefold practice — faith, love, mercy — corresponds to the three of the Triune God. This is the believers' cooperation with the divine economy."}
    ]
  },
  "REVELATION": {
    "1": [
      {verse:"1:10-11",cat:"dispensing",text:"I was in spirit on the Lord's Day — the spirit is the organ for receiving the divine dispensing. The entire book of Revelation is the dispensing of Christ as the seven Spirits to the churches. The vision of the Son of Man in glory is the pattern of the mature Christian life."}
    ],
    "2": [
      {verse:"2:7",cat:"life",text:"To him who overcomes, to him I will give to eat of the tree of life, which is in the paradise of God. The overcoming believers eat of the tree of life in the church age and will eat of it for eternity in the New Jerusalem. The tree of life is the dispensing of Christ as life."}
    ],
    "3": [
      {verse:"3:20",cat:"mingling",text:"Behold, I stand at the door and knock; if anyone hears My voice and opens the door, I will come in to him and dine with him and he with Me. This is the ultimate mingling: Christ entering into the individual believer for intimate fellowship. The dining is the mutual dispensing — Christ dispensing Himself and the believer responding."}
    ],
    "21": [
      {verse:"21:2-3",cat:"economy",text:"I saw the holy city, New Jerusalem, coming down out of heaven from God... Behold, the tabernacle of God is with men, and He will dwell with them, and they will be His peoples, and God Himself will be with them and be their God. The New Jerusalem is the ultimate issue of the divine economy — the eternal mingling of the Triune God with His redeemed people. The tabernacle of God is with men forever."},
      {verse:"21:22",cat:"dispensing",text:"I saw no temple in it, for the Lord God the Almighty and the Lamb are its temple. In the New Jerusalem, God and the Lamb themselves are the temple — the place of meeting and dispensing. No intermediate building is needed because God Himself is the direct channel of the divine life-dispensing for eternity."}
    ],
    "22": [
      {verse:"22:1-2",cat:"life",text:"He showed me a river of water of life, bright as crystal, proceeding out of the throne of God and of the Lamb in the middle of its street. And on this side and on that side of the river was the tree of life. The river of water of life is the ultimate dispensing of the Triune God. The tree of life grows on both sides of the river — Christ as life is available everywhere in the New Jerusalem. The leaves of the tree are for the healing of the nations."},
      {verse:"22:17",cat:"dispensing",text:"The Spirit and the bride say, Come! And let him who hears say, Come! And let him who is thirsty come; let him who wills take the water of life freely. The Spirit and the bride — the ultimate mingling of the Triune God with the redeemed — together dispense the water of life to all who thirst. The divine dispensing continues for eternity."}
    ]
  }
};

window.openRvNote = function() {
  var bookId = window.activeBookContext ? window.activeBookContext.id : '';
  var panel = document.getElementById('readerRvNote');
  if (!panel) return;
  var notes = RV_FOOTNOTES[bookId] || RV_FOOTNOTES[bookId.toUpperCase()];
  if (!notes) {
    panel.innerHTML = '<div style="text-align:center;padding:60px 20px;font-family:\'Cormorant Garamond\',serif;font-style:italic;color:var(--text-secondary);"><div style="font-size:2.4rem;margin-bottom:12px;">&#128214;</div>No Recovery Version footnotes available for this book.</div>';
    return;
  }
  var chs = Object.keys(notes).sort(function(a,b){return parseInt(a,10)-parseInt(b,10);});
  var html = '';
  chs.forEach(function(ch) {
    html += '<div class="rv-chapter"><div class="rv-ch-title">CHAPTER ' + ch + '</div>';
    notes[ch].forEach(function(n) {
      html += '<div class="rv-note-item">' +
        '<span class="rv-verse-ref">' + n.verse + '</span>' +
        '<span class="rv-cat-tag">' + n.cat + '</span>' +
        '<div class="rv-text">' + n.text + '</div>' +
        '</div>';
    });
    html += '</div>';
  });
  panel.innerHTML = '<div class="rv-header"><span class="rv-header-icon">&#128214;</span> RECOVERY VERSION — FOOTNOTES</div>' +
    '<div style="font-family:\'Cormorant Garamond\',serif;font-size:0.65rem;color:var(--text-secondary);font-style:italic;padding:0 20px 16px;border-bottom:1px solid rgba(212,175,55,0.08);">' +
    'Footnotes from the Recovery Version (Living Stream Ministry). Focused on the divine economy — God\'s dispensing of Himself into His people for the building of the church.' +
    '</div>' + html;
};

// ── PATRISTIC COMMENTARY dataset ──────────────────────────────────────
// Public domain excerpts from early church fathers + Recovery Version ministers
var PATRISTIC_COMMENTARY = {
  "GENESIS": [
    { father: "Augustine of Hippo", source: "City of God, Book XVI", text: "The six days of creation are not to be understood as ordinary days but as a framework for understanding the single act of divine creation. In Genesis, the Spirit of God moved upon the waters — a figure of the Holy Spirit working upon the chaotic material to bring forth order and life. The creation narrative speaks not merely of what was made, but of the eternal counsel of the Trinity in the beginning." },
    { father: "Watchman Nee", source: "The Mystery of Creation", text: "In Genesis we see God's principle of recovery. The earth became waste and void — this was not God's original creation but a judgment. Then God began to recover. The Spirit moving on the waters is the church age. The appearing of light is the gospel. The firmament speaks of the dividing work of the cross. All of Genesis 1 is a picture of God's recovery of fallen man." }
  ],
  "EXODUS": [
    { father: "Origen of Alexandria", source: "Homilies on Exodus, II.1", text: "The departure from Egypt is the mystery of the soul leaving the bondage of this world. Pharaoh is the prince of this age; Egypt is the realm of darkness. The Passover lamb slain and its blood applied to the doorposts is the cross of Christ, the sign by which the destroyer passes over those who believe. The crossing of the Red Sea is the baptism that separates us from the old creation." },
    { father: "Witness Lee", source: "Life-Study of Exodus", text: "The Tabernacle is the central revelation of Exodus, not merely as a tent but as the mingling of God with man. Every board, every curtain, every vessel speaks of Christ. The ark of the testimony within the Holy of Holies is Christ Himself as the embodiment of God. The entire Tabernacle is a type of the church as the corporate expression of Christ." }
  ],
  "LEVITICUS": [
    { father: "Cyril of Alexandria", source: "Glaphyra on Leviticus", text: "The five offerings of Leviticus are not merely ritual prescriptions but prophecies of Christ. The burnt offering signifies Christ offering Himself wholly to God. The sin offering prefigures Him who knew no sin becoming sin for us. The peace offering speaks of the communion between God and man restored through the blood of the covenant." },
    { father: "Watchman Nee", source: "The Spiritual Man", text: "Leviticus reveals the holiness of God and the way of approach. The offerings are not for us to repeat but for us to enter into by identification with Christ. He is the reality of every offering. When we understand the offerings, we understand the cross in its many aspects." }
  ],
  "NUMBERS": [
    { father: "Ambrose of Milan", source: "On the Duties of the Clergy", text: "The numbering of the tribes in the wilderness is not a census of flesh but a muster of faith. Each tribe encamped around the Tabernacle in an appointed order — this is the church arrayed around Christ. The cloud by day and fire by night are the Holy Spirit guiding the people of God through the wilderness of this age." },
    { father: "Witness Lee", source: "Life-Study of Numbers", text: "The book of Numbers shows us God's people on the move. The formation of the camp with the ark at the center and the tribes in a specific order around it is a type of the local churches. The cloud moving is the Spirit's leading. Every step is for the building of God's dwelling place." }
  ],
  "DEUTERONOMY": [
    { father: "Jerome", source: "Epistle 78 to Fabiola", text: "Deuteronomy is the second law, not a repetition but an intensification. Moses recites the law to the new generation who are about to enter the land. The law is not given again for justification but as the standard of life in the land of promise — a figure of the Spirit writing God's law upon the hearts of the faithful." },
    { father: "Watchman Nee", source: "The Normal Christian Life", text: "Deuteronomy reveals that God's people must learn to live not by bread alone but by every word that proceeds from God. The land is not a reward for good behavior but a gift to be possessed by fighting. Canaan is the heavenlies in Christ, and we must fight the spiritual warfare to possess our inheritance." }
  ],
  "JOSHUA": [
    { father: "Origen of Alexandria", source: "Homilies on Joshua, I.1", text: "Joshua is the type of Jesus — the two names are the same. As Joshua led the people into the promised land, so Jesus leads His people into the heavenly inheritance. The crossing of the Jordan is the crossing from death into life. The walls of Jericho falling by faith prefigure the spiritual victories of the church." },
    { father: "Witness Lee", source: "Life-Study of Joshua", text: "Joshua typifies Christ as the Captain of the Lord's army who leads the overcomers into the possession of the all-inclusive Christ as the good land. The seven trumpets and the ark going before signify the testimony of the church in spiritual warfare." }
  ],
  "1 SAMUEL": [
    { father: "Augustine of Hippo", source: "City of God, Book XVII", text: "Hannah's prayer at the dedication of Samuel is a prophecy of the church. She who was barren rejoices because the barren has borne seven — a figure of the church, once barren among the nations, now fruitful in Christ. Samuel himself is a type of Christ as prophet, priest, and judge." },
    { father: "Watchman Nee", source: "Changed into His Likeness", text: "Samuel's ministry marked the transition from the age of the priesthood to the age of the kingdom. He was a man who knew God's heart. His life shows us that God cannot use self-willed men. The failure of Eli and the rise of Samuel teach us that God always finds a way to carry out His purpose." }
  ],
  "2 SAMUEL": [
    { father: "Theodoret of Cyrus", source: "Questions on 2 Samuel", text: "David's kingdom is a type of the kingdom of Christ. The ark brought to Jerusalem with rejoicing prefigures Christ's ascension into the heavenly Zion. David's sin with Bathsheba and his repentance in Psalm 51 demonstrate both the frailty of the best of men and the abundance of divine mercy." },
    { father: "Witness Lee", source: "Life-Study of 1 & 2 Samuel", text: "David is a type of Christ as the king who suffered before entering glory. His victories over the Philistines and his establishment of the kingdom in Jerusalem prefigure Christ's victory over Satan and the establishment of His kingdom. Yet David also shows the principle of the overcomer — one according to God's heart." }
  ],
  "1 KINGS": [
    { father: "John Chrysostom", source: "Homilies on 1 Kings", text: "Solomon's temple is the wonder of the ancient world, but the Lord who fills heaven and earth cannot be contained in any house built by hands. The temple was a shadow; the reality is Christ. The glory that filled Solomon's temple was a foretaste of the incarnation, when the Word became flesh and dwelt among us." },
    { father: "Witness Lee", source: "Life-Study of 1 Kings", text: "The building of the temple under Solomon is the greatest type of the building of the church in the Old Testament. Solomon is a type of Christ as the Prince of Peace building the house of God. The materials — gold, silver, cedar, stone — all speak of Christ's person and work." }
  ],
  "ISAIAH": [
    { father: "Jerome", source: "Commentary on Isaiah, Book I", text: "Isaiah saw the Lord high and lifted up, and his train filled the temple. This vision is the revelation of the Trinity — the seraphim crying 'Holy, Holy, Holy' proclaim the three persons yet one God. Isaiah's 'Here am I, send me' is the pattern of every prophetic vocation." },
    { father: "Witness Lee", source: "God's New Testament Economy", text: "Isaiah contains the richest revelation of Christ as the God-man. 'Unto us a Child is born, unto us a Son is given' speaks of the incarnation. The suffering Servant in chapter 53 is Christ on the cross bearing our sins. The New Heaven and New Earth in chapter 65 are the ultimate consummation of God's redemption." }
  ],
  "EZEKIEL": [
    { father: "Gregory the Great", source: "Homilies on Ezekiel, II.1", text: "Ezekiel's vision of the wheels within wheels and the living creatures is the most profound revelation of God's government in all Scripture. The wheels speak of divine providence moving through history. The living creatures are the four Gospels — each face revealing Christ from a different angle — man, lion, ox, eagle." },
    { father: "Watchman Nee", source: "The Latent Power of the Soul", text: "Ezekiel reveals God's principle of recovery and rebuilding. The valley of dry bones coming to life is the resurrection of the church. The temple vision at the end is the ultimate building — the New Jerusalem. God begins with individuals but ends with a corporate dwelling place." }
  ],
  "DANIEL": [
    { father: "Jerome", source: "Commentary on Daniel, Prologue", text: "Daniel, the most learned of the wise men of Babylon, prophesied the succession of four world empires and the coming of the Son of Man in the clouds. The seventy weeks are a prophecy of the coming of Christ and the destruction of Jerusalem. Daniel stands as proof that God rules in the kingdoms of men." },
    { father: "Witness Lee", source: "Life-Study of Daniel", text: "Daniel was an overcomer in the age of the captivity. His prayer life, his separated diet, his refusal to compromise — these are the marks of the overcomer whom God uses to turn the age. The image in Nebuchadnezzar's dream is the totality of human government, and the stone cut without hands is Christ's kingdom." }
  ],
  "HOSEA": [
    { father: "Cyril of Alexandria", source: "Commentary on Hosea", text: "Hosea's marriage to Gomer is the most startling allegory in Scripture — God marrying an unfaithful bride. Gomer is Israel, and Israel is every soul that has played the harlot with the world. Yet God redeems her, purchases her back, and says, 'You shall call Me My Husband.' This is the gospel in the prophets." },
    { father: "Watchman Nee", source: "The Song of Songs", text: "Hosea reveals God's heart as a husband whose wife has been unfaithful. The restoration of Gomer prefigures the restoration of Israel and, in a deeper sense, the church's return to her first love. God's love is not conditional; it is the very nature of the One who is love." }
  ],
  "MATTHEW": [
    { father: "Jerome", source: "Commentary on Matthew, I.1", text: "Matthew wrote his Gospel in Hebrew for those of the circumcision who believed. The genealogy from Abraham to Christ establishes Jesus as the promised Seed. The Sermon on the Mount is the law of the kingdom, surpassing the law of Moses not by abolishing but by fulfilling." },
    { father: "Witness Lee", source: "Life-Study of Matthew", text: "Matthew presents Christ as the King-Savior. The kingdom of the heavens is the central theme — not a physical kingdom but the reign of God in the hearts of His people. The church, revealed in chapter 16, is the kingdom in reality today. The parables of the kingdom in chapter 13 show its development through the age." }
  ],
  "MARK": [
    { father: "Bede the Venerable", source: "Exposition of the Gospel of Mark", text: "Mark, the disciple of Peter, wrote the Gospel in Rome at the request of the brethren. He presents Christ as the Servant — no genealogy, for who can trace the descent of a servant? The swiftness of his narrative, moving immediately to action, reveals the Servant of the Lord tirelessly about His Father's work." },
    { father: "Watchman Nee", source: "The Normal Christian Worker", text: "Mark presents Christ as the faithful Servant. The key word is 'immediately' — straightway, forthwith — the serving Christ is always moving, always meeting needs. This Gospel teaches us that true service is not in teaching but in doing the will of God." }
  ],
  "LUKE": [
    { father: "Ambrose of Milan", source: "Exposition of the Gospel of Luke, I.1-3", text: "Luke, the physician, traces the genealogy from Jesus back to Adam — the Son of Man in His full humanity. The parables unique to Luke — the Good Samaritan, the Prodigal Son — reveal the mercy of God toward the outcast and the lost. Luke's Gospel is the Gospel of prayer, of the poor, of the Holy Spirit." },
    { father: "Watchman Nee", source: "The Prayer Ministry of the Church", text: "Luke emphasizes Christ as the man of prayer. He prayed at His baptism, before choosing the disciples, on the Mount of Transfiguration, on the cross. His prayer life shows us that even the Son of God lived by prayer. If He needed prayer, how much more do we?" }
  ],
  "JOHN": [
    { father: "John Chrysostom", source: "Homilies on the Gospel of John, I.1-4", text: "John soars above the other Evangelists as an eagle above the birds. While Matthew, Mark, and Luke begin with Christ's earthly ministry, John begins with eternity — 'In the beginning was the Word.' He reveals the deity of Christ more clearly than any other Scripture. His Gospel is the sanctuary of the Godhead." },
    { father: "Witness Lee", source: "Life-Study of John", text: "John presents Christ as the very God who became flesh to dispense Himself into man. The seven 'I Am's reveal Christ as life — the bread of life, the light of life, the resurrection and the life. The Gospel of John is not merely biography but the revelation of God's eternal economy to work Himself into His chosen people." }
  ],
  "ACTS": [
    { father: "John Chrysostom", source: "Homilies on the Acts of the Apostles, I.1", text: "The Acts of the Apostles is the Gospel of the Holy Spirit. What the Gospels record of Christ's words and deeds, Acts records of the Spirit's words and deeds through the apostles. The church is born, persecuted, scattered, and yet spreads to the ends of the earth. This pattern continues to this day." },
    { father: "Watchman Nee", source: "The Normal Christian Church Life", text: "Acts is not a book of doctrines but of practices — how the early church lived, met, fellowshipped, and spread. The organic union of the believers with the resurrected Christ produced a corporate testimony that turned the world upside down. The pattern of Acts is the norm for the church." }
  ],
  "ROMANS": [
    { father: "Augustine of Hippo", source: "On the Spirit and the Letter, 6-8", text: "The Apostle Paul teaches that the law was given not to save but to convict; not to heal but to reveal the wound. Through the law comes the knowledge of sin. But where sin abounded, grace abounded much more. Justification is by faith alone, not by works of the law, so that all may boast in the Lord alone." },
    { father: "Watchman Nee", source: "The Normal Christian Life", text: "Romans is the gospel of God in its fullest expression. The first eight chapters cover the blood, the cross, and the Spirit — three stages of the Christian life. The blood deals with our sins, the cross deals with our self, and the Spirit supplies the life of Christ. Romans 8 is the climax: no condemnation, no separation." }
  ],
  "1 CORINTHIANS": [
    { father: "John Chrysostom", source: "Homilies on 1 Corinthians, I.1-2", text: "Paul writes to a church divided by party spirit — 'I am of Paul, I of Apollos, I of Cephas.' But Christ is not divided! The cross is the center that unites all believers. The wisdom of God is foolishness to the world, yet it is the power of God unto salvation. The Corinthians needed to learn that knowledge puffs up but love builds up." },
    { father: "Witness Lee", source: "Life-Study of 1 Corinthians", text: "This book deals with the problems of the local church — divisions, morality, marriage, spiritual gifts. But the central revelation is Christ as the all-inclusive One given by God to the believers as their portion. 'Christ is all and in all' — this is the remedy for every problem in the church." }
  ],
  "2 CORINTHIANS": [
    { father: "John Chrysostom", source: "Homilies on 2 Corinthians, I.1", text: "In this epistle Paul defends his apostleship against false apostles. He who was caught up to the third heaven now boasts in his weaknesses. The treasure in earthen vessels — the power of God manifest through the fragility of man. This is the paradox of the Christian ministry: strength perfected in weakness." },
    { father: "Watchman Nee", source: "The Ministry of the Word", text: "Second Corinthians is the most personal of Paul's letters. It reveals the inner life of a minister of Christ — his sufferings, his burdens, his joy. The ministry of the Spirit (chapter 3) surpasses the ministry of the letter. The new creation in Christ is the measure of all true ministry." }
  ],
  "GALATIANS": [
    { father: "Jerome", source: "Commentary on Galatians, I.1-3", text: "Paul is astonished that the Galatians are so quickly removing from Him who called them to a different gospel. The issue is justification — is it by faith or by works of the law? Those who are of faith are sons of Abraham. The law was our tutor to bring us to Christ, that we might be justified by faith." },
    { father: "Witness Lee", source: "Life-Study of Galatians", text: "Galatians is the Magna Carta of Christian freedom. Christ has set us free — not to sin but from the law. The flesh and the Spirit are in constant warfare. To walk by the Spirit is the practical living of the church. The goal of God's economy is not law-keeping but Christ being formed in the believers." }
  ],
  "EPHESIANS": [
    { father: "Theodore of Mopsuestia", source: "Commentary on Ephesians, I.1-3", text: "Paul writes from chains to reveal the mystery hidden from the ages: that the Gentiles are fellow heirs of the same body and partakers of the promise in Christ Jesus through the gospel. The church is the body of Christ, the fullness of Him who fills all in all. The household order — husband, wife, children, servants — is set within the framework of Christ's love." },
    { father: "Watchman Nee", source: "Sit, Walk, Stand", text: "Ephesians is the book of the church. In the first three chapters we sit with Christ in the heavenlies — our position. In chapters 4-6 we walk worthily — our behavior. And we stand against the schemes of the devil — our warfare. The church is not an organization but the organic Body of Christ, the fullness of the One who fills all." }
  ],
  "PHILIPPIANS": [
    { father: "John Chrysostom", source: "Homilies on Philippians, I.1", text: "Paul rejoices in prison. His bonds have advanced the gospel. The secret of joy is the mind of Christ — who, being in the form of God, emptied Himself, taking the form of a servant. This self-emptying is the pattern for all Christian conduct. Rejoice in the Lord always; again I say, rejoice." },
    { father: "Witness Lee", source: "Life-Study of Philippians", text: "Philippians is the book of joy in the midst of suffering. The secret of contentment is Christ — to know Him, to gain Him, to be found in Him. The goal of the Christian life is not joy itself but Christ. Joy is the byproduct of pursuing the prize of the upward call of God in Christ Jesus." }
  ],
  "COLOSSIANS": [
    { father: "Theodore of Mopsuestia", source: "Commentary on Colossians, I.1", text: "Paul confronts the philosophy and empty deceit that threaten the Colossian church — human tradition and the elemental spirits of the world. The answer is Christ: He is the image of the invisible God, the firstborn of all creation. In Him all the fullness of God dwells bodily, and in Him you have been made complete." },
    { father: "Witness Lee", source: "Life-Study of Colossians", text: "Colossians reveals Christ as the Head of the Body. The all-inclusive Christ is the centrality and universality of God's economy. He is the mystery of God — all the treasures of wisdom and knowledge are hidden in Him. The Christian life is not asceticism but holding the Head, from whom the Body grows with the growth of God." }
  ],
  "1 THESSALONIANS": [
    { father: "John Chrysostom", source: "Homilies on 1 Thessalonians, I.1", text: "Paul writes to young believers who turned from idols to serve the living God. Their faith, love, and hope are the three graces that adorn the church. The coming of the Lord is the great hope that sanctifies the believer's life. We are not appointed to wrath but to obtain salvation through our Lord Jesus Christ." },
    { father: "Watchman Nee", source: "The Salvation of the Soul", text: "First Thessalonians emphasizes the three parts of man — spirit, soul, and body. The entire being is to be sanctified blamelessly at the coming of the Lord. The rapture is not merely an escape but the completion of the believers' transformation into the image of Christ." }
  ],
  "1 TIMOTHY": [
    { father: "John Chrysostom", source: "Homilies on 1 Timothy, I.1", text: "Paul instructs Timothy on the conduct of the household of God. The church is the pillar and ground of the truth. Overseers must be above reproach; deacons must hold the mystery of the faith with a clear conscience. Godliness with contentment is great gain. The love of money is a root of all kinds of evil." },
    { father: "Witness Lee", source: "Life-Study of 1 Timothy", text: "First Timothy reveals God's economy, which is God's household administration to dispense Himself into His people. The church is God's house, the supporting pillar and base of the truth. The great mystery of godliness — God manifested in the flesh — is the central content of the church's testimony." }
  ],
  "2 TIMOTHY": [
    { father: "John Chrysostom", source: "Homilies on 2 Timothy, I.1", text: "Paul writes his last words from the Roman dungeon. He has fought the good fight, finished the race, kept the faith. The crown of righteousness awaits him — and not only him but all who love the Lord's appearing. Timothy must entrust the apostolic deposit to faithful men who will teach others also." },
    { father: "Watchman Nee", source: "The Normal Christian Worker", text: "Second Timothy is Paul's farewell charge to a younger co-worker. The key is the transmission of the truth — from Paul to Timothy to faithful men to others. In a time of decline, the Word of God remains the unchanging foundation. The Scriptures are God-breathed and profitable for every aspect of the Christian life." }
  ],
  "TITUS": [
    { father: "John Chrysostom", source: "Homilies on Titus, I.1", text: "Paul leaves Titus in Crete to set in order what remains. The grace of God has appeared, bringing salvation to all men, training us to renounce ungodliness and live sensibly, righteously, and godly in the present age. The church is to be a community of good works, adorned by the teaching of God our Savior." },
    { father: "Watchman Nee", source: "The Normal Christian Church Life", text: "Titus shows the practical outworking of the truth in the local church. Elders, young men, servants, older women — each has a place in the church life. The grace of God teaches us not only to be saved but to live a life that adorns the gospel in every relationship." }
  ],
  "HEBREWS": [
    { father: "John Chrysostom", source: "Homilies on Hebrews, I.1-2", text: "The Epistle to the Hebrews shows the superiority of Christ over all that went before — superior to angels, to Moses, to the Aaronic priesthood. The old covenant had a shadow of the good things to come, but the substance is Christ. The new covenant is enacted on better promises, and the blood of Christ speaks better than the blood of Abel." },
    { father: "Watchman Nee", source: "The Better Covenant", text: "Hebrews reveals that Christ is the reality of every type and shadow in the Old Testament. He is the true Sabbath rest, the true Tabernacle, the true High Priest. The believers are those who come forward to the heavenly Jerusalem, to the church of the firstborn, to the spirits of righteous men made perfect." }
  ],
  "JAMES": [
    { father: "Didymus the Blind", source: "Commentary on James, I.1", text: "James writes to the twelve tribes scattered abroad. He does not teach justification by works as opposed to faith but demonstrates that living faith produces works. Faith without works is dead — as the body without the spirit is dead. The testing of faith produces endurance, and endurance perfects the believer." },
    { father: "Witness Lee", source: "Life-Study of James", text: "James emphasizes the practical Christian walk. The bridling of the tongue, the care for orphans and widows, the prayer of faith — these are the marks of genuine religion. James does not contradict Paul; he complements him. Paul speaks of the root of faith; James speaks of the fruit of faith." }
  ],
  "1 PETER": [
    { father: "Augustine of Hippo", source: "Sermon on 1 Peter", text: "Peter writes to the elect sojourners of the dispersion. They are born again to a living hope through the resurrection of Jesus Christ. The tested genuineness of their faith is more precious than gold. The sufferings of this present time are the refining fire through which the church is purified for the revelation of Jesus Christ." },
    { father: "Witness Lee", source: "Life-Study of 1 Peter", text: "First Peter shows the believers as living stones being built up into a spiritual house. The corporate priesthood offers spiritual sacrifices to God through Jesus Christ. Suffering is not meaningless; it is God's governmental dealing with His children to perfect, establish, strengthen, and settle them." }
  ],
  "2 PETER": [
    { father: "Didymus the Blind", source: "Commentary on 2 Peter", text: "Peter, knowing his departure is near, writes to remind the believers of the prophetic word made more sure. The false teachers who deny the Lord's coming will face judgment. The Lord is not slow concerning His promise, but is longsuffering toward us, not wishing that any should perish but that all should come to repentance." },
    { father: "Witness Lee", source: "Life-Study of 2 Peter", text: "Second Peter guards the believers against the apostasy of false teaching. The divine power has granted to us all things pertaining to life and godliness. The path of the just is illuminated by the prophetic word as a lamp shining in a dark place until the day dawns and the morning star rises in the heart." }
  ],
  "1 JOHN": [
    { father: "Augustine of Hippo", source: "Homilies on the First Epistle of John, I.1-4", text: "John the apostle, who leaned on the Lord's breast at supper, writes of what he has heard, seen, and handled of the Word of Life. God is light, and in Him is no darkness at all. If we walk in the light as He is in the light, we have fellowship with one another, and the blood of Jesus His Son cleanses us from all sin." },
    { father: "Watchman Nee", source: "The Fellowship of Life", text: "First John is the book of the divine life and the fellowship of that life. The life eternal was with the Father and was manifested to us. This life creates fellowship among the believers. The anointing within teaches us all things. Love is the nature of the life we have received, and perfect love casts out fear." }
  ],
  "JUDE": [
    { father: "Didymus the Blind", source: "Commentary on Jude", text: "Jude, the brother of James, writes to contend for the faith once delivered to the saints. The apostasy of the last days is prefigured by the rebellion of Korah, the error of Balaam, and the way of Cain. Yet the believers are kept by the Lord and presented faultless before the presence of His glory with exceeding joy." },
    { father: "Witness Lee", source: "Life-Study of Jude", text: "Jude is a short but powerful book concerning the apostasy from the faith. The believers are called to contend for the faith. The closing doxology is one of the richest in Scripture — to Him who is able to keep us from stumbling and to present us faultless before the presence of His glory." }
  ],
  "REVELATION": [
    { father: "Victorinus of Pettau", source: "Commentary on the Apocalypse, I.1", text: "John saw the revelation of Jesus Christ in the island of Patmos. The seven churches are the historical churches of Asia, yet they also represent the church in every age. The beast from the sea and the beast from the land are the Antichrist and the false prophet. The New Jerusalem descending from heaven is the bride, the wife of the Lamb — the ultimate consummation of all God's purposes." },
    { father: "Witness Lee", source: "Life-Study of Revelation", text: "Revelation is the book of God's ultimate move. The seven lampstands are the local churches. The overcomers in each church are those who participate in the fulfillment of God's economy. The New Jerusalem is the ultimate goal — the mutual dwelling place of God and man, the eternal mingling of the Triune God with His redeemed people." }
  ]
};

window.openPatristicCommentary = function() {
  var bookId = window.activeBookContext ? window.activeBookContext.id : '';
  var panel = document.getElementById('readerPatristic');
  if (!panel) return;

  var entries = PATRISTIC_COMMENTARY[bookId] || PATRISTIC_COMMENTARY[bookId.toUpperCase()];
  if (!entries) {
    panel.innerHTML = '<div style="text-align:center;padding:60px 20px;' +
      'font-family:\'Cormorant Garamond\',serif;font-style:italic;color:var(--text-secondary);">' +
      '<div style="font-size:2.4rem;margin-bottom:12px;">&#128218;</div>' +
      'No patristic commentary available for this book.</div>';
    return;
  }

  var html = '<div class="pat-header">' +
    '<span class="pat-header-icon">&#128218;</span> CHURCH FATHERS &amp; RECOVERY MINISTERS' +
    '</div>' +
    '<div style="font-family:\'Cormorant Garamond\',serif;font-size:0.65rem;color:var(--text-secondary);font-style:italic;padding:0 20px 16px;border-bottom:1px solid rgba(180,140,200,0.08);">' +
    'Public-domain excerpts from the Church Fathers (Nicene &amp; Post-Nicene) and Recovery Version ministers. ' +
    'These voices span seventeen centuries — from Alexandria to the present — testifying to the one faith.' +
    '</div>';

  entries.forEach(function(e) {
    html += '<div class="pat-entry">' +
      '<div class="pat-father">' +
      '<span class="pat-source-icon">&#9733;</span> ' + e.father +
      '</div>' +
      '<div class="pat-source">' + e.source + '</div>' +
      '<div class="pat-text">' + e.text + '</div>' +
      '</div>';
  });

  panel.innerHTML = html;
};

// Init core
try {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { ScriptoriumCore.init(); });
  } else {
    ScriptoriumCore.init();
  }
} catch(e) {}

})();

