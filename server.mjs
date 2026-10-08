import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function safePath(urlPath) {
  const pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  const clean = normalize(pathname).replace(/^([.][.][/\\])+/, '');
  if (clean === '/manus-routes.json') return join(root, 'public', 'manus-routes.json');
  return join(root, clean === '/' ? 'index.html' : clean.replace(/^[/\\]/, ''));
}

const server = createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, app: 'roleforge' }));
    return;
  }

  let file = safePath(req.url);
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, 'index.html');
    const content = await readFile(file);
    res.writeHead(200, {
      'content-type': mime[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-cache',
    });
    res.end(content);
  } catch {
    const fallback = await readFile(join(root, 'index.html'));
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' });
    res.end(fallback);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`RoleForge listening on http://0.0.0.0:${port}`);
});
