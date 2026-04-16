import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Display } from '@/components/typography/Display';
import { Heading2 } from '@/components/typography/Heading';
import { Body } from '@/components/typography/Body';
import { Label } from '@/components/typography/Label';
import { Breadcrumb } from '@/components/nav/Breadcrumb';
import { TemplateDownloadCard } from '@/components/content/TemplateDownloadCard';

export const metadata: Metadata = {
  title: 'EU AI Act Annex III — Thursdai',
  description:
    'How Thursdai maps to every EU AI Act Annex III obligation. Downloadable FRIA, DPIA, and technical documentation templates.',
};

// ── Data ───────────────────────────────────────────────────────

const ANNEX_III_OBLIGATIONS = [
  { num: 1, title: 'Risk management system', desc: 'Establish, implement, document, and maintain a risk management system throughout the AI system lifecycle.' },
  { num: 2, title: 'Data and data governance', desc: 'Training, validation, and testing data must meet quality criteria appropriate for the intended purpose.' },
  { num: 3, title: 'Technical documentation', desc: 'Draw up technical documentation before placing the AI system on the market or putting it into service.' },
  { num: 4, title: 'Record-keeping and logging', desc: 'Automatically record events (logs) throughout the lifetime of the AI system.' },
  { num: 5, title: 'Transparency and information provision', desc: 'Design and develop AI systems to be sufficiently transparent to enable deployers to interpret outputs.' },
  { num: 6, title: 'Human oversight', desc: 'Design and develop AI systems to be effectively overseen by natural persons during their use period.' },
  { num: 7, title: 'Accuracy, robustness, and cybersecurity', desc: 'Achieve appropriate levels of accuracy, robustness, and cybersecurity throughout the system lifecycle.' },
  { num: 8, title: 'Quality management system', desc: 'Implement a quality management system ensuring compliance with the regulation.' },
  { num: 9, title: 'Conformity assessment', desc: 'Undergo a conformity assessment procedure before placing on the market.' },
  { num: 10, title: 'Registration', desc: 'Register the AI system in the EU database before placing on the market.' },
  { num: 11, title: 'Corrective actions and reporting', desc: 'Take necessary corrective actions and report serious incidents to market surveillance authorities.' },
  { num: 12, title: 'Post-market monitoring', desc: 'Establish and document a post-market monitoring system proportional to risk.' },
];

const OBLIGATION_MAPPINGS = [
  { obligation: 'Risk management system', thursdai: 'Policy-as-Code enforces risk controls at inference time. Full audit trail per inference. Risk register exportable via API.' },
  { obligation: 'Data and data governance', thursdai: 'Two-tier knowledge architecture — standard corpus versioned monthly, tenant corpus fully isolated. No cross-tenant data access.' },
  { obligation: 'Technical documentation', thursdai: 'Architecture documentation, API reference, and deployment guides available at /developers. Downloadable technical pack via security pack form.' },
  { obligation: 'Record-keeping and logging', thursdai: 'Every inference logged with timestamp, role attribution, knowledge snapshot version, and policy state. Logs retained per configured retention window.' },
  { obligation: 'Transparency', thursdai: 'Sentence-level provenance on every answer. Role attribution breakdown per response. Source confidence scores exposed in API response.' },
  { obligation: 'Human oversight', thursdai: 'Moderator panel surfaces disagreements for human review. Policy dry-run mode before deployment. Approval workflows configurable per role.' },
  { obligation: 'Accuracy and robustness', thursdai: 'Role Bench benchmark measures accuracy across domains. Policy-as-Code enforces citation requirements. Confidence scores on all source attributions.' },
  { obligation: 'Quality management', thursdai: 'ISO 42001 certification in progress (see /trust/iso-42001). SOC 2 Type II annual audit. Change management process documented.' },
  { obligation: 'Conformity assessment', thursdai: 'Self-assessment completed. Third-party assessment scheduled Q3 2026. Results published at /trust/certifications.' },
  { obligation: 'Registration', thursdai: 'EU database registration process initiated. Expected completion prior to August 2, 2026 binding date.' },
  { obligation: 'Corrective actions', thursdai: 'Incident response process documented. Security incidents reported to customers within 72 hours per SLA. Quarterly security bulletins.' },
  { obligation: 'Post-market monitoring', thursdai: 'Continuous policy compliance monitoring. Role Bench quarterly refresh. Customer anomaly reporting via /developers/api.' },
];

