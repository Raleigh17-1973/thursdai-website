'use client';

import React from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface Preset {
  id: string;
  label: string;
  yaml: string;
  withoutPolicy: string;
  withPolicy: React.ReactNode;
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
    withoutPolicy:
      'Contact Sarah Chen at sarah.chen@acmecorp.com or +1 (415) 555-0147 to schedule the compliance review.',
    withPolicy: (
      <>
        Contact{' '}
        <span
          style={{
            background: 'rgba(45,212,191,0.15)',
            color: 'var(--color-accent)',
            padding: '0 4px',
            borderRadius: '4px',
          }}
        >
          [REDACTED]
        </span>{' '}
        at{' '}
        <span
          style={{
            background: 'rgba(45,212,191,0.15)',
            color: 'var(--color-accent)',
            padding: '0 4px',
            borderRadius: '4px',
          }}
        >
          [EMAIL REDACTED]
        </span>{' '}
        or{' '}
        <span
          style={{
            background: 'rgba(45,212,191,0.15)',
            color: 'var(--color-accent)',
            padding: '0 4px',
            borderRadius: '4px',
          }}
        >
          [PHONE REDACTED]
        </span>{' '}
        to schedule the compliance review.
      </>
    ),
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
    withoutPolicy:
      'The proposed SaaS agreement at $750K annual value can proceed to procurement. Standard terms apply.',
    withPolicy: (
      <>
        <span
          style={{
            display: 'block',
            background: 'rgba(245,158,11,0.12)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            color: 'rgb(217,119,6)',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          ⚠️ Legal review required. The proposed SaaS agreement at $750K annual value exceeds the
          $500K threshold. This response is blocked pending Legal sign-off.
        </span>
      </>
    ),
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
    withoutPolicy:
      'HIPAA requires encryption of all PHI at rest and in transit. Your current setup is compliant.',
    withPolicy: (
      <>
        HIPAA requires encryption of all PHI at rest and in transit{' '}
        <span
          style={{
            background: 'rgba(45,212,191,0.15)',
            color: 'var(--color-accent)',
            padding: '0 4px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          [45 CFR § 164.312(a)(2)(iv)]
        </span>
        . Your current setup is compliant{' '}
        <span
          style={{
            background: 'rgba(45,212,191,0.15)',
            color: 'var(--color-accent)',
            padding: '0 4px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          [Security Assessment Report, March 2026, §3.2]
        </span>
        .
      </>
    ),
  },
];

function DiffView({ preset }: { preset: Preset }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginTop: '1rem',
      }}
    >
      {/* Without policy */}
      <div
        style={{
          background: 'var(--color-surface-secondary)',
          border: '1px solid var(--color-border-default)',
          borderRadius: '10px',
          padding: '1rem',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-text-tertiary)',
            margin: '0 0 0.75rem 0',
          }}
        >
          Without policy
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
          {preset.withoutPolicy}
        </p>
      </div>

      {/* With policy */}
      <div
        style={{
          background: 'var(--color-surface-secondary)',
          border: '1px solid var(--color-border-default)',
          borderRadius: '10px',
          padding: '1rem',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-accent)',
            margin: '0 0 0.75rem 0',
          }}
        >
          With policy
        </p>
        <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
          {preset.withPolicy}
        </p>
      </div>
    </div>
  );
}

export function PolicyEditor() {
  const tabs = PRESETS.map((preset) => ({
    id: preset.id,
    label: preset.label,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
          }}
          className="md:grid-cols-2"
        >
          <CodeBlock code={preset.yaml} language="yaml" filename="policy.yaml" />
          <DiffView preset={preset} />
        </div>
      </div>
    ),
  }));

  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '16px',
        background: 'var(--color-surface-primary)',
        padding: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <Tabs tabs={tabs} />
    </div>
  );
}
