import { test, expect } from '@playwright/test';
import { TEMPLATE_ROUTES, settle } from './routes';

// Plan Item 8.3: full-page snapshots of each template at 1440x900 and 390x844
// (the "desktop" and "mobile" projects). Baselines are Linux-only and come
// from the "Update visual baselines" workflow (.github/workflows/visual-baselines.yml).
//
// Anything time-dependent or random must carry `data-visual-mask`; it is
// painted over in every snapshot so it cannot cause a diff.

// Only Linux baselines exist. On other platforms the suite is skipped rather
// than writing baselines that would never match CI.
test.skip(process.platform !== 'linux' && !process.env.VISUAL_ANY_PLATFORM, 'Visual baselines are Linux-only');

for (const route of TEMPLATE_ROUTES) {
  test(`visual ${route.name}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: 'load' });
    await settle(page);
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      mask: [page.locator('[data-visual-mask]')],
      timeout: 15_000,
    });
  });
}
