const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const handler = require('../api/portfolio');
const root = path.resolve(__dirname, '..');
const env = path.join(root, '.env.local');
if (fs.existsSync(env)) process.loadEnvFile(env);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.otf': 'font/otf', '.mp4': 'video/mp4' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/portfolio') {
    req.query = Object.fromEntries(url.searchParams);
    res.status = code => { res.statusCode = code; return res; };
    res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };
    return handler(req, res);
  }
  // Serve only the public page and assets, never secrets or server source.
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if ((file !== path.join(root, 'index.html') && !file.startsWith(path.join(root, 'assets') + path.sep)) || !['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(404).end(); return;
  }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}).listen(3000, '127.0.0.1', () => console.log('Local preview: http://127.0.0.1:3000'));
