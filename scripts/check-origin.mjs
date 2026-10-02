// Post-build gate: every absolute URL served on key routes must point at our
// origin or a known third party. Catches a wrong metadataBase, sitemap or
// robots origin (the thursdai.com regression) before it ships.
import { startServer, fetchText } from './lib/serve.mjs';

const ROUTES = ['/', '/product', '/trust', '/developers', '/sitemap.xml', '/robots.txt'];

const OWN_HOST = 'getthursdai.com';

const THIRD_PARTY = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'vercel.com',
  'clarity.ms',
  'posthog.com',
  'hubspot.com',
  'linkedin.com',
  'github.com',
  'x.com',
  // Primary legal sources cited on the page (the EU AI Act on EUR-Lex).
  'eur-lex.europa.eu',
];

// Identifiers rather than links: JSON-LD @context and SVG/XML namespaces.
const NAMESPACES = ['schema.org', 'www.w3.org', 'www.sitemaps.org'];

const ALLOWED = [OWN_HOST, ...THIRD_PARTY, ...NAMESPACES];

const isAllowed = (host) => ALLOWED.some((d) => host === d || host.endsWith(`.${d}`));

// Stops at quotes, whitespace, angle brackets and backslashes so URLs inside
// escaped RSC/JSON payloads are cut cleanly.
const URL_RE = /https?:\/\/[^\s"'<>\\`)]+/g;

// Mail to the domain we don't own bounces today and would reach whoever buys
// it tomorrow. Checked on every sitemap route, not just ROUTES.
const FOREIGN_EMAIL_RE = /[\w.+-]+@(?:[\w-]+\.)*thursdai\.com\b/g;

async function main() {
  const { baseUrl, stop } = await startServer();
  const offending = [];
  try {
    const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
    const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    for (const route of new Set([...ROUTES, ...sitemapRoutes])) {
      const body = await fetchText(baseUrl + route);
      for (const email of new Set(body.match(FOREIGN_EMAIL_RE) ?? [])) offending.push({ route, url: email });
      if (!ROUTES.includes(route)) continue;
      const seen = new Set();
      for (const raw of body.match(URL_RE) ?? []) {
        let host;
        try {
          host = new URL(raw).hostname;
        } catch {
          continue;
        }
        if (isAllowed(host) || seen.has(raw)) continue;
        seen.add(raw);
        offending.push({ route, url: raw });
      }
    }
  } finally {
    stop();
  }

  if (offending.length) {
    console.error(`check-origin: ${offending.length} URL(s) or email(s) not on ${OWN_HOST} or an allowed third party:`);
    for (const { route, url } of offending) console.error(`  ${route}  ${url}`);
    process.exit(1);
  }
  console.log(`check-origin: OK (URLs on ${ROUTES.length} routes, emails on every sitemap route)`);
}

main().catch((err) => {
  console.error('check-origin:', err.message);
  process.exit(1);
});
