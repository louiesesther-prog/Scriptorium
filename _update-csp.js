const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const newCSP = "default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com unpkg.com cdn.jsdelivr.net; font-src 'self' fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' unpkg.com cdn.jsdelivr.net; img-src 'self' data: *.tile.openstreetmap.org *.basemaps.cartocdn.com upload.wikimedia.org; connect-src 'self' *.tile.openstreetmap.org *.basemaps.cartocdn.com bible-api.com";
let count = 0;
files.forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  if (html.indexOf('Content-Security-Policy') !== -1) {
    html = html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]+">/, '<meta http-equiv="Content-Security-Policy" content="' + newCSP + '">');
    fs.writeFileSync(f, html, 'utf8');
    count++;
    console.log('OK ' + f);
  }
});
console.log('Fixed CSP in ' + count + ' files');
