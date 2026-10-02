import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { FOOTER_COLUMNS, NAV_ITEMS } from '@/config/nav';
import { STATIC_ROUTES } from '@/config/routes';

const SITEMAP_PATHS = new Set(STATIC_ROUTES.map((r) => r.path));
const MARKETING = path.resolve(__dirname, '..', '..', 'src', 'app', '(marketing)');

function navHrefs(): string[] {
  return NAV_ITEMS.flatMap((item) => ('items' in item ? item.items.map((i) => i.href) : [item.href]));
}

describe('navigation', () => {
  it('has five sections', () => {
    expect(NAV_ITEMS.map((i) => i.label)).toEqual(['Product', 'Solutions', 'Developers', 'Trust', 'Company']);
  });

  it('links only to sitemap routes', () => {
    const hrefs = [...navHrefs(), ...FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.href))];
    for (const href of hrefs) expect(SITEMAP_PATHS, href).toContain(href);
  });

  it('reaches every sitemap route from the footer', () => {
    const footer = new Set(FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.href)));
    // Home is the wordmark; individual compare pages hang off /compare.
    const exempt = (p: string) => p === '/' || p.startsWith('/compare/');
    for (const p of SITEMAP_PATHS) if (!exempt(p)) expect(footer, p).toContain(p);
  });

  it('lists only routes that have a page', () => {
    for (const p of SITEMAP_PATHS) {
      const file = p === '/' ? 'page.tsx' : path.join(...p.slice(1).split('/'), 'page.tsx');
      expect(existsSync(path.join(MARKETING, file)), p).toBe(true);
    }
  });
});
