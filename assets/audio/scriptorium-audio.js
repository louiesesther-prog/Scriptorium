(function() {
  'use strict';
  var ScriptoriumAudio = {
    currentMode: 'ot',
    audioCtx: null,
    otAmbient: null,
    ntAmbient: null,
    init: function() {
      try {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch(e) { console.warn('[Audio] Web Audio API not available'); }
    },
    transitionTo: function(mode) {
      this.currentMode = mode;
      document.documentElement.setAttribute('data-theme', mode === 'nt' ? 'nt' : '');
    },
    playTransition: function() {
      if (!this.audioCtx) this.init();
      if (this.audioCtx && this.audioCtx.state === 'suspended') this.audioCtx.resume();
    },
    playQuillScratch: function() {
      try {
        var a = new Audio('assets/audio/quill_scratch.mp3');
        a.volume = 0.3;
        a.play().catch(function() {});
      } catch(e) {}
    }
  };
  window.ScriptoriumAudio = ScriptoriumAudio;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { ScriptoriumAudio.init(); });
  } else {
    ScriptoriumAudio.init();
  }
})();
