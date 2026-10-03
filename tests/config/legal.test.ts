import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { STATIC_ROUTES } from '@/config/routes';

// /privacy and /terms are drafts pending legal review: linked from the footer's bottom row,
// noindex, and deliberately absent from the sitemap (and so from the footer columns).
const LEGAL = ['/privacy', '/terms'];
const MARKETING = path.resolve(__dirname, '..', '..', 'src', 'app', '(marketing)');

describe('legal pages', () => {
  for (const route of LEGAL) {
    const file = path.join(MARKETING, route.slice(1), 'page.tsx');

    it(`${route} exists, is noindex and carries the draft notice`, () => {
      expect(existsSync(file)).toBe(true);
      const src = readFileSync(file, 'utf8');
      expect(src).toMatch(/robots:\s*\{\s*index:\s*false\s*\}/);
      expect(src).toContain('Draft pending legal review. Last updated {LEGAL_LAST_UPDATED}.');
    });

    it(`${route} is not in the sitemap`, () => {
      expect(STATIC_ROUTES.map((r) => r.path)).not.toContain(route);
    });
  }
});
