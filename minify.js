const fs = require('fs');
const path = require('path');

const CSS_FILES = [
  'assets/css/shared.css',
  'assets/css/gallery.css',
  'assets/fonts/fonts.css'
];

const JS_FILES = [
  'assets/js/sidebar.js',
  'assets/js/scriptorium-core.js',
  'assets/js/canon-data.js',
  'assets/js/map-data.js',
  'assets/audio/scriptorium-audio.js'
];

function minifyCSS(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>~+!])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\n{2,}/g, '\n')
    .replace(/^\s+|\s+$/gm, '')
    .replace(/\n/g, '')
    .trim();
}

function minifyJS(code) {
  const lines = code.split('\n');
  const out = [];
  let inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (inBlockComment) {
      if (line.includes('*/')) {
        inBlockComment = false;
        line = line.substring(line.indexOf('*/') + 2);
      } else {
        continue;
      }
    }

    if (!inBlockComment) {
      let idx = line.indexOf('/*');
      while (idx !== -1) {
        const end = line.indexOf('*/', idx + 2);
        if (end !== -1) {
          line = line.substring(0, idx) + line.substring(end + 2);
          idx = line.indexOf('/*');
        } else {
          line = line.substring(0, idx);
          inBlockComment = true;
          break;
        }
      }
    }

    if (!inBlockComment) {
      const lcIdx = line.indexOf('//');
      if (lcIdx !== -1) {
        line = line.substring(0, lcIdx);
      }
    }

    const trimmed = line.trim();
    if (trimmed) out.push(trimmed);
  }

  return out.join('\n');
}

function bytes(str) {
  return Buffer.byteLength(str, 'utf8');
}

console.log('\n═══ MINIFYING ASSETS ═══\n');

CSS_FILES.forEach(f => {
  if (!fs.existsSync(f)) { console.log('  ? ' + f + ' (not found)'); return; }
  const code = fs.readFileSync(f, 'utf8');
  const min = minifyCSS(code);
  const saved = bytes(code) - bytes(min);
  fs.writeFileSync(f, min, 'utf8');
  console.log('  ✓ ' + f + '  (' + (bytes(code) / 1024).toFixed(1) + 'K → ' + (bytes(min) / 1024).toFixed(1) + 'K, saved ' + (saved / 1024).toFixed(1) + 'K)');
});

JS_FILES.forEach(f => {
  if (!fs.existsSync(f)) { console.log('  ? ' + f + ' (not found)'); return; }
  const code = fs.readFileSync(f, 'utf8');
  const min = minifyJS(code);
  const saved = bytes(code) - bytes(min);
  fs.writeFileSync(f, min, 'utf8');
  console.log('  ✓ ' + f + '  (' + (bytes(code) / 1024).toFixed(1) + 'K → ' + (bytes(min) / 1024).toFixed(1) + 'K, saved ' + (saved / 1024).toFixed(1) + 'K)');
});

console.log('\nDone.');
