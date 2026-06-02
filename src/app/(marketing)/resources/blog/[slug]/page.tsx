import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/velite';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display, Body, Label } from '@/components/typography';
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
  return { title: `${post.title} | Thursdai`, description: post.summary };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section>
      <Container narrow>
        <Label>{post.category}</Label>
        <Display as="h1">{post.title}</Display>
        <Body variant="small" style={{ color: 'var(--color-text-tertiary)', marginBottom: '2rem' }}>
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Body>
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          <MDXContent code={post.content} />
        </div>
      </Container>
    </Section>
  );
}
