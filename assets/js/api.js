(function(){'use strict';
var API = window.SCRIPTORIUM_API || '/api';

function _api(path,opts){
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

function _authed(path,opts){
  opts=opts||{};
  opts.headers=opts.headers||{};
  var t=null;
  try{t=localStorage.getItem('scriptorium_token')||null}catch(e){}
  if(!t&&window.Scriptorium&&window.Scriptorium.getToken)t=window.Scriptorium.getToken();
  if(t)opts.headers['Authorization']='Bearer '+t;
  return _api(path,opts);
}

window.ScriptoriumAPI={
  register:function(data){return _api('/auth/register',{method:'POST',body:data})},
  login:function(userId,password){return _api('/auth/login',{method:'POST',body:{userId:userId,password:password}})},
  logout:function(){return _authed('/auth/logout',{method:'POST'})},
  me:function(){return _authed('/auth/me')},
  forgotPassword:function(email){return _api('/auth/forgot-password',{method:'POST',body:{email:email}})},
  resetPassword:function(token,pwd){return _api('/auth/reset-password',{method:'POST',body:{resetToken:token,newPassword:pwd}})}
};
})();
