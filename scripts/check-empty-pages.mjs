// Post-build gate: no route in the sitemap may be a placeholder. Fails any
// page whose own body text (nav, header and footer excluded) is under
// MIN_CHARS characters.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { startServer, fetchText } from './lib/serve.mjs';

const MIN_CHARS = 400;
const BUILT_SITEMAP = path.resolve(import.meta.dirname, '..', '.next', 'server', 'app', 'sitemap.xml.body');

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'" };

function bodyText(html) {
  const main = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return main
    .replace(/<(script|style|noscript|template|svg|header|nav|footer)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&([a-z]+|#\d+|#x[0-9a-f]+);/gi, (m, e) => ENTITIES[e.toLowerCase()] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const { baseUrl, stop } = await startServer();
  const results = [];
  try {
    const sitemap = existsSync(BUILT_SITEMAP) ? readFileSync(BUILT_SITEMAP, 'utf8') : await fetchText(`${baseUrl}/sitemap.xml`);
    const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    if (!routes.length) throw new Error('Sitemap has no <loc> entries');

    for (const route of routes) {
      const html = await fetchText(baseUrl + route);
      results.push({ route, length: bodyText(html).length });
    }
  } finally {
    stop();
  }

  const failing = results.filter((r) => r.length < MIN_CHARS);
  for (const { route, length } of results.sort((a, b) => a.length - b.length)) {
    console.log(`${length < MIN_CHARS ? 'FAIL' : 'ok  '}  ${String(length).padStart(6)}  ${route}`);
  }
  if (failing.length) {
    console.error(`check-empty-pages: ${failing.length} route(s) under ${MIN_CHARS} characters of body text`);
    process.exit(1);
  }
  console.log(`check-empty-pages: OK (${results.length} routes, all at or above ${MIN_CHARS} characters)`);
}

main().catch((err) => {
  console.error('check-empty-pages:', err.message);
  process.exit(1);
});
