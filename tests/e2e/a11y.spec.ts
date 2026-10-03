import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { TEMPLATE_ROUTES, settle } from './routes';

// Plan Item 8.2: zero serious or critical axe violations on every template.
// Moderate and minor findings are printed but do not fail the gate.
const BLOCKING = new Set(['serious', 'critical']);

// The legal drafts use the long-form template but are noindex and outside the visual suite,
// so they are checked here on their own.
const LEGAL_ROUTES = [
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
];

for (const route of [...TEMPLATE_ROUTES, ...LEGAL_ROUTES]) {
  test(`a11y ${route.name} (${route.path})`, async ({ page }, testInfo) => {
    const res = await page.goto(route.path, { waitUntil: 'load' });
    expect(res?.status(), `${route.path} status`).toBe(200);
    await settle(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const blocking = results.violations.filter((v) => BLOCKING.has(v.impact ?? ''));
    const advisory = results.violations.filter((v) => !BLOCKING.has(v.impact ?? ''));
    if (advisory.length) {
      testInfo.annotations.push({
        type: 'axe-advisory',
        description: advisory.map((v) => `${v.id} (${v.impact}, ${v.nodes.length})`).join('; '),
      });
    }

    const summary = blocking.map(
      (v) => `${v.impact} ${v.id}: ${v.help}\n${v.nodes
        .slice(0, 5)
        .map((n) => `    ${n.target.join(' ')}\n      ${n.failureSummary?.split('\n').join(' ')}`)
        .join('\n')}`,
    );
    expect(blocking, `serious/critical axe violations on ${route.path}:\n${summary.join('\n')}`).toEqual([]);
  });
}

// The cookie banner. CI builds have no NEXT_PUBLIC_CLARITY_PROJECT_ID, so the banner would
// never render; `?consent-preview` shows it only in such builds (it has no effect when a
// project id is set, and there is nothing to load without one). No consent is stored here.
test('a11y consent banner', async ({ page }, testInfo) => {
  await page.goto('/?consent-preview', { waitUntil: 'load' });
  const banner = page.getByRole('region', { name: 'Cookies' });
  await expect(banner).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include('[data-consent-banner]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const blocking = results.violations.filter((v) => BLOCKING.has(v.impact ?? ''));
  expect(blocking.map((v) => `${v.impact} ${v.id}: ${v.help}`)).toEqual([]);

  // Equal prominence: Decline and Accept are the same size.
  const decline = banner.getByRole('button', { name: 'Decline' });
  const accept = banner.getByRole('button', { name: 'Accept' });
  const [d, a] = [await decline.boundingBox(), await accept.boundingBox()];
  expect(d && a).toBeTruthy();
  expect(Math.abs(d!.width - a!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(d!.height - a!.height)).toBeLessThanOrEqual(1);

  const viewport = page.viewportSize()!;
  const box = (await banner.boundingBox())!;
  expect(box.height, 'banner leaves most of the screen visible').toBeLessThan(viewport.height * 0.4);
  if (testInfo.project.name === 'mobile') {
    // Stacked, full width of the banner's content box.
    expect(a!.y).toBeGreaterThan(d!.y);
    expect(d!.width).toBeGreaterThan(viewport.width - 48);
  }

  // Not a focus trap and not focused on arrival; both buttons are reachable by keyboard.
  await expect(banner).not.toBeFocused();
  await decline.focus();
  await page.keyboard.press('Tab');
  await expect(accept).toBeFocused();

  await decline.click();
  await expect(banner).toBeHidden();
  const stored = await page.evaluate(() => localStorage.getItem('thursdai-consent-v1'));
  expect(JSON.parse(stored ?? '{}').state).toBe('denied');
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(300);
  await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
});
