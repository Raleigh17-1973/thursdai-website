'use client';

import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki/bundle/web';
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

// Hook: Shiki client-side YAML highlighting
function useHighlightedYaml(yaml: string) {
  const [html, setHtml] = useState('');
  useEffect(() => {
    codeToHtml(yaml, { lang: 'yaml', theme: 'github-dark' }).then(setHtml);
  }, [yaml]);
  return html;
}

// Word-level diff component
function WordDiff({ before, after }: { before: string; after: string }) {
  const parts = diffWords(before, after);
  return (
    <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
      {parts.map((part, i) => {
        if (part.added) {
          return (
            <ins
              key={i}
              style={{
                background: 'rgba(45, 212, 191, 0.15)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--color-accent)',
                borderRadius: '2px',
                padding: '0 2px',
              }}
            >
              {part.value}
            </ins>
          );
        }
        if (part.removed) {
          return (
            <del
              key={i}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                textDecoration: 'line-through',
                color: '#ef4444',
                borderRadius: '2px',
                padding: '0 2px',
              }}
            >
              {part.value}
            </del>
          );
        }
        return <span key={i}>{part.value}</span>;
      })}
    </p>
  );
}

// Code block with Shiki highlighting (client-side)
function HighlightedCodeBlock({ code, filename }: { code: string; filename: string }) {
  const html = useHighlightedYaml(code);
  return (
    <CodeBlock
      code={code}
      language="yaml"
      filename={filename}
      highlightedHtml={html || undefined}
    />
  );
}

function DiffView({ preset }: { preset: Preset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '1rem' }}>
      {/* Without policy */}
      <div>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-text-tertiary)',
            margin: '0 0 0.5rem 0',
          }}
        >
          Without policy
        </p>
        <div
          style={{
            padding: '1rem',
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'var(--color-text-secondary)',
            }}
          >
            {preset.before}
          </p>
        </div>
      </div>

      {/* With policy — word diff */}
      <div>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-accent)',
            margin: '0 0 0.5rem 0',
          }}
        >
          With policy applied
        </p>
        <div
          style={{
            padding: '1rem',
            background: 'rgba(45, 212, 191, 0.05)',
            border: '1px solid rgba(45, 212, 191, 0.2)',
            borderRadius: '8px',
          }}
        >
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}
          className="md:grid-cols-2"
        >
          <HighlightedCodeBlock code={preset.yaml} filename="policy.yaml" />
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
