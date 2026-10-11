/** Server pengembangan lokal, hanya melayani isi folder src/. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const akar = resolve('src');
const mime = { '.html': 'text/html', '.css': 'text/css', '.mjs': 'text/javascript',
  '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const nama = decodeURIComponent(pathname === '/' ? '/index.html' : pathname);
    const berkas = resolve(akar, '.' + nama);
    if (!(berkas.startsWith(akar + sep))) {
      res.writeHead(403).end('Akses ditolak'); return;
    }
    const dataFile = await stat(berkas);
    if (!dataFile.isFile()) { res.writeHead(404).end('File tidak ditemukan'); return; }
    const data = await readFile(berkas);
    res.writeHead(200, {'Content-Type': (mime[extname(berkas)] ?? 'application/octet-stream') +
      (['.html','.css','.js','.mjs'].includes(extname(berkas)) ? '; charset=utf-8' : '')});
    res.end(data);
  } catch { res.writeHead(404).end('Halaman tidak ditemukan'); }
});
server.listen(3000, '127.0.0.1', () => console.log('SOLARIS siap: http://localhost:3000'));
