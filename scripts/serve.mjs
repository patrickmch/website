/**
 * Production static server for dist/ with explicit cache headers.
 *
 * Why not the host's default static serving: it sent no Cache-Control at all,
 * so browsers used heuristic freshness and could show a returning visitor the
 * previous index.html (and its vanished asset hashes) for days after a deploy.
 *
 * - index.html (and any .html): Cache-Control: no-cache, so every visit
 *   revalidates and a new deploy is picked up at once.
 * - /assets/*: hashed by Vite, so public, max-age=31536000, immutable.
 * - everything else (images, favicon, og.png): public, max-age=3600.
 * - unknown extensionless paths serve index.html (the app routes them);
 *   a missing file with an extension is a real 404, never HTML.
 * - gzip for text types, ETag + Last-Modified, HEAD, directory index.html.
 *
 * Usage: PORT=3000 node scripts/serve.mjs   (npm start)
 */
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { createGzip } from 'node:zlib';
import { extname, join, normalize, resolve, sep } from 'node:path';

const ROOT = resolve(process.env.STATIC_ROOT || 'dist');
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.vtt': 'text/vtt; charset=utf-8',
};
const compressible = /^(text\/|application\/(json|xml|manifest\+json)|image\/svg\+xml)/;

function fileInfo(path) {
  try {
    const stat = statSync(path);
    return stat.isFile() ? stat : null;
  } catch {
    return null;
  }
}

/** Resolves a URL path to a file under ROOT, or null. Directories resolve to their index.html. */
function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const clean = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '');
  const full = resolve(ROOT, '.' + sep + clean);
  if (full !== ROOT && !full.startsWith(ROOT + sep)) return null;
  const direct = fileInfo(full);
  if (direct) return { path: full, stat: direct };
  const index = join(full, 'index.html');
  const indexStat = fileInfo(index);
  if (indexStat) return { path: index, stat: indexStat };
  return null;
}

function cacheControl(path) {
  if (path.endsWith('.html')) return 'no-cache';
  if (path.startsWith(join(ROOT, 'assets') + sep)) return 'public, max-age=31536000, immutable';
  return 'public, max-age=3600';
}

function send(req, res, file) {
  const { path, stat } = file;
  const type = types[extname(path).toLowerCase()] || 'application/octet-stream';
  const etag = `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
  const headers = {
    'Content-Type': type,
    'Cache-Control': cacheControl(path),
    ETag: etag,
    'Last-Modified': stat.mtime.toUTCString(),
    'X-Content-Type-Options': 'nosniff',
    Vary: 'Accept-Encoding',
  };
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers);
    res.end();
    return;
  }
  const gzip = compressible.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (gzip) headers['Content-Encoding'] = 'gzip';
  else headers['Content-Length'] = stat.size;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  const stream = createReadStream(path);
  stream.on('error', () => res.destroy());
  if (gzip) stream.pipe(createGzip()).pipe(res);
  else stream.pipe(res);
}

const indexFile = () => resolveFile('/index.html');

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method not allowed');
    return;
  }
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  const file = resolveFile(urlPath);
  if (file) {
    send(req, res, file);
    return;
  }
  // A path with a file extension that does not exist is a real 404; anything else is an app route.
  if (extname(urlPath) && !urlPath.endsWith('/')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end('Not found');
    return;
  }
  const index = indexFile();
  if (!index) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('dist/index.html is missing');
    return;
  }
  send(req, res, index);
});

server.listen(PORT, HOST, () => {
  console.log(`serving ${ROOT} on http://${HOST}:${PORT}`);
});
