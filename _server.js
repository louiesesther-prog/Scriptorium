var http = require('http');
var fs = require('fs');
var path = require('path');
var root = __dirname;
var mime = {
  '.html':'text/html','.js':'application/javascript','.css':'text/css',
  '.json':'application/json','.svg':'image/svg+xml','.png':'image/png',
  '.jpg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2',
  '.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg','.pdf':'application/pdf'
};
http.createServer(function(q, r) {
  var u = q.url.split('?')[0];
  if (u === '/') u = '/scriptorium.html';
  var f = path.join(root, u);
  if (f.indexOf(root) !== 0) { r.writeHead(403); r.end(); return; }
  fs.stat(f, function(e, s) {
    if (e) { r.writeHead(404); r.end(); return; }
    var x = path.extname(f);
    r.writeHead(200, {'Content-Type': mime[x] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*'});
    fs.createReadStream(f).pipe(r);
  });
}).listen(process.argv[2] || 8080, function() { console.log('Server running on http://localhost:' + (process.argv[2] || 8080)); });
