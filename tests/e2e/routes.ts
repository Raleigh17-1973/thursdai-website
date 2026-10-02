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
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const img of Array.from(document.images)) img.loading = 'eager';
    // Walk the page once so in-view reveals and lazy islands fire, then return.
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? null
          : new Promise((r) => {
              img.addEventListener('load', r, { once: true });
              img.addEventListener('error', r, { once: true });
            }),
      ),
    );
    await document.fonts.ready;
  });
  await page.waitForLoadState('networkidle');
}
