import type { Metadata } from 'next';
import { getAllChangelog } from '@/lib/velite';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading1, Heading3, Body, Label } from '@/components/typography';
import { Badge } from '@/components/ui/Badge';
import { MDXContent } from '@/components/content/MDXContent';

export const metadata: Metadata = {
  title: 'Changelog: Thursdai',
  description: "What's new in Thursdai.",
};

export default async function ChangelogPage() {
  const entries = await getAllChangelog();
  return (
    <Section>
      <Container narrow>
        <Label>Changelog</Label>
        <Heading1>What&apos;s new</Heading1>
        {entries.map((entry) => (
          <div
            key={entry.slug}
            style={{ borderBottom: '1px solid var(--color-border-default)', paddingBottom: '2rem', marginBottom: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Body variant="small" style={{ color: 'var(--color-text-tertiary)' }}>
                {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Body>
              {entry.version && <Badge variant="teal">{entry.version}</Badge>}
            </div>
            <Heading3>{entry.title}</Heading3>
            <div style={{ color: 'var(--color-text-secondary)' }}>
              <MDXContent code={entry.content} />
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}
