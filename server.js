import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8080);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

const allowedRootFiles = new Set(['index.html', 'index.md', 'robots.txt', 'sitemap.xml']);
const allowedTopLevelDirs = new Set(['_archive-content', 'alternatives', 'assets', 'portfolio']);
const immutableExtensions = new Set(['.css', '.gif', '.jpeg', '.jpg', '.js', '.png', '.svg', '.webp']);
const homepageLink = '</portfolio>; rel="describedby"; type="text/html", </index.md>; rel="alternate"; type="text/markdown"';
const contentSignal = 'ai-train=no, search=yes, ai-input=yes';

function securityHeaders() {
  return {
    'Content-Signal': contentSignal,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
  };
}

function acceptsMarkdown(request) {
  return String(request.headers.accept || '')
    .split(',')
    .some((value) => {
      const [type, ...parameters] = value.trim().split(';');
      const q = parameters
        .map((parameter) => parameter.trim().toLowerCase())
        .find((parameter) => parameter.startsWith('q='));

      return type.toLowerCase() === 'text/markdown' && q !== 'q=0' && q !== 'q=0.0';
    });
}

function estimateTokens(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return String(Math.max(1, Math.ceil(words * 1.33)));
}

function cacheControl(filePath) {
  return immutableExtensions.has(path.extname(filePath).toLowerCase())
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';
}

function isPublicPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return true;
  }

  if (segments.some((segment) => segment.startsWith('.') || segment === 'node_modules')) {
    return false;
  }

  if (segments.length === 1) {
    return allowedRootFiles.has(segments[0]);
  }

  return allowedTopLevelDirs.has(segments[0]);
}

function resolvePublicFile(pathname) {
  if (!isPublicPath(pathname)) {
    return null;
  }

  const requestPath = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const filePath = path.resolve(root, `.${requestPath}`);

  return filePath.startsWith(`${root}${path.sep}`) ? filePath : null;
}

async function sendFile(request, response, filePath, extraHeaders = {}) {
  const body = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const headers = {
    ...securityHeaders(),
    'Cache-Control': cacheControl(filePath),
    'Content-Length': String(body.byteLength),
    'Content-Type': mimeTypes.get(extension) || 'application/octet-stream',
    ...extraHeaders,
  };

  if (extension === '.md') {
    headers['X-Markdown-Tokens'] = estimateTokens(body.toString('utf8'));
  }

  response.writeHead(200, headers);

  if (request.method !== 'HEAD') {
    response.end(body);
    return;
  }

  response.end();
}

async function sendNegotiated(request, response, htmlPath, markdownPath, extraHeaders = {}) {
  if (acceptsMarkdown(request)) {
    await sendFile(request, response, markdownPath, {
      Vary: 'Accept',
      ...extraHeaders,
    });
    return;
  }

  await sendFile(request, response, htmlPath, {
    Vary: 'Accept',
    ...extraHeaders,
  });
}

function sendText(request, response, statusCode, text, extraHeaders = {}) {
  const body = Buffer.from(text);

  response.writeHead(statusCode, {
    ...securityHeaders(),
    'Cache-Control': 'no-cache',
    'Content-Length': String(body.byteLength),
    'Content-Type': 'text/plain; charset=utf-8',
    ...extraHeaders,
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  response.end(body);
}

function sendRedirect(request, response, location) {
  response.writeHead(301, {
    ...securityHeaders(),
    'Cache-Control': 'no-cache',
    'Content-Length': '0',
    Location: location,
  });

  response.end();
}

async function handleRequest(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendText(request, response, 405, 'Method not allowed\n', { Allow: 'GET, HEAD' });
    return;
  }

  const { pathname } = new URL(request.url, 'https://brewerlogic.com');

  if (pathname === '/' || pathname === '/index.html') {
    await sendNegotiated(
      request,
      response,
      path.join(root, 'index.html'),
      path.join(root, 'index.md'),
      { Link: homepageLink },
    );
    return;
  }

  if (pathname === '/portfolio/' || pathname === '/portfolio/index.html' || pathname === '/docs/portfolio.html') {
    sendRedirect(request, response, '/portfolio');
    return;
  }

  if (pathname === '/portfolio') {
    await sendNegotiated(
      request,
      response,
      path.join(root, 'portfolio/index.html'),
      path.join(root, 'portfolio/index.md'),
    );
    return;
  }

  const filePath = resolvePublicFile(pathname);

  if (!filePath) {
    sendText(request, response, 404, 'Not found\n');
    return;
  }

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      sendText(request, response, 404, 'Not found\n');
      return;
    }

    await sendFile(request, response, filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sendText(request, response, 404, 'Not found\n');
      return;
    }

    throw error;
  }
}

const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    sendText(request, response, 500, 'Internal server error\n');
  });
});

server.listen(port, () => {
  console.log(`brewerlogic.com listening on ${port}`);
});
