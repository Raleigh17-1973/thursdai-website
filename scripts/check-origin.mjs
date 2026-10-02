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
];

// Identifiers rather than links: JSON-LD @context and SVG/XML namespaces.
const NAMESPACES = ['schema.org', 'www.w3.org', 'www.sitemaps.org'];

const ALLOWED = [OWN_HOST, ...THIRD_PARTY, ...NAMESPACES];

const isAllowed = (host) => ALLOWED.some((d) => host === d || host.endsWith(`.${d}`));

// Stops at quotes, whitespace, angle brackets and backslashes so URLs inside
// escaped RSC/JSON payloads are cut cleanly.
const URL_RE = /https?:\/\/[^\s"'<>\\`)]+/g;

async function main() {
  const { baseUrl, stop } = await startServer();
  const offending = [];
  try {
    for (const route of ROUTES) {
      const body = await fetchText(baseUrl + route);
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
    console.error(`check-origin: ${offending.length} URL(s) with a host other than ${OWN_HOST} or an allowed third party:`);
    for (const { route, url } of offending) console.error(`  ${route}  ${url}`);
    process.exit(1);
  }
  console.log(`check-origin: OK (${ROUTES.length} routes, all absolute URLs on ${OWN_HOST} or allowed third parties)`);
}

main().catch((err) => {
  console.error('check-origin:', err.message);
  process.exit(1);
});
