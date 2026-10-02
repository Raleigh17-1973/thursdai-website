import { describe, expect, it } from 'vitest';
import { ogPostDate, ogSection, ogSource, ogTitleSize } from '@/lib/blog-og';

describe('blog share card values', () => {
  it('formats the post date as a UTC record date', () => {
    expect(ogPostDate('2026-10-02T00:00:00.000Z')).toBe('2026-10-02');
    expect(ogPostDate('not a date')).toBe('not a date');
  });

  it('steps long titles down', () => {
    expect(ogTitleSize('Short title')).toBe(60);
    expect(ogTitleSize('x'.repeat(60))).toBe(54);
    expect(ogTitleSize('x'.repeat(99))).toBe(46);
  });

  it('labels the section and source', () => {
    expect(ogSection('technical')).toBe('Technical');
    expect(ogSection(undefined)).toBe('Journal');
    expect(ogSource('https://getthursdai.com/')).toBe('getthursdai.com/resources/blog');
  });
});
