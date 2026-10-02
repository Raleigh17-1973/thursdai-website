import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/velite';
import { LongForm } from '@/components/templates/LongForm';
import { H3_STYLE, LABEL_STYLE } from '@/components/typography/scale';

export const metadata: Metadata = {
  title: 'Blog: Thursdai',
  description: 'Writing on AI decision records, audit evidence and the EU AI Act.',
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default async function BlogPage() {
  const posts = await getAllPosts();
  // No published posts yet: 404 rather than an empty index.
  if (!posts.length) notFound();
  return (
    <LongForm meta={['Blog', `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`]} title="Writing">
      <ol className="list-none m-0 p-0" style={{ marginTop: '4rem', borderTop: '1px solid var(--ink)' }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--rule)' }}>
            <p className="m-0" style={LABEL_STYLE}>
              {post.category} · {formatDate(post.date)}
            </p>
            <h2 className="m-0" style={{ ...H3_STYLE, marginTop: '0.5rem' }}>
              <Link href={`/resources/blog/${post.slug.split('/').pop()}`} style={{ color: 'var(--ink)' }}>
                {post.title}
              </Link>
            </h2>
            <p className="m-0" style={{ marginTop: '0.5rem', fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
              {post.summary}
            </p>
          </li>
        ))}
      </ol>
    </LongForm>
  );
}
