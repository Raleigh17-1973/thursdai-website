import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/velite';
import { LongForm } from '@/components/templates/LongForm';
import { MDXContent } from '@/components/content/MDXContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug.split('/').pop() as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title}: Thursdai`, description: post.summary };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <LongForm meta={[post.category, date]} title={post.title} lead={post.summary}>
      <article style={{ marginTop: '3rem', fontSize: '17px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
        <MDXContent code={post.content} />
      </article>
    </LongForm>
  );
}