const ANNEX_FAQ = [
  {
    question: 'Does Thursdai qualify as a high-risk AI system under Annex III?',
    answer: 'Thursdai is infrastructure — it enables deployers to build governed AI applications. Whether a specific deployment qualifies as high-risk depends on the use case and sector. Our compliance team can advise on your specific context.',
  },
  {
    question: 'When does Annex III become binding?',
    answer: 'The EU AI Act Annex III provisions become binding on August 2, 2026 — three years after the Act entered into force on August 2, 2023.',
  },
  {
    question: 'What is a FRIA and who needs to complete one?',
    answer: 'A Fundamental Rights Impact Assessment is required for deployers of high-risk AI systems before deployment. It assesses potential impacts on fundamental rights including privacy, non-discrimination, and access to essential services.',
  },
  {
    question: 'Does Thursdai provide audit logs that satisfy Annex III record-keeping requirements?',
    answer: 'Yes. Every Thursdai inference is logged with a full audit trail including timestamp, role attribution, knowledge snapshot version, active policy set, and source citations. Logs are retained per your configured retention window and exportable via API.',
  },
  {
    question: 'Is Thursdai registered in the EU AI Act database?',
    answer: 'Registration is in process. We expect completion prior to the August 2, 2026 binding date. Status is updated at /trust/certifications.',
  },
];

// ── Styles ─────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  borderBottom: '1px solid var(--color-border-default)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--color-text-secondary)',
  borderBottom: '1px solid var(--color-border-default)',
  verticalAlign: 'top',
};

// ── Page ───────────────────────────────────────────────────────

export default function AnnexIiiPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ANNEX_FAQ.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Section variant="default">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Trust', href: '/trust' },
              { label: 'EU AI Act Annex III' },
            ]}
          />
          <Label style={{ marginTop: '1.5rem', display: 'block' }}>EU AI Act Annex III</Label>
          <Display style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            Ready for August 2, 2026.
          </Display>
          <Body variant="large" style={{ maxWidth: '700px' }}>
            The EU AI Act Annex III binding date is August 2, 2026. Thursdai is designed to help
            regulated enterprises meet every obligation — with documented controls, audit trails,
            and downloadable compliance templates.
          </Body>
        </Container>
      </Section>

      {/* What Annex III requires */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2 style={{ marginBottom: '1.5rem' }}>What Annex III requires</Heading2>
          <ol
            style={{
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              listStyle: 'decimal',
            }}
          >
            {ANNEX_III_OBLIGATIONS.map((item) => (
              <li key={item.num} style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  {item.title}
                </strong>{' '}
                — {item.desc}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Mapping table */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '1rem' }}>How Thursdai maps</Heading2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface-secondary)' }}>
                  <th style={thStyle}>Annex III Obligation</th>
                  <th style={thStyle}>Thursdai Control / Feature</th>
                </tr>
              </thead>
              <tbody>
                {OBLIGATION_MAPPINGS.map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 1 ? 'var(--color-surface-secondary)' : undefined }}
                  >
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {row.obligation}
                    </td>
                    <td style={tdStyle}>{row.thursdai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Downloadable templates */}
      <Section variant="compact" style={{ background: 'var(--color-surface-secondary)' }}>
        <Container>
          <Heading2>Compliance templates</Heading2>
          <Body style={{ marginTop: '0.75rem' }}>
            Ready-to-use templates pre-populated for a hypothetical Thursdai deployment. Adapt to
            your organisation before submission.
          </Body>
          <Grid cols={3} gap="md" style={{ marginTop: '1.5rem' }}>
            <TemplateDownloadCard
              title="FRIA Template"
              desc="Fundamental Rights Impact Assessment — pre-populated for a typical Thursdai enterprise deployment."
              href="/api/templates/fria"
            />
            <TemplateDownloadCard
              title="DPIA Template"
              desc="Data Protection Impact Assessment — covers Thursdai's data processing activities and tenant isolation architecture."
              href="/api/templates/dpia"
            />
            <TemplateDownloadCard
              title="Technical Documentation"
              desc="Technical documentation template meeting Annex IV requirements, pre-filled with Thursdai architecture details."
              href="/api/templates/tech-doc"
            />
          </Grid>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="compact">
        <Container>
          <Heading2 style={{ marginBottom: '2rem' }}>Frequently asked questions</Heading2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
            {ANNEX_FAQ.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.question}
                </p>
                <Body>{item.answer}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
