(function(){'use strict';
var API = window.SCRIPTORIUM_API || '/api';
var TOKEN_KEY = 'scriptorium_token';
var USER_KEY = 'scriptorium_user';
var SESSION_KEY = 'scriptorium_session';

function getToken(){try{return localStorage.getItem(TOKEN_KEY)||null}catch(e){return null}}
function setToken(t){try{if(t)localStorage.setItem(TOKEN_KEY,t);else localStorage.removeItem(TOKEN_KEY)}catch(e){}}

function api(path,opts){
  opts=opts||{};
  return fetch(API+path,{
    method:opts.method||'GET',
    headers:Object.assign({'Content-Type':'application/json'},opts.headers||{}),
    body:opts.body?JSON.stringify(opts.body):undefined
  }).then(function(r){
    if(!r.ok)return r.json().then(function(e){throw e}).catch(function(e){if(e&&e.error)throw e;throw{error:r.statusText}});
    return r.json();
  });
}

function authedApi(path,opts){
  opts=opts||{};
  opts.headers=opts.headers||{};
  var t=getToken();
  if(t)opts.headers['Authorization']='Bearer '+t;
  return api(path,opts);
}

window.Scriptorium={
  logout:function(shouldRedirect){
    setToken(null);
    try{localStorage.removeItem(SESSION_KEY);localStorage.removeItem(TOKEN_KEY);localStorage.removeItem('scriptorium_user');localStorage.removeItem('scriptorium_v3');localStorage.removeItem('scribeData_v2');localStorage.removeItem('scribeData');localStorage.removeItem('activeScribe');localStorage.removeItem('scribe_seal');sessionStorage.removeItem(TOKEN_KEY);sessionStorage.removeItem(SESSION_KEY)}catch(e){}
    if(shouldRedirect)window.location.href='login.html';
  },
  requireAuth:function(){
    var t=getToken();if(t)return true;
    var u=window.__getUnifiedUser?window.__getUnifiedUser():null;
    if(u&&localStorage.getItem(SESSION_KEY))return true;
    window.location.href='login.html';
    return false;
  },
  getToken:getToken,
  isLoggedIn:function(){return !!getToken()}
};

window.ScriptoriumValidator={
  getActiveScribe:function(){
    var t=getToken();if(!t)return null;
    var payload;try{payload=JSON.parse(atob(t.split('.')[1]))}catch(e){return null}
    return payload;
  }
};

// ScriptoriumAPI — only define if api.js hasn't already loaded
if (!window.ScriptoriumAPI) {
  window.ScriptoriumAPI={
    register:function(data){return api('/auth/register',{method:'POST',body:data})},
    login:function(userId,password){return api('/auth/login',{method:'POST',body:{userId:userId,password:password}})},
    logout:function(){return authedApi('/auth/logout',{method:'POST'})},
    me:function(){return authedApi('/auth/me')},
    forgotPassword:function(email){return api('/auth/forgot-password',{method:'POST',body:{email:email}})},
    resetPassword:function(resetToken,newPassword){return api('/auth/reset-password',{method:'POST',body:{resetToken:resetToken,newPassword:newPassword}})}
  };
}

// Early stubs for data consolidation — overwritten by core.js when loaded
window.__getUnifiedUser = window.__getUnifiedUser || function() {
  try {
    var v3 = JSON.parse(localStorage.getItem('scriptorium_v3'));
    if (v3 && v3._v === 3) return v3;
  } catch(e) {}
  try {
    var v2 = JSON.parse(localStorage.getItem('scribeData_v2'));
    if (v2 && v2._v === 2) { try { v2._v = 3; localStorage.setItem('scriptorium_v3', JSON.stringify(v2)); } catch(e) {} return v2; }
  } catch(e) {}
  // Fallback to legacy keys
  try {
    var user = JSON.parse(localStorage.getItem('scriptorium_user'));
    var scribe = JSON.parse(localStorage.getItem('scribeData'));
    if (user || scribe) {
      return {
        _v: 2, profile: { userId: (user && user.userId) || '', name: (user && user.name) || (scribe && scribe.name) || '' },
        progress: { totalCharacters: (scribe && scribe.totalCharacters) || (user && user.totalCharacters) || 0, dailyChars: (scribe && scribe.dailyChars) || 0, dailyDate: (scribe && scribe.dailyDate) || '', versesCompleted: (scribe && scribe.versesCompleted) || 0, ntVerses: (scribe && scribe.ntVerses) || 0 },
        rank: { title: (scribe && scribe.rank) || (user && user.rank) || 'INITIATE', knowledgeLevel: (user && user.knowledgeLevel) || '1', lastActive: (user && user.lastActive) || 0 },
        streak: { current: (scribe && scribe.streak) || (user && user.streak) || 0, lastVisit: (scribe && scribe.lastVisit) || '' },
        seal: { epigraphy: 0, astronomy: 0, prophecy: 0, restoration: 0 }, meta: { migratedAt: 0 }
      };
    }
  } catch(e) {}
  return null;
};
window.__setUnifiedUser = window.__setUnifiedUser || function(data) {
  if (!data) return;
  try {
    data._v = 3;
    localStorage.setItem('scriptorium_v3', JSON.stringify(data));
    try{localStorage.removeItem('scribeData_v2');localStorage.removeItem('scribeData');localStorage.removeItem('scriptorium_user');localStorage.removeItem('activeScribe');localStorage.removeItem('scribe_seal')}catch(e){}
  } catch(e) {}
};

// If we have a token but no session marker, add one
if(getToken()&&!localStorage.getItem(SESSION_KEY)){
  try{localStorage.setItem(SESSION_KEY,Date.now().toString())}catch(e){}
}
})();
