'use client';

import React from 'react';
import { diffWords } from 'diff';
import { Tabs } from '@/components/ui/Tabs';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface Preset {
  id: string;
  label: string;
  yaml: string;
  before: string;
  after: string;
}

const PRESETS: Preset[] = [
  {
    id: 'block-pii',
    label: 'Block PII in output',
    yaml: `# Block PII in output
rule: block_pii
applies_to: all_roles
action: redact
patterns:
  - email_addresses
  - phone_numbers
  - national_id_numbers
on_violation: redact_and_flag`,
    before:
      'Contact Sarah Chen at sarah.chen@acmecorp.com or +1 (415) 555-0147 to schedule the compliance review.',
    after:
      'Contact [REDACTED] at [EMAIL REDACTED] or [PHONE REDACTED] to schedule the compliance review.',
  },
  {
    id: 'legal-gate',
    label: 'Legal gate > $500K',
    yaml: `# Require legal review for large contracts
rule: legal_review_gate
applies_to: finance_role
condition:
  field: contract_value
  operator: greater_than
  value: 500000
action: block_and_require_review
message: "Legal review required before proceeding."`,
    before:
      'The proposed SaaS agreement at $750K annual value can proceed to procurement. Standard terms apply.',
    after:
      '[BLOCKED] Legal review required. The proposed SaaS agreement at $750K annual value exceeds the $500K threshold. This response is blocked pending Legal sign-off.',
  },
  {
    id: 'citation',
    label: 'Enforce regulatory citation',
    yaml: `# Require citations on regulatory claims
rule: regulatory_citation
applies_to: legal_role
triggers:
  - keywords:
      - GDPR
      - HIPAA
      - SOC2
      - ISO
      - "AI Act"
      - FedRAMP
action: require_citation
on_violation: append_disclaimer`,
    before:
      'HIPAA requires encryption of all PHI at rest and in transit. Your current setup is compliant.',
    after:
      'HIPAA [45 CFR § 164.312(a)(2)(iv)] requires encryption of all PHI at rest and in transit. Your current setup is compliant [Security Assessment Report, March 2026, §3.2].',
  },
];


const PANE_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
  margin: '0 0 0.5rem 0',
};

// Word-level diff: additions underlined in indigo, removals struck through in tertiary ink.
function WordDiff({ before, after }: { before: string; after: string }) {
  const parts = diffWords(before, after);
  return (
    <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
      {parts.map((part, i) => {
        if (part.added) {
          return (
            <ins
              key={i}
              style={{
                background: 'var(--color-accent-subtle)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--color-accent)',
                textUnderlineOffset: '3px',
              }}
            >
              {part.value}
            </ins>
          );
        }
        if (part.removed) {
          return (
            <del key={i} style={{ textDecoration: 'line-through', color: 'var(--color-text-tertiary)' }}>
              {part.value}
            </del>
          );
        }
        return <span key={i}>{part.value}</span>;
      })}
    </p>
  );
}

function DiffView({ preset }: { preset: Preset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <p style={PANE_LABEL}>Without policy</p>
        <div style={{ padding: '1rem', background: 'var(--color-surface-secondary)', borderRadius: '2px' }}>
          <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
            {preset.before}
          </p>
        </div>
      </div>
      <div>
        <p style={{ ...PANE_LABEL, color: 'var(--color-text-primary)' }}>With policy applied</p>
        <div style={{ padding: '1rem', border: '1px solid var(--color-text-primary)', borderRadius: '2px' }}>
          <WordDiff before={preset.before} after={preset.after} />
        </div>
      </div>
    </div>
  );
}

export function PolicyEditor() {
  const tabs = PRESETS.map((preset) => ({
    id: preset.id,
    label: preset.label,
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="md:grid-cols-2">
        <CodeBlock code={preset.yaml} language="yaml" filename="policy.yaml" />
        <DiffView preset={preset} />
      </div>
    ),
  }));

  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '2px',
        background: 'var(--color-surface-primary)',
        padding: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <Tabs tabs={tabs} />
    </div>
  );
}