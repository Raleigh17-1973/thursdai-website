import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/velite';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Heading1, Heading3, Body, Label } from '@/components/typography';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog: Thursdai',
  description: 'Insights on governed AI agents, enterprise AI deployment and the EU AI Act.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <Section>
      <Container>
        <Label>Blog</Label>
        <Heading1>Insights</Heading1>
        <Grid cols={3}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/resources/blog/${post.slug.split('/').pop()}`} style={{ textDecoration: 'none' }}>
              <article style={{ padding: '1.5rem', border: '1px solid var(--color-border-default)', borderRadius: '12px' }}>
                <Label>{post.category}</Label>
                <Heading3>{post.title}</Heading3>
                <Body variant="small">{post.summary}</Body>
                <Body variant="small" style={{ color: 'var(--color-text-tertiary)', marginTop: '0.5rem' }}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Body>
              </article>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
