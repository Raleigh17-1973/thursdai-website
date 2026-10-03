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
