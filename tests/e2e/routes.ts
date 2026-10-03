import type { Page } from '@playwright/test';

// One representative URL per template in docs/design/the-record.md, plus the
// two pages that are their own layout (/demo and /developers).
export const TEMPLATE_ROUTES = [
  { name: 'home', path: '/' },
  { name: 'product-pillar', path: '/product/ai-receipts' },
  { name: 'solution', path: '/solutions/compliance' },
  { name: 'trust', path: '/trust' },
  { name: 'trust-document', path: '/trust/annex-iii' },
  { name: 'long-form', path: '/resources/role-bench' },
  { name: 'compare', path: '/compare/glean' },
  { name: 'demo', path: '/demo' },
  { name: 'developers', path: '/developers' },
] as const;

/**
 * Brings a page to a settled, deterministic state: fonts loaded, every image
 * decoded and anything that reveals on scroll already revealed.
 */
export async function settle(page: Page) {
  // Every wait is bounded on the Node side. Page-side timers and frames can be
  // throttled or frozen on a busy CI runner, so a timeout set inside the page
  // may never fire; Node timers always do. If something genuinely fails to
  // load, the screenshot or axe result reports it instead of the test hanging.
  const bounded = (p: Promise<unknown>, ms: number) => {
    p.catch(() => undefined); // a late rejection after the race must not leak
    return Promise.race([p, new Promise((r) => setTimeout(r, ms))]);
  };
  const fontsReady = () => page.evaluate(() => document.fonts.ready.then(() => undefined));

  await bounded(fontsReady(), 10_000);
  await page.evaluate(() => {
    for (const img of Array.from(document.images)) img.loading = 'eager';
  });

  // Walk the page once so in-view reveals and lazy islands fire, then return.
  const { height, step } = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    step: Math.max(200, Math.floor(window.innerHeight * 0.8)),
  }));
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(50);
  }
  await page.evaluate(() => window.scrollTo(0, 0));

  await bounded(
    page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((img) =>
          img.complete
            ? null
            : new Promise((r) => {
                img.addEventListener('load', r, { once: true });
                img.addEventListener('error', r, { once: true });
              }),
        ),
      ).then(() => undefined),
    ),
    10_000,
  );
  await bounded(fontsReady(), 10_000);
  await bounded(page.waitForLoadState('networkidle'), 10_000);
}
