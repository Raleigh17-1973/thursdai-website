import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getApprovedCaseStudies } from '@/lib/velite';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Display, Body, Label } from '@/components/typography';
import { MDXContent } from '@/components/content/MDXContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await getApprovedCaseStudies();
  return studies.map((s) => ({ slug: s.slug.split('/').pop() as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studies = await getApprovedCaseStudies();
  const study = studies.find((s) => s.slug.split('/').pop() === slug);
  if (!study) return {};
  return {
    title: `${study.customer} — Thursdai Customer Story`,
    description: `${study.stat_number} ${study.stat_headline} — ${study.customer} uses Thursdai to govern AI agent decisions.`,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const studies = await getApprovedCaseStudies();
  const study = studies.find((s) => s.slug.split('/').pop() === slug);
  if (!study) notFound();

  return (
    <Section>
      <Container narrow>
        <Label>{study.industry}</Label>
        <Display as="h1">{study.customer}</Display>
        <Body variant="large">{study.stat_number} — {study.stat_headline}</Body>
        <blockquote style={{ borderLeft: '4px solid var(--color-accent)', paddingLeft: '1.5rem', margin: '2rem 0' }}>
          <Body>&quot;{study.quote}&quot;</Body>
          <Body variant="small">— {study.quote_author}</Body>
        </blockquote>
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          <MDXContent code={study.content} />
        </div>
      </Container>
    </Section>
  );
}
