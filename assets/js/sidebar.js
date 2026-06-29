(function() {
'use strict';
(function migrate() {
var USER_KEY = 'scriptorium_user';
if (localStorage.getItem(USER_KEY)) return;
var a, s, v2;
try { v2 = window.__getUnifiedUser ? window.__getUnifiedUser() : null; } catch(e) {}
try { a = JSON.parse(localStorage.getItem('activeScribe')); } catch(e) {}
try { s = window.__getUnifiedUser ? window.__getUnifiedUser() : null; } catch(e) {}
if (!v2 && !a && !s) return;
var name = (v2 && v2.profile.name) || (a && a.name) || (s && s.name) || '';
var gender = (v2 && v2.profile.gender) || (a && a.gender) || 'male';
var rank = (v2 && v2.rank.title) || (s && s.rank) || 'INITIATE';
var totalChars = (v2 && v2.progress.totalCharacters) || (s && s.totalCharacters) || 0;
var dChars = (v2 && v2.progress.dailyChars) || (s && s.dailyChars) || 0;
var dDate = (v2 && v2.progress.dailyDate) || (s && s.dailyDate) || '';
var streak = (v2 && v2.streak.current) || (s && s.streak) || 0;
var kLvl = (v2 && v2.rank.knowledgeLevel) || (a && a.knowledge) || '1';
var uid = (v2 && v2.profile.userId) || (a && a.userId) || '';
var vComp = (v2 && v2.progress.versesCompleted) || (s && s.versesCompleted) || 0;
var ntV = (v2 && v2.progress.ntVerses) || (s && s.ntVerses) || 0;
localStorage.setItem(USER_KEY, JSON.stringify({
_v: 1, name: name, gender: gender, rank: rank,
totalCharacters: totalChars, dailyChars: dChars, dailyDate: dDate,
streak: streak, knowledgeLevel: kLvl, userId: uid,
lastActive: Date.now(), versesCompleted: vComp, ntVerses: ntV
}));
})();
var SIDEBAR_HTML =
'<aside class="museum-sidebar" id="sidebar">' +
'<div class="sidebar-logo">' +
'<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
'<path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="rgba(212,175,55,0.4)" stroke-width="0.5"/>' +
'<path d="M12 2L3 7H21L12 2Z" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.3)" stroke-width="0.5"/>' +
'<path d="M3 7V17L12 22V7" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" stroke-width="0.5"/>' +
'<path d="M21 7V17L12 22V7" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.25)" stroke-width="0.5"/>' +
'<line x1="12" y1="7" x2="12" y2="22" stroke="rgba(212,175,55,0.15)" stroke-width="0.3"/>' +
'<line x1="3" y1="12" x2="21" y2="12" stroke="rgba(212,175,55,0.1)" stroke-width="0.3"/>' +
'</svg>' +
'</div>' +
'<nav class="sidebar-nav" id="sidebarNav">' +
'<a href="#" class="nav-link" title="SEARCH SCRIPTURES" onclick="if(window.openBibleSearch){window.openBibleSearch()}return false;">&#128269;</a>' +
'<div class="nav-divider"></div>' +
'<a href="scriptorium.html" class="nav-link" title="THE THRESHOLD">&#8984;</a>' +
'<a href="scriptorium.html" class="nav-link" title="MUSEUM"><span style="font-size:12px;letter-spacing:2px">MU</span></a>' +
'<a href="covenant-map.html" class="nav-link" title="COVENANT MAP">&#128506;</a>' +
'<a href="MAP.html" class="nav-link" title="BIBLICAL NAVIGATOR">&#129517;</a>' +
'<div class="nav-divider"></div>' +
'<a href="genealogy.html" class="nav-link" title="GENEALOGY">&#9812;</a>' +
'<a href="tabernacle.html" class="nav-link" title="TABERNACLE">&#127963;</a>' +
'<a href="typology.html" class="nav-link" title="TYPOLOGY">&#10013;</a>' +
'<a href="onomasticon.html" class="nav-link" title="ONOMASTICON">&#128209;</a>' +
'<a href="ethiopian-canon.html" class="nav-link" title="TEWAHEDO ARCHIVE">&#9766;</a>' +
'<a href="placeholder.html?section=prophetic-mesh" class="nav-link" title="PROPHETIC MESH">&#9733;</a>' +
'<a href="placeholder.html?section=sanctum-3d" class="nav-link" title="3D SANCTUM">&#128750;</a>' +
'<a href="scribes-chamber.html" class="nav-link" title="SCRIBES CHAMBER">&#128218;</a>' +
'<a href="plans.html" class="nav-link" title="READING PLANS">&#128214;</a>' +
'<a href="challenges.html" class="nav-link" title="MONTHLY CHALLENGES">&#128197;</a>' +
'<a href="comparison-mode.html" class="nav-link" title="COMPARISON MODE">&#128100;</a>' +
'<div class="nav-divider"></div>' +
'<a href="settings.html" class="nav-link" title="RESTORATION ROOM">&#9881;</a>' +
'<a href="login.html" class="nav-link" id="loginNavLink" title="SIGN IN">&#128273;</a>' +
'<div class="nav-divider"></div>' +
'<a href="#" class="nav-link" id="signOutBtn" title="SIGN OUT" style="display:none;">&#128682;</a>' +
'<a href="#" class="nav-link" id="typologyToggleBtn" title="TYPOLOGY" style="display:none;">&#10018;</a>' +
'</nav>' +
'</aside>';
function markActiveLink() {
var page = location.pathname.split('/').pop() || 'scriptorium.html';
var links = document.querySelectorAll('#sidebarContainer .nav-link[href]');
for (var i = 0; i < links.length; i++) {
var href = links[i].getAttribute('href');
if (href === page) { links[i].classList.add('active'); break; }
}
}
function injectSidebar() {
var container = document.getElementById('sidebarContainer');
if (!container) return;
container.innerHTML = SIDEBAR_HTML;
markActiveLink();
wireAuthState();
wireTypology();
}
function wireAuthState() {
	var token = null;
	try { token = Scriptorium.getToken(); } catch(e) {}
	var loginLink = document.getElementById('loginNavLink');
	var signOutBtn = document.getElementById('signOutBtn');
	if (!loginLink) return;
	if (token) {
		loginLink.style.display = 'none';
		if (signOutBtn) {
			signOutBtn.style.display = '';
			signOutBtn.addEventListener('click', function(e) {
				e.preventDefault();
				if (window.Scriptorium && window.Scriptorium.logout) {
					window.Scriptorium.logout(true);
				} else {
					try { localStorage.removeItem('scriptorium_token'); localStorage.removeItem('scriptorium_session'); localStorage.removeItem('scriptorium_v3'); localStorage.removeItem('scriptorium_user'); localStorage.removeItem('scribeData_v2'); localStorage.removeItem('scribeData'); localStorage.removeItem('activeScribe'); localStorage.removeItem('scribe_seal'); sessionStorage.removeItem('scriptorium_token'); sessionStorage.removeItem('scriptorium_session'); } catch(ex) {}
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
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js').then(function(reg) {
if (reg.active) console.log('[SW] Scriptorium ready for offline use.');
}).catch(function() {});
}
})();