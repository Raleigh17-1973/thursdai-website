import { getAllPosts } from '@/lib/velite';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thursdai.com';

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/resources/blog/${post.slug.split('/').pop()}</link>
      <guid>${SITE_URL}/resources/blog/${post.slug.split('/').pop()}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thursdai Blog</title>
    <link>${SITE_URL}</link>
    <description>Insights on governed AI agents, enterprise AI deployment, and the EU AI Act.</description>
    <language>en-US</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
