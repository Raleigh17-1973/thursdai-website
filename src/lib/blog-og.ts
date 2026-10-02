// Values for the blog share card (src/app/(marketing)/resources/blog/[slug]/opengraph-image.tsx).

/** Long titles step down so the card never clips a headline (titles are capped at 99). */
export function ogTitleSize(title: string): number {
  if (title.length > 72) return 46;
  if (title.length > 48) return 54;
  return 60;
}

/** The post date as a record timestamp: YYYY-MM-DD in UTC. */
export function ogPostDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? date : d.toISOString().slice(0, 10);
}

/** "technical" -> "Technical". */
export function ogSection(category: string | undefined): string {
  if (!category) return 'Journal';
  return category.charAt(0).toUpperCase() + category.slice(1);
}

/** Host and path shown as the card's source, e.g. "getthursdai.com/resources/blog". */
export function ogSource(siteUrl: string): string {
  return `${siteUrl.replace(/^https?:\/\//, '').replace(/\/+$/, '')}/resources/blog`;
}
